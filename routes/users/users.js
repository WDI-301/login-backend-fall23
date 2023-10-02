var express = require('express');
var router = express.Router();
// const {login} = require('./controllers/usersController')
const usersController = require('./controllers/usersController');
const verifyToken = require('../../middleware/authorization');

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

//route for user login
router.post('/login', usersController.login)
//route for user registration
router.post('/register', usersController.register)
//route for user auth via token
router.post('/authtoken', verifyToken, usersController.authtoken)



module.exports = router;
