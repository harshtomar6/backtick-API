// Dependencies
const express = require('express');
const router = express.Router();
const config = require('./../../../config');
const controller = require('./../../controllers');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/department' route
router.get('/', (req, res, next) => {
  controller.getAllDepartments((err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// GET '/department/:departmentId/class' route to get all classes in a department
router.get('/:departmentId/class', config.validateRequest, (req, res, next) => {
  controller.getDepartmentClasses(req.params.departmentId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// GET '/department/:departmentId/student' route to get all students in a department
router.get('/:departmentId/student', config.validateRequest, (req, res, next) => {
  controller.getDepartmentStudents(req.params.departmentId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// POST '/department/:departmentId/student/join' route to join a department (student)
router.post('/:departmentId/student/join', config.validateRequest, (req, res, next) => {
  controller.joinDepartment(req.params.departmentId, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// POST '/department/:departmentId/staff/join' route to join a department (staff)
router.post('/:departmentId/staff/join', config.validateRequest, (req, res, next) => {
  controller.joinDepartmentStaff(req.params.departmentId, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// GET '/department/:departmentId/post' route to get all posts of a department
router.get('/:departmentId/post', config.validateRequest, (req, res, next) => {
  controller.getDepartmentPosts(req.params.departmentId, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

module.exports = router;