(function () {
  'use strict';

  angular.module('core')
    .factory('logger', logger);

  logger.$inject = ['$log', '$mdToast'];

  function logger($log, $mdToast) {

    var position = {
      bottom: true,
      right: true
    };
    var delay = 3000;

    return {
      log: log,
      logError: logError
    };

    function log(msg, noToast) {
      $log.info(msg);
      if (!noToast) {
        showToast(msg, 'info');
      }
    }

    function logError(msg, noToast) {
      $log.error(msg);
      if (!noToast) {
        showToast(msg, 'error');
      }
    }

    function showToast(msg, level) {
      if (level === 'error') {
        msg = 'ERROR: ' + msg;  // TODO use ! icon or similar alert icon
      }
      $mdToast.show(
        $mdToast.simple()
          .content(msg)
          .position(position)
          .hideDelay(delay)
        );
    }
  }

})();
