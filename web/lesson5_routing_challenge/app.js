(function(){
    var app = angular.module("githubViewer", ["ngRoute"]);

    app.config(function($routeProvider){

        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .when("/user/:username", {
                templateUrl: "user.html",
                controller: "UserController"
            })
            .when("/githubOneRepo/:repoName", {
                templateUrl: "githubOneRepo.html",
                controller: "GithubOneRepoController"
            })
            .otherwise({redirectTo: "/main"});
    });

}());