var userSubmission = angular.module('rollercost.userSubmission', []);

userSubmission.controller('UserSubmissionController', function($scope, $http){
  $scope.showCount = 0;
  $scope.loading = false;
  $scope.data = {};
  $scope.nextPrompt = function(){
    $scope.showCount++;
  };
  $scope.previousPrompt = function(){
    $scope.showCount--;
  }
  $scope.submitData = function(data){
    $scope.showCount = -1;
    $scope.loading = true;
    $http.post('/api/userSubmission', data).
      success(function(){
        //if post request successful, reset the view to the initial one
        $scope.loading = false;
        $scope.showCount = 0;
      });
  };
});
