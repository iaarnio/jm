(function () {
  'use strict';
  
  var express = require('express');
  var controller = require('./job.controller');
  
  var router = express.Router();
  
  router.get('/', controller.list);
  router.get('/:id', controller.get);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.patch('/:id', controller.update);
  router.delete('/:id', controller.remove);
  
  module.exports = router;
  
})();
