const FaqPage = require('../models/FaqPage');

const gen = (propPath) => async (req, res) => {
    try {
        const doc = await FaqPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'FAQ data not seeded' });

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

const getFaq = async (req, res) => {
    try {
        const doc = await FaqPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'FAQ data not seeded' });
        // Explicit ordering: title → subtitle → faqs → cta
        res.status(200).json({
            _id: doc._id,
            title: doc.title,
            subtitle: doc.subtitle,
            faqs: doc.faqs,
            cta: doc.cta,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getFaqTitle = gen('title');
const getFaqSubtitle = gen('subtitle');
const getFaqItems = gen('faqs');
const getFaqCta = gen('cta');

const addFaqHeader = async (req, res) => {
    try {
        let doc = await FaqPage.findOne();
        if (!doc) doc = new FaqPage();
        const { title, subtitle } = req.body;
        doc.title = title || '';
        doc.subtitle = subtitle || '';
        await doc.save();
        res.status(201).json({ success: true, data: { title: doc.title, subtitle: doc.subtitle }, message: 'Header added/overwritten' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateFaqHeader = async (req, res) => {
    try {
        let doc = await FaqPage.findOne();
        if (!doc) doc = new FaqPage();
        const { title, subtitle } = req.body;
        if (title !== undefined && title !== null) doc.title = title;
        if (subtitle !== undefined && subtitle !== null) doc.subtitle = subtitle;
        await doc.save();
        res.status(200).json({ success: true, data: { title: doc.title, subtitle: doc.subtitle }, message: 'Header updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteFaqHeader = async (req, res) => {
    try {
        let doc = await FaqPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, subtitle } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.title = ''; doc.subtitle = '';
        } else {
            if (title === true || fields.includes('title')) doc.title = '';
            if (subtitle === true || fields.includes('subtitle')) doc.subtitle = '';
        }
        await doc.save();
        res.status(200).json({ success: true, data: { title: doc.title, subtitle: doc.subtitle }, message: 'Header deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const addFaqItems = async (req, res) => {
    try {
        let doc = await FaqPage.findOne();
        if (!doc) doc = new FaqPage();
        const { faqs } = req.body;
        doc.faqs = faqs ? (Array.isArray(faqs) ? faqs : [faqs]) : [];
        await doc.save();
        res.status(201).json({ success: true, data: doc.faqs, message: 'FAQs added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateFaqItems = async (req, res) => {
    try {
        let doc = await FaqPage.findOne();
        if (!doc) doc = new FaqPage();
        const { faqs, index } = req.body;
        if (faqs !== undefined && faqs !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < doc.faqs.length) {
                    if (faqs.question !== undefined) doc.faqs[index].question = faqs.question;
                    if (faqs.answer !== undefined) doc.faqs[index].answer = faqs.answer;
                }
            } else {
                doc.faqs = Array.isArray(faqs) ? faqs : [faqs];
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.faqs, message: 'FAQs updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteFaqItems = async (req, res) => {
    try {
        let doc = await FaqPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { index } = req.body;
        if (index !== undefined && typeof index === 'number') {
            if (index >= 0 && index < doc.faqs.length) doc.faqs.splice(index, 1);
        } else {
            doc.faqs = [];
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.faqs, message: 'FAQs deleted/removed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const addFaqCta = async (req, res) => {
    try {
        let doc = await FaqPage.findOne();
        if (!doc) doc = new FaqPage();
        const { buttonLabel, url } = req.body;
        doc.cta = { buttonLabel: buttonLabel || '', url: url || '' };
        await doc.save();
        res.status(201).json({ success: true, data: doc.cta, message: 'CTA added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateFaqCta = async (req, res) => {
    try {
        let doc = await FaqPage.findOne();
        if (!doc) doc = new FaqPage();
        const { buttonLabel, url } = req.body;
        if (buttonLabel !== undefined && buttonLabel !== null) doc.cta.buttonLabel = buttonLabel;
        if (url !== undefined && url !== null) doc.cta.url = url;
        await doc.save();
        res.status(200).json({ success: true, data: doc.cta, message: 'CTA updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteFaqCta = async (req, res) => {
    try {
        let doc = await FaqPage.findOne();
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
        res.status(200).json({ success: true, data: doc.cta, message: 'CTA deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

module.exports = {
    getFaq,
    getFaqTitle,
    getFaqSubtitle,
    getFaqItems,
    getFaqCta,
    addFaqHeader, updateFaqHeader, deleteFaqHeader,
    addFaqItems, updateFaqItems, deleteFaqItems,
    addFaqCta, updateFaqCta, deleteFaqCta
};
