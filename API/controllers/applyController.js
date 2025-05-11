const path = require('path');
const Application = require('../models/applicationModel');

// ✅ Apply for a job (handles form submission)
exports.applyForJob = async (req, res) => {
  try {
    const { fullName, phone, email, coverLetter } = req.body;
    const jobId = req.params.jobId;

    if (!req.files || !req.files.resume) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const resume = req.files.resume;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(resume.mimetype)) {
      return res.status(400).json({ message: 'Invalid resume file type' });
    }

    const savePath = path.join(__dirname, '../uploads', `${Date.now()}-${resume.name}`);
    await resume.mv(savePath);

    const application = new Application({
      job: jobId,
      fullName,
      email,
      phone,
      coverLetter,
      resumeUrl: savePath
    });

    await application.save();

    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ View applicants for a specific job
exports.getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicants = await Application.find({ job: jobId });

    if (!applicants.length) {
      return res.status(404).json({ message: 'No applicants found for this job' });
    }

    res.status(200).json(applicants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
  
};