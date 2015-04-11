'use strict';

/**
 * @ngdoc function
 * @name myAmericaApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the myAmericaApp
 */
angular.module('myAmericaApp')
  .controller('ResultsCtrl', function ($scope, $rootScope, RecAreas, RIDB_API_KEY) {


    $scope.$on('questionsAnswered', function(event, args) {
      console.log('caught broadcast');
      $scope.age = args["answer1"];
      $scope.lengthOfStay = args["answer2"];
      $scope.lat = args["lat"];
      $scope.lng = args["lng"];
      $scope.interests = args["interests"];
      console.log(age + ',' + length);

      RecAreas.get({"apikey": RIDB_API_KEY, "latitude": $scope.lat, "longitude": $scope.lng, "activity" : activities}, function(results) {
        console.log(results);
        $scope.results = results;
      });
      // do what you want to do
    });


    RecAreas.get({"apikey": RIDB_API_KEY, "latitude": $rootScope.lat, "longitude": $rootScope.long, "activity" : $rootScope.activitiesSelected.toString()}, function(results) {
      console.log(results);
      $scope.results = results;
    });





  });
