(function (angular) {
  'use strict';

  angular.module('Spa')
    .controller('SpaController', ['$scope', '$rootScope', '$window',
      function ($scope, $rootScope, $window) {

        $scope.test = 'Alooo!!!';

        $scope.clear = function () {
          $scope.data = undefined;
        };

        $scope.fileData = function (content) {
          console.log(content);
        };

      }
    ]);

})(angular);