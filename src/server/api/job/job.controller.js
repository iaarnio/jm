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
    console.log('list called');
    Job.find()
    .then(function(jobs) {
      return res.json(200, jobs);
    }, function(err) {
      return handleError(res, err);
    });
  }
  
  function get(req, res) {
    Job.findById(req.params.id, function (err, job) {
      if (err) {
        return handleError(res, err);
      }
      if (!job) {
        return res.send(404);
      }
      return res.json(job);
    });
  }

  function create(req, res) {
    Job.create(req.body, function (err, job) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, job);
    });
  }

  function update(req, res) {
    Job
    .findById(req.params.id)
    .then(function(job) {
      if (!job) {
        return res.send(404);
      }
      var updated = _.merge(job, req.body);
      updated
      .save()
      .then(function() {
        return res.json(200, job);
      }, function (err) {
        return handleError(res, err);
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
    Job.findById(req.params.id, function (err, job) {
      if (err) {
        return handleError(res, err);
      }
      if (!job) {
        return res.send(404);
      }
      job.remove(function (err) {
        if (err) {
          return handleError(res, err);
        }
        return res.send(204);
      });
    });
  }

  function handleError(res, err) {
    return res.send(500, err);
  }

})();
