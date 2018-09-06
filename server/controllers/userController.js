const axios = require('axios');
const User = require('../models/user');
const JWT = require('../helpers/jwt');

module.exports = {

  fbSignin: (req, res) => {
    let fbtoken = req.headers.fbtoken;

    axios({
      method: 'get',
      url: `https://graph.facebook.com/me?fields=id,name,email&access_token=${fbtoken}`
    })
    .then(response => {
      // DATA FACEBOOK 
      let fbEmail = response.data.email;

      User.findOne({email: fbEmail})
      .then(user => {

        return new Promise((resolve, reject) => {
          resolve(user);
        });

        // if(!user) {
        //   User.create({email: fbEmail})
        //   .then(created => {
        //     JWT.encode({email: created.email}, (err, token) => {
        //       if(err) {

        //       } else {

        //       }
        //     });
        //   })
        //   .catch(err => {
        //     res.status(500).json({
        //       message: 'Error create new user',
        //       error: err
        //     });
        //   });
        // } else {
          
        // }
      })
      .then((user) => {
        if(!user) {
          return User.create({email: fbEmail})
          .then(created => {
            JWT.encode({email: created.email}, (err, token) => {
              if(err) {

              } else {

              }
            });
          })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error find data from database by email',
          error: err
        });
      });

      // console.log(response.data, '<============ RESPONSE userController');
    })
    .catch(err => {
      console.log(err, '<=============== ERROR[userController.js]')
    });
  }

}