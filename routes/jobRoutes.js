const express = require('express');
const router = express.Router();
const { createJob,deleteJob,updateJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const Job = require('../models/jobModel');



router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search;

    let query = {};
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: 'i' }; 
    }

    const jobs = await Job.find(query).populate("postedBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to load jobs", error: err.message });
  }
});



router.get('/recruiter', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to load your jobs", error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});


router.post('/', protect, createJob);
router.delete('/:id', deleteJob);
router.put('/:id', protect, updateJob);

module.exports = router;