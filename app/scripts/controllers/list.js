'use strict';

/**
 * @ngdoc function
 * @name myAmericaApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the myAmericaApp
 */
angular.module('myAmericaApp')
  .controller('ListCtrl', function ($scope, $rootScope, RecArea, RIDB_API_KEY, FetchUserList, UserListRemove) {

    $scope.$on('parkSaved', function(event, args) {

      var anyThing = args.parkId;
      console.log('recieved:' + anyThing);
    });

    //$scope.temp = [];

    $scope.userList = {};

    console.log('about to fetch userlist');
    FetchUserList.get({"userId": $rootScope.email}, function (results) {
      console.log(results);
      results.results.forEach(getParkData);
		$scope.createMap(results);
    });

    //$rootScope.temp.forEach(getParkData);


    function getParkData(parkId, index, array){
      dbParkCall(parkId.parkId);
    }

	$scope.createMap = function(results) {
		var map = L.map('mapResults').setView([$scope.lat, $scope.lng], 10);

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		$(results.results).each(function(i, v){
			console.log(v);
			if (v.RecAreaLatitude != "" && v.RecAreaLongitude != ""){
				var title = v.RecAreaName;
				var contactEmail = v.RecAreaEmail;
				var contactPhone = v.RecAreaPhone;
				var website = v.RecAreaMapURL;

				var popUpText = "<strong>" + title + "</strong>";

				if (website != ""){
					popUpText = popUpText + "<p><a href='"+website+"'>" + website + "</a></p>";
				}

				if (contactEmail != ""){
					popUpText = popUpText + "<p>Email Address: <a href='mailto:"+contactEmail+"'>" + contactEmail + "</a></p>";
				}

				if (contactPhone != ""){
					popUpText = popUpText + "<p>" + contactPhone + "</p>";
				}

				v.photoQuery = ("SELECT  metadata FROM 1zi67I9StNeOzf5qv-wQ6WfR3n0ok_hDm6fSy0kI1 WHERE ST_INTERSECTS(geometry, CIRCLE(LATLNG("+v.RecAreaLatitude+","+ v.RecAreaLongitude+"), 50000))");
				Flickr.get({key:"AIzaSyAY3kjup98kSZ5OQ4iaxFRxWqwvtLLXfPM", sql: v.photoQuery}, function(results){
					console.log(v.photoData);
				});

				L.marker([v.RecAreaLatitude, v.RecAreaLongitude]).addTo(map)
					.bindPopup(popUpText)
					.openPopup();
			}
		});
	};

    function dbParkCall(parkId) {
      RecArea.get({"apikey": RIDB_API_KEY, "parkId": parkId}, function (results) {
        console.log(results);
        $scope.userList[parkId.toString()] = results;

		//$scope.createMap(results);
      });
    }

    $scope.removePark = function removePark(parkId){
      UserListRemove.create({"userId": $rootScope.email, "parkId": parkId}, function(results){
        console.log($scope.userList);
        delete $scope.userList[parkId.toString()];
        $scope.$apply();
        console.log($scope.userList);


      });
    }

  });