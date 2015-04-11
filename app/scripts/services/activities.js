'use strict';

angular.module('myAmericaApp').factory('Activities', function($resource, RIDB_API_URL, RIDB_API_KEY) {
  var RidbSearch = $resource(RIDB_API_URL  + '/activities' + '.json');

  function get(params, callback) {
  	params.push({"apikey":RIDB_API_KEY});
    RidbSearch.get(params, callback);
  }

  return {
    get: get
  };
});
