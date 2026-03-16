const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
    hero: {
        text: {
            title: { type: String, default: 'RIDES & ATTRACTIONS' },
            tagline: { type: String, default: 'Discover our rides and stay safe with our guidelines.' }
        },
        iconUrl: { type: String },
        backgroundUrl: { type: String }
    },
    rideDetails: {
        text: {
            title: { type: String, default: 'RIDE DETAILS' },
            description: { type: String, default: 'Everything you need to know about our water rides and joy rides at Kudarat Water Park' }
        },
        list: [{
            title: { type: String },
            category: { type: String, default: 'Water' },
            description: { type: String },
            requirements: {
                height: { type: String },
                age: { type: String }
            },
            imageUrl: { type: String }
        }]
    },
    safetySection: {
        title: { type: String, default: 'Guidelines & Safety' },
        subtitle: { type: String, default: 'Please follow these rules for a safe and fun visit for everyone.' },
        rules: [{
            title: { type: String },
            content: { type: String }
        }]
    },
    cta: {
        buttonLabel: { type: String, default: 'Contact Us' },
        url: { type: String, default: '/contact' }
    }
}, { timestamps: true });

module.exports = mongoose.model('Attraction', attractionSchema);
