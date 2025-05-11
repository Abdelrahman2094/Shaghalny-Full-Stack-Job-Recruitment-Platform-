const express = require('express');
const router = express.Router();
const { signup, login, getMe, updateProfile, resetPassword, forgotPassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { getSuccessStories } = require('../controllers/userController');

router.get('/success-stories', getSuccessStories);
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

// New route for updating profile
router.put('/update', protect, updateProfile);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);


module.exports = router;