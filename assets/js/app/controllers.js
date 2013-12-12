define(['angular','app/controllers/cart','app/controllers/listing','app/controllers/query','services/Aws'], function (angular, CartController, ListingController, QueryController) {
        'use strict';

        /* Controllers */
        return angular.module('app.controllers', ['app.AwsService'])
        
        // Cart Controller, all logic for the cart goes into the model for the cart
        .controller('CartController', ['$scope', CartController])

        .controller('ListingController', ['$scope','Aws', ListingController])

        .controller('QueryController', ['$scope', 'Aws', QueryController]);

});