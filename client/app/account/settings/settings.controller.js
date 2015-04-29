(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('SettingsCtrl', SettingCtrl);

  SettingCtrl.$inject = ['User', 'Auth'];

  function SettingCtrl(User, Auth) {
    var vm = this;
    vm.user = {};
    vm.errors = {};
    vm.submitted = false;
    vm.message = '';

    vm.changePassword = changePassword;

    activate();

    function activate() {
      toastr.info("SettingCtrl activated");
    }

    function changePassword(form) {
      vm.submitted = true;
      if (form.$valid) {
        Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
          .then(function () {
            vm.message = 'Password successfully changed.';
          })
          .catch(function () {
            form.password.$setValidity('mongoose', false);
            vm.errors.other = 'Incorrect password';
            vm.message = '';
          });
      }
    }
  }
})();
