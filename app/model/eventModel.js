'user strict';
var sql = require('./db.js');

//Task object constructor
var Event = function(event){
    this.event_title        = event.event_title;
    this.event_slug         = event.event_slug;
    this.event_description  = event.event_description;
    this.created_date       = new Date();  
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

Event.getAllEvent = function (result) {
    sql.query("Select * from event", function (err, res) {
            if(err) {
               
                result(null, err);
            } else {
             result(null, res);
            }
        });   
};

// Todo get data
Event.getEventId = function (eventId, result) {
     sql.query("Select * from event where event_id = ? ", eventId, function (err, res) {             
        if(err) {
            result(null, err);
        } else {
              result(null, res);
        }
    });   
};

Event.updateById = function(eventId, event, result){
    sql.query("update event set ? where event_id = ?", [event, eventId], function(err, res){
        if(err){
            console.log("error:", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

Event.remove = function(eventId, result){
    sql.query("delete from event where event_id = ?", [eventId], function(err, res){
        if(err){
            console.log("error:", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

module.exports = Event;



