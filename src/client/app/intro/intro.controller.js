(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('IntroController', IntroController);

  IntroController.$inject = ['logger'];

  function IntroController(logger) {

    activate();

    function activate() {
      logger.info('IntroController activated');
    }
  }
})();

