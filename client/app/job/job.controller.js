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
      logger.log('JobCtrl activated');
      listJobs();
    }

    function listJobs() {
      logger.log('JobController listJobs');
      jobService.listJobs()
        .then(function (jobs) {
          vm.jobs = jobs;
        });
    }

    function viewJob() {
      logger.log('JobController viewJob');
      jobService.viewJob();
    }

    function addJob() {
      logger.log('JobController addJob');
      jobService.addJob();
    }

    function deleteJob(job) {
      logger.log('JobController deleteJob');
      jobService.deleteJob(job);
    }

    function applyJob() {
      logger.log('JobController applyJob');
      jobService.addJob();
    }
  }
})();
