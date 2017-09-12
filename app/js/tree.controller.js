
app.controller('myCtrl',['$scope',
                        'ivhTreeviewMgr',
                        '$interval',
                        'ivhTreeviewBfs',
                        'ivhTreeviewOptions',
                        function($scope, ivhTreeviewMgr,$interval,ivhTreeviewBfs,ivhTreeviewOptions) {

    // Vars
    var _this = $scope;


    _this.modalShown = false;

    _this.produto = {
            codigo : null,
            descricao : null,
            observacao : null,
            edit : false
    };

    _this.valid = {
                    cod : false,
                    desc: false,
                    salva: false
                   };

    var opts = ivhTreeviewOptions();
    var isExpanded = opts.expandedAttribute;


    _this.edit = function(){
        if (_this.select != null) {
            _this.produto.codigo = _this.select.codigo;
            _this.produto.descricao = _this.select.descricao;
            _this.produto.observacao = _this.select.observacao;
            _this.produto.edit = true;
            _this.valid.save = true;
            _this.toggleModal();
        }
    }

    _this.tt = function(){  
        if (!_this.produto.edit){
            _this.add(_this.produto);
        }else{
            salva();
        }      
        
        _this.modalShown = !_this.modalShown;
        resetModal();
    }

    function salva(){
        ivhTreeviewBfs(_this.stuff, function(node, parents) {
            if(node === _this.select) {
                console.log(_this.produto.observacao);
              node.descricao = _this.produto.descricao;
              node.observacao = _this.produto.observacao;
              console.log(node.observacao);
            }
          });
    }

    _this.changeCodigo = function(){        
        validaCod();
        _this.validaBtnSave();
    }

    _this.leaveCodigo = function(){
        validaCod();
        _this.validaBtnSave();
       
    }

    _this.changeDesc = function(){        
        validaDesc();
        _this.validaBtnSave();
    }

    _this.leaveDesc = function(){
        validaDesc();
        _this.validaBtnSave();     
    }

    function resetModal(){
        _this.valid = {
                    cod : false,
                    desc: false,
                    salva: false
                };
                _this.produto = {
                    codigo : null,
                    descricao : null,
                    observacao : null,
                    edit : false
            };
    }
    
    function validaCod(){
        if (_this.produto.codigo == null) {
            _this.valid.cod = true;
        }else if(!_this.produto.edit){
            console.log("1111");
            _this.valid.cod =_123();
            console.log(_this.valid.cod);
        }  
        
    }

    function validaDesc(){        
        if (_this.produto.descricao == null || _this.produto.descricao == '' ) {
            _this.valid.desc = true;
        }else{
            _this.valid.desc = false;
        }          
    }

    _this.validaBtnSave = function(){
        if(_this.produto.descricao != null &&
            _this.produto.descricao != '' && 
            _this.produto.codigo != null ){        
            if (_this.valid.cod == false && _this.valid.desc == false) {
                _this.valid.salva = true;
            }else{
                _this.valid.salva = false;
            }
        }else{
            _this.valid.salva = false;
        }
    }

    function _123(){
        var r = false;
        ivhTreeviewBfs(_this.stuff, function(node, parents) {
            if(node.codigo == _this.produto.codigo){
                r = true;
            }
        });
        return r;
    }

    _this.toggleModal = function() {
        console.log(_this.valid.save);
        _this.modalShown = !_this.modalShown;
    };
    

    _this.onFilterChange = function(str) {
        if(!str) {
          ivhTreeviewBfs(_this.stuff, function(node) {
            node[isExpanded] = node.savedExpandedState;
          });
        }
        
        if(1 === str.length) {
          ivhTreeviewBfs(_this.stuff, function(node) {
            node.savedExpandedState = node[isExpanded];
          });
          ivhTreeviewMgr.expandRecursive(_this.stuff);
        }
    };

    _this.teste= function(ivhNode, ivhIsSelected, ivhTree){
        if (_this.select != null &&
            _this.select.codigo == ivhNode.codigo) {
            ivhTreeviewMgr.deselectAll(_this.stuff);
            _this.select = null; 
        }else{
            ivhTreeviewMgr.deselectAll(_this.stuff);   
            ivhNode.selected = true;
            _this.select = ivhNode;
        }
        
        
    }   

    _this.expandPens = function() {
        ivhTreeviewMgr.expandRecursive(_this.stuff, _this.stuff);
      };
      
      _this.collapsePens = function() {
        ivhTreeviewMgr.collapseRecursive(_this.stuff, _this.stuff);
      };

      _this.add = function(add){
        if (_this.select == null) {
            _this.stuff.push(
                {
                    codigo: add.codigo,
                    descricao : add.descricao,
                    observacao : add.observacao,
                    children: []
                }
            );
        }else{
            _this.select.children.push(
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

    _this.delete= function() {
        ivhTreeviewBfs(_this.stuff, function(node, parents) {
            if(node === _this.select) {
              if(parents.length) {
                var nIx = parents[0].children.indexOf(node);
                parents[0].children.splice(nIx, 1);
                ivhTreeviewMgr.validate(_this.stuff);
              } else {
                var nIx = _this.stuff.indexOf(node);
                _this.stuff.splice(nIx, 1);
                ivhTreeviewMgr.validate(_this.stuff);
              }
            }
          }); 

          _this.select = null;
          
    }

    _this.select = null;

    _this.stuff = [{
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