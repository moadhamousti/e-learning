const express = require('express');
const router = express.Router();
const Form = require('../models/form');

// Handle form submission
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, localisation } = req.body;

    const formData = new Form({
      firstName,
      lastName,
      phoneNumber,
      email,
      localisation,
    });

    await formData.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'An error occurred while saving form data' });
  }
});

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get form details by ID
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form details:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update status of a specific form
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['pending', 'accepted', 'declined'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find and update the form
    const updatedForm = await Form.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a form by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find and delete the form
    const deletedForm = await Form.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Error deleting form:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// formRoutes.js

// formRoutes.js

// Get forms submitted by a specific user using email
router.get('/user/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    console.log('Fetching forms for email:', email); // Debugging line
    const forms = await Form.find({ email: email }).exec(); // Ensure the field matches your schema

    console.log('Forms found:', forms); // Debugging line

    if (!forms || forms.length === 0) {
      return res.status(404).json({ error: 'No forms found for this email' });
    }
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching user forms:', error);
    res.status(500).json({ error: 'An error occurred while fetching user forms' });
  }
});




module.exports = router;
