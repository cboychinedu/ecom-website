// Importing the necessary modules 
const joi = require('joi'); 
const express = require('express'); 
const path = require('path'); 
const { STOCKS } = require('../models/validation.js'); 

// Creating the router object 
const router = express.Router(); 

// Get stocks by the id of the stock 
router.post('/stock_id', async (req, res) =>
{
    // 
    let id_value = req.body._id; 
    let email_value = req.body.email; 

    try {

        // Getting a particular stock by the id number 
        let stocks = await STOCKS.findById({"_id": id_value }); 

        // Execute this block of code if the stocks is not empty, 
        // And send back the stocks 
        return res.send(stocks); 

    }

    // On errors getting the particulart stock with the "id" value 
    catch (error) {
        // Execute this block of code if stocks is empty 
        const errMessage = JSON.stringify({"message": "The stocks with the given id was not found."}); 
        return res.send(errMessage).status(404).end(); 
    }

}); 

// Get stock by the vendor_id that added the stock 
router.post('/vendor_id', async (req, res) =>
{
    // Getting a particular stock by the vendor_id 
    let vendor_id = req.body.vendor_id; 
    let email_value = req.body.email; 

    try {
        // Getting the stocks with the vendor_id value 
        let stocks = await STOCKS.find({"vendor_id": vendor_id}); 

        // Execute this block of code if the stocks are found for the 
        // particular vendor id 
        return res.send(stocks); 

    }

    // On errors not finding any stocks for the particular 'vendor_id' address 
    catch (error)
    {
        // Execute this block of code if the stock is empty 
        const errMessage = JSON.stringify({"message": "The stocks with the given id was not found."}); 
        return res.send(errMessage).status(404).end(); 
    }


}); 

// Add new stock 
router.post('/add_stock', async (req, res) =>
{
    // Getting the values 
    const vendor_id = req.body.vendor_id; 
    const stock_name = req.body.stock_name; 
    const stock_price = req.body.stock_price; 
    const stock_rating = req.body.stock_rating; 

    // Creating a dict to hold the newly created stocks using 
    // POST request 
    try {

        // Checking if the stocks already exists in the database 
        let stocks = await STOCKS.find({"stock_name": stock_name}); 
        // console.log(stocks.length === 0); 

        // If the length for the stocks is zero 
        if (stocks.length === 0)
        {
            // If the value for the stocks with the specified stock name is empty, then 
            // Execute this block of code below
            let stockObj = new STOCKS({
                vendor_id: vendor_id, 
                stock_name: stock_name, 
                stock_price: stock_price, 
                stock_rating: stock_rating
            }); 
    
            // Pushing the created values into the mongodb database 
            stockObj = await stockObj.save(); 
    
            // Sending back the updated values 
            let successMsg = JSON.stringify({"message": "update_success"}); 
            return res.send(stockObj).end(); 

        }

        // If the stock with the specific stock name is found, then 
        // Execute the code block below 
        else 
        {
            // The stock with the particualar name in "stock_name" exists on the database
            let errorMsg = JSON.stringify({"message": "stock_exists"}); 
            return res.send(errorMsg).end(); 
        }

        
    }

    // On error on update, execute this block of code 
    catch (error) {

        // On error connecting to the database 
        let errorMsg = JSON.stringify({"message": "saving_failure"}); 
        return res.send(errorMsg).end(); 
    }

}); 

// Update the value of a stock by the "stock_id" 
router.put('/update_stock', async(req, res) =>
{
    // 
    let id_value = req.body.stock_id; 
    let vendor_id = req.body.vendor_id;
    let stock_name = req.body.stock_name; 
    let stock_price = req.body.stock_price; 
    let stock_rating = req.body.stock_rating;  

    // Look up the stock by it's _id value 
    try {
        // Finding a stock by the specified _id value 
        let stock = await STOCKS.findById({"_id": id_value }); 

        // If the stock value was found, update the stock 
        // Checking if the vendor_id was changed 
        if (vendor_id) { stock.vendor_id = vendor_id; }

        // Checking if the stock_name was changed 
        if (stock_name) { stock.stock_name = stock_name; }

        // Checking if the stock_price was changed 
        if (stock_price) { stock.stock_price = stock_price; }

        // Checking if the stock_rating was changed 
        if (stock_rating) { stock.stock_rating = stock_rating; }

        // Execute this block of code below
        // let stockObj = new STOCKS({
        //     vendor_id: vendor_id, 
        //     stock_name: stock_name, 
        //     stock_price: stock_price, 
        //     stock_rating: stock_rating
        // }); 

        // Pushing the created values into the mongodb database 
        stockObj = await stock.save(); 

        // Send back the updated stock
        res.send(stockObj).status(200).end(); 

    }

    // On error finding the particular stock with the specified _id value 
    catch (error) {
        // Generate an error message 
        const errorMsg = JSON.stringify({"message": "error_updating"}); 
        

        // Send the error message 
        res.send(errorMsg).end(); 

    } 

}); 

// Update the value of a stock by the "_id" value 

// Remove stock by id of the stock 
router.delete('/:id', (req, res) =>
{
    // 
}); 

// Remove stock by the vendor_id that added that stock 
router.delete('/:vendor_id', (req, res) =>
{
    // 
}); 


// Exporting the router 
module.exports = router; 


