const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    title: String,
    description: String,
    newTitle: String,
}, {
        timestamps: true
    });

module.exports = mongoose.model('Category', CategorySchema);