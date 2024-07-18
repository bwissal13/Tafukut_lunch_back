
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
// Middleware to parse JSON
app.use(express.json());

// CORS Middleware
app.use(function (req, res, next) {
  // Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});
// const app = express();

// const allowedOrigins = ['https://tafukut-lunch.vercel.app'];

// app.use(cors({
//   origin: function (origin, callback) {
//     console.log(`Origin: ${origin}`);
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'khdouj';
//       console.log(msg);
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204
// }));
// app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

const waitlistSchema = new mongoose.Schema({
  name: String,
  email: String
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
