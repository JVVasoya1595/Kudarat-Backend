const ContactPage = require('../models/ContactPage');
const Inquiry = require('../models/Inquiry');

const gen = (propPath) => async (req, res) => {
    try {
        const doc = await ContactPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        
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

const getContactPage = gen('');
const getContactHero = gen('hero');
const getContactHeroText = gen('hero.text');

const getContactInfo = gen('contactInfo');
const getContactInfoTitle = gen('contactInfo.title');
const getContactInfoPhones = gen('contactInfo.phones');
const getContactInfoEmails = gen('contactInfo.emails');
const getContactInfoAddress = gen('contactInfo.address');
const getContactInfoMap = gen('contactInfo.mapUrl');
const getContactInfoButton = gen('contactInfo.buttonLabel');

const getContactForm = gen('messageForm');
const getContactFormTitle = gen('messageForm.title');
const getContactFormFields = gen('messageForm.fields');
const getContactFormButton = gen('messageForm.buttonLabel');

const createInquiry = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'Please provide name, email and message' });
        }
        const inquiry = await Inquiry.create({ name, email, message });
        res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getContactPage,
    getContactHero, getContactHeroText,
    getContactInfo, getContactInfoTitle, getContactInfoPhones, getContactInfoEmails, getContactInfoAddress, getContactInfoMap, getContactInfoButton,
    getContactForm, getContactFormTitle, getContactFormFields, getContactFormButton,
    createInquiry
};
