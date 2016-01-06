/*global angular */

(function () {
    "use strict";

    angular.module('myApp.services', ['ngResource'])

        .factory('countriesService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'query': {method: 'GET', isArray: true}
                    },
                    db = {};
                // Rest url to server
                db.countries = $resource("/api/countries/:_id", {}, actions);
                return db;
            }
        ])

        .factory('locationsService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true},
                        'update': {method: 'PUT'},
                        'delete': {method: 'DELETE'}
                    },
                    db = {};
                // Rest url to server
                db.locations = $resource("/api/locations/:_id", {}, actions);
                return db;
            }
        ])

        .factory('locationService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'query': {method: 'GET', isArray: true}
                    },
                    db = {};
                // Rest url to server
                db.locations = $resource("/api/location/:countryId", {}, actions);
                return db;
            }
        ])

        .factory('hotelsService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true},
                        'update': {method: 'PUT'},
                        'delete': {method: 'DELETE'}
                    },
                    db = {};
                // Rest url to server
                db.hotels = $resource("/api/hotels/:_id", {}, actions);
                return db;
            }
        ])

        .factory('hotelsConsumerService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'query': {method: 'GET', isArray: true}
                    },
                    db = {};
                // Rest url to server
                db.hotels = $resource("/api/hotels-from-location/:locationId", {}, actions);
                return db;
            }
        ])

        .factory('saveDataService', function() {
            var savedData = {};

            function set(data) {
                savedData = data;
            }
            function get() {
                return savedData;
            }

            return {
                set: set,
                get: get
            };

        })

        .factory('bookingsService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true}
                    },
                    db = {};
                // Rest url to server
                db.bookings = $resource("/api/bookings/:hotelId", {}, actions);
                return db;
            }
        ])

        .factory('arrangementsService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'get': {method: 'GET'},
                        'save': {method: 'POST'},
                        'query': {method: 'GET', isArray: true},
                        'update': {method: 'PUT'},
                        'delete': {method: 'DELETE'}
                    },
                    db = {};
                // Rest url to server
                db.arrangements = $resource("/api/arrangements/:_id/:hotelId", {}, actions);
                return db;
            }
        ])

        .factory('arrangementService', ['$resource', '$http',

            function ($resource) {
                var actions = {
                        'get': {method: 'GET'}
                    },
                    db = {};
                // Rest url to server
                db.arrangements = $resource("/api/arrangement/:_id", {}, actions);
                return db;
            }
        ]);

}());

