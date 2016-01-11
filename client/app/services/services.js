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
  
  var username = window.localStorage.username;

  var updateUser = function (user) {
    console.log(user);
    username = user;
  };

  var getUser = function () {
    return username;
  }

  var getResults = function () {
    data = {username: username};
    if (username === null) {
      console.log("CANNOT get results without user");
    } else {      
      return $http({
        url: 'api/analyze', // URL for now
        method: 'POST',
        data: data
      });
    }
  };

  return {
    getResults: getResults,
    updateUser: updateUser
  };
});

