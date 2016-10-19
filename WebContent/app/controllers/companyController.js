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
	            dt: new Date($scope.couponList[i].endDate),
	            status: false
	        	
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
		     $scope.openToast(response.message)
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
	
	$scope.updateCoupon = function(coupon,indx) {	

		 $mdDateLocale.formatDateLocal = function(date) {
			    var day = date.getDate();
			    var monthIndex = date.getMonth();
			    var year = date.getFullYear();

			    return year + '-' + (monthIndex + 1) + '-' + day + 'T00:00';
		};  
		
		coupon.endDate = $mdDateLocale.formatDateLocal($scope.dataMod[indx].dt)
		
		 $http({
		  url: path + '/updateCoupon/', 
		  method: 'PUT',  
		    data: coupon,
		    accepts: 'text/plain'
		  }).success(function(response) {
		     console.log(response); 
		     console.log(coupon);
			 $scope.openToast(coupon.title + " was updated")
		     $scope.response = response;

		}).error(function(response) {
		     console.log("error occurred."); 
		     console.log(response);
		     $scope.openToast(response.message)
		     $scope.response = response;
		   });   
		 
		}
	
	/* TODO: Add dialog with success option which remove the row in case remove done successfully
	$scope.removeCoupon = function(coupon) {	
		 return $http({
		  url: path + '/removeCoupon/', 
		  method: 'DELETE',  
		    data: coupon,
		    content: 'application/json',
		    accepts: 'text/plain'
		  }).success(function(response) {
			 $scope.openToast(coupon.title + ' was removed');
		     console.log(response); 
		     console.log(coupon); 

		}).error(function(response) {
		     console.log("error occurred."); 
		     console.log(coupon);
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

app.config(function($mdDateLocaleProvider) {

	 $mdDateLocaleProvider.formatDate = function(date) {
		    var day = date.getDate();
		    var monthIndex = date.getMonth();
		    var year = date.getFullYear();

		    return year + '-' + (monthIndex + 1) + '-' + day;
	    };
	})
	
	// allow angularjs to send for DELETE JSON format
app.config(function($httpProvider) {
	  /**
	   * make delete type json
	   */
	  $httpProvider.defaults.headers["delete"] = {
	    'Content-Type': 'application/json;charset=utf-8'
	  };
	})
	
