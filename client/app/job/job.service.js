(function () {
  'use strict';

  angular.module('jokumuuApp')
    .factory('jobService', jobService);

  jobService.$inject = ['$q', '$log'];

  function jobService($q, $log) {

    return {
      listJobs: listJobs,
      viewJob: viewJob,
      addJob: addJob,
      deleteJob: deleteJob,
      applyJob: applyJob
    };

    function listJobs() {
      var jobs = [
        {
          name: 'eka job name',
          location: 'Helsinki',
          requirements: [],
          amount: 1
        },
        {
          name: 'toka job name',
          location: 'Espoo',
          requirements: ['car', 'phusical'],
          amount: 2
        }
      ];

      $log.info('listJobs: ' + jobs);
      return $q.when(jobs);
    }

    function viewJob(job) {

    }

    function addJob(job) {

    }

    function deleteJob(job) {

    }

    function applyJob(job) {

    }
  }

})();
