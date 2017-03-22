// js file for accessing the database

const db = require('./db.js');

module.exports = {
  // getting user information from the users table
  getUser: function (req, res) {
    db('users').where('id', req.session.userId)
      .then((data) => {
        const user = data[0];
        res.send({name: user.name, avatar: user.avatar, email: user.email, id: user.id});
      });
  },
  //  Checks if a user exists and updates/inserts appropriately
  saveUser: function (user) {
    return db('users').where('id', user.id)
      .then((res) => {
        if (res.length > 0) {
          // if user exists in the database update user info
          return db('users').where('id', user.id).update(user);
        } else {
          // save user info to the database then return a promise
          return db('users').insert(user);
        }
      });
  },
  //  Saves end time for handling summary view and logging clicks.
  saveEndTime: function (endLecture) {
    return db('lectures').where('id', endLecture.id).update({
      // use db.fn.now() to capture the current time on the server side
      // so that both start and end time are serverside
      end_time: db.fn.now()
    })
      .then(/*necessary for knex*/);
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
  // update the title of lecture to the database
  updateLectureTitle: function (title, lectureId) {
    return db('lectures').update({name: title})
    .where('id', lectureId).then(/*.then for knex*/);
  },
  // Toggle guest permission to attend lecture
  guestsToggle: function (lecture) {
    return db('lectures')
    .where({'id': lecture.lectureId})
    .update({
      guest: lecture.guestsPermitted
    })
    .then(/*still necessary for knex*/);
  },
  // Checks if guests are allowd for a given presentation
  checkGuestsPermitted: function (lectureId) {
    return db.select('guest').from('lectures')
    .where('id', lectureId)
    .then((guestsPermitted) => guestsPermitted[0].guest);
  },
  // Associate a lecture and a user in the user_lectures table
  userLecture: function (lecture) {
    // check whether this user has already been added to this lecture
    return db.select().from('user_lectures')
    .where({
      user_id: lecture.userId,
      lecture_id: lecture.id
    })
      .then((data) => {
        // Data returns an array with length 0 if no entry is found
        if (!data.length) {
          // Add them if they haven't
          return db('user_lectures')
          .insert({
            user_id: lecture.userId,
            lecture_id: lecture.id,
            role: lecture.role
          })
          .then(/*for knex*/);
        }
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
      return db('user_lectures').where({user_id: click.userId, lecture_id: click.lectureId})
      .increment('no_of_clicks', 1);
    }).then(/*for knex*/);
  },
  // save a question to the database then return a promise
  saveQuestion: function (question) {
    return db('questions').insert({
      id: question.questionId,
      lecture_id: question.lectureId,
      user_id: question.userId,
      question: question.questionText,
      votes: 0
    })
    .then(/*for knex*/);
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
    const user = req.session.userId;
    db.select('*').from('lectures')
    .join('user_lectures', 'lectures.id', 'user_lectures.lecture_id')
    .where({user_id: user}).orderBy('date', 'desc')
    .then((data) => {
      res.send(data);
    });
  },
  // getting info for Summary View
  getSummary: function (req, res) {
    const lectureId = req.params.lecture_id;
    const summary = {};
    // get all the users connected to the lecture
    db.select('*').from('users')
    .join('user_lectures', 'users.id', 'user_lectures.user_id')
    .where('lecture_id', lectureId)
    .then((users) => { summary.users = users; })
    .then(() => {
      // get all the clicks of the users
      return db.select('*').from('users_clicks').where('lecture_id', lectureId);
    })
    .then((clicks) => { summary.clicks = clicks; })
    .then(() => {
      // get all the questions for the lecture
      return db.select('*').from('questions').where('lecture_id', lectureId);
    })
    .then((questions) => { summary.questions = questions; })
    .then(() => {
      // get all the upvotes
      return db.select('*').from('questions')
      .join('upvotes', 'questions.id', 'upvotes.question_id')
      .where('lecture_id', lectureId);
    })
    .then((upvotes) => { summary.upvotes = upvotes; })
    .then(() => {
      return db.select('*').from('topics').join('thumbs', 'thumbs.topic_id', 'topics.id')
      .where('lecture_id', lectureId);
    })
    .then((thumbs) => { summary.thumbs = thumbs; })
    .then(() => {
      return db.select('*').from('lectures').where('id', lectureId);
    })
    .then((lecture) => {
      summary.lecture = lecture;
      res.send(summary);
    });
  },
  // inserting comment in the database
  addComment: function (req, res) {
    const lectureId = req.params.lecture_id;
    const userId = req.params.user_id;
    const comment = req.body.comment;
    return db('user_lectures').where({lecture_id: lectureId, user_id: userId})
    .update({comment: comment})
    .then((data) => {
      res.send('success');
    });
  },
  // fetching a specific comment
  getComment: function (req, res) {
    const lectureId = req.params.lecture_id;
    const userId = req.params.user_id;
    return db.select('*').from('user_lectures')
    .where({lecture_id: lectureId, user_id: userId})
    .then((data) => {
      res.send(data);
    });
  },
  // Checks if a given lecture_id exists.
  lectureCheck: function (req, res) {
    const lectureId = req.params.lecture_id;
    return db.select('*').from('lectures').where('id', lectureId)
      .then((data) => {
        res.send(data);
      });
  }
};
