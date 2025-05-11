const Job = require('../models/jobModel');

exports.createJob = async (req, res) => {
  try {
    const { title, type, company, location, description, salary, skills } = req.body;

    const job = new Job({
      title,
      type,
      company,
      location,
      description,
      salary,
      skills,
      postedBy: req.user._id
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    res.status(500).json({ message: "Error posting job", error: err.message });
  }
};
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if the logged-in user is the one who posted the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this job" });
    }

    // Only allow updating specific fields
    const allowedFields = ['title', 'type', 'company', 'location', 'description', 'salary', 'skills'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    await job.save();
    res.json({ message: "Job updated successfully", job });

  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Error updating job", error: error.message });
  }
};

// ✅ Move deleteJob here, outside of createJob
exports.deleteJob = async (req, res) => {
  try {
    console.log("Trying to delete job with ID:", req.params.id);

    await Job.deleteOne({ _id: req.params.id });

    console.log("Job deleted successfully");
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Delete job error:", err.message);
    res.status(500).json({ message: "Error deleting job", error: err.message });
  }
};
