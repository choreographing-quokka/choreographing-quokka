var app = angular.module('app', [
  'app.services',
  'app.auth',
  'app.analyze',
  'ngRoute'
]);

app.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      authenticate: false
    })
    .when('/signup', {
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      authenticate: false
    })
    .when('/home', {
      templateUrl: '/home',
      controller: '#',
      authenticate: true
    })
    .when('/start', {
      templateUrl: 'app/userSubmission/userSubmission.html',
      controller: 'UserSubmissionController',
      authenticate: true
    })
    .when('/analyze', {
      templateUrl: 'app/analyze/analyze.html',
      controller: 'AnalyzeController',
      // authenticate: true
    })
    .otherwise({
      redirectTo: '/'
    });
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      // THE NAME OF THE COOKIE IS COM.ROLLERCOST
      var jwt = $window.localStorage.getItem('com.rollercost');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
// redirect to the signin page if user tries to go to a protected page and not logged in
// .run(function ($rootScope, $location, Auth) {
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (/*next.$$route && next.$$route.authenticate &&*/ !Auth.isAuth() ) {
//       $location.path('/signin');
//     }
//   });
// });
