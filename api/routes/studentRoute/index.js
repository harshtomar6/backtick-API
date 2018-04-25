// Dependencies
const express = require('express');
const router = express.Router();
const studentController = require('./../../controllers/studentController');
const postController = require('./../../controllers/postController');
const config = require('./../../../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/student' route
router.get('/', (req, res, next) => {
  console.log(req.get('host'));
  studentController.getAllStudents((err, students) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: students});
  });
});

// POST '/student' route
router.post('/', (req, res, next) => {
  studentController.addStudent(req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// POST '/student/social' route for social media login
router.post('/social', (req, res, next) => {
  studentController.addOrFindStudent(req.body, (err, status, success) => {
      res.status(status).json({err: err, data: success});
  })
});

// GET '/student/:studentId' route
router.get('/:studentId', config.validateRequest, (req, res, next) => {
  studentController.getStudent(req.params.studentId, (err, status, student) => {
    res.status(status).json({err: err, data: student});
  });
});

// PUT '/student/:studentId' route
router.put('/:studentId', config.validateRequest, (req, res, next) => {
  studentController.modifyStudent(req.params.studentId, req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// GET '/student/:studentId/post' route to fetch all posts of a student
router.get('/:studentId/post', config.validateRequest, (req, res, next) => {
  postController.getOwnerPosts(req.params.studentId, (err, posts) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: posts});
  });
});

module.exports = router;