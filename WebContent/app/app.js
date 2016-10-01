/**
 * 
 */
/*global angular */
var app = angular.module('login', []);
app.controller("loginController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

$scope.login = function() {
    $http({
        url: 'http://localhost:8080/CouponSystemWeb/rest/customerService/login?user=Bill Joe&password=bj',
        method: 'POST'
    }).success(function(response){
        $scope.test = response;
        $window.location.href = "http://" + $location.host() + ":" + $location.port() + "/CouponSystemWeb/views/customer.html";
        /* "/customer.html"; */
    })
        .error(function(response){console.log("error occurred."); 
                                 });
}

$scope.logout = function() {
    $http({
        url: 'http://localhost:8080/CouponSystemWeb/rest/customerService/logout',
        method: 'POST'
    }).success(function(response) {
        $scope.test = response;
    }).error(function (response) {console.log("error occurred."); 
                                 });
}

}]);

