const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: {
        type: String,
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
        street: String,
        zip: String,
        city: String,
        required: true,
    },
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
});

module.exports = mongoose.model('User', userSchema);