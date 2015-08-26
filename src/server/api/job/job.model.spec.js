/* jshint -W117 */
'use strict';

process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);

var expect = require('chai').expect;
var Job = require('./job.model');
var User = require('../user/user.model');

var title1 = 'Test title';
var employerName1 = 'Test employer'; 
var employerId1 = new User();


function createJob() {
  var job = new Job({
    title: title1, 
    employer: employerId1, 
    employerName: employerName1
  });
  return job;
}

function populateCollection(done) {
  var job = createJob();
  job.save(function(err) {
    if (err) {
      throw('populateCollection failed: ' + err);
    }
    done();
  });
}

function cleanCollection(done) {
  Job.remove().exec()
  .then(function() {
    done();
  });      
}

 describe('Job model', function() {

  before(function(done) {
    cleanCollection(done)
  });

  describe('empty collection', function() {

    afterEach(function(done) {
      cleanCollection(done);
    });
 
    it('should have no jobs', function(done) {
      Job.find({}, function(err, jobs) {
        expect(jobs).to.have.length(0);
        done();
      });
    });

    it('should save job', function(done) {
      var job = createJob();
      job.save(function(err) {
        expect(err).should.not.exist;
        done();
      });
    });

  });

  describe('populated collection', function() {
    
    beforeEach(function(done) {
      populateCollection(done);
    })
    
    afterEach(function(done) {
      cleanCollection(done);
    });
    
    it('should find job', function(done) {
      Job.find(function(err, jobs) {
        expect(err).should.not.exist;
        expect(jobs).to.have.length(1);
        done();
      });
    });
    
    it('should find job with title', function(done) {
      Job.find({title: title1}, function(err, jobs) {
        expect(err).should.not.exist;
        expect(jobs).to.have.length(1);
        done();
      });
    });
    
    it('should not find job with incorrect title', function(done) {
      Job.find({title: title1 + 'foo'}, function(err, jobs) {
        expect(err).should.not.exist;
        expect(jobs).to.have.length(0);
        done();
      });
    });
    
    it('should find job with employer', function(done) {
      Job.find({employerName: employerName1}, function(err, jobs) {
        expect(err).should.not.exist;
        expect(jobs).to.have.length(1);
        done();
      });
    });
    
    it('should fail when saving a duplicate job', function(done) {
      var job = createJob();
      job.save(function(err) {
        expect(err).should.exist;
        done();
      });
    });
  
    it('should delete job', function(done) {
      Job.remove().exec()
        .then(function() {
          Job.find({}, function(err, jobs) {
            expect(err).should.not.exist;
            expect(jobs).to.have.length(0);
            done();
          });
        });
    });
  
  });
  
});
