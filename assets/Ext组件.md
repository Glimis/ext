##组件

>不管怎么说组件化已然成为共识,其意义在于提取可复用的内容,或许你认为提取公共内容应该称为封装对象,或许吧,大概是因为更早的语言在开发ui对象时将其称为组件的缘故

使用Ext时大多数时候都市使用or创建Ext的组件,相比于其他组建库(jqueryui,easyui...),Ext的组件包括更广泛的功能

* 逻辑内容封装
* 公共样式封装
* 统一结构管理

逻辑与样式的封装是组件存在的意义,而无论多酷炫的组件,到了Ext中就必须修改成Ext的格式,这是Ext做为整体架构规范,统一管理的思路,比起直接使用Ext.Component系列,了解其实现思路多少不会有错

###基于html
>使用Ext不需要定义html,只需要创建组件

Ext组件包含两种简单的关系

* 继承
* 组合

通过这两种方式完全可以依靠原有的组件去创建新的组件,且无需使用html,当然描述组件应有的结构的方式,也并非没有

```javascript
Ext.create("Ext.Component", {
	renderTo: Ext.getBody(),
	html: "&nbsp;  <a>hello world</a>"
})    
```
html属性,描述组件结构的属性,该属性内容会被解析,需要遵守html的约束(dom下的innerHTML)

###基于模板
>使用string描述html信息有很多限制,比如需要注意转移,比如换行,他并不能像html换行,必须遵守string的语法,总之,html的内容讲难以维护,下面是一种很有意思的解决方案

script标签中,type若为无法识别的类型,比如template,其内容则不会被解析,而后就可通过id等方式获取到其内部的内容

```javascript
<script id='test' type='template'>
    <ul>
        <li><span>姓名:张三</span></li>
        <li><span>性别:男</span></li>
    </ul>
</script>
<script>
var html=document.getElementById('test').innerHTML;
</script>
```
当然将模板内容放在html中也可以,类似的方式有很多,总之就是为了解决html格式难以使用string描述的问题,Ext也有类似的解决方案-->contentEl

```javascript
//js
 Ext.create("Ext.Component", {
	renderTo: "test",
	contentEl: "template"
})
```

```html
//html
<p>学生信息</p>
<div id='test'></div>
<ul id='template' class='x-hidden'>
   <li><span>姓名</span></li>
	<li><span>性别</span></li>
</ul>
```
x-hidden是Ext提供的解决第一运行时闪烁现象的方案(使用script标签不会-.-)
###基于“动态”模板
>模板是结构与数据分离的产物,从效果上来看,其产生的html结果不唯一(与数据有关),其本身就是动态的,比如在例子中,可以想到,学生名应该是一个参数,他应该是“动态”的

复用上个例子中的html,将script稍微修改一下

```javascript
var data = {
    name: '张三',
    sex: '男'
}
var template = document.getElementById('test').innerHTML;
var html = template.replace(/<%=([^>]*)%>/g, function(code, key) {
	return data[key];
});
```
最终产生的html就与数据进行了分离,但这还不够,数据可能是嵌套的,也可能是数组,这就要求结构也能拥有简单的逻辑判断(if/for),这里需要捋一下思路,在前端能够描述逻辑的语言只有js,所以这里的模板需要先转换为js,使用js的if/for进行逻辑判断,最终产生html   
一个简单的模板引擎:

```javascript
    var data = {
        student: [{
            name: '张三',
            sex: '男'
        }, {
            name: '李四',
            sex: '女'
        }]
    }
    var template = document.getElementById('test').innerHTML;
    var code = ['var t=[];'];
    //截取分割符,拼接js
    var codes = template.split(/<%|%>/g);
    for (var i = 0; i < codes.length; i++) {
        var c = codes[i];
        if (c.match(/for|if|else|}/)) {
            //如果为逻辑,直接添加用于执行
            code.push(c);
        } else {
            //如果为结构,放入数组中,用于展示
            if (c[0] == '=') {
                //包含＝不带",用于关联数据
                code.push('t.push(' + c.substr(1) + ');');
            } else {
                //不包含＝不带",用于添加结构
                code.push('t.push("' + c + '");');
            }
        }
    }
    code.push('return t.join("");');
    var htmljs = code.join('').replace(/[\r\t\n]/g, '');
    var html = new Function('data', htmljs)(data);
```
    
```html
        <script id='test' type='template'>
        <ul>
            <%for(var i=0;i<data.student.length;i++){%>
                <li><span>姓名:<%=data.student[i].name%></span></li>
                <li><span>性别:<%=data.student[i].sex%></span></li>
                <%}%>
        </ul>
    </script>
```
以上是一种模板到html的简单原理,至于Ext,根据一贯的尿性,必然将其封装成了对象(Ext.Template/Ext.XTemplate)

```javascript
var tpl = new Ext.XTemplate(
    '<p>Name: {name}</p>',
    '<p>Kids: ',
    '<tpl for="kids">',
        '<tpl if="age &gt; 1">',  // 注意 要被编码
            '<p>{#}: {name}</p>',  // 每一项的自动编号
            '<p>In 5 Years: {age+5}</p>',  // 基础数学
            '<p>Dad: {parent.name}</p>',
        '</tpl>',
    '</tpl></p>'
);
tpl.overwrite('test',{
    name: 'Don Griffin',
    kids: [
        { name: 'Aubrey',  age: 17 },
        { name: 'Nikol',   age: 5 }
    ]
});
```

