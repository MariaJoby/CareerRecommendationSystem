
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});