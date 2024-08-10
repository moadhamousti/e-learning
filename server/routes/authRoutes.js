const express = require('express');
const router = express.Router();
const { registerUser, test, getProfile, logoutUser, loginUser } = require('../controllers/authCotroller');

// Routes
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);
router.post('/logout', logoutUser);

module.exports = router;
