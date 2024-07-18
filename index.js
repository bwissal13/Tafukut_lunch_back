const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Define schema and model
const waitlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

// Middleware
app.use(express.json());

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

// Routes
app.get('/api/test', allowCors((req, res) => {
  res.json({ message: 'Server is running' });
}));

app.post('/api/waitlist', allowCors(async (req, res) => {
  try {
    const { name, email } = req.body;
    const newEntry = new Waitlist({ name, email });
    await newEntry.save();
    res.json({ text: `Thank you, ${name}! You have been added to the waitlist with the email: ${email}` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding to the waitlist' });
  }
}));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
