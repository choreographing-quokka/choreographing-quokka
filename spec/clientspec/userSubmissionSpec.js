'use strict';

describe('UserSubmissionController', function () {
  var $scope, $rootScope, $location, createController, $httpBackend, Results;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('app'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Results = $injector.get('Links');
    $location = $injector.get('$location');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('UserSubmissionController', {
        $scope: $scope,
        Results: Results,
        $location: $location
      });
    };

    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  // data tracks the user's answers to the form questions
  it('should have a data property on the $scope', function () {
    expect($scope.data).to.be.an('object');
  });

  it('should have a submitData method on the $scope', function () {
    expect($scope.submitData).to.be.a('function');
  });
  // test submitData ability to send data over to backend
  it('should be able to create new links with submitData()', function () {
    $httpBackend.expectPOST("/api/userSubmission").respond(201, '');
    $scope.submitData();
    $httpBackend.flush();
  });
});