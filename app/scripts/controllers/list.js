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

    $scope.$on('parkSaved', function(event, args) {

      var anyThing = args.parkId;
      console.log('recieved:' + anyThing);
    });

    //$scope.temp = [];

    $scope.userList = {};

    $rootScope.temp.forEach(getParkData);


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