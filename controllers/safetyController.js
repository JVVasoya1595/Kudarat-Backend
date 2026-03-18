const SafetyPage = require('../models/SafetyPage');

const gen = (propPath) => async (req, res) => {
    try {
        const doc = await SafetyPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Safety data not seeded' });

        const parts = propPath.split('.');
        let val = doc;
        for (const p of parts) {
            if (p === '') continue;
            if (val) val = val[p];
        }
        res.status(200).json(val);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getSafety = gen('');
const getSafetyTitle = gen('title');
const getSafetySubtitle = gen('subtitle');
const getSafetyReminder = gen('reminder');
const getSafetyRules = gen('rules');
const getSafetyRulesList = gen('rules.list');
const getSafetyCta = gen('cta');

module.exports = {
    getSafety,
    getSafetyTitle,
    getSafetySubtitle,
    getSafetyReminder,
    getSafetyRules,
    getSafetyRulesList,
    getSafetyCta
};
