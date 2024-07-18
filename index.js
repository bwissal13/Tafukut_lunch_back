const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI);

const waitlistSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); 
  if (req.method === 'OPTIONS') {
    return res.status(204).end(); 
  }
  next();
});
app.options('*', cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.post('/api/waitlist', async (req, res) => {
  const { name, email } = req.body;
  const newEntry = new Waitlist({ name, email });
  await newEntry.save();
  res.json({ text: `Thank you, ${name}! You have been added to the waitlist with the email: ${email}` });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
