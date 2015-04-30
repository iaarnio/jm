(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['$location', 'Auth', 'logger'];

  function NavbarCtrl($location, Auth, logger) {
    var vm = this;

    vm.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    vm.isCollapsed = true;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.isAdmin = Auth.isAdmin;
    vm.getCurrentUser = Auth.getCurrentUser;

    vm.logout = logout;
    vm.isActive = isActive;

    activate();

    function activate() {
      logger.log('NavbarCtrl activated');
    }

    function logout() {
      Auth.logout();
      $location.path('/login');
    }

    function isActive(route) {
      return route === $location.path();
    }
  }
})();
