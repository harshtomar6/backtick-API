// Dependencies
const express = require('express');
const router = express.Router();
const controller = require('./../controllers');
const { validateSuperuser } = require('./../config');

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
router.get('/college/:collegeId', validateSuperuser, (req, res, next) => {
  controller.getCollege(req.params.collegeId, (err, status, college) => {
    res.status(status).send({err: err, data: college});
  });
});

// GET '/group/college/:collegeId/department' to get all departments of a college
router.get('/college/:collegeId/department', validateSuperuser, (req, res, next) => {
  controller.getCollegeDepartments(req.params.collegeId, (err, status, departments) => {
    res.status(status).send({err: err, data: departments});
  });
});

// POST '/group/college/:collegeId/department' to create new department of a college
router.post('/college/:collegeId/department', validateSuperuser, (req, res, next) => {
  controller.addDepartment(req.params.collegeId, req.body, (err, status, success) => {
    res.status(status).send({err: err, data: success});
  });
});

module.exports = router;