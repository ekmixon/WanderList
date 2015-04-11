'use strict';


angular
  .module('oNetApp', [
    'angularUtils.directives.dirPagination',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
  ])
  .constant('API_URL', 'http://52.0.46.33:9292')
  .config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('bower_components/angular-utils-pagination/dirPagination.tpl.html');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/docs', {
        templateUrl: 'views/static/test.html'
      })
      .when('/:urlLink/:questionId', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
	  .when('/home', {
	    templateUrl: 'home.html'
	  })
      //.when('/search/:searchQuery', {
      //  templateUrl: 'views/search.html',
      //  controller: 'SearchCtrl'
      //})
      //.when('/search/', {
      //  templateUrl: 'views/search.html',
      //  controller: 'SearchCtrl'
      //})
      //.when('/occupation', {
      //  templateUrl: 'views/occupation.html',
      //  controller: 'OccupationCtrl'
      //})
      //.when('/occupation/:id', {
      //  templateUrl: 'views/occupation.html',
      //  controller: 'OccupationCtrl'
      //})
      //.when('/signin/', {
      //  templateUrl: 'views/signin.html',
      //  controller: 'SignInCtrl'
      //})
      //.when('/signup/', {
      //  templateUrl: 'views/signup.html',
      //  controller: 'SignUpCtrl'
      //})

      .otherwise({
        redirectTo: '/'
      });
  });
