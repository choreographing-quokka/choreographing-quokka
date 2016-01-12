angular.module('app.analyze', []) 

.controller('AnalyzeController', function ($scope, Results, $window) {
  $scope.results = {};
  $scope.user = $window.localStorage.username // for testing 
  $scope.income = null;
  $scope.consumptionBehaviorScore = null;
  $scope.imageSrc = '';

  var loadResults = function () {
    Results.getResults()
      .then(function(resp) {
        var results = resp.data;
      	$scope.income = results.income;
        $scope.income[2] = ($scope.income[0] - $scope.income[1]) >= 0 ? 'more' : 'less';
        delete results.income;
        $scope.results = results;
        $scope.spendingCutReco = [];
        $scope.consumptionBehaviorScore = $scope.calculateConsumptionBehaviorScore();
        for (var key in results) {
          results[key].push(results[key][0] - results[key][1] >= 0 ? 'more' : 'less');
          var recommendation = $scope.recoStrength(results[key][2], $scope.percentDifference(results[key]) , key);
          console.log(recommendation);
          $scope.spendingCutReco.push(recommendation);
        }
        $scope.generateConsumptionBehaviorScoreMessage();
        console.log($scope.imageSrc)
      })
      .catch(function (error) {
      	console.log(error);
      });    
  };


  $scope.percentDifference = function(tuple) {
    return Math.round((Math.abs(tuple[0] - tuple[1]) / tuple[1]) * 100)
  }

  $scope.calculateConsumptionBehaviorScore = function() {
    var prorate = {
      rent: 12,
      transportation: 52, //52.1429
      eatingout: 52,
      groceries: 52,
      clothes: 12,
      hygiene: 12,
      travel: 1,
      entertainment: 12,
      gym: 12
    }
    var expenditures = 0
    for (var item in $scope.results) {
      expenditures += (typeof $scope.results[item][0] === 'number' ? $scope.results[item][0] * prorate[item] : 0);
    }

    var output = ($scope.income[0] - expenditures) / $scope.income[0] * 100;
    console.log('output is...', output);
    if (output >= 40) {
      output = 'A+';
    } else if (output >= 30) {
      output = 'A';
    } else if (output >= 20) {
      output = 'B+';
    } else if (output >= 10) {
      output = 'B';
    } else if (output >= 5) {
      output = 'C+';
    } else if (output >= 0) {
      output = 'C';
    } else {
      output = 'F';
    }
    return output;

  };

  $scope.generateConsumptionBehaviorScoreMessage = function(){
    if($scope.consumptionBehaviorScore === 'A+') {
      $scope.imageSrc = 'https://s3-us-west-2.amazonaws.com/rollercost/a'
      return $scope.consumptionBehaviorScoreMessage = 'Excellent! You are likely saving a good amount of money even after tax.'
    } else if ($scope.consumptionBehaviorScore === 'A') {
      $scope.imageSrc = 'https://s3-us-west-2.amazonaws.com/rollercost/a'
      return $scope.consumptionBehaviorScoreMessage = 'Great! You are likely saving some money even after tax.'
    } else if ($scope.consumptionBehaviorScore === 'B+') {
      $scope.imageSrc = 'https://s3-us-west-2.amazonaws.com/rollercost/b'
      return $scope.consumptionBehaviorScoreMessage = 'Good! You are likely on budget and may be able to save a little as well.'
    } else if ($scope.consumptionBehaviorScore === 'B') {
      $scope.imageSrc = 'https://s3-us-west-2.amazonaws.com/rollercost/b'
      return $scope.consumptionBehaviorScoreMessage = 'You should consider improving your consumption behavior. You are likely just on budget and probably won\'t be able to save any money.'
    } else if ($scope.consumptionBehaviorScore === 'C+') {
      $scope.imageSrc = 'https://s3-us-west-2.amazonaws.com/rollercost/c'
      return $scope.consumptionBehaviorScoreMessage = 'You should improve your consumption behavior. You might be on deficit after tax.'
    } else if ($scope.consumptionBehaviorScore === 'C') {
      $scope.imageSrc = 'https://s3-us-west-2.amazonaws.com/rollercost/c'
      return $scope.consumptionBehaviorScoreMessage = 'You should improve your consumption behavior. You are likely on deficit after tax.'
    } else if ($scope.consumptionBehaviorScore === 'F') {
      $scope.imageSrc = 'https://s3-us-west-2.amazonaws.com/rollercost/f'
      return $scope.consumptionBehaviorScoreMessage = 'You really should improve your consumption behavior. You are already on deficit before tax.'
    }
  };

  $scope.recoStrength = function(spendingMore, percentage, expenditureType){
    //convert stringified less sign to a minus sign that operates on numbers
    if(spendingMore === 'less') {
      percentage = -percentage;
    }
    var strength;
    var recoStrengthOptions = {
      4: 'must cut',
      3: 'really should cut',
      2: 'should cut',
      1: 'might consider cutting',
      0: 'could still cut'
    };

    //Default recommendating strength
    if($scope.consumptionBehaviorScore === 'A+'){
      strength = -2;
    } else if ($scope.consumptionBehaviorScore === 'A') {
      strength = -1;
    } else if($scope.consumptionBehaviorScore === 'B+' || 'B'){
      strength = 0;
    } else if($scope.consumptionBehaviorScore === 'C+' || 'C'){
      strength = 1;
    } else {
      strength = 2;
    }

    //Luxury factor
    var luxuryFactor = {
      clothes: 1 ,
      eatingout: 1,
      entertainment: 2,
      groceries: 0,
      gym: 0,
      hygiene: 0,
      rent: -1,
      transportation: -1,
      travel: 1
    };

    var seriousnessFactor = function(percentage) {
      if(percentage <= -20) {
        return -2;
      } else if (percentage <= 0) {
        return -1;
      } else if (percentage < 15) {
        return 0;
      } else if (percentage < 30) {
        return 1;
      } else {
        return 2;
      }
    };

    strength = strength + luxuryFactor[expenditureType] + seriousnessFactor(percentage);

    // strength cannot exceed the pre-defined maximum
    if(strength > 4) { strength = 4}
    return {type: expenditureType, strength: recoStrengthOptions[strength]};
  };

  loadResults();
});
