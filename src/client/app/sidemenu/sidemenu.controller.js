(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('SidemenuController', SidemenuController);

  SidemenuController.$inject = ['logger', 'User'];

  function SidemenuController(logger, User) {
    var vm = this;

    vm.currentUser = {};
    vm.selected = false;
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
      logger.info('SidemenuController activated');
      User.get(function(user) {
          vm.currentUser = user;
      });
    }

  }
})();