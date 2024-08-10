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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Define allowed origins
const prodOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_2];
const devOrigin = ['http://localhost:5173'];
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigin;

// Configure CORS middleware to accept multiple origins
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials
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
