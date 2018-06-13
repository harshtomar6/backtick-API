// Dependencies
const jwt = require('jwt-simple');
const { getUserById } = require('./controllers/userController');
const controller = require('./controllers');

// Superuser validator
const validateSuperuser = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key) {
    let decoded = jwt.decode(token, process.env.SESSION_SECRET);

    if(decoded.exp <= Date.now()){
      res.status(400).json({err: 'Token expired ! Login Again', data:null});
      return;
    }

    if(decoded.userId !== key){
      res.status(401).json({err: 'Invalid Key - Token Pair', data: null});
      return;
    }

    controller.getSuperuser(key, (err, status, su) => {
      if(status === 200)
        next();
      else
        res.status(status).send({err: err, data: null});
    });
  }else
    res.status(400).send({err: 'Key or Token Not Found !', data: null});
}

// Admin Validator
const validateAdmin = (req, res, next) => {
  let token = req.headers['x-access-token'];
  let key = req.headers['x-key'];

  if(token && key) {
    let decoded = jwt.decode(token, process.env.SESSION_SECRET);

    if(decoded.exp <= Date.now()){
      res.status(400).json({err: 'Token expired ! Login Again', data:null});
      return;
    }

    if(decoded.userId !== key){
      res.status(401).json({err: 'Invalid Key - Token Pair', data: null});
      return;
    }

    if(req.params.collegeId && req.params.collegeId !== decoded.scope){
      res.status(401).send({err: 'Not Allowed !', data: null});
      return;
    }

    controller.getSuperuser(key, (err, status, su) => {
      if(status === 200)
        next();
      else if(status === 404){
        controller.getUserById(key, (err, status, user) => {
          if(status === 200 && user.type === 'Admin')
            next(); 
          else if(user.type !== 'Admin')
            res.status(401).send({err: 'Not Allowed', data: null});
          else
            res.status(status).send({err: err, data: null});
        });
      }else
        res.status(status).send({err: err, data: null});
    });
  }else
    res.status(400).send({err: 'Key or Token Not Found !', data: null});
}

const canAccessResource = (userType, resource) => {
  
}


module.exports = {
  validateSuperuser,
  validateAdmin
}