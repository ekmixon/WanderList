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
    });

    //$rootScope.temp.forEach(getParkData);


    function getParkData(parkId, index, array){
      dbParkCall(parkId.parkId);
    }

    function dbParkCall(parkId) {
      RecArea.get({"apikey": RIDB_API_KEY, "parkId": parkId}, function (results) {
        console.log(results);
        $scope.userList[parkId.toString()] = results;

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