(function() {
    'use strict';
    var app = angular.module("githubViewer");

    var GithubOneRepoController = function($scope, $routeParams) {

        //$scope.repoName = $routeParams.repoName;
        $scope.repoNameTest = "Test REPO NAME";
        $scope.repoName = $routeParams.repoName;
        //$scope.contributors; // make a service that gets these contributors
    };

    app.controller("GithubOneRepoController", GithubOneRepoController);
}());