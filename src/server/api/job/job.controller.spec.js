/// <reference path="../../../../typings/node/node.d.ts"/>
/* jshint -W117 */
'use strict';

var sinon = require('sinon');
var expect = require('chai').expect;
var app = require('../../app.js');
var Job = require('./job.model');

var title1 = 'Test title';
var employer1 = 'Test title'; 

describe('Job controller', function() {

  var jobController;
  
  // Clear before testing begins
  beforeEach(function() {
    jobController = require('./job.controller');
  });

  // Clear after each test case
  afterEach(function() {
  });
  
  describe('list', function() {
    
    it('should call Job.find', function(done) {
      sinon.stub(Job, 'find', function() { 
        return Promise.resolve(); 
      });
      jobController.list();
      sinon.assert.calledOnce(Job.find);
      Job.find.restore();
      done();
    });

  });
  
  describe('get', function() {
    
    it('should call Job.findById', function(done) {
      sinon.stub(Job, 'findById', function() { 
        return Promise.resolve(); 
      });
      jobController.get({params: {id: 123}});
      sinon.assert.calledOnce(Job.findById);
      Job.findById.restore();
      done();
    });

  });

  describe('create', function() {
    
    it('should call Job.create', function(done) {
      sinon.stub(Job, 'create', function() { 
        return Promise.resolve(); 
      });
      jobController.create({body: {}});
      sinon.assert.calledOnce(Job.create);
      Job.create.restore();
      done();
    });

  });

  describe('update', function() {
    
    it('should call Job.findById', function(done) {
      sinon.stub(Job, 'findById', function() { 
        return Promise.resolve({foo: 1}); 
      });
      jobController.update({params: {id: 123}});
      sinon.assert.calledOnce(Job.findById);
      Job.findById.restore();
      done();
    });

  });

  describe('remove', function() {
    
    it('should call Job.findById', function(done) {
      sinon.stub(Job, 'findById', function() { 
        return Promise.resolve({foo: 1}); 
      });
      jobController.remove({params: {id: 123}});
      sinon.assert.calledOnce(Job.findById);
      Job.findById.restore();
      done();
    });

  });
});
