// TODO: FILTRATION BEFORE SENDING BACK EVENTS
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var Authport = require('authport');
var MakerpassService = require('authport-makerpass');
var session = require('express-session');
require('dotenv').config({silent: true});
var MP = require('node-makerpass');
var db = require('./db.js');
var router = require('./routes.js');
var controllers = require('./controllers.js');
var uuid = require('uuid/v1');

// code from the express.static docs
app.use('/static', express.static(path.join(__dirname, '/../client/public/static')));
app.use(bodyParser.json());
app.use(session({
  secret: 'this is secret',
  resave: false,
  saveUninitialized: true
}));
app.use('/api', router);

// MakerPass Authentication ---------------------------------
Authport.registerService('makerpass', MakerpassService);

// callback urls for MakerPass Authentication
var localCallbackUrl = 'http://localhost:5000/auth/makerpass/callback';
var deployedCallbackUrl = 'https://present-me-beta.herokuapp.com/auth/makerpass/callback';

// provide credentials for making an Authport server
// These references to process.env will look for environment variables
  // Deployment: set these in Heroku
  // Local: save them in a .env file in the root directory - see dotenv npm for docs
    // .gitignore includes the .env - this is advisable
Authport.createServer({
  service: 'makerpass',
  id: process.env.MAKERPASS_ID,
  secret: process.env.MAKERPASS_SECRET,
  callbackURL: deployedCallbackUrl || localCallbackUrl
});

var google = Authport.createServer({
  service: 'google',
  id: process.env.GOOGLE_ID,
  secret: process.env.GOOGLE_SECRET,
  scope: ''
});

var audienceOnly = false; // switch variable for whether or not there is a presenter already

// if login is successful, create a session for the user
Authport.on('auth', function (req, res, data) {
  let userInfo = {};// temp storage for user information that needs to be passed to contollers.saveUser function
  // depending on which login option the user chooses, send them to appropriate service
  switch (data.service) {
    case 'makerpass':
      userInfo.id = data.data.user.uid;
      userInfo.name = data.data.user.name;
      userInfo.avatar = data.data.user.avatar_url;
      userInfo.email = data.data.user.email;

      controllers.saveUser(userInfo)
      .then(function () {
        createSession(req, res, userInfo.id);
      });
      break;

    case 'google':
      userInfo.id = data.id;
      userInfo.name = data.data.name;
      userInfo.avatar = data.data.picture;
      userInfo.email = 'test@test.mail.com';

      controllers.saveUser(userInfo)
      .then(function (data) {
        createSession(req, res, userInfo.id);
      });
      break;
  }
});

Authport.on('error', function (req, res, data) {
  console.log('Failed');
  res.status(500).send({error: 'failed'});
});

app.get('/auth/:service', Authport.app);

app.get('/', function (req, res) {
  // check if the user is logged in by checking his session,
  // if no session found redirect to auth crossroads page (google / github)
  if (!req.session.token) {
    res.sendFile(path.join(__dirname, '/../client/public/auth.html'));
  } else {
    res.sendFile(path.join(__dirname, '/../client/public/index.html'));
  }
});

// A route to handle guest 'logins'
app.get('/guest', function (req, res) {
  // Generate a random 21 character token for the guest and route them back to '/'
  let guestToken = (Math.random().toString(36) + '00000000000000000').slice(2, 23);
  // Create an entry in the user table for the guest
  let userInfo = {};
  userInfo.id = guestToken;
  userInfo.name = 'guest';
  userInfo.avatar = 'http://www.doctormacro.com/Images/Chaney%20Jr.,%20Lon/Annex/Annex%20-%20Chaney%20Jr.,%20Lon%20(Wolf%20Man,%20The)_07.jpg';
  userInfo.email = 'guest@guest.com';
  controllers.saveUser(userInfo)
    .then(function () {
      // Create a session for the guest
      createSession(req, res, guestToken);
    });
});

