/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
/* jshint -W117, -W030 */
'use strict';

describe('JobController', function() {

  var JobCtrl;

  beforeEach(module('jokumuuApp'));

  // Mock logger
  beforeEach(module(function($provide) {
    $provide.service('logger', function() {
      this.log = jasmine.createSpy('log').andCallFake(function(msg, noToast) { });
      this.logError = jasmine.createSpy('logError').andCallFake(function(msg, noToast) { });
    });
  }));

  beforeEach(inject(function ($controller, $rootScope) {
    var scope = $rootScope.$new();
    JobCtrl = $controller('JobCtrl', {
      vm: scope
    });
  }));

  it ('should exist', function () {
    expect(JobCtrl).isDefined;
  });

  it ('should populate jobs', function () {
    JobCtrl.listJobs();
    expect(scope.jobs.length).toBeGreaterThan(1);
  });
});
