var app = angular.module('admin', ['ngMaterial','md.data.table']);
app.controller('adminController', ['$scope', '$http', '$location', '$mdDialog', '$mdToast','$rootScope','$timeout', function ($scope, $http, $location, $mdDialog, $mdToast, $rootScope,$timeout) {

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

$scope.removeCustomer = function(customer) {	
	 $http({
	  url: path + '/removeCustomer/', 
	  method: 'DELETE',  
	    data: customer,
	    content: 'application/json',
	    accepts: 'text/plain'
	  }).success(function(response) {
	     console.log(response); 
	     console.log(customer); 

	}).error(function(response) {
	     console.log("error occurred."); 
	     console.log(customer);
	   });   
	 
	}

/* need to put 'return' at the beginning in order to use promise later */
$scope.createCustomer = function(customer) {	
	 return $http({
	  url: path + '/createCustomer', 
	  method: 'POST',  
	    data: customer,
	    accepts: 'application/json'
	  }).success(function(response) {
	     console.log("response from createCustomer: " + response.id); 
	     console.log("customer from createCustomer: " + customer.id);
	     console.log("data: " + response.id); 
	     
	}).error(function(response) {
	     console.log("error occurred."); 
	     console.log(customer);
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


 
/* Dialog */


  $scope.showDialog = function($event) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
        parent: parentEl,
        scope: $scope,
        preserveScope: true,
        targetEvent: $event,
        template:
          '<md-dialog aria-label="List dialog">' +
          '  <md-dialog-content>'+
      	'<md-input-container class="md-block" flex-gt-sm>' +
          '<label>New customer name</label>' +
          '<input ng-model="newCustName">' +
          '</md-input-container>' +
          '<md-input-container class="md-block" flex-gt-sm>' +
          '<label>New customer password</label>' +
          '<input ng-model="newCustPassword">' +
          '</md-input-container>' +
          '  </md-dialog-content>' +
          '  <md-dialog-actions>' +
          '    <md-button ng-click="closeDialog()" class="md-primary">' +
          '      Close Dialog' +
          '    </md-button>' +
          '    <md-button ng-click="Add(newCustName,newCustPassword)" class="md-primary">' +
          '      Add' +
          '    </md-button>' +
          '  </md-dialog-actions>' +
          '</md-dialog>',

        controller: DialogController
     })
     
      
     function DialogController($scope, $mdDialog) {

	      
       $scope.closeDialog = function() {
         $mdDialog.hide();
       }
       $scope.Add = function(newCustName,newCustPassword)
       {
    	      this.newLocalCustomer = {custName : newCustName, password : newCustPassword, id : '0'}; 
    	      console.log("+ " + this.newLocalCustomer.custName + "," + this.newLocalCustomer.password);
    	         	       
    	      	  $scope.createCustomer(this.newLocalCustomer).then(function(response) {
    	      		  $scope.customerList = $scope.customerList.concat(response.data);	
    	      	  });

    	   $mdDialog.hide(); 
    	   
       }
	       $scope.newCustPassword = '';
  	       $scope.newCustName = ''; 
   }
            
 }

 /* Delete customer dialog */


  
	  $scope.removeCustomerDialog = function($event, customerIndex, customer, customers) {
	      var parentEl = angular.element(document.body);
	      $mdDialog.show({
	        parent: parentEl,
	        scope: $scope,
	        preserveScope: true,
	        targetEvent: $event,
	        template:
	          '<md-dialog aria-label="List dialog">' +
	          '  <md-dialog-content>'+
	      	'<md-input-container class="md-block" flex-gt-sm>' +
	          '<label>Would you like to delete the customer?</label>' +
	          '  <md-dialog-actions>' +
	          '    <md-button ng-click="closeDialog()" class="md-primary">' +
	          '      No' +
	          '    </md-button>' +
	          '    <md-button ng-click="Remove()" class="md-primary">' +
	          '      Yes' +
	          '    </md-button>' +
	          '  </md-dialog-actions>' +
	          '</md-dialog>',
	        controller: DialogController
	     })
	     
	      
	     function DialogController($scope, $mdDialog) {

		      
	       $scope.closeDialog = function() {
	         $mdDialog.hide();
	       }
	       $scope.Remove = function()
	       {
	    	  this.plannedRemoveCustomer = "{\"custName\" : \"" + customer.custName + "\", \"password\" : \"" + customer.password + "\", \"id\" : \"" + customer.id.toString() + "\"}"; 
	 	      console.log("-`-`-`");
		      console.log(this.plannedRemoveCustomer);
		      console.log("-`-`-`");
		      $scope.removeCustomer(this.plannedRemoveCustomer);
		      customers.splice(customerIndex,1);
	    	  $mdDialog.hide(); 
	    	   
	       }

	   }
	            
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

// allow angularjs to send for DELETE JSON format
app.config(function($httpProvider) {
	  /**
	   * make delete type json
	   */
	  $httpProvider.defaults.headers["delete"] = {
	    'Content-Type': 'application/json;charset=utf-8'
	  };
	})
