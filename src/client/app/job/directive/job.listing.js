angular.module('jokumuuApp')
    .directive('jobListing', function () {
        return {
            restrict: 'E',
            templateUrl: 'app/job/directive/job.listing.html', 
            link: function(scope, elem, attrs) {
                elem.bind('mouseover', function() {
                    elem.css('background-color', 'yellow');
                });
            }
        };
    });
