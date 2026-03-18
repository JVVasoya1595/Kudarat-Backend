const express = require('express');
const {
    getContactPage,
    getContactHero, getContactHeroText, addContactHero, updateContactHero, deleteContactHero,
    getContactInfo, getContactInfoTitle, getContactInfoPhones, getContactInfoEmails, getContactInfoAddress, getContactInfoMap, getContactInfoButton, addContactInfo, updateContactInfo, deleteContactInfo,
    getContactForm, getContactFormTitle, getContactFormFields, getContactFormButton, addContactForm, updateContactForm, deleteContactForm,
    createInquiry
} = require('../controllers/contactController');
const router = express.Router();

router.get('/', getContactPage);

router.get('/hero', getContactHero);
router.post('/hero/add', addContactHero);
router.put('/hero/update', updateContactHero);
router.delete('/hero/delete', deleteContactHero);
router.get('/hero/text', getContactHeroText);

router.get('/info', getContactInfo);
router.post('/info/add', addContactInfo);
router.put('/info/update', updateContactInfo);
router.delete('/info/delete', deleteContactInfo);
router.get('/info/title', getContactInfoTitle);
router.get('/info/phones', getContactInfoPhones);
router.get('/info/emails', getContactInfoEmails);
router.get('/info/address', getContactInfoAddress);
router.get('/info/mapUrl', getContactInfoMap);
router.get('/info/buttonLabel', getContactInfoButton);

router.get('/form', getContactForm);
router.post('/form/add', addContactForm);
router.put('/form/update', updateContactForm);
router.delete('/form/delete', deleteContactForm);
router.get('/form/title', getContactFormTitle);
router.get('/form/fields', getContactFormFields);
router.get('/form/buttonLabel', getContactFormButton);

router.post('/inquiry', createInquiry);

module.exports = router;
