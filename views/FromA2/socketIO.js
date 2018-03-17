angular.module('myApp')
.factory('io', ['$window', '$rootScope', function($window, $rootScope) {
  var _socket = io('/tech');
  return {
    on: function(eventType, cb) {
      _socket.on(eventType, function() {
        cb(); 
        //NOTE: calling $apply will ensure that any model changes are reflected in the view
        $rootScope.$apply();
      });
    },
    emit: function(eventType, data) {
      _socket.emit(eventType, data);
    }
  };
}]);