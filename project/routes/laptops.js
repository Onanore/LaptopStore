// routes/laptops.js
const express = require('express');
const router = express.Router();
const Laptop = require('../models/Laptop');
const { auth, adminOnly } = require('../middleware/auth');

// Create laptop - Admin only
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const laptop = new Laptop(req.body);
    await laptop.save();
    res.status(201).json(laptop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all laptops
router.get('/', async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json(laptops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a single laptop by ID
router.get('/:id', async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);
    if (!laptop) return res.status(404).json({ message: 'Laptop not found' });
    res.json(laptop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update laptop - Admin only
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const laptop = await Laptop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!laptop) return res.status(404).json({ message: 'Laptop not found' });
    res.json(laptop);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete laptop - Admin only
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const laptop = await Laptop.findByIdAndDelete(req.params.id);
    if (!laptop) return res.status(404).json({ message: 'Laptop not found' });
    res.json({ message: 'Laptop deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
