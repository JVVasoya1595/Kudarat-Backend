const TicketPage = require('../models/TicketPage');
const Booking = require('../models/Booking');

const gen = (propPath) => async (req, res) => {
    try {
        const doc = await TicketPage.findOne();
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

const getTicketPageData = gen('');
const getTicketHero = gen('hero');
const getTicketHeroText = gen('hero.text');

const getTicketForm = gen('bookingForm');
const getTicketFormTitle = gen('bookingForm.title');
const getTicketFormFields = gen('bookingForm.fields');
const getTicketFormSummary = gen('bookingForm.summary');
const getTicketFormButton = gen('bookingForm.submitButton');

const addTicketHero = async (req, res) => {
    try {
        let doc = await TicketPage.findOne();
        if (!doc) doc = new TicketPage();
        const { title, tagline } = req.body;
        doc.hero = { text: { title: title || '', tagline: tagline || '' } };
        await doc.save();
        res.status(201).json({ success: true, data: doc.hero, message: 'Hero added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateTicketHero = async (req, res) => {
    try {
        let doc = await TicketPage.findOne();
        if (!doc) doc = new TicketPage();
        const { title, tagline } = req.body;
        if (title !== undefined && title !== null) doc.hero.text.title = title;
        if (tagline !== undefined && tagline !== null) doc.hero.text.tagline = tagline;
        await doc.save();
        res.status(200).json({ success: true, data: doc.hero, message: 'Hero updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteTicketHero = async (req, res) => {
    try {
        let doc = await TicketPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        const { title, tagline } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        if (Object.keys(req.body).length === 0) {
            doc.hero = { text: { title: '', tagline: '' } };
        } else {
            if (title === true || fields.includes('title')) doc.hero.text.title = '';
            if (tagline === true || fields.includes('tagline')) doc.hero.text.tagline = '';
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.hero, message: 'Hero deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const addTicketForm = async (req, res) => {
    try {
        let doc = await TicketPage.findOne();
        if (!doc) doc = new TicketPage();
        const { title, fields, summary, submitButton } = req.body;
        doc.bookingForm = {
            title: title || '',
            fields: fields || { date: {label:''}, ticketType: {label:'', options:[]}, quantity: {label:''} },
            summary: summary || {totalLabel:''},
            submitButton: submitButton || {label:''}
        };
        await doc.save();
        res.status(201).json({ success: true, data: doc.bookingForm, message: 'Booking Form added' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const updateTicketForm = async (req, res) => {
    try {
        let doc = await TicketPage.findOne();
        if (!doc) doc = new TicketPage();
        const { title, fields, summary, submitButton, index } = req.body;
        
        if (title !== undefined && title !== null) doc.bookingForm.title = title;
        if (summary !== undefined && summary !== null) {
            if (summary.totalLabel !== undefined) doc.bookingForm.summary.totalLabel = summary.totalLabel;
        }
        if (submitButton !== undefined && submitButton !== null) {
            if (submitButton.label !== undefined) doc.bookingForm.submitButton.label = submitButton.label;
        }
        if (fields !== undefined && fields !== null) {
            if (fields.date !== undefined && fields.date.label !== undefined) doc.bookingForm.fields.date.label = fields.date.label;
            if (fields.quantity !== undefined && fields.quantity.label !== undefined) doc.bookingForm.fields.quantity.label = fields.quantity.label;
            
            if (fields.ticketType !== undefined) {
                if (fields.ticketType.label !== undefined) doc.bookingForm.fields.ticketType.label = fields.ticketType.label;
                if (fields.ticketType.options !== undefined) {
                    if (index !== undefined && typeof index === 'number') {
                        if (index >= 0 && index < doc.bookingForm.fields.ticketType.options.length) {
                            const opt = doc.bookingForm.fields.ticketType.options[index];
                            if (fields.ticketType.options.label !== undefined) opt.label = fields.ticketType.options.label;
                            if (fields.ticketType.options.value !== undefined) opt.value = fields.ticketType.options.value;
                            if (fields.ticketType.options.price !== undefined) opt.price = fields.ticketType.options.price;
                        }
                    } else {
                        doc.bookingForm.fields.ticketType.options = Array.isArray(fields.ticketType.options) ? fields.ticketType.options : [fields.ticketType.options];
                    }
                }
            }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.bookingForm, message: 'Booking Form updated' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const deleteTicketForm = async (req, res) => {
    // simplified clear out
    try {
        let doc = await TicketPage.findOne();
        if (!doc) return res.status(404).json({ success: false, error: 'Data not seeded' });
        
        const { title, fieldsInput, summary, submitButton, index } = req.body;
        const fields = Array.isArray(req.body) ? req.body : Array.isArray(req.body.fields) ? req.body.fields : [];
        
        if (Object.keys(req.body).length === 0) {
            doc.bookingForm = { title: '', fields: { date: {label:''}, ticketType: {label:'', options:[]}, quantity: {label:''} }, summary: {totalLabel:''}, submitButton: {label:''} };
        } else {
             if (title === true || fields.includes('title')) doc.bookingForm.title = '';
             if (summary === true || fields.includes('summary')) doc.bookingForm.summary.totalLabel = '';
             if (submitButton === true || fields.includes('submitButton')) doc.bookingForm.submitButton.label = '';
             
             if (req.body.fields === true || fields.includes('fields')) {
                 if (index !== undefined && typeof index === 'number') {
                     if (index >= 0 && index < doc.bookingForm.fields.ticketType.options.length) {
                         doc.bookingForm.fields.ticketType.options.splice(index, 1);
                     }
                 } else {
                     doc.bookingForm.fields.ticketType.options = [];
                 }
             }
        }
        await doc.save();
        res.status(200).json({ success: true, data: doc.bookingForm, message: 'Booking Form deletion processed' });
    } catch (e) { res.status(500).json({ success: false, error: e.message }); }
};

const createBooking = async (req, res) => {
    try {
        const { date, ticketType, quantity, totalAmount } = req.body;
        const q = quantity != null && quantity !== '' ? Number(quantity) : 1;
        const total = totalAmount != null && totalAmount !== '' ? Number(totalAmount) : 0;
        const normalizedType = ticketType && String(ticketType).trim()
            ? (String(ticketType).toLowerCase() === 'child' ? 'Child' : 'Adult')
            : 'Adult';
        const booking = await Booking.create({
            date: date || undefined,
            ticketType: normalizedType,
            quantity: isNaN(q) || q < 1 ? 1 : q,
            totalAmount: isNaN(total) ? 0 : total
        });
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getTicketPageData,
    getTicketHero, getTicketHeroText, addTicketHero, updateTicketHero, deleteTicketHero,
    getTicketForm, getTicketFormTitle, getTicketFormFields, getTicketFormSummary, getTicketFormButton,
    addTicketForm, updateTicketForm, deleteTicketForm,
    createBooking
};
