/// <reference path="../../../typings/angularjs/angular.d.ts"/>
(function () {
  'use strict';

  angular.module('jokumuuApp', [
    'core',
    'account'
  ])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('authInterceptor');
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookies, $location, logger) {
      return {
        // Add authorization token to headers
        request: function (config) {
          config.headers = config.headers || {};
          if ($cookies.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookies.get('token');
          }
          return config;
        },
  
        // Intercept 401s and redirect you to login
        /*
        responseError: function(response) {
          if(response.status === 401) {
            $location.path('/login');
            // remove any stale tokens
            $cookies.remove('token');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
        */
      };
    })

    .run(function ($rootScope, $location, Auth) {
      // Redirect to login if route requires auth and you're not logged in
      $rootScope.$on('$routeChangeStart', function (event, next) {
        Auth.isLoggedInAsync(function(loggedIn) {
          if (next.authenticate && !loggedIn) {
            $location.path('/login');
          }
        });
      });
    });
})();
