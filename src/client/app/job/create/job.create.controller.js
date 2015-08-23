(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobCreateController', JobCreateController);

  JobCreateController.$inject = ['$location', '$scope', 'jobService', 'addressService', 'Auth', 'logger'];

  function JobCreateController($location, $scope, jobService, addressService, Auth, logger) {
    var vm = this;

    vm.job = {};
    vm.createJob = createJob;

    activate();

    function activate() {
      logger.info('JobCreateController activated');
    }

    function createJob() {
      logger.info('JobCreateController createJob');
      addressService.queryDetails(vm.job.address)
      .then(addressService.addAddress)
      .then(jobService.addJob)
      .then(jobCreatedSuccessfully)
      .catch(jobCreationFailed);
    }
    
    function jobCreatedSuccessfully() {
      logger.info('Job created successfully');
      $location.path('/jobList');
      logger.info($location.path());
    }

    function jobCreationFailed(err) {
      logger.error('Job creation failed: ' + err);
    }

    function confirmJob() {
      vm.job.employer = Auth.getCurrentUser()._id;
      vm.job.employerName = Auth.getCurrentUser().name;
      
            
    }

  }
})();
