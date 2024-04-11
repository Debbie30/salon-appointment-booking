const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost/salon_appointments', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    date: Date,
    time: String,
    customer: {
        name: String,
        email: String,
        phone: String
      }
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

// API Endpoints
let appointments = [];

app.use(bodyParser.json());

app.post('/api/appointments', async (req, res) => {
    try {
        const { name, date, time } = req.body;
        const appointment = new Appointment({ name, date, time });
        await appointment.save();
        res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to book appointment', error: error.message });
    }
});
app.get('/api/appointments', (req, res) => {
    res.json({ success: true, appointments });
});

// Update an appointment
app.put('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const { name, date, time } = req.body;
    const index = appointments.findIndex(appointment => appointment.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    appointments[index] = { ...appointments[index], name, date, time };
    res.json({ success: true, message: 'Appointment updated successfully', appointment: appointments[index] });
});

// Delete an appointment
app.delete('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const index = appointments.findIndex(appointment => appointment.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    appointments.splice(index, 1);
    res.json({ success: true, message: 'Appointment deleted successfully' });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
