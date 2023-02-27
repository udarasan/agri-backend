const mongoose = require('mongoose');

// Define Product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrls: {
        type: [String],
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
});

// Define Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
