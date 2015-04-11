
'use strict';

angular.module('myAmerica').factory('Answer', function($resource, API_URL) {
  var Answer = $resource(API_URL + '/answer');

  function query(params, callback) {
    Answer.query(params, callback);
  }

  function create(params, body, callback) {
    var AnswerCreate = Answer.bind(params);
    var answer = new AnswerCreate(body);
    answer.$save();
    callback(answer);
  }

  function save(body, callback) {
    var answer = new Answer(body);
    answer.$save();
    callback(answer);
  }

  return {
    query: query,
    save: save
  }
});

