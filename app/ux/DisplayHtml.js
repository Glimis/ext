Ext.define('app.ux.DisplayHtml', {
    extend: 'Ext.container.Container',
    alias: "widget.displayhtml",
    autoEl: {
        tag: 'pre'
    },
    /**
     * 赋值
     */
    setHtml: function(val) {
        val = val || '';
        var dom = Ext.dom.Query.select('[data-ref=innerCt]', this.el.dom)[0];
        if (Ext.typeOf(val) == 'object') {
            val = JSON.stringify(val);
        }
        if (val[0] != '<') {
            dom.innerText = js_beautify(val);
        } else {
            // dom.innerText = style_html(val);
            dom.innerText = html_beautify(val);
        }
    }
})
