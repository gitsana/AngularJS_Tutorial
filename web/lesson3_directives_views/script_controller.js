/*
* Making modules to avoid cluttering the global namespace
* */
(function () { // using IFFE pattern

    // module definition in its own file (app.js)
    // STEP 1 - create the module with a name
    var app = angular.module("githubViewer", []);

    // controller definitions, each in their own js files (mainController.js, mainController2.js)
    var MainController = function ($scope, $http) {

        var onUserComplete = function (response) {
            $scope.user = response.data;    // Angular is automatically converting this data from JSON array to JS object
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the user";
        };

        $scope.search = function(username) {    // getting username from the user in the view (html page)
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);     // ".then" is the promise, and it only invokes the first parameter if it's SUCCESSFUL
                                                    // invoke second parameter if there's an error. "onError" is optional
        };

        $scope.username = "angular";
        $scope.message = "GitHub Viewer";
    };

    // STEP 2 - register the controllers in the module
    app.controller("MainController", MainController);

    // STEP 3 - [put ng-app="githubViewer" into HTML page]

}());

