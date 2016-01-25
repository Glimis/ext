Ext.define('KitchenSink.view.HitTestComponent', {
    extend: 'Ext.draw.Component',
    xtype: 'hit-test-component',

    // Loading PathUtil is required to be able to hit test
    // and test for path intersections in sprites.
    requires: ['Ext.draw.PathUtil'],

    listeners: {
        element: 'element',
        scope: 'this',
        mouseDown: 'onMouseDown',
        mouseMove: 'onMouseDown'
    },

    onMouseDown: function (e) {
        var me = this,
            surface = me.getSurface(),
            sprites = surface.getItems(),
            xy = surface.getEventXY(e),
            x = xy[0],
            y = xy[1],
            i, ln, sprite;

        for (i = 0, ln = sprites.length; i < ln; i++) {
            sprite = sprites[i];
            if (sprite.isPointInPath(x, y)) {
                sprite.setAttributes({
                    strokeStyle: 'red',
                    debug: {
                        xray: true
                    }
                });
            } else {
                sprite.setAttributes({
                    strokeStyle: 'black',
                    debug: null
                });
            }
        }
        surface.renderFrame();
    }

});