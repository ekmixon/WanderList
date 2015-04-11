'use strict';

angular.module('myAmericaApp').factory('RecArea', function($resource, RIDB_API_URL, RIDB_API_KEY) {
  var RecArea = $resource(RIDB_API_URL  + '/recareas/:parkId' + '.json');

  function get(params, callback) {
    RecArea.get(params, callback);
  }

  return {
    get: get
  };
});
