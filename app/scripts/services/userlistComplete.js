'use strict';

angular.module('myAmericaApp').factory('UserListComplete', function($resource) {
  var UserList = $resource('http://52.4.251.23:8080/userList/complete');

  function create( body, callback) {
    var UserListCreate = UserList.bind();
    var userList = new UserListCreate(body);
    userList.$save();
    callback(userList);
  }

  return {
    create: create
  };
});
