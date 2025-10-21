const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); 
const { getCareerRecommendations, addCareer, getSkills, getSubjects } = require('../controllers/careerController');

// Routes
router.get("/skills", getSkills);
router.get("/subjects", getSubjects);
router.get("/recommend", protect, getCareerRecommendations); // protect if needed
router.post('/', addCareer);

module.exports = router;
