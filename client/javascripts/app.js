/*global angular, HotelListCtrl, HotelDetailCtrl, ArrangementDetailCtrl, HomeCtrl, LocationCtrl, HotelConsumerListCtrl, HotelConsumerDetailCtrl, PlaceBookingCtrl */

/**
 * @see http://docs.angularjs.org/guide/concepts
 */
var myApp = angular.module('myApp', ['myApp.services', 'ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        'use strict';

        // Get all countries
        $routeProvider.when('/home', {
            templateUrl: 'partials/home.html',
            controller: HomeCtrl
        });

        // Get locations from a country
        $routeProvider.when('/locations/:countryId', {
            templateUrl: 'partials/location-country-list.html',
            controller: LocationCtrl
        });

        // Get hotels from a location
        $routeProvider.when('/hotelfromlocation/:locationId', {
            templateUrl: 'partials/hotel-consumer-list.html',
            controller: HotelConsumerListCtrl
        });

        // Get hotel for consumer
        $routeProvider.when('/hotel/:_id', {
            templateUrl: 'partials/hotel-consumer-detail.html',
            controller: HotelConsumerDetailCtrl
        });

        // Get all hotels
        $routeProvider.when('/payment', {
            templateUrl: 'partials/payment-booking.html',
            controller: PlaceBookingCtrl
        });

        // Get all hotels
        $routeProvider.when('/hotels', {
            templateUrl: 'partials/hotel-list.html',
            controller: HotelListCtrl
        });

        // Operations on 1 hotel
        $routeProvider.when('/hotels/:_id', {
            templateUrl: 'partials/hotel-detail.html',
            controller: HotelDetailCtrl
        });

        // Operations on new arrangement
        $routeProvider.when('/arrangements/new/:hotelId', {
            templateUrl: 'partials/arrangement-detail.html',
            controller: ArrangementDetailCtrl
        });

        // Operations on 1 arrangement
        $routeProvider.when('/arrangements/:_id', {
            templateUrl: 'partials/arrangement-detail.html',
            controller: ArrangementDetailCtrl
        });

        //reddirect
        $routeProvider.otherwise({
            redirectTo: "/home"
        });

    }]);
