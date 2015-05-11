(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobCtrl', JobCtrl);

  JobCtrl.$inject = ['jobService', 'logger'];

  function JobCtrl(jobService, logger) {
    var vm = this;

    vm.jobs = [{name: 'initial'}];
    vm.listJobs = listJobs;
    vm.viewJob = viewJob;
    vm.addJob = addJob;
    vm.deleteJob = deleteJob;
    vm.applyJob = applyJob;

    activate();

    function activate() {
      logger.info('JobCtrl activated');
      listJobs();
    }

    function listJobs() {
      logger.info('JobController listJobs');
      jobService.listJobs()
        .then(function (jobs) {
          vm.jobs = jobs;
        });
    }

    function viewJob(job) {
      logger.info('JobController viewJob');
      jobService.viewJob(job);
    }

    function addJob(job) {
      logger.info('JobController addJob');
      jobService.addJob(job);
    }

    function deleteJob(job) {
      logger.info('JobController deleteJob');
      jobService.deleteJob(job);
    }

    function applyJob(job) {
      logger.info('JobController applyJob');
      jobService.addJob(job);
    }
  }
})();
