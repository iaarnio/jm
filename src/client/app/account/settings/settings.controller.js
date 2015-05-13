(function () {
  'use strict';

  angular.module('account')
    .controller('SettingsCtrl', SettingCtrl);

  SettingCtrl.$inject = ['User', 'Auth', 'logger'];

  function SettingCtrl(User, Auth, logger) {
    var vm = this;
    vm.user = {};
    vm.errors = {};
    vm.submitted = false;
    vm.message = '';

    vm.changePassword = changePassword;

    activate();

    function activate() {
      logger.log('SettingCtrl activated');
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
