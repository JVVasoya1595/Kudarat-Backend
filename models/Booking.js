const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    ticketType: { type: String, enum: ['Adult', 'Child'], required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
