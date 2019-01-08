module.exports = (app) => {
    const categories = require('../controllers/category.controller.js');

    // Create a new Note
    app.post('/api/categories', categories.create);

    // Retrieve all Categories
    app.get('/api/categories', categories.findAll);

    // Update a Note with categoryName
    app.put('/api/categories/update', categories.update);

    // Delete a Note with categoryName
    app.delete('/api/categories/delete', categories.delete);
}