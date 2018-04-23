// Dependencies
const jwt = require('jwt-simple');

let generateToken = user => {
  let expires = expiresIn(7);
  let token = jwt.encode({
    exp: expires
  }, process.env.SESSION_SECRET);

  return {
    token,
    key: user._id,
    expires,
    user 
  }
}

let expiresIn = (num) => {
  let date = new Date();
  return date.setDate(date.getDate() + num);
}

module.exports = {generateToken}