// controllers/contactController.js
const Contact = require('../models/contactModel.js');

const createContact = async (req, res) => {
    try {
      console.log('Received request body:', req.body); // 👈 Add this
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json({ message: 'Message submitted successfully' });
    } catch (error) {
      console.error('Error saving contact:', error); // 👈 Add this
      res.status(400).json({ message: 'Failed to submit message', error });
    }
  };

  const getContactMessages = async (req, res) => {
    try {
      const messages = await Contact.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch contact messages' });
    }
  };
  

  module.exports = { createContact, getContactMessages}
  