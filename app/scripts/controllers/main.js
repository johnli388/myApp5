'use strict';

/**
 * @ngdoc function
 * @name myApp5App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp5App
 */
angular.module('myApp5App')
  .controller('MainCtrl', function ($scope, $log, $timeout, localStorageService) {
    //this.awesomeThings = [
    //  'HTML5 Boilerplate',
    //  'AngularJS',
    //  'Karma'
    //];

      //get save user location or default
      $scope.user = localStorageService.get('user') || {latitude: 40.1451, longitude: -99.6680, desc: "My Address"};

      //watch user's changes to update and save the new user location accordingly
      $scope.$watch('user', function () {
        localStorageService.set('user', $scope.user);
      }, true);

    $scope.map = {
      center: {
        latitude: $scope.user.latitude,
        longitude: $scope.user.longitude
      },
      zoom: 8
    };

    $scope.options = {scrollwheel: false};
    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;
      //$scope.markerLat = 40.1451;
      //$scope.markerLon = -99.6680;
      $scope.alertFlag = false;

    $scope.marker = {
      id: 0,
      coords: {
        latitude: $scope.user.latitude,
        longitude: $scope.user.longitude
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          $scope.alertFlag = false;
          $scope.markerLat = marker.getPosition().lat();
          $scope.markerLon = marker.getPosition().lng();
          //$log.log(lat);
          //$log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "Lat: " + $scope.marker.coords.latitude + '<br />' + 'Lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "60 0",
            labelClass: "marker-labels"
          };
        }
      }
    };

    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
      if (_.isEqual(newVal, oldVal))
        return;
      $scope.coordsUpdates++;
    });

    //$timeout(function () {
    //  $scope.marker.coords = {latitude: 42.1451,longitude: -100.6680};
    //  $scope.dynamicMoveCtr++;
    //  $timeout(function () {
    //    $scope.marker.coords = {latitude: 43.1451,longitude: -102.6680};
    //    $scope.dynamicMoveCtr++;
    //  }, 2000);
    //}, 1000);

    //save a new location using local storage, then get it's values for next loading
    $scope.showAlert = function() {
      //$ionicPopup.alert({
      //  title: 'Your New Location',
      //  template: 'Your new location has been saved!!'
      //});
      //  $timeout(function(){
      //      window.alert("Your new location has been saved!");
      //  });

    };

    $scope.saveNewLocation = function(){
      $scope.user.latitude = $scope.markerLat;
      $scope.user.longitude = $scope.markerLon;
      $scope.user.desc = "My New Address";

      $scope.alertFlag = true;
      //$scope.showAlert();
      //$scope.apply();

      //var firebaseObj = new Firebase("https://blistering-heat-2473.firebaseio.com/MapDetails");
      //var fb = $firebase(firebaseObj);
      //
      //fb.$push({
      //  latitude: lat,
      //  longitude: lgt,
      //  description: des
      //}).then(function(ref) {
      //  $scope.user = {};
      //  $scope.showAlert();
      //}, function(error) {
      //  console.log("Error:", error);
      //});

      // Code to write to Firebase will be here
    };

  });
