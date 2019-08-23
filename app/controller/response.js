'use strict';

exports.ok = function(message, values, res) {
  var data = {
      'status': 200,
      'message': message,
      'data': values
  };
  res.json(data);
  res.end();
};

exports.null = function(message, res) {
    var data = {
        'status': 404,
        'message': message,
    };
    res.json(data);
    res.end();
  };

