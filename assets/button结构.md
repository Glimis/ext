## component
>Ext.Component所有Ext组件的基类

组件主要用来封装逻辑与结构,逻辑有很多种,如果是通用样式逻辑(setHeight,setWidth),那就是所有Component的公共方法,如果是业务逻辑,我们也有更好的方式去处理,总之,封装组件,在组件中描述的大多数代码,主要是为了描述结构...想象一下,最基础的组件,应该默认怎样的结构?

### component的结构

```javascript
//js
Ext.create("Ext.Component", {
    renderTo: "test"
})
```

```html
//html
<div id="test"></div>
```
运行以上代码,或许什么也看不见,没关系,通过源码查询,我们可以看到以下内容

```html
//页面效果
<div id="test">
    <div class="x-component  x-component-default x-border-box" id="box-1009"></div>
</div>
```
以上内容就是Ext.Component所代表的结构,需要注意,renderTo只是将组件结构至于选择节点之中,而非使用替换,这相当重要,这意味着```renderTo:Ext.getBody()```不一定会显示出来,这跟其原来的结构有关(此后,若非必要,就不再贴最外层的结构),现在,我们可以简单的认为,Ext.Component就是一个div的封装(记得带上class)

### autoEl
>一个标签名或者DomHelper描述,用来创建Element,它将封装当前组件

autoEl属性具有修改Ext.Component结构的能力,比如

```javascript
Ext.create("Ext.Component", {
    renderTo: "test",
    autoEl:{
         tag: 'p'
    }
})
```

```html
<p class="x-component  x-component-default x-border-box" id="box-1009"></p>
```  
或许Component不一定代表一个div。。。我们应该做一个简单的测试

```javascript
Ext.create("Ext.Component", {
    renderTo: "test",
    autoEl:{
         tag: 'abc',
         html:'123'
    }
})
```

```
<abc class="x-component  x-component-default x-border-box" id="box-1009">123</abc>
```
答案已经很明显了,Ext.Component代表一个组件,其组件结构默认为一个标签(autoEl定义),该标签又默认为div,更复杂的情况我们可以配合tpl/data等方式去描述其结构(查看文章...),换句话说   

* renderTo:第一层结构,用于选择
* autoEl:组件最外层标签
* html,tpl/data等:标签内部结构

## Button
>Button是继承Component的一个具体的组件

作为组件(例子)来说,Button不算难,却又包含定义组件所有特点

### Btuuon结构

创建组件,以观察Button结构

```javascript
var btn=Ext.create("Ext.button.Button", {
    renderTo: "test",
})
```

```html
<div id="test">
    <a class="x-btn x-unselectable x-btn-default-small x-border-box" hidefocus="on" unselectable="on" id="button-1009" tabindex="0" componentid="button-1009">
        <span id="button-1009-btnWrap" data-ref="btnWrap" role="presentation" unselectable="on" style="" class="x-btn-wrap x-btn-wrap-default-small ">
    		<span id="button-1009-btnEl" data-ref="btnEl" role="presentation" unselectable="on" style="" class="x-btn-button x-btn-button-default-small  x-btn-no-text   x-btn-button-center ">
    			<span id="button-1009-btnIconEl" data-ref="btnIconEl" role="presentation" unselectable="on" class="x-btn-icon-el x-btn-icon-el-default-small  " style=""></span>
        		<span id="button-1009-btnInnerEl" data-ref="btnInnerEl" role="presentation" unselectable="on" class="x-btn-inner x-btn-inner-default-small">&nbsp;</span>
        	</span>
        </span>
    </a>
</div>
```
第一层```<div id="test">```用于渲染和查询,无视之(以后真的不展示了-.-)   
第二层```<a class="x-btn ...">```通过autoEl,修改的,标签层   
第三层通过html/tpl等方式描述的内部结构层   

这内部结构乍一看跟乱码一样,完全无从下手,没关系,慢慢分析

### data-ref属性
我们曾经使用过childEls/renderSelectors的方法配合创建组件的子元素,没错这里也是,不出意外的话,我们可以通过```btn.btnWrap```等方式,去访问指定的子元素(Dom),此处无视```role="presentation"```

```javascript
var btn=Ext.create("Ext.button.Button", {
    renderTo: "test",
})
console.log(btn.btnWrap);
console.log(btn.btnEl);
console.log(btn.btnIconEl);
console.log(btn.btnInnerEl);
```
此时,如果我们知道一点Ext.dom.Element的api,那对这四个节点的操作就是探囊取物(成语乱入,自行体会)

有没有感觉发现了新世界?不要太激动,我们先看一下html的经典结构

### html经典结构
```html
<div class="box">
  <div class="head"></div>
  <div class="body"></div>
</div>
```
这段包含了头部和主体的html模板,非常经典,经典到Ext延用了这套结构,比如btnEl与btnIconEl/btnInnerEl的关系,我无法用文字去描述,自行领悟吧

### 组件逻辑与结构
现在在来观察下这四个结构的名字,以此为突破口   

btnWrap:整体结构,除了btnEl可能还会有其他结构  
btnEl:按钮结构   
btnIconEl:一定与图片相关    
btnInnerEl:一定与文本内容相关

在查看一下api,比如  
text:按钮中文字  
icon:按钮中图标路经
我们是否可以通过那4个dom对象实现以上功能呢?

先按照api实现

```
var btn=Ext.create("Ext.button.Button", {
    renderTo: "test",
    text:'按钮',
    icon:'xxx.icon'
})
```

观察结构

