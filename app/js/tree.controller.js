
app.controller('myCtrl',['$scope',
                        'ivhTreeviewMgr',
                        '$interval',
                        'ivhTreeviewBfs',
                        'ivhTreeviewOptions',
                        function($scope, ivhTreeviewMgr,$interval,ivhTreeviewBfs,ivhTreeviewOptions) {

    $scope.modalShown = false;

    $scope.produto = {
            codigo : null,
            descricao : null,
            observacao : null,
            edit : false
    };

    $scope.valid = {
                    cod : false,
                    desc: false,
                    salva: false
                   };


    $scope.edit = function(){
        if ($scope.select != null) {
            $scope.produto.codigo = $scope.select.codigo;
            $scope.produto.descricao = $scope.select.descricao;
            $scope.produto.observacao = $scope.select.observacao;
            $scope.produto.edit = true;
            $scope.valid.save = true;
            $scope.toggleModal();
        }
    }

    $scope.tt = function(){  
        if (!$scope.produto.edit){
            $scope.add($scope.produto);
        }else{
            salva();
        }      
        
        $scope.modalShown = !$scope.modalShown;
        resetModal();
    }

    function salva(){
        ivhTreeviewBfs($scope.stuff, function(node, parents) {
            if(node === $scope.select) {
                console.log($scope.produto.observacao);
              node.descricao = $scope.produto.descricao;
              node.observacao = $scope.produto.observacao;
              console.log(node.observacao);
            }
          });
    }

    $scope.changeCodigo = function(){        
        validaCod();
        $scope.validaBtnSave();
    }

    $scope.leaveCodigo = function(){
        validaCod();
        $scope.validaBtnSave();
       
    }

    $scope.changeDesc = function(){        
        validaDesc();
        $scope.validaBtnSave();
    }

    $scope.leaveDesc = function(){
        validaDesc();
        $scope.validaBtnSave();     
    }

    function resetModal(){
        $scope.valid = {
                    cod : false,
                    desc: false,
                    salva: false
                };
        $scope.produto = {
                    codigo : null,
                    descricao : null,
                    observacao : null,
                    edit : false
            };
    }
    
    function validaCod(){
        if ($scope.produto.codigo == null) {
            $scope.valid.cod = true;
        }else if(!$scope.produto.edit){
            $scope.valid.cod =_123();
        }  
        
    }

    function validaDesc(){
        console.log($scope.produto.descricao);
        if ($scope.produto.descricao == null || $scope.produto.descricao == '' ) {
            $scope.valid.desc = true;
        }else{
            $scope.valid.desc = false;
        }          
    }

    $scope.validaBtnSave = function(){
        console.log(!$scope.valid.cod  && !$scope.valid.desc);
        if (!$scope.valid.cod  && !$scope.valid.desc) {
            $scope.valid.salva = true;
        }else{
            $scope.valid.salva = false;
        }
    }

    function _123(){
        var r = false;
        ivhTreeviewBfs($scope.stuff, function(node, parents) {
            if(node.codigo == $scope.produto.codigo){
                r = true;
            }
        });
        return r;
    }

    $scope.toggleModal = function() {
        console.log($scope.valid.save);
        $scope.modalShown = !$scope.modalShown;
    };

    var opts = ivhTreeviewOptions();
    var isExpanded = opts.expandedAttribute;

    $scope.onFilterChange = function(str) {
        if(!str) {
          ivhTreeviewBfs($scope.stuff, function(node) {
            node[isExpanded] = node.savedExpandedState;
          });
        }
        
        if(1 === str.length) {
          ivhTreeviewBfs($scope.stuff, function(node) {
            node.savedExpandedState = node[isExpanded];
          });
          ivhTreeviewMgr.expandRecursive($scope.stuff);
        }
      };

    $scope.teste= function(ivhNode, ivhIsSelected, ivhTree){
        if ($scope.select != null &&
            $scope.select.codigo == ivhNode.codigo) {
            ivhTreeviewMgr.deselectAll($scope.stuff);
            $scope.select = null; 
        }else{
            ivhTreeviewMgr.deselectAll($scope.stuff);   
            ivhNode.selected = true;
            $scope.select = ivhNode;
        }
        
        
    }   

    $scope.expandPens = function() {
        ivhTreeviewMgr.expandRecursive($scope.stuff, $scope.stuff);
      };
      
      $scope.collapsePens = function() {
        ivhTreeviewMgr.collapseRecursive($scope.stuff, $scope.stuff);
      };

    $scope.add = function(add){
        if ($scope.select == null) {
            $scope.stuff.push(
                {
                    codigo: add.codigo,
                    descricao : add.descricao,
                    observacao : add.observacao,
                    children: []
                }
            );
        }else{
        $scope.select.children.push(
            {
                codigo: add.codigo,
                descricao : add.descricao,
                observacao : add.observacao,
                children: []
            }
        );
        }
        $interval(function(){ 
            $('[data-toggle="tooltip"]').tooltip();
        }, 500);
    }

    $scope.delete= function() {
        ivhTreeviewBfs($scope.stuff, function(node, parents) {
            if(node === $scope.select) {
              if(parents.length) {
                var nIx = parents[0].children.indexOf(node);
                parents[0].children.splice(nIx, 1);
                ivhTreeviewMgr.validate($scope.stuff);
              } else {
                var nIx = $scope.stuff.indexOf(node);
                $scope.stuff.splice(nIx, 1);
                ivhTreeviewMgr.validate($scope.stuff);
              }
            }
          }); 

          $scope.select = null;
          
    }

    $scope.select = null;

    $scope.stuff = [{
        codigo : 1,
        descricao: 'Stuff',
        observacao: 'teste',
        children: [{
          codigo : 2,
          descricao: 'Hats',
          observacao: 'teste',
          children: []
        }]
    }];
}]);

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })