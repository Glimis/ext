        Ext.define("app.ux.ConsolePanel", {
            renderTo:'test',
            title:'运行结果',
            extend: 'Ext.form.Panel',
            alias: "widget.consolepanel",
            defaults: {
                tpl: ['<div class="info" style="width:50%;padding-bottom:100px;margin-bottom:-100px;height:100%;float:left">{method} </div>',
                    '<div class="success" style="width:50%;padding-bottom:100px;margin-bottom:-100px;;height:100%;;float:left;">{result}</div>'
                ]
            },
            clean:true,
            initComponent: function() {
                var methods = this.methods;
                var items = this.items = [];
                if(methods&&methods.length>0){
                for (var i = 0; i < methods.length; i++) {
                    var method = methods[i];
                    items.push(this.methodStr2Data(method));
                }
                }
                this.callParent(arguments)
            },
            runMethod:function(method){
                this.add(this.methodStr2Data(method))
            },
            methodStr2Data:function(methodStr){
                var method=methodStr;
                if(this.clean&&method){
                    method=method.replace(/this./g,'');
                }
                var res=eval(methodStr);
                if(Ext.isObject(res)){
                    res=Ext.JSON.encode(res)
                }
                
                return {
                     data:{
                        method:method,
                        result:Ext.String.htmlEncode(res)
                    }
                }
            }
        })
