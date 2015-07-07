function ToolbarController($scope, logger, Auth) {
    var vm = this;
    vm.currentUser = {};

    activate();

    function activate() {
      logger.info('ToolbarController activated');
      
      $scope.$watch(Auth.getCurrentUser, function() {
        vm.currentUser = Auth.getCurrentUser();
      });
  }

}  
