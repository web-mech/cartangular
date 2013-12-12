define(['angular', 'app/main','angularRoute'], function(angular, app) {
        'use strict';
        return app.config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/index', {
                        templateUrl: 'assets/js/app/views/listing.html'
                });
                $routeProvider.otherwise({redirectTo: '/index'});
        }]);

});