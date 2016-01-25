Ext.define('app.view.BaseViewport', {
    extend: 'Ext.container.Viewport',
    uses: ["app.ux.Display", "app.view.EastRegion", "app.view.SouthRegion"],
    layout: 'border',
    padding: "0 0 0 10",
    style: {
        "background": "white",

    },
    items: [{
        region: 'south',
        xtype: 'southregion',
        height: 200,
        layout: 'hbox'
    }, {
        border: 0,
        region: 'center',
        xtype: 'panel',
        contentEl: 'content',
        layout: 'fit',
        autoScroll: true
    }, {
        region: 'east',
        xtype: 'eastregion',
        width: 300,
    }],
    listeners: {
        /**
         * 设置模型
         * type
         * json
         */
        setModel: function(viewport, model) {
            var displayEdit = viewport.getDisplayEdit();
            displayEdit.setModel(model);

            viewport.fireEvent('flush', viewport);
        },
        /**
         * 设置字段
         */
        setField: function(viewport, key, value, btn) {

            var displayEdit = viewport.getDisplayEdit();

            if (!displayEdit.getModel()) {
                Ext.MessageBox.alert("警告", "数据格式错误,请先初始化数据")
                return;
            }
            var flag = displayEdit.setField(key, value);
            if (flag) {
                btn.addCls("red")
            } else {
                btn.removeCls("red")
            }
            viewport.fireEvent('flush', viewport);
        },
        /**
         * 根据edit进行刷新
         * 
         */
        flush: function(viewport) {
            var displayEdit = viewport.getDisplayEdit();
            var model = displayEdit.getModel();
            var display = viewport.getDisplay();
            display.add(model);

            var html = display.getHtml();
            var displayHtml = viewport.getDisplayHtml();
            displayHtml.setHtml(html);
        },
        init: function() {

            //初始化创建组建
            var modelbuttons = Ext.dom.Query.select('[cy-type=create]');

            if (modelbuttons) {
                modelbuttons.forEach(function(btn, index) {
                    var text = btn.getAttribute('cy-text') || '',
                        modelType = btn.getAttribute('cy-model') || '';
                    Ext.create('Ext.button.Button', {
                        text: text,
                        renderTo: btn,
                        handler: function() {
                            var viewport = Ext.viewport;
                            var model=viewport.getDisplayEdit().getModel();
                            if(!model){
                                model = viewport.meta.model;
                            }
                            model.type=modelType;
                            viewport.fireEvent('setModel', viewport, model);
                        }
                    });
                })
            }




            //初始化所有组建
            var buttons = Ext.dom.Query.select('[cy-type=config]');
            if (buttons) {
                buttons.forEach(function(btn, index) {

                    var text = btn.getAttribute('cy-text') || '',
                        fntext = btn.getAttribute('cy-data') || '';

                    var index = fntext.indexOf('=');
                    if (index < 0) {
                        return;
                    }
                    var key = fntext.substr(0, index),
                        value = fntext.substr(index + 1);

                    try {
                        value = JSON.parse(value);
                    } catch (e) {

                    }
                    Ext.create('Ext.button.Button', {
                        text: text,
                        renderTo: btn,
                        handler: function() {
                            var viewport = Ext.viewport;
                            viewport.fireEvent('setField', viewport, key, value, this);
                        }
                    });
                })
            }



            //初始化所有组建
            var buttons = Ext.dom.Query.select('[cy-type=method]');
            if (buttons) {
                buttons.forEach(function(btn, index) {
                    var text = btn.getAttribute('cy-text') || '',
                        fntext = btn.getAttribute('cy-data') || '';

                    Ext.create('Ext.button.Button', {
                        text: text,
                        renderTo: btn,
                        handler: function() {

                            var viewport = Ext.viewport;
                            viewport.doAction(fntext);

                            // viewport.fireEvent('flush',viewport)
                        }
                    });
                })
            }

            var buttons = Ext.dom.Query.select('[cy-type=console]');
            if (buttons) {
                buttons.forEach(function(btn, index) {
                    var text = btn.getAttribute('cy-text') || '',
                        fntext = btn.getAttribute('cy-data') || '';

                    Ext.create('Ext.button.Button', {
                        text: text,
                        renderTo: btn,
                        handler: function() {
                            var viewport = Ext.viewport;
                            var display = viewport.getDisplay();

                            var container = display.items.items[0];
                            var value = eval("container." + fntext);
                            if (Ext.isObject(value)) {
                                try {
                                    value = JSON.stringify(value);
                                } catch (e) {

                                }
                            }
                            viewport.getDisplayConsole().insert(fntext + ":" + value + "");
                        }
                    });
                })
            }
        }
    },
    getDisplay: function() {
        return this.down('display');
    },
    getDisplayEdit: function() {
        return this.down('displayedit');
    },
    getDisplayConsole: function() {
        return this.down('displayconsole');
    },
    getDisplayHtml: function() {
        return this.down('displayhtml');
    },
    doAction: function(fntxt) {
        var display = this.getDisplay();
        var rs=display.doAction(fntxt);
        var console = this.getDisplayConsole();
        console.insert(fntxt+":"+rs+"");
        var html = display.getHtml();
        var displayHtml = this.getDisplayHtml();
        displayHtml.setHtml(html);
    }
});
