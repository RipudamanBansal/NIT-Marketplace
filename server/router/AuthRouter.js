const {Signup, Login} = require('../controller/AuthController');
const {signupValidation, loginValidation} = require('../middlewares/AuthValidator');

const router = require('express').Router();

router.post('/signup', signupValidation, Signup);
router.post('/login', loginValidation, Login);

module.exports = router;