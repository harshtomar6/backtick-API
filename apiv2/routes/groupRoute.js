// Dependencies
const express = require('express');
const router = express.Router();
const controller = require('./../controllers');
const { validateSuperuser, validateAdmin } = require('./../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/group/college' to get all Colleges
router.get('/college', validateSuperuser, (req, res, next) => {
  controller.getAllColleges((err, status, colleges) => {
    res.status(status).send({err: err, data: colleges});
  });
});

// POST '/group/college' to create new college
router.post('/college', validateSuperuser, (req, res, next) => {
  controller.addCollege(req.body, (err, status, success) => {
    res.status(status).send({err: err, data: success});
  });
});

// GET '/group/college/:collegeId' to get a particular college
router.get('/college/:collegeId', validateAdmin, (req, res, next) => {
  controller.getCollege(req.params.collegeId, (err, status, college) => {
    res.status(status).send({err: err, data: college});
  });
});

// GET '/group/college/:collegeId/department' to get all departments of a college
router.get('/college/:collegeId/department', validateAdmin, (req, res, next) => {
  controller.getCollegeDepartments(req.params.collegeId, (err, status, departments) => {
    res.status(status).send({err: err, data: departments});
  });
});

// GET '/group/department/:departmentId' to get a particular department
router.get('/department/:departmentId', validateAdmin, (req, res, next) => {
  controller.getDepartment(req.params.departmentId, (err, status, department) => {
    res.status(status).send({err: err, data: department});
  });
});

// POST '/group/college/:collegeId/department' to create new department of a college
router.post('/college/:collegeId/department', validateAdmin, (req, res, next) => {
  controller.addDepartment(req.params.collegeId, req.body, (err, status, success) => {
    res.status(status).send({err: err, data: success});
  });
});

// GET '/group/college/:collegeId/class' to get all classes of a college
router.get('/college/:collegeId/class', validateAdmin, (req, res, next) => {
  controller.getCollegeClass(req.params.collegeId, (err, status, classes) => {
    res.status(status).send({err: err, data: classes});
  });
})

// POST '/group/department/:departmentId/class' to create a new class
router.post('/department/:departmentId/class', validateAdmin, (req, res, next) => {
  controller.addClass(req.params.departmentId, req.body, (err, status, success) => {
    res.status(status).send({err: err, data: success});
  });
});

// GET '/group/department/:departmentId/class' to get all classes of a department
router.get('/department/:departmentId/class', validateAdmin, (req, res, next) => {
  controller.getDepartmentClass(req.params.departmentId, (err, status, classes) => {
    res.status(status).send({err: err, data: classes});
  });
}); 

// GET '/group/college/:collegeId/student' to get all students of a college
router.get('/college/:collegeId/student', validateAdmin, (req, res, next) => {
  controller.getGroupStudents(req.params.collegeId, (err, status, students) => {
    res.status(status).send({err: err, data: students});
  });
});

// GET '/group/department/:departmentId/student' to get all students of a college
router.get('/department/:departmentId/student', validateAdmin, (req, res, next) => {
  controller.getGroupStudents(req.params.departmentId, (err, status, students) => {
    res.status(status).send({err: err, data: students});
  });
});

module.exports = router;