const supabase = require("../config/supabaseClient");



// Simple text similarity function
const similarity = (a, b) => {
  if (!a || !b) return 0;
  a = a.toLowerCase();
  b = b.toLowerCase();
  return a.includes(b) || b.includes(a) ? 1 : 0;
};
const getSkills = async (req, res) => {
  try {
    const { data, error } = await supabase.from("skill").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Failed to load skills:", err.message);
    res.status(500).json({ error: "Failed to load skills" });
  }
};

const getSubjects = async (req, res) => {
  try {
    const { data, error } = await supabase.from("subject").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Failed to load subjects:", err.message);
    res.status(500).json({ error: "Failed to load subjects" });
  }
};

const getCareerRecommendations = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Not authorized" });

    // 1️⃣ Fetch user skills and subjects
    const { data: userSkills } = await supabase
      .from("user_skills")
      .select("skill_id")
      .eq("user_id", userId);

    const { data: userSubjects } = await supabase
      .from("user_subjects")
      .select("subject_id")
      .eq("user_id", userId);

    const userSkillIds = userSkills.map((s) => s.skill_id);
    const userSubjectIds = userSubjects.map((s) => s.subject_id);

    // 2️⃣ Fetch all careers
    const { data: careers } = await supabase.from("career").select("*");

    // 3️⃣ Compute recommendations
    const recommendations = await Promise.all(
      careers.map(async (career) => {
        // Fetch career skills & subjects
        const { data: careerSkills } = await supabase
          .from("career_skills")
          .select("skill_id")
          .eq("career_id", career.career_id);

        const { data: careerSubjects } = await supabase
          .from("career_subjects")
          .select("subject_id")
          .eq("career_id", career.career_id);

        // Compute matches
        const skillMatch =
          careerSkills.filter((cs) => userSkillIds.includes(cs.skill_id))
            .length || 0;
        const subjectMatch =
          careerSubjects.filter((cs) => userSubjectIds.includes(cs.subject_id))
            .length || 0;
        const qualificationMatch = similarity(
          req.user.qualification,
          career.req_qualification
        );

        // Score (weights: skill 0.4, subject 0.3, qualification 0.3)
        const score =
          skillMatch * 0.4 + subjectMatch * 0.3 + qualificationMatch * 0.3;

        return {
          career_id: career.career_id,
          name: career.name,
          description: career.description || "",
          category: career.category || "",
          salary_range: career.salary_range || 0,
          score: (score * 100).toFixed(2),
          req_qualification: career.req_qualification || "",
        };
      })
    );

    // 4️⃣ Sort and pick top 5
    recommendations.sort((a, b) => b.score - a.score);
    const top5 = recommendations.slice(0, 5);

    res.json({ user: req.user.name, recommendations: top5 });
  } catch (error) {
    console.error("Recommendation Error:", error);
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
      skills = [],    // array of skill_ids
      subjects = [],  // array of subject_ids
    } = req.body;

    if (!name || !description || !req_qualification)
      return res.status(400).json({ error: "Missing required fields" });

    // 1️⃣ Insert new career
    const { data: newCareer, error: insertError } = await supabase
      .from("career")
      .insert([{ name, description, req_qualification, category, learning_resources, salary_range }])
      .select()
      .single();
    if (insertError) throw insertError;

    const career_id = newCareer.career_id;

    // 2️⃣ Insert into career_skills
    if (skills.length > 0) {
      await supabase.from("career_skills").insert(
        skills.map((skill_id) => ({ career_id, skill_id }))
      );
    }

    // 3️⃣ Insert into career_subjects
    if (subjects.length > 0) {
      await supabase.from("career_subjects").insert(
        subjects.map((subject_id) => ({ career_id, subject_id }))
      );
    }

    // 4️⃣ Generate recommendations for all users automatically
    const { data: users } = await supabase.from("users").select("*");
    for (const user of users) {
      // Fetch user skills & subjects
      const { data: userSkills } = await supabase
        .from("user_skills")
        .select("skill_id")
        .eq("user_id", user.user_id);
      const { data: userSubjects } = await supabase
        .from("user_subjects")
        .select("subject_id")
        .eq("user_id", user.user_id);

      const userSkillIds = userSkills.map((s) => s.skill_id);
      const userSubjectIds = userSubjects.map((s) => s.subject_id);

      // Compute match
      const skillMatch = skills.filter((s) => userSkillIds.includes(s)).length;
      const subjectMatch = subjects.filter((s) => userSubjectIds.includes(s)).length;
      const qualificationMatch = similarity(user.qualification, req_qualification);

      const score = skillMatch * 0.4 + subjectMatch * 0.3 + qualificationMatch * 0.3;

      if (score > 0) {
        await supabase.from("recommendation").upsert(
          {
            user_id: user.user_id,
            career_id,
            score: parseInt(score * 100),
            req_qualification: req_qualification,
          },
          { onConflict: ["user_id", "career_id"] }
        );
      }
    }

    res.status(201).json({ message: "Career added and recommendations updated", career: newCareer });
  } catch (error) {
    console.error("Add Career Error:", error.message);
    res.status(500).json({ error: "Error adding career" });
  }
};

module.exports = { getCareerRecommendations, addCareer,getSkills,
  getSubjects };
