/// <reference path="../../../../typings/jasmine/jasmine.d.ts"/>
/* jshint -W117, -W030 */
'use strict';

describe('JobController', function() {
  beforeEach(module('jokumuuApp'));

  // Mock logger
//  beforeEach(module(function($provide) {
//    $provide.service('logger', function() {
//      this.log = jasmine.createSpy('log').andCallFake(function(msg, noToast) { });
//      this.logError = jasmine.createSpy('logError').andCallFake(function(msg, noToast) { });
//    });
//  }));

  var controller;
  var scope;

  beforeEach(inject(function($controller, $rootScope){
    scope = $rootScope.$new();
    controller = $controller('JobController', { vm: scope });
  }));

  
  describe('instance', function() {
  
    it ('should be defined', function () {
      expect(controller).toBeDefined;
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
    
    it ('should get all jobs', function () {
      
      $httpBackend.when('GET', '/api/jobs').respond(200, mockedData);
      controller.listJobs();
      $httpBackend.flush();      
      
      expect(controller.jobs.length).toBeGreaterThan(1);
    });
  });
});
