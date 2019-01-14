const Category = require('../models/category.model.js');

// Create and Save a new category
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        return res.status(400).send({
            message: "category description can not be empty"
        });
    }

    // Create a category
    const category = new Category({
        title: req.body.title || "Untitled category",
        description: req.body.description
    });

    // Save category in the database
    category.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err)
        });
};

// Retrieve and return all categories from the database.
exports.findAll = (req, res) => {
    Category.find()
        .then(categories => {
            res.send(categories);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "category not found with id " + req.params.categoryId
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Error retrieving category with id " + req.params.categoryId
            });
        });
};

// Update a category identified by the categoryName in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Category title can not be empty"
        })
    } if (!req.body.description) {
        return res.status(400).send({
            message: "Category description can not be empty"
        });
    } if (!req.body.newTitle) {
        return res.status(400).send({
            message: "The new title for the category can not be empty"
        });
    }

    // Find category and update it with the request body
    Category.findOneAndUpdate(req.body.title, {
        title: req.body.newTitle || req.body.title,
        description: req.body.description
    }, { new: true })
        .then(category => {
            if (!category) {
                console.error('category not found')
                return res.status(404).send({
                    message: "category not found with title " + req.body.title
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                console.error(err)
                return res.status(404).send({
                    message: "category not found with title " + req.body.title
                });
            }
            return res.status(500).send({
                message: "Error updating category with title " + req.body.title
            });
        });
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
    Category.findOneAndDelete(req.body.title)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "category not found with id " + req.body.title
                });
            }
            res.send({ message: "category deleted successfully!" });
        }).catch(err => {
            console.log(err)
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "category not found with id " + req.body.title
                });
            }
            return res.status(500).send({
                message: "Could not delete category with id " + req.body.title
            });
        });
};

module.exports = exports;