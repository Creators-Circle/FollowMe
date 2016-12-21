// TODO: FILTRATION BEFORE SENDING BACK EVENTS
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
// TODO: require('dot-env')

// code from the express.static docs
app.use(express.static(path.join(__dirname, '/../client/public/')));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/../client/public/index.html'));
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

// HEROKU ENV VAR OR LOCALHOST:5000
var port = process.env.PORT || 5000;

// http server listening to port (HTTP needed for Socket.io)
http.listen(port, function () {
  console.log('Listening on ' + port);
});
