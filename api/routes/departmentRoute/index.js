// Dependencies
const express = require('express');
const router = express.Router();
const config = require('./../../../config');
const departmentController = require('./../../controllers/departmentController');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/department' route
router.get('/', (req, res, next) => {
  departmentController.getAllDepartments((err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// GET '/department/:departmentId/class' route to get all classes in a department
router.get('/:departmentId/class', config.validateRequest, (req, res, next) => {
  departmentController.getDepartmentClasses(req.params.departmentId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// GET '/department/:departmentId/student' route to get all students in a department
router.get('/:departmentId/student', config.validateRequest, (req, res, next) => {
  departmentController.getDepartmentStudents(req.params.departmentId, (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

// POST '/department/:departmentId/join' route to join a class
router.post('/:departmentId/join', config.validateRequest, (req, res, next) => {
  departmentController.joinDepartment(req.params.departmentId, req.headers['x-key'], (err, status, data) => {
    res.status(status).json({err: err, data: data});
  });
});

module.exports = router;