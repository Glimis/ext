Ext.define('app.ux.DisplayConsole', {
    extend: 'Ext.container.Container',
    alias: "widget.displayconsole",
    autoScroll:true,
    width:'100%',
    height:'100%',
    style:{
        border:'1px solid black'
    },
    /**
     * 增加一句话至于最前端
     * @param {[type]} value [description]
     */
    insert: function(value) {
        this.superclass.insert.call(this,0, {
            border:0,
            html:value
        });
    },
    items:[]
});