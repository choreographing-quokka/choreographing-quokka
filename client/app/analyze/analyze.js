angular.module('app.analyze', []) 

.controller('AnalyzeController', function ($scope, Results) {
  $scope.results = [];
  $scope.loadResults = function () {
    $scope.results = Results.getResults();     
  };
});