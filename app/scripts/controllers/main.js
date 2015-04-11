'use strict';

/**
 * @ngdoc function
 * @name myAmericaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAmericaApp
 */
angular.module('myAmericaApp')
  .controller('MainCtrl', function ($scope, geolocation, $rootScope, $location, RidbSearch, RidbActivities, RIDB_API_KEY) {

    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
    });


    $scope.firstOptions = ['Young','Young at heart'];
    $scope.secondOptions = ['Short (a few days)', 'Long (a week or more)'];
    $scope.lat = 37.431573;
    $scope.lng = -78.656894;
    $scope.interests = {
      "Camping" : false,
      "Driving/Biking": false,
      "Fishing/Hunting": false,
      "General Outdoor Activities": false,
      "Hiking": false,
      "Horseback Riding": false,
      "Photography": false,
      "Rock Climbing": false,
      "Visiting Cultural Sites": false,
      "Snow Activities": false,
      "Water Activities": false
    };

    $scope.interestsList = [
      "Camping" ,
      "Driving/Biking" ,
      "Fishing/Hunting" ,
      "General Outdoor Activities" ,
      "Hiking",
      "Photography" ,
      "Rock Climbing" ,
      "Rock Climbing",
      "Visiting Cultural Sites",
      "Snow Activities",
      "Water Activities"
    ];
    $scope.fullInterestsEncoded=[];

    $scope.firstAnswered = function(answer) {
      $scope.showSecond = true;
      $scope.answer1 = answer;
      var firstAnswer = {"questionId": "1", "selectedOption": answer, "email": $('#email').val()};
      // totalQuery["answer1"] = answer;
    };

    $scope.secondAnswered = function(answer) {
      $scope.showThird = true;
      $scope.answer2 = answer;
      var firstAnswer = {"questionId": "1", "selectedOption": answer, "email": $('#email').val()};
    };

    $scope.goToResults = function goToResults(){
      //$scope.interests.forEach(logArrayElements);

      for (var key in $scope.interests) {
        if ($scope.interests.hasOwnProperty(key)) {
          logArrayElements($scope.interests[key], 0, $scope.interests);
          //alert(key + " -> " + p[key]);
        }
      }

      $rootScope.$broadcast('questionsAnswered', { "answer1":$scope.answer1, "answer2":$scope.answer2, "lat":$scope.coords.lat, "lng":$scope.coords.long, "interests":$scope.interests });
      $location.path('/results');

      function logArrayElements(element, index, array) {
        var obj = {
          "Camping": [6, 11, 25, 27, 31, 34, 105, 106, 107, 108],
          "Driving/Biking": [4, 5, 18, 23, 15, 109],
          "vistas": [26, 28, 104, 39],
          "snow": [22, 43],
          "resort": [40],
          "overnight": [9, 30, 40, 42],
          "education": [8, 33, 41, 103],
          "cliches": [7, 14, 20, 16]
        };

        $scope.fullInterestsEncoded = $scope.fullInterestsEncoded.concat(obj[element]);
        console.log($scope.fullInterestsEncoded);
      }
    };

    $scope.checkChange = function checkChange(status, interest){
      $scope.interests[interest] = status;
      console.log($scope.interests);
    };



    RidbActivities.get({"apikey": RIDB_API_KEY}, function(activities) {
      console.log(activities);
      $scope.activities = activities;
    });

  });
