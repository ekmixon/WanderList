'use strict';

/**
 * @ngdoc function
 * @name myAmericaApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the myAmericaApp
 */
angular.module('myAmericaApp')
  .controller('ListCtrl', function ($scope, $rootScope, RecArea, RIDB_API_KEY) {

    $scope.temp = [1560, 2564, 2581];

    $scope.userList = {};

    $scope.temp.forEach(getParkData);


    function getParkData(parkId, index, array){
      dbParkCall(parkId);
    }

    function dbParkCall(parkId) {
      RecArea.get({"apikey": RIDB_API_KEY, "parkId": parkId}, function (results) {
        console.log(results);
        $scope.userList[parkId.toString()] = results;

      });
    }

  });