// .env template :
//
// DB_PORT=<DB-PORT>
// DB_NAME=<DB-NAME>
// DB_HOST=<DB-HOSTNAME>
// DB_USER=<DB-USER>
// DB_PASSWORD=<DB-PASSWORD>
// EMAIL_ADDRESS=<EMAIL-ADDRESS>          
// EMAIL_PASSWORD=<EMAIL-PASSWORD>
// IV=<INITILIZATION-VECTOR>  
// CRYPT_PASSWORD=<CRYPT-PASSWORD>

// You have set a valid value for IV. Like: IV=28408e46 

require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const logger = require('morgan');
var os = require("os");
var hostname = os.hostname();
const app = express();

const port = process.env.PORT || 4500


// Getting data in json format

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Setting up cors

var cors = require('cors');
var corsOption = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// Using Helmet

app.use(helmet())

// Logger

app.use(logger('common'))

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'redoc.html'));
});


//Importing Routes
const verify_otp = require('./routes/verifyOTP')
const sendOTP_to_email = require('./routes/sendOTP_to_email')


//Using imported Routes
app.use('/api/', verify_otp);
app.use('/api/', sendOTP_to_email);




//==================================================================================================================================

app.get('/', function (req, res) {
  console.log('route / is accessed.');
  res.send('Hi');
});

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
