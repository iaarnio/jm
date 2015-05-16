/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
(function () {
  'use strict';

  angular.module('jokumuuApp')
    .controller('JobController', JobController);

  JobController.$inject = ['jobService', 'logger'];

  function JobController(jobService, logger) {
    var vm = this;

    vm.jobs = [{name: 'initial'}];
    vm.listJobs = listJobs;
    vm.viewJob = viewJob;
    vm.addJob = addJob;
    vm.deleteJob = deleteJob;
    vm.applyJob = applyJob;

    activate();

    function activate() {
      logger.info('JobController activated');
      listJobs();
    }

    function listJobs() {
      jobService.listJobs()
        .then(function (jobs) {
          vm.jobs = jobs;
        }, function (err) {
          vm.jobs = err;
        });
    }

    function viewJob(job) {
      logger.info('JobController viewJob');
      jobService.viewJob(job);
    }

    function addJob(job) {
      logger.info('JobController addJob');
      jobService.addJob(job);
    }

    function deleteJob(job) {
      logger.info('JobController deleteJob');
      jobService.deleteJob(job);
    }

    function applyJob(job) {
      logger.info('JobController applyJob');
      jobService.addJob(job);
    }
  }
})();
