// careerRoutes.js
const express = require('express');
const { getCareerRecommendations } = require('../controllers/careerController');
const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.get('/recommend', protect, getCareerRecommendations); 

module.exports = router;