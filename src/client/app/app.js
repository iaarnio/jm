/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function () {
  'use strict';

  angular.module('jokumuuApp', [
    'core',
    'account'
  ])
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    });

})();
