const Home = require('../models/Home');
const About = require('../models/About');
const TicketPage = require('../models/TicketPage');
const Attraction = require('../models/Attraction');
const ContactPage = require('../models/ContactPage');
const FaqPage = require('../models/FaqPage');
const SafetyPage = require('../models/SafetyPage');
const GalleryPage = require('../models/GalleryPage');

// @desc    Get all data for every page and section (Universal Collector)
// @route   GET /all
// @access  Public
const getAllData = async (req, res) => {
    try {
        const [home, about, tickets, attractions, contact, faq, safety, gallery] = await Promise.all([
            Home.findOne(),
            About.findOne(),
            TicketPage.findOne(),
            Attraction.findOne(),
            ContactPage.findOne(),
            FaqPage.findOne(),
            SafetyPage.findOne(),
            GalleryPage.findOne()
        ]);

        res.status(200).json({
            success: true,
            data: {
                home: home || null,
                about: about || null,
                tickets: tickets || null,
                attractions: attractions || null,
                contact: contact || null,
                faq: faq || null,
                safety: safety || null,
                gallery: gallery || null
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getAllData };
