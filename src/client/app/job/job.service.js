(function () {
  'use strict';

  angular.module('jokumuuApp')
    .factory('jobService', jobService);

  jobService.$inject = ['$http', '$q', 'logger'];

  function jobService($http, $q, logger) {

    return {
      listJobs: listJobs,
      viewJob: viewJob,
      addJob: addJob,
      deleteJob: deleteJob,
      applyJob: applyJob
    };

    function listJobs() {
      return $http.get('/api/jobs')
        .then(serviceComplete)
        .catch(serviceFail);
    }

    function viewJob(job) {
      return $http.get('/api/jobs/' + job._id)
        .then(serviceComplete)
        .catch(serviceFail);
    }

    function addJob(job) {

    }

    function deleteJob(job) {

    }

    function applyJob(job) {

    }
    
    
    function serviceComplete(response) {
      return response.data;
    }

    function serviceFail(message) {
      var errorMsg = 'JobService failed on XHR: ' + message.status + ' ' + message.statusText;
      logger.error(errorMsg);
      console.log(message);
      $q.reject(errorMsg);
    }
    
  }

})();
