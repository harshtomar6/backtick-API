// Dependencies
const express = require('express');
const router = express.Router();
const controller = require('./../../controllers');
const config = require('./../../../config');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key");
  next();
});

// GET '/staff' to get all staff
router.get('/', (req, res, next) => {
  controller.getAllStaff((err, staff) => {
    if(err)
      res.status(500).send({err: err, data: null});
    else
      res.status(200).send({err: null, data: staff});
  });
});

// POST '/staff' to add new Staff
router.post('/', (req, res, next) => {
  controller.addStaff(req.body, (err, status, staff) => {
    res.status(status).send({err: err, data: staff});
  })
});

// POST '/staff/social' for social media logins
router.post('/social', (req, res, next) => {
  controller.addOrFindStaff(req.body, (err, status, staff) => {
    console.log(err);
    res.status(status).send({err: err, data: staff});
  });
});

// GET '/staff/staffId' route to get a particular staff
router.get('/:staffId', config.validateRequest, (req, res, next) => {
  controller.getStaff(req.params.staffId, (err, status, staff) => {
    res.status(status).send({err: err, data: staff});
  });
});

// PUT '/staff/staffId' route to modify staff details
router.put('/:staffId', config.validateRequest, (req, res, next) => {
  controller.modifyStaff(req.params.staffId, req.body, (err, status, staff) => {
    console.log(err);
    res.status(status).send({err: err, data: staff});
  });
});

// GET '/staff/:staffId/post' route to get all posts of a staff
router.get("/:staffId/post", config.validateRequest, (req, res, next) => {
  controller.getOwnerPosts(req.params.staffId, (err, posts) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: posts});
  });
});
 
module.exports = router;