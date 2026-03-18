const mongoose = require('mongoose');

const ticketPageSchema = new mongoose.Schema({
    hero: {
        text: {
            title: { type: String, default: 'TICKET BOOKING' },
            tagline: { type: String, default: 'Book your visit — dive in!' }
        },
        backgroundUrl: { type: String }
    },
    bookingForm: {
        title: { type: String, default: 'SELECT YOUR TICKETS' },
        fields: {
            date: {
                label: { type: String, default: 'Select Date' }
            },
            ticketType: {
                label: { type: String, default: 'Ticket Type' },
                options: [{
                    label: { type: String },
                    value: { type: String },
                    price: { type: Number },
                }]
            },
            quantity: {
                label: { type: String, default: 'Quantity' },
                min: { type: Number, default: 1 }
            }
        },
        summary: {
            totalLabel: { type: String, default: 'TOTAL' }
        },
        submitButton: {
            label: { type: String, default: 'BOOK NOW' }
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('TicketPage', ticketPageSchema);
