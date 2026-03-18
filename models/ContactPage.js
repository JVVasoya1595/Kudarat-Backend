const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
    hero: {
        text: {
            title: { type: String, default: 'CONTACT US' },
            tagline: { type: String, default: 'We are here to help you!' }
        },
        backgroundUrl: { type: String }
    },
    contactInfo: {
        title: { type: String, default: 'CONTACT US' },
        phones: [{ type: String }],
        emails: [{ type: String }],
        address: { type: String },
        mapUrl: { type: String },
        buttonLabel: { type: String, default: 'GET DIRECTIONS ON GOOGLE MAPS' }
    },
    messageForm: {
        title: { type: String, default: 'SEND US A MESSAGE' },
        fields: {
            name: { label: { type: String, default: 'Name' }, placeholder: { type: String, default: 'Your name' } },
            email: { label: { type: String, default: 'Email' }, placeholder: { type: String, default: 'your@email.com' } },
            message: { label: { type: String, default: 'Message' }, placeholder: { type: String, default: 'Your message...' } }
        },
        buttonLabel: { type: String, default: 'SEND MESSAGE' }
    }
}, { timestamps: true });

module.exports = mongoose.model('ContactPage', contactPageSchema);
