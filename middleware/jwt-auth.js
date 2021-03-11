// Importing the necessary modules 
const jwt = require('jsonwebtoken'); 

// Creating a middleware function 
let protectedRoute = (req, res, next) => 
{
    // Get the token data from the request header 
    const token = req.header('x-auth-token'); 

    // Get the token password from the ENV variable 
    // let token_password = process.env.token_pass; 
    // Setting the token_password 
    const token_password = "54346512#9+!!321"; 

    // If the token data was not found, return the error message 
    if (!token) 
    {
        // Creating an error message if the token was not found 
        let errorMsg = JSON.stringify({"message": "access_denied"}); 

        // Execute this block of code if the token data was not found 
        return res.send(errorMsg); 
    }

    // Else if the token data was found, then execute the block of code below 
    else {
        // 
        try {
            // Decode the token payload 
            const decoded_payload = jwt.decode(token, token_password); 
            req.user = decoded_payload; 

            // Allowing the user to access the route and move on to the next 
            // execution on the protected route. 
            next(); 

        }

        // On error in connction 
        catch (error) 
        {
            // Display the error message, and send a status error code of "400" 
            let errorMsg = JSON.stringify({"message": error.message }); 
            res.send(errorMsg).status(400).end(); 

        }

    }
    
    
}

// Exporting the auth module 
module.exports.protectedRoute = protectedRoute; 