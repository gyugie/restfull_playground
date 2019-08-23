'use strict';

var Event    = require('../model/eventModel.js');
var response = require('./response.js');

exports.list_all_event = function(req, res){
    Event.getAllEvent(function(err, event){
        console.log('container');
        if(err)
            res.send(err);
            if(event.length > 0){
                response.ok("success",event, res);
            } else {
                response.null("Data Not Found!", res);
            }
    });
};

exports.read_a_event = function(req, res) {
    Event.getEventId(req.params.eventId, function(err, event) {
      if (err)
        res.send(err);

        if(event.length > 0){
            response.ok("success",event, res);
        } else {
            response.null("Data Not Found!", res);
        }

    });
  };

exports.create_a_event = function(req, res){
    var new_event       = new Event(req.body);
    var manipulation    = {
        "event_title": new_event.event_title,
        "event_slug": new_event.event_slug.replace(" ","-"),
        "event_description": new_event.event_description,
        "created_date": new_event.created_date
    };

    //handle null error
    if(!new_event.event_title || !new_event.event_slug || !new_event.event_description){
        res.status(400).send({error:true, message: 'Please provide title / slug / description'});

    } else {
        Event.createEvent(manipulation, function(err, event){
            if (err)
                res.send(err);
                res.json({"response":event});
            });
    }
};


exports.update_a_event = function(req, res){
    var new_event       = new Event(req.body);
    var manipulation    = {
        "event_title": new_event.event_title,
        "event_slug": new_event.event_slug.replace(" ","-"),
        "event_description": new_event.event_description,
        "created_date": new_event.created_date
    };

    Event.updateById(req.params.eventId, manipulation, function(err, event){
        if(err)
        res.send(err);
        res.json(event);
    });
};

exports.delete_a_event = function(req, res){
    Event.remove(req.params.eventId, new Event(req.body), function(err, event){
        if(err)
        res.send(err);
        res.json({message:'Event successfully deleted'});
    });
};

exports.getResult = function(req, res){
    Event.test(1, {name:'test'}, function(err, event){
console.log(err, event);
    });
}