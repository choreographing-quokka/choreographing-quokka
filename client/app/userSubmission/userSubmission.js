var userSubmission = angular.module('rollercost.userSubmission', ['focus-if']);

userSubmission.controller('UserSubmissionController', function ($scope, $http, $location, Results){
  $scope.showCount = 0;
  $scope.loading = false;
  $scope.data = {};
  $scope.nextPrompt = function(){
    $scope.showCount++;
  };
  $scope.previousPrompt = function(){
    $scope.showCount--;
  };
  $scope.submitData = function(){
    $scope.showCount = -1;
    $scope.loading = true;
    console.log('data', $scope.data);
    $http.post('/api/userSubmission', $scope.data).
      success(function(){
        //if post request successful, reset the view to the initial one
        $scope.loading = false;
        $scope.showCount = 0;
        $location.path('/analyze');
      });
    Results.updateUser($scope.data.username);

  };
  //Allow hitting enter key to see the next prompt, given there is no input error
  $scope.enterNext = function(inputValid, keyCode){
    if(inputValid && keyCode === 13){
      $scope.nextPrompt();
    };
  }
  //Prevent form submission upon hitting the enter key
  $(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
});
