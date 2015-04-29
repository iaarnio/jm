(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$log'];

  function MainCtrl($log) {
    //var vm = this;

    activate();

    function activate() {
      toastr.info("MainCtrl activated");
      $log.info('main');
    }

  }
})();
