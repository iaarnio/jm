(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['Auth', '$location', '$window', 'logger'];

  function LoginCtrl(Auth, $location, $window, logger) {
    var vm = this;

    vm.user = {};
    vm.errors = {};
    vm.submitted = false;

    vm.login = login;
    vm.loginOauth = loginOauth;

    activate();

    function activate() {
      logger.log('LoginCtrl activated');
    }

    function login(form) {
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
  }
})();
