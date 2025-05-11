require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

// Route imports
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const applyRoutes = require('./routes/applyRoutes');
const contactRoutes = require('./routes/contactRoutes'); 
const adminRoutes = require('./routes/adminRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Route usage
app.use('/jobs', jobRoutes);
app.use('/auth', userRoutes);
app.use('/', applyRoutes);
app.use('/contact', contactRoutes); // ✅ added
app.use('/admin', adminRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
