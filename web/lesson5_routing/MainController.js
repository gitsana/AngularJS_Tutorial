/*
* Making modules to avoid cluttering the global namespace
* */
(function () { // using IFFE pattern

    'use strict';
    // module definition in its own file (app.js)
    // STEP 1 - create the module with a name
    var app = angular.module("githubViewer"); // [] = dependencies for this module

    // controller definitions, each in their own js files (mainController.js, mainController2.js)
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
            //
        };

        $scope.username = "angular"; // initialize variable
        $scope.countdown = 5;
        startCountdown();
    };

    // STEP 2 - register the controllers in the module
    /* for bigger project, when minifying for browswer quickness, put all services ($ ones) in an array with
    * MainController at the END of the array. Example: */
    //app.controller("MainController", ["$scope", "$http", "$interval", MainController]);
    app.controller("MainController", MainController); // when NOT minifying code, this line is fine

    // STEP 3 - [put ng-app="githubViewer" into HTML page]

}());

