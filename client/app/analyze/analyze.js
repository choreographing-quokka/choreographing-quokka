angular.module('app.analyze', []) 

.controller('AnalyzeController', function ($scope, Results) {
  $scope.results = [];
  $scope.user = 'user'; // for testing 
  $scope.income = null;
  var loadResults = function () {
    Results.getResults()
      .then(function(resp) {
      	var results = resp.data.results;
      	$scope.user = resp.data.user;
      	$scope.incomeResult = results.shift();
        $scope.results = results
      })
      .catch(function (error) {
      	console.log(error);
      });    
  };

  loadResults();


});