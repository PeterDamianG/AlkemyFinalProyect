const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const AuthController = require('../controllers/AuthController');
const { validateLogin, validateRegister } = require('../validations/AuthValidation')

router.post('/login', validateLogin, AuthController.login);
router.post('/register', validateRegister, AuthController.register);
router.get('/me', [verifyToken], AuthController.getCurrentUserInfo);

module.exports = router;
