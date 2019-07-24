// Code goes here hello

// Code goes here

"use strict";

angular.module('myApp',[]);

angular.module('myApp').controller('MainController',['$scope',function($scope){
  
  var vm = this;
  this.allColors=['WHITE','GREY','RED','BLUE','YELLOW','ORANGE','BLACK','GREEN','BROWN','PURPLE'];
  this.user = {
    mFname:'',
    mLname:'',
    mFavNum:0,
    mColor : 'PSYCHADELIC',
    mBirthYr:0
  };
  
  $scope.CalculateFaveNum = function(){
    var Length=0;
    Length = vm.user.mFname.length + vm.user.mLname.length;
    vm.user.mFavNum = (vm.user.mBirthYr+Length)%10+1;
  };
  
  $scope.CalculateColor = function(){
    var Length=0;
    Length = vm.user.mFname.length+vm.user.mLname.length;
   
   if(Length==0)
       vm.user.mColor='PSYCHADELIC';
   else
       Length = (vm.user.mBirthYr+Length)%10;
       vm.user.mColor= vm.allColors[Length];
  };
  
}]);

angular.module('myApp').filter('range', function() {
  return function(input, min, max) {
    min = parseInt(min); //Make string input int
    max = parseInt(max);
    for (var i=min; i<max; i++)
      input.push(i);
    return input;
  };
});
