/*jslint node: true */
/*globals myApp, hotelsService */

function HomeCtrl($scope, countriesService) {
    "use strict";

    $scope.countries = countriesService.countries.get();
}

function LocationCtrl($scope, $location, $routeParams, locationService) {
    "use strict";

    $scope.locations = locationService.locations.get({countryId: $routeParams.countryId});

    $scope.goToHotels = function (id) {
        $location.path('hotelfromlocation/' + id);
    };
}

function HotelConsumerListCtrl($scope, $routeParams, hotelsConsumerService) {
    "use strict";

    $scope.hotels = hotelsConsumerService.hotels.get({locationId: $routeParams.locationId});
}

function HotelListCtrl($scope, hotelsService) {
    "use strict";

    $scope.hotels = hotelsService.hotels.get();
}

function HotelConsumerDetailCtrl($scope, $routeParams, $location, hotelsService, locationsService, arrangementsService, saveDataService) {
    "use strict";

    if ($routeParams._id !== 0) {
        $scope.hotels = hotelsService.hotels.get({_id: $routeParams._id}, function () {

            $scope.locations = locationsService.locations.get({_id: $scope.hotels.doc.locationId});
            $scope.arrangements = arrangementsService.arrangements.get({hotelId: $scope.hotels.doc._id});
        });
    }

    $scope.nPersons = 0;
    $scope.nNights = 0;

    $scope.calculateTotal = function (nPersons, nNights, startDate, arrangement) {
        if (nPersons !== 0 && nNights !== 0 && startDate !== undefined) {
            var bookingData = {
                nPersons: nPersons,
                nDays: nNights,
                startDate: startDate,
                totalPrice: nPersons * nNights * arrangement.pricePPPN,
                hotelId: arrangement.hotelId,
                arrangementName: arrangement.arrangementName,
                personName: ''
            };

            saveDataService.set(bookingData);
            $location.path("/payment");
            console.log(bookingData);
        } else {
            $scope.errorMessage = true;
        }
    };
}

function PlaceBookingCtrl($scope, $location, saveDataService, bookingsService) {
    "use strict";

    $scope.data = saveDataService.get();

    $scope.placeBooking = function () {
        console.log($scope.data);
        bookingsService.bookings.save({}, $scope.data, function (res) {
            console.log(res);
            if (res.err === null) {
                $location.path("/home");
            }
        });
    };
}

function HotelDetailCtrl($scope, $routeParams, $location, hotelsService, locationsService, arrangementsService, bookingsService) {
    "use strict";
    // GET 1 book

    if ($routeParams._id !== 0) {
        $scope.hotels = hotelsService.hotels.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
            if ($routeParams._id !== "new") {
                $scope.arrangements = arrangementsService.arrangements.get({hotelId: $scope.hotels.doc._id});
                $scope.bookings = bookingsService.bookings.get({hotelId: $scope.hotels.doc._id}, function() {
                    var brutoOmzet = 0,
                        totalPersons = 0;

                    $scope.arrangementsStatistics = [];

                    $scope.bookings.doc.forEach(function (value, i) {
                        brutoOmzet += value.totalPrice;
                        totalPersons += value.nPersons;
                    });

                    $scope.arrangements.doc.forEach(function (value, i) {
                        var nPersonArragenement  = 0;

                        $scope.bookings.doc.forEach(function (valueBookings, j) {
                            if (valueBookings.arrangementName === value.arrangementName) { //should make this Id
                                nPersonArragenement += valueBookings.nPersons;
                            }
                        });

                        $scope.arrangementsStatistics.push({arrangementName: value.arrangementName, nPersonArrangement : nPersonArragenement});
                    });

                    $scope.totalPersons = totalPersons;
                    $scope.brutoOmzet = brutoOmzet;
                });


            }
        });

        $scope.locations = locationsService.locations.get({}, function () {
            console.log($scope.locations);

            if ($scope.locations.doc !== null) {
                var options = [],
                    selectedOption;

                $scope.locations.doc.forEach(function (value, i) {
                    options.push({name : value.locationName, id : value._id});

                    if ($scope.hotels.doc !== undefined && value._id === $scope.hotels.doc.locationId) {
                        selectedOption = i;
                    }
                });

                $scope.options = options;
                $scope.selectedOption = $scope.options[selectedOption];
            }
        });
    }

    // DELETE hotel
    $scope.delete = function () {
        hotelsService.hotels.delete({_id: $routeParams._id});
        $location.path("/hotels");
    };

    // CREATE, UPDATE hotel
    $scope.save = function () {
        if ($scope.hotelForm.$valid) {
            $scope.hotels.doc.locationId = $scope.selectedOption.id;

            if ($scope.hotels.doc && $scope.hotels.doc._id !== undefined) {
                console.log('Entering update');
                hotelsService.hotels.update({_id: $scope.hotels.doc._id}, $scope.hotels.doc, function (res) {
                    console.log(res);
                    $location.path("/hotels");
                });
            } else {
                console.log('Entering save');
                hotelsService.hotels.save({}, $scope.hotels.doc, function (res) {
                    console.log(res);
                    $location.path("/hotels");
                });
            }
        } else {
            $scope.errorMessage = true;
        }
    };

}

function ArrangementDetailCtrl($scope, $routeParams, $location, arrangementsService, arrangementService) {
    "use strict";
    // GET 1 book

    if ($routeParams._id !== 0) {
        $scope.arrangements = arrangementService.arrangements.get({_id: $routeParams._id}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }

    // DELETE arrangement
    $scope.delete = function () {
        arrangementsService.arrangements.delete({_id: $routeParams._id});
        $location.path("/arrangements");
    };

    // CREATE, UPDATE arrangement
    $scope.save = function () {
        if ($scope.arrangementForm.$valid) {
            if ($scope.arrangements.doc && $scope.arrangements.doc._id !== undefined) {
                console.log('Entering update');
                arrangementsService.arrangements.update({_id: $scope.arrangements.doc._id}, $scope.arrangements.doc, function (res) {
                    console.log(res);
                    window.history.back();
                });
            } else {
                $scope.arrangements.doc.hotelId = $routeParams.hotelId;
                console.log('Entering save');
                arrangementsService.arrangements.save({}, $scope.arrangements.doc, function (res) {
                    console.log(res);
                    window.history.back();
                });
            }
        } else {
            $scope.errorMessage = true;
        }
    };

}

myApp.controller('myCtrl', function ($scope, $location) {
    "use strict";

    $scope.goToConsumer = function () {
        $location.path("/home");
    };

    $scope.goToWorker = function () {
        $location.path("/hotels");
    };

    $scope.whoami = "Mees";
});