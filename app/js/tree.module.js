var app = angular.module('myApp', ['ivh.treeview']);

app.config(function(ivhTreeviewOptionsProvider) {
    ivhTreeviewOptionsProvider.set({
        idAttribute: 'codigo',
        labelAttribute: 'descricao',
        twistieCollapsedTpl: '<span class="fa fa-caret-right"></span>',
        twistieExpandedTpl: '<span class="fa fa-caret-down"></span>',
        twistieLeafTpl: '',
        defaultSelectedState: false,
        disableCheckboxSelectionPropagation: true,
        nodeTpl: [
            '<div>',
            '<div ng-class="{select: node.selected}">',
            '<span ivh-treeview-toggle>',
            '<span ivh-treeview-twistie class="mouse-click"></span>',
            '</span>',
            '<span data-toggle="tooltip" data-original-title="{{node.codigo}} - {{node.descricao}} - {{node.observacao}}" data-placement="bottom" title="{{node.codigo}} - {{node.descricao}} - {{node.observacao}}"  class="ivh-treeview-node-label mouse-click" ng-click="trvw.toggleSelected(node)">',           
             '{{trvw.label(node)}}',
            '</span>',
            '</div>',
            '<div ivh-treeview-children></div>',
            '</div>'
        ].join('\n')
      });
   });