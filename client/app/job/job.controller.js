(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobCtrl', jobCtrl);

  jobCtrl.$inject = ['jobService'];

  function jobCtrl(jobService, $log) {
    var vm = this;

    vm.jobs = [{name: 'initial'}];
    vm.listJobs = listJobs;
    vm.viewJob = viewJob;
    vm.addJob = addJob;
    vm.deleteJob = deleteJob;
    vm.applyJob = applyJob;

    activate();

    function activate() {
      $log.info('activate');
      listJobs();
    }

    vm.listJobs = function () {
      $log.info('JobController listJobs');
      jobService.listJobs()
        .then(function (jobs) {
          vm.jobs = jobs;
        })

    };

    vm.viewJob = function () {
      $log.info('JobController viewJob');
      jobService.viewJob();
    };

    vm.addJob = function () {
      $log.info('JobController addJob');
      jobService.addJob();
    };

    vm.deleteJob = function (job) {
      $log.info('JobController deleteJob');
      jobService.addJob();
    };

    vm.applyJob = function () {
      $log.info('JobController applyJob');
      jobService.addJob();
    };
  }
})();
