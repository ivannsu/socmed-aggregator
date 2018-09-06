const axios = require('axios');

module.exports = {

  fbSignin: (req, res) => {
    let fbtoken = req.headers.fbtoken;

    axios({
      method: 'get',
      url: `https://graph.facebook.com/me?fields=id,name,email&access_token=${fbtoken}`
    })
    .then(response => {
      console.log(response.data, '<============ RESPONSE userController');
    })
    .catch(err => {
      console.log(err, '<=============== ERROR[userController.js]')
    });
  }

}