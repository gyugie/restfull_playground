'use strict';

var Post    = require('../model/postModel.js');
var response = require('../helper/response.js');

exports.create_a_post = function(req, res){
    var new_post       = new post(req.body);
    var manipulation    = {
        "post_title": new_post.post_title,
        "post_slug": new_post.post_slug.replace(" ","-"),
        "post_description": new_post.post_description,
        "is_favorite": new_post.is_favorite,
        "created_date": new_post.created_date
    };

    //handle null error
    if(!new_post.post_title || !new_post.post_slug || !new_post.post_description){
        res.status(400).send({error:true, message: 'Please provide title / slug / description'});

    } else {
        Post.createPost(manipulation, function(err, post){
            if (err)
                res.send(err);
                res.json({"response":post});
            });
    }
};

exports.list_all_post = function(req, res){
    let bodyRequest        = {
        'page'          : req.body.page,
        'start_date'    : req.body.start_date,
        'end_date'      : req.body.end_date,
    };

    Post.getAllPost(bodyRequest, function(err, results){
        if(err)
            res.send(err);
            response.ok('success', results, res);
    });
};

exports.read_a_post = function(req, res) {
    Post.getPostId(req.params.postId, function(err, post) {
      if (err)
        res.send(err);

        if(post.length > 0){
            response.ok("success",post, res);
        } else {
            response.null("Data Not Found!", res);
        }

    });
  };

exports.update_a_post = function(req, res){
    var new_post       = new Post(req.body);
    var payload    = {
        "post_title": new_post.post_title,
        "post_slug": new_post.post_title.replace(" ","-"),
        "post_description": new_post.post_description,
        "is_favorite": new_post.is_favorite,
        "created_date": new_post.created_date
    };
    Post.updateById(req.params.postId, payload, function(err, post){
        if(err){
            response.inValid(500, `Error ${err}`, res);
        }

        response.ok(`${new_post.post_title} Updated success`, true, res);
        
    });
};

exports.delete_a_post = function(req, res){
    Post.remove(req.params.postId, new post(req.body), function(err, post){
        if(err)
        res.send(err);
        res.json({message:'post successfully deleted'});
    });
};

exports.getResult = function(req, res){
    Post.test(1, {name:'test'}, function(err, post){
console.log(err, post);
    });
}