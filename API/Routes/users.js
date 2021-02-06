const express = require('express');
const router = express.Router();
const checkAuth = require('../Middleware/check-auth');

const UserController = require('../controllers/users');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.delete('/:userId', checkAuth, UserController.users_delete_user);

module.exports = router;