Ext.data.JsonP.Ext_Factory({"parentMixins":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Factoryable.html#Ext-Factory' target='_blank'>Factoryable.js</a></div></pre><div class='doc-contents'><p>Manages factories for families of classes (classes with a common <code>alias</code> prefix). The\nfactory for a class family is a function stored as a <code>static</code> on <code><a href=\"#!/api/Ext.Factory\" rel=\"Ext.Factory\" class=\"docClass\">Ext.Factory</a></code>. These\nare created either by directly calling <code><a href=\"#!/api/Ext.Factory-method-define\" rel=\"Ext.Factory-method-define\" class=\"docClass\">Ext.Factory.define</a></code> or by using the\n<code><a href=\"#!/api/Ext.mixin.Factoryable\" rel=\"Ext.mixin.Factoryable\" class=\"docClass\">Ext.mixin.Factoryable</a></code> interface.</p>\n\n<p>To illustrate, consider the layout system's use of aliases. The <code>hbox</code> layout maps to\nthe <code>\"layout.hbox\"</code> alias that one typically provides via the <code>layout</code> config on a\nContainer.</p>\n\n<p>Under the covers this maps to a call like this:</p>\n\n<pre><code> Ext.Factory.layout('hbox');\n</code></pre>\n\n<p>Or possibly:</p>\n\n<pre><code> Ext.Factory.layout({\n     type: 'hbox'\n });\n</code></pre>\n\n<p>The value of the <code>layout</code> config is passed to the <code>Ext.Factory.layout</code> function. The\nexact signature of a factory method matches <code><a href=\"#!/api/Ext.Factory-method-create\" rel=\"Ext.Factory-method-create\" class=\"docClass\">create</a></code>.</p>\n\n<p>To define this factory directly, one could call <code><a href=\"#!/api/Ext.Factory-method-define\" rel=\"Ext.Factory-method-define\" class=\"docClass\">Ext.Factory.define</a></code> like so:</p>\n\n<pre><code> <a href=\"#!/api/Ext.Factory-method-define\" rel=\"Ext.Factory-method-define\" class=\"docClass\">Ext.Factory.define</a>('layout', 'auto');  // \"layout.auto\" is the default type\n</code></pre>\n        <p>Available since: <b>5.0.0</b></p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-aliasPrefix' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Factory'>Ext.Factory</span><br/><a href='source/Factoryable.html#Ext-Factory-cfg-aliasPrefix' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Factory-cfg-aliasPrefix' class='name expandable'>aliasPrefix</a> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>The prefix to apply to type values to form a complete alias. ...</div><div class='long'><p>The prefix to apply to <code>type</code> values to form a complete alias. This defaults to the\nproper value in most all cases and should not need to be specified.</p>\n        <p>Available since: <b>5.0.0</b></p>\n</div></div></div><div id='cfg-defaultProperty' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Factory'>Ext.Factory</span><br/><a href='source/Factoryable.html#Ext-Factory-cfg-defaultProperty' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Factory-cfg-defaultProperty' class='name expandable'>defaultProperty</a> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>The config property to set when the factory is given a config that is a string. ...</div><div class='long'><p>The config property to set when the factory is given a config that is a string.</p>\n<p>Defaults to: <code>&quot;type&quot;</code></p>        <p>Available since: <b>5.0.0</b></p>\n</div></div></div><div id='cfg-defaultType' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Factory'>Ext.Factory</span><br/><a href='source/Factoryable.html#Ext-Factory-cfg-defaultType' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Factory-cfg-defaultType' class='name expandable'>defaultType</a> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>An optional type to use if none is given to the factory at invocation. ...</div><div class='long'><p>An optional type to use if none is given to the factory at invocation. This is a\nsuffix added to the <code>aliasPrefix</code>. For example, if <code>aliasPrefix=\"layout.\"</code> and\n<code>defaultType=\"hbox\"</code> the default alias is <code>\"layout.hbox\"</code>. This is an alternative\nto <code>xclass</code> so only one should be provided.</p>\n<p>Defaults to: <code>null</code></p>        <p>Available since: <b>5.0.0</b></p>\n</div></div></div><div id='cfg-instanceProp' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Factory'>Ext.Factory</span><br/><a href='source/Factoryable.html#Ext-Factory-cfg-instanceProp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Factory-cfg-instanceProp' class='name expandable'>instanceProp</a> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>The property that identifies an object as instance vs a config. ...</div><div class='long'><p>The property that identifies an object as instance vs a config.</p>\n<p>Defaults to: <code>&quot;isInstance&quot;</code></p>        <p>Available since: <b>5.0.0</b></p>\n</div></div></div><div id='cfg-xclass' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Factory'>Ext.Factory</span><br/><a href='source/Factoryable.html#Ext-Factory-cfg-xclass' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Factory-cfg-xclass' class='name expandable'>xclass</a> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><span class=\"signature\"></span></div><div class='description'><div class='short'>The full classname of the type of instance to create when none is provided to the\nfactory. ...</div><div class='long'><p>The full classname of the type of instance to create when none is provided to the\nfactory. This is an alternative to <code>defaultType</code> so only one should be specified.</p>\n<p>Defaults to: <code>null</code></p>        <p>Available since: <b>5.0.0</b></p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-defaultClass' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Factory'>Ext.Factory</span><br/><a href='source/Factoryable.html#Ext-Factory-property-defaultClass' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Factory-property-defaultClass' class='name expandable'>defaultClass</a> : <a href=\"#!/api/Ext.Class\" rel=\"Ext.Class\" class=\"docClass\">Ext.Class</a><span class=\"signature\"><span class='private' >private</span><span class='readonly' >readonly</span></span></div><div class='description'><div class='short'>The Class reference of the type of instance to create when none is provided to the\nfactory. ...</div><div class='long'><p>The Class reference of the type of instance to create when none is provided to the\nfactory. This property is set from <code>xclass</code> when the factory instance is created.</p>\n<p>Defaults to: <code>null</code></p>        <p>Available since: <b>5.0.0</b></p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-create' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Factory'>Ext.Factory</span><br/><a href='source/Factoryable.html#Ext-Factory-method-create' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Factory-method-create' class='name expandable'>create</a>( <span class='pre'>[config], [defaultType]</span> ) : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Creates an instance of this class family given configuration options. ...</div><div class='long'><p>Creates an instance of this class family given configuration options.</p>\n        <p>Available since: <b>5.0.0</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>/<a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'><p>The configuration or instance (if an Object) or\njust the type (if a String) describing the instance to create.</p>\n<ul><li><span class='pre'>xclass</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'><p>The full class name of the class to create.</p>\n</div></li><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'><p>The type string to add to the alias prefix for this\nfactory.</p>\n</div></li></ul></div></li><li><span class='pre'>defaultType</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'><p>The type to create if no type is contained in the\n<code>config</code>.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a></span><div class='sub-desc'><p>The newly created instance.</p>\n</div></li></ul></div></div></div><div id='method-define' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Ext.Factory'>Ext.Factory</span><br/><a href='source/Factoryable.html#Ext-Factory-method-define' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Ext.Factory-method-define' class='name expandable'>define</a>( <span class='pre'>type, [config]</span> ) : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><span class=\"signature\"></span></div><div class='description'><div class='short'>For example, the layout alias family could be fined like this:\n\n Ext.Factory.define('layout', {\n     defaultType: 'au...</div><div class='long'><p>For example, the layout alias family could be fined like this:</p>\n\n<pre><code> <a href=\"#!/api/Ext.Factory-method-define\" rel=\"Ext.Factory-method-define\" class=\"docClass\">Ext.Factory.define</a>('layout', {\n     defaultType: 'auto'\n });\n</code></pre>\n\n<p>To define multiple families at once:</p>\n\n<pre><code> <a href=\"#!/api/Ext.Factory-method-define\" rel=\"Ext.Factory-method-define\" class=\"docClass\">Ext.Factory.define</a>({\n     layout: {\n         defaultType: 'auto'\n     }\n });\n</code></pre>\n        <p>Available since: <b>5.0.0</b></p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>The alias prefix for type (e.g., \"layout.\").</p>\n</div></li><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>/<a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a> (optional)<div class='sub-desc'><p>An object specifying the config for the <code><a href=\"#!/api/Ext.Factory\" rel=\"Ext.Factory\" class=\"docClass\">Ext.Factory</a></code>\nto be created. If a string is passed it is treated as the <code>defaultType</code>.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","alternateClassNames":[],"autodetected":{},"aliases":{},"members":[{"meta":{},"owner":"Ext.Factory","name":"aliasPrefix","id":"cfg-aliasPrefix","tagname":"cfg"},{"meta":{},"owner":"Ext.Factory","name":"defaultProperty","id":"cfg-defaultProperty","tagname":"cfg"},{"meta":{},"owner":"Ext.Factory","name":"defaultType","id":"cfg-defaultType","tagname":"cfg"},{"meta":{},"owner":"Ext.Factory","name":"instanceProp","id":"cfg-instanceProp","tagname":"cfg"},{"meta":{},"owner":"Ext.Factory","name":"xclass","id":"cfg-xclass","tagname":"cfg"},{"meta":{"readonly":true,"private":true},"owner":"Ext.Factory","name":"defaultClass","id":"property-defaultClass","tagname":"property"},{"meta":{},"owner":"Ext.Factory","name":"create","id":"method-create","tagname":"method"},{"meta":{},"owner":"Ext.Factory","name":"define","id":"method-define","tagname":"method"}],"short_doc":"Manages factories for families of classes (classes with a common alias prefix). ...","meta":{},"superclasses":[],"component":false,"mixins":[],"name":"Ext.Factory","mixedInto":[],"subclasses":[],"id":"class-Ext.Factory","since":"5.0.0","requires":[],"files":[{"filename":"Factoryable.js","href":"Factoryable.html#Ext-Factory"}],"tagname":"class"});