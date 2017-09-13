app.controller('treeController',['ivhTreeviewMgr',
                                 '$interval',
                                 'ivhTreeviewBfs',
                                 'ivhTreeviewOptions',
                                 function(ivhTreeviewMgr,$interval,ivhTreeviewBfs,ivhTreeviewOptions) {
    // Vars
    var _this = this;
    var opts = ivhTreeviewOptions();
    var isExpanded = opts.expandedAttribute;

    _this.select = null;
    _this.stuff = [];
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

    /**
     * Funcoes do scope
     */
    _this.init = function(){
        $('[data-toggle="tooltip"]').tooltip();
    }


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

    _this.save = function(){  
        if (!_this.produto.edit){
            _this.add(_this.produto);
        }else{
            saveProd();
        }      
        _this.modalShown = !_this.modalShown;
        resetModal();
    }

    _this.changeCod = function(){        
        validCod();
        _this.validBtnSave();
    }

    _this.leaveCod = function(){
        validCod();
        _this.validBtnSave();
    }

    _this.changeDesc = function(){        
        validDesc();
        _this.validBtnSave();
    }

    _this.leaveDesc = function(){
        validDesc();
        _this.validBtnSave();     
    }

    _this.validBtnSave = function(){
        if(_this.produto.descricao != null &&
            _this.produto.descricao != '' && 
            _this.produto.codigo != null ){        
            if (_this.valid.cod == false &&
                 _this.valid.desc == false) {
                _this.valid.salva = true;
            }else{
                _this.valid.salva = false;
            }
        }else{
            _this.valid.salva = false;
        }
    }

    _this.toggleModal = function() {
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

    _this.selectNode= function(node, isSelected, tree){
        if (_this.select != null &&
            _this.select.codigo == node.codigo) {
            ivhTreeviewMgr.deselectAll(_this.stuff);
            _this.select = null; 
        }else{
            ivhTreeviewMgr.deselectAll(_this.stuff);   
            node.selected = true;
            _this.select = node;
        }
    }   

    _this.expandAll = function() {
        ivhTreeviewMgr.expandRecursive(_this.stuff, _this.stuff);
    };
      
    _this.collapseAll = function() {
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
        //Intervalo para colocar o tooltip
        $interval(function(){ 
            $('[data-toggle="tooltip"]').tooltip();
        }, 10);
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

    /**
     * Funcoes
     */
    function checkCod(){
        var r = false;
        ivhTreeviewBfs(_this.stuff, function(node, parents) {
            if(node.codigo == _this.produto.codigo){
                r = true;
            }
        });
        return r;
    }

    function validCod(){
        if (_this.produto.codigo == null) {
            _this.valid.cod = true;
        }else if(!_this.produto.edit){
            _this.valid.cod = checkCod();
        }     
    }

    function validDesc(){        
        if (_this.produto.descricao == null || _this.produto.descricao == '' ) {
            _this.valid.desc = true;
        }else{
            _this.valid.desc = false;
        }          
    }

    function saveProd(){
        ivhTreeviewBfs(_this.stuff, function(node, parents) {
            if(node === _this.select) {
              node.descricao = _this.produto.descricao;
              node.observacao = _this.produto.observacao;
            }
        });
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
    
}]);