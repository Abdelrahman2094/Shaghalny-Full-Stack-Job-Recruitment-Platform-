const User = require('../models/userModel');
const Job = require('../models/jobModel');
const Application = require('../models/applicationModel');

const getDashboardCounts = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    res.status(200).json({ totalUsers, totalJobs, totalApplications });
  } catch (err) {
    console.error('Error fetching dashboard counts:', err);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};


const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch users' });
    }
  };
  
  const deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete user' });
    }
  };

module.exports = { getDashboardCounts, getAllUsers, deleteUser };