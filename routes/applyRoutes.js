const express = require('express');
const router = express.Router();
const { applyForJob, getApplicantsByJob } = require('../controllers/applyController');

// POST: Apply for a specific job
router.post('/apply/:jobId', applyForJob);

// GET: View all applicants for a specific job
router.get('/job/:jobId', getApplicantsByJob);

module.exports = router;