(function () {
  'use strict';

  angular.module('account')
    .controller('LogoutController', LogoutController);

  LogoutController.$inject = ['Auth', 'logger'];

  function LogoutController(Auth, logger) {
    var vm = this;

    activate();

    function activate() {
      logger.info('LogoutController activated');
      Auth.logout();
    }

  }
})();
