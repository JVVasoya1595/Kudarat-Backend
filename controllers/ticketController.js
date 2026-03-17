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
const getTicketHeroBackground = gen('hero.backgroundUrl');

const getTicketForm = gen('bookingForm');
const getTicketFormTitle = gen('bookingForm.title');
const getTicketFormFields = gen('bookingForm.fields');
const getTicketFormSummary = gen('bookingForm.summary');
const getTicketFormButton = gen('bookingForm.submitButton');

const createBooking = async (req, res) => {
    try {
        const { name, email, phone, date, ticketType, adults, children, totalAmount } = req.body;
        if (!name || !email || !phone || !date || !totalAmount) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields' });
        }
        const booking = await Booking.create({ name, email, phone, date, ticketType, adults, children, totalAmount });
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getTicketPageData,
    getTicketHero, getTicketHeroText, getTicketHeroBackground,
    getTicketForm, getTicketFormTitle, getTicketFormFields, getTicketFormSummary, getTicketFormButton,
    createBooking
};
