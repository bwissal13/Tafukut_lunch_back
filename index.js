// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors'); 

// const app = express();

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/waitlistDB', { useNewUrlParser: true, useUnifiedTopology: true });

// const waitlistSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });

// const Waitlist = mongoose.model('Waitlist', waitlistSchema);

// app.post('/api/waitlist', async (req, res) => {
//   const { name, email } = req.body;
//   const newEntry = new Waitlist({ name, email });
//   await newEntry.save();
//   res.json({ text: `Thank you, ${name}! You have been added to the waitlist with the email: ${email}` });
// });


// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const waitlistSchema = new mongoose.Schema({
  name: String,
  email: String
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

app.post('/api/waitlist', async (req, res) => {
  const { name, email } = req.body;
  const newEntry = new Waitlist({ name, email });
  await newEntry.save();
  res.json({ text: `Thank you, ${name}! You have been added to the waitlist with the email: ${email}` });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
