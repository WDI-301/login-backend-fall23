var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users index route');
});

router.post('/login-test', function(req,res) {
  console.log(req.body);
  res.send({
    username: req.body.username,
    password: req.body.password
  })
})

module.exports = router;
