const mongoose = require('mongoose');

// Define Cart schema
const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItems: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

// Define Cart model
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
