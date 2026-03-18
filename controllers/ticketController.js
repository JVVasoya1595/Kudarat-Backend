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
    getTicketHero, getTicketHeroText,
    getTicketForm, getTicketFormTitle, getTicketFormFields, getTicketFormSummary, getTicketFormButton,
    createBooking
};
