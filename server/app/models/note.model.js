const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    category: String,
    newTitle: String,
}, {
        timestamps: true
    });

module.exports = mongoose.model('Note', NoteSchema);