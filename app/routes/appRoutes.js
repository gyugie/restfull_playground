'user strict';
module.exports = function(app){
    const todoPost  = require('../controller/postController.js');
    const todoUser  = require('../controller/userController.js');
    const todoProcessing = require('../controller/someProcesscing.js');

    //todoEvent Routes
    app.route('/post')
    .get(todoPost.list_all_post)
    .post(todoPost.create_a_post);

    app.route('/post/:postId')
    .get(todoPost.read_a_post)
    .put(todoPost.update_a_post)
    .delete(todoPost.delete_a_post);

    app.route('/api/user')
    .get(todoUser.get_all_user)
    .post(todoUser.create_user);

    app.route('/api/auth')
    .post(todoUser.auth);

    app.route('/api/process')
    .get(todoProcessing.start);

};