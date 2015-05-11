(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('MainController', MainController);

  MainController.$inject = ['logger'];

  function MainController(logger) {
    var vm = this;

    activate();

    function activate() {
      logger.info('MainController activated');
    }

  }
})();
