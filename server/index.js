const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log('Database not connected', err));

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [
        process.env.ORIGIN_1, 
        process.env.ORIGIN_2, 
        process.env.ORIGIN_3 // Add the third origin here
      ]
    : ['http://localhost:5173']; // Local development

app.use(cors({
    origin: (origin, callback) => {
        console.log('Origin:', origin); // Debugging: Log the origin
        if (allowedOrigins.includes(origin) || !origin) { // Allow requests with no origin (e.g., Postman)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/coursesRoute'));
app.use('/api/form', require('./routes/formRoutes'));
app.use('/', require('./routes/dashboardRoutes'));
app.use('/api', require('./routes/userRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
