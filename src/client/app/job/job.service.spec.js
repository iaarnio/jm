/// <reference path="../../../../typings/jasmine/jasmine.d.ts"/>
/* jshint -W117, -W030 */
'use strict';

describe('JobService', function() {
  beforeEach(module('jokumuuApp'));

  var service;
var $http;

  beforeEach(inject(function (jobService, _$http_) {
    service = jobService;
    $http = _$http_;
  }));

  describe('existance', function() {

    it ('should exist', function () {
      expect(service).isDefined;
    });
  });

  describe('mocked results', function() {

    var $httpBackend;
//    var mockedData = [
//        {
//          title: 'eka job name',
//          employer: 'employer1'
//        },
//        {
//          title: 'toka job name',
//          employer: 'employer2'
//        }
//      ];
//      
    var mockedData = 
[{"_id":"55535c06db02c96600ba6a97","title":"Warehouse work","employer":"Mr Employer","__v":0},{"_id":"55535c06db02c96600ba6a98","title":"Cashier","employer":"Mrs Corporation","__v":0},{"_id":"55535c06db02c96600ba6a99","title":"Car driver","employer":"Father and Son co","__v":0},{"_id":"55535c06db02c96600ba6a9a","title":"Store assistant","employer":"Click and Go Inc","__v":0},{"_id":"55535c06db02c96600ba6a9c","title":"Painter","employer":"Painter Boys","__v":0},{"_id":"55535c06db02c96600ba6a9b","title":"Cleaner","employer":"Putsis","__v":0}]      
;    
    
    beforeEach(inject(function(_$httpBackend_) {
      $httpBackend =_$httpBackend_;
    }));
          
    beforeEach(function() {
      $httpBackend.when('GET', '/api/jobs')
        .respond(200, mockedData);
     });

    it ('should return jobs', function ($http) {
      var jobs = service.listJobs();
      $httpBackend.expectGET('/api/jobs');
      $httpBackend.flush();      
//      var zzz= $http.get('/api/jobs');
//      console.log('zzz=' + zzz);
      
      console.log('serv.jobs=' + jobs.length);
      expect(jobs.length).toBe(2);
    });
  });
});
