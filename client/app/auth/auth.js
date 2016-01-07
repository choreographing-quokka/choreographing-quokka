angular.module('rollercost.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.user.username = '';
  $scope.user.password = '';


  $scope.signin = function () {
    // use sendOff function to send to backend
    console.log($scope.user);
    break;
    $scope.sendOff($scope.user, 'signin')
      .then(function (token) {
        $window.localStorage.setItem('com.rollercost', token);
        $location.path('/home');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    $scope.sendOff($scope.user, 'signup')
      .then(function (token) {
        $window.localStorage.setItem('com.rollercost', token);
        $location.path('/home');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // function used by both above methods to send http request off to server
  $scope.sendOff = function(user, reqType) {
    var endPoint = reqType === 'signin' ? '/signin' : 'signup';
    return $http({
      method: 'POST',
      url: endPoint,
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  }
});