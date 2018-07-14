// Dependencies
const express = require('express');
const router = express.Router();
const controller = require('./../controllers');
const { validateSuperuser, validateUser } = require('./../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/user' to get all users;
router.get('/', validateSuperuser, (req, res, next) => {
  
});

// GET '/user/student' to get all student
router.get('/student', validateSuperuser, (req, res, next) => {
  controller.getAllStudents((err, status, students) => {
    res.status(status).send({err: err, data: students});
  });
});

// POST '/user/student' to create or authenticate new student
router.post('/student', (req, res, next) => {
  controller.addStudent(req.body, (err, status, success) => {
    res.status(status).send({err: err, data: success});
  });
});

// POST '/user/staff' to create or authenticate new staff
router.post('/staff', (req, res, next) => {
  controller.addStaff(req.body, (err, status, success) => {
    res.status(status).send({err: err, data: success});
  });
});

// POST '/user/su' to create or authenticate new SuperUser (only 2 are allowed)
router.post('/su', (req, res, next) => {
  controller.addSuperuser(req.body, (err, status, success) => {
    res.status(status).send({err: err, data: success});
  });
});

// POST '/user/admin' to create
router.post('/admin', (req, res, next) => {
  controller.addAdmin(req.body, (err, status, success) => {
    res.status(status).send({err: err, data: success});
  });
});

// PUT '/user/:userId' route to modify Student Details
router.put('/:userId', validateUser, (req, res, next) => {
  controller.modifyUser(req.params.userId, req.body, (err, status, success) => {
    res.status(status).json({err: err, data: success});
  });
});

// GET '/user/bulletin' to fetch posts of all groups
router.get('/bulletin', validateUser, (req, res, next) => {
  controller.getBulletin(req.headers['x-key'], (err, status, data) => {
    res.status(status).send({err: err, data: data});
  })
});

// GET '/user/bulletin/:pageNumber' to paginate bulletin posts
router.get('/bulletin/page/:pageNumber', validateUser, (req, res, next) => {
  if(req.params.pageNumber < 1 )
    res.status(400).send({err: 'Please Enter Valid Page Number', data: null});
  else{
    let perPage = req.query.limit>0 ? parseInt(req.query.limit) : 10;
    controller.getBulletinByPage(req.headers['x-key'], req.params.pageNumber, perPage, 
      (err, status, posts) => {
        res.status(status).send({err: err, data: posts});
      }
    )
  }
});

module.exports = router;