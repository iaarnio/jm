(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['logger'];

  function MenuController(logger) {
    var vm = this;

    vm.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    activate();

    function activate() {
      logger.info('MenuController activated');
    }

  }
})();