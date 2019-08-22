'user strict';
var sql = require('.db.js');

//Task object constructor
var Event = function(event){
    this.title        = event.event_title;
    this.slug         = event.event_slug;
    this.description  = event.event_description;
    this.created_date = new Date();  
};

// Todo insert 
Event.createEvent = function (newEvent, result){
    sql.query("insert into event set ?", newEvent, function(err, res){
        if(err){
            console.log("error:", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

// Todo get data
Event.getEventId = function(eventId, result){
    sql.query("select * from event where event_id = ?", eventId, function(err, res){
        if(err){
            console.log("error:", err);
            result(err, null);
        } else {
            console.log("event :", res);
            result(null, res);
        }
    });
};

Event.updateById = function(eventId, event, result){
    sql.query("update event set event_title = ? where event_id = ?", [task.task, id], function(err, res){
        if(err){
            console.log("error:". err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Event.remove = function(eventId, result){
    sql.query("delete from event where event_id = ?", [id], function(err, res){
        if(err){
            console.log("error:". err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Event;



