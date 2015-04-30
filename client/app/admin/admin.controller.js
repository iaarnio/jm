(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$http', 'Auth', 'User', 'logger'];

  function AdminCtrl($http, Auth, User, logger) {
    var vm = this;

    vm.users = User.query();
    vm.users = [];

    vm.deleteUser = deleteUser;

    activate();

    function activate() {
      logger.log('AdminCtrl activated');
      vm.users = User.query();
    }

    function deleteUser(user)
    {
      User.remove({id: user._id});
      angular.forEach(vm.users, function (u, i) {
        if (u === user) {
          vm.users.splice(i, 1);
        }
      });
    }
  }

})();
