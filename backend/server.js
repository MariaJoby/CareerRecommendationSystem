
require('dotenv').config();
const cors = require('cors');


const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);  // ✅ Correct mounting

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
