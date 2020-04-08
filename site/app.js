(function (angular) {
  angular.module('Spa', ['ngRoute', 'ui.bootstrap']);
})(angular);

(function (angular) {
  angular.module('Spa').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/page1', {
        controller: 'Page1Controller',
        templateUrl: 'page1/index.html',
      })
      .when('/page2', {
        controller: 'Page2Controller',
        templateUrl: 'page2/index.html'
      })
      .otherwise({ redirectTo: '/page1' });

  }]);
})(angular);

(function (angular) {
  angular.module('Spa').controller("Page1Controller", function ($scope) {
    $scope.msg = "Alooo Home";

    $scope.fileData = function (content) {
      var data = content.split(/[\n\r]+/);
      console.log(data);
    };
  });
})(angular);

(function (angular) {
  angular.module('Spa').controller("Page2Controller", function ($scope) {
    $scope.msg = "Alooo Test";
  });
})(angular);