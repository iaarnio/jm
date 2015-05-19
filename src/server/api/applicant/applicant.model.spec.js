/// <reference path="../../../../typings/mocha/mocha.d.ts"/>
/* jshint -W117 */
'use strict';

process.env.NODE_ENV = 'test';

var should = require('should');
var app = require('../../app');
var Applicant = require('./applicant.model');

var userid1 = '123';
var jobid1 = '456';

describe('Applicant model', function() {

  // Clear before testing begins
  before(function(done) {
    Applicant.remove().exec().then(function() {
      done();
    });
  });

  // Clear after each test case
  afterEach(function(done) {
    Applicant.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no applicants', function(done) {
    Applicant.find({}, function(err, applicants) {
      applicants.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a duplicate applicant', function(done) {
    var applicant = new Applicant({userid: userid1, jobid: jobid1});
    applicant.save(function(err1) {
      should.not.exist(err1);
      var duplicate = new Applicant(applicant);
      duplicate.save(function(err2) {
        should.exist(err2);
        done();
      });
    });
  });

  it('should save applicant', function(done) {
    var applicant = new Applicant({userid: userid1, jobid: jobid1});
    applicant.save(function(err1) {
      should.not.exist(err1);
      Applicant.find({}, function(err2, applicants) {
        should.not.exist(err2);
        applicants.should.have.length(1);
        done();
      });
    });
  });

  it('should find applicant with jobid', function(done) {
    var applicant = new Applicant({userid: userid1, jobid: jobid1});
    applicant.save(function(err) {
      should.not.exist(err);
      Applicant.find({jobid: jobid1}, function(err, applicants) {
        should.not.exist(err);
        applicants.should.have.length(1);
        done();
      });
    });
  });

  it('should find applicant with userid', function(done) {
    var applicant = new Applicant({userid: userid1, jobid: jobid1});
    applicant.save(function(err) {
      should.not.exist(err);
      Applicant.find({userid: userid1}, function(err, applicants) {
        should.not.exist(err);
        applicants.should.have.length(1);
        done();
      });
    });
  });

  it('should fail when saving without an userid', function(done) {
    var applicant = new Applicant({jobid: jobid1});
    applicant.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving without an jobid', function(done) {
    var applicant = new Applicant({userid: userid1});
    applicant.save(function(err) {
      should.exist(err);
      done();
    });
  });
});
