(function () {
  'use strict';

  angular.module('account')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/login', {
          templateUrl: 'app/account/login/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm'
        })
        .when('/signup', {
          templateUrl: 'app/account/signup/signup.html',
          controller: 'SignupCtrl',
          controllerAs: 'vm'
        })
        .when('/settings', {
          templateUrl: 'app/account/settings/settings.html',
          controller: 'SettingsCtrl',
          controllerAs: 'vm',
          authenticate: true
        });
    });
})();
