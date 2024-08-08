const express = require('express');
const { createUser, loginUser, logoutUser, Profile} = require('../controllers/usersController');
const router = express.Router();
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.post('/profile', Profile);

module.exports = router;