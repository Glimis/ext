Ext.define('app.ux.DisplayEdit', {
    extend: 'Ext.form.field.TextArea',
    alias: "widget.displayedit",
    width: '100%',
    height: 10,
    // grow: true,
    /**
     * 设置模型
     * @param {[type]} obj [description]
     */
    setModel: function(obj) {
        var type = obj.type,
            json = obj.json;
        if (json) {
            type = 'Ext.create("' + type + '",' + JSON.stringify(json) + ')';
        }
        var str = js_beautify(type);
        this.superclass.setValue.call(this, str);
    },
    /**
     * 分析并获取模型
     * @return null/obj
     */
    getModel: function() {
        var val = this.getValue();
        var types = val.match(/['"]([^'"]*)['"]/),
            type;
        if (types) {
            type = types[1];
        } else {
            return;
        }
        var jsons = val.match(/{[\s\S]*}/),
            json;
        if (jsons) {
            json = jsons[0];
        } else {
            return;
        }
        return {
            type: type,
            json: JSON.parse(json)
        }
    },
    /**
     * 
     * @param {[type]} key   [description]
     * @param {[type]} value ""/"[]"/json
     */
    setField: function(key, value) {
        var model = this.getModel();
        if (!model) {
            return;
        }
        if(value&&value.indexOf&&value.indexOf("[")==0){
            value=eval(value);
        }
        var flag=true;
        if (model.json[key] == undefined) {
            model.json[key] = value;
        } else {
            delete model.json[key];
            flag=false;
        }
        this.setModel(model);
        return flag;
    }
});
