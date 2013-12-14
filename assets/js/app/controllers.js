define(['angular','app/controllers/Cart','app/controllers/Listing','app/controllers/Query','services/Aws'], function (angular, CartController, ListingController, QueryController) {
        'use strict';

        /* Controllers */
        return angular.module('app.controllers', ['app.AwsService'])
        
        // Cart Controller, all logic for the cart goes into the model for the cart
        .controller('CartController', ['$scope', CartController])
        //listing controller, displays products in a grid. receives responses from the aws service.
        .controller('ListingController', ['$scope','Aws', ListingController])
        //query controller, sends requests to the aws service
        .controller('QueryController', ['$scope', 'Aws', QueryController]);

});