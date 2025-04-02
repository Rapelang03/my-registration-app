const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB URI from .env file
const uri = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Define Schema for Registration Form
const registrationSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    qualification: String,
    school: String,
    experience: String,
    gender: String,
    terms: Boolean,
});

// Create Model
const Registration = mongoose.model('Registration', registrationSchema);

// POST endpoint to handle form submission
app.post('/register', async (req, res) => {
    const { name, surname, age, qualification, school, experience, gender, terms } = req.body;
    
    // Create a new registration entry
    const newRegistration = new Registration({
        name,
        surname,
        age,
        qualification,
        school,
        experience,
        gender,
        terms
    });
    
    try {
        await newRegistration.save(); // Save data to MongoDB
        res.status(201).json({ message: 'Registration successful!' });
    } catch (err) {
        res.status(500).json({ message: 'Error saving data' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
