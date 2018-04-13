// Dependencies
let express = require('express');
let router = express.Router();
let studentController = require('./../controllers/studentController');
let postController = require('./../controllers/postController');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(function(req, res, next){
  if(req.query.key === 'asdjkawdioadjskdsadlasd')
    next();
  else
    res.status(400).json({err: 'Please enter valid key', data: null});
});

// GET '/student' route
router.get('/', (req, res, next) => {
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

// GET '/student/:studentId' route
router.get('/:studentId', (req, res, next) => {
  studentController.getStudent(req.params.studentId, (err, status, student) => {
    res.status(status).json({err: err, data: student});
  });
});

// PUT '/student/:studentId' route
router.put('/:studentId', (req, res, next) => {
  studentController.modifyStudent(req.params.studentId, req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// GET '/student/:studentId/post' route to fetch all posts of a student
router.get('/:studentId/post', (req, res, next) => {
  postController.getOwnerPosts(req.params.studentId, (err, posts) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: post});
  });
});

module.exports = router;