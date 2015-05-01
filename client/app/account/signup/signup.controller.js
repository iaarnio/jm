(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('SignupCtrl', SignupCtrl);

  SignupCtrl.$inject = ['Auth', '$location', '$window', 'logger'];

  function SignupCtrl(Auth, $location, $window, logger) {
    var vm = this;

    vm.user = {};
    vm.errors = {};
    vm.submitted = false;

    vm.register = register;
    vm.loginOauth = loginOauth;

    activate();

    function activate() {
      logger.log("SignupCtrl activated");
    }

    function register(form) {
      vm.submitted = true;

      if (form.$valid) {
        Auth.createUser({
          name: vm.user.name,
          email: vm.user.email,
          password: vm.user.password
        })
          .then(function () {
            // Account created, redirect to home
            $location.path('/');
          })
          .catch(function (err) {
            err = err.data;
            vm.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              vm.errors[field] = error.message;
            });
          });
      }
    }

    function loginOauth(provider) {
      $window.location.href = '/auth/' + provider;
    }
  }
})();
