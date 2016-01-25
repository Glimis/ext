Ext.data.JsonP.Ext_Inventory({"parentMixins":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Inventory.html#Ext-Inventory' target='_blank'>Inventory.js</a></div></pre><div class='doc-contents'><div class='rounded-box private-box'><p><strong>NOTE:</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p></div>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-getAliasesByName' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Inventory'>Ext.Inventory</span><br/><a href='source/Inventory.html#Ext-Inventory-method-getAliasesByName' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Inventory-method-getAliasesByName' class='name expandable'>getAliasesByName</a>( <span class='pre'>name</span> ) : <a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get the aliases of a class by the class name ...</div><div class='long'><p>Get the aliases of a class by the class name</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Array\" rel=\"Array\" class=\"docClass\">Array</a></span><div class='sub-desc'><p>aliases</p>\n</div></li></ul></div></div></div><div id='method-getNameByAlias' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Inventory'>Ext.Inventory</span><br/><a href='source/Inventory.html#Ext-Inventory-method-getNameByAlias' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Inventory-method-getNameByAlias' class='name expandable'>getNameByAlias</a>( <span class='pre'>alias</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get the name of a class by its alias. ...</div><div class='long'><p>Get the name of a class by its alias.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>alias</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>className</p>\n</div></li></ul></div></div></div><div id='method-getNameByAlternate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Inventory'>Ext.Inventory</span><br/><a href='source/Inventory.html#Ext-Inventory-method-getNameByAlternate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Inventory-method-getNameByAlternate' class='name expandable'>getNameByAlternate</a>( <span class='pre'>alternate</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Get the name of a class by its alternate name. ...</div><div class='long'><p>Get the name of a class by its alternate name.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>alternate</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a></span><div class='sub-desc'><p>className</p>\n</div></li></ul></div></div></div><div id='method-getNamesByExpression' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Inventory'>Ext.Inventory</span><br/><a href='source/Inventory.html#Ext-Inventory-method-getNamesByExpression' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Inventory-method-getNamesByExpression' class='name expandable'>getNamesByExpression</a>( <span class='pre'>expression, [exclude], [accumulate]</span> ) : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>[]<span class=\"signature\"></span></div><div class='description'><div class='short'>Converts a string expression to an array of matching class names. ...</div><div class='long'><p>Converts a string expression to an array of matching class names. An expression can\neither refers to class aliases or class names. Expressions support wildcards:</p>\n\n<pre><code> // returns ['<a href=\"#!/api/Ext.window.Window\" rel=\"Ext.window.Window\" class=\"docClass\">Ext.window.Window</a>']\nvar window = Ext.ClassManager.getNamesByExpression('widget.window');\n\n// returns ['widget.panel', 'widget.window', ...]\nvar allWidgets = Ext.ClassManager.getNamesByExpression('widget.*');\n\n// returns ['<a href=\"#!/api/Ext.data.Store\" rel=\"Ext.data.Store\" class=\"docClass\">Ext.data.Store</a>', 'Ext.data.ArrayProxy', ...]\nvar allData = Ext.ClassManager.getNamesByExpression('Ext.data.*');\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>expression</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>/<a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>[]<div class='sub-desc'>\n</div></li><li><span class='pre'>exclude</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>An object keyed by class name containing classes to\nexclude from the returned classes. This must be provided if <code>accumulate</code> is set to\n<code>true</code>.</p>\n<p>Defaults to: <code>null</code></p></div></li><li><span class='pre'>accumulate</span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a> (optional)<div class='sub-desc'><p>Pass <code>true</code> to add matching classes to the\nspecified <code>exclude</code> object.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>[]</span><div class='sub-desc'><p>An array of class names.</p>\n</div></li></ul></div></div></div><div id='method-select' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Inventory'>Ext.Inventory</span><br/><a href='source/Inventory.html#Ext-Inventory-method-select' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Inventory-method-select' class='name expandable'>select</a>( <span class='pre'>receiver, [scope]</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><span class=\"signature\"></span></div><div class='description'><div class='short'>This method returns a selector object that produces a selection of classes and\ndelivers them to the desired receiver. ...</div><div class='long'><p>This method returns a selector object that produces a selection of classes and\ndelivers them to the desired <code>receiver</code>.</p>\n\n<p>The returned selector object has the same methods as the given <code>receiver</code> object\nbut these methods on the selector accept a first argument that expects a pattern\nor array of patterns. The actual method on the <code>receiver</code> will be called with an\narray of classes that match these patterns but with any patterns passed to an\n<code>exclude</code> call removed.</p>\n\n<p>For example:</p>\n\n<pre><code> var sel = inventory.select({\n         require: function (classes) {\n             console.log('Classes: ' + classes.join(','));\n         }\n     });\n\n sel.exclude('Ext.chart.*').exclude('Ext.draw.*').require('*');\n\n // Logs all classes except those in the Ext.chart and Ext.draw namespaces.\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>receiver</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'>\n</div></li><li><span class='pre'>scope</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a> (optional)<div class='sub-desc'><p>Optional scope to use when calling <code>receiver</code> methods.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>An object with the same methods as <code>receiver</code> plus <code>exclude</code>.</p>\n</div></li></ul><h3 class='pa'>Fires</h3><ul></ul></div></div></div><div id='method-setPath' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Inventory'>Ext.Inventory</span><br/><a href='source/Inventory.html#Ext-Inventory-method-setPath' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Inventory-method-setPath' class='name expandable'>setPath</a>( <span class='pre'>name, [path]</span> ) : <a href=\"#!/api/Ext.Inventory\" rel=\"Ext.Inventory\" class=\"docClass\">Ext.Inventory</a><span class=\"signature\"><span class='chainable' >chainable</span></span></div><div class='description'><div class='short'>Sets the path of a namespace. ...</div><div class='long'><p>Sets the path of a namespace.\nFor Example:</p>\n\n<pre><code> inventory.setPath('Ext', '.');\n inventory.setPath({\n     Ext: '.'\n });\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a>/<a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>The name of a single mapping or an object of mappings.</p>\n</div></li><li><span class='pre'>path</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'><p>If <code>name</code> is a String, then this is the path for that name.\nOtherwise this parameter is ignored.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Ext.Inventory\" rel=\"Ext.Inventory\" class=\"docClass\">Ext.Inventory</a></span><div class='sub-desc'><p>this</p>\n</div></li></ul></div></div></div></div></div></div></div>","alternateClassNames":[],"autodetected":{},"aliases":{},"members":[{"meta":{},"owner":"Ext.Inventory","name":"getAliasesByName","id":"method-getAliasesByName","tagname":"method"},{"meta":{},"owner":"Ext.Inventory","name":"getNameByAlias","id":"method-getNameByAlias","tagname":"method"},{"meta":{},"owner":"Ext.Inventory","name":"getNameByAlternate","id":"method-getNameByAlternate","tagname":"method"},{"meta":{},"owner":"Ext.Inventory","name":"getNamesByExpression","id":"method-getNamesByExpression","tagname":"method"},{"meta":{},"owner":"Ext.Inventory","name":"select","id":"method-select","tagname":"method"},{"meta":{"chainable":true},"owner":"Ext.Inventory","name":"setPath","id":"method-setPath","tagname":"method"}],"meta":{"private":true},"superclasses":[],"component":false,"private":true,"mixins":[],"name":"Ext.Inventory","mixedInto":[],"subclasses":[],"id":"class-Ext.Inventory","requires":[],"files":[{"filename":"Inventory.js","href":"Inventory.html#Ext-Inventory"}],"tagname":"class"});