```html
<div id='test'></div>
```
以上就是通过Ext模板描述组件结构的方式,当然,在通用的组件父类中,也有相应的属性用以修改结构:tpl/data

```javascript
Ext.create("Ext.Component", {
    renderTo:Ext.getBody(),
    "tpl":["<p>Name: {name}</p>",
        "<p>Kids: ",
        "<tpl for='kids'>",
        "<tpl if='age &gt; 1'>", 
        "<p>{#}: {name}</p>", 
        "<p>In 5 Years: {age+5}</p>",
        "<p>Dad: {parent.name}</p>",
        "</tpl>",
        "</tpl></p>"
    ],
    "data": {
        name: "Don Griffin",
          kids: [
        { name: 'Aubrey',  age: 17 },
        { name: 'Nikol',   age: 5 }
    ]
    }
})
```
###基于设置子元素的模板
我们可以使用模板创建任何复杂的组件结构,但对于一些粒度更小,不方便在次封装的节点,操作起来并不是特别的方便,比如

```
<div class='box'>
	<div class='title'></div>
	<div class='content'></div>
</div>	
```
或许我会去修改下.title的样式/内容,显然在此封装显得繁琐,使用选择符会更加方便  
当然,比起直接使用选择符(或许使用人并不了解组件的结构),Ext提供可很有爱的解决方案,子元素映射/选择,有两种描述方式

* 选择器描述

```
var cmp=Ext.create('Ext.Component', {
    renderTo: Ext.getBody(),
    renderTpl: [
        '<h1 class="title">{title}</h1>',
        '<p>{desc}</p>'
    ],
    renderData: {
        title: "Error",
        desc: "Something went wrong"
    },
    renderSelectors: {
        titleEl: 'h1.title',
        descEl: 'p'
    }
});
cmp.titleEl.setStyle({color: "red"});
```

* 占位符描述

```
var cmp=Ext.create("Ext.Component", {
    renderTo:'test',
    "childEls": ["titleEl"],
      renderData: {
        title: "Error",
        desc: "Something went wrong"
    },
        renderTpl: [
        '<h1 id="{id}-titleEl" data-ref="titleEl" class="title">{title}</h1>',
        '<p>{desc}</p>'
    ]
})

cmp.titleEl.setStyle({color: "red"});
```
注:无论哪一种方式子元素统一被映射为Ext.dom.Element对象   

以上即为自定义结构的组件的创建

###组件的继承与组合
>比其自定义组件结构,更多时候我们使用继承与组合的方式去创建组件,以达到无html的目的

继承依赖于extend   
组合依赖于容器的items   
通常所有的组件最终会继承至Ext.Component,也就是说做为组件必然会有extend(so,如果没有,那他是什么?猜猜看),而你所依赖的Ext已存在的组件,比如Ext.panel,其内部使用tpl等方式定义结构

```javascript
Ext.define('Ext.panel.Panel', {
    extend: 'Ext.container.Container',
    childEls: [
        'body'
    ],
    renderTpl: [
        '{% this.renderDockedItems(out,values,0); %}',
        '<div id="{id}-body" data-ref="body" class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>',
            ' {baseCls}-body-{ui}<tpl if="uiCls">',
                '<tpl for="uiCls"> {parent.baseCls}-body-{parent.ui}-{.}</tpl>',
            '</tpl>{childElCls}"',
            '<tpl if="bodyRole"> role="{bodyRole}"<tpl else> role="presentation"</tpl>',
            '<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
            '{%this.renderContainer(out,values);%}',
        '</div>',
        '{% this.renderDockedItems(out,values,1); %}'
    ]
}

```
继承当然会继承他的html结构,这就是为什么会让人感觉Ext不需要html的原因

容器(container),或者应该说是组件的容器,其最主要的功能就是组件的组合,组合出来的肯定也是组件,所以,容器必然是一个组件(继承Ext.Component),很绕口吧,换个方式描述   
组合出来的组件(组合组件),使用items存储依赖的组件,其没有自己结构(html结构),依赖其他组建结构的性质,如同容器一般,故称为容器(但别忘了他首先还是一个组件),所谓的布局,指的就是组合组件下,每一个组件所处的位置(为什么非组合组件没有布局?还记得吗,我们认为那些组件的子元素为最小粒度的Dom,对其的操作内容少,只进行简单的Dom操作),这就是为什么组件没有布局(狭义的区分组件与容器,按语境理解)

###Ext下的组件封装与复用
>我们都知道封装的目的,但我们封装的是什么?他真的可以复用吗?

了解组件后,在回忆下我们使用组件的情况,大多数情况下我们并不会主动去描述tpl/html,而是通过组合(容器)去描述组件的结构,通过事件/方法的定义去组装组件的业务逻辑,希望用这种方式降低结构与业务的耦合,但实际中我们会发现,我们可能会需要define很多组件,他们可能只在某个地方使用,那他存在的意义是什么?有必要创建吗?
其实,你所遇见的就是业务组件/容器(不用度娘了,自创的)
>业务容器:对具体业务的结构的抽象  
>业务组件:对具体业务的操作的抽象

没错,他们的寿命可能都是一次性的(只在一处),如果业务结构,我是说点击变双击,下拉变按钮什么的,比起在原有的组件中修改,新建一个业务组件,也是一个不错的选择

至于业务操作,指的是click,dbclick,类似这些的原生事件绑定应该且必须存在组件当中

也许你注意到了,竟然没有业务逻辑,是的,既然谈到了组件的变更,我说的是频繁的变更,将具体业务封装在组件中是不明智的,那将业务逻辑提出,又算不算明智呢?