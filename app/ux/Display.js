Ext.define('app.ux.Display', {
    extend: 'Ext.container.Container',
    alias: "widget.display",
    initComponent: function() {
        this.callParent();
    },
    listeners: {
        boxready: function(cpt, width, height, eOpts) {
            var dom = Ext.dom.Query.select('[data-ref="innerCt"]', this.el.dom)[0];
            console.log(dom);
            dom.afterInsertAdjacentHTML = function(e, val) {
                cpt.htmlChange(val);
            }
        }
    },
    // //将组建至于容器中
    add: function(obj) {
        var type = obj.type,
            json = obj.json;
        if (json) {
            type = 'Ext.create("' + type + '",' + JSON.stringify(json) + ')';
        }
        var item = eval("(" + type + ")");
        this.removeAll();
        this.superclass.add.call(this, item);
    },
    // //获取容器中的html
    getHtml: function() {
        return Ext.dom.Query.select('[data-ref="innerCt"]', this.el.dom)[0].innerHTML;
    },
    htmlChange: function(val) {

    },
    doAction: function(fntxt) {
        var container = this.items.items[0];
        return eval("container." + fntxt);
    }
});
