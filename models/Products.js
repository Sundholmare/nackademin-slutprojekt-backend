const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: {
        type: String,
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