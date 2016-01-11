angular.module('app.auth', [])
// ADD BACK 'Auth' AS ARG ON LINE3
.controller('AuthController', function ($scope, $window, $location, $http, Auth) {
  
  $scope.user = {};
  $scope.user.username = '';
  $scope.user.password = '';
  $scope.error = '';


  $scope.signin = function () {
    // use sendOff function to send to backend    

    $scope.sendOff($scope.user, 'signin')
      .then(function (resp) {        
        $window.localStorage.setItem('com.rollercost', resp.token);
        $window.localStorage.setItem('username', resp.username);
        $location.path('/start');
      })
      .catch(function (error) {
        $scope.error = error.data.slice(0,26);
        console.error(error);
      });
  };

  $scope.signup = function () {
    console.log('hihi');
    $scope.sendOff($scope.user, 'signup')
      .then(function (resp) {        
        $window.localStorage.setItem('com.rollercost', resp.token);
        $window.localStorage.setItem('username', resp.username);        
        $location.path('/start');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signout = function() {    
    Auth.signout();
  }

  // function used by both above methods to send http request off to server
  $scope.sendOff = function(user, reqType) {
    var endPoint = reqType === 'signin' ? '/signin' : '/signup';
    return $http({
      method: 'POST',
      url: endPoint,
      data: user
    })
    .then(function (resp) {
      return resp.data;
    });
  }
});