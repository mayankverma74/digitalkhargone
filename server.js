const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware with correct CORS configuration
app.use(cors({
    origin: ['https://digitalkhargone.in', 'http://localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Contact Schema
const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    websiteType: { type: String, required: true },
    budget: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { fullName, phone, email, websiteType, budget } = req.body;

        // Validate all required fields
        if (!fullName || !phone || !email || !websiteType || !budget) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Create and save new contact
        const newContact = new Contact({
            fullName,
            phone,
            email,
            websiteType,
            budget
        });

        await newContact.save();

        res.status(200).json({
            success: true,
            message: 'Form submitted successfully'
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});