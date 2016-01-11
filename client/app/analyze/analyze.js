angular.module('app.analyze', []) 

.controller('AnalyzeController', function ($scope, Results, $window) {
  $scope.results = {};
  $scope.user = $window.localStorage.username // for testing 
  $scope.income = null;
  var loadResults = function () {
    Results.getResults()
      .then(function(resp) {
      	var results = resp.data;
        for (var key in results) {
          results[key].push(results[key][0] - results[key][1] >= 0 ? 'more' : 'less');
          console.log(results);
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

  $scope.consumptionBehaviorScore = function(){

  };

  $scope.consumptionBehaviorScoreMessage = function(){

  };

  $scope.recoStrength = function(){
    var strength;
    var recoStrengthOptions = {
      veryStrong: 'really should',
      strong: 'should',
      moderate: 'may consider',
      weak: 'could still'
    };
    if($scope.consumptionBehaviorScore === 'A+' || 'A'){
      strength = 'weak';
    } else if($scope.consumptionBehaviorScore === 'B+' || 'B'){
      strength = 'moderate';
    } else if($scope.consumptionBehaviorScore === 'C+' || 'C'){
      strength = 'strong';
    } else {
      strength = 'veryStrong';
    }

    return recoStrength[strength];
  };

  loadResults();
});