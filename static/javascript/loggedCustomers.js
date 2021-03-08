// 
let fdiv = document.getElementById('first-div'); 
// let ul = document.querySelectorAll('.first-list li'); 
let firstList = document.querySelector(".first-list"); 
let body = document.body; 

// Creating the second list 

// Getting all the stocks 
let stocks = () => {
    // Using ajax to send data to the API endpoint 
    $.ajax({
        // Setting the ajax connection configurations 
        type: 'GET', 
        url: '/api/stocks/', 
        dataType: 'json', 
        contentType: 'application/json', 
        crossDomain: true, 

    })
    // On successful connection 
    .done((data, textStatus, request) =>
    {
        // Get back the data and display it on the console 
        console.log(data.length); 

        // 
        for ( let i = 0; i < data.length; i++ ){
            // Create a list element 
            console.log(i); 
            let ul = document.createElement('ul'); 
            ul.className = "stocks_list"; 

            let stock_name = document.createElement('li'); 
            let stock_price = document.createElement('li'); 
            let stock_rating = document.createElement('li');

            // Give them values 
            stock_name.innerHTML = `<b> Stock Name:</b> ${data[i].stock_name}`; 
            stock_price.innerHTML = `<b> Stock Price: </b> ${data[i].stock_price}`; 
            stock_rating.innerHTML = `<b> Stock Rating: </b> ${data[i].stock_rating}`; 

            // Append the values to the list element "first-list" 
            ul.append(stock_name, stock_price, stock_rating);

            // 
            fdiv.appendChild(ul); 

            console.log(ul); 

        }
        

         



    }); 


}; 

// Running the function 
stocks();


