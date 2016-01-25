/**
 * component
 * @type {String}
 */
Ext.define('app.view.component.Viewport', {
    extend: 'Ext.container.Viewport',
    uses: ["app.view.Component.ContentRegion"],
    layout: 'fit',
    padding:15,
    items: {
        id: 'contentregion',
        xtype: 'contentregion'
    }
});
