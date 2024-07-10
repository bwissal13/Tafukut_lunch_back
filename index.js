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
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: 'https://tafukut-lunch.vercel.app/',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// app.use(bodyParser.json());

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

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

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// const waitlistSchema = new mongoose.Schema({
//   name: String,
//   email: String
// });

// const Waitlist = mongoose.model('Waitlist', waitlistSchema);

// app.options('*', cors()); 
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Server is running' });
// });

// app.post('/api/waitlist', async (req, res) => {
//   const { name, email } = req.body;
//   const newEntry = new Waitlist({ name, email });
//   await newEntry.save();
//   res.json({ text: `Thank you, ${name}! You have been added to the waitlist with the email: ${email}` });
// });

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
console.log("khdouj");
const allowedOrigins = ['https://tafukut-lunch.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    console.log(`Origin: ${origin}`);
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      console.log(msg);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
