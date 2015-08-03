(function () {
  'use strict';

  angular.module('jokumuuApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/jobList', {
          templateUrl: 'app/job/list/job.list.html',
          controller: 'JobListController',
          controllerAs: 'vm'
        });
    });
})();
