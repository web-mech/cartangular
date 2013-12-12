require( ['angular','app/main','app/routes','bootstrap'], function(angular, app, routes) {
        'use strict';
        
        var $html = angular.element(document.getElementsByTagName('html')[0]);
        
        angular.element().ready(function() {
                angular.resumeBootstrap([app.name]);
        });
});