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
  
  var username = null;

  var updateUser = function (user) {
    console.log(user);
    username = user;

  };

  var getResults = function () {
    if (username === null) {
      console.log("CANNOT get results without user");
    } else {
      console.log(username);
      return $http({
        url: 'api/analyze', // URL for now
        method: 'POST',
        data: username
      });
    }
  };

  return {
    getResults: getResults,
    updateUser: updateUser
  };
});

