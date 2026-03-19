const Attraction = require('../models/Attraction');

const gen = (propPath, status = 200) => async (req, res) => {
    try {
        const doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });

        const parts = propPath.split('.');
        let val = doc;
        for (const p of parts) {
            if (p === '') continue;
            if (val) val = val[p];
        }
        res.status(status).json(val);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAttractionsPage = gen('');
const getAttractionsHero = gen('hero');
const getAttractionsHeroText = gen('hero.text');

const addAttractionsHero = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) doc = new Attraction();
        const { title, tagline, backgroundUrl } = req.body;
        
        doc.hero = {
            text: {
                title: title || '',
                tagline: tagline || ''
            },
            backgroundUrl: backgroundUrl || ''
        };await doc.save();
        res.status(201).json({ success: true, data: doc.hero, message: 'Hero section added successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAttractionsHero = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, tagline, backgroundUrl, image, imageUrl } = req.body;
        const bg = backgroundUrl || image || imageUrl;

        if (title !== undefined && title !== null) doc.hero.text.title = title;
        if (tagline !== undefined && tagline !== null) doc.hero.text.tagline = tagline;
        if (bg !== undefined && bg !== null) doc.hero.backgroundUrl = bg;
        await doc.save();
        res.status(200).json({ success: true, data: doc.hero, message: 'Hero section updated successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteAttractionsHero = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, tagline, backgroundUrl } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];

        if (Object.keys(req.body).length === 0) {
            doc.hero = {
                text: { title: '', tagline: '' },
                backgroundUrl: ''
            };
        } else {
            if (title === true || fields.includes('title')) doc.hero.text.title = '';
            if (tagline === true || fields.includes('tagline')) doc.hero.text.tagline = '';
            if (backgroundUrl === true || fields.includes('backgroundUrl')) doc.hero.backgroundUrl = '';
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.hero, message: 'Hero deletion processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const getAttractionsDetails = gen('rideDetails');
const getAttractionsDetailsText = gen('rideDetails.text');
const getAttractionsList = gen('rideDetails.list');

const addAttractionsDetails = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) doc = new Attraction();
        const { title, description, list } = req.body;

        const normalizeItem = (item) => ({
            title: item.title || '',
            category: item.category || '',
            description: item.description || '',
            imageUrl: item.imageUrl || item.image || '',
            requirements: {
                height: (item.requirements && item.requirements.height) || '',
                age: (item.requirements && item.requirements.age) || ''
            }
        });

        doc.rideDetails = {
            text: { title: title || '', description: description || '' },
            list: list ? (Array.isArray(list) ? list.map(normalizeItem) : [normalizeItem(list)]) : []
        };
        await doc.save();
        res.status(201).json({ success: true, data: doc.rideDetails, message: 'Ride details section added successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAttractionsDetails = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, description, list, index } = req.body;
        if (title !== undefined && title !== null) doc.rideDetails.text.title = title;
        if (description !== undefined && description !== null) doc.rideDetails.text.description = description;
        
        if (list !== undefined && list !== null) {
            const idx = (index !== undefined && index !== null) ? Number(index) : undefined;
            
            const normalizeItem = (item) => ({
                title: item.title || '',
                category: item.category || '',
                description: item.description || '',
                imageUrl: item.imageUrl || item.image || '',
                requirements: {
                    height: (item.requirements && item.requirements.height) || '',
                    age: (item.requirements && item.requirements.age) || ''
                }
            });

            if (idx !== undefined && !isNaN(idx)) {
                if (idx >= 0 && idx < doc.rideDetails.list.length) {
                    const currentItem = doc.rideDetails.list[idx];
                    const normalized = normalizeItem(list);
                    if (normalized.title !== undefined) currentItem.title = normalized.title;
                    if (normalized.category !== undefined) currentItem.category = normalized.category;
                    if (normalized.description !== undefined) currentItem.description = normalized.description;
                    if (normalized.imageUrl !== undefined) currentItem.imageUrl = normalized.imageUrl;
                    if (normalized.requirements !== undefined) {
                        if (normalized.requirements.height !== undefined) currentItem.requirements.height = normalized.requirements.height;
                        if (normalized.requirements.age !== undefined) currentItem.requirements.age = normalized.requirements.age;
                    }
                } else if (idx === doc.rideDetails.list.length || idx === -1) {
                    doc.rideDetails.list.push(normalizeItem(list));
                }
            } else {
                doc.rideDetails.list = Array.isArray(list) ? list.map(normalizeItem) : [normalizeItem(list)];
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.rideDetails, message: 'Attractions details updated successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteAttractionsDetails = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, description, list, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.rideDetails = { text: { title: '', description: '' }, list: [] };
        } else {
            if (title === true || fields.includes('title')) doc.rideDetails.text.title = '';
            if (description === true || fields.includes('description')) doc.rideDetails.text.description = '';
            if (list === true || fields.includes('list')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < doc.rideDetails.list.length) doc.rideDetails.list.splice(index, 1);
                } else {
                    doc.rideDetails.list = [];
                }
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.rideDetails, message: 'Attractions details deletion processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const getAttractionsSafety = gen('safetySection');
const getAttractionsSafetyTitle = gen('safetySection.title');
const getAttractionsSafetySubtitle = gen('safetySection.subtitle');
const getAttractionsSafetyRules = gen('safetySection.rules');

const addAttractionsSafety = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) doc = new Attraction();
        const { title, subtitle, rules } = req.body;
        doc.safetySection = {
            title: title || '',
            subtitle: subtitle || '',
            rules: rules ? (Array.isArray(rules) ? rules : [rules]) : []
        };
        await doc.save();
        res.status(201).json({ success: true, data: doc.safetySection, message: 'Safety section added successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAttractionsSafety = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, subtitle, rules, index } = req.body;
        if (title !== undefined && title !== null) doc.safetySection.title = title;
        if (subtitle !== undefined && subtitle !== null) doc.safetySection.subtitle = subtitle;
        if (rules !== undefined && rules !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < doc.safetySection.rules.length) {
                    const currentRule = doc.safetySection.rules[index];
                    if (rules.title !== undefined) currentRule.title = rules.title;
                    if (rules.content !== undefined) currentRule.content = rules.content;
                }
            } else {
                doc.safetySection.rules = Array.isArray(rules) ? rules : [rules];
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.safetySection, message: 'Safety section updated successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteAttractionsSafety = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, subtitle, rules, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.safetySection = { title: '', subtitle: '', rules: [] };
        } else {
            if (title === true || fields.includes('title')) doc.safetySection.title = '';
            if (subtitle === true || fields.includes('subtitle')) doc.safetySection.subtitle = '';
            if (rules === true || fields.includes('rules')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < doc.safetySection.rules.length) doc.safetySection.rules.splice(index, 1);
                } else {
                    doc.safetySection.rules = [];
                }
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.safetySection, message: 'Safety section deletion processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const getAttractionsCta = gen('cta');
const getAttractionsCtaButton = gen('cta.buttonLabel');
const getAttractionsCtaUrl = gen('cta.url');

const addAttractionsCta = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) doc = new Attraction();
        const { buttonLabel, url } = req.body;
        doc.cta = { buttonLabel: buttonLabel || '', url: url || '' };
        await doc.save();
        res.status(201).json({ success: true, data: doc.cta, message: 'CTA section added successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAttractionsCta = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { buttonLabel, url } = req.body;
        if (buttonLabel !== undefined && buttonLabel !== null) doc.cta.buttonLabel = buttonLabel;
        if (url !== undefined && url !== null) doc.cta.url = url;
        await doc.save();
        res.status(200).json({ success: true, data: doc.cta, message: 'CTA section updated successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteAttractionsCta = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { buttonLabel, url } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.cta = { buttonLabel: '', url: '' };
        } else {
            if (buttonLabel === true || fields.includes('buttonLabel')) doc.cta.buttonLabel = '';
            if (url === true || fields.includes('url')) doc.cta.url = '';
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.cta, message: 'CTA section deletion processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

module.exports = {
    getAttractionsPage,
    getAttractionsHero, getAttractionsHeroText, addAttractionsHero, updateAttractionsHero, deleteAttractionsHero,
    getAttractionsDetails, getAttractionsDetailsText, getAttractionsList, addAttractionsDetails, updateAttractionsDetails, deleteAttractionsDetails,
    getAttractionsSafety, getAttractionsSafetyTitle, getAttractionsSafetySubtitle, getAttractionsSafetyRules, addAttractionsSafety, updateAttractionsSafety, deleteAttractionsSafety,
    getAttractionsCta, getAttractionsCtaButton, getAttractionsCtaUrl, addAttractionsCta, updateAttractionsCta, deleteAttractionsCta
};
