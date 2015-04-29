(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobCtrl', JobCtrl);

  JobCtrl.$inject = ['jobService'];

  function JobCtrl(jobService, $log) {
    var vm = this;

    vm.jobs = [{name: 'initial'}];
    vm.listJobs = listJobs;
    vm.viewJob = viewJob;
    vm.addJob = addJob;
    vm.deleteJob = deleteJob;
    vm.applyJob = applyJob;

    activate();

    function activate() {
      toastr.info("JobCtrl activated");
      $log.info('activate');
      listJobs();
    }

    function listJobs() {
      $log.info('JobController listJobs');
      jobService.listJobs()
        .then(function (jobs) {
          vm.jobs = jobs;
        })
    }

    function viewJob() {
      $log.info('JobController viewJob');
      jobService.viewJob();
    }

    function addJob() {
      $log.info('JobController addJob');
      jobService.addJob();
    }

    function deleteJob(job) {
      $log.info('JobController deleteJob');
      jobService.addJob();
    };

    function applyJob() {
      $log.info('JobController applyJob');
      jobService.addJob();
    }
  }
})();