app.get('/logout', function (req, res) {
  console.log('goodbye');
  req.session.destroy(function () {
    res.redirect('/');
  });
});
// a route to create a new socket namespace
app.post('/newRoom', function (req, res) {
  // console.log('room in post request', req.body.room);
  // launch a custom namespace called 'nsp' for the presentation 'room'
  let nsp = io.of(`/${req.body.room}`);
  // ------------------------------------
  // Socket.io listeners / emitters for the presentation 'room'
  nsp.on('connection', function (socket) {
    console.log('a user connected to ', nsp.name);

    // Emits connection message when user connects to specific namespace
    nsp.emit('connected');

    // Listen for audience request for presentation URL
    socket.on('presentationInfoRequest', function (request) {
      // console.log('User requesting presentationUrl', request);
      if (request.name === 'guest') {
        // check if this lecture permits guests
        controllers.checkGuestsPermitted(request.lectureId).then((guestsPermitted) => {
          // if so, pass along the request for info to the presenter
          if (guestsPermitted === true) nsp.emit('presentationInfoRequest');
          // if not, let the guest know
          else nsp.emit('notAllowed');
        });
      } else {
        // Send request to presenter (technically also everyone else)
        nsp.emit('presentationInfoRequest');
      }
    });

    // Listen for presenter's response with presesntation URL
    socket.on('presentationInfoResponse', function (presentationUrl, presentationName, presentationId, questions, thumbs, feedbackEnabled) {
      // console.log('Lecturer responding with presentationUrl');
      // Send response to audience member
      console.log('presentationInfoResponse', presentationUrl, presentationName, presentationId, questions, thumbs, feedbackEnabled);
      nsp.emit('presentationInfoResponse', presentationUrl, presentationName, presentationId, questions, thumbs, feedbackEnabled);
    });

    // Listen for saveLecture event
    socket.on('saveLecture', function (lecture) {
      // console.log('Presenter selected a presentation');
      controllers.saveLecture(lecture);
    });

    // Listen for updateTitle and update the database
    socket.on('udpateTitle', (lectureId, title) => {
      controllers.updateLectureTitle(title, lectureId);
    });

    // Listen for guestsToggle event
    socket.on('guestsToggle', function (lecture) {
      // console.log('socket: guestsToggle', 'lecture', lecture);
      controllers.guestsToggle(lecture);
    });

    // Listen for user_lecture event
    socket.on('userLecture', function (lecture) {
      // console.log('Presenter selected a presentation');
      controllers.userLecture(lecture);
    });

    // Listen for Audience button clicks
    socket.on('updatePulse', function (action, currTime) {
      // console.log('updatePulse event: ', action, currTime);
      // Broadcast to presenter (technically also everyone else)
      nsp.emit('updatedPulse', action, currTime);
    });
    // Listen for user clicks
    socket.on('userClick', function (action, currTime, name, userId, lectureId) {
      // console.log('userClick event: ', action, currTime, name, userId, lectureId);
      // Broadcast to presenter (technically also everyone else)
      nsp.emit('userClicked', action, currTime, name);
      let click = {
        userId: userId,
        lectureId: lectureId,
        date: currTime
      };
      controllers.saveClick(click);
    });

    // Listen for toggle events from the presenter and bounce them to the audience
    socket.on('questionToggle', () => {
      nsp.emit('questionToggle');
    });

    socket.on('feedbackToggle', () => {
      nsp.emit('feedbackToggle');
    });

    // Listen for a question and bounce it out
    socket.on('submitQuestion', (question) => {
      console.log('submitQuestion received', question);
      nsp.emit('submitQuestion', question);
      controllers.saveQuestion(question);
    });

    // Listen for upvote / downvote Questions from the audience and bounce them to everyone
    socket.on('upvoteQuestion', (upvote, userId) => {
      console.log('upvote ', upvote, userId);
      nsp.emit('upvoteQuestion', upvote, userId);
      controllers.saveUpvote(upvote);
    });

    socket.on('downvoteQuestion', (downvote, userId) => {
      console.log('downvote ', downvote, userId);
      nsp.emit('downvoteQuestion', downvote, userId);
      controllers.saveDownvote(downvote);
    });

    // -------------------------- SOCKETS FOR 'THUMBS' --------------------------

    socket.on('submit thumbTopic', (topicId, topic, lectureId) => {
      console.log('topic submit: ', topic);
      nsp.emit('open thumbs', topicId, topic);
      controllers.saveTopic(topicId, topic, lectureId);
    });

    socket.on('thumb clicked', (topicId, userId, thumbChoice) => {
      console.log('thumb clicked by user ', userId, ': ', thumbChoice, topicId);
      nsp.emit('thumb clicked', thumbChoice);
      controllers.saveThumbChoice(topicId, userId, thumbChoice);
    });

    socket.on('close thumbs', () => {
      nsp.emit('close thumbs');
    });

    // ------------------- SOCKETS FOR 'STOP PRESENTATION' -------------------

    // Listen for stopPresentation event and let the audience know it's over
    socket.on('stopPresentation', (endLecture) => {
      nsp.emit('stopPresentation');
      controllers.saveEndTime(endLecture);
    });

    socket.on('disconnect', function (socket) {
      console.log('a user disconnected from ', nsp.name);
      // Alert the presenter that an audience member has disconnected
      nsp.emit('disconnected');
    });
  });
  res.send('post accepted');
});
// --------------------------------------

// helper function for creating a session
var createSession = function (req, res, id) {
  return req.session.regenerate(function () {
    // set user id as an access token for now, need to refactor later
    req.session.token = createAccessToken();
    req.session.userId = id;
    res.redirect('/');
  });
};

// creating random alphanumeric 36 character code
var createAccessToken = function () {
  return uuid();
};

// HEROKU OR DOTENV VAR OR LOCALHOST:5000
// Check to see if there is a port environment variable or just use port 5000 instead
module.exports.NODEPORT = process.env.PORT || 5000;
var port = process.env.PORT || 5000;

app.get('*', function (req, res) { // Wildcard route - redirects to landing if loggedin, login page if not logged in.
  res.redirect('/');
});

// http server listening to port (HTTP needed for Socket.io)
http.listen(port, function () {
  console.log('Listening on ' + port);
});
