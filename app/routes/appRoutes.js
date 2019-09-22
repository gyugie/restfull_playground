'user strict';
module.exports = function(app){
    const todoEvent = require('../controller/eventController.js');
    const todoUser  = require('../controller/userController.js');

    //todoEvent Routes
    app.route('/event')
    .get(todoEvent.list_all_event)
    .post(todoEvent.create_a_event);

    app.route('/event/:eventId')
    .get(todoEvent.read_a_event)
    .put(todoEvent.update_a_event)
    .delete(todoEvent.delete_a_event);

    app.route('/api/user')
    .get(todoUser.get_all_user)
    .post(todoUser.create_user);

    app.route('/api/auth')
    .post(todoUser.auth);

};