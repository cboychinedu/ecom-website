// Importing the necessary modules 
const winston = require('winston'); 
const jwt = require('jsonwebtoken'); 
const Joi = require('joi'); 
const bcrypt = require('bcrypt'); 
const express = require('express'); 
const path = require('path'); 
const { rootPath } = require('../base.js'); 
const { validateRegistration, CUSTOMERS, VENDORS } = require('../models/validation.js');

// Creating the router object 
const router = express.Router(); 

// SIGN UP VENDOR 
// Setting the routes for registering vendors 
router.get('/signUpVendors', (req, res) =>
{
    // Sending the home page by getting it's full path 
    let fullPath = path.join(rootPath, 'static', 'templates', 'signupVendors.html'); 

    // Sending the page 
    res.sendFile(fullPath); 
}); 


// Setting the routes for saving vendors data to the server "POST" 
router.post('/signUpVendors', async (req, res) =>
{
    // Execute this block of code if the request is a post request 
    console.log(req.body); 

    // Validate the user on "email", "password" 
    const result = validateRegistration({
        email: req.body.email, 
        password: req.body.password
    }); 

    // If there was validation error 
    if (result.error) 
    {
        // Getting the error message 
        let errMessage = JSON.stringify({message: result.error.details[0].message}); 
        return res.send(errMessage); 
    }

    // If the validation was successful 
    else 
    {
        // Encrypt the password, connect to the database and save the user 
        let salt = await bcrypt.genSalt(5); 
        hashed_password = await bcrypt.hash(req.body.password, salt); 

        // Saving the new vendor user 
        let newVendor = new VENDORS({
            email: req.body.email, 
            password: hashed_password,
            isadmin: "false"
        }); 

        // Checking if the user is already registered on the server 
        try
        {
            // Searching to see if the user is present in the database before registration 
            let errMessage = JSON.stringify({"message": "registered_user"}); 
            let vendorUser = await VENDORS.findOne({ email: req.body.email }); 

            // If the user is registered 
            if (vendorUser) 
            {
                // if the user is registered, execute this block of code 
                return res.send(errMessage).status(400); 
            }

            // Else, if the user is not registered 
            else 
            {
                let result = await newVendor.save(); 
                let succMessage = JSON.stringify({"message": "success"}); 
                res.send(succMessage).status(200); 
            }
            

        }

        // On extended errors, display the errors on the console. 
        catch (error) { console.log(error); winston.log('error', error);}

    }
}); 



// SIGIN IN VENDORS 
// Setting the routes for signing in vendors 
router.get('/signInVendors', (req, res) =>
{
    // Sending the "signInVendors" webpage 
    let fullPath = path.join(rootPath, 'static', 'templates', 'signinVendors.html'); 

    // Sending the page 
    res.sendFile(fullPath); 

}); 

// POST SIGN IN VENDORS 
router.post('/signInVendors', async (req, res) =>
{
    // 
    console.log(req.body); 

    // Validate the user on "email", "password" 
    const result = validateRegistration({
        email: req.body.email, 
        password: req.body.password
    }); 

    // If there was validation error 
    if (result.error) 
    {
        // Getting the error message 
        let errMessage = JSON.stringify({message: result.error.details[0].message}); 
        return res.send(errMessage); 
    }

    // On sucessful validation 
    else 
    {
        // 
        let newVendor = await VENDORS.findOne({ email: req.body.email }); 

        // If the email is not found 
        let errMessage = JSON.stringify({"message": "Invalid email or password."}); 
        if (!newVendor) 
        { 
            // 
            return res.send(errMessage); 
        
        } 

        // If the email is found 
        else 
        {
            // Verifying and validating the password using bcrypt 
            let user_password = req.body.password; 
            let hashed_password = newVendor.password; 

            // Comparing the password to see if it is a valid password 
            let validPasswordCondition = await bcrypt.compare(user_password, hashed_password); 

            // Setting the token_password
            const token_password = "54346512#9+!!321"; 

            // Sending back a response if the password is validated 
            if ( validPasswordCondition )
            {
                // If the password hash file is validated 
                // Creating the token file for the logged in user 
                let token_value = { "_id": newVendor._id, "isadmin": newVendor.isadmin }; 

                // Encoding the token data 
                const token = jwt.sign(token_value, token_password); 

                // Sending the header with the generated token data 
                res.header({'x-auth-token': token, 'X-Powered-By': 'Express',
                    'Keep-Alive': 'timeout=20', 'Content-Type': 'application/json; charset=utf-8'}); 
                
                let successMsg = JSON.stringify({"message": "success"}); 
                res.send(successMsg).status(200); 
                res.end();

            }

            // 
            else 
            {
                // If the password is not validated 
                let errMessage = JSON.stringify({"message": "Invalid email or password."}); 
                return res.send(errMessage); 
            }
        }


    }
}); 


// Exporting the router 
module.exports = router; 
