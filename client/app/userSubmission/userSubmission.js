var userSubmissions = angular.module('rollercost.userSubmissions', []);

userSubmissions.controller('userSubmissionController', function($scope, $http){
  $scope.showCount = 0;
  $scope.loading = false;
  $scope.data = {};
  $scope.addData = function(input, category){
    //add user input to the data
    $scope.data[category] = input;
    //increment the showCount to show the next prompt
    $scope.showCount++;
  };
  $scope.submitData = function(data){
    $scope.loading = true;
    $http.post('/api/userSubmission', data).
      success(function(){
        //if post request successful, reset the view to the initial one
        $scope.loading = false;
        $scope.showCount = 0;
      });
  };


});