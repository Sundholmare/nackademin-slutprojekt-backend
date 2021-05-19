const mongoose = require('mongoose');

/* Populate hämtar data från en annan refererad collection som finns i samma databas. */

const orderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId, // mongoose koppling för att kunna använda Populate() functionen senare.
    timeStamp: { // Sätter tidsmarkering när ordern skapades
        type: Date,
        default: Date.now
    },
    status: { // Status på ordern om den antingen är påväg, skeppad eller levererad.
        type: Array,
        required: true,
        default: ['inProcess, Shipped, Delivered']
    },
    items: [{ // Ska kopplas med products modellen vilket gör så vi kan använda Populate()
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
    // orderValue: { // teoretisk lösning på orderValue, behöver testas.
    //     $group: {
    //         _id: "$items",
    //         total: {
    //             $sum: "$price"
    //         }
    //     }
    // }
});

module.exports = mongoose.model('Order', orderSchema);