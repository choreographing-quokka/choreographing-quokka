var userSubmission = angular.module('rollercost.userSubmission', ['focus-if']);

userSubmission.controller('UserSubmissionController', function ($scope, $http, Results){
  $scope.showCount = 0;
  $scope.loading = false;
  $scope.data = {};
  $scope.nextPrompt = function(){
    $scope.showCount++;
  };
  $scope.previousPrompt = function(){
    $scope.showCount--;
  }
  $scope.submitData = function(){
    $scope.showCount = -1;
    $scope.loading = true;
    console.log('data', $scope.data);
    $http.post('/api/userSubmission', $scope.data).
      success(function(){
        //if post request successful, reset the view to the initial one
        $scope.loading = false;
        $scope.showCount = 0;
      });
    Results.updateUser($scope.data.username);
  };
});
