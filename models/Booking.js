const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: { type: Date },
    ticketType: { type: String, enum: ['Adult', 'Child'], default: 'Adult' },
    quantity: { type: Number, default: 1, min: 1 },
    totalAmount: { type: Number, default: 0 },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
