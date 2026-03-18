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

const updateSafetyHeader = async (req, res) => {
    try {
        let doc = await SafetyPage.findOne();
        if (!doc) doc = new SafetyPage();
        const { title, subtitle } = req.body;
        if (title !== undefined && title !== null) doc.title = title;
        if (subtitle !== undefined && subtitle !== null) doc.subtitle = subtitle;
        await doc.save();
        res.status(200).json({ success: true, data: { title: doc.title, subtitle: doc.subtitle }, message: 'Header updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateSafetyReminder = async (req, res) => {
    try {
        let doc = await SafetyPage.findOne();
        if (!doc) doc = new SafetyPage();
        const { heading, description } = req.body;
        if (heading !== undefined && heading !== null) doc.reminder.heading = heading;
        if (description !== undefined && description !== null) doc.reminder.description = description;
        await doc.save();
        res.status(200).json({ success: true, data: doc.reminder, message: 'Reminder updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteSafetyReminder = async (req, res) => {
    try {
        let doc = await SafetyPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { heading, description } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.reminder = { heading: '', description: '' };
        } else {
            if (heading === true || fields.includes('heading')) doc.reminder.heading = '';
            if (description === true || fields.includes('description')) doc.reminder.description = '';
        }
        await doc.save();
        // Respond
        res.status(200).json({ success: true, data: doc.reminder, message: 'Reminder deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateSafetyRules = async (req, res) => {
    try {
        let doc = await SafetyPage.findOne();
        if (!doc) doc = new SafetyPage();
        const { title, list, index } = req.body;
        if (title !== undefined && title !== null) doc.rules.title = title;
        if (list !== undefined && list !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < doc.rules.list.length) doc.rules.list[index] = list;
            } else {
                doc.rules.list = Array.isArray(list) ? list : [list];
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.rules, message: 'Rules updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteSafetyRules = async (req, res) => {
    try {
        let doc = await SafetyPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, list, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.rules = { title: '', list: [] };
        } else {
            if (title === true || fields.includes('title')) doc.rules.title = '';
            if (list === true || fields.includes('list')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < doc.rules.list.length) doc.rules.list.splice(index, 1);
                } else {
                    doc.rules.list = [];
                }
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.rules, message: 'Rules deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateSafetyCta = async (req, res) => {
    try {
        let doc = await SafetyPage.findOne();
        if (!doc) doc = new SafetyPage();
        const { buttonLabel, url } = req.body;
        if (buttonLabel !== undefined && buttonLabel !== null) doc.cta.buttonLabel = buttonLabel;
        if (url !== undefined && url !== null) doc.cta.url = url;
        await doc.save();
        res.status(200).json({ success: true, data: doc.cta, message: 'CTA updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

module.exports = {
    getSafety,
    getSafetyTitle,
    getSafetySubtitle,
    getSafetyReminder,
    getSafetyRules,
    getSafetyRulesList,
    getSafetyCta,
    updateSafetyHeader,
    updateSafetyReminder, deleteSafetyReminder,
    updateSafetyRules, deleteSafetyRules,
    updateSafetyCta
};
