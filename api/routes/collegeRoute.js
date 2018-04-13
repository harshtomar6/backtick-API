// Dependencies
let express = require('express');
let router = express.Router();
let collegeController = require('./../controllers/collegeController');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
router.post('/', (req, res, next) => {
  collegeController.addCollege(req.body, (err, college) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: college});
  });
});

// '/college/:collegeId' GET Route
router.get('/:collegeId', (req, res, next) => {
  collegeController.getCollege(req.params.collegeId, (err, college) => {
    if(err)
      res.status(500).json({err: err, data: null});
    else
      res.status(200).json({err: null, data: college});
  });
});

// '/college/department/:collegeId' GET route
router.get('/department/:collegeId', (req, res, next) => {

});0

// '/college/class/:collegeId' GET route
router.get('/class/:collegeId', (req, res, next) => {

});

// '/college/student/:collegeId' GET route
router.get('/student/:collegeId', (req, res, next) => {

});

// '/college/staff/:collegeId' GET route
router.get('/staff/:collegeId', (req, res, next) => {

});

// POST 'college/:collegeId/student/:studentId/' route to join a college
//router.post('/:collegeId/')

module.exports = router;