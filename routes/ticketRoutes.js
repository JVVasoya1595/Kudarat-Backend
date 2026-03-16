const express = require('express');
const { getTicketPageData, getTicketHero, getTicketForm, createBooking } = require('../controllers/ticketController');
const router = express.Router();

router.get('/', getTicketPageData);
router.get('/hero', getTicketHero);
router.get('/form', getTicketForm);
router.post('/book', createBooking);

module.exports = router;
