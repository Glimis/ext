 Ext.define('app.view.Component.ContentRegion', {
     extend: 'Ext.container.Container',
     uses: ["app.ux.DisplayContainer"],
     alias: "widget.contentregion",
     layout: 'hbox',
     items: [{
         xtype: 'container',
         contentEl: 'content',
         flex: 1,
         autoScroll: true,
         height: '100%'
     }, {
         flex: 1,
         xtype: 'displaycontainer',
         itemId: 'displaycontainer',
         meta: {
             data: {
                 type: 'Ext.Component',
                 code: {

                 }
             }
         }
     }]
 });
