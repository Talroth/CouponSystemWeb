
var app = angular.module('customer', ['ngMaterial']);
app.controller('customerController', ['$scope', '$http', '$location', '$mdDialog', function ($scope, $http, $location, $mdDialog) {

var path = 'http://' + $location.host() + ':' + $location.port() + '/CouponSystemWeb/rest/customerService';    
$scope.init = function() {
    $scope.isAll = false;
    $scope.switchTitle = "Gel all coupons"
    
    $scope.couponList = 
       [
  {
    "startDate": "2016-10-20T00:00",
    "endDate": "2017-01-20T00:00",
    "amount": 1000,
    "id": 67,
    "image": "subway.png",
    "message": "mmm.....",
    "price": 9.9,
    "title": "50% sandwich on the morning",
    "type": "FOOD"
  },
  {
    "startDate": "2016-10-08T00:00",
    "endDate": "2017-12-08T00:00",
    "amount": 67,
    "id": 87,
    "image": "burger.jpg",
    "message": "The best BURGER in the world",
    "price": 34.2,
    "title": "1/2 price burger2",
    "type": "FOOD"
  },
  {
    "startDate": "2016-10-08T00:00",
    "endDate": "2017-12-08T00:00",
    "amount": 8,
    "id": 88,
    "image": "coke.jpg",
    "message": "So natrual",
    "price": 1.25,
    "title": "Coke",
    "type": "FOOD"
  },
  {
    "startDate": "2016-10-08T00:00",
    "endDate": "2017-12-08T00:00",
    "amount": 100,
    "id": 89,
    "image": "Potatoes.jpg",
    "message": "So natrual",
    "price": 0.99,
    "title": "Potatoes",
    "type": "FOOD"
  },
  {
    "startDate": "2018-10-08T00:00",
    "endDate": "2019-12-08T00:00",
    "amount": 150,
    "id": 91,
    "image": "EMERALDA.jpg",
    "message": "ON ANY TWO  EMERALD® NUTS PRODUCT",
    "price": 0.45,
    "title": "EMERALD®",
    "type": "FOOD"
  },
  {
    "startDate": "2018-10-08T00:00",
    "endDate": "2019-12-08T00:00",
    "amount": 15,
    "id": 92,
    "image": "hotel.jpg",
    "message": " $10 Off Your Next Hotel",
    "price": 150,
    "title": "Hot Wire",
    "type": "TRAVELLING"
  },
  {
    "startDate": "2018-10-08T00:00",
    "endDate": "2019-12-08T00:00",
    "amount": 1000,
    "id": 93,
    "image": "GrayLine.png",
    "message": "15% Off Bus Tours",
    "price": 3.75,
    "title": "Gray Line",
    "type": "TRAVELLING"
  },
  {
    "startDate": "2018-10-08T00:00",
    "endDate": "2019-12-08T00:00",
    "amount": 30,
    "id": 94,
    "image": "camper.jpg",
    "message": "30% off camper & RV covers",
    "price": 99.99,
    "title": "Camping World",
    "type": "TRAVELLING"
  },
  {
    "startDate": "2018-10-08T00:00",
    "endDate": "2019-12-08T00:00",
    "amount": 15,
    "id": 95,
    "image": "MafiaIII.jpg",
    "message": "Pre-order Mafia III and get 15% discount",
    "price": 32.15,
    "title": "Amazon",
    "type": "ELECTRICITY"
  },
  {
    "startDate": "2018-10-08T00:00",
    "endDate": "2019-12-08T00:00",
    "amount": 100,
    "id": 96,
    "image": "flu.jpg",
    "message": "1+1 on flu shot",
    "price": 99.5,
    "title": " Walgreen Co.",
    "type": "HEALTH"
  }
];
    $scope.couponType = ["RESTURANS", "ELECTRICITY", "FOOD", "HEALTH", "SPORTS", "CAMPING", "TRAVELLING", "OTHER"];
    $scope.couponList = this.getAllPurchasedCoupons();
}   

$scope.popConfirmation = function(ev, coupon) {
       var confirm = $mdDialog.confirm()
          .title('Are you sure you want to purchase this coupon ?')
          .textContent('Approve the purchasing process for ' + coupon.title + ' coupon')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Please do it!')
          .cancel('Sounds like a scam');

    $mdDialog.show(confirm).then(function() {
      $scope.purchaseCoupon(coupon);
      
    }, function() {
      $scope.status = 'no';
    }); 
    
};

$scope.couponListSwitch = function() {
    if ($scope.isAll)
        {
            $scope.getAllPurchasedCoupons();
            $scope.switchTitle = "Gel all coupons"
        }
    else
        {
            $scope.getAllCoupons();  
            $scope.switchTitle = "Gel only purchased coupons"
        }
    $scope.isAll = !$scope.isAll;
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
                                   
