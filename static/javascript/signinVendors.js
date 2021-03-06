// 
console.log("This script was written by Mbonu Chinedum"); 

// Getting some necessary javascript DOM objects 
let email_form = document.getElementById('email'); 
let password_form = document.getElementById('password'); 
let iagreeBox = document.getElementById('i_agree'); 
let iacceptBox = document.getElementById('i_accept'); 
let signUpBtn = document.getElementById('sign_up_btn'); 

// Checking if the form data is valid 
function checkData()
{
    // Getting all the form data 
    let email = email_form.value; 
    let password = password_form.value; 

    // Checking for the condition for the checkboxes 
    let firstCond = iagreeBox.checked; 
    let secondCond = iacceptBox.checked; 

    // Checking if the email value does not exists 
    if ( !email || email.length <= 4 )
    {
        // Perform the following if the email is not found
        document.getElementById("email_label").innerHTML = "Email is required (minlength: 5)"; 
        document.getElementById("email_label").style.color = "rgb(229, 74, 74)"; 
        return;
    }

    // Checking if the password value does not exists 
    else if ( !password || password.length <= 4 )
    {
        // Perform the following if the password is not found 
        document.getElementById("password_label").innerHTML = "Password is required (minlength: 5)"; 
        document.getElementById("password_label").style.color = "rgb(229, 74, 74)"; 
        return; 
    }

    // Checking the checkboxes condition 
    else if ( (!firstCond && !secondCond) || (!firstCond) || (!secondCond) )
    {
        // 
        if (!firstCond) { alert('Agree to the terms and conditions.'); }
        else if (!secondCond) { alert('Agree to the use of data and services.'); }
    }

    // 
    else 
    {
        // If the whole data is complete, send the data as a JSON object 
        if ( email && password ) 
        {
            // First, convert the data into a JSON object 
            let userData = JSON.stringify({email: email, password: password}); 

            // Using ajax to send the data 
            $.ajax({
                // Setting the ajax connection configuration 
                type: 'POST', 
                url: '/api/vendors/signInVendors', 
                dataType: 'json', 
                contentType: 'application/json', 
                data: userData, 
                crossDomain: true, 
            })
            // On successful connection 
            .done((data, textStatus, request) =>
            {
                // Successful connection 
                alert(data.message); 
                alert("TextStatus: " + textStatus); 
                console.log(request.getResponseHeader('x-auth-token')); 
                // Save the token data as a "sessionStorage" 
                console.log(request); 
            })
        }

        // Else the value in "email" and "password" is not complete 
        // Stop the program from sending data to the server. 
        else { return; }
    }

}

// Adding event listener for the email 
document.getElementById("email").addEventListener('keypress', (event) =>
{
    // 
    document.getElementById("email_label").innerHTML = "<b> Email </b>";
    document.getElementById("email_label").style.color = "black";  
}); 

// Adding event listener for the password 
document.getElementById("password").addEventListener('keypress', (event) =>
{
    // 
    document.getElementById("password_label").innerHTML = "<b> Password </b>"; 
    document.getElementById("password_label").style.color = "black"; 
}); 

// Adding event listener for the sign up button 
signUpBtn.addEventListener('click', (event) =>
{
    // Running the function "checkData()" 
    checkData(); 
}); 