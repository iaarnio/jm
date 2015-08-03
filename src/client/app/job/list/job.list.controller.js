(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobListController', JobListController);

  JobListController.$inject = ['jobService', 'logger'];

  function JobListController(jobService, logger) {
    var vm = this;

    vm.jobs = [];
    vm.listJobs = listJobs;

    activate();

    function activate() {
      logger.info('JobListController activated');
      listJobs();
    }

    function listJobs() {
      jobService.listJobs()
        .then(function (jobs) {
          vm.jobs = jobs;
        }, function (err) {
          vm.jobs = err;
        });
    }

  }
})();
