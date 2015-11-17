(function() { // IFFE

    var githubService = function($http) {
        var getUser = function(username) {
            return $http.get("https://api.github.com/users/" + username)
                .then(function (response) {
                    return response.data;
                });
        };

        var getRepos = function(user) {
            return $http.get(user.repos_url)
                .then(function(response){
                    return response.data;
                });
        };

        return {
            getUser: getUser,
            getRepos: getRepos
        };
    };

    // get ref to githubviewer
    var module = angular.module("githubViewer"); // no second param of "[]" bc not creating a module, only getting
    //reference to already existing module, not creating/registering a module

    // register the service
    module.factory("githubService", githubService);

}());