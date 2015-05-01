/* jshint -W117, -W030 */
'use strict';

describe('JobController', function() {


  var JobCtrl;
//  var scope;

  function toastrMock() {
    var toastr = {
      options: {
      positionClass: 'toast-bottom-right',
      backgroundpositionClass: 'toast-bottom-right'
      },
      info: function () {},
      error: function () {}
    };
    return toastr;
  }

  beforeEach(module('jokumuuApp'));

  beforeEach(bard.appModule('core'));
//  beforeEach(function() {
//    module('core');
//    module(function ($provide) {
//        $provide.value('toastr', toastrMock);
//    });
//  });

  beforeEach(inject(function ($controller, $rootScope) {
    var scope = $rootScope.$new();
    JobCtrl = $controller('JobCtrl', {
      vm: scope
    });
  }));

  it ('should exist', function () {
    expect(JobCtrl).isDefined;
  });

});
