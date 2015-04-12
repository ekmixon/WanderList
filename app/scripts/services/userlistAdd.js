'use strict';

angular.module('myAmericaApp').factory('UserList', function($resource) {
  var UserList = $resource('http://52.4.251.23:8080/userList/add');

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
