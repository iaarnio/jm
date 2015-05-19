(function () {
  'use strict';

  var _ = require('lodash');
  var Applicant = require('./applicant.model');

  module.exports = {
    list: list,
    get: get,
    create: create,
    update: update,
    remove: remove
  };

  function list(req, res) {
    Applicant.find(function (err, job) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, job);
    });
  }

  function get(req, res) {
    Applicant.findById(req.params.id, function (err, job) {
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
    Applicant.create(req.body, function (err, job) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(201, job);
    });
  }

  function update(req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    Applicant.findById(req.params.id, function (err, job) {
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

  function remove(req, res) {
    Applicant.findById(req.params.id, function (err, job) {
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
