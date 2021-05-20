const orderModel = require('../models/Order')


// Funktioner med logiken

/* GET - Returnerar en lista på samtliga ordrar för admins,
och ägda orders för inloggad användare */

// Hämta alla ordrar från db för admins
// Hämta alla ordrar för en speciell användare med hjälp av id

const getOrders = async function(req, res) {
    // Hämta alla befintliga ordrar och retunera dem
    const orders = await orderModel.find({})
    res.json(orders)
}

/* POST - Skapar en ny order, se order-modell. */
// Skapa en ny order med hjälp av mallen nedan

/*{
    _id: 123,
    timeStamp: Date.now(),
    status: 'inProcess',
    items: [ <productId1>, <productId2>, ... ],
    orderValue: 999
} */

const postOrders = function(req, res) {

}

module.exports = {getOrders, postOrders} 

