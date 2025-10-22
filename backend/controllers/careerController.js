const supabase = require("../config/supabaseClient");

// Normalize strings
const normalize = str => str?.toLowerCase().trim() || "";

// ✅ Get recommendations for a logged-in user
const getCareerRecommendations = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    // Fetch the user's profile
    const { data: userProfile, error: profileError } = await supabase
      .from("profiles")
      .select("name, education_level, skills, subjects")
      .eq("id", userId)
      .single();

    if (profileError || !userProfile)
      return res.status(404).json({ error: "User not found" });

    // Safely parse user's skills and subjects
    let userSkills = [];
    let userSubjects = [];
    try { userSkills = Array.isArray(userProfile.skills) ? userProfile.skills : JSON.parse(userProfile.skills || "[]"); } catch { userSkills = []; }
    try { userSubjects = Array.isArray(userProfile.subjects) ? userProfile.subjects : JSON.parse(userProfile.subjects || "[]"); } catch { userSubjects = []; }

    // Fetch all careers
    const { data: careers, error: careerError } = await supabase
      .from("career")
      .select("name, description, req_qualification, category, skill_id, subject_id");

    if (careerError) throw careerError;

    // Compute recommendation scores
   // Helper to safely parse arrays
const parseArray = value => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const str = value.replace(/^"+|"+$/g, ""); // remove extra quotes
    return JSON.parse(str);
  } catch (err) {
    return [];
  }
};

// Compute recommendation scores
const recommendations = careers.map(career => {
  const skillArray = parseArray(career.skill_id);
  const subjectArray = parseArray(career.subject_id);

  const skillMatch = skillArray.filter(skill =>
    userSkills.some(u => normalize(u) === normalize(skill))
  ).length;

  const subjectMatch = subjectArray.filter(sub =>
    userSubjects.some(u => normalize(u) === normalize(sub))
  ).length;

  const qualificationMatch =
    normalize(userProfile.education_level) === normalize(career.req_qualification)
      ? 1
      : 0;

  const score = skillMatch * 0.4 + subjectMatch * 0.3 + qualificationMatch * 0.3;

  return { ...career, score: +(score * 100).toFixed(2) };
});


    // Take top 5 recommendations with score > 0
    const topRecommendations = recommendations
      .sort((a, b) => b.score - a.score)
      .filter(c => c.score > 0)
      .slice(0, 5);

    if (!topRecommendations.length)
      return res.json({ message: "No matching careers found", user: userProfile.name });

    res.json({ user: userProfile.name, recommendations: topRecommendations });
  } catch (err) {
    console.error("Recommendation Error:", err);
    res.status(500).json({ error: "Error generating recommendations" });
  }
};



// Add a new career (Admin functionality)
const addCareer = async (req, res) => {
  try {
    const {
      name,
      description,
      req_qualification,
      category,
      learning_resources,
      salary_range,
      skills = [],
      subjects = [],
    } = req.body;

    if (!name || !description || !req_qualification)
      return res.status(400).json({ error: "Missing required fields" });

    // Insert names into skill_id and subject_id columns
    const { data: newCareer, error } = await supabase
      .from("career")
      .insert([{
        name,
        description,
        req_qualification,
        category,
        learning_resources,
        salary_range,
        skill_id: skills,      // store names here
        subject_id: subjects,  // store names here
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ message: "Career added", career: newCareer });
  } catch (err) {
    console.error("Error adding career:", err.message);
    res.status(500).json({ error: "Error adding career" });
  }
};



module.exports = { getCareerRecommendations, addCareer };
