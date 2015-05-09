(function () {
  'use strict';

  angular.module('jokumuuApp')
    .factory('jobService', jobService);

  jobService.$inject = ['$http', '$q', '$log'];

  function jobService($http, $q, $log) {

    return {
      listJobs: listJobs,
      viewJob: viewJob,
      addJob: addJob,
      deleteJob: deleteJob,
      applyJob: applyJob
    };

    function listJobs() {
//      var jobs = [
//        {
//          title: 'eka job name',
//          employer: 'employer1'
//        },
//        {
//          title: 'toka job name',
//          employer: 'employer2'
//        }
//      ];
      return $http.get('/api/jobs')
        .then(getJobsComplete)
        .catch(getJobsFail);
      
      function getJobsComplete(response, status, headers, config) {
        return response.data;
      }

      function getJobsFail(message) {
        var errorMsg = 'XHR failed for getJobs: ' + message;
        $log.error(errorMsg);
        $q.reject(errorMsg);
      }
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
