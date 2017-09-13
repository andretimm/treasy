app.directive('modalDialog', function() {
    return {
      restrict: 'E',
      scope: {
        show: '=',
        produto : '=',
        valid : '='
      },
      replace: true,
      transclude: true,
      link: function(scope, element, attrs) {
        scope.hideModal = function() {
          scope.show = false;
          scope.valid = {
                          cod : false,
                          desc: false,
                          salva: false
                        };
          scope.produto = {
                            codigo : null,
                            descricao : null,
                            observacao : null,
                            edit : false
                          };
        };
      },
      templateUrl: 'js/directive/modal.view.html' 
    };
  });