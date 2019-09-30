'user strict';
module.exports = function(app){
    const todoPost          = require('../controller/postController.js');
    const todoUser          = require('../controller/userController.js');
    const todoProcessing    = require('../controller/someProcesscing.js');
    const helper            = require('../helper/authHelper');

    //todoEvent Routes
    app.route('/api/post')
    .get([helper.verifyToken], todoPost.list_all_post)
    .post([helper.verifyToken], todoPost.create_a_post);

    app.route('/api/post/:postId')
    .get([helper.verifyToken], todoPost.read_a_post)
    .put([helper.verifyToken], todoPost.update_a_post)
    .delete([helper.verifyToken], todoPost.delete_a_post);

    app.route('/api/user')
    .get([helper.verifyToken], todoUser.get_all_user)
    .post([helper.verifyToken], todoUser.create_user);

    app.route('/api/auth')
    .post(todoUser.auth);

    app.route('/api/process')
    .get(todoProcessing.start);
    

};

