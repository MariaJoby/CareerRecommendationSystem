const supabase = require("../config/supabaseClient");

// Simple text similarity function
const similarity = (a, b) => {
  if (!a || !b) return 0;
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a.includes(b) || b.includes(a) ? 1 : 0;
};

const getCareerRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (userError || !user)
      return res.status(404).json({ error: "User not found" });

    // Fetch all careers
    const { data: careers, error: careerError } = await supabase
      .from("career")
      .select("*");

    if (careerError) throw careerError;

    const recommendations = careers.map((career) => {
      const skillMatch = career.skill_id === user.skill_id ? 1 : 0;
      const subjectMatch = career.subject_id === user.subject_id ? 1 : 0;
      const qualificationMatch = similarity(user.qualification, career.req_qualification);
      const preferenceMatch = similarity(user.preference, career.category);

      // Even if skill/subject don't match, we ensure some score
      const score =
        skillMatch * 0.4 +
        subjectMatch * 0.3 +
        qualificationMatch * 0.2 +
        preferenceMatch * 0.1;

      return {
        career_id: career.career_id,
        name: career.name,
        description: career.description,
        category: career.category,
        salary_range: career.salary_range,
        score: (score * 100).toFixed(2),
      };
    });

    // Sort descending by score
    recommendations.sort((a, b) => b.score - a.score);

    // Get top 3 recommendations
    const top3 = recommendations.slice(0, 3);

    // Optional: Upsert into recommendation table to avoid duplicates
    for (const rec of top3) {
      await supabase
        .from("recommendation")
        .upsert({
          user_id: userId,
          career_id: rec.career_id,
          score: rec.score,
          req_qualification: user.qualification,
        },
        { onConflict: ["user_id", "career_id"] });
    }

    res.json({ user: user.name, recommendations: top3 });
  } catch (error) {
    console.error("Career Logic Error:", error.message);
    res.status(500).json({ error: "Error generating recommendations" });
  }
};


// Add a new career (Admin functionality)
const addCareer = async (req, res) => {
  try {
    const { name, description, req_qualification, category, learning_resources, salary_range, skill_id, subject_id } = req.body;

    if (!name || !description || !req_qualification) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1️⃣ Insert new career
    const { data: newCareerData, error: insertError } = await supabase
      .from("career")
      .insert([{
        name,
        description,
        req_qualification,
        category,
        learning_resources,
        salary_range,
        skill_id,
        subject_id
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    const newCareer = newCareerData;

    // 2️⃣ Fetch all users
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*");

    if (usersError) throw usersError;

    // 3️⃣ Generate recommendations for all users
    for (const user of users) {
      const skillMatch = newCareer.skill_id === user.skill_id ? 1 : 0;
      const subjectMatch = newCareer.subject_id === user.subject_id ? 1 : 0;
      const qualificationMatch = similarity(user.qualification, newCareer.req_qualification);
      const preferenceMatch = similarity(user.preference, newCareer.category);

      const score = skillMatch * 0.4 + subjectMatch * 0.3 + qualificationMatch * 0.2 + preferenceMatch * 0.1;

      // Only insert if score > 0
      if (score > 0) {
        await supabase.from("recommendation").upsert({
          user_id: user.user_id,
          career_id: newCareer.career_id,
          score: parseInt(score * 100),
          req_qualification: user.qualification,
        }, { onConflict: ["user_id", "career_id"] });
      }
    }

    res.status(201).json({ message: "Career added and recommendations updated for all users", career: newCareer });
  } catch (error) {
    console.error("Add Career Error:", error.message);
    res.status(500).json({ error: "Error adding career" });
  }
};

module.exports = { getCareerRecommendations, addCareer };
