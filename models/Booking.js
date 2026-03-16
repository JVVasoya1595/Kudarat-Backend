const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    ticketType: { type: String, enum: ['Adult', 'Child', 'Both'], default: 'Adult' },
    adults: { type: Number, default: 0 },
    children: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
