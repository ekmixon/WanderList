'use strict';

/**
 * @ngdoc function
 * @name myAmericaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAmericaApp
 */
angular.module('myAmericaApp')
  .controller('MainCtrl', function ($scope, geolocation, $rootScope, $location, RecAreas, Activities, RIDB_API_KEY) {

    geolocation.getLocation().then(function(data){
      $scope.coords = {lat:data.coords.latitude, lng:data.coords.longitude};
    });

    $scope.usStates = [{
		"stateName": "Alabama",
		"stateAbbr": "AL"
	},{
		"stateName": "Alaksa",
		"stateAbbr": "AK"
	},{
		"stateName": "American Samoa",
		"stateAbbr": "AS"
	},{
		"stateName": "Arizona",
		"stateAbbr": "AZ"
	},{
		"stateName": "Arkansas",
		"stateAbbr": "AR"
	},{
		"stateName": "California",
		"stateAbbr": "CA"
	},{
		"stateName": "Colorado",
		"stateAbbr": "CO"
	},{
		"stateName": "Connecticut",
		"stateAbbr": "CT"
	},{
		"stateName": "Delaware",
		"stateAbbr": "DE"
	},{
		"stateName": "District of Columbia",
		"stateAbbr": "DC"
	},{
		"stateName": "Federated States of Micronesia",
		"stateAbbr": "FM"
	},{
		"stateName": "Florida",
		"stateAbbr": "FL"
	},{
		"stateName": "Georgia",
		"stateAbbr": "GA"
	},{
		"stateName": "Guam",
		"stateAbbr": "GU"
	},{
		"stateName": "Hawaii",
		"stateAbbr": "HI"
	},{
		"stateName": "Idaho",
		"stateAbbr": "ID"
	},{
		"stateName": "Illinois",
		"stateAbbr": "IL"
	},{
		"stateName": "Indiana",
		"stateAbbr": "IN"
	},{
		"stateName": "Iowa",
		"stateAbbr": "IA"
	},{
		"stateName": "Kansas",
		"stateAbbr": "KS"
	},{
		"stateName": "Kentucky",
		"stateAbbr": "KY"
	},{
		"stateName": "Louisiana",
		"stateAbbr": "LA"
	},{
		"stateName": "Maine",
		"stateAbbr": "ME"
	},{
		"stateName": "Marshall Islands",
		"stateAbbr": "MH"
	},{
		"stateName": "Maryland",
		"stateAbbr": "MD"
	},{
		"stateName": "Massachusetts",
		"stateAbbr": "MA"
	},{
		"stateName": "Michigan",
		"stateAbbr": "MI"
	},{
		"stateName": "Minnesota",
		"stateAbbr": "MN"
	},{
		"stateName": "Mississippi",
		"stateAbbr": "MS"
	},{
		"stateName": "Missouri",
		"stateAbbr": "MO"
	},{
		"stateName": "Montana",
		"stateAbbr": "MT"
	},{
		"stateName": "Nebraska",
		"stateAbbr": "NE"
	},{
		"stateName": "Nevada",
		"stateAbbr": "NV"
	},{
		"stateName": "New Hampshire",
		"stateAbbr": "NH"
	},{
		"stateName": "New Jersey",
		"stateAbbr": "NJ"
	},{
		"stateName": "New Mexico",
		"stateAbbr": "NM"
	},{
		"stateName": "New York",
		"stateAbbr": "NY"
	},{
		"stateName": "North Carolina",
		"stateAbbr": "NC"
	},{
		"stateName": "North Dakota",
		"stateAbbr": "ND"
	},{
		"stateName": "Northern Mariana Islands",
		"stateAbbr": "MP"
	},{
		"stateName": "Ohio",
		"stateAbbr": "OH"
	},{
		"stateName": "Oklahoma",
		"stateAbbr": "OK"
	},{
		"stateName": "Oregon",
		"stateAbbr": "OR"
	},{
		"stateName": "Palau",
		"stateAbbr": "PW"
	},{
		"stateName": "Pennsylvania",
		"stateAbbr": "PA"
	},{
		"stateName": "Puerto Rico",
		"stateAbbr": "PR"
	},{
		"stateName": "Rhode Island",
		"stateAbbr": "RI"
	},{
		"stateName": "South Carolina",
		"stateAbbr": "SC"
	},{
		"stateName": "South Dakota",
		"stateAbbr": "SD"
	},{
		"stateName": "Tennessee",
		"stateAbbr": "TN"
	},{
		"stateName": "Texas",
		"stateAbbr": "TX"
	},{
		"stateName": "Utah",
		"stateAbbr": "UT"
	},{
		"stateName": "Vermont",
		"stateAbbr": "VT"
	},{
		"stateName": "Virgin Islands",
		"stateAbbr": "VI"
	},{
		"stateName": "Virginia",
		"stateAbbr": "VA"
	},{
		"stateName": "Washington",
		"stateAbbr": "WA"
	},{
		"stateName": "West Virginia",
		"stateAbbr": "WV"
	},{
		"stateName": "Wisconsin",
		"stateAbbr": "WI"
	},{
		"stateName": "Wyoming",
		"stateAbbr": "WY"
	}];

    $scope.secondOptions = {
		'Near me': false,
		'Out of state': false
	};

	$scope.thirdOptions = ['Up to 50 miles', 'Up to 100 miles', 'More than 100 miles'];

	$scope.activeChoice = [];
	$scope.nearMe = false;
	$scope.elsewhere = false;

	$scope.submitButtonClass = 'inactive, disabled';
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
      "Rock Climbing",
      "Visiting Cultural Sites",
      "Snow Activities",
      "Water Activities"
    ];

    $scope.interestsArray = {
      "Camping": [9, 30, 40, 42, 44],
      "Driving/Biking": [5, 4, 18, 23],
      "Fishing/Hunting": [11, 27, 16],
      "General Outdoor Activities": [32, 33, 38, 39, 41, 35, 36, 37, 20, 24, 26],
      "Hiking": [14, 28],
      "Photography": [104],
      "Rock Climbing": [7],
      "Visiting Cultural Sites": [8, 10],
      "Snow Activities": [22, 43],
      "Water Activities": [6, 25, 31, 105, 106, 107, 34, 103, 108]
    };
    $scope.fullInterestsEncoded=[];

    $scope.firstAnswered = function(answer) {
      $scope.showSecond = true;
      $scope.answer1 = answer;
      var firstAnswer = {"questionId": "1", "selectedOption": answer, "email": $('#email').val()};
      // totalQuery["answer1"] = answer;
    };

    $scope.thirdAnswered = function(answer) {
      $scope.answer2 = answer;
      var firstAnswer = {"questionId": "1", "selectedOption": answer, "email": $('#email').val()};
	  $scope.submitButtonClass = 'active';
    };

	$scope.showThird = function(radius, id){
		for (var i = 0; i < $scope.activeChoice.length; i++){
			$scope.activeChoice[i] = '';
		}

		$scope.activeChoice[id] = $scope.activeChoice[id] == 'active' ? '' : 'active';

		if (radius === 'Near me'){
			$scope.nearMe = true;
			$scope.elsewhere = false;
		} else if (radius === 'Out of state'){
			$scope.nearMe = false;
			$scope.elsewhere = true;
		}
	};

    $scope.goToResults = function goToResults(){
      $rootScope.email = $scope.email;

      for (var i = 0; i < $scope.interestsList.length; i++) {

        if($scope.interests[$scope.interestsList[i]]){
          $scope.fullInterestsEncoded = $scope.fullInterestsEncoded.concat($scope.interestsArray[$scope.interestsList[i]]);
        }
      }

      if(!$scope.elsewhere) {
        $rootScope.$broadcast('questionsAnswered', {
          "answer1": $scope.answer1,
          "answer2": $scope.answer2,
          "lat": $scope.coords.lat,
          "lng": $scope.coords.lng,
          "interests": $scope.interests
        });
      }
      else{
        $rootScope.state = $scope.whichState.stateAbbr;
        $rootScope.$broadcast('questionsAnswered', {
          "answer1": $scope.answer1,
          "answer2": $scope.answer2,
          "state": $scope.whichState,
          "interests": $scope.interests
        });
      }

      $rootScope.lat = $scope.coords.lat;
      $rootScope.lng = $scope.coords.lng;
      $rootScope.activitiesSelected = $scope.fullInterestsEncoded;
      $location.path('/results');

      function logArrayElements(element, index, array) {
        console.log(element);

        $scope.fullInterestsEncoded = $scope.fullInterestsEncoded.concat(obj[element]);
        console.log($scope.fullInterestsEncoded);
      }
    };

    $scope.checkChange = function checkChange(status, interest){
      $scope.interests[interest] = status;
    };

    RecAreas.get({"apikey": RIDB_API_KEY}, function(activities) {
      $scope.activities = activities;
    });

  });
