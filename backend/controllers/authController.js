const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');

const jwtSecret = process.env.JWT_SECRET;

// =============================
// USER REGISTRATION
// =============================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, educationLevel, gpa, skills, subjects } = req.body;

    // 1️⃣ Sign up user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("Supabase Error:", authError.message);
      return res.status(400).json({ error: authError.message });
    }


    // 2️⃣ Check if profile already exists
    const { data: existingProfile, error: existingError } = await supabase
  .from("profiles")
  .select("id")
  .eq("id", authUser.user.id)
  .maybeSingle();

if (existingError) {
  console.error("Existing profile check error:", existingError.message);
  return res.status(400).json({ error: existingError.message });
}

    // 3️⃣ Insert profile only if it doesn’t exist
    if (!existingProfile) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: authUser.user.id,
            name,
            email,
            education_level: educationLevel,
            gpa,
            skills,
            subjects,
          },
        ]);

      if (profileError) {
        console.error("Profile Insert Error:", profileError.message);
        return res.status(400).json({ error: profileError.message });
      }

    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("General Error:", error.message);
    res.status(500).json({ error: "Error registering user" });
  }
};

// =============================
// USER LOGIN
// =============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (authError || !authData.user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const user = authData.user || authData.session?.user;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Profile Fetch Error:", profileError.message);
      return res.status(400).json({ error: "Profile not found" });
    }

    const token = jwt.sign({ email: user.email, id: user.id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: profileData,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Error logging in" });
  }
};
