'use strict';

angular.module('myAmericaApp').factory('Flickr', function($resource) {
  var Flickr = $resource('https://www.googleapis.com/fusiontables/v2/query');

  function get(params, callback) {
    Flickr.get(params, callback);
  }

  return {
    get: get
  };
});
