const express = require('express');
const {
    getContactPage,
    getContactHero, getContactHeroText,
    getContactInfo, getContactInfoTitle, getContactInfoPhones, getContactInfoEmails, getContactInfoAddress, getContactInfoMap, getContactInfoButton,
    getContactForm, getContactFormTitle, getContactFormFields, getContactFormButton,
    createInquiry
} = require('../controllers/contactController');
const router = express.Router();

router.get('/', getContactPage);

router.get('/hero', getContactHero);
router.get('/hero/text', getContactHeroText);

router.get('/info', getContactInfo);
router.get('/info/title', getContactInfoTitle);
router.get('/info/phones', getContactInfoPhones);
router.get('/info/emails', getContactInfoEmails);
router.get('/info/address', getContactInfoAddress);
router.get('/info/mapUrl', getContactInfoMap);
router.get('/info/buttonLabel', getContactInfoButton);

router.get('/form', getContactForm);
router.get('/form/title', getContactFormTitle);
router.get('/form/fields', getContactFormFields);
router.get('/form/buttonLabel', getContactFormButton);

router.post('/inquiry', createInquiry);

module.exports = router;
