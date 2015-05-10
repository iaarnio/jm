(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['logger'];

  function MenuController(logger) {
    //var vm = this;

    activate();

    function activate() {
      logger.log('MenuController activated');
    }

  }
})();
