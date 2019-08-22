'use strict';

var Event = require('../model/eventModel.js');

exports.list_all_events = function(req, res){
    Event.getAllEvent(function(err, event){
        console.log('container');
        if(err)
            res.send(err);
            console.log('res:', event);
            res.send(event);
    });
};

exports.create_a_event = function(req, res){
    var new_event = new Event(req.body);

    //handle null error
    if(!new_event.event_title || !new_event.event_slug || !event.event_description){
        res.status(400).send({error:true, message: 'Please provide title / slug / description'});

    } else {
        Event.create_a_event(new_event, function(err, event){
            if(err)
            res.send(err);
            res.json(event);
        });
    }
};


exports.read_a_event = function(req, res){
    Event.getEventId(req.params.eventId, new Event(req.body), function(err, event){
        if(err)
        res.send(err);
        res.json(event);
    });
};

exports.update_a_event = function(req, res){
    Event.updateById(req.params.eventId, new Event(req.body), function(err, event){
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