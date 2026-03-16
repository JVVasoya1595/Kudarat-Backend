const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    hero: {
        text: {
            tagline: { type: String, default: "Get to know us — we're all about splash!" },
            title: { type: String, default: "ABOUT WATER PARK" }
        },
        iconUrl: { type: String }, 
        backgroundUrl: { type: String }
    },
    story: {
        title: { type: String, default: "SPLISH, SPLASH AND SOAK UP THE FUN!" },
        description: { type: String },
        imageUrl: { type: String }
    },
    features: {
        title: { type: String, default: "What we offer" },
        cards: [{
            iconUrl: { type: String },
            title: { type: String },
            description: { type: String }
        }]
    },
    support: {
        title: { type: String, default: "We're Here to Help" },
        phone: { type: String },
        email: { type: String },
        iconUrl: { type: String },
        button: {
            label: { type: String, default: "Contact Us" },
            url: { type: String, default: "/contact" }
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
