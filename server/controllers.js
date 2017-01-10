// js file for accessing the database
var db = require('./db.js');

module.exports = {
  // getting user information from the users table
  getUser: function (req, res) {
    db('users').where('id', req.session.userId)
      .then(function (data) {
        var user = data[0];
        res.send({name: user.name, avatar: user.avatar, email: user.email, id: user.id});
      });
  },
  saveUser: function (user) {
    return db('users').where('id', user.id)
      .then(function (res) {
        if (res.length > 0) {
          // if user exists in the database update user info
          return db('users').where('id', user.id).update(user);
        } else {
          console.log("didn't exist");
          // save user info to the database then return a promise
          return db('users').insert(user);
        }
      });
  },
  saveEndTime: function (endLecture) {
    return db('lectures').where('id', endLecture.id).update({
      // use db.fn.now() to capture the current time on the server side
      // so that both start and end time are serverside
      end_time: db.fn.now()
    })
      .then(/*console.log('successfully updated endLecture')*/);
  },
  // save lecture info to the database then return a promise
  saveLecture: function (lecture) {
    return db('lectures').insert({
      id: lecture.id,
      name: lecture.name,
      presentation_id: lecture.presentationId
    })
      .then(() => {
        module.exports.userLecture(lecture);
      });
  },
  // Toggle guest permission to attend lecture
  guestsToggle: function (lecture) {
    return db('lectures')
    .where({'id': lecture.lectureId})
    .update({
      guest: lecture.guestsPermitted
    })
    .then(/*console.log(`successfully updated guest permissions for ${lecture.lectureId}`)*/);
  },
  checkGuestsPermitted: function (lectureId) {
    return db.select('guest').from('lectures')
    .where('id', lectureId)
    .then((guestsPermitted) => guestsPermitted[0].guest);
  },
  // Associate a lecture and a user in the user_lectures table
  userLecture: function (lecture) {
    return db('user_lectures').insert({
      user_id: lecture.userId,
      lecture_id: lecture.id,
      role: lecture.role
    })
      .then(() => {
        // console.log('successfully associated a lecture to a user' );
      });
  },
  // save a click to the database then return a promise
  saveClick: function (click) {
    return db('users_clicks').insert({
      lecture_id: click.lectureId,
      user_id: click.userId,
      date: click.date
    })
      .then((data) => {
        // console.log('successfully inserted');
      });
  },
  // save a question to the database then return a promise
  saveQuestion: function (question) {
    console.log('saveQuestion event fired');
    return db('questions').insert({
      id: question.questionId,
      lecture_id: question.lectureId,
      user_id: question.userId,
      question: question.questionText,
      votes: 1
    })
    .then(() => {
      console.log('successfully saved question');
    });
  },
  // save an upvote to the database then return a promise
  saveUpvote: function (upvote) {
    return db('upvotes')
    .insert({
      user_id: upvote.userId,
      question_id: upvote.questionId
    })
    .then(() => {
      return db('questions')
      .where({
        id: upvote.questionId
      })
      .increment('votes', 1);
    });
  },
  saveDownvote: function (downvote) {
    return db('upvotes')
    .where({
      question_id: downvote.questionId
    })
    .del()
    .then(() => {
      return db('questions')
      .where({
        id: downvote.questionId
      })
      .decrement('votes', 1);
    });
  },
  // save a 'thumbs' topic to the database then return a promise
  saveTopic: function (topicId, topic, lectureId) {
    console.log('savetopic event fired, topicId, topic, lectureId', topicId, topic, lectureId);
    return db('topics').insert({
      id: topicId,
      lecture_id: lectureId,
      topic: topic
    })
    .then(() => { /* console.log('successfully saved topic entry'); */ });
  },
  // save a thumb choice to the database then return a promise
  saveThumbChoice: function (topicId, userId, thumbChoice) {
    // translate thumbChoice for DB
    thumbChoice = thumbChoice === 'up' ? 1 : thumbChoice === 'side' ? 2 : 3;
    return db('thumbs').insert({
      topic_id: topicId,
      user_id: userId,
      type: thumbChoice
    })
    .then(() => { /* console.log('successfully saved user\'s thumb choice'); */ });
  },
  // function for getting all the lectures connected to the user
  getUserLectures: function (req, res) {
    var user = req.session.userId;
    db.select('*').from('lectures')
    .join('user_lectures', 'lectures.id', 'user_lectures.lecture_id')
    .where({user_id: user}).orderBy('date', 'desc')
    .then(function (data) {
      res.send(data);
    });
  },
  // getting the summary for lectures
  getSummary: function (req, res) {
    var lectureId = req.params.lecture_id;
    var summary = {};
    // get all the users connected to the lecture
    db.select('*').from('users')
    .join('user_lectures', 'users.id', 'user_lectures.user_id')
    .where('lecture_id', lectureId)
    .then(function (users) { summary.users = users; })
    .then(function () {
      // get all the clicks of the users
      return db.select('*').from('users_clicks').where('lecture_id', lectureId);
    })
    .then(function (clicks) { summary.clicks = clicks; })
    .then(function () {
      // get all the questions for the lecture
      return db.select('*').from('questions').where('lecture_id', lectureId);
    })
    .then(function (questions) { summary.questions = questions; })
    .then(function () {
      // get all the upvotes
      return db.select('*').from('questions')
      .join('upvotes', 'questions.id', 'upvotes.question_id')
      .where('lecture_id', lectureId);
    })
    .then(function (upvotes) { summary.upvotes = upvotes; })
    .then(function () {
      return db.select('*').from('topics').join('thumbs', 'thumbs.topic_id', 'topics.id')
      .where('lecture_id', lectureId);
    })
    .then(function (thumbs) { summary.thumbs = thumbs; })
    .then(function () {
      return db.select('*').from('lectures').where('id', lectureId);
    })
    .then(function (lecture) {
      summary.lecture = lecture;
      res.send(summary);
    });
  },
  // inserting comment in the database
  addComment: function (req, res) {
    var lectureId = req.params.lecture_id;
    var userId = req.params.user_id;
    var comment = req.body.comment;
    return db('user_lectures').where({lecture_id: lectureId, user_id: userId})
    .update({comment: comment})
    .then(function (data) {
      res.send('succes');
    });
  },
  // fetching a specific comment
  getComment: function (req, res) {
    var lectureId = req.params.lecture_id;
    var userId = req.params.user_id;
    return db.select('*').from('user_lectures')
    .where({lecture_id: lectureId, user_id: userId})
    .then(function (data) {
      res.send(data);
    });
  }
};