```
<a class="x-btn x-unselectable x-btn-default-small x-border-box" hidefocus="on" unselectable="on" id="button-1009" tabindex="0" componentid="button-1009">
    <span id="button-1009-btnWrap" data-ref="btnWrap" role="presentation" unselectable="on" style="" class="x-btn-wrap x-btn-wrap-default-small ">
    	<span id="button-1009-btnEl" data-ref="btnEl" role="presentation" unselectable="on" style="" class="x-btn-button x-btn-button-default-small x-btn-text  x-btn-icon x-btn-icon-left x-btn-button-center ">
    		<span id="button-1009-btnIconEl" data-ref="btnIconEl" role="presentation" unselectable="on" class="x-btn-icon-el x-btn-icon-el-default-small  " style="background-image:url(xxx.icon);">&nbsp;</span>
    		<span id="button-1009-btnInnerEl" data-ref="btnInnerEl" role="presentation" unselectable="on" class="x-btn-inner x-btn-inner-default-small">按钮</span>
    	</span>
    </span>
</a>
```
我们发现btnInnerEl的内部增加了文本, btnIconEl的样式增加了```background-image:url(xxx.icon);```
很好,结合文档,查看api

```
var btn=Ext.create("Ext.button.Button", {
    renderTo: "test",
})
btn.btnInnerEl.setHtml('按钮');
btn.btnIconEl.setStyle("background-image","url(xxx.icon)")
```
看起来结果是一样的,也许我们看见了组件的内涵   
没错,组件关注结构(此处指dom),其内部方法对应不同的结构(dom)的变化,data-ref是子元素(dom)的映射,用于快速获取相关的dom,现在,我们可以这样认为
>Ext组件,属性用于初始化结构,方法用于修改结构   

我们可以通过文档提供的api,去感受其定义的节点的区别,当然,也可以直接看源码-.- 

### Button源码
>看html结构可以知其然,看源码完全可以知其所以然

源码二千行...嗯,注释很详细

```javascript
    renderTpl:
        '<span id="{id}-btnWrap" data-ref="btnWrap" role="presentation" unselectable="on" style="{btnWrapStyle}" ' +
                'class="{btnWrapCls} {btnWrapCls}-{ui} {splitCls}{childElCls}">' +
            '<span id="{id}-btnEl" data-ref="btnEl" role="presentation" unselectable="on" style="{btnElStyle}" ' +
                    'class="{btnCls} {btnCls}-{ui} {textCls} {noTextCls} {hasIconCls} ' +
                    '{iconAlignCls} {textAlignCls} {btnElAutoHeightCls}{childElCls}">' +
                '<tpl if="iconBeforeText">{[values.$comp.renderIcon(values)]}</tpl>' +
                '<span id="{id}-btnInnerEl" data-ref="btnInnerEl" role="presentation" unselectable="on" ' +
                    'class="{innerCls} {innerCls}-{ui}{childElCls}">{text}</span>' +
                '<tpl if="!iconBeforeText">{[values.$comp.renderIcon(values)]}</tpl>' +
            '</span>' +
        '</span>' +
        '{[values.$comp.getAfterMarkup ? values.$comp.getAfterMarkup(values) : ""]}' +
        // if "closable" (tab) add a close element icon
        '<tpl if="closable">' +
            '<span id="{id}-closeEl" data-ref="closeEl" role="presentation"' +
                ' class="{baseCls}-close-btn"' +
                '<tpl if="closeText">' +
                    ' title="{closeText}" aria-label="{closeText}"' +
                '</tpl>' +
                '>' +
            '</span>' +
        '</tpl>',

    iconTpl:
        '<span id="{id}-btnIconEl" data-ref="btnIconEl" role="presentation" unselectable="on" class="{baseIconCls} ' +
                '{baseIconCls}-{ui} {iconCls} {glyphCls}{childElCls}" style="' +
            '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>' +
            '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">' +
            '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>' +
        '</span>',
    renderIcon: function(values) {
        return this.getTpl('iconTpl').apply(values);
    },
    childEls: [
        'btnEl', 'btnWrap', 'btnInnerEl', 'btnIconEl'
    ],
```
renderTpl,绝对找不到引用的地方,其用法继承至Component,用于定义(初始化)结构   
iconTpl,通过renderIcon被renderTpl引用,是Ext模板嵌套的方式(模板是组件结构的基础)  
childEls,用于定义相关子元素(dom)

```
 setIcon: function(icon) {
        icon = icon || '';
        var me = this,
            btnIconEl = me.btnIconEl,
            oldIcon = me.icon || '';

        me.icon = icon;
        if (icon != oldIcon) {
            if (btnIconEl) {
                btnIconEl.setStyle('background-image', icon ? 'url(' + icon + ')': '');
                me._syncHasIconCls();
                if (me.didIconStateChange(oldIcon, icon)) {
                    me.updateLayout();
                }
            }
            me.fireEvent('iconchange', me, oldIcon, icon);
        }
        return me;
    },
    setIconCls: function(cls) {
        cls = cls || '';
        var me = this,
            btnIconEl = me.btnIconEl,
            oldCls = me.iconCls || '';

        me.iconCls = cls;
        if (oldCls != cls) {
            if (btnIconEl) {
                // Remove the previous iconCls from the button
                btnIconEl.removeCls(oldCls);
                btnIconEl.addCls(cls);
                me._syncHasIconCls();
                if (me.didIconStateChange(oldCls, cls)) {
                    me.updateLayout();
                }
            }
            me.fireEvent('iconchange', me, oldCls, cls);
        }
        return me;
    },
```
setIcon/setIconCls,看通过childEl,操作btnIconEl   
在这里我们注意到了```me.fireEvent ```,组件创造出来的目的终究是为了业务服务,即使我们希望创造组件时不关注逻辑,但多少也需要有一个结构与逻辑组合的地方,方案有很多,而在Ext事件的解决方案中,此处的```me.fireEvent```就是组件与逻辑组合的地方








