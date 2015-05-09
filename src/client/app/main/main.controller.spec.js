/* jshint -W117, -W030 */
'use strict';

describe('Controller: MainCtrl', function () {

  var MainCtrl;
  var scope;
  var $httpBackend;
      
  // load the controller's module
  beforeEach(module('jokumuuApp'));

  // Mock logger
  beforeEach(module(function($provide) {
    $provide.service('logger', function() {
      this.log = jasmine.createSpy('log').andCallFake(function(msg, noToast) { });
      this.logError = jasmine.createSpy('logError').andCallFake(function(msg, noToast) { });
    });
  }));      

/*  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      vm: scope
    });
  }));

  it('should attach a list of things to the scope', function () {
    $httpBackend.flush();
    expect(scope.jobs.length).toBe(4);
  });*/
});
