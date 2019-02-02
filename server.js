const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const morgan = require("morgan");

// create express app
const app = express();

// set up morgan
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

// configuring the database
const dbConfig = require('./server/config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

// import notes api
require('./server/app/routes/note.routes.js')(app);

// import category api
require('./server/app/routes/category.routes.js')(app);

// set the view engine to ejs
app.set('view engine', 'ejs');

// home page 
app.get('/', function (req, res) {
    res.render('pages/home', { title: 'Home - Note Farm' });
});

// notes page 
app.get('/notes', function (req, res) {
    res.render('pages/notes', { title: 'Notes - Note Farm' });
});

// categories page 
app.get('/categories', function (req, res) {
    res.render('pages/categories', { title: 'Categories - Note Farm' });
});

// search page 
app.get('/search', function (req, res) {
    res.render('pages/search', { title: 'Search - Note Farm' });
});

// import public folder
app.use(express.static('public'))

// listen for requests
app.listen(2609, () => {
    console.log("The NoteFarm App is running on Port 2609");
});