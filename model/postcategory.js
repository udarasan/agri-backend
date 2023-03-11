const mongoose = require('mongoose');

// Define Post Category schema
const postcategorySchema = new mongoose.Schema({
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
const PostCategory = mongoose.model('PostCategory', postcategorySchema);

module.exports = PostCategory;
