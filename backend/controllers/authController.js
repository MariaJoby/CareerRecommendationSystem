const jwt = require("jsonwebtoken");
const supabase = require("../config/supabaseClient");

const jwtSecret = process.env.JWT_SECRET;

// =============================
// USER REGISTRATION
// =============================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, educationLevel, gpa, skills = [], subjects = [] } = req.body;

    // Check if profile already exists
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingProfile) return res.status(400).json({ error: "User already registered" });

    // Create Supabase auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) throw authError;

    const userId = authData.user.id;

    // Insert profile with JSONB skills and subjects
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: userId,
          name,
          email,
          education_level: educationLevel,
          gpa,
          skills,
          subjects,
        },
      ])
      .select()
      .single();

    if (profileError) throw profileError;

    // Generate JWT for your app
    const token = jwt.sign({ userId }, jwtSecret, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      user: profile,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Registration failed", details: error.message });
  }
};

// =============================
// USER LOGIN
// =============================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign in via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError || !authData.user) return res.status(400).json({ error: "Invalid credentials" });

    const userId = authData.user.id;

    // Fetch profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) return res.status(404).json({ error: "Profile not found" });

    // Generate JWT for your app
    const token = jwt.sign({ id: userId, email }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      user: profile,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
};
