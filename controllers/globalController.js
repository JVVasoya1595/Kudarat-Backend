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
                faq: faq ? { _id: faq._id, title: faq.title, subtitle: faq.subtitle, faqs: faq.faqs, cta: faq.cta, createdAt: faq.createdAt, updatedAt: faq.updatedAt } : null,
                safety: safety ? { _id: safety._id, title: safety.title, subtitle: safety.subtitle, reminder: safety.reminder, rules: safety.rules, cta: safety.cta, createdAt: safety.createdAt, updatedAt: safety.updatedAt } : null,
                gallery: gallery ? { _id: gallery._id, title: gallery.title, subtitle: gallery.subtitle, categories: gallery.categories, video: gallery.video, createdAt: gallery.createdAt, updatedAt: gallery.updatedAt } : null
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getAllData };
