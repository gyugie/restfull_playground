'user strict';
module.exports = function(app){
    var todoList = require('../controller/eventController.js');

    //todoList Routes
    app.route('/event')
    .get(todoList.list_all_event)
    .post(todoList.create_a_event);

    app.route('/event/:eventId')
    .get(todoList.read_a_event)
    .put(todoList.update_a_event)
    .delete(todoList.delete_a_event);
};