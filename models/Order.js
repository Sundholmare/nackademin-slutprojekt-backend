const mongoose = require('mongoose');

/* Populate hämtar data från en annan refererad collection som finns i samma databas. */

const orderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId, // mongoose koppling för att kunna använda Populate() functionen senare.
    userId: { // Skapar ett userId för att kunna ta fram specifika ordrar för den inloggade användaren.
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timeStamp: { // Sätter tidsmarkering när ordern skapades
        type: Date,
        default: Date.now
    },
    status: { // Status på ordern om den antingen är påväg, skeppad eller levererad.
        type: String,
        required: true,
        default: 'inProcess'
    },
    items: [{ // Ska kopplas med products modellen vilket gör så vi kan använda Populate()
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('Order', orderSchema);