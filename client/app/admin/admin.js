(function () {
  'use strict';

  angular.module('jokumuuApp')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/admin', {
          templateUrl: 'app/admin/admin.html',
          controller: 'AdminCtrl',
          controllerAs: 'vm'
        });
    });
})();
