module.exports = (app) => {
    const categories = require('../controllers/category.controller.js');

    // Create a new Note
    app.post('/api/categories/create', categories.create);

    // Retrieve all Categories
    app.get('/api/categories', categories.findAll);

    // Update a Note with categoryId
    app.put('/api/categories/update/:categoryId', categories.update);

    // Delete a Note with categoryId
    app.delete('/api/categories/delete/:categoryId', categories.delete);
}