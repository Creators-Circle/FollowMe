// file for setting all the routes
let router = require('express').Router();
let controllers = require('./controllers.js');

router.get('/user', controllers.getUser);
router.get('/userLectures', controllers.getUserLectures);
router.get('/summary/:lecture_id', controllers.getSummary);
router.post('/:lecture_id/comment/:user_id', controllers.addComment);
router.get('/:lecture_id/comment/:user_id', controllers.getComment);
router.get('/lecturecheck/:lecture_id', controllers.lectureCheck);

module.exports = router;
