const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Client = require('../models/Client');
const Message = require('../models/Message');
const Prompt = require('../models/Prompt');

// @route   GET api/admin/users
// @desc    Get all users (Admin only)
// @access  Private (Admin)
router.get('/users', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/messages/:id
// @desc    Delete a message (Admin only)
// @access  Private (Admin)
router.delete('/messages/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.json({ msg: 'Message removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/users/:id
// @desc    Delete a user (Admin only)
// @access  Private (Admin)
router.delete('/users/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/clients
// @desc    Get all clients (Admin only)
// @access  Private (Admin)
router.get('/clients', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/clients
// @desc    Add a new client (Admin only)
// @access  Private (Admin)
router.post('/clients', auth, async (req, res) => {
  const { name, email, company } = req.body;
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const newClient = new Client({
      name,
      email,
      company,
    });
    const client = await newClient.save();
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/clients/:id
// @desc    Update a client (Admin only)
// @access  Private (Admin)
router.put('/clients/:id', auth, async (req, res) => {
  const { name, email, company } = req.body;
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: { name, email, company } },
      { new: true }
    );
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/clients/:id
// @desc    Delete a client (Admin only)
// @access  Private (Admin)
router.delete('/clients/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    await Client.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Client removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/messages
// @desc    Get all messages (Admin only)
// @access  Private (Admin)
router.get('/messages', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/messages/:id/status
// @desc    Update message status (Admin only)
// @access  Private (Admin)
router.put('/messages/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/dashboard-stats
// @desc    Get dashboard statistics (Admin only)
// @access  Private (Admin)
router.get('/dashboard-stats', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }

    const totalMessages = await Message.countDocuments();
    const totalClients = await Client.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalPrompts = await Prompt.countDocuments();
    // Assuming 'pricing' is not directly stored in MongoDB models yet
    const totalPricingPlans = 0; // Placeholder

    res.json({
      messages: totalMessages,
      clients: totalClients,
      prompts: totalPrompts,
      pricing: totalPricingPlans,
      users: totalUsers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/prompts
// @desc    Get all prompts (Admin only)
// @access  Private (Admin)
router.get('/prompts', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const prompts = await Prompt.find().sort({ createdAt: -1 });
    res.json(prompts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/prompts
// @desc    Add a new prompt (Admin only)
// @access  Private (Admin)
router.post('/prompts', auth, async (req, res) => {
  const { title, description, template, category } = req.body;
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const newPrompt = new Prompt({
      title,
      description,
      template,
      category,
    });
    const prompt = await newPrompt.save();
    res.json(prompt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/prompts/:id
// @desc    Update a prompt (Admin only)
// @access  Private (Admin)
router.put('/prompts/:id', auth, async (req, res) => {
  const { title, description, template, category } = req.body;
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, template, category } },
      { new: true }
    );
    if (!prompt) {
      return res.status(404).json({ msg: 'Prompt not found' });
    }
    res.json(prompt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/prompts/:id
// @desc    Delete a prompt (Admin only)
// @access  Private (Admin)
router.delete('/prompts/:id', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    const prompt = await Prompt.findByIdAndDelete(req.params.id);
    if (!prompt) {
      return res.status(404).json({ msg: 'Prompt not found' });
    }
    res.json({ msg: 'Prompt removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/contact
// @desc    Submit a contact form message
// @access  Public (or Private if desired)
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();
    res.status(201).json({ msg: 'Message submitted successfully', message: newMessage });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
