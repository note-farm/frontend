const Note = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    } if (!req.body.category) {
        return res.status(400).send({
            message: "Note category can not be empty"
        })
    }

    // Create a Note
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content,
        category: req.body.category
    });

    // Save Note in the database
    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Note title can not be empty"
        })
    } if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    } if (!req.body.category) {
        return res.status(400).send({
            message: "Note category can not be empty"
        })
    } if (!req.body.newTitle) {
        return res.status(400).send({
            message: "The new title for the conte can not be empty"
        })
    }

    // Find note and update it with the request body
    Note.findOneAndUpdate(req.body.title, {
        title: req.body.newTitle || "Untitled Note",
        content: req.body.content,
        category: req.body.category
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with title " + req.body.title
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with title " + req.body.title
                });
            }
            return res.status(500).send({
                message: "Error updating note with title " + req.body.title
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findOneAndDelete(req.body.title)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with title " + req.body.title
                });
            }
            res.send({ message: "Note deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Note not found with id " + req.body.title
                });
            }
            return res.status(500).send({
                message: "Could not delete note with id " + req.body.title
            });
        });
};

// Find all notes under a specific category
exports.findNotes = (req, res) => {
    Note.findById(req.params.category)
        .then(notes => {
            console.log(notes);
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something broke"
            });
        });
};

module.exports = exports;