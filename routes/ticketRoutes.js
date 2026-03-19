const express = require('express');
const {
    getTicketPageData,
    getTicketHero, getTicketHeroText, addTicketHero, updateTicketHero, deleteTicketHero,
    getTicketForm, getTicketFormTitle, getTicketFormFields, getTicketFormSummary, getTicketFormButton,
    addTicketForm, updateTicketForm, deleteTicketForm,
    createBooking
} = require('../controllers/ticketController');
const { upload } = require('../controllers/uploadController');
const router = express.Router();

router.get('/', getTicketPageData);

router.get('/hero', getTicketHero);
router.post('/hero/add', upload.any(), addTicketHero);
router.put('/hero/update', upload.any(), updateTicketHero);
router.delete('/hero/delete', upload.any(), deleteTicketHero);
router.get('/hero/text', getTicketHeroText);

router.get('/form', getTicketForm);
router.post('/form/add', upload.any(), addTicketForm);
router.put('/form/update', upload.any(), updateTicketForm);
router.delete('/form/delete', upload.any(), deleteTicketForm);
router.get('/form/title', getTicketFormTitle);
router.get('/form/fields', getTicketFormFields);
router.get('/form/summary', getTicketFormSummary);
router.get('/form/button', getTicketFormButton);

router.post('/bookings', createBooking);

module.exports = router;
