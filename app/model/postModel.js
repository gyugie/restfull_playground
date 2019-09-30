'user strict';
var sql = require('./db.js');

//Task object constructor
var Post = function(post){
    this.post_title         = post.post_title;
    this.post_slug          = post.post_slug;
    this.post_description   = post.post_description;
    this.is_favorite        = post.is_favorite;
    this.created_date       = new Date();  
};




// Todo insert 
Post.createPost = function (newPost, result){
    
    sql.query("insert into post set ?", newPost, function(err, res){
        if(err){
            console.log("error:", err);
            result(err, null);
        } else {
            console.log(res.insertId);  
            result(null, res.insertId);
        }
    });
};

Post.getAllPost = function (result) {
    sql.query("Select * from post", function (err, res) {
            if(err) {
               
                result(null, err);
            } else {
             result(null, res);
            }
        });   
};

// Todo get data
Post.getPostId = function (postId, result) {
     sql.query("Select * from post where post_id = ? ", postId, function (err, res) {             
        if(err) {
            result(null, err);
        } else {
              result(null, res);
        }
    });   
};

Post.updateById = function(postId, post, result){
    sql.query("update post set ? where post_id = ?", [post, postId], function(err, res){
        if(err){
            console.log("error:", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Post.remove = function(postId, result){
    sql.query("delete from post where post_id = ?", [postId], function(err, res){
        if(err){
            console.log("error:", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Post;



