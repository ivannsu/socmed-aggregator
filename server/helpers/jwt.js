require('dotenv').config()

const jwt = require('jsonwebtoken');

class JWT {
  static encode(data, cb) {
    jwt.sign(data, process.env.JWT_SECRET_KEY, function(err, token) {

      if(err) {
        cb(err, null);
      } else {
        cb(null, token);
      }
      
    });  
  }

  static decode() {

  }
}

module.exports = JWT;