const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    hero: {
        background: [{ type: String }], 
        text: {
            title: { type: String, default: 'KUDARAT WATERPARK' },
            subtitle: { type: String, default: 'Your Ultimate Splash-tastic Haven!' },
            description: { type: String, default: 'Dive into a day of thrills and laughter with water slides, wave pools, and family rides for all ages.' }
        }
    },
    premiumFacilities: {
        text: {
            tagline: { type: String, default: 'WHY US' },
            title: { type: String, default: 'EXPLORE OUR PREMIUM FACILITIES' },
            subtitle: { type: String, default: 'DISCOVER THE BEST AMENITIES FOR AN UNFORGETTABLE WATERPARK EXPERIENCE' }
        },
        cards: [{
            imageUrl: { type: String },
            title: { type: String },
            description: { type: String }
        }]
    },
    signatureRides: {
        text: {
            tagline: { type: String, default: 'MUST-DO' },
            title: { type: String, default: 'SIGNATURE RIDES' },
            subtitle: { type: String, default: 'OUR MOST-LOVED ATTRACTIONS – THRILLS, WAVES, AND ENDLESS SPLASH FOR EVERYONE.' }
        },
        cards: [{
            title: { type: String },
            description: { type: String }
        }],
        button: {
            label: { type: String, default: 'SEE ALL RIDES & ATTRACTIONS' },
            url: { type: String, default: '/attractions' }
        }
    },
    pricing: {
        text: {
            tagline: { type: String, default: 'PLAN YOUR VISIT' },
            title: { type: String, default: 'TICKETS & PRICING' },
            subtitle: { type: String, default: 'CHOOSE YOUR PERFECT DAY OF ADVENTURE WITH OUR FLEXIBLE PRICING OPTIONS' }
        },
        cards: [{
            title: { type: String },
            subtitle: { type: String },
            price: { type: String },
            time: { type: String },
            requirements: { type: String },
            rent: { type: String },
            refund: { type: String }
        }]
    },
    gallery: {
        text: {
            tagline: { type: String, default: '@FOLLOW THE AMAZING MEMORIES WITH US ON INSTAGRAM' }
        },
        images: [{ type: String }]
    },
    location: {
        text: {
            tagline: { type: String, default: 'FIND US HERE.' },
            title: { type: String, default: 'LOCATION & CONTACT' },
            subtitle: { type: String, default: 'VISIT US FOR AN UNFORGETTABLE WATER PARK EXPERIENCE.' }
        },
        info: {
            address: { type: String, default: 'OPP, MAHALAXMI DAIRY, VALAD, GUJARAT 382355.' },
            phone: { type: String, default: '+91 85549 92350' },
            email: { type: String, default: 'info@kudaratwaterpark.com' },
            mapEmbedUrl: { type: String }
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Home', homeSchema);
