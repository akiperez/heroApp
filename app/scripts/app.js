'use strict';

/**
 * @ngdoc overview
 * @name heroApp
 * @description
 * # heroApp
 *
 * Main module of the application.
 */
angular
  .module('heroApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/hero-list.html',
        controller: 'HeroController',
        controllerAs: 'main'
      })
      .when('/heroes', {
        templateUrl: 'views/hero-list.html',
        controller: 'HeroController',
        controllerAs: 'herolist'
      })
      .when('/heroes/:heroId', {
        templateUrl: 'views/hero-detail.html',
        controller: 'HeroDetailController',
        controllerAs: 'herodetail'
      })
      .when('/add', {
        templateUrl: 'views/hero-add.html',
        controller: 'HeroController',
        controllerAs: 'heroadd'
      })
      .when('/edit/:heroId', {
        templateUrl: 'views/hero-edit.html',
        controller: 'HeroDetailController',
        controllerAs: 'heroedit'
      })
      .when('/merge', {
        templateUrl: 'views/hero-merge.html',
        controller: 'HeroController',
        controllerAs: 'heromerge'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
