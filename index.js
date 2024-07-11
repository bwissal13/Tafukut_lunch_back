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
console.log("Server initialization started");
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

const axios = require('axios');

const handleSubmit = async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;

  try {
    const response = await axios.post('https://tafukut-lunch-back.vercel.app/api/waitlist', { name, email });
    setMessage(response.data.text);
  } catch (error) {
    setMessage('There was an error submitting your request. Please try again.');
  }
};



useEffect(() => {
  const checkBackend = async () => {
    try {
      const response = await axios.get('https://tafukut-lunch-back.vercel.app/api/test');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  checkBackend();
}, []);

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

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
  try {
    const { name, email } = req.body;
    console.log('Received waitlist request:', req.body);
    const newEntry = new Waitlist({ name, email });
    await newEntry.save();
    res.json({ text: `Thank you, ${name}! You have been added to the waitlist with the email: ${email}` });
  } catch (error) {
    console.error('Error in POST /api/waitlist:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/waitlist', (req, res) => {
  res.json({ message: 'This is a test response' });
});


app.get('/api/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
