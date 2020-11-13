var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(1)
});

router.get('/test', function(req, res, next) {
  res.send('测试中心');
});

module.exports = router;
