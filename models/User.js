const mongoose = require('mongoose');

/*
Populate hämtar data från en annan refererad collection som finns i samma databas. 
 */

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId, // mongoose koppling för att kunna använda Populate() functionen senare.
    email: {
        type: String,// email ska finnas med och ha minst 6 tecken, max 100.
        required: true,
        min: 6,
        max: 100
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100
    },
    role: {
        type: String,
        required: true,
    },
    adress: {
        street: { type: String, required: true },
        zip: { type: String, required: true },
        city: { type: String, required: true }
    },



    orderHistory: [{ // Ska kopplas med order vilket gör så vi kan använda Populate()
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

module.exports = mongoose.model('User', userSchema);