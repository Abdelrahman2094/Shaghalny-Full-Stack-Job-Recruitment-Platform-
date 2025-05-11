const express = require('express');
const router = express.Router();
const { getDashboardCounts, getAllUsers, deleteUser } = require('../controllers/adminController');
const { getContactMessages } = require('../controllers/contactController');

router.get('/stats', getDashboardCounts);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/messages', getContactMessages);

module.exports = router;