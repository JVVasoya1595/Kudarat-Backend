const About = require('../models/About');

const gen = (propPath, status = 200) => async (req, res) => {
    try {
        const doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });

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

const getAbout = async (req, res) => {
    try {
        const doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { hero, story, features, support } = doc;
        res.status(200).json({ hero, story, features, support });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getAboutHero = gen('hero');
const getAboutHeroText = gen('hero.text');

const addAboutHero = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) doc = new About();
        const { tagline, title } = req.body;
        doc.hero = { text: { tagline: tagline || '', title: title || '' } };
        await doc.save();
        res.status(201).json({ success: true, data: doc.hero, message: 'Hero section added successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAboutHero = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { tagline, title } = req.body;
        if (tagline !== undefined && tagline !== null) doc.hero.text.tagline = tagline;
        if (title !== undefined && title !== null) doc.hero.text.title = title;
        await doc.save();
        res.status(200).json({ success: true, data: doc.hero, message: 'Hero section updated successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteAboutHero = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { tagline, title } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.hero = { text: { tagline: '', title: '' } };
        } else {
            if (tagline === true || fields.includes('tagline')) doc.hero.text.tagline = '';
            if (title === true || fields.includes('title')) doc.hero.text.title = '';
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.hero, message: 'Hero section deletion processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const getAboutStory = gen('story');
const getAboutStoryTitle = gen('story.title');
const getAboutStoryDescription = gen('story.description');

const addAboutStory = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) doc = new About();
        const { title, description } = req.body;
        doc.story = { title: title || '', description: description || '' };
        await doc.save();
        res.status(201).json({ success: true, data: doc.story, message: 'Story section added successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAboutStory = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { title, description } = req.body;
        if (title !== undefined && title !== null) doc.story.title = title;
        if (description !== undefined && description !== null) doc.story.description = description;
        await doc.save();
        res.status(200).json({ success: true, data: doc.story, message: 'Story section updated successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteAboutStory = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { title, description } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.story = { title: '', description: '' };
        } else {
            if (title === true || fields.includes('title')) doc.story.title = '';
            if (description === true || fields.includes('description')) doc.story.description = '';
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.story, message: 'Story section deletion processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const getAboutFeatures = gen('features');
const getAboutFeaturesTitle = gen('features.title');
const getAboutFeaturesCards = gen('features.cards');

const addAboutFeatures = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) doc = new About();
        const { title, cards } = req.body;
        doc.features = {
            title: title || '',
            cards: cards ? (Array.isArray(cards) ? cards : [cards]) : []
        };
        await doc.save();
        res.status(201).json({ success: true, data: doc.features, message: 'Features section added successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAboutFeatures = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { title, cards, index } = req.body;
        if (title !== undefined && title !== null) doc.features.title = title;
        if (cards !== undefined && cards !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < doc.features.cards.length) {
                    const currentCard = doc.features.cards[index];
                    if (cards.title !== undefined) currentCard.title = cards.title;
                    if (cards.description !== undefined) currentCard.description = cards.description;
                }
            } else {
                doc.features.cards = Array.isArray(cards) ? cards : [cards];
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.features, message: 'Features section updated successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteAboutFeatures = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { title, cards, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.features = { title: '', cards: [] };
        } else {
            if (title === true || fields.includes('title')) doc.features.title = '';
            if (cards === true || fields.includes('cards')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < doc.features.cards.length) doc.features.cards.splice(index, 1);
                } else {
                    doc.features.cards = [];
                }
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.features, message: 'Features section deletion processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const getAboutSupport = gen('support');
const getAboutSupportTitle = gen('support.title');
const getAboutSupportPhone = gen('support.phone');
const getAboutSupportEmail = gen('support.email');
const getAboutSupportButton = gen('support.button');

const addAboutSupport = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) doc = new About();
        const { title, phone, email, button } = req.body;
        doc.support = {
            title: title || '',
            phone: phone || '',
            email: email || '',
            button: button || { label: '', url: '' }
        };
        await doc.save();
        res.status(201).json({ success: true, data: doc.support, message: 'Support section added successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateAboutSupport = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { title, phone, email, button } = req.body;
        if (title !== undefined && title !== null) doc.support.title = title;
        if (phone !== undefined && phone !== null) doc.support.phone = phone;
        if (email !== undefined && email !== null) doc.support.email = email;
        if (button !== undefined && button !== null) {
            if (button.label !== undefined) doc.support.button.label = button.label;
            if (button.url !== undefined) doc.support.button.url = button.url;
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.support, message: 'Support section updated successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteAboutSupport = async (req, res) => {
    try {
        let doc = await About.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'About data not seeded' });
        const { title, phone, email, button } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.support = { title: '', phone: '', email: '', button: { label: '', url: '' } };
        } else {
            if (title === true || fields.includes('title')) doc.support.title = '';
            if (phone === true || fields.includes('phone')) doc.support.phone = '';
            if (email === true || fields.includes('email')) doc.support.email = '';
            if (button === true || fields.includes('button')) doc.support.button = { label: '', url: '' };
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.support, message: 'Support section deletion processed successfully' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

module.exports = {
    getAbout,
    getAboutHero, getAboutHeroText, addAboutHero, updateAboutHero, deleteAboutHero,
    getAboutStory, getAboutStoryTitle, getAboutStoryDescription, addAboutStory, updateAboutStory, deleteAboutStory,
    getAboutFeatures, getAboutFeaturesTitle, getAboutFeaturesCards, addAboutFeatures, updateAboutFeatures, deleteAboutFeatures,
    getAboutSupport, getAboutSupportTitle, getAboutSupportPhone, getAboutSupportEmail, getAboutSupportButton, addAboutSupport, updateAboutSupport, deleteAboutSupport
};
