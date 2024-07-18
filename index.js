const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: 'https://tafukut-lunch.vercel.app', 
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

const waitlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);



app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.post('/api/waitlist', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newEntry = new Waitlist({ name, email });
    await newEntry.save();
    res.json({ text: `Thank you, ${name}! You have been added to the waitlist with the email: ${email}` });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding to the waitlist' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
