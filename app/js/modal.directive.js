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
      template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog'><div class='card'><div class='card-header'>Produto<div class='ng-modal-close' ng-click='hideModal()'>X</div></div><div class='card-body' ng-transclude></div></div></div></div>"
    };
  });