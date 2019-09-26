'use strict';

var Post    = require('../model/postModel.js');
var response = require('./response.js');

exports.create_a_post = function(req, res){
    var new_post       = new post(req.body);
    var manipulation    = {
        "post_title": new_post.post_title,
        "post_slug": new_post.post_slug.replace(" ","-"),
        "post_description": new_post.post_description,
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
    Post.getAllPost(function(err, post){
        if(err)
            res.send(err);
            if(post.length > 0){
                setTimeout(() => {
                    response.ok("success",post, res);
                }, 1000);
            } else {
                response.null("Data Not Found!", res);
            }
    });
};

exports.read_a_post = function(req, res) {
    Post.getpostId(req.params.postId, function(err, post) {
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
    var new_post       = new post(req.body);
    var manipulation    = {
        "post_title": new_post.post_title,
        "post_slug": new_post.post_slug.replace(" ","-"),
        "post_description": new_post.post_description,
        "created_date": new_post.created_date
    };

    Post.updateById(req.params.postId, manipulation, function(err, post){
        if(err)
        res.send(err);
        res.json(post);
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