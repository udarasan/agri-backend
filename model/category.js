const mongoose = require('mongoose');

// Define Category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Define Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
