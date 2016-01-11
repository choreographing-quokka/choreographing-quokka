angular.module('app.analyze', []) 

.controller('AnalyzeController', function ($scope, Results) {
  $scope.results = {};
  $scope.user = Results.getUser(); // for testing 
  $scope.income = null;
  var loadResults = function () {
    Results.getResults()
      .then(function(resp) {
      	var results = resp.data;
        for (var key in results) {
          results[key].push(results[0] - results[1] >= 0 ? 'more' : 'less');
        }
      	$scope.income = results.income;
        delete results.income;
        $scope.results = results;
      })
      .catch(function (error) {
      	console.log(error);
      });    
  };

  $scope.percentDifference = function(tuple) {
    return Math.round(Math.abs(tuple[0] - tuple[1]) / tuple[1] * 100)
  }

  loadResults();
});