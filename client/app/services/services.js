angular.module('app.services', [])

.factory('Auth', function ($http, $location, $window) {

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.rollercost');
  };

  var signout = function () {    
    $window.localStorage.removeItem('com.rollercost');
    $location.path('/signin');
  };

  return {    
    isAuth: isAuth,
    signout: signout
  };
})

.factory('Results', function ($http) {
  
  var getResults = function () {
    return $http({
      url: 'results', // URL for now
      method: 'GET'
    });
  };

  return {
    getResults: getResults
  };
});

