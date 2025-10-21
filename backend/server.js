
require('dotenv').config();
const cors = require('cors');


const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// Debug middleware to log every request
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url, req.body);
  next();
});


const authRoutes = require('./routes/authRoutes');
const careerRoutes = require('./routes/careerRoutes');
const feedbackRoutes = require("./routes/feedback");
app.use("/api/feedback", feedbackRoutes);

app.use('/api/auth', authRoutes);  // ✅ Correct mounting
app.use('/api/careers', careerRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

app.use((err, req, res, next) => {
  console.error("Unexpected server error:", err);
  res.status(500).json({ error: "Unexpected server error." });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// catch all errors

