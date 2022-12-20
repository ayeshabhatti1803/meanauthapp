const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // make request from front end
const passport = require('passport'); //allow to create login startegy
const mongoose = require('mongoose');  //object document mapper work with mongoDb 
const config = require('./config/database');
var session = require('express-session');



//connect to database
mongoose.connect(config.database);
mongoose.set('strictQuery', false);

// on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database' +config.database);
});

// on error
mongoose.connection.on('error', (err) => {
    console.log('database error' +err);
});


var app = express();

const users = require('./routes/users');

//port number
const port = 3100;

//cors middleware
app.use(cors());

//set sttic folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());




//passport middleware
app.use(session({secret: config.secret}));
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);



app.use('/users', users); //pass user variable 

//index route
app.get('/', (req, res) => {
    res.send('invalid Endpoint'); 
});



//start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
  
