const mongoose = require('mongoose');

const faqPageSchema = new mongoose.Schema({
    title: { type: String, default: 'FAQ' },
    subtitle: { type: String, default: 'Frequently asked questions' },
    faqs: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true }
        }
    ],
    cta: {
        buttonLabel: { type: String, default: 'Contact Us' },
        url: { type: String, default: '/contact' }
    }
}, { timestamps: true });

module.exports = mongoose.model('FaqPage', faqPageSchema);
