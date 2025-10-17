
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORTANT: This needs to be the path to your Supabase client file
const supabase = require('../config/supabaseClient'); 

const jwtSecret = process.env.JWT_SECRET;

// User Registration Logic with Supabase
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

    // 2️⃣ Insert user profile into 'profiles' table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authUser.user.id,  // use Supabase Auth user ID
          name,
          email,
          education_level: educationLevel,
          gpa,
          skills,
          subjects,
        },
      ])
      .select();
    if (profileError) {
      console.error("Profile Insert Error:", profileError.message);
      return res.status(400).json({ error: profileError.message });
    }

    res.status(201).json({ message: 'User registered successfully', user: profile[0] });

  } catch (error) {
    console.error("General Error:", error.message);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// User Login Logic with Supabase
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Fetch profile info from 'profiles' table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error("Profile Fetch Error:", profileError.message);
      return res.status(400).json({ error: profileError.message });
    }

    // Optionally create your own JWT
    const token = jwt.sign({ email, id: authData.user.id }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Logged in successfully', token, user: profileData });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: 'Error logging in' });
  }
};
