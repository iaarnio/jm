(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$http', 'Auth', 'User'];

  function AdminCtrl($http, Auth, User) {

    // Use the User $resource to fetch all users
    vm.users = User.query();

    vm.deleteUser = deleteUser;

    activate();

    function activate() {
      toastr.info("AdminCtrl activated");
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
