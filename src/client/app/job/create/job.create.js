(function () {
  'use strict';

  angular.module('jokumuuApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/jobCreate', {
          templateUrl: 'app/job/create/job.create.html',
          controller: 'JobCreateController',
          controllerAs: 'vm'
        });
    });
})();
