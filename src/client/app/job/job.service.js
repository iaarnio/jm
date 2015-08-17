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

    function viewJob(jobId) {
      return $http.get('/api/jobs/' + jobId)
        .then(serviceComplete)
        .catch(serviceFail);
    }

    function addJob(job) {
      return $http.post('/api/jobs', job)
        .then(serviceComplete)
        .catch(serviceFail);
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
      return $q.promise;
    }
    
  }

})();
