define(['angular', 'app/main','angularRoute'], function(angular, app) {
        'use strict';
        return app.config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/index', {
                        templateUrl: 'assets/js/app/views/app.html'
                });
                $routeProvider.otherwise({redirectTo: '/index'});
        }]);

});