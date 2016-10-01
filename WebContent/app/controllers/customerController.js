
var app = angular.module('customer', []);
app.controller('customerController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

var path = 'http://' + $location.host() + ':' + $location.port() + '/CouponSystemWeb/rest/customerService';    
$scope.init = function() {
    this.getAllCoupons();
}   

$scope.getAllCoupons = function() {
$http({
  url: path + '/getAllCoupons', 
  method: 'GET',  
    accepts: 'application/json'
  }).success(function(response) {
     $scope.couponList = response;

}).error(function(response) {
     console.log("error occurred."); 
   });
}

$scope.getCoupon = function(id) {
$http({
  url: path + '/getCoupon/' + id, 
  method: 'GET',  
    accepts: 'application/json'
  }).success(function(response) {
     $scope.couponList = response;

}).error(function(response) {
     console.log("error occurred."); 
   });
}

$scope.getAllPurchasedCoupons = function() {
$http({
  url: path + '/getAllPurchasedCoupons', 
  method: 'GET',  
    accepts: 'application/json'
  }).success(function(response) {
     $scope.couponList = response;

}).error(function(response) {
     console.log("error occurred."); 
   });
}

$scope.getAllPurchasedCouponsByType = function(couponType) {
$http({
  url: path + '/getAllPurchasedCouponsByType/' + couponType, 
  method: 'GET',  
    accepts: 'application/json'
  }).success(function(response) {
     $scope.couponList = response;

}).error(function(response) {
     console.log("error occurred."); 
   });
}

$scope.getAllPurchasedCouponsByPrice = function(price) {
$http({
  url: path + '/getAllPurchasedCouponsByPrice/' + price, 
  method: 'GET',  
    content: 'application/json',
    accepts: 'application/json'
  }).success(function(response) {
     $scope.couponList = response;

}).error(function(response) {
     console.log("error occurred."); 
   });
}

$scope.purchaseCoupon = function(coupon) {
$http({
  url: path + '/purchaseCoupon/', 
  method: 'POST',  
    data: coupon,
    accepts: 'text/plain'
  }).success(function(response) {
     console.log(response); 

}).error(function(response) {
     console.log("error occurred."); 
   });
}

$scope.getUserName = function() {
$http({
  url: path + '/getUserName/', 
  method: 'GET',  
    accepts: 'text/plain'
  }).success(function(response) {
    console.log(response);
    return response;
      

}).error(function(response) {
     console.log("error occurred."); 
   });
}

}]);
                                   
