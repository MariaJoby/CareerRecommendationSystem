// careerRoutes.js
const express = require('express');
const { getCareerRecommendations,addCareer } = require('../controllers/careerController');
const { protect } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.get('/recommend',  getCareerRecommendations);
router.post('/', addCareer); 

module.exports = router;