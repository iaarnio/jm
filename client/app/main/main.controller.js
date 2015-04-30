(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['logger'];

  function MainCtrl(logger) {
    //var vm = this;

    activate();

    function activate() {
      logger.log('MainCtrl activated');
    }

  }
})();
