const mongoose = require('mongoose');

/*
Populate hämtar data från en annan refererad collection som finns i samma databas. 
 */

const productSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId, // mongoose koppling för att kunna använda Populate() functionen senare.
    title: {
        type: String, // title ska finnas med och ha minst 3 tecken, max 100.
        required: true,
        minLength : 3,
        maxLength : 100
    },
    price: {
        type: Number,
        required: true
    },
    shortDesc: {
        type: String,
        required: true,
        minLength : 3,
        maxLength : 15
    },
    longDesc: {
        type: String,
        required: true,
        minLength : 15,
        maxLength : 100
    },
    imgFile: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);