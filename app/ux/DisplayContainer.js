Ext.define('app.ux.DisplayContainer', {
    extend: 'Ext.container.Container',
    alias: "widget.displaycontainer",
    uses: ["app.ux.Display", "app.ux.DisplayEdit", "app.ux.DisplayHtml", "app.ux.DisplayConsole"],
    /**
     * 增加or删除属性
     * 
     */
    setField: function(key, value) {
        //1.获取模型
        var displayedit = this.getDisplayEdit();
        var model = displayedit.getModel();
        if (!model) {
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
    }, {
        xtype: 'displayhtml',
        width: '100%',
        height: '100%',
        flex: 1
    }, {
        xtype: 'container',
        width: '100%',
        height: '100%',
        style: {
            border: '1px solid black'
        },
        items: [{
            xtype: 'display',
        }],
        flex: 1
    }, {
        xtype: 'displayconsole',
        flex: 1
    }],
    initComponent: function() {
        this.callParent();
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
    }
})
