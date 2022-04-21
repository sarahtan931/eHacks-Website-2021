// This file sets up the server, the connection to the MongoDB database, and acts as the first point
// of contact for any requests made to this REST API

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
require('./strategy/passport')(passport);
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, '../.env')}); 

// Connection string to MongoDB database
const uri = process.env.CONNECTION_STRING;

// Connects to MongoDB database and prints confirmation
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('directory name is', __dirname);
  console.log('Connected on', port);
});

// Uses separate file to handle all endoints beginning with 'emails'
const emailslRoute = require('./routes/emails');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const dashboardRoute = require('./routes/dashboard');

// Uses separate file to handle all endoints beginning with 'application'
const applicationsRoute = require('./routes/applications');

app.use(cors());

app.use(bodyParser.json());

app.use(passport.initialize());

// Allow dotfiles - this is required for verification by Lets Encrypt's certbota
app.use(express.static(path.join(__dirname, '../build'), {dotfiles: 'allow'}));

// Any endpoints beginning with 'emails' will be directed to emailsRoute
app.use('/emails', emailslRoute);

// Any endpoints beginning with 'register' will be directed to registerRoute
app.use('/register', registerRoute);

// Any endpoints beginning with 'login' will be directed to loginRoute
app.use('/login', loginRoute);
app.use('/applications', applicationsRoute);

// Any endpoint beginning with 'dashboard' will be directed to dashboardRoute 
app.use('/dashboard', dashboardRoute);

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/apply', (req, res) => {
  res.redirect('https://forms.gle/KYcCuzRMBRLvzF7f8');
});

app.get('/learn', (req, res) => {
  res.redirect('https://drive.google.com/file/d/1Nxc4aB-LhYSvnd798N_EY2VfJRgB23he/view?usp=sharing');
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.use(express.static('assets'));

// Listens to port 4000
app.listen(port);
