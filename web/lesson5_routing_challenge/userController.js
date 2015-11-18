(function () { // using IFFE pattern

    'use strict';

    var app = angular.module("githubViewer");

    var UserController = function ($scope, githubService, $routeParams) {

        var onUserComplete = function (data) {
            $scope.user = data;
            githubService.getRepos($scope.user)
                .then(onRepos, onError);
        };

        var onRepos = function(data) {
            $scope.repos = data;
        };

        var onError = function (reason) {
            $scope.error = "Could not fetch the data";
        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = '+stargazers_count';
        githubService.getUser($scope.username).then(onUserComplete, onError);
    };

    app.controller("UserController", UserController);

}());

