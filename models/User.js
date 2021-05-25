const mongoose = require('mongoose');

/*
Populate hämtar data från en annan refererad collection som finns i samma databas. 
 */

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId, // mongoose koppling för att kunna använda Populate() functionen senare.
    email: {
        type: String,// email ska finnas med och ha minst 6 tecken, max 100.
        required: true,
        minLength : 6,
        maxLength : 100,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],

    },
    password: {
        type: String,
        required: true,
        minLength : 6,
        maxLength : 255,
    },
    name: {
        type: String,
        required: true,
        minLength : 2,
        maxLength : 100
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