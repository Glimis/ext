  //编辑器封装
  Ext.define("InlineEditor", {
      extend: "Ext.Component",
      bodyPadding: 2,
      autoScroll: true,
      initComponent: function() {
        debugger
          //触发事件尽量下发,而非向上寻找
          if (this.onCtrlS) {
              this.on("ctrlS", this.onCtrlS);
          }
          if(this.onChange){
            this.on("change", this.onChange);
          }
           this.on("boxready", this.initEditor, this);
          // this.on("afterlayout", this.initEditor, this);
          this.callParent(arguments);
      },
      initEditor: function() {
          if (!this.editor) {
              var me = this;
              var editor = this.editor = ace.edit(this.id);
              editor.setOption("maxLines", 100);
              editor.setTheme("ace/theme/tomorrow");
              editor.getSession().setMode("ace/mode/javascript");
              // editor.setTheme("ace/theme/tomorrow");
              // editor.getSession().setMode('ace/mode/javascript');
              // editor.setShowPrintMargin(false);
              // editor.setOption("maxLines", 100);
              // 
              editor.on("change", function(){
                  me.fireEvent("change");
              })
              editor.commands.addCommand({
                  name: 'run',
                  bindKey: {
                      win: 'Ctrl-S',
                      mac: 'Command-S'
                  },
                  exec: function(editor) {
                      me.fireEvent("ctrlS");
                  }
              });
              this.fireEvent("init")
          }
      },
      getValue: function() {
          return this.editor ? this.editor.getValue() : this.value
      },
      setValue: function(val) {
          var str = js_beautify(val);
          this.editor.setValue(str);
          this.editor.gotoLine(1);
          this.getHeight();
      },
      getHeight: function() {
          var b = this.el.down(".ace_scroller");
          return b ? b.getHeight() : undefined
      },
  });
  //预览封装
  Ext.define("InlinePreview", {
      extend: "Ext.Panel",
      statics: {
          iframeCounter: 0,
          getNextIframeId: function() {
              this.iframeCounter++;
              return "frame-" + this.iframeCounter.toString()
          }
      },
      options: {},
      constructor: function(b) {
          b = b || {};
          b.iframeId = this.self.getNextIframeId();
          b.id = "inline-preview-" + b.iframeId;
          this.callParent([b]);
      },
      initComponent: function() {
          this.html = this.getHtml();
          this.callParent(arguments)
      },
      getHtml: function() {
          var b = new Ext.XTemplate('<iframe id="{id}" style="width: 100%; height: 100%; border: 0" frameBorder="0"></iframe>');
          return b.apply({
              id: this.iframeId
          })
      },
      update: function(jsVal) {
          var me = this;
          var f = this.options;
          var e = Ext.get(this.iframeId);
          var g = Ext.Function.bind(this.iframeCallback, this);
          if (e) {
              e.on("load", function() {
                  Ext.Function.defer(function() {
                      var val = e.dom.contentWindow.loadInlineExample(jsVal + "\n", f, g);
                      me.htmlText = val;
                  }, 100)
              }, this, {
                  single: true
              });
              e.dom.src = "eg-iframe.html"
          }
      },
      iframeCallback: function(c, d) {
          if (c) {
              this.fireEvent("previewsuccess", this)
          } else {
              this.fireEvent("previewfailure", this, d)
          }
      },
      getHeight: function() {
          return document.getElementById(this.iframeId).parentNode.clientHeight
      }
  });
  //html查看
  Ext.define("PrettyPrint", {
          extend: 'Ext.Component',
          style: {
              margin: 0
          },
          autoScroll: true,
          autoEl: {
              tag: 'pre'
          },
          cls: 'prettyprint',
          setValue: function(val) {
              var text = Ext.String.htmlEncode(html_beautify(val));
              var txt = window.prettyPrintOne(text);
              this.setHtml(txt);
              prettyPrint();

          }
      })
      //编辑器or预览容器-->宽高,`,跨模块事件均与容器有关
  Ext.define("Inline", {
      extend: "Ext.Panel",
      layout: "hbox",
      requires: ["InlineEditor", "InlinePreview", "PrettyPrint"],
      initComponent: function() {
          var me = this;
          this.items = [this.editor = Ext.create("InlineEditor", {
              cmpName: "code",
              flex: 1,
              value: this.value,
              // height: '100%',
              onCtrlS: function() {
                  if (me.preview) {
                      var value = this.getValue();
                      me.preview.update(value);
                  }
              },
              onChange:function(){
                  me.updateHeight();
              }
          })]
          if (this.options.InlinePreview) {
              this.items.push(this.htmlview = Ext.create("PrettyPrint", {
                  height: this.height,
                  flex: 1,

                  cmpName: "html",
                  hidden: true,
                  show: function() {
                      this.superclass.show.call(this, arguments);
                      var htmlText = me.preview.htmlText;
                      this.setValue(htmlText);
                  }
              }));

              this.items.push(this.preview = Ext.create("InlinePreview", {
                  cmpName: "preview",
                  height: this.height,
                  flex: 1
              }));
              this.on("boxready", this.init);

          }
          this.callParent(arguments);
      },
      init: function() {
          // this.editor.fireEvent("ctrlS");
      },
      showCode: function() {
          this.editor.show();
          this.htmlview.hide();
      },
      showHtml: function() {
          this.editor.hide();
          this.htmlview.show();
      },
      updateHeight: function() {
          var h = this.editor.getHeight();
          // this.setHeight(h)
      }
  });
  //容器上的导航－－>通过事件跨模块
  Ext.define("InlineToolbar", {
      extend: "Ext.toolbar.Toolbar",
      componentCls: "inline-example-tb",
      height: 30,
      initComponent: function() {
          this.items = [{
              iconCls: "code",
              padding: "0 2 0 0",
              margin: "0 3 0 0",
              text: "编辑",
              handler: this.createEventFirerer("code")
          }, {
              padding: 0,
              margin: "0 3 0 0",
              iconCls: "preview",
              text: "html",
              handler: this.createEventFirerer("html")
          }, "->", {
              padding: 0,
              margin: 0,
              iconCls: "copy",
              text: "copy",
              handler: this.createEventFirerer("copy")
          }];
          this.callParent(arguments)
      },
      createEventFirerer: function(b) {
          return Ext.Function.bind(function() {
              this.fireEvent("buttonclick", b)
          }, this)
      },
      activateButton: function(b) {
          Ext.Array.each(this.query("button"), function(a) {
              a.removeCls("active")
          });
          Ext.Array.each(this.query("button[iconCls=" + b + "]"), function(a) {
              a.addCls("active")
          })
      }
  });

  //组合对象
  //创建一个对象通过选择符/dom专门用来组合组件
  Ext.define("InlineWrap", {
      constructor: function(c) {
          this.pre = c;
          var options = this.parseOptions(c.className);
          var tb = this.initToolbar(options);
          var inline = this.replacePre(options);
          var srcNode = c.attributes["src"],
              src;

          if (srcNode) {
              src = srcNode.textContent;
              Ext.Ajax.request({
                  url: "/template/" + src,
                  success: function(response, opts) {
                      inline.editor.setValue(response.responseText);
                      inline.editor.fireEvent("ctrlS");
                  },
                  failure: function(response, opts) {

                  }
              });
          }

          if (this.tb) {
              this.tb.on("buttonclick", function(code) {
                  if (code === "code") {
                      inline.showCode();
                  } else if (code === "html") {
                      inline.showHtml();
                  } else if (code === "copy") {}
              })
          }
      },
      parseOptions: function(c) {
          var d = {};
          Ext.Array.forEach(c.split(/ +/), function(a) {
              if (a === "phone" || a === "miniphone" || a === "tablet") {
                  d.device = a
              } else {
                  if (a === "ladscape" || a === "portrait") {
                      d.orientation = a
                  } else {
                      d[a] = true
                  }
              }
          });
          return d
      },
      initToolbar: function(options) {
          if (options.InlinePreview) {
              var b = document.createElement("div");
              this.pre.parentNode.insertBefore(b, this.pre);
              return this.tb = Ext.create("InlineToolbar", {
                  renderTo: b
              })
          }
      },
      replacePre: function(options) {
          var c = document.createElement("div");
          this.pre.parentNode.replaceChild(c, this.pre);
          return Ext.create("Inline", {
              height: 200,
              renderTo: c,
              value: Ext.String.htmlDecode(Ext.util.Format.stripTags(this.pre.innerHTML)),
              options: options
                  // options: d,
                  // toolbar: this.tb
          })
      }
  });
