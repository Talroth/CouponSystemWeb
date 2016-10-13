var app = angular.module('company', ['ngMaterial','md.data.table']);
app.controller('companyController', ['$scope', '$http', '$location', '$mdDialog', '$mdToast','$rootScope','$timeout','$mdDateLocale', function ($scope, $http, $location, $mdDialog, $mdToast, $rootScope,$timeout,$mdDateLocale) {
	$scope.couponHeaders = [{"name" : 'Id'},{"name" : 'Title'},{"name" : 'Start Date'},{"name" : 'End Date'},{"name" : 'Amount'},{"name" : 'Coupon Type'},{"name" : 'Message'}, {"name" : 'Price'}];
	var path = 'http://' + $location.host() + ':' + $location.port() + '/CouponSystemWeb/rest/companyService'; 
	
	$scope.init = function() {
	$scope.getAllCoupons().then(function(response){
		$scope.couponList = response.data;
		$scope.dataMod = [];
	    for (i = 0; i < $scope.couponList.length; i += 1) {
	        $scope.dataMod.push({
	            dt: new Date($scope.couponList[i].endDate)
	        });
	    }
	},function(error) {});
	
	$scope.getCompanyDetails().then(function(response){
		$scope.companyDetails = response.data;
	}, function(error) {})
	

	}
	

	
	
	$scope.getAllCoupons = function() {
		return $http({
		  url: path + '/getAllCoupons', 
		  method: 'GET',  
		    content: 'application/json',
		    accepts: 'application/json'
		  }).success(function(response) {
		     console.log("ok");
		     console.log(response);

		}).error(function(response) {
		     console.log("error occurred."); 
		   });
		}
	
	$scope.getCompanyDetails = function() {
		return $http({
		  url: path + '/getCompanyDetails', 
		  method: 'GET',  
		    content: 'application/json',
		    accepts: 'application/json'
		  }).success(function(response) {
		     console.log("ok");
		     console.log(response);

		}).error(function(response) {
		     console.log("error occurred."); 
		   });
		}
}]);

app.config(function($mdDateLocaleProvider) {

	$mdDateLocaleProvider.months = ['janvier', 'février', 'mars','-4-','-5-','-6-','-7-','-8-','-9-','-10-','-11-','-12-'];
	})
	
