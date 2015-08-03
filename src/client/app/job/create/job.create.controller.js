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

    function createJob(job) {
      logger.info('JobCreateController createJob');
      job.employer = Auth.getCurrentUser()._id;
      console.log('adding employer id: ' + job.employer);
      jobService.addJob(job)
      .then(function(job) {
        logger.info('Job created successfully');
        $scope.$apply($location.path('/jobList'));
        logger.info($location.path());
      })
    }

  }
})();
