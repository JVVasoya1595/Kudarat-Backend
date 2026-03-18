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

const addContactHero = async (req, res) => {
    try {
        let doc = await ContactPage.findOne();
        if (!doc) doc = new ContactPage();
        const { title, tagline, backgroundUrl } = req.body;
        doc.hero = { text: { title: title || '', tagline: tagline || '' }, backgroundUrl: backgroundUrl || '' };
        await doc.save();
        res.status(201).json({ success: true, data: doc.hero, message: 'Hero added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateContactHero = async (req, res) => {
    try {
        let doc = await ContactPage.findOne();
        if (!doc) doc = new ContactPage();
        const { title, tagline, backgroundUrl } = req.body;
        if (title !== undefined && title !== null) doc.hero.text.title = title;
        if (tagline !== undefined && tagline !== null) doc.hero.text.tagline = tagline;
        if (backgroundUrl !== undefined && backgroundUrl !== null) doc.hero.backgroundUrl = backgroundUrl;
        await doc.save();
        res.status(200).json({ success: true, data: doc.hero, message: 'Hero updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteContactHero = async (req, res) => {
    try {
        let doc = await ContactPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, tagline, backgroundUrl } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.hero = { text: { title: '', tagline: '' }, backgroundUrl: '' };
        } else {
            if (title === true || fields.includes('title')) doc.hero.text.title = '';
            if (tagline === true || fields.includes('tagline')) doc.hero.text.tagline = '';
            if (backgroundUrl === true || fields.includes('backgroundUrl')) doc.hero.backgroundUrl = '';
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.hero, message: 'Hero deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const addContactInfo = async (req, res) => {
    try {
        let doc = await ContactPage.findOne();
        if (!doc) doc = new ContactPage();
        const { title, address, mapUrl, buttonLabel, phones, emails } = req.body;
        doc.contactInfo = {
            title: title || '',
            phones: phones ? (Array.isArray(phones) ? phones : [phones]) : [],
            emails: emails ? (Array.isArray(emails) ? emails : [emails]) : [],
            address: address || '',
            mapUrl: mapUrl || '',
            buttonLabel: buttonLabel || ''
        };
        await doc.save();
        res.status(201).json({ success: true, data: doc.contactInfo, message: 'Contact info added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateContactInfo = async (req, res) => {
    try {
        let doc = await ContactPage.findOne();
        if (!doc) doc = new ContactPage();
        const { title, address, mapUrl, buttonLabel, phones, emails, index } = req.body;
        
        if (title !== undefined && title !== null) doc.contactInfo.title = title;
        if (address !== undefined && address !== null) doc.contactInfo.address = address;
        if (mapUrl !== undefined && mapUrl !== null) doc.contactInfo.mapUrl = mapUrl;
        if (buttonLabel !== undefined && buttonLabel !== null) doc.contactInfo.buttonLabel = buttonLabel;
        
        if (phones !== undefined && phones !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < doc.contactInfo.phones.length) doc.contactInfo.phones[index] = phones;
            } else {
                doc.contactInfo.phones = Array.isArray(phones) ? phones : [phones];
            }
        }
        
        if (emails !== undefined && emails !== null) {
            if (index !== undefined && typeof index === 'number') {
                if (index >= 0 && index < doc.contactInfo.emails.length) doc.contactInfo.emails[index] = emails;
            } else {
                doc.contactInfo.emails = Array.isArray(emails) ? emails : [emails];
            }
        }
        
        await doc.save();
        res.status(200).json({ success: true, data: doc.contactInfo, message: 'Contact info updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteContactInfo = async (req, res) => {
    try {
        let doc = await ContactPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, address, mapUrl, buttonLabel, phones, emails, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.contactInfo = { title: '', phones: [], emails: [], address: '', mapUrl: '', buttonLabel: '' };
        } else {
            if (title === true || fields.includes('title')) doc.contactInfo.title = '';
            if (address === true || fields.includes('address')) doc.contactInfo.address = '';
            if (mapUrl === true || fields.includes('mapUrl')) doc.contactInfo.mapUrl = '';
            if (buttonLabel === true || fields.includes('buttonLabel')) doc.contactInfo.buttonLabel = '';
            
            if (phones === true || fields.includes('phones')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < doc.contactInfo.phones.length) doc.contactInfo.phones.splice(index, 1);
                } else doc.contactInfo.phones = [];
            }
            if (emails === true || fields.includes('emails')) {
                if (index !== undefined && typeof index === 'number') {
                    if (index >= 0 && index < doc.contactInfo.emails.length) doc.contactInfo.emails.splice(index, 1);
                } else doc.contactInfo.emails = [];
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.contactInfo, message: 'Contact info deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const addContactForm = async (req, res) => {
    try {
        let doc = await ContactPage.findOne();
        if (!doc) doc = new ContactPage();
        const { title, buttonLabel, fields } = req.body;
        doc.messageForm = {
            title: title || '',
            buttonLabel: buttonLabel || '',
            fields: fields || { name: {label:'', placeholder:''}, email: {label:'', placeholder:''}, message: {label:'', placeholder:''} }
        };
        await doc.save();
        res.status(201).json({ success: true, data: doc.messageForm, message: 'Form added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateContactForm = async (req, res) => {
    try {
        let doc = await ContactPage.findOne();
        if (!doc) doc = new ContactPage();
        const { title, buttonLabel, fields } = req.body;
        
        if (title !== undefined && title !== null) doc.messageForm.title = title;
        if (buttonLabel !== undefined && buttonLabel !== null) doc.messageForm.buttonLabel = buttonLabel;
        
        if (fields !== undefined && fields !== null) {
            if (fields.name) {
                if (fields.name.label !== undefined) doc.messageForm.fields.name.label = fields.name.label;
                if (fields.name.placeholder !== undefined) doc.messageForm.fields.name.placeholder = fields.name.placeholder;
            }
            if (fields.email) {
                if (fields.email.label !== undefined) doc.messageForm.fields.email.label = fields.email.label;
                if (fields.email.placeholder !== undefined) doc.messageForm.fields.email.placeholder = fields.email.placeholder;
            }
            if (fields.message) {
                if (fields.message.label !== undefined) doc.messageForm.fields.message.label = fields.message.label;
                if (fields.message.placeholder !== undefined) doc.messageForm.fields.message.placeholder = fields.message.placeholder;
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.messageForm, message: 'Form updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteContactForm = async (req, res) => {
    try {
        let doc = await ContactPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, buttonLabel } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.messageForm = { title: '', buttonLabel: '', fields: { name: {label:'', placeholder:''}, email: {label:'', placeholder:''}, message: {label:'', placeholder:''} } };
        } else {
            if (title === true || fields.includes('title')) doc.messageForm.title = '';
            if (buttonLabel === true || fields.includes('buttonLabel')) doc.messageForm.buttonLabel = '';
            // Omitting inner field deletion for simplicity, text clearing via put is better.
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.messageForm, message: 'Form deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

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
    getContactHero, getContactHeroText, addContactHero, updateContactHero, deleteContactHero,
    getContactInfo, getContactInfoTitle, getContactInfoPhones, getContactInfoEmails, getContactInfoAddress, getContactInfoMap, getContactInfoButton, addContactInfo, updateContactInfo, deleteContactInfo,
    getContactForm, getContactFormTitle, getContactFormFields, getContactFormButton, addContactForm, updateContactForm, deleteContactForm,
    createInquiry
};
