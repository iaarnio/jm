/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function () {
  'use strict';

  angular.module('jokumuuApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'core'
  ])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
    })

})();
