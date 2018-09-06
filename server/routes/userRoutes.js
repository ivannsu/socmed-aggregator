const router = require('express').Router();
const { 
  fbSignin
} = require('../controllers/userController');

router.get('/signin/fb', fbSignin);

module.exports = router;