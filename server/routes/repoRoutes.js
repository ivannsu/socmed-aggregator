const router = require('express').Router();
const { 
  findByStarred, findByUsername, create, unstarRepo, findBySearch
} = require('../controllers/repoController');

router.get('/star', findByStarred);
router.get('/search/:name', findBySearch);
router.get('/:username', findByUsername);
router.post('/', create);
router.post('/unstar', unstarRepo);

module.exports = router;