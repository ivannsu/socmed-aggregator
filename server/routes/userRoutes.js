const router = require('express').Router();
const { 
  fbSignin, checkLogin
} = require('../controllers/userController');

router.get('/check', checkLogin)
router.get('/signin/fb', fbSignin);

module.exports = router;