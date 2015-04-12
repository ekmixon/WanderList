'use strict';

angular.module('myAmericaApp').factory('FetchUserList', function($resource, RIDB_API_URL, RIDB_API_KEY) {
  var FetchUserList = $resource("http://52.4.251.23:8080/userList/fetch/:userId");

  function get(params, callback) {
    FetchUserList.get(params, callback);
  }

  return {
    get: get
  };
});
