(function () {

    'use strict';

    var app = angular.module("githubViewer");

    var MainController = function ($scope, $interval, $location) {

        var decrementCountdown = function () {
            $scope.countdown -= 1;
            if($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        };

        var countdownInterval = null;

        var startCountdown = function () {
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown); // interval will return an object, save it then use it later to CANCEL the interval
        };

        $scope.search = function(username) {    // getting username from the user in the view (html page)
            if(countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null; // stop the countdown if user has already searched and countdown is still going on
            }
            // location service
            $location.path("/user/" + username); // changes the client fragment to #/user/<some_user>
        };

        $scope.username = "angular"; // initialize variable
        $scope.countdown = 5;
        startCountdown();
    };

    app.controller("MainController", MainController);

}());

