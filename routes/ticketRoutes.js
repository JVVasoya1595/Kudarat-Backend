const express = require('express');
const {
    getTicketPageData,
    getTicketHero, getTicketHeroText,
    getTicketForm, getTicketFormTitle, getTicketFormFields, getTicketFormSummary, getTicketFormButton,
    createBooking
} = require('../controllers/ticketController');
const router = express.Router();

router.get('/', getTicketPageData);

router.get('/hero', getTicketHero);
router.get('/hero/text', getTicketHeroText);

router.get('/form', getTicketForm);
router.get('/form/title', getTicketFormTitle);
router.get('/form/fields', getTicketFormFields);
router.get('/form/summary', getTicketFormSummary);
router.get('/form/button', getTicketFormButton);

router.post('/bookings', createBooking);

module.exports = router;
