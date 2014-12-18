'use strict';

describe('Directive: dir', function () {

  // load the directive's module
  beforeEach(module('suduWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<dir></dir>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dir directive');
  }));
});
