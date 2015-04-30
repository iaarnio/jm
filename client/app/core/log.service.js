(function () {
  'use strict';

  angular.module('jokumuuApp')
    .factory('logger', logger);

  logger.$inject = ['$log'];

  function logger($log) {

    toastr.options.positionClass = 'toast-bottom-right';
    toastr.options.backgroundpositionClass = 'toast-bottom-right';

    return {
      log: log,
      logError: logError
    };

    function log(msg, noToast) {
      $log.info(msg);
      if (!noToast) {
        toastr.info(msg);
      }
    }

    function logError(msg, noToast) {
      $log.error(msg);
      if (!noToast) {
        toastr.error(msg);
      }
    }
  }

})();
