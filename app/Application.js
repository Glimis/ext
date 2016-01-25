Ext.define('app.Application', {
	views:["app.view.Nav","app.view.Code","app.view.Effect","app.view.Html","app.store.LayoutDemoStore"],
    extend: 'Ext.app.Application',
    name: 'app',
    // stores: ['User'],
    //controllers: ['User'],
    // models:['User'],
    autoCreateViewport: true,
    launch: function() {}
});
