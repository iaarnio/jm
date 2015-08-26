(function () {
  'use strict';

  var _ = require('lodash');
  var Job = require('./job.model');

  module.exports = {
    list: list,
    get: get,
    create: create,
    update: update,
    remove: remove
  };

  function list(req, res) {
    Job.find()
    .then(function(jobs) {
      returnResponse(res, 200, jobs);
    }, function(err) {
      returnError(res, err);
    });
  }
  
  function get(req, res) {
    Job.findById(req.params.id)
    .then(function(job) {
      if (!job) {
        returnResponse(res, 404);
      }
      returnResponse(res, 200, job);
    }, function (err, job) {
      returnError(res, err);
    });
  }

  function create(req, res) {
    Job.create(req.body)
    .then(function(job) {
      returnResponse(res, 201, job);
    }, function (err, job) {
      returnError(res, err);
    });
  }

  function update(req, res) {
    Job
    .findById(req.params.id)
    .then(function(job) {
      if (!job) {
        returnResponse(res, 404);
      }
      var updated = _.merge(job, req.body);
      updated
      .save()
      .then(function() {
        returnResponse(res, 200, job);
      }, function (err) {
        returnError(res, err);
      });
    });
  }

/*
old version - remove after verified that new update works
  function update2(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    Job.findById(req.params.id, function (err, job) {
      if (err) {
        return handleError(res, err);
      }
      if (!job) {
        return res.send(404);
      }
      var updated = _.merge(job, req.body);
      updated.save(function (err) {
        if (err) {
          return handleError(res, err);
        }
        return res.json(200, job);
      });
    });
  }
*/

  function remove(req, res) {
    Job.findById(req.params.id)
    .then(function(job) {
      if (!job) {
        returnResponse(res, 404);
      }
      job.remove()
      .then(function() {
        returnResponse(res, 204);
      }, function (err) {
        returnError(res, err);
      });
    }, function (err, job) {
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
