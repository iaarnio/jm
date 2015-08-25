(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobDetailsController', JobDetailsController);

  JobDetailsController.$inject = ['$routeParams', 'jobService', 'addressService', 'logger', '$scope'];

  function JobDetailsController($routeParams, jobService, addressService, logger, $scope) {
    var vm = this;

    vm.job = {};
    vm.markers = {};
    vm.center = {};
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
      .then(setMapCoordinates);
    }

    function deleteJob(job) {
      logger.info('JobDetailsController deleteJob');
      jobService.deleteJob(job);
    }

    function applyJob(job) {
      logger.info('JobDetailsController applyJob');
      jobService.addJob(job);
    }
    
    function setMapCoordinates(address) {
      var marker = {
        lat: Number(address.lat),
        lng: Number(address.lon),
        message: vm.job.title,
        focus: true,
        draggable: false
      }
      
      vm.markers = {
        jobMarker: marker
      }
      
      console.log(vm.markers);

      vm.center = {
        lat: Number(address.lat),
        lng: Number(address.lon),
        zoom: 17,
        autoDiscover: false
      };
    }
  }
})();
