// Dependencies
const jwt = require('jwt-simple');

const generateToken = user => {
  let expires = expiresIn(7);
  let token = jwt.encode({
    exp: expires,
    userId: user._id
  }, process.env.SESSION_SECRET);

  return {
    token,
    key: user._id,
    expires,
    user 
  }
}

// Generate Token for Admin
const generateTokenForAdmin = admin => {
  let expires = expiresIn(7);
  let token = jwt.encode({
    exp: expires,
    userId: admin._id,
    scope: admin.groups[0]._id
  }, process.env.SESSION_SECRET);

  return {
    token,
    key: admin._id,
    expires,
    admin
  }
}

const expiresIn = (num) => {
  let date = new Date();
  return date.setDate(date.getDate() + num);
}

module.exports = {
  generateToken,
  generateTokenForAdmin
}