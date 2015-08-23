(function () {
  'use strict';

  var _ = require('lodash');
  var Address = require('./address.model');

  module.exports = {
    list: list,
    get: get,
    create: create,
    update: update,
    remove: remove
  };

  function list(req, res) {
    Address.find()
    .then(function(addresses) {
      returnResponse(res, 200, addresses);
    }, function(err) {
      returnError(res, err);
    });
  }
  
  function get(req, res) {
    Address.findById(req.params.id)
    .then(function(address) {
      if (!address) {
        returnResponse(res, 404);
      }
      returnResponse(res, 200, address);
    }, function (err, address) {
      returnError(res, err);
    });
  }

  function create(req, res) {
    console.log('Addr-create');
    Address.create(req.body)
    .then(function(address) {
      returnResponse(res, 201, address);
    }, function (err, address) {
      returnError(res, err);
    });
  }

  function update(req, res) {
    Address
    .findById(req.params.id)
    .then(function(address) {
      if (!address) {
        returnResponse(res, 404);
      }
      var updated = _.merge(address, req.body);
      updated
      .save()
      .then(function() {
        returnResponse(res, 200, address);
      }, function (err) {
        returnError(res, err);
      });
    });
  }

  function remove(req, res) {
    Address.findById(req.params.id)
    .then(function(address) {
      if (!address) {
        returnResponse(res, 404);
      }
      address.remove()
      .then(function() {
        returnResponse(res, 204);
      }, function (err) {
        returnError(res, err);
      });
    }, function (err, address) {
      returnError(res, err);
    });
  }
  
  function returnResponse(res, code, data) {
    if (data) {
      res.json(code, data);
    } else {
      res.send(code);
    }
  }

  function returnError(res, err) {
    res.send(500, err);
    return Promise.reject();
  }

})();
