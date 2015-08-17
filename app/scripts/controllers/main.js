'use strict';

/**
 * @ngdoc function
 * @name myApp5App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp5App
 */
angular.module('myApp5App')
  .controller('MainCtrl', function ($scope, localStorageService) {

      function initMap() {//map init

        $scope.options = {scrollwheel: false};
        $scope.alertFlag = false;
        $scope.markerLat = 30;
        $scope.markerLon = 20;
        $('#errMsg').empty();

        //get save user location or default
        $scope.user = localStorageService.get('user') || {latitude: $scope.markerLat, longitude: $scope.markerLon};

        if($scope.user.latitude == 30){//get current location

          if (!!navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (pos) {
              $scope.user = {latitude: pos.coords.latitude, longitude: pos.coords.longitude};
              //$scope.$digest();
              $scope.$apply();

            }, function (error) {
              $('#errMsg').html('Unable to get location: ' + error.message);
              //console.log('Unable to get location: ' + error.message);
            });
          }else{
            console.log('navigator.geolocation is not supported');
          }

        }else{
          $scope.map = {
            center: {
              latitude: $scope.user.latitude,
              longitude: $scope.user.longitude
            },
            zoom: 16
          };

        }

        var events = {
          places_changed: function (searchBox) {
            var place = searchBox.getPlaces();
            if (!place || place === 'undefined' || place.length === 0) {
              console.log('no place data :(');
              return;
            }

            var lat = place[0].geometry.location.lat(),
                lon = place[0].geometry.location.lng();

            $scope.map = {
              "center": {
                "latitude": lat,
                "longitude": lon
              },
              "zoom": 16
            };

            $scope.marker = {
              id: 0,
              coords: {
                latitude: lat,
                longitude: lon
              }
            };
            $scope.markerLat = lat;
            $scope.markerLon = lon;
          }

        };

        $scope.searchbox = { template: 'searchbox.tpl.html', events: events };

      }

      initMap();


      //watch user's changes to update and save the new user location accordingly
      $scope.$watch('user', function () {
        if ($scope.user.latitude == 30){return;}

        localStorageService.set('user', $scope.user);

        $scope.map = {
          center: {
            latitude: $scope.user.latitude,
            longitude: $scope.user.longitude
          },
          zoom: 16
        };

        $scope.marker = {
          id: 0,
          coords: {
            latitude: $scope.user.latitude,
            longitude: $scope.user.longitude
          },
          options: { draggable: true },
          events: {
            dragend: function (marker) {//, eventName, args
              //$log.log('marker dragend');
              $scope.alertFlag = false;
              $scope.markerLat = marker.getPosition().lat();
              $scope.markerLon = marker.getPosition().lng();

              $scope.marker.options = {
                draggable: true,
                labelContent: "Lat: " + $scope.marker.coords.latitude + '<br />' + 'Lon: ' + $scope.marker.coords.longitude,
                labelAnchor: "60 0",
                labelClass: "marker-labels"
              };
            }
          }
        };
      }, true);

      $scope.saveNewLocation = function(){
        $scope.user = {latitude: $scope.markerLat, longitude: $scope.markerLon};
        //$scope.user.latitude = $scope.markerLat;
        //$scope.user.longitude = $scope.markerLon;
        $scope.alertFlag = true;
      };

      //this.awesomeThings = [
      //  'HTML5 Boilerplate',
      //  'AngularJS',
      //  'Karma'
      //];

  });
