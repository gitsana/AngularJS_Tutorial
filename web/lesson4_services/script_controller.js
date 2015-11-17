/*
* Making modules to avoid cluttering the global namespace
* */
(function () { // using IFFE pattern

    'use strict';
    // module definition in its own file (app.js)
    // STEP 1 - create the module with a name
    var app = angular.module("githubViewer", []); // [] = dependencies for this module

    // controller definitions, each in their own js files (mainController.js, mainController2.js)
    var MainController = function ($scope, githubService, $interval, $log, $anchorScroll, $location) { // removed $http

        var onUserComplete = function (data) {
            $scope.user = data;    // Angular is automatically converting this data from JSON array to JS object
            githubService.getRepos($scope.user)
                .then(onRepos, onError);
        };

        var onRepos = function(data) {
            $scope.repos = data;
            $location.hash("userDetails"); // this is the id of the HTML tag you want to anchor-scroll to
            $anchorScroll(); // this method can be invoked itself
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data";
        };

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
            $log.info("We are searching for username: " + username);
            githubService.getUser(username)
                .then(onUserComplete, onError);     // ".then" is the promise, and it only invokes the first parameter if it's SUCCESSFUL. invoke second parameter if there's an error. "onError" is optional
            if(countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null; // stop the countdown if user has already searched and countdown is still going on
            }
        };

        $scope.username = "angular"; // initialize variable
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = '+stargazers_count';
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

