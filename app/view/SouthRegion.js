Ext.define('app.view.SouthRegion', {
    extend: 'Ext.container.Container',
    alias: "widget.southregion",
    uses: ["app.ux.Display", "app.ux.DisplayHtml"],
    items: [{
        xtype: 'displayhtml',
        flex: 1,
        height: '100%'
    }, {
        xtype: 'display',
        width: 300,
        height: '100%',
        htmlChange: function(val) {
            this.prev().setHtml(val);
        }
    }]
})
