Ext.define('app.view.EastRegion', {
    extend: 'Ext.container.Container',
    alias: "widget.eastregion",
    uses: [ "app.ux.DisplayEdit","app.ux.DisplayConsole"],
    /**
     * 增加or删除属性
     * 
     */
    setField: function(key, value) {
        //1.获取模型
        var displayedit = this.getDisplayEdit();
        var model = displayedit.getModel();
        if (!model) {
            alert();
            return;
        }
        if (model.json[key] == undefined) {
            model.json[key] = value;
        } else {
            delete model.json[key];
        }
        this.setModel(model);
    },
    /**
     * 初始化/重新设置
     * 
     */
    setModel: function(key, value) {
        var obj;

        if (Ext.isObject(key)) {
            obj = key;
            obj.json=Ext.apply(obj.json,this.meta.meta);
        } else {
            value=Ext.apply(value,this.meta.meta);
            obj = {
                type: key,
                json: value
            }
        }

        //1.编辑
        var displayEdit = this.getDisplayEdit();
        displayEdit.setModel(obj);
        //2.预览
        var display = this.getDisplay();
        display.add(obj);
        this.settingHtml();
    },
    /**
     * 获取预览信息
     */
    settingHtml: function() {
        var display = this.getDisplay();
        var html = display.getHtml();
        var displayHtml = this.getDisplayHtml();
        displayHtml.setHtml(html);
    },
    setListeners:function(meta){
        this.listeners=meta;
    },
    layout: 'vbox',
    height: '100%',
    items: [{
        xtype: 'button',
        text: '创建',
        handler: function(btn) {
            var container = btn.up('container');
            var displayEdit = container.getDisplayEdit();
            var model = displayEdit.getModel();
            container.setModel(model);
            this.num = this.num || 0;
            var num = this.num;

            var console = container.getDisplayConsole();
        }
    }, {
        xtype: 'displayedit',
        flex: 1
    },{
        xtype: 'displayconsole',
        height:100
    }]
})
