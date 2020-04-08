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