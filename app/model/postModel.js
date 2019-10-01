'user strict';
var sql = require('./db.js');

//Task object constructor
var Post = function(post){
    this.post_title         = post.post_title;
    this.post_slug          = post.post_title.replace(" ","-");
    this.post_description   = post.post_description;
    this.image_url          = post.image_url;
    this.is_favorite        = post.is_favorite;
    this.created_date       = new Date();  
};

let perPage = 5;



// Todo insert 
Post.createPost = function (post, result){

    var query = `Insert INTO post (
            post_title, post_slug, 
            post_description, image_url, 
            is_favorite, created_date
        ) VALUES ( 
            '${post.post_title}', '${post.post_slug}',
            '${post.post_description}', '${post.is_favorite}',
            '${post.created_date}', '${post.created_by}'
        )`;

        sql.execute( query )
        .then( rows => {
            result(null, rows.insertId);
        })
        .catch( err => {
            console.log('error insert post', err);
            result(null, err);
        })
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



