const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middlewares/auth');
const CourseModel = require('../models/course'); // Adjust path as necessary
const authenticateUser = require('../../server/middlewares/authenticateUser');

// Create a new course
router.post('/create', authenticateUser, async (req, res) => {
    const { title, description, course, image, attachments, videoLinks } = req.body;
    const createdBy = req.user._id; // Use authenticated user's ID

    try {
        const newCourse = new CourseModel({
            title,
            description,
            course,
            image,
            attachments,
            videoLinks, // Include videoLinks here
            createdBy
        });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error creating course:', error); // Add detailed logging
        res.status(500).json({ error: error.message });
    }
});


// Get total courses count
router.get('/count', requireAdmin, async (req, res) => {
    try {
        const courseCount = await CourseModel.countDocuments();
        res.json(courseCount); // Return just the count as a number
    } catch (err) {
        console.error('Error fetching course count:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Get all courses
router.get('/', async (req, res) => {
    try {
      // Ensure `image` is included in the populate method if needed
      const courses = await CourseModel.find().populate('createdBy', 'name image');
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  

// Get course by ID
router.get('/:id', async (req, res) => {
    console.log('Fetching course with ID:', req.params.id); // Add logging
    try {
        const course = await CourseModel.findById(req.params.id).populate('createdBy', 'name');
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        console.error('Error fetching course:', error); // Add logging
        res.status(500).json({ error: error.message });
    }
});

// Delete a course
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await CourseModel.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({ message: 'Course deleted successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Edit an existing course
router.put('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { title, description, course, image, attachments, videoLinks } = req.body;
  
  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        course,
        image,
        attachments,
        videoLinks,
        updatedAt: new Date(),
      },
      { new: true } // Return the updated course
    );

    if (updatedCourse) {
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get('/api/courses', async (req, res) => {
    try {
      const courses = await CourseModel.find().populate('createdBy', 'name image');
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: error.message });
    }
  });



module.exports = router;
