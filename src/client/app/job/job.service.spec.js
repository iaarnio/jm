/// <reference path="../../../../typings/jasmine/jasmine.d.ts"/>
/* jshint -W117, -W030 */
'use strict';

describe('JobService', function() {
  beforeEach(module('jokumuuApp'));

  var service;

  beforeEach(inject(function (jobService) {
    service = jobService;
  }));

  describe('existance', function() {

    it ('should exist', function () {
      expect(service).toBeDefined;
    });
  });

  describe('mocked results', function() {

    var $httpBackend;
    var mockedData = [
        {
          title: 'eka job name',
          employer: 'employer1'
        },
        {
          title: 'toka job name',
          employer: 'employer2'
        }
      ];
    
    beforeEach(inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));
          
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it ('should return jobs', function () {
      var jobs;
      $httpBackend.when('GET', '/api/jobs').respond(200, mockedData);
     
      service.listJobs()
        .then(function (data) {
          jobs = data;
      });

      $httpBackend.flush();      
      
      expect(jobs.length).toBe(2);
    });
  });
});
