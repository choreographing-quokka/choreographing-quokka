'use strict';

describe('Routing', function () {
  var $route;
  beforeEach(module('app'));

  beforeEach(inject(function ($injector) {
    $route = $injector.get('$route');
  }));

  it('Should have /signin route, template, and controller', function () {
    expect($route.routes['/signin']).to.be.defined;
    expect($route.routes['/signin'].controller).to.equal('AuthController');
    expect($route.routes['/signin'].templateUrl).to.equal('app/auth/signin.html');
  });

  it('Should have /start route, template, and controller', function () {
    expect($route.routes['/start']).to.be.defined;
    expect($route.routes['/start'].controller).to.equal('UserSubmissionController');
    expect($route.routes['/start'].templateUrl).to.equal('app/userSubmission/userSubmission.html');
  });

  it('Should have /analyze route, template, and controller', function () {
    expect($route.routes['/analyze']).to.be.defined;
    expect($route.routes['/analyze'].controller).to.equal('AnalyzeController');
    expect($route.routes['/analyze'].templateUrl).to.equal('app/analyze/analyze.html');
  });
});