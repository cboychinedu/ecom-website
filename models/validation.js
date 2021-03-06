// Importing the requireds modules 
const { ObjectId } = require('mongodb'); 
const mongodb = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
const Joi = require('joi'); 

// Creating a schema for the "customers" registration data 
const customersSchema = new mongodb.Schema({
    email: { type: String, required: true, minlength: 3, maxlength: 50 }, 
    password: { type: String, required: true, minlength: 3, maxlength: 1024 }, 
    isadmin: { type: String }, 
    date: {type: Date, default: Date.now }, 
    versionKey: false 
}); 

// Creating a schema for the "vendors" registration data 
const vendorsSchema = new mongodb.Schema({
    email: { type: String, required: true, minlength: 3, maxlength: 50 }, 
    password: { type: String, required: true, minlength: 3, maxlength: 1024 }, 
    isadmin: { type: String }, 
    date: { type: Date, default: Date.now }, 
    versionKey: false
}); 

// Creating a schema for the "stocks" data 
const stocksSchema = new mongodb.Schema({
    vendor_id: { type: String, }, 
    date: { type: Date, default: Date.now }, 
    stock_name: { type: String, }, 
    stock_price: { type: Number, }, 
    stock_rating: { type: Number, }, 
    versionKey: false 
}); 

// Connecting to the "customers" collection 
const CUSTOMERS = mongodb.model('customers', customersSchema); 

// Connecting to the "vendors" collection 
const VENDORS = mongodb.model('vendors', vendorsSchema); 

// Connecting to the "stocks" collection 
const STOCKS = mongodb.model('stocks', stocksSchema); 


// Creating a function for validating registration 
function validateRegistration(registration) 
{
    // Creating a schema using joi to validate the firstname, lastname, email 
    // And password 
    const schema = {
        email: Joi.string().min(3).max(50).email().required(), 
        password: Joi.string().min(3).max(1024).required()
    }; 

    // Getting the validation results 
    return Joi.validate(registration, schema); 
}; 

// Exporting the modules 
module.exports.validateRegistration = validateRegistration; 
module.exports.CUSTOMERS = CUSTOMERS; 
module.exports.VENDORS = VENDORS; 
module.exports.STOCKS = STOCKS; 