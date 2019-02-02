module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/api/notes/create', notes.create)
    
    // Retrieve all Notes
    app.get('/api/notes', notes.findAll);

    // Update a Note with noteId
    app.put('/api/notes/update/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/api/notes/delete/:noteId', notes.delete);

    // Find all notes under a cateogry
    app.get('/api/notes/search/:categoryId', notes.findNotes);
}