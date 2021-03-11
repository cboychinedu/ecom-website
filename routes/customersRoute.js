// Importing the necessary modules 
const winston = require('winston'); 
const jwt = require('jsonwebtoken'); 
const Joi = require('joi'); 
const bcrypt = require('bcrypt'); 
const express = require('express'); 
const path = require('path'); 
const { protectedRoute } = require('../middleware/jwt-auth.js'); 
const { rootPath } = require('../base.js'); 
const { validateRegistration, CUSTOMERS, VENDORS } = require('../models/validation.js');

// Creating the router object 
const router = express.Router(); 

// SIGN UP CUSTOMERS 
// Setting the routes for registering the customers 
router.get('/signUpCustomers', (req, res) =>
{
    // Sending the home page by getting it's full path 
    let fullPath = path.join(rootPath, 'static', 'templates', 'signupCustomers.html'); 

    // Sending the page 
    res.sendFile(fullPath); 
}); 


// Setting the routes for saving customers data to the server using "POST" 
router.post('/signUpCustomers', async (req, res) =>
{
    // Execute this block of code if the request is a post request 
    // console.log(req.body); 

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

        // Saving the new customer user 
        let newCustomer = new CUSTOMERS({
            email: req.body.email, 
            password: hashed_password, 
            isadmin: "false"
        }); 

        // Checking if the customer is already registered on the server 
        try 
        {
            // Searching to see if the user is present in the "customers" collection 
            let errMessage = JSON.stringify({ "message": "registered_user" }); 
            let customerUser = await CUSTOMERS.findOne({ email: req.body.email }); 

            // If the customer is registered 
            if (customerUser) 
            {
                // If the user is registered on the server, execute the following code 
                return res.send(errMessage).status(400); 
            }

            // Else, if the user is not registered 
            else 
            {
                // 
                let result = await newCustomer.save(); 
                let succMessage = JSON.stringify({ "message": "success" }); 
                res.send(succMessage).status(200); 
            }
        }

        // On extended errors, display the errors on the console. 
        catch (error) { console.log(error); winston.log('error', error);}
    }
}); 


// SIGNIN IN CUSTOMERS 
// Setting the routes for signing in the customers 
router.get('/signInCustomers', (req, res) =>
{
    // Sending the "signinCustomers.html" webpage 
    let fullPath = path.join(rootPath, 'static', 'templates', 'signinCustomers.html'); 

    // Sending the page 
    res.sendFile(fullPath); 

}); 

// POST SIGN IN CUSTOMERS 
// 
router.post('/signInCustomers', async (req, res) =>
{
    
    // Validate the customer on "email" and "password"  
    const result = validateRegistration({
        email: req.body.email, 
        password: req.body.password

    }); 

    // If there was a validation error 
    if (result.error) 
    {
        // Getting the error message 
        let errMessage = JSON.stringify({"message": result.error.details[0].message}); 
        return res.send(errMessage); 

    }

    // On successful validation 
    else 
    {
        // Checking the mongodb database to see if the user with the specific email address exists 
        let newCustomer = await CUSTOMERS.findOne({ email: req.body.email }); 

        // If the email specified is not found, execute this block of code 
        let errMessage = JSON.stringify({ "message": "Invalid email or password."}); 
        if (!newCustomer)
        {
            // Return the error message 
            return res.send(errMessage); 
        }

        // If the email address is found 
        else 
        {
            // Execute this block of code is the specified email address is found on the 
            // Mongodb database 
            let user_password = req.body.password; 
            let hashed_password = newCustomer.password; 

            // Comparing the password to see if it is a valid password 
            let validPasswordCondition = await bcrypt.compare(user_password, hashed_password);  

            // Setting the token_password 
            const token_password = "54346512#9+!!321"; 

            // Sending back a response if the password is validated 
            if (validPasswordCondition)
            {
                // If the password hash file is validated, 
                // Create the token file for the logged in customer 
                let token_value = { "_id": newCustomer._id, "isadmin": newCustomer.isadmin }; 

                // Encoding the token data 
                const token = jwt.sign(token_value, token_password); 

                // Sending the header with the generated token data 
                res.header({ 'x-auth-token': token, 'X-Powered-By': 'Express', 'Keep-Alive': 'timeout=20', 
                                                        'Content-Type': 'application/json; charset=utf8'}); 

                // Sending the response for a successful connection 
                let successMsg = JSON.stringify({"message": "success"}); 
                res.send(successMsg).status(200); 
                res.end(); 

            }

            // IF the password is not validated 
            else 
            {
                // If the password is not validated 
                let errorMsg = JSON.stringify({"message": "Invalid email or password."});
                return res.send(errorMsg); 
            }
        }
    }

}); 

// REMEMBER, THIS ROUTE MUST BE PROTECTED USING THE AUTH -- MIDDLEWARE!!! 
router.get('/loggedCustomers', protectedRoute, async (req, res) => 
{
    // 
    // Sending the "signinCustomers.html" webpage 
    let fullPath = path.join(rootPath, 'static', 'templates', 'loggedCustomers.html'); 

    // Sending the page 
    res.sendFile(fullPath); 

}); 



// Exporting the router 
module.exports = router; 