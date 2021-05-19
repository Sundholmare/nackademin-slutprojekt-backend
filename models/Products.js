const mongoose = require('mongoose');

/*
Populate hämtar data från en annan refererad collection som finns i samma databas. 
 */

const productSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId, // mongoose koppling för att kunna använda Populate() functionen senare.
    title: {
        type: String, // title ska finnas med och ha minst 3 tecken, max 100.
        required: true,
        min: 3,
        max: 100
    },
    price: {
        type: Number,
        required: true
    },
    shortDesc: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    longDesc: {
        type: String,
        required: true,
        min: 15,
        max: 100
    },
    imgFile: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);