/* global toastr:false, moment:false */
(function () {
    'use strict';

    angular
        .module('core')
        .constant('moment', moment)
        .constant('toastr', toastr);
})();
