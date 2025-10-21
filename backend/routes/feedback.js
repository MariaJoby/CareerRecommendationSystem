const express = require("express");
const router = express.Router();
const supabase = require("../config/supabaseClient");

// Log every incoming POST request for debugging
router.use((req, res, next) => {
  console.log("Feedback route hit:", req.method, req.url, req.body);
  next();
});

// POST /api/feedback
router.post("/", async (req, res) => {
  try {
    const { user_id, description, rating } = req.body;

    if (!user_id || !description || !rating) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const numericRating = parseFloat(rating);

    const { data, error } = await supabase
      .from("feedback")
      .insert([{ 
        user_id: user_id.toString(),
        description,
        rating: numericRating 
      }])
      .select();
      console.log("Received feedback:", { user_id, description, rating });

    if (error) {
      console.error("Supabase insert error:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("Feedback inserted:", data[0]);

    res.status(201).json({
      message: "Feedback submitted successfully!",
      feedback: data[0],
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error while submitting feedback." });
  }
});

module.exports = router;
