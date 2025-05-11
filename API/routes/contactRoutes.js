// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const { createContact } = require('../controllers/contactController.js');


router.post('/', createContact);

module.exports = router;
