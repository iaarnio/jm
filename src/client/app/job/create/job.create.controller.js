(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobCreateController', JobCreateController);

  JobCreateController.$inject = ['$location', '$scope', 'jobService', 'Auth', 'logger'];

  function JobCreateController($location, $scope, jobService, Auth, logger) {
    var vm = this;

    vm.job = {};
    vm.createJob = createJob;

    activate();

    function activate() {
      logger.info('JobCreateController activated');
    }

    function createJob() {
      logger.info('JobCreateController createJob');
      vm.job.employer = Auth.getCurrentUser()._id;
      vm.job.employerName = Auth.getCurrentUser().name;
      jobService.addJob(vm.job)
      .then(function() {
        logger.info('Job created successfully');
        $location.path('/jobList');
        logger.info($location.path());
      })
    }

  }
})();
