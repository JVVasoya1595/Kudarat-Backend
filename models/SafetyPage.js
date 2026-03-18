const mongoose = require('mongoose');

const safetyPageSchema = new mongoose.Schema({
    title: { type: String, default: 'SAFETY RULES' },
    subtitle: { type: String, default: 'Safety First, Fun Always' },
    reminder: {
        heading: { type: String, default: '🦭 Friendly reminder' },
        description: { type: String, default: 'Our mascot wants everyone to have a safe, splash-tastic day!' }
    },
    rules: {
        title: { type: String, default: 'Park Rules' },
        list: [{ type: String }]
    },
    cta: {
        buttonLabel: { type: String, default: 'CONTACT US' },
        url: { type: String, default: '/contact' }
    }
}, { timestamps: true });

module.exports = mongoose.model('SafetyPage', safetyPageSchema);
