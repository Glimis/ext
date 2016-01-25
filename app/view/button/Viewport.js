Ext.define('app.view.button.Viewport', {
    extend: 'Ext.container.Viewport',
    uses: ["app.view.button.ContentRegion"],
    layout: 'fit',
    padding:15,
    items: {
        id: 'contentregion',
        xtype: 'contentregion'
    }
});
