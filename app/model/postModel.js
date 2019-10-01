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

let perPage = 5;



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

Post.getAllPost = function (params, result) {
    const page        = (params.page == undefined) ? 0 : params.page - 1;
    const startDate   = params.start_date;
    const endDate     = params.end_date;
    const start       = Math.ceil(page * perPage);
    var count;
    var data;

        // execute query 
        sql.execute('select count(*) as total from post')
            .then(rows => {
                count = JSON.parse(JSON.stringify(rows[0].total));
                
                if( startDate != undefined && endDate != undefined ){
                    query = `select * from post where created_date >= '${startDate}' AND created_date <= '${endDate}' LIMIT ${perPage} OFFSET ${start}`;
                } else {
                    query = `select * from post LIMIT ${perPage} OFFSET ${start}`;
                }
                return sql.execute( query );
            })
            .then(rows => {
                 data = JSON.parse(JSON.stringify(rows));
            })
            .then( () => {
                var response = {
                    'total_rows': count,
                    'total_page': Math.ceil(count / perPage),
                    'page'      : parseInt(page) + 1,
                    'row_from'  : start + 1,
                    'row_end'   : data.length + start,
                    'data'      : data
                }
                
                result(null, response);
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



