'use strict';

angular.module('myAmericaApp').factory('RecAreas', function($resource, RIDB_API_URL, RIDB_API_KEY) {
  var RecArea = $resource(RIDB_API_URL  + '/recareas' + '.json');

  function get(params, callback) {
    RecArea.get(params, callback);
  }

  return {
    get: get
  };
});
