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

  var $controller;
  var scope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    scope = _$rootScope_.$new();
  }));


  describe('existance', function() {

    var controller;
  
    beforeEach(function () {
      controller = $controller('JobController', { vm: scope });
    });
  
    it ('should exist', function () {
      expect(controller).isDefined;
    });
  
    it ('should populate jobs', function () {
      controller.listJobs();
      console.log(scope);
      console.log('jobs=' + controller.listJobs);
      console.log('jobs=' + scope.jobs);
      console.log('foo=' + scope.foo);
      expect(scope.jobs.length).toBeGreaterThan(1);
    });
  });
});
