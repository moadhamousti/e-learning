// server/routes/dashboardRoutes.js
const express = require('express');
const { requireAdmin } = require('../middlewares/auth');
const router = express.Router();

// Protect this route with the requireAdmin middleware
router.get('/dashboard', requireAdmin, (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard', isAdmin: req.user.isAdmin });
});

module.exports = router;
