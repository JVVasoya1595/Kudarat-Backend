const ContactPage = require('../models/ContactPage');
const Inquiry = require('../models/Inquiry');

// @desc    Get Contact page data
// @route   GET /contact
// @access  Public
const getContactPage = async (req, res) => {
    try {
        const contactData = await ContactPage.findOne();
        if (!contactData) {
            return res.status(404).json({ success: false, error: 'Contact page data not seeded' });
        }
        res.status(200).json(contactData);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Submit an inquiry
// @route   POST /contact/inquiry
// @access  Public
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

module.exports = { getContactPage, createInquiry };
