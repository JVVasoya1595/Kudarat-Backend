const mongoose = require('mongoose');

const ticketPageSchema = new mongoose.Schema({
    hero: {
        text: {
            title: { type: String, default: 'TICKET BOOKING' },
            tagline: { type: String, default: 'Book your visit — dive in!' }
        },
        iconUrl: { type: String },
        backgroundUrl: { type: String }
    },
    bookingForm: {
        title: { type: String, default: 'SELECT YOUR TICKETS' },
        fields: {
            name: {
                label: { type: String, default: 'Full Name' },
                placeholder: { type: String, default: 'Enter your name' }
            },
            email: {
                label: { type: String, default: 'Email Address' },
                placeholder: { type: String, default: 'Enter your email' }
            },
            phone: {
                label: { type: String, default: 'Phone Number' },
                placeholder: { type: String, default: 'Enter your phone number' }
            },
            date: {
                label: { type: String, default: 'Select Date' }
            },
            ticketType: {
                label: { type: String, default: 'Ticket Type' },
                options: [{
                    label: { type: String },
                    value: { type: String },
                    price: { type: Number },
                    iconUrl: { type: String }
                }]
            },
            quantity: {
                label: { type: String, default: 'Quantity' },
                min: { type: Number, default: 1 }
            }
        },
        summary: {
            priceLabel: { type: String, default: 'Price per ticket' },
            totalLabel: { type: String, default: 'TOTAL' }
        },
        submitButton: {
            label: { type: String, default: 'BOOK NOW' }
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('TicketPage', ticketPageSchema);
