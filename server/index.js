const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log('Database not connected', err));

// Middlewares
app.use(express.json({ limit: '50mb' })); // Increase payload limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase payload limit
app.use(cookieParser());

// Configure CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with the origin of your frontend application
    credentials: true // Allow credentials
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/coursesRoute'));
app.use('/api/form', require('./routes/formRoutes')); // Make sure this matches your API calls
app.use('/', require('./routes/dashboardRoutes'));
app.use('/api', require('./routes/userRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
