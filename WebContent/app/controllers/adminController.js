var app = angular.module('admin', ['ngMaterial','md.data.table']);
app.controller('adminController', ['$scope', '$http', '$location', '$mdDialog', '$mdToast', function ($scope, $http, $location, $mdDialog, $mdToast) {

$scope.customerHeaders = [{"name":'Id'},{"name":'Customer name'},{"name":'Password'}];
$scope.companyHeaders = [{"name":'Id'},{"name":'Company name'},{"name":'Password'},{"name":'email'}];

var path = 'http://' + $location.host() + ':' + $location.port() + '/CouponSystemWeb/rest/adminService'; 


/* Customer section */
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
     $scope.response = response;

}).error(function(response) {
     console.log("error occurred."); 
     console.log(customer);
     $scope.response = response;
   });   
 
}

/* Company section */

$scope.getAllCompanies = function() {
	$http({
	  url: path + '/getAllCompanies', 
	  method: 'GET',  
	    content: 'application/json',
	    accepts: 'application/json'
	  }).success(function(response) {
	     $scope.companyList = response;

	}).error(function(response) {
	     console.log("error occurred."); 
	   });
	}

/* Toast affect function */
  $scope.openToast = function(msg) {
      $mdToast.show(
              $mdToast.simple()
                 .textContent(msg)                       
                 .hideDelay(3000)
           );
	  };
  
}]);
