// 
let fdiv = document.getElementById('first-div'); 

// let ul = document.querySelectorAll('.first-list li'); 
let firstList = document.querySelector(".first-list"); 
let body = document.body; 

/*******/


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
        console.log(data[0]); 

        // 
        for ( let i = 0 ,j = 1; i < data.length; i++, ++j ){
            // Create the "ul" un-ordered list element and give it a className of "stocks_list" 
            let ul = document.createElement('ul'); 
            ul.className = "stocks_list"; 
            ul.id = data[i]._id; 

            // Create the "div" element, and give it a class name of "img_div" 
            let img_div = document.createElement('div'); 
            img_div.className = "img_div"; 

            // Create the "img" tag element, and append the value inside the "img_div" element 
            let img_file = document.createElement('img'); 
            img_file.className = "img_file"; 
            img_file.src = data[i].source_location; 
            // Appending the img_file into the image div 
            img_div.appendChild(img_file); 

            // Create another "div" element, with class name of "btn_div" 
            let btn_div = document.createElement('div'); 
            btn_div.className = "btn_div"; 
            btn_div.style.float = "right"; 

            /* Creating a button that would be appended into the "btn_div" object */ 
            let buy_btn = document.createElement('input'); 
            buy_btn.className = "buy_btn"; 
            buy_btn.value = "Buy"; 
            buy_btn.type = "button"; 
            buy_btn.id = data[i]._id; 

            /* Creating a button that would be appended along side the buy_button into the "btn_div" */ 
            let rate_btn = document.createElement('input'); 
            rate_btn.className = "rate_btn"; 
            rate_btn.value = "Rate"; 
            rate_btn.type = "button"; 
            rate_btn.id = data[i]._id; 

            // Adding event listener for the "buy" button
            buy_btn.addEventListener('click', () =>
            {
                // 
                console.log(buy_btn.id); 

                // 
                for ( let i = 0 ,j = 1; i < data.length; i++, ++j ) {
                    // 
                    if ( data[i]._id === String(buy_btn.id) ){
                        alert(data[i].stock_name + " selected. "); 
                    }
                }
            })

            //// ---- Appending both buttons into the "btn_div" 
            btn_div.append(buy_btn, rate_btn); 

            // 
            let stock_name = document.createElement('li'); 

            // 
            let stock_price = document.createElement('li'); 

            // 
            let stock_rating = document.createElement('li');

            // Give them values 
            stock_name.innerHTML = `<b> Stock Name:</b> <span class='data'> ${data[i].stock_name} </span>`; 
            stock_price.innerHTML = `<b> Stock Price: </b> <span class='data'> ${data[i].stock_price} </span>`; 
            stock_rating.innerHTML = `<b> Stock Rating: </b> <span class='data'> ${data[i].stock_rating} </span>`; 

            // Append the values to the list element "first-list" 
            ul.append(img_div, btn_div, stock_name, stock_price, stock_rating);

            // 
            // if  ( i >= 3 ) { sdiv.appendChild(ul); console.log(j); continue; }

            // 
            fdiv.appendChild(ul); 

            //  
            

            

        }
        

         



    }); 


}; 

// Running the function 
stocks();


