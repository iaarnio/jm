(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('MenuController', MenuController);

  MenuController.$inject = ['logger'];

  function MenuController(logger) {
    var vm = this;

    vm.selected = false;
    vm.test = "TEST";
    vm.choices = [
      {
        'title': 'Home',
        'link': '/'
      },
      {
        'title': 'Job',
        'link': '/'
      },
      {
        'title': 'Apply',
        'link': '/'
      },
      {
        'title': 'Contract',
        'link': '/'
      },
      {
        'title': 'Profile',
        'link': '/'
      }
    ];

    activate();

    function activate() {
      logger.info('MenuController activated');
    }

  }
})();