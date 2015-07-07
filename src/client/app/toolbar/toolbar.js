(function () {
  'use strict';

  angular.module('jokumuuApp')
    .directive('jmToolbar', jmToolbar);

  function jmToolbar() {
      
      return {
          restrict: 'E',
          templateUrl: 'app/toolbar/toolbar.html',
          controller: ToolbarController,
          controllerAs: 'toolbar'
      };
  }
  
})();