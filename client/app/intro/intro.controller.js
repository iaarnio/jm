(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('IntroCtrl', IntroCtrl);

  function IntroCtrl() {

    activate();

    function activate() {
      toastr.info("IntroCtrl activated");
    }
  }
})();

