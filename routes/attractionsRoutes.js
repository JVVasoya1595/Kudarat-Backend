const express = require('express');
const {
    getAttractionsPage,
    getAttractionsHero,
    getAttractionsList
} = require('../controllers/attractionsController');

const router = express.Router();

router.get('/', getAttractionsPage);
router.get('/hero', getAttractionsHero);
router.get('/list', getAttractionsList);

module.exports = router;
