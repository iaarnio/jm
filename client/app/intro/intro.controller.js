(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('IntroCtrl', IntroCtrl);

  IntroCtrl.$inject = ['logger'];

  function IntroCtrl(logger) {

    activate();

    function activate() {
      logger.log('IntroCtrl activated');
    }
  }
})();

