(function () {
  'use strict';

  angular.module('account')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['Auth', '$location', '$window', 'logger'];

  function LoginCtrl(Auth, $location, $window, logger) {
    var vm = this;

    vm.user = {};
    vm.errors = {};
    vm.submitted = false;

    vm.login = login;
    vm.loginOauth = loginOauth;
    vm.fillTestUser = fillTestUser;
    vm.fillAdminUser = fillAdminUser;
    vm.fillDummyUser = fillDummyUser;

    activate();

    function activate() {
      logger.log('LoginCtrl activated');
    }

    function login(form) {
      logger.info('Login: login');
      vm.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: vm.user.email,
          password: vm.user.password
        })
          .then(function () {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch(function (err) {
            vm.errors.other = err.message;
          });
      }
    }

    function loginOauth(provider) {
      $window.location.href = '/auth/' + provider;
    }
    
    
    // Temporary easy access / easy testing form fillers
    function fillTestUser() {
      vm.user.email = 'test@test.com';
      vm.user.password = 'test'
    }
    function fillAdminUser() {
      vm.user.email = 'admin@admin.com';
      vm.user.password = 'admin'
    }
    function fillDummyUser() {
      vm.user.email = 'dummy@illegal.com';
      vm.user.password = 'test'
    }
  }
})();
