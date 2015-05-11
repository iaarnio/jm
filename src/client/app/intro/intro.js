(function () {
  'use strict';

  angular.module('jokumuuApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/intro', {
          templateUrl: 'app/intro/intro.html',
          controller: 'IntroController',
          controllerAs: 'vm'
        });
    });


})();
