// Dependencies
const express = require('express');
const router = express.Router();
const collegeController = require('./../../controllers/collegeController');
const departmentController = require('./../../controllers/departmentController');
const classController = require('./../../controllers/classController');
const config = require('./../../../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// '/college' GET route
router.get('/', (req, res, next) => {
  collegeController.getAllColleges((err, colleges) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: colleges});
  }); 
});

// '/college' POST route
router.post('/', config.validateRequest, (req, res, next) => {
  collegeController.addCollege(req.body, (err, college) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: college});
  });
});

// '/college/:collegeId' GET Route
router.get('/:collegeId', config.validateRequest, (req, res, next) => {
  collegeController.getCollege(req.params.collegeId, (err, status, college) => {
    res.status(status).json({err: err, data: college});
  });
});

// '/college/:collegeId/department/' GET route to get departments of a college
router.get('/:collegeId/department', config.validateRequest, (req, res, next) => {
  collegeController.getCollegeDepartments(req.params.collegeId, (err, status, departments) => {
    res.status(status).json({err:err, data: departments})
  });
});

// '/college/:collegeId/class' GET route to get classes of a college
router.get('/:collegeId/class', config.validateRequest, (req, res, next) => {
  collegeController.getCollegeClasses(req.params.collegeId, (err, status, classes) => {
    res.status(status).json({err: err, data: classes});
  });
});

// '/college/:collegeId/student' GET route to get students of a college
router.get('/:collegeId/student', config.validateRequest, (req, res, next) => {
  collegeController.getCollegeStudents(req.params.collegeId, (err, status, classes) => {
    res.status(status).json({err: err, data: success});
  });
});

// '/college/:collegeId/staff' GET route
router.get('/:collegeId/staff', (req, res, next) => {

});

// '/college/:collegeId/post' GET route to get posts of a college
router.get('/:collegeId/post', config.validateRequest, (req, res, next) => {
  collegeController.getCollegePosts(req.params.collegeId, (err, status, posts) => {
    res.status(status).json({err: err, data: posts});
  });
});

// POST 'college/:collegeId/department' POST route to add a new department
router.post('/:collegeId/department', (req, res, next) => {
  departmentController.addDepartment(req.params.collegeId, req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// POST 'college/:collegeId/department/:departmentId/class/' route to add a new class 
router.post('/:collegeId/department/:departmentId/class', (req, res, next) => {
  classController.addClass(req.params.collegeId, req.params.departmentId, req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// POST 'college/:collegeId/student/:studentId/' route to join a college
router.post('/:collegeId/student/:studentId/join', config.validateRequest, (req, res, next) => {
  collegeController.joinCollege(req.params.collegeId, req.params.studentId, (err, status, success) => {
    res.status(status).json({err: err, success: success});
  })
});

// 

module.exports = router;