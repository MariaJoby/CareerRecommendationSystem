
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORTANT: This needs to be the path to your Supabase client file
const supabase = require('../config/supabaseClient'); 

const jwtSecret = process.env.JWT_SECRET;

// User Registration Logic with Supabase
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data: user, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    // Check if there was an error from Supabase and log it
    if (error) {
      console.error("Supabase Error:", error.message);
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    // This will catch any other unexpected errors
    console.error("General Error:", error.message);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// User Login Logic with Supabase
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Use Supabase's built-in auth to sign in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // After a successful login, Supabase handles the session and JWT
    // You can still generate your own JWT if needed, but Supabase provides one
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
    
    res.status(200).json({ message: 'Logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};