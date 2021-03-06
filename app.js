// Importing teh required module 
require('winston-mongodb'); 
const path = require('path'); 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 
const express = require('express'); 
const morgan = require('morgan'); 
const winston = require('winston'); 

// 
process.on('uncaughtException', (ex) =>
{
    // 
    winston.error(ex.message, ex); 
    process.exit(1); 
});

// 
process.on('unhandledRejection', (ex) =>
{
    // 
    winston.error(ex.message, ex); 
    process.exit(1); 
}); 

// 
process.on('ReferenceError', (ex) =>
{
    // 
    winston.error(ex.message, ex); 
    process.exit(1); 
}); 


// Creating a connection to the mongodb database
// Specifying the database "ecom_website" URI

const mongodbAtlasURI = "mongodb+srv://ecom_website:54321@cluster0.1awiy.mongodb.net/ecom_website?retryWrites=true&w=majority";
// const databaseURI = "mongodb://localhost/ecom_website"; 

// Setting the logging configurations 
// winston.add(winston.transports.Console, { colorize: true, prettyPrint: true }); 
winston.add(winston.transports.File, { filename: 'LogFile.log' }); 
winston.add(winston.transports.MongoDB, { db: mongodbAtlasURI , level: 'error' }); 



// Connecting to the database 
mongodb.connect(mongodbAtlasURI)
    .then(() =>
    {
        // On successful connection 
        console.log('Connected to mongodb'); 
    }) 
    .catch((error) =>
    {
        // On failure in connection 
        console.log('Could not connect to mongodb'); 

        // Logging the error if not connected to mongodb 
        winston.log('error', error);
        console.log(error); 
    }); 

// Building the express application 
const app = express(); 

// Setting some necessary middlewares 
app.use(express.json()); 
app.use(express.static('static')); 
app.use(express.static('./static/javascript')); 
app.use(express.static('./static/templates')); 
app.use(express.static('./static/css')); 
app.use(express.urlencoded({ extended: true })); 
app.use(morgan('tiny')); 

// Setting the views 
app.set('view engine', 'pug'); 
app.set('views', './views'); 

// Using the environment variable for assigning the PORT and HOST value 
const PORT = process.env.PORT || 3000; 
const HOST = process.env.HOST || 'localhost'; 

// Importing the requried routes 
const home = require('./routes/homeRoute.js'); 
const vendors = require('./routes/vendorsRoute.js'); 
const customers = require('./routes/customersRoute.js'); 


// -- Important routes 
// "/"   <<<<  "Home, Register, Login"
// "/api/vendors"  <<< "Vendor-Register, Vendor-Login"
// "/api/customers" <<< "Customer-Register, Customer-Login" 
// "/api/stocks"

// Setting the route config 
app.use('/', home); 
app.use('/api/vendors', vendors); 
app.use('/api/customers', customers);
//   
// 

// Getting the configurations for the 'development' environment 
// console.log('Application Name: ' + config.get('name')); 
// console.log('Mail Server: ' + config.get('mail.host'));  
// console.log('Mail Password: ' + config.get('mail.password')); 
// console.log(`Application Environment: ${app.get('env')}`)

// listening on port 3000 
app.listen(PORT, HOST, () => 
{
    // Displaying the server message connections 
    winston.info(`Listening on port ${HOST + ':' + PORT}`); 
}); 