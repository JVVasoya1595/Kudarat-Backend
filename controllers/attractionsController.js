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
        const { title, tagline, backgroundUrl, image, imageUrl } = req.body;
        const bg = backgroundUrl || image || imageUrl;

        if (title !== undefined && title !== null) doc.hero.text.title = title;
        if (tagline !== undefined && tagline !== null) doc.hero.text.tagline = tagline;
        if (bg !== undefined && bg !== null) doc.hero.backgroundUrl = bg;

        await doc.save();
        res.status(201).json({ success: true, data: doc.hero, message: 'Hero section processed successfully' });
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
        const { title, description, list, cards } = req.body;
        const items = list || cards;

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

        if (title !== undefined && title !== null) doc.rideDetails.text.title = title;
        if (description !== undefined && description !== null) doc.rideDetails.text.description = description;
        
        if (items !== undefined && items !== null) {
            doc.rideDetails.list = Array.isArray(items) ? items.map(normalizeItem) : [normalizeItem(items)];
        }
        
        await doc.save();
        res.status(201).json({ success: true, data: doc.rideDetails, message: 'Ride details section processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAttractionsDetails = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, description, list, cards, index } = req.body;
        const items = list || cards;

        if (title !== undefined && title !== null) doc.rideDetails.text.title = title;
        if (description !== undefined && description !== null) doc.rideDetails.text.description = description;
        
        if (items !== undefined && items !== null) {
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
                    const itemPayload = Array.isArray(items) ? items[0] : items;
                    
                    if (itemPayload.title !== undefined) currentItem.title = itemPayload.title;
                    if (itemPayload.category !== undefined) currentItem.category = itemPayload.category;
                    if (itemPayload.description !== undefined) currentItem.description = itemPayload.description;
                    if (itemPayload.imageUrl !== undefined || itemPayload.image !== undefined) {
                        currentItem.imageUrl = itemPayload.imageUrl || itemPayload.image;
                    }
                    if (itemPayload.requirements !== undefined) {
                        if (!currentItem.requirements) currentItem.requirements = { height: '', age: '' };
                        if (itemPayload.requirements.height !== undefined) currentItem.requirements.height = itemPayload.requirements.height;
                        if (itemPayload.requirements.age !== undefined) currentItem.requirements.age = itemPayload.requirements.age;
                    }
                } else if (idx === doc.rideDetails.list.length || idx === -1) {
                    doc.rideDetails.list.push(normalizeItem(Array.isArray(items) ? items[0] : items));
                }
            } else {
                doc.rideDetails.list = Array.isArray(items) ? items.map(normalizeItem) : [normalizeItem(items)];
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
        const { title, description, list, cards, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : (req.body && Array.isArray(req.body.fields)) ? req.body.fields : [];
        if (Object.keys(req.body || {}).length === 0) {
            doc.rideDetails = { text: { title: '', description: '' }, list: [] };
        } else {
            if (title === true || fields.includes('title')) doc.rideDetails.text.title = '';
            if (description === true || fields.includes('description')) doc.rideDetails.text.description = '';
            if (list === true || cards === true || fields.includes('list') || fields.includes('cards')) {
                if (index !== undefined && index !== null) {
                    const idx = Number(index);
                    if (idx >= 0 && idx < doc.rideDetails.list.length) doc.rideDetails.list.splice(idx, 1);
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
        const { title, subtitle, rules, cards } = req.body;
        const items = rules || cards;

        if (title !== undefined && title !== null) doc.safetySection.title = title;
        if (subtitle !== undefined && subtitle !== null) doc.safetySection.subtitle = subtitle;
        
        if (items !== undefined && items !== null) {
            doc.safetySection.rules = Array.isArray(items) ? items : [items];
        }
        
        await doc.save();
        res.status(201).json({ success: true, data: doc.safetySection, message: 'Safety section processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAttractionsSafety = async (req, res) => {
    try {
        let doc = await Attraction.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, subtitle, rules, cards, index } = req.body;
        const items = rules || cards;

        if (title !== undefined && title !== null) doc.safetySection.title = title;
        if (subtitle !== undefined && subtitle !== null) doc.safetySection.subtitle = subtitle;
        
        if (items !== undefined && items !== null) {
            const idx = (index !== undefined && index !== null) ? Number(index) : undefined;
            
            if (idx !== undefined && !isNaN(idx)) {
                if (idx >= 0 && idx < doc.safetySection.rules.length) {
                    const currentRule = doc.safetySection.rules[idx];
                    const itemPayload = Array.isArray(items) ? items[0] : items;
                    if (itemPayload.title !== undefined) currentRule.title = itemPayload.title;
                    if (itemPayload.content !== undefined) currentRule.content = itemPayload.content;
                } else if (idx === doc.safetySection.rules.length || idx === -1) {
                    doc.safetySection.rules.push(Array.isArray(items) ? items[0] : items);
                }
            } else {
                doc.safetySection.rules = Array.isArray(items) ? items : [items];
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
        const { title, subtitle, rules, cards, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : (req.body && Array.isArray(req.body.fields)) ? req.body.fields : [];
        if (Object.keys(req.body || {}).length === 0) {
            doc.safetySection = { title: '', subtitle: '', rules: [] };
        } else {
            if (title === true || fields.includes('title')) doc.safetySection.title = '';
            if (subtitle === true || fields.includes('subtitle')) doc.safetySection.subtitle = '';
            if (rules === true || cards === true || fields.includes('rules') || fields.includes('cards')) {
                if (index !== undefined && index !== null) {
                    const idx = Number(index);
                    if (idx >= 0 && idx < doc.safetySection.rules.length) doc.safetySection.rules.splice(idx, 1);
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
        const { buttonLabel, url, button } = req.body;
        
        const label = buttonLabel || (button && button.label);
        const targetUrl = url || (button && button.url);

        if (label !== undefined && label !== null) doc.cta.buttonLabel = label;
        if (targetUrl !== undefined && targetUrl !== null) doc.cta.url = targetUrl;

        await doc.save();
        res.status(201).json({ success: true, data: doc.cta, message: 'CTA section processed successfully' });
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
