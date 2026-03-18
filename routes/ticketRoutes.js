const express = require('express');
const {
    getTicketPageData,
    getTicketHero, getTicketHeroText, addTicketHero, updateTicketHero, deleteTicketHero,
    getTicketForm, getTicketFormTitle, getTicketFormFields, getTicketFormSummary, getTicketFormButton,
    addTicketForm, updateTicketForm, deleteTicketForm,
    createBooking
} = require('../controllers/ticketController');
const router = express.Router();

router.get('/', getTicketPageData);

router.get('/hero', getTicketHero);
router.post('/hero/add', addTicketHero);
router.put('/hero/update', updateTicketHero);
router.delete('/hero/delete', deleteTicketHero);
router.get('/hero/text', getTicketHeroText);

router.get('/form', getTicketForm);
router.post('/form/add', addTicketForm);
router.put('/form/update', updateTicketForm);
router.delete('/form/delete', deleteTicketForm);
router.get('/form/title', getTicketFormTitle);
router.get('/form/fields', getTicketFormFields);
router.get('/form/summary', getTicketFormSummary);
router.get('/form/button', getTicketFormButton);

router.post('/bookings', createBooking);

module.exports = router;
