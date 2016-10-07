var app = angular.module('admin', ['ngMaterial']);
app.controller('adminController', ['$scope', '$http', '$location', '$mdDialog', function ($scope, $http, $location, $mdDialog) {

$scope.customerHeaders = [{"name":'Id'},{"name":'Customer name'},{"name":'Password'}];
var path = 'http://' + $location.host() + ':' + $location.port() + '/CouponSystemWeb/rest/adminService'; 
    
$scope.getAllCustomer = function() {
$http({
  url: path + '/getAllCustomer', 
  method: 'GET',  
    content: 'application/json',
    accepts: 'application/json'
  }).success(function(response) {
     $scope.customerList = response;

}).error(function(response) {
     console.log("error occurred."); 
   });
}

$scope.updateCustomer = function(customer) {
 $http({
  url: path + '/updateCustomer/', 
  method: 'PUT',  
    data: customer,
    accepts: 'text/plain'
  }).success(function(response) {
     console.log(response); 
     console.log(customer);

}).error(function(response) {
     console.log("error occurred."); 
     console.log(customer);
   });   
}

}]);
