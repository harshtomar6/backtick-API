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
  collegeController.getCollege(req.params.collegeId, (err, status, college) => {
    res.status(status).json({err: err, data: college});
  });
});

// '/college/:collegeId/department/' GET route
router.get('/:collegeId/department', (req, res, next) => {
  collegeController.getCollegeDepartments(req.params.collegeId, (err, status, departments) => {
    res.status(status).json({err:err, data: departments})
  });
});

// '/college/:collegeId/class' GET route
router.get('/:collegeId/class', (req, res, next) => {
  collegeController.getCollegeClasses(req.params.collegeId, (err, status, classes) => {
    res.status(status).json({err: err, data: classes});
  });
});

// '/college/:collegeId/student' GET route
router.get('/:collegeId/student', (req, res, next) => {
  collegeController.getCollegeStudents(req.params.collegeId, (err, status, classes) => {
    res.status(status).json({err: err, data: success});
  });
});

// '/college/:collegeId/staff' GET route
router.get('/:collegeId/staff', (req, res, next) => {

});

// POST 'college/:collegeId/student/:studentId/' route to join a college
router.post('/:collegeId/student/:studentId', (req, res, next) => {
  collegeController.joinCollege(req.params.collegeId, req.params.studentId, (err, status, success) => {
    res.status(status).json({err: err, success: success});
  })
});

module.exports = router;