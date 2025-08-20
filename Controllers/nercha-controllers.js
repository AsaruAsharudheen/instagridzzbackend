// nercha-controllers.js
const { Nercha, Counter } = require('../db/Models/nercha-schema');

// @desc    Create new Nercha entry
// @route   POST /api/nercha
// @access  Public / Admin
module.exports.createNercha = async (req, res) => {
  try {
    const { name, address, amount } = req.body;

    if (!name || !address || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newEntry = new Nercha({
      name,
      address,
      amount,
    });

    await newEntry.save();

    res.status(201).json({
      message: 'Nercha entry created successfully',
      entry: newEntry,
    });
  } catch (error) {
    console.error('Error creating Nercha entry:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all Nercha entries
// @route   GET /api/nercha
// @access  Public / Admin
module.exports.getAllNercha = async (req, res) => {
  try {
    const entries = await Nercha.find().sort({ token: 1 }); // ordered by token
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching Nercha entries:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single Nercha entry by token
// @route   GET /api/nercha/:token
// @access  Public / Admin
module.exports.getNerchaByToken = async (req, res) => {
  try {
    const entry = await Nercha.findOne({ token: req.params.token });

    if (!entry) {
      return res.status(404).json({ message: 'Nercha entry not found' });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error('Error fetching Nercha entry:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete Nercha entry
// @route   DELETE /api/nercha/:id
// @access  Admin
module.exports.deleteNercha = async (req, res) => {
  try {
    const { id } = req.params;
    await Nercha.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Nercha entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting Nercha entry:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update Nercha entry
// @route   PUT /api/nercha/:id
// @access  Admin
module.exports.updateNercha = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const updated = await Nercha.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Nercha entry not found' });
    }

    return res.status(200).json({ message: 'Nercha entry updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating Nercha entry:', error);
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get the next token number (without creating entry)
// @route   GET /api/nercha/next-token
// @access  Public / Admin
module.exports.getNextToken = async (req, res) => {
  try {
    const counter = await Counter.findOne({ name: "nercha_token" });
    const nextToken = counter ? counter.seq + 1 : 1;

    res.status(200).json({ nextToken });
  } catch (error) {
    console.error("Error fetching next token:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
