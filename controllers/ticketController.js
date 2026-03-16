const TicketPage = require('../models/TicketPage');
const Booking = require('../models/Booking');

// @desc    Get Ticket page static data
// @route   GET /tickets
// @access  Public
const getTicketPageData = async (req, res) => {
    try {
        const ticketPage = await TicketPage.findOne();
        if (!ticketPage) {
            return res.status(404).json({ success: false, error: 'Ticket page data not seeded' });
        }
        res.status(200).json(ticketPage);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Ticket Hero section data
// @route   GET /tickets/hero
// @access  Public
const getTicketHero = async (req, res) => {
    try {
        const ticketPage = await TicketPage.findOne();
        if (!ticketPage) {
            return res.status(404).json({ success: false, error: 'Data not seeded' });
        }
        res.status(200).json(ticketPage.hero);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get Ticket Booking Form section data
// @route   GET /tickets/form
// @access  Public
const getTicketForm = async (req, res) => {
    try {
        const ticketPage = await TicketPage.findOne();
        if (!ticketPage) {
            return res.status(404).json({ success: false, error: 'Data not seeded' });
        }
        res.status(200).json(ticketPage.bookingForm);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Store a new booking
// @route   POST /tickets/book
// @access  Public
const createBooking = async (req, res) => {
    try {
        const { name, email, phone, date, ticketType, adults, children, totalAmount } = req.body;
        
        // Basic validation
        if (!name || !email || !phone || !date || !totalAmount) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields' });
        }

        const booking = await Booking.create({
            name,
            email,
            phone,
            date,
            ticketType,
            adults,
            children,
            totalAmount
        });

        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getTicketPageData, getTicketHero, getTicketForm, createBooking };
