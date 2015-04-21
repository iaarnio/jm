'use strict';

angular.module('jokumuuApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/intro', {
        templateUrl: 'app/main/intto.html',
        controller: 'IntroCtrl'
      });
  });
