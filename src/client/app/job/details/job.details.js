(function () {
  'use strict';

  angular.module('jokumuuApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/jobDetails/:id', {
          templateUrl: 'app/job/details/job.details.html',
          controller: 'JobDetailsController',
          controllerAs: 'vm'
        });
    });
})();
