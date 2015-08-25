(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobDetailsController', JobDetailsController);

  JobDetailsController.$inject = ['$routeParams', 'jobService', 'addressService', 'logger'];

  function JobDetailsController($routeParams, jobService, addressService, logger) {
    var vm = this;

    vm.job = {};
    vm.viewJob = viewJob;
    vm.deleteJob = deleteJob;
    vm.applyJob = applyJob;

    activate();

    function activate() {
      logger.info('JobDetailsController activated');
      viewJob();
    }

    function viewJob() {
      logger.info('JobDetailsController viewJob');
      var jobId = $routeParams.id;
      jobService.viewJob(jobId)
      .then(function(job) {
        vm.job = job;
        return job.address;
      })
      .then(addressService.viewAddress)
      //.then(createMap);
    }

    function deleteJob(job) {
      logger.info('JobDetailsController deleteJob');
      jobService.deleteJob(job);
    }

    function applyJob(job) {
      logger.info('JobDetailsController applyJob');
      jobService.addJob(job);
    }
    
    function createMap(address) {
      let map = new OpenLayers.Map('basicMap');
      var mapnik         = new OpenLayers.Layer.OSM();
      //var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
      //var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
      var position       = new OpenLayers.LonLat(address.lat, address.lon);//.transform( fromProjection, toProjection);
      var zoom           = 15; 

      map.addLayer(mapnik);
      map.setCenter(position, zoom );      
    }
  }
})();
