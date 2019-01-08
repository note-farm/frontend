module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/api/notes', notes.create)
    
    // Retrieve all Notes
    app.get('/api/notes', notes.findAll);

    // Update a Note with noteTitle
    app.put('/api/notes/update', notes.update);

    // Delete a Note with noteTitle
    app.delete('/api/notes/delete', notes.delete);
}