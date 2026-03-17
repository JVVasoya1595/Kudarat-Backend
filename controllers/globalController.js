const Home = require('../models/Home');
const About = require('../models/About');
const TicketPage = require('../models/TicketPage');
const Attraction = require('../models/Attraction');
const ContactPage = require('../models/ContactPage');

// @desc    Get all data for every page and section (Universal Collector)
// @route   GET /all
// @access  Public
const getAllData = async (req, res) => {
    try {
        const [home, about, tickets, attractions, contact] = await Promise.all([
            Home.findOne(),
            About.findOne(),
            TicketPage.findOne(),
            Attraction.findOne(),
            ContactPage.findOne()
        ]);

        res.status(200).json({
            success: true,
            data: {
                home: home || null,
                about: about || null,
                tickets: tickets || null,
                attractions: attractions || null,
                contact: contact || null
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getAllData };
