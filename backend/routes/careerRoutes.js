// careerRoutes.js
const express = require('express');
const { getCareerRecommendations } = require('../controllers/careerController');

const router = express.Router();

router.get('/recommend/:user_id', getCareerRecommendations);

module.exports = router;
