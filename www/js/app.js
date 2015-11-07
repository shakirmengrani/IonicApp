// angular.module is a global place for creating, registering and retrieving Angular modules
// 'directory' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'directory.services' is found in services.js
// 'directory.controllers' is found in controllers.js
angular.module('directory', ['ionic', 'directory.controllers'])


    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('employee-index', {
                url: '/employees',
                templateUrl: 'templates/login.html',
                controller: 'EmployeeIndexCtrl'
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/employees');

    });
// Controller
angular.module('directory.controllers', ['firebase'])

    .controller('EmployeeIndexCtrl', function ($scope, $http, $ionicPopup, $timeout,$firebase) {

        var DB = new Firebase("https://76dev.firebaseio.com/user");
        //var username = window.sessionStorage.getItem("Username");
        var sync = $firebase(DB.child("admin"));
        $scope.Data = sync.$asObject();
        // An alert dialog
        var showAlert = function (title, template) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: template
            });
            alertPopup.then(function (res) {

            });

        };
        showAlert("myFirstApp", "<h1>Welcome</h1>");

        $scope.Login = function (Username, Password) {
            if (Username == "admin" && Password == "admin") {
                showAlert("myFirstApp", "Welcome, user  <br> <img src='" + $scope.Data.imageurl + "' alt='loading.....'/>");
            } else {
                showAlert("myFirstApp", "Please Try Again");
            }
        };

    });