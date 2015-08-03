(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobDetailsController', JobDetailsController);

  JobDetailsController.$inject = ['$routeParams', 'jobService', 'logger'];

  function JobDetailsController($routeParams, jobService, logger) {
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
      })
    }

    function deleteJob(job) {
      logger.info('JobDetailsController deleteJob');
      jobService.deleteJob(job);
    }

    function applyJob(job) {
      logger.info('JobDetailsController applyJob');
      jobService.addJob(job);
    }
  }
})();
