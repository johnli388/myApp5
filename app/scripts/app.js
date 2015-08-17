'use strict';

/**
 * @ngdoc overview
 * @name myApp5App
 * @description
 * # myApp5App
 *
 * Main module of the application.
 */
angular
  .module('myApp5App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
      'LocalStorageModule'
  ])
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
      localStorageServiceProvider.setPrefix('ls');
    }])
    //.config(function(uiGmapGoogleMapApiProvider) {
    //  uiGmapGoogleMapApiProvider.configure({
    //    //    key: 'your api key',
    //    v: '3.17',
    //    libraries: 'places' // Required for SearchBox.
    //  });
    //})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/my location', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
