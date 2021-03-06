// Importing the necessary module 
const express = require('express'); 
const path = require('path'); 
const { rootPath } = require('../base.js'); 
const router = express.Router(); 

// Setting the routes for the home page and also creating the first route 
router.get('/', (req, res) =>
{
    // Sending the home page by getting the full path to the html template file 
    let fullPath = path.join(rootPath, 'static', 'templates', 'home.html'); 
    
    // Sending the 'home.html' page 
    res.sendFile(fullPath); 

}); 

router.get('/signin', (req, res) =>
{
    // Sending the signin page 
    let fullPath = path.join(rootPath, 'static', 'templates', 'signIn.html'); 

    // Sending the 'sigin.html' page 
    res.sendFile(fullPath); 
}); 

router.get('/signup', (req, res) => 
{
    // Sending the "signup" page 
    let fullPath = path.join(rootPath, 'static', 'templates', 'signUp.html'); 

    // Sending the 'signup.html' page 
    res.sendFile(fullPath); 

}); 

// Exporting the home page router 
module.exports = router; 
