const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// ✅ SIGNUP
const signup = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName,} = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ LOGIN
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid username or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.json({ token,
      role: user.role
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ GET CURRENT USER
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { title, phone, location, about, skills, story } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { title, phone, location, about, skills, story },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    console.error("Update error:", error.message); // log message for better debug
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    console.log("Incoming email:", email);
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    console.log('Reset link:', resetLink);

    res.status(200).json({ message: 'Password reset link sent.', token });
    
  } catch (err) {
    console.error("❌ forgotPassword ERROR:", err); // 👈 log the real error
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSuccessStories = async (req, res) => {
  try {
    // Find users who have a non-empty story
    const stories = await User.find({ story: { $exists: true, $ne: "" } })
      .select('firstName lastName title story')
      .limit(3)  // Limit to 3 stories for display
      .sort({ _id: -1 });  // Get the most recent stories first
      
    res.json(stories);
  } catch (err) {
    console.error('Error fetching success stories:', err);
    res.status(500).json({ message: 'Failed to fetch success stories' });
  }
};

const resetPassword = async (req, res) =>{
  const {token, password}= req.body;
  try{
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: {$gt: Date.now()},
    });
    if(!user){
      return res.status(400).json({ message: 'Invalid or expired token'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    
    await user.save();
    res.status(200).json({ message: 'Password reset successful'});
  }catch(err){
    console.error('Error resetting password: ', err);
    res.status(500).json({message: 'Server error' });
  }
};

module.exports = { signup, login, getMe, updateProfile, resetPassword, forgotPassword, getSuccessStories };