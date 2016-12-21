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
var credentials = require('./env/config.js');

// TODO: require('dot-env')

// code from the express.static docs
app.use('/static', express.static(path.join(__dirname, '/../client/public/static')));
app.use(bodyParser.json());
app.use(session({
  secret: 'this is secret',
  resave: false,
  saveUninitialized: true
}));

// MakerPass Authentication ---------------------------------
Authport.registerService('makerpass', MakerpassService);

// callback urls for MakerPass Authentication
var localCallbackUrl = 'http://localhost:5000/auth/makerpass/callback';
var deployedCallbackUrl = null;// Fill in with the deployed url

// provide credentials for making an Authport server
Authport.createServer({
  service: 'makerpass',
  id: credentials.makerpass.id,
  secret: credentials.makerpass.secret,
  callbackURL: deployedCallbackUrl || localCallbackUrl
});

// if login is successful, create a session for the user
Authport.on('auth', function (req, res, data) {
  createSession(req, res, data.token);
});

Authport.on('error', function (req, res, data) {
  console.log('Failed');
  res.status(500).send({error: 'failed'});
});

app.get('/auth/:service', Authport.app);
// ----------------------------------------------------------

app.get('/', function (req, res) {
  // check if the user is logged in by checking his session,
  // if no session found redirect to makerpass login page
  if (!req.session.token) {
    res.redirect('/auth/makerpass');
  } else {
    res.sendFile(path.join(__dirname, '/../client/public/index.html'));
  }
});

// Socket.io listeners / emitters
io.on('connection', function (socket) {
  console.log('a user connected');
  // Listen for Audience button clicks
  socket.on('updatePulse', function (action, currTime) {
    console.log('updatePulse event: ', action, currTime);
    // Broadcast to presenter (technically also everyone else)
    io.emit('updatedPulse', action, currTime);
  });  
});

// helper function for creating a session
var createSession = function (req, res, token) {
  return req.session.regenerate(function () {
    req.session.token = token;
    res.redirect('/');
  });
};

// HEROKU ENV VAR OR LOCALHOST:5000
var port = process.env.PORT || 5000;

// http server listening to port (HTTP needed for Socket.io)
http.listen(port, function () {
  console.log('Listening on ' + port);
});
