'use strict';

module.exports = app => {
    const exempleController = require('../controllers/exempleController');

    // todoList Routes
    app.route('/exemple')
        .get(exempleController.list_all_tasks)
        .post(exempleController.create_a_task);


    app.route('/exemple/:taskId')
        .get(exempleController.read_a_task)
        .put(exempleController.update_a_task)
        .delete(exempleController.delete_a_task);
};