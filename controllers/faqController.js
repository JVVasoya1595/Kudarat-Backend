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

module.exports = {
    getFaq,
    getFaqTitle,
    getFaqSubtitle,
    getFaqItems,
    getFaqCta
};
