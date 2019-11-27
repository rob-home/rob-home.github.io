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
          var file = event.dataTransfer.files[0];
          event.preventDefault();

          var reader = new FileReader();
          reader.onload = function (e) {
            scope.dropzoneCallback(reader.result);
          }
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