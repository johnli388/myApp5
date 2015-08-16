'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp5App'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  //it('should attach a list of awesomeThings to the scope', function () {
  //  expect(MainCtrl.awesomeThings.length).toBe(3);
  //});

    describe('user location', function() {//testing user's location properties, lat and lon
        it('should be a number for user.latitude', function() {
            expect(scope.user.latitude).toEqual(jasmine.any(Number));
        });
        it('should be a number for user.longitude', function() {
            expect(scope.user.longitude).toEqual(jasmine.any(Number));
        });
    });

    describe('location marker', function() {//testing mark properties
        it('Id should be 0 to the scope', function() {
            expect(scope.marker.id).toEqual(0);
        });
        it('should be a number for marker.coords.latitude', function() {
            expect(scope.marker.coords.latitude).toEqual(jasmine.any(Number));
        });
        it('should be a number for marker.coords.longitude', function() {
            expect(scope.marker.coords.longitude).toEqual(jasmine.any(Number));
        });
    });

    //describe('marker location', function() {//testing user's location properties, lat and lon
    //    it('should be a number for marker.latitude', function() {
    //        expect(scope.markerLat).toEqual(jasmine.any(Number));
    //    });
    //    it('should be a number for marker.longitude', function() {
    //        expect(scope.markerLon).toEqual(jasmine.any(Number));
    //    });
    //});

    describe('saveNewLocation function', function() {//testing saveNewLocation function
        it('sets a new latitude', function() {
            scope.markerLat = 30;
            scope.markerLon = 20;
            scope.saveNewLocation();
            expect(scope.user.latitude).toEqual(30);
        });

        it('sets a new longitude', function() {
            scope.markerLat = 30;
            scope.markerLon = 20;
            scope.saveNewLocation();
            expect(scope.user.longitude).toEqual(20);
        });

    });


});
