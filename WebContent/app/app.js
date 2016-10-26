/**
 * 
 */
/*global angular */
var app = angular.module('login', ['ngMaterial']);
app.controller("loginController", ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

$scope.login = function() {
    $http({
        /* url: 'http://localhost:8080/CouponSystemWeb/rest/customerService/login?user=Bill Joe&password=bj', */ 
         url: 'http://localhost:8088/CouponSystemWeb/rest/adminService/login?user=admin&password=1234',     
       /*   url: 'http://localhost:8080/CouponSystemWeb/rest/companyService/login?user=McHoland&password=f12e12', */  
        method: 'POST'
    }).success(function(response){
        $scope.test = response;
      /*  $window.location.href = "http://" + $location.host() + ":" + $location.port() + "/CouponSystemWeb/views/customer.html"; */ 
        $window.location.href = "http://" + $location.host() + ":" + $location.port() + "/CouponSystemWeb/views/admin.html";     
      /*    $window.location.href = "http://" + $location.host() + ":" + $location.port() + "/CouponSystemWeb/views/company.html"; */  
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

