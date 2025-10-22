const express = require('express');
const router = express.Router();
const { getCareerRecommendations, addCareer } = require('../controllers/careerController');
const supabase = require('../config/supabaseClient');

// ==========================
// Skills & Subjects routes
// ==========================
router.get('/skills', async (req, res) => {
  try {
    const { data, error } = await supabase.from('skills').select('skill_id, skill_name');
    if (error) throw error;
    res.json(data); // send array of objects
  } catch (err) {
    console.error('Error fetching skills:', err.message);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

router.get('/subjects', async (req, res) => {
  try {
    const { data, error } = await supabase.from('subjects').select('subject_id, subject_name');
    if (error) throw error;
    res.json(data); // send array of objects
  } catch (err) {
    console.error('Error fetching subjects:', err.message);
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
});


// ==========================
// Career routes
// ==========================
router.get('/recommend', getCareerRecommendations); // protected version can use middleware
router.post('/', addCareer);

// ==========================
// Test recommendations (no login needed)
// ==========================
router.get('/recommendations/test/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { data: userProfile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !userProfile) return res.status(404).json({ error: 'User not found' });

    const mockReq = { user: { id: userProfile.id } };
    const mockRes = {
      status: function (s) { this.statusCode = s; return this; },
      json: function (d) { return res.status(this.statusCode || 200).json(d); }
    };

    await getCareerRecommendations(mockReq, mockRes);
  } catch (err) {
    console.error('Test Recommendation Error:', err);
    res.status(500).json({ error: 'Error generating test recommendations' });
  }
});

module.exports = router;
