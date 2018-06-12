// Dependencies
const jwt = require('jwt-simple');
const studentController = require('./api/controllers/studentController');
const staffController = require('./api/controllers/staffController');

// Validate any admin, student or staff
const validateRequest = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key){
    try{
      let decoded = jwt.decode(token, process.env.SESSION_SECRET);

      if(decoded.exp <= Date.now()){
        res.status(400).json({err: 'Token expired ! Login Again', data:null});
        return;
      }

      if(decoded.userId !== key){
        res.status(401).json({err: 'Invalid Key - Token Pair', data: null});
        return;
      }

      studentController.getStudent(key, (err, status, student) => {
        if(status == 404){
          staffController.getStaffById(key, (err, status, staff) => {
            if(status == 404){
              //admin controller here
            }
            else if(status == 200)
              next();
            else
              res.status(status).send({err: err, data: null});
          });
        }
        else if(status == 200)
          next()
        else
          res.status(status).send({err: err, data: null});
      });
    }catch(err){
      res.status(500).json({err: 'Cannot Authenticate Access Token', data: null})
    }
  }else{
    res.status(401).json({err: 'Key Or Token Not Found', data: null});
  }
}

// Validate Admin
const validateAdmin = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key){
    try{
      let decoded = jwt.decode(token, process.env.SESSION_SECRET);
      
      if(decoded.exp <= Date.now()){
        res.status(400).json({err: 'Token expired ! Login Again', data:null});
        return;
      }

      if(decoded.userId !== key){
        res.status(401).json({err: 'Invalid Key - Token Pair', data: null});
        return;
      }

      
    }catch(err){
      res.status(500).send({err: 'Cannot Authenticate Access Token', data: null});
    }
  }else
    res.status(401).send({err: 'Key Or Token Not Found', data: null});
}

// Validate Student
const validateStudent = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key){
    try{
      let decoded = jwt.decode(token, process.SESSION_SECRET);

      if(decoded.exp <= Date.now()){
        res.status(401).json({err: 'Token Expired ! Login Again', data: null});
        return;
      }

      if(decoded.userId !== key){
        res.status(401).json({err: 'Invalid Key - Token Pair', data: null});
        return;
      }

      studentController.getStudent(key, (err, status, student) => {
        if(status === 200){
          next();
        }else{
          res.status(status).send({err: err, data: null});
        }
      });
    }catch(err){
      res.status(500).send({err: 'Cannot Authenticate Access Token', data: null});
    }
  }else
    res.status(401).send({err: 'Key Or Token Not Found', data: null})
}

// Validate Staff
const validateStaff = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key){
    try{
      let decoded = jwt.decode(token, process.SESSION_SECRET);

      if(decoded.exp <= Date.now()){
        res.status(401).json({err: 'Token Expired ! Login Again', data: null});
        return;
      }

      if(decoded.userId !== key){
        res.status(401).json({err: 'Invalid Key - Token Pair', data: null});
        return;
      }

      staffController.getStaff(key, (err, status, student) => {
        if(status === 200){
          next();
        }else{
          res.status(status).send({err: err, data: null});
        }
      });
    }catch(err){
      res.status(500).send({err: 'Cannot Authenticate Access Token', data: null});
    }
  }else 
    res.status(401).send({err: 'Key Or Token Not Found', data: null})
}

// Check Same User Resource Authenticity
const validateSameUserResource = (req, res, next) => {
  
}

module.exports = {
  validateRequest,
  validateStaff,
  validateStudent
}