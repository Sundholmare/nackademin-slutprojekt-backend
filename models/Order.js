const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    timeStamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Array,
        required: true,
        default: ['inProcess, Shipped, Delivered']
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
    // orderValue: {
    //     $group: {
    //         _id: "$items",
    //         total: {
    //             $sum: "$price"
    //         }
    //     }
    // }
});

module.exports = mongoose.model('Order', orderSchema);