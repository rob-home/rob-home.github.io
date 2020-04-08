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
  angular.module('Spa').controller("Page1Controller", ["$scope", function ($scope) {
    $scope.msg = "Alooo Home";

    $scope.fileData = function (content) {
      var data = content.split(/[\n\r]+/);
      console.log(data);
    };
  }]);
})(angular);

(function (angular) {
  angular.module('Spa').controller("Page2Controller", ["$scope", function ($scope) {
    $scope.msg = "Alooo Test";
  }]);
})(angular);
(function (angular) {
  'use strict';

  angular.module('Spa').directive("dropzone", ['$timeout', function ($timeout) {
    return {
      restrict: "A",
      scope: {
        dropzoneCallback: '=?'
      },
      link: function (scope, element, attrs) {
        scope.elementId = 'element-' + Math.floor(Math.random() * 999) + '-' + new Date().getTime();
        element.attr('id', scope.elementId);

        element.bind('dragover', processDragOverOrEnter);
        element.bind('dragenter', processDragOverOrEnter);
        element.bind('dragend', endDragOver);
        element.bind('dragleave', endDragOver);
        element.bind('drop', dropHandler);

        function dropHandler(angularEvent) {

          var event = angularEvent.originalEvent || angularEvent;
          var files = event.dataTransfer.files;
          event.preventDefault();
 
          console.log(angular.toJson(files));

          Object.getOwnPropertyNames(files).forEach(function(idx) {
            console.log(files[idx]);
          });

          // var r = files.map(function(file) {
          //   var x = {
          //     file: file,
          //     reader: new FileReader(),
          //     data: undefined,
          //     processed: false
          //   }

          //   x.reader.onload = function(e) {
          //     x.data = x.reader.result;
          //     x.processed = true;
          //   };

          //   x.reader.readAsText(x.file);
          // });

          // console.log(angular.toJson(r))


        }

        function dropHandlerSingle(angularEvent) {

          var event = angularEvent.originalEvent || angularEvent;
          var file = event.dataTransfer.files[0];

          console.log(angular.toJson(file));
          event.preventDefault();

          var reader = new FileReader();
          reader.onload = function (e) {
            scope.dropzoneCallback(reader.result);
          }
          console.log(file);
          reader.readAsText(file);

        }

        function processDragOverOrEnter(angularEvent) {
          var event = angularEvent.originalEvent || angularEvent;
          if (event) {
            event.preventDefault();
          }
          event.dataTransfer.effectAllowed = 'copy';
          element.addClass('dragging');
          return false;
        }

        function endDragOver() {
          element.removeClass('dragging');
        }
      }
    }
  }]);
}(angular));
angular.module('Spa').run(['$templateCache', function($templateCache) {$templateCache.put('page2/index.html','<div ng-controller="Page2Controller">\r\n  <div class="well well-danger">\r\n    Test : {{msg}}\r\n  </div>\r\n</div>');
$templateCache.put('page1/index.html','<div ng-controller="Page1Controller">\r\n  <div class="well well-danger">\r\n    Test : {{msg}}\r\n  </div>\r\n\r\n  <div class="well" dropzone dropzone-callback="fileData">\r\n    Drag file here\r\n  </div>\r\n</div>');}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRpcmVjdGl2ZS9kcm9wem9uZS5qcyIsIm1haW4uanMiLCJ0ZW1wbGF0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxVQUFBLFNBQUE7RUFDQSxRQUFBLE9BQUEsT0FBQSxDQUFBLFdBQUE7R0FDQTs7QUFFQSxDQUFBLFVBQUEsU0FBQTtFQUNBLFFBQUEsT0FBQSxPQUFBLE9BQUEsQ0FBQSxrQkFBQSxxQkFBQSxVQUFBLGdCQUFBLG1CQUFBOztJQUVBLGtCQUFBLFdBQUE7O0lBRUE7T0FDQSxLQUFBLFVBQUE7UUFDQSxZQUFBO1FBQ0EsYUFBQTs7T0FFQSxLQUFBLFVBQUE7UUFDQSxZQUFBO1FBQ0EsYUFBQTs7T0FFQSxVQUFBLEVBQUEsWUFBQTs7O0dBR0E7O0FBRUEsQ0FBQSxVQUFBLFNBQUE7RUFDQSxRQUFBLE9BQUEsT0FBQSxXQUFBLDhCQUFBLFVBQUEsUUFBQTtJQUNBLE9BQUEsTUFBQTs7SUFFQSxPQUFBLFdBQUEsVUFBQSxTQUFBO01BQ0EsSUFBQSxPQUFBLFFBQUEsTUFBQTtNQUNBLFFBQUEsSUFBQTs7O0dBR0E7O0FBRUEsQ0FBQSxVQUFBLFNBQUE7RUFDQSxRQUFBLE9BQUEsT0FBQSxXQUFBLDhCQUFBLFVBQUEsUUFBQTtJQUNBLE9BQUEsTUFBQTs7R0FFQTtBQ3RDQSxDQUFBLFVBQUEsU0FBQTtFQUNBOztFQUVBLFFBQUEsT0FBQSxPQUFBLFVBQUEsWUFBQSxDQUFBLFlBQUEsVUFBQSxVQUFBO0lBQ0EsT0FBQTtNQUNBLFVBQUE7TUFDQSxPQUFBO1FBQ0Esa0JBQUE7O01BRUEsTUFBQSxVQUFBLE9BQUEsU0FBQSxPQUFBO1FBQ0EsTUFBQSxZQUFBLGFBQUEsS0FBQSxNQUFBLEtBQUEsV0FBQSxPQUFBLE1BQUEsSUFBQSxPQUFBO1FBQ0EsUUFBQSxLQUFBLE1BQUEsTUFBQTs7UUFFQSxRQUFBLEtBQUEsWUFBQTtRQUNBLFFBQUEsS0FBQSxhQUFBO1FBQ0EsUUFBQSxLQUFBLFdBQUE7UUFDQSxRQUFBLEtBQUEsYUFBQTtRQUNBLFFBQUEsS0FBQSxRQUFBOztRQUVBLFNBQUEsWUFBQSxjQUFBOztVQUVBLElBQUEsUUFBQSxhQUFBLGlCQUFBO1VBQ0EsSUFBQSxRQUFBLE1BQUEsYUFBQTtVQUNBLE1BQUE7O1VBRUEsUUFBQSxJQUFBLFFBQUEsT0FBQTs7VUFFQSxPQUFBLG9CQUFBLE9BQUEsUUFBQSxTQUFBLEtBQUE7WUFDQSxRQUFBLElBQUEsTUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBd0JBLFNBQUEsa0JBQUEsY0FBQTs7VUFFQSxJQUFBLFFBQUEsYUFBQSxpQkFBQTtVQUNBLElBQUEsT0FBQSxNQUFBLGFBQUEsTUFBQTs7VUFFQSxRQUFBLElBQUEsUUFBQSxPQUFBO1VBQ0EsTUFBQTs7VUFFQSxJQUFBLFNBQUEsSUFBQTtVQUNBLE9BQUEsU0FBQSxVQUFBLEdBQUE7WUFDQSxNQUFBLGlCQUFBLE9BQUE7O1VBRUEsUUFBQSxJQUFBO1VBQ0EsT0FBQSxXQUFBOzs7O1FBSUEsU0FBQSx1QkFBQSxjQUFBO1VBQ0EsSUFBQSxRQUFBLGFBQUEsaUJBQUE7VUFDQSxJQUFBLE9BQUE7WUFDQSxNQUFBOztVQUVBLE1BQUEsYUFBQSxnQkFBQTtVQUNBLFFBQUEsU0FBQTtVQUNBLE9BQUE7OztRQUdBLFNBQUEsY0FBQTtVQUNBLFFBQUEsWUFBQTs7Ozs7RUFLQTtBQ3dDQSxRQUFRLE9BQU8sT0FBTyxJQUFJLENBQUMsa0JBQWtCLFNBQVMsZ0JBQWdCLENDN0h0RSxlQUFBLElBQUEsbUJBQUE7QUFDQSxlQUFBLElBQUEsbUJBQUEsaU9BQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoYW5ndWxhcikge1xyXG4gIGFuZ3VsYXIubW9kdWxlKCdTcGEnLCBbJ25nUm91dGUnLCAndWkuYm9vdHN0cmFwJ10pO1xyXG59KShhbmd1bGFyKTtcclxuXHJcbihmdW5jdGlvbiAoYW5ndWxhcikge1xyXG4gIGFuZ3VsYXIubW9kdWxlKCdTcGEnKS5jb25maWcoWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsIGZ1bmN0aW9uICgkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuXHJcbiAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCcnKTtcclxuXHJcbiAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAud2hlbignL3BhZ2UxJywge1xyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlMUNvbnRyb2xsZXInLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAncGFnZTEvaW5kZXguaHRtbCcsXHJcbiAgICAgIH0pXHJcbiAgICAgIC53aGVuKCcvcGFnZTInLCB7XHJcbiAgICAgICAgY29udHJvbGxlcjogJ1BhZ2UyQ29udHJvbGxlcicsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwYWdlMi9pbmRleC5odG1sJ1xyXG4gICAgICB9KVxyXG4gICAgICAub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy9wYWdlMScgfSk7XHJcblxyXG4gIH1dKTtcclxufSkoYW5ndWxhcik7XHJcblxyXG4oZnVuY3Rpb24gKGFuZ3VsYXIpIHtcclxuICBhbmd1bGFyLm1vZHVsZSgnU3BhJykuY29udHJvbGxlcihcIlBhZ2UxQ29udHJvbGxlclwiLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUubXNnID0gXCJBbG9vbyBIb21lXCI7XHJcblxyXG4gICAgJHNjb3BlLmZpbGVEYXRhID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgdmFyIGRhdGEgPSBjb250ZW50LnNwbGl0KC9bXFxuXFxyXSsvKTtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG59KShhbmd1bGFyKTtcclxuXHJcbihmdW5jdGlvbiAoYW5ndWxhcikge1xyXG4gIGFuZ3VsYXIubW9kdWxlKCdTcGEnKS5jb250cm9sbGVyKFwiUGFnZTJDb250cm9sbGVyXCIsIGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuICAgICRzY29wZS5tc2cgPSBcIkFsb29vIFRlc3RcIjtcclxuICB9KTtcclxufSkoYW5ndWxhcik7IiwiKGZ1bmN0aW9uIChhbmd1bGFyKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnU3BhJykuZGlyZWN0aXZlKFwiZHJvcHpvbmVcIiwgWyckdGltZW91dCcsIGZ1bmN0aW9uICgkdGltZW91dCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcmVzdHJpY3Q6IFwiQVwiLFxyXG4gICAgICBzY29wZToge1xyXG4gICAgICAgIGRyb3B6b25lQ2FsbGJhY2s6ICc9PydcclxuICAgICAgfSxcclxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgIHNjb3BlLmVsZW1lbnRJZCA9ICdlbGVtZW50LScgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5OTkpICsgJy0nICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgZWxlbWVudC5hdHRyKCdpZCcsIHNjb3BlLmVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuYmluZCgnZHJhZ292ZXInLCBwcm9jZXNzRHJhZ092ZXJPckVudGVyKTtcclxuICAgICAgICBlbGVtZW50LmJpbmQoJ2RyYWdlbnRlcicsIHByb2Nlc3NEcmFnT3Zlck9yRW50ZXIpO1xyXG4gICAgICAgIGVsZW1lbnQuYmluZCgnZHJhZ2VuZCcsIGVuZERyYWdPdmVyKTtcclxuICAgICAgICBlbGVtZW50LmJpbmQoJ2RyYWdsZWF2ZScsIGVuZERyYWdPdmVyKTtcclxuICAgICAgICBlbGVtZW50LmJpbmQoJ2Ryb3AnLCBkcm9wSGFuZGxlcik7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRyb3BIYW5kbGVyKGFuZ3VsYXJFdmVudCkge1xyXG5cclxuICAgICAgICAgIHZhciBldmVudCA9IGFuZ3VsYXJFdmVudC5vcmlnaW5hbEV2ZW50IHx8IGFuZ3VsYXJFdmVudDtcclxuICAgICAgICAgIHZhciBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcztcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiBcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGFuZ3VsYXIudG9Kc29uKGZpbGVzKSk7XHJcblxyXG4gICAgICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZmlsZXMpLmZvckVhY2goZnVuY3Rpb24oaWR4KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGVzW2lkeF0pO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gdmFyIHIgPSBmaWxlcy5tYXAoZnVuY3Rpb24oZmlsZSkge1xyXG4gICAgICAgICAgLy8gICB2YXIgeCA9IHtcclxuICAgICAgICAgIC8vICAgICBmaWxlOiBmaWxlLFxyXG4gICAgICAgICAgLy8gICAgIHJlYWRlcjogbmV3IEZpbGVSZWFkZXIoKSxcclxuICAgICAgICAgIC8vICAgICBkYXRhOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAvLyAgICAgcHJvY2Vzc2VkOiBmYWxzZVxyXG4gICAgICAgICAgLy8gICB9XHJcblxyXG4gICAgICAgICAgLy8gICB4LnJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAvLyAgICAgeC5kYXRhID0geC5yZWFkZXIucmVzdWx0O1xyXG4gICAgICAgICAgLy8gICAgIHgucHJvY2Vzc2VkID0gdHJ1ZTtcclxuICAgICAgICAgIC8vICAgfTtcclxuXHJcbiAgICAgICAgICAvLyAgIHgucmVhZGVyLnJlYWRBc1RleHQoeC5maWxlKTtcclxuICAgICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFuZ3VsYXIudG9Kc29uKHIpKVxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBkcm9wSGFuZGxlclNpbmdsZShhbmd1bGFyRXZlbnQpIHtcclxuXHJcbiAgICAgICAgICB2YXIgZXZlbnQgPSBhbmd1bGFyRXZlbnQub3JpZ2luYWxFdmVudCB8fCBhbmd1bGFyRXZlbnQ7XHJcbiAgICAgICAgICB2YXIgZmlsZSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlc1swXTtcclxuXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhhbmd1bGFyLnRvSnNvbihmaWxlKSk7XHJcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmRyb3B6b25lQ2FsbGJhY2socmVhZGVyLnJlc3VsdCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlKTtcclxuICAgICAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NEcmFnT3Zlck9yRW50ZXIoYW5ndWxhckV2ZW50KSB7XHJcbiAgICAgICAgICB2YXIgZXZlbnQgPSBhbmd1bGFyRXZlbnQub3JpZ2luYWxFdmVudCB8fCBhbmd1bGFyRXZlbnQ7XHJcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ2NvcHknO1xyXG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGVuZERyYWdPdmVyKCkge1xyXG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XSk7XHJcbn0oYW5ndWxhcikpOyIsIihmdW5jdGlvbiAoYW5ndWxhcikge1xyXG4gIGFuZ3VsYXIubW9kdWxlKCdTcGEnLCBbJ25nUm91dGUnLCAndWkuYm9vdHN0cmFwJ10pO1xyXG59KShhbmd1bGFyKTtcclxuXHJcbihmdW5jdGlvbiAoYW5ndWxhcikge1xyXG4gIGFuZ3VsYXIubW9kdWxlKCdTcGEnKS5jb25maWcoWyckcm91dGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsIGZ1bmN0aW9uICgkcm91dGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcclxuXHJcbiAgICAkbG9jYXRpb25Qcm92aWRlci5oYXNoUHJlZml4KCcnKTtcclxuXHJcbiAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAud2hlbignL3BhZ2UxJywge1xyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQYWdlMUNvbnRyb2xsZXInLFxyXG4gICAgICAgIHRlbXBsYXRlVXJsOiAncGFnZTEvaW5kZXguaHRtbCcsXHJcbiAgICAgIH0pXHJcbiAgICAgIC53aGVuKCcvcGFnZTInLCB7XHJcbiAgICAgICAgY29udHJvbGxlcjogJ1BhZ2UyQ29udHJvbGxlcicsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwYWdlMi9pbmRleC5odG1sJ1xyXG4gICAgICB9KVxyXG4gICAgICAub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy9wYWdlMScgfSk7XHJcblxyXG4gIH1dKTtcclxufSkoYW5ndWxhcik7XHJcblxyXG4oZnVuY3Rpb24gKGFuZ3VsYXIpIHtcclxuICBhbmd1bGFyLm1vZHVsZSgnU3BhJykuY29udHJvbGxlcihcIlBhZ2UxQ29udHJvbGxlclwiLCBmdW5jdGlvbiAoJHNjb3BlKSB7XHJcbiAgICAkc2NvcGUubXNnID0gXCJBbG9vbyBIb21lXCI7XHJcblxyXG4gICAgJHNjb3BlLmZpbGVEYXRhID0gZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuICAgICAgdmFyIGRhdGEgPSBjb250ZW50LnNwbGl0KC9bXFxuXFxyXSsvKTtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG59KShhbmd1bGFyKTtcclxuXHJcbihmdW5jdGlvbiAoYW5ndWxhcikge1xyXG4gIGFuZ3VsYXIubW9kdWxlKCdTcGEnKS5jb250cm9sbGVyKFwiUGFnZTJDb250cm9sbGVyXCIsIGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuICAgICRzY29wZS5tc2cgPSBcIkFsb29vIFRlc3RcIjtcclxuICB9KTtcclxufSkoYW5ndWxhcik7XG4oZnVuY3Rpb24gKGFuZ3VsYXIpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdTcGEnKS5kaXJlY3RpdmUoXCJkcm9wem9uZVwiLCBbJyR0aW1lb3V0JywgZnVuY3Rpb24gKCR0aW1lb3V0KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICByZXN0cmljdDogXCJBXCIsXHJcbiAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgZHJvcHpvbmVDYWxsYmFjazogJz0/J1xyXG4gICAgICB9LFxyXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgc2NvcGUuZWxlbWVudElkID0gJ2VsZW1lbnQtJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDk5OSkgKyAnLScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBlbGVtZW50LmF0dHIoJ2lkJywgc2NvcGUuZWxlbWVudElkKTtcclxuXHJcbiAgICAgICAgZWxlbWVudC5iaW5kKCdkcmFnb3ZlcicsIHByb2Nlc3NEcmFnT3Zlck9yRW50ZXIpO1xyXG4gICAgICAgIGVsZW1lbnQuYmluZCgnZHJhZ2VudGVyJywgcHJvY2Vzc0RyYWdPdmVyT3JFbnRlcik7XHJcbiAgICAgICAgZWxlbWVudC5iaW5kKCdkcmFnZW5kJywgZW5kRHJhZ092ZXIpO1xyXG4gICAgICAgIGVsZW1lbnQuYmluZCgnZHJhZ2xlYXZlJywgZW5kRHJhZ092ZXIpO1xyXG4gICAgICAgIGVsZW1lbnQuYmluZCgnZHJvcCcsIGRyb3BIYW5kbGVyKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJvcEhhbmRsZXIoYW5ndWxhckV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgdmFyIGV2ZW50ID0gYW5ndWxhckV2ZW50Lm9yaWdpbmFsRXZlbnQgfHwgYW5ndWxhckV2ZW50O1xyXG4gICAgICAgICAgdmFyIGZpbGVzID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuIFxyXG4gICAgICAgICAgY29uc29sZS5sb2coYW5ndWxhci50b0pzb24oZmlsZXMpKTtcclxuXHJcbiAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhmaWxlcykuZm9yRWFjaChmdW5jdGlvbihpZHgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZXNbaWR4XSk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAvLyB2YXIgciA9IGZpbGVzLm1hcChmdW5jdGlvbihmaWxlKSB7XHJcbiAgICAgICAgICAvLyAgIHZhciB4ID0ge1xyXG4gICAgICAgICAgLy8gICAgIGZpbGU6IGZpbGUsXHJcbiAgICAgICAgICAvLyAgICAgcmVhZGVyOiBuZXcgRmlsZVJlYWRlcigpLFxyXG4gICAgICAgICAgLy8gICAgIGRhdGE6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIC8vICAgICBwcm9jZXNzZWQ6IGZhbHNlXHJcbiAgICAgICAgICAvLyAgIH1cclxuXHJcbiAgICAgICAgICAvLyAgIHgucmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIC8vICAgICB4LmRhdGEgPSB4LnJlYWRlci5yZXN1bHQ7XHJcbiAgICAgICAgICAvLyAgICAgeC5wcm9jZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgICAgLy8gICB9O1xyXG5cclxuICAgICAgICAgIC8vICAgeC5yZWFkZXIucmVhZEFzVGV4dCh4LmZpbGUpO1xyXG4gICAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYW5ndWxhci50b0pzb24ocikpXHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRyb3BIYW5kbGVyU2luZ2xlKGFuZ3VsYXJFdmVudCkge1xyXG5cclxuICAgICAgICAgIHZhciBldmVudCA9IGFuZ3VsYXJFdmVudC5vcmlnaW5hbEV2ZW50IHx8IGFuZ3VsYXJFdmVudDtcclxuICAgICAgICAgIHZhciBmaWxlID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzWzBdO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKGFuZ3VsYXIudG9Kc29uKGZpbGUpKTtcclxuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgc2NvcGUuZHJvcHpvbmVDYWxsYmFjayhyZWFkZXIucmVzdWx0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgICAgICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcHJvY2Vzc0RyYWdPdmVyT3JFbnRlcihhbmd1bGFyRXZlbnQpIHtcclxuICAgICAgICAgIHZhciBldmVudCA9IGFuZ3VsYXJFdmVudC5vcmlnaW5hbEV2ZW50IHx8IGFuZ3VsYXJFdmVudDtcclxuICAgICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSAnY29weSc7XHJcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCdkcmFnZ2luZycpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZW5kRHJhZ092ZXIoKSB7XHJcbiAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1dKTtcclxufShhbmd1bGFyKSk7XG5hbmd1bGFyLm1vZHVsZSgnU3BhJykucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkgeyR0ZW1wbGF0ZUNhY2hlLnB1dCgncGFnZTIvaW5kZXguaHRtbCcsJzxkaXYgbmctY29udHJvbGxlcj1cIlBhZ2UyQ29udHJvbGxlclwiPlxcclxcbiAgPGRpdiBjbGFzcz1cIndlbGwgd2VsbC1kYW5nZXJcIj5cXHJcXG4gICAgVGVzdCA6IHt7bXNnfX1cXHJcXG4gIDwvZGl2PlxcclxcbjwvZGl2PicpO1xuJHRlbXBsYXRlQ2FjaGUucHV0KCdwYWdlMS9pbmRleC5odG1sJywnPGRpdiBuZy1jb250cm9sbGVyPVwiUGFnZTFDb250cm9sbGVyXCI+XFxyXFxuICA8ZGl2IGNsYXNzPVwid2VsbCB3ZWxsLWRhbmdlclwiPlxcclxcbiAgICBUZXN0IDoge3ttc2d9fVxcclxcbiAgPC9kaXY+XFxyXFxuXFxyXFxuICA8ZGl2IGNsYXNzPVwid2VsbFwiIGRyb3B6b25lIGRyb3B6b25lLWNhbGxiYWNrPVwiZmlsZURhdGFcIj5cXHJcXG4gICAgRHJhZyBmaWxlIGhlcmVcXHJcXG4gIDwvZGl2PlxcclxcbjwvZGl2PicpO31dKTsiLG51bGxdfQ==
