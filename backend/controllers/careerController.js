import supabase from "../config/supabaseClient.js";

// Simple text similarity function
const similarity = (a, b) => {
  if (!a || !b) return 0;
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a.includes(b) || b.includes(a) ? 1 : 0;
};

// Career recommendation logic
export const getCareerRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Fetch user details
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (userError || !user)
      return res.status(404).json({ error: "User not found" });

    // 2️⃣ Fetch all careers
    const { data: careers, error: careerError } = await supabase
      .from("career")
      .select("*");

    if (careerError) throw careerError;

    // 3️⃣ Compute match score for each career
    const recommendations = [];

    for (const career of careers) {
      const skillMatch = career.skill_id === user.skill_id ? 1 : 0;
      const subjectMatch = career.subject_id === user.subject_id ? 1 : 0;
      const qualificationMatch = similarity(user.qualification, career.req_qualification);
      const preferenceMatch = similarity(user.preference, career.category);

      const score =
        skillMatch * 0.4 +
        subjectMatch * 0.3 +
        qualificationMatch * 0.2 +
        preferenceMatch * 0.1;

      recommendations.push({
        career_id: career.career_id,
        name: career.name,
        description: career.description,
        category: career.category,
        salary_range: career.salary_range,
        score: (score * 100).toFixed(2),
      });
    }

    // 4️⃣ Sort by score
    recommendations.sort((a, b) => b.score - a.score);

    // 5️⃣ Optional: Save top 3 recommendations
    const top3 = recommendations.slice(0, 3);
    for (const rec of top3) {
      await supabase.from("recommendation").insert([
        {
          user_id: userId,
          career_id: rec.career_id,
          score: rec.score,
          req_qualification: user.qualification,
        },
      ]);
    }

    res.json({ user: user.name, recommendations: top3 });
  } catch (error) {
    console.error("Career Logic Error:", error.message);
    res.status(500).json({ error: "Error generating recommendations" });
  }
};
