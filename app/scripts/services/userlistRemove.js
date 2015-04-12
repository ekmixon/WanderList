'use strict';

angular.module('myAmericaApp').factory('UserListRemove', function($resource) {
  var UserList = $resource('http://52.4.251.23:8080/userList/remove');

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
