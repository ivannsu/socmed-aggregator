require('dotenv').config()

const axios = require('axios');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

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

        if(!user) {
          User.create({email: fbEmail})
          .then(user => {
            jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, function(err, token) {
              if(err) {
                res.status(500).json({
                  message: 'Error generate token',
                  error: err
                });
              } else {
  
                res.status(200).json({
                  message: 'Success generate token',
                  token: token
                });
              }
            });
          })
          .catch(err => {
            res.status(500).json({
              message: 'Error create new user',
              error: err
            });
          })
        } else {

          jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, function(err, token) {
            if(err) {
              res.status(500).json({
                message: 'Error generate token',
                error: err
              });
            } else {

              res.status(200).json({
                message: 'Success generate token',
                token: token
              });
            }
          });
        }
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
  },

  checkLogin: (req, res) => {
    let token = req.headers.apptoken;

    if(!token) {
      res.status(401).json({
        message: 'You are not authenticated'
      });
    } else {

      jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if(err) {
          res.status(500).json({
            message: 'Error verify token',
            error: err
          });
        } else {

          User.findOne({email: decoded.email})
          .then(user => {
            res.status(200).json({
              login: true
            });
          })
          .catch(err => {
            res.status(500).json({
              message: 'No data found',
              error: err
            });          
          });
        }
      });
    }
  }

}