var CodeMirror = (function() {
    function u(aM, aJ) {
        var b1 = {},
            bj = u.defaults;
        for (var az in bj) {
            if (bj.hasOwnProperty(az)) {
                b1[az] = (aJ && aJ.hasOwnProperty(az) ? aJ : bj)[az]
            }
        }
        var aD = document.createElement("div");
        aD.className = "CodeMirror" + (b1.lineWrapping ? " CodeMirror-wrap" : "");
        aD.innerHTML = '<div style="overflow: hidden; position: relative; width: 3px; height: 0px;"><textarea style="position: absolute; padding: 0; width: 1px; height: 1em" wrap="off" autocorrect="off" autocapitalize="off"></textarea></div><div class="CodeMirror-scroll" tabindex="-1"><div style="position: relative"><div style="position: relative"><div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text"></div></div><div class="CodeMirror-lines"><div style="position: relative; z-index: 0"><div style="position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;"></div><pre class="CodeMirror-cursor">&#160;</pre><div style="position: relative; z-index: -1"></div><div></div></div></div></div></div></div>';
        if (aM.appendChild) {
            aM.appendChild(aD)
        } else {
            aM(aD)
        }
        var bX = aD.firstChild,
            bm = bX.firstChild,
            bk = aD.lastChild,
            bM = bk.firstChild,
            cg = bM.firstChild,
            aH = cg.firstChild,
            aY = aH.firstChild,
            bu = aH.nextSibling.firstChild,
            av = bu.firstChild,
            bc = av.nextSibling,
            bg = bc.nextSibling,
            aq = bg.nextSibling;
        cD();
        if (s) {
            bm.style.width = "0px"
        }
        if (!f) {
            bu.draggable = true
        }
        bu.style.outline = "none";
        if (b1.tabindex != null) {
            bm.tabIndex = b1.tabindex
        }
        if (b1.autofocus) {
            bz()
        }
        if (!b1.gutter && !b1.lineNumbers) {
            aH.style.display = "none"
        }
        if (m) {
            bX.style.height = "1px", bX.style.position = "absolute"
        }
        try {
            ct("x")
        } catch (b8) {
            if (b8.message.match(/runtime/i)) {
                b8 = new Error("A CodeMirror inside a P-style element does not work in Internet Explorer. (innerHTML bug)")
            }
            throw b8
        }
        var b7 = new z(),
            aw = new z(),
            cP;
        var cb, cy = new i([new ah([new e("")])]),
            ch, cj;
        bT();
        var cW = {
            from: {
                line: 0,
                ch: 0
            },
            to: {
                line: 0,
                ch: 0
            },
            inverted: false
        };
        var ci, bq, aZ, bF = 0,
            bb, cn = false,
            cs = false;
        var cp, b6, aB, cN, aP, bf, aS, cA;
        var bd = 0,
            cQ = 0,
            bL = 0,
            bN = 0;
        var b4;
        var bD = "",
            aF;
        var ap = {};
        ar(function() {
            aW(b1.value || "");
            cp = false
        })();
        var a8 = new k();
        r(bk, "mousedown", ar(ck));
        r(bk, "dblclick", ar(bW));
        r(bu, "selectstart", T);
        if (!N) {
            r(bk, "contextmenu", a1)
        }
        r(bk, "scroll", function() {
            bF = bk.scrollTop;
            cd([]);
            if (b1.fixedGutter) {
                aH.style.left = bk.scrollLeft + "px"
            }
            if (b1.onScroll) {
                b1.onScroll(b9)
            }
        });
        r(window, "resize", function() {
            cd(true)
        });
        r(bm, "keyup", ar(cl));
        r(bm, "input", aQ);
        r(bm, "keydown", ar(cc));
        r(bm, "keypress", ar(bn));
        r(bm, "focus", cU);
        r(bm, "blur", aE);
        if (b1.dragDrop) {
            r(bu, "dragstart", aI);

            function bC(cZ) {
                if (b1.onDragEvent && b1.onDragEvent(b9, O(cZ))) {
                    return
                }
                w(cZ)
            }
            r(bk, "dragenter", bC);
            r(bk, "dragover", bC);
            r(bk, "drop", ar(an))
        }
        r(bk, "paste", function() {
            bz();
            aQ()
        });
        r(bm, "paste", aQ);
        r(bm, "cut", ar(function() {
            if (!b1.readOnly) {
                bs("")
            }
        }));
        if (m) {
            r(bM, "mouseup", function() {
                if (document.activeElement == bm) {
                    bm.blur()
                }
                bz()
            })
        }
        var cw;
        try {
            cw = (document.activeElement == bm)
        } catch (b8) {}
        if (cw || b1.autofocus) {
            setTimeout(cU, 20)
        } else {
            aE()
        }

        function br(cZ) {
            return cZ >= 0 && cZ < cy.size
        }
        var b9 = aD.CodeMirror = {
            getValue: b2,
            setValue: ar(aW),
            getSelection: b3,
            replaceSelection: ar(bs),
            focus: function() {
                window.focus();
                bz();
                cU();
                aQ()
            },
            setOption: function(c0, c1) {
                var cZ = b1[c0];
                b1[c0] = c1;
                if (c0 == "mode" || c0 == "indentUnit") {
                    bT()
                } else {
                    if (c0 == "readOnly" && c1 == "nocursor") {
                        aE();
                        bm.blur()
                    } else {
                        if (c0 == "readOnly" && !c1) {
                            cC(true)
                        } else {
                            if (c0 == "theme") {
                                cD()
                            } else {
                                if (c0 == "lineWrapping" && cZ != c1) {
                                    ar(cG)()
                                } else {
                                    if (c0 == "tabSize") {
                                        cd(true)
                                    }
                                }
                            }
                        }
                    }
                }
                if (c0 == "lineNumbers" || c0 == "gutter" || c0 == "firstLineNumber" || c0 == "theme") {
                    be();
                    cd(true)
                }
            },
            getOption: function(cZ) {
                return b1[cZ]
            },
            undo: ar(cT),
            redo: ar(cJ),
            indentLine: ar(function(c0, cZ) {
                if (typeof cZ != "string") {
                    if (cZ == null) {
                        cZ = b1.smartIndent ? "smart" : "prev"
                    } else {
                        cZ = cZ ? "add" : "subtract"
                    }
                }
                if (br(c0)) {
                    by(c0, cZ)
                }
            }),
            indentSelection: ar(cB),
            historySize: function() {
                return {
                    undo: a8.done.length,
                    redo: a8.undone.length
                }
            },
            clearHistory: function() {
                a8 = new k()
            },
            matchBrackets: ar(function() {
                ce(true)
            }),
            getTokenAt: ar(function(cZ) {
                cZ = aT(cZ);
                return cF(cZ.line).getTokenAt(cb, cu(cZ.line), cZ.ch)
            }),
            getStateAfter: function(cZ) {
                cZ = bZ(cZ == null ? cy.size - 1 : cZ);
                return cu(cZ + 1)
            },
            cursorCoords: function(c0, cZ) {
                if (c0 == null) {
                    c0 = cW.inverted
                }
                return this.charCoords(c0 ? cW.from : cW.to, cZ)
            },
            charCoords: function(c0, cZ) {
                c0 = aT(c0);
                if (cZ == "local") {
                    return cR(c0, false)
                }
                if (cZ == "div") {
                    return cR(c0, true)
                }
                return ao(c0)
            },
            coordsChar: function(cZ) {
                var c0 = ak(bu);
                return bH(cZ.x - c0.left, cZ.y - c0.top)
            },
            markText: ar(bE),
            setBookmark: aU,
            findMarksAt: bo,
            setMarker: ar(bV),
            clearMarker: ar(au),
            setLineClass: ar(bl),
            hideLine: ar(function(cZ) {
                return cK(cZ, true)
            }),
            showLine: ar(function(cZ) {
                return cK(cZ, false)
            }),
            onDeleteLine: function(cZ, c0) {
                if (typeof cZ == "number") {
                    if (!br(cZ)) {
                        return null
                    }
                    cZ = cF(cZ)
                }(cZ.handlers || (cZ.handlers = [])).push(c0);
                return cZ
            },
            lineInfo: aV,
            addWidget: function(c3, c1, c5, c2, c7) {
                c3 = cR(aT(c3));
                var c4 = c3.yBot,
                    c0 = c3.x;
                c1.style.position = "absolute";
                bM.appendChild(c1);
                if (c2 == "over") {
                    c4 = c3.y
                } else {
                    if (c2 == "near") {
                        var cZ = Math.max(bk.offsetHeight, cy.height * bP()),
                            c6 = Math.max(bM.clientWidth, bu.clientWidth) - a5();
                        if (c3.yBot + c1.offsetHeight > cZ && c3.y > c1.offsetHeight) {
                            c4 = c3.y - c1.offsetHeight
                        }
                        if (c0 + c1.offsetWidth > c6) {
                            c0 = c6 - c1.offsetWidth
                        }
                    }
                }
                c1.style.top = (c4 + cr()) + "px";
                c1.style.left = c1.style.right = "";
                if (c7 == "right") {
                    c0 = bM.clientWidth - c1.offsetWidth;
                    c1.style.right = "0px"
                } else {
                    if (c7 == "left") {
                        c0 = 0
                    } else {
                        if (c7 == "middle") {
                            c0 = (bM.clientWidth - c1.offsetWidth) / 2
                        }
                    }
                    c1.style.left = (c0 + a5()) + "px"
                }
                if (c5) {
                    aA(c0, c4, c0 + c1.offsetWidth, c4 + c1.offsetHeight)
                }
            },
            lineCount: function() {
                return cy.size
            },
            clipPos: aT,
            getCursor: function(cZ) {
                if (cZ == null) {
                    cZ = cW.inverted
                }
                return aa(cZ ? cW.from : cW.to)
            },
            somethingSelected: function() {
                return !ad(cW.from, cW.to)
            },
            setCursor: ar(function(cZ, c1, c0) {
                if (c1 == null && typeof cZ.line == "number") {
                    a6(cZ.line, cZ.ch, c0)
                } else {
                    a6(cZ, c1, c0)
                }
            }),
            setSelection: ar(function(c1, c0, cZ) {
                (cZ ? bx : bw)(aT(c1), aT(c0 || c1))
            }),
            getLine: function(cZ) {
                if (br(cZ)) {
                    return cF(cZ).text
                }
            },
            getLineHandle: function(cZ) {
                if (br(cZ)) {
                    return cF(cZ)
                }
            },
            setLine: ar(function(cZ, c0) {
                if (br(cZ)) {
                    bQ(c0, {
                        line: cZ,
                        ch: 0
                    }, {
                        line: cZ,
                        ch: cF(cZ).text.length
                    })
                }
            }),
            removeLine: ar(function(cZ) {
                if (br(cZ)) {
                    bQ("", {
                        line: cZ,
                        ch: 0
                    }, aT({
                        line: cZ + 1,
                        ch: 0
                    }))
                }
            }),
            replaceRange: ar(bQ),
            getRange: function(c0, cZ) {
                return cO(aT(c0), aT(cZ))
            },
            triggerOnKeyDown: ar(cc),
            execCommand: function(cZ) {
                return L[cZ](b9)
            },
            moveH: ar(cE),
            deleteH: ar(cm),
            moveV: ar(cx),
            toggleOverwrite: function() {
                if (cn) {
                    cn = false;
                    bc.className = bc.className.replace(" CodeMirror-overwrite", "")
                } else {
                    cn = true;
                    bc.className += " CodeMirror-overwrite"
                }
            },
            posFromIndex: function(c0) {
                var c1 = 0,
                    cZ;
                cy.iter(0, cy.size, function(c2) {
                    var c3 = c2.text.length + 1;
                    if (c3 > c0) {
                        cZ = c0;
                        return true
                    }
                    c0 -= c3;
                    ++c1
                });
                return aT({
                    line: c1,
                    ch: cZ
                })
            },
            indexFromPos: function(c0) {
                if (c0.line < 0 || c0.ch < 0) {
                    return 0
                }
                var cZ = c0.ch;
                cy.iter(0, c0.line, function(c1) {
                    cZ += c1.text.length + 1
                });
                return cZ
            },
            scrollTo: function(cZ, c0) {
                if (cZ != null) {
                    bk.scrollLeft = cZ
                }
                if (c0 != null) {
                    bk.scrollTop = c0
                }
                cd([])
            },
            operation: function(cZ) {
                return ar(cZ)()
            },
            compoundChange: function(cZ) {
                return bO(cZ)
            },
            refresh: function() {
                cd(true);
                if (bk.scrollHeight > bF) {
                    bk.scrollTop = bF
                }
            },
            getInputField: function() {
                return bm
            },
            getWrapperElement: function() {
                return aD
            },
            getScrollerElement: function() {
                return bk
            },
            getGutterElement: function() {
                return aH
            }
        };

        function cF(cZ) {
            return C(cy, cZ)
        }

        function a3(c0, cZ) {
            aS = true;
            var c1 = cZ - c0.height;
            for (var c2 = c0; c2; c2 = c2.parent) {
                c2.height += c1
            }
        }

        function aW(cZ) {
            var c0 = {
                line: 0,
                ch: 0
            };
            aO(c0, {
                line: cy.size - 1,
                ch: cF(cy.size - 1).text.length
            }, A(cZ), c0, c0);
            cp = true
        }

        function b2() {
            var cZ = [];
            cy.iter(0, cy.size, function(c0) {
                cZ.push(c0.text)
            });
            return cZ.join("\n")
        }

        function ck(c8) {
            a4(y(c8, "shiftKey"));
            for (var c3 = j(c8); c3 != aD; c3 = c3.parentNode) {
                if (c3.parentNode == bM && c3 != cg) {
                    return
                }
            }
            for (var c3 = j(c8); c3 != aD; c3 = c3.parentNode) {
                if (c3.parentNode == aY) {
                    if (b1.onGutterClick) {
                        b1.onGutterClick(b9, q(aY.childNodes, c3) + cQ, c8)
                    }
                    return T(c8)
                }
            }
            var cZ = a2(c8);
            switch (x(c8)) {
                case 3:
                    if (N && !M) {
                        a1(c8)
                    }
                    return;
                case 2:
                    if (cZ) {
                        a6(cZ.line, cZ.ch, true)
                    }
                    return
            }
            if (!cZ) {
                if (j(c8) == bk) {
                    T(c8)
                }
                return
            }
            if (!cj) {
                cU()
            }
            var c0 = +new Date;
            if (aZ && aZ.time > c0 - 400 && ad(aZ.pos, cZ)) {
                T(c8);
                setTimeout(bz, 20);
                return aK(cZ.line)
            } else {
                if (bq && bq.time > c0 - 400 && ad(bq.pos, cZ)) {
                    aZ = {
                        time: c0,
                        pos: cZ
                    };
                    T(c8);
                    return bI(cZ)
                } else {
                    bq = {
                        time: c0,
                        pos: cZ
                    }
                }
            }
            var da = cZ,
                c1;
            if (b1.dragDrop && F && !b1.readOnly && !ad(cW.from, cW.to) && !Z(cZ, cW.from) && !Z(cW.to, cZ)) {
                if (f) {
                    bu.draggable = true
                }

                function c4(db) {
                    if (f) {
                        bu.draggable = false
                    }
                    bb = false;
                    c7();
                    c2();
                    if (Math.abs(c8.clientX - db.clientX) + Math.abs(c8.clientY - db.clientY) < 10) {
                        T(db);
                        a6(cZ.line, cZ.ch, true);
                        bz()
                    }
                }
                var c7 = r(document, "mouseup", ar(c4), true);
                var c2 = r(bk, "drop", ar(c4), true);
                bb = true;
                if (bu.dragDrop) {
                    bu.dragDrop()
                }
                return
            }
            T(c8);
            a6(cZ.line, cZ.ch, true);

            function c9(db) {
                var dd = a2(db, true);
                if (dd && !ad(dd, da)) {
                    if (!cj) {
                        cU()
                    }
                    da = dd;
                    bx(cZ, dd);
                    cp = false;
                    var dc = bA();
                    if (dd.line >= dc.to || dd.line < dc.from) {
                        c1 = setTimeout(ar(function() {
                            c9(db)
                        }), 150)
                    }
                }
            }

            function c6(db) {
                clearTimeout(c1);
                var dc = a2(db);
                if (dc) {
                    bx(cZ, dc)
                }
                T(db);
                bz();
                cp = true;
                c5();
                c7()
            }
            var c5 = r(document, "mousemove", ar(function(db) {
                clearTimeout(c1);
                T(db);
                if (!I && !x(db)) {
                    c6(db)
                } else {
                    c9(db)
                }
            }), true);
            var c7 = r(document, "mouseup", ar(c6), true)
        }

        function bW(cZ) {
            for (var c1 = j(cZ); c1 != aD; c1 = c1.parentNode) {
                if (c1.parentNode == aY) {
                    return T(cZ)
                }
            }
            var c0 = a2(cZ);
            if (!c0) {
                return
            }
            aZ = {
                time: +new Date,
                pos: c0
            };
            T(cZ);
            bI(c0)
        }

        function an(c3) {
            if (b1.onDragEvent && b1.onDragEvent(b9, O(c3))) {
                return
            }
            c3.preventDefault();
            var c6 = a2(c3, true),
                c0 = c3.dataTransfer.files;
            if (!c6 || b1.readOnly) {
                return
            }
            if (c0 && c0.length && window.FileReader && window.File) {
                function c2(c9, c8) {
                    var c7 = new FileReader;
                    c7.onload = function() {
                        c4[c8] = c7.result;
                        if (++c1 == c5) {
                            c6 = aT(c6);
                            ar(function() {
                                var da = bQ(c4.join(""), c6, c6);
                                bx(c6, da)
                            })()
                        }
                    };
                    c7.readAsText(c9)
                }
                var c5 = c0.length,
                    c4 = Array(c5),
                    c1 = 0;
                for (var cZ = 0; cZ < c5; ++cZ) {
                    c2(c0[cZ], cZ)
                }
            } else {
                try {
                    var c4 = c3.dataTransfer.getData("Text");
                    if (c4) {
                        bO(function() {
                            var c8 = cW.from,
                                c7 = cW.to;
                            bx(c6, c6);
                            if (bb) {
                                bQ("", c8, c7)
                            }
                            bs(c4);
                            bz()
                        })
                    }
                } catch (c3) {}
            }
        }

        function aI(c1) {
            var cZ = b3();
            c1.dataTransfer.setData("Text", cZ);
            if (N || af) {
                var c0 = document.createElement("img");
                c0.scr = "data:image/gif;base64,R0lGODdhAgACAIAAAAAAAP///ywAAAAAAgACAAACAoRRADs=";
                c1.dataTransfer.setDragImage(c0, 0, 0)
            }
        }

        function bi(c1, cZ) {
            if (typeof c1 == "string") {
                c1 = L[c1];
                if (!c1) {
                    return false
                }
            }
            var c0 = ci;
            try {
                if (b1.readOnly) {
                    cs = true
                }
                if (cZ) {
                    ci = null
                }
                c1(b9)
            } catch (c2) {
                if (c2 != ab) {
                    throw c2
                }
                return false
            } finally {
                ci = c0;
                cs = false
            }
            return true
        }

        function cL(c5) {
            var cZ = c(b1.keyMap),
                c2 = cZ.auto;
            clearTimeout(bB);
            if (c2 && !Q(c5)) {
                bB = setTimeout(function() {
                    if (c(b1.keyMap) == cZ) {
                        b1.keyMap = (c2.call ? c2.call(null, b9) : c2)
                    }
                }, 50)
            }
            var c0 = R[y(c5, "keyCode")],
                c4 = false;
            if (c0 == null || c5.altGraphKey) {
                return false
            }
            if (y(c5, "altKey")) {
                c0 = "Alt-" + c0
            }
            if (y(c5, "ctrlKey")) {
                c0 = "Ctrl-" + c0
            }
            if (y(c5, "metaKey")) {
                c0 = "Cmd-" + c0
            }
            var c3 = false;

            function c1() {
                c3 = true
            }
            if (y(c5, "shiftKey")) {
                c4 = l("Shift-" + c0, b1.extraKeys, b1.keyMap, function(c6) {
                    return bi(c6, true)
                }, c1) || l(c0, b1.extraKeys, b1.keyMap, function(c6) {
                    if (typeof c6 == "string" && /^go[A-Z]/.test(c6)) {
                        return bi(c6)
                    }
                }, c1)
            } else {
                c4 = l(c0, b1.extraKeys, b1.keyMap, bi, c1)
            }
            if (c3) {
                c4 = false
            }
            if (c4) {
                T(c5);
                if (I) {
                    c5.oldKeyCode = c5.keyCode;
                    c5.keyCode = 0
                }
            }
            return c4
        }

        function bY(c1, cZ) {
            var c0 = l("'" + cZ + "'", b1.extraKeys, b1.keyMap, function(c2) {
                return bi(c2, true)
            });
            if (c0) {
                T(c1)
            }
            return c0
        }
        var cI = null,
            bB;

        function cc(c1) {
            if (!cj) {
                cU()
            }
            if (I && c1.keyCode == 27) {
                c1.returnValue = false
            }
            if (bt) {
                if (bK()) {
                    bt = false
                }
            }
            if (b1.onKeyEvent && b1.onKeyEvent(b9, O(c1))) {
                return
            }
            var cZ = y(c1, "keyCode");
            a4(cZ == 16 || y(c1, "shiftKey"));
            var c0 = cL(c1);
            if (window.opera) {
                cI = c0 ? cZ : null;
                if (!c0 && cZ == 88 && y(c1, M ? "metaKey" : "ctrlKey")) {
                    bs("")
                }
            }
        }

        function bn(c2) {
            if (bt) {
                bK()
            }
            if (b1.onKeyEvent && b1.onKeyEvent(b9, O(c2))) {
                return
            }
            var c1 = y(c2, "keyCode"),
                cZ = y(c2, "charCode");
            if (window.opera && c1 == cI) {
                cI = null;
                T(c2);
                return
            }
            if (((window.opera && !c2.which) || m) && cL(c2)) {
                return
            }
            var c0 = String.fromCharCode(cZ == null ? c1 : cZ);
            if (b1.electricChars && cb.electricChars && b1.smartIndent && !b1.readOnly) {
                if (cb.electricChars.indexOf(c0) > -1) {
                    setTimeout(ar(function() {
                        by(cW.to.line, "smart")
                    }), 75)
                }
            }
            if (bY(c2, c0)) {
                return
            }
            aQ()
        }

        function cl(cZ) {
            if (b1.onKeyEvent && b1.onKeyEvent(b9, O(cZ))) {
                return
            }
            if (y(cZ, "keyCode") == 16) {
                ci = null
            }
        }

        function cU() {
            if (b1.readOnly == "nocursor") {
                return
            }
            if (!cj) {
                if (b1.onFocus) {
                    b1.onFocus(b9)
                }
                cj = true;
                if (aD.className.search(/\bCodeMirror-focused\b/) == -1) {
                    aD.className += " CodeMirror-focused"
                }
                if (!bf) {
                    cC(true)
                }
            }
            am();
            cM()
        }

        function aE() {
            if (cj) {
                if (b1.onBlur) {
                    b1.onBlur(b9)
                }
                cj = false;
                if (b4) {
                    ar(function() {
                        if (b4) {
                            b4();
                            b4 = null
                        }
                    })()
                }
                aD.className = aD.className.replace(" CodeMirror-focused", "")
            }
            clearInterval(cP);
            setTimeout(function() {
                if (!cj) {
                    ci = null
                }
            }, 150)
        }

        function aO(c4, c3, c2, c0, cZ) {
            if (cs) {
                return
            }
            if (a8) {
                var c1 = [];
                cy.iter(c4.line, c3.line + 1, function(c5) {
                    c1.push(c5.text)
                });
                a8.addChange(c4.line, c2.length, c1);
                while (a8.done.length > b1.undoDepth) {
                    a8.done.shift()
                }
            }
            at(c4, c3, c2, c0, cZ)
        }

        function ca(c4, c5) {
            if (!c4.length) {
                return
            }
            var c6 = c4.pop(),
                c0 = [];
            for (var c1 = c6.length - 1; c1 >= 0; c1 -= 1) {
                var c3 = c6[c1];
                var c7 = [],
                    cZ = c3.start + c3.added;
                cy.iter(c3.start, cZ, function(c8) {
                    c7.push(c8.text)
                });
                c0.push({
                    start: c3.start,
                    added: c3.old.length,
                    old: c7
                });
                var c2 = aT({
                    line: c3.start + c3.old.length - 1,
                    ch: W(c7[c7.length - 1], c3.old[c3.old.length - 1])
                });
                at({
                    line: c3.start,
                    ch: 0
                }, {
                    line: cZ - 1,
                    ch: cF(cZ - 1).text.length
                }, c3.old, c2, c2)
            }
            cp = true;
            c5.push(c0)
        }

        function cT() {
            ca(a8.done, a8.undone)
        }

        function cJ() {
            ca(a8.undone, a8.done)
        }

        function at(de, c3, dk, cZ, dl) {
            if (cs) {
                return
            }
            var dj = false,
                c2 = bD.length;
            if (!b1.lineWrapping) {
                cy.iter(de.line, c3.line + 1, function(dm) {
                    if (dm.text.length == c2) {
                        dj = true;
                        return true
                    }
                })
            }
            if (de.line != c3.line || dk.length > 1) {
                aS = true
            }
            var db = c3.line - de.line,
                da = cF(de.line),
                c0 = cF(c3.line);
            if (de.ch == 0 && c3.ch == 0 && dk[dk.length - 1] == "") {
                var c8 = [],
                    c9 = null;
                if (de.line) {
                    c9 = cF(de.line - 1);
                    c9.fixMarkEnds(c0)
                } else {
                    c0.fixMarkStarts()
                }
                for (var dg = 0, di = dk.length - 1; dg < di; ++dg) {
                    c8.push(e.inheritMarks(dk[dg], c9))
                }
                if (db) {
                    cy.remove(de.line, db, cA)
                }
                if (c8.length) {
                    cy.insert(de.line, c8)
                }
            } else {
                if (da == c0) {
                    if (dk.length == 1) {
                        da.replace(de.ch, c3.ch, dk[0])
                    } else {
                        c0 = da.split(c3.ch, dk[dk.length - 1]);
                        da.replace(de.ch, null, dk[0]);
                        da.fixMarkEnds(c0);
                        var c8 = [];
                        for (var dg = 1, di = dk.length - 1; dg < di; ++dg) {
                            c8.push(e.inheritMarks(dk[dg], da))
                        }
                        c8.push(c0);
                        cy.insert(de.line + 1, c8)
                    }
                } else {
                    if (dk.length == 1) {
                        da.replace(de.ch, null, dk[0]);
                        c0.replace(null, c3.ch, "");
                        da.append(c0);
                        cy.remove(de.line + 1, db, cA)
                    } else {
                        var c8 = [];
                        da.replace(de.ch, null, dk[0]);
                        c0.replace(null, c3.ch, dk[dk.length - 1]);
                        da.fixMarkEnds(c0);
                        for (var dg = 1, di = dk.length - 1; dg < di; ++dg) {
                            c8.push(e.inheritMarks(dk[dg], da))
                        }
                        if (db > 1) {
                            cy.remove(de.line + 1, db - 1, cA)
                        }
                        cy.insert(de.line + 1, c8)
                    }
                }
            }
            if (b1.lineWrapping) {
                var c5 = Math.max(5, bk.clientWidth / bh() - 3);
                cy.iter(de.line, de.line + dk.length, function(dm) {
                    if (dm.hidden) {
                        return
                    }
                    var dn = Math.ceil(dm.text.length / c5) || 1;
                    if (dn != dm.height) {
                        a3(dm, dn)
                    }
                })
            } else {
                cy.iter(de.line, de.line + dk.length, function(dn) {
                    var dm = dn.text;
                    if (dm.length > c2) {
                        bD = dm;
                        c2 = dm.length;
                        aF = null;
                        dj = false
                    }
                });
                if (dj) {
                    c2 = 0;
                    bD = "";
                    aF = null;
                    cy.iter(0, cy.size, function(dn) {
                        var dm = dn.text;
                        if (dm.length > c2) {
                            c2 = dm.length;
                            bD = dm
                        }
                    })
                }
            }
            var c1 = [],
                c7 = dk.length - db - 1;
            for (var dg = 0, dd = ch.length; dg < dd; ++dg) {
                var dh = ch[dg];
                if (dh < de.line) {
                    c1.push(dh)
                } else {
                    if (dh > c3.line) {
                        c1.push(dh + c7)
                    }
                }
            }
            var df = de.line + Math.min(dk.length, 500);
            cH(de.line, df);
            c1.push(df);
            ch = c1;
            bG(100);
            aB.push({
                from: de.line,
                to: c3.line + 1,
                diff: c7
            });
            var c6 = {
                from: de,
                to: c3,
                text: dk
            };
            if (cN) {
                for (var c4 = cN; c4.next; c4 = c4.next) {}
                c4.next = c6
            } else {
                cN = c6
            }

            function dc(dm) {
                return dm <= Math.min(c3.line, c3.line + c7) ? dm : dm + c7
            }
            bw(cZ, dl, dc(cW.from.line), dc(cW.to.line));
            if (bk.clientHeight) {
                bM.style.height = (cy.height * bP() + 2 * cr()) + "px"
            }
        }

        function bQ(c0, c3, c2) {
            c3 = aT(c3);
            if (!c2) {
                c2 = c3
            } else {
                c2 = aT(c2)
            }
            c0 = A(c0);

            function c1(c6) {
                if (Z(c6, c3)) {
                    return c6
                }
                if (!Z(c2, c6)) {
                    return cZ
                }
                var c4 = c6.line + c0.length - (c2.line - c3.line) - 1;
                var c5 = c6.ch;
                if (c6.line == c2.line) {
                    c5 += c0[c0.length - 1].length - (c2.ch - (c2.line == c3.line ? c3.ch : 0))
                }
                return {
                    line: c4,
                    ch: c5
                }
            }
            var cZ;
            aC(c0, c3, c2, function(c4) {
                cZ = c4;
                return {
                    from: c1(cW.from),
                    to: c1(cW.to)
                }
            });
            return cZ
        }

        function bs(cZ, c0) {
            aC(A(cZ), cW.from, cW.to, function(c1) {
                if (c0 == "end") {
                    return {
                        from: c1,
                        to: c1
                    }
                } else {
                    if (c0 == "start") {
                        return {
                            from: cW.from,
                            to: cW.from
                        }
                    } else {
                        return {
                            from: cW.from,
                            to: c1
                        }
                    }
                }
            })
        }

        function aC(c2, c4, c3, cZ) {
            var c1 = c2.length == 1 ? c2[0].length + c4.ch : c2[c2.length - 1].length;
            var c0 = cZ({
                line: c4.line + c2.length - 1,
                ch: c1
            });
            aO(c4, c3, c2, c0.from, c0.to)
        }

        function cO(c3, c2) {
            var c0 = c3.line,
                cZ = c2.line;
            if (c0 == cZ) {
                return cF(c0).text.slice(c3.ch, c2.ch)
            }
            var c1 = [cF(c0).text.slice(c3.ch)];
            cy.iter(c0 + 1, cZ, function(c4) {
                c1.push(c4.text)
            });
            c1.push(cF(cZ).text.slice(0, c2.ch));
            return c1.join("\n")
        }

        function b3() {
            return cO(cW.from, cW.to)
        }
        var bt = false;

        function am() {
            if (bt) {
                return
            }
            b7.set(b1.pollInterval, function() {
                aN();
                bK();
                if (cj) {
                    am()
                }
                ay()
            })
        }

        function aQ() {
            var cZ = false;
            bt = true;

            function c0() {
                aN();
                var c1 = bK();
                if (!c1 && !cZ) {
                    cZ = true;
                    b7.set(60, c0)
                } else {
                    bt = false;
                    am()
                }
                ay()
            }
            b7.set(20, c0)
        }
        var ba = "";

        function bK() {
            if (bf || !cj || ae(bm) || b1.readOnly) {
                return false
            }
            var c0 = bm.value;
            if (c0 == ba) {
                return false
            }
            ci = null;
            var c1 = 0,
                cZ = Math.min(ba.length, c0.length);
            while (c1 < cZ && ba[c1] == c0[c1]) {
                ++c1
            }
            if (c1 < ba.length) {
                cW.from = {
                    line: cW.from.line,
                    ch: cW.from.ch - (ba.length - c1)
                }
            } else {
                if (cn && ad(cW.from, cW.to)) {
                    cW.to = {
                        line: cW.to.line,
                        ch: Math.min(cF(cW.to.line).text.length, cW.to.ch + (c0.length - c1))
                    }
                }
            }
            bs(c0.slice(c1), "end");
            ba = c0;
            return true
        }

        function cC(cZ) {
            if (!ad(cW.from, cW.to)) {
                ba = "";
                bm.value = b3();
                a(bm)
            } else {
                if (cZ) {
                    ba = bm.value = ""
                }
            }
        }

        function bz() {
            if (b1.readOnly != "nocursor") {
                bm.focus()
            }
        }

        function cY() {
            if (!bc.getBoundingClientRect) {
                return
            }
            var cZ = bc.getBoundingClientRect();
            if (I && cZ.top == cZ.bottom) {
                return
            }
            var c0 = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
            if (cZ.top < 0 || cZ.bottom > c0) {
                bc.scrollIntoView()
            }
        }

        function cf() {
            var c0 = cR(cW.inverted ? cW.from : cW.to);
            var cZ = b1.lineWrapping ? Math.min(c0.x, bu.offsetWidth) : c0.x;
            return aA(cZ, c0.y, cZ, c0.yBot)
        }

        function aA(c1, c7, cZ, c6) {
            var c4 = a5(),
                dc = cr();
            c7 += dc;
            c6 += dc;
            c1 += c4;
            cZ += c4;
            var c9 = bk.clientHeight,
                c2 = bk.scrollTop,
                c0 = false,
                db = true;
            if (c7 < c2) {
                bk.scrollTop = Math.max(0, c7);
                c0 = true
            } else {
                if (c6 > c2 + c9) {
                    bk.scrollTop = c6 - c9;
                    c0 = true
                }
            }
            var c8 = bk.clientWidth,
                da = bk.scrollLeft;
            var c5 = b1.fixedGutter ? aH.clientWidth : 0;
            var c3 = c1 < c5 + c4 + 10;
            if (c1 < da + c5 || c3) {
                if (c3) {
                    c1 = 0
                }
                bk.scrollLeft = Math.max(0, c1 - 10 - c5);
                c0 = true
            } else {
                if (cZ > c8 + da - 3) {
                    bk.scrollLeft = cZ + 10 - c8;
                    c0 = true;
                    if (cZ > bM.clientWidth) {
                        db = false
                    }
                }
            }
            if (c0 && b1.onScroll) {
                b1.onScroll(b9)
            }
            return db
        }

        function bA() {
            var cZ = bP(),
                c2 = bk.scrollTop - cr();
            var c1 = Math.max(0, Math.floor(c2 / cZ));
            var c0 = Math.ceil((c2 + bk.clientHeight) / cZ);
            return {
                from: X(cy, c1),
                to: X(cy, c0)
            }
        }

        function cd(c7, c3) {
            if (!bk.clientWidth) {
                cQ = bL = bd = 0;
                return
            }
            var c2 = bA();
            if (c7 !== true && c7.length == 0 && c2.from > cQ && c2.to < bL) {
                return
            }
            var c8 = Math.max(c2.from - 100, 0),
                c9 = Math.min(cy.size, c2.to + 100);
            if (cQ < c8 && c8 - cQ < 20) {
                c8 = cQ
            }
            if (bL > c9 && bL - c9 < 20) {
                c9 = Math.min(cy.size, bL)
            }
            var db = c7 === true ? [] : b0([{
                from: cQ,
                to: bL,
                domStart: 0
            }], c7);
            var c6 = 0;
            for (var c4 = 0; c4 < db.length; ++c4) {
                var c5 = db[c4];
                if (c5.from < c8) {
                    c5.domStart += (c8 - c5.from);
                    c5.from = c8
                }
                if (c5.to > c9) {
                    c5.to = c9
                }
                if (c5.from >= c5.to) {
                    db.splice(c4--, 1)
                } else {
                    c6 += c5.to - c5.from
                }
            }
            if (c6 == c9 - c8 && c8 == cQ && c9 == bL) {
                return
            }
            db.sort(function(dd, dc) {
                return dd.domStart - dc.domStart
            });
            var c1 = bP(),
                cZ = aH.style.display;
            aq.style.display = "none";
            aR(c8, c9, db);
            aq.style.display = aH.style.display = "";
            var c0 = c8 != cQ || c9 != bL || bN != bk.clientHeight + c1;
            if (c0) {
                bN = bk.clientHeight + c1
            }
            cQ = c8;
            bL = c9;
            bd = g(cy, c8);
            cg.style.top = (bd * c1) + "px";
            if (bk.clientHeight) {
                bM.style.height = (cy.height * c1 + 2 * cr()) + "px"
            }
            if (aq.childNodes.length != bL - cQ) {
                throw new Error("BAD PATCH! " + JSON.stringify(db) + " size=" + (bL - cQ) + " nodes=" + aq.childNodes.length)
            }

            function da() {
                aF = bk.clientWidth;
                var dd = aq.firstChild,
                    dc = false;
                cy.iter(cQ, bL, function(df) {
                    if (!df.hidden) {
                        var de = Math.round(dd.offsetHeight / c1) || 1;
                        if (df.height != de) {
                            a3(df, de);
                            aS = dc = true
                        }
                    }
                    dd = dd.nextSibling
                });
                if (dc) {
                    bM.style.height = (cy.height * c1 + 2 * cr()) + "px"
                }
                return dc
            }
            if (b1.lineWrapping) {
                da()
            } else {
                if (aF == null) {
                    aF = ct(bD)
                }
                if (aF > bk.clientWidth) {
                    bu.style.width = aF + "px";
                    bM.style.width = "";
                    bM.style.width = bk.scrollWidth + "px"
                } else {
                    bu.style.width = bM.style.width = ""
                }
            }
            aH.style.display = cZ;
            if (c0 || aS) {
                aL() && b1.lineWrapping && da() && aL()
            }
            cV();
            if (!c3 && b1.onUpdate) {
                b1.onUpdate(b9)
            }
            return true
        }

        function b0(c8, c6) {
            for (var c3 = 0, c1 = c6.length || 0; c3 < c1; ++c3) {
                var c5 = c6[c3],
                    cZ = [],
                    c7 = c5.diff || 0;
                for (var c2 = 0, c0 = c8.length; c2 < c0; ++c2) {
                    var c4 = c8[c2];
                    if (c5.to <= c4.from && c5.diff) {
                        cZ.push({
                            from: c4.from + c7,
                            to: c4.to + c7,
                            domStart: c4.domStart
                        })
                    } else {
                        if (c5.to <= c4.from || c5.from >= c4.to) {
                            cZ.push(c4)
                        } else {
                            if (c5.from > c4.from) {
                                cZ.push({
                                    from: c4.from,
                                    to: c5.from,
                                    domStart: c4.domStart
                                })
                            }
                            if (c5.to < c4.to) {
                                cZ.push({
                                    from: c5.to + c7,
                                    to: c4.to + c7,
                                    domStart: c4.domStart + (c5.to - c4.from)
                                })
                            }
                        }
                    }
                }
                c8 = cZ
            }
            return c8
        }

        function aR(c8, c9, db) {
            if (!db.length) {
                aq.innerHTML = ""
            } else {
                function cZ(dd) {
                    var dc = dd.nextSibling;
                    dd.parentNode.removeChild(dd);
                    return dc
                }
                var c3 = 0,
                    c1 = aq.firstChild,
                    c0;
                for (var c4 = 0; c4 < db.length; ++c4) {
                    var da = db[c4];
                    while (da.domStart > c3) {
                        c1 = cZ(c1);
                        c3++
                    }
                    for (var c2 = 0, c6 = da.to - da.from; c2 < c6; ++c2) {
                        c1 = c1.nextSibling;
                        c3++
                    }
                }
                while (c1) {
                    c1 = cZ(c1)
                }
            }
            var c5 = db.shift(),
                c1 = aq.firstChild,
                c2 = c8;
            var c7 = document.createElement("div");
            cy.iter(c8, c9, function(dc) {
                if (c5 && c5.to == c2) {
                    c5 = db.shift()
                }
                if (!c5 || c5.from > c2) {
                    if (dc.hidden) {
                        var dd = c7.innerHTML = "<pre></pre>"
                    } else {
                        var dd = "<pre" + (dc.className ? ' class="' + dc.className + '"' : "") + ">" + dc.getHTML(a9) + "</pre>";
                        if (dc.bgClassName) {
                            dd = '<div style="position: relative"><pre class="' + dc.bgClassName + '" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: -2">&#160;</pre>' + dd + "</div>"
                        }
                    }
                    c7.innerHTML = dd;
                    aq.insertBefore(c7.firstChild, c1)
                } else {
                    c1 = c1.nextSibling
                }++c2
            })
        }

        function aL() {
            if (!b1.gutter && !b1.lineNumbers) {
                return
            }
            var c0 = cg.offsetHeight,
                c8 = bk.clientHeight;
            aH.style.height = (c0 - c8 < 2 ? c8 : c0) + "px";
            var c6 = [],
                c4 = cQ,
                c7;
            cy.iter(cQ, Math.max(bL, cQ + 1), function(da) {
                if (da.hidden) {
                    c6.push("<pre></pre>")
                } else {
                    var c9 = da.gutterMarker;
                    var dc = b1.lineNumbers ? c4 + b1.firstLineNumber : null;
                    if (c9 && c9.text) {
                        dc = c9.text.replace("%N%", dc != null ? dc : "")
                    } else {
                        if (dc == null) {
                            dc = "\u00a0"
                        }
                    }
                    c6.push((c9 && c9.style ? '<pre class="' + c9.style + '">' : "<pre>"), dc);
                    for (var db = 1; db < da.height; ++db) {
                        c6.push("<br/>&#160;")
                    }
                    c6.push("</pre>");
                    if (!c9) {
                        c7 = c4
                    }
                }++c4
            });
            aH.style.display = "none";
            aY.innerHTML = c6.join("");
            if (c7 != null) {
                var c2 = aY.childNodes[c7 - cQ];
                var c3 = String(cy.size).length,
                    cZ = H(c2),
                    c1 = "";
                while (cZ.length + c1.length < c3) {
                    c1 += "\u00a0"
                }
                if (c1) {
                    c2.insertBefore(document.createTextNode(c1), c2.firstChild)
                }
            }
            aH.style.display = "";
            var c5 = Math.abs((parseInt(bu.style.marginLeft) || 0) - aH.offsetWidth) > 2;
            bu.style.marginLeft = aH.offsetWidth + "px";
            aS = false;
            return c5
        }

        function cV() {
            var c2 = ad(cW.from, cW.to);
            var dd = cR(cW.from, true);
            var c8 = c2 ? dd : cR(cW.to, true);
            var c6 = cW.inverted ? dd : c8,
                c0 = bP();
            var cZ = ak(aD),
                c1 = ak(aq);
            bX.style.top = Math.max(0, Math.min(bk.offsetHeight, c6.y + c1.top - cZ.top)) + "px";
            bX.style.left = Math.max(0, Math.min(bk.offsetWidth, c6.x + c1.left - cZ.left)) + "px";
            if (c2) {
                bc.style.top = c6.y + "px";
                bc.style.left = (b1.lineWrapping ? Math.min(c6.x, bu.offsetWidth) : c6.x) + "px";
                bc.style.display = "";
                bg.style.display = "none"
            } else {
                var db = dd.y == c8.y,
                    c4 = "";
                var c9 = bu.clientWidth || bu.offsetWidth;
                var c5 = bu.clientHeight || bu.offsetHeight;

                function dc(di, dh, dg, de) {
                    var df = E ? "width: " + (!dg ? c9 : c9 - dg - di) + "px" : "right: " + dg + "px";
                    c4 += '<div class="CodeMirror-selected" style="position: absolute; left: ' + di + "px; top: " + dh + "px; " + df + "; height: " + de + 'px"></div>'
                }
                if (cW.from.ch && dd.y >= 0) {
                    var da = db ? c9 - c8.x : 0;
                    dc(dd.x, dd.y, da, c0)
                }
                var c3 = Math.max(0, dd.y + (cW.from.ch ? c0 : 0));
                var c7 = Math.min(c8.y, c5) - c3;
                if (c7 > 0.2 * c0) {
                    dc(0, c3, 0, c7)
                }
                if ((!db || !cW.from.ch) && c8.y < c5 - 0.5 * c0) {
                    dc(0, c8.y, c9 - c8.x, c0)
                }
                bg.innerHTML = c4;
                bc.style.display = "none";
                bg.style.display = ""
            }
        }

        function a4(cZ) {
            if (cZ) {
                ci = ci || (cW.inverted ? cW.to : cW.from)
            } else {
                ci = null
            }
        }

        function bx(c1, c0) {
            var cZ = ci && aT(ci);
            if (cZ) {
                if (Z(cZ, c1)) {
                    c1 = cZ
                } else {
                    if (Z(c0, cZ)) {
                        c0 = cZ
                    }
                }
            }
            bw(c1, c0);
            b6 = true
        }

        function bw(c6, c5, cZ, c4) {
            cv = null;
            if (cZ == null) {
                cZ = cW.from.line;
                c4 = cW.to.line
            }
            if (ad(cW.from, c6) && ad(cW.to, c5)) {
                return
            }
            if (Z(c5, c6)) {
                var c2 = c5;
                c5 = c6;
                c6 = c2
            }
            if (c6.line != cZ) {
                var c3 = bR(c6, cZ, cW.from.ch);
                if (!c3) {
                    cK(c6.line, false)
                } else {
                    c6 = c3
                }
            }
            if (c5.line != c4) {
                c5 = bR(c5, c4, cW.to.ch)
            }
            if (ad(c6, c5)) {
                cW.inverted = false
            } else {
                if (ad(c6, cW.to)) {
                    cW.inverted = false
                } else {
                    if (ad(c5, cW.from)) {
                        cW.inverted = true
                    }
                }
            }
            if (b1.autoClearEmptyLines && ad(cW.from, cW.to)) {
                var c1 = cW.inverted ? c6 : c5;
                if (c1.line != cW.from.line && cW.from.line < cy.size) {
                    var c0 = cF(cW.from.line);
                    if (/^\s+$/.test(c0.text)) {
                        setTimeout(ar(function() {
                            if (c0.parent && /^\s+$/.test(c0.text)) {
                                var c7 = Y(c0);
                                bQ("", {
                                    line: c7,
                                    ch: 0
                                }, {
                                    line: c7,
                                    ch: c0.text.length
                                })
                            }
                        }, 10))
                    }
                }
            }
            cW.from = c6;
            cW.to = c5;
            aP = true
        }

        function bR(c4, c0, c1) {
            function c3(c7) {
                var c9 = c4.line + c7,
                    c6 = c7 == 1 ? cy.size : -1;
                while (c9 != c6) {
                    var c5 = cF(c9);
                    if (!c5.hidden) {
                        var c8 = c4.ch;
                        if (c2 || c8 > c1 || c8 > c5.text.length) {
                            c8 = c5.text.length
                        }
                        return {
                            line: c9,
                            ch: c8
                        }
                    }
                    c9 += c7
                }
            }
            var cZ = cF(c4.line);
            var c2 = c4.ch == cZ.text.length && c4.ch != c1;
            if (!cZ.hidden) {
                return c4
            }
            if (c4.line >= c0) {
                return c3(1) || c3(-1)
            } else {
                return c3(-1) || c3(1)
            }
        }

        function a6(cZ, c1, c0) {
            var c2 = aT({
                line: cZ,
                ch: c1 || 0
            });
            (c0 ? bx : bw)(c2, c2)
        }

        function bZ(cZ) {
            return Math.max(0, Math.min(cZ, cy.size - 1))
        }

        function aT(c1) {
            if (c1.line < 0) {
                return {
                    line: 0,
                    ch: 0
                }
            }
            if (c1.line >= cy.size) {
                return {
                    line: cy.size - 1,
                    ch: cF(cy.size - 1).text.length
                }
            }
            var cZ = c1.ch,
                c0 = cF(c1.line).text.length;
            if (cZ == null || cZ > c0) {
                return {
                    line: c1.line,
                    ch: c0
                }
            } else {
                if (cZ < 0) {
                    return {
                        line: c1.line,
                        ch: 0
                    }
                } else {
                    return c1
                }
            }
        }

        function co(c2, c6) {
            var c3 = cW.inverted ? cW.from : cW.to,
                c7 = c3.line,
                cZ = c3.ch;
            var c5 = cF(c7);

            function c0() {
                for (var c8 = c7 + c2, da = c2 < 0 ? -1 : cy.size; c8 != da; c8 += c2) {
                    var c9 = cF(c8);
                    if (!c9.hidden) {
                        c7 = c8;
                        c5 = c9;
                        return true
                    }
                }
            }

            function c4(c8) {
                if (cZ == (c2 < 0 ? 0 : c5.text.length)) {
                    if (!c8 && c0()) {
                        cZ = c2 < 0 ? c5.text.length : 0
                    } else {
                        return false
                    }
                } else {
                    cZ += c2
                }
                return true
            }
            if (c6 == "char") {
                c4()
            } else {
                if (c6 == "column") {
                    c4(true)
                } else {
                    if (c6 == "word") {
                        var c1 = false;
                        for (;;) {
                            if (c2 < 0) {
                                if (!c4()) {
                                    break
                                }
                            }
                            if (ag(c5.text.charAt(cZ))) {
                                c1 = true
                            } else {
                                if (c1) {
                                    if (c2 < 0) {
                                        c2 = 1;
                                        c4()
                                    }
                                    break
                                }
                            }
                            if (c2 > 0) {
                                if (!c4()) {
                                    break
                                }
                            }
                        }
                    }
                }
            }
            return {
                line: c7,
                ch: cZ
            }
        }

        function cE(cZ, c0) {
            var c1 = cZ < 0 ? cW.from : cW.to;
            if (ci || ad(cW.from, cW.to)) {
                c1 = co(cZ, c0)
            }
            a6(c1.line, c1.ch, true)
        }

        function cm(cZ, c0) {
            if (!ad(cW.from, cW.to)) {
                bQ("", cW.from, cW.to)
            } else {
                if (cZ < 0) {
                    bQ("", co(cZ, c0), cW.to)
                } else {
                    bQ("", cW.from, co(cZ, c0))
                }
            }
            b6 = true
        }
        var cv = null;

        function cx(cZ, c0) {
            var c2 = 0,
                c3 = cR(cW.inverted ? cW.from : cW.to, true);
            if (cv != null) {
                c3.x = cv
            }
            if (c0 == "page") {
                c2 = Math.min(bk.clientHeight, window.innerHeight || document.documentElement.clientHeight)
            } else {
                if (c0 == "line") {
                    c2 = bP()
                }
            }
            var c1 = bH(c3.x, c3.y + c2 * cZ + 2);
            if (c0 == "page") {
                bk.scrollTop += cR(c1, true).y - c3.y
            }
            a6(c1.line, c1.ch, true);
            cv = c3.x
        }

        function bI(c2) {
            var c0 = cF(c2.line).text;
            var c1 = c2.ch,
                cZ = c2.ch;
            while (c1 > 0 && ag(c0.charAt(c1 - 1))) {
                --c1
            }
            while (cZ < c0.length && ag(c0.charAt(cZ))) {
                ++cZ
            }
            bx({
                line: c2.line,
                ch: c1
            }, {
                line: c2.line,
                ch: cZ
            })
        }

        function aK(cZ) {
            bx({
                line: cZ,
                ch: 0
            }, aT({
                line: cZ + 1,
                ch: 0
            }))
        }

        function cB(c1) {
            if (ad(cW.from, cW.to)) {
                return by(cW.from.line, c1)
            }
            var c0 = cW.to.line - (cW.to.ch ? 0 : 1);
            for (var cZ = cW.from.line; cZ <= c0; ++cZ) {
                by(cZ, c1)
            }
        }

        function by(c1, c8) {
            if (!c8) {
                c8 = "add"
            }
            if (c8 == "smart") {
                if (!cb.indent) {
                    c8 = "prev"
                } else {
                    var cZ = cu(c1)
                }
            }
            var c9 = cF(c1),
                c3 = c9.indentation(b1.tabSize),
                c0 = c9.text.match(/^\s*/)[0],
                c5;
            if (c8 == "prev") {
                if (c1) {
                    c5 = cF(c1 - 1).indentation(b1.tabSize)
                } else {
                    c5 = 0
                }
            } else {
                if (c8 == "smart") {
                    c5 = cb.indent(cZ, c9.text.slice(c0.length), c9.text)
                } else {
                    if (c8 == "add") {
                        c5 = c3 + b1.indentUnit
                    } else {
                        if (c8 == "subtract") {
                            c5 = c3 - b1.indentUnit
                        }
                    }
                }
            }
            c5 = Math.max(0, c5);
            var c7 = c5 - c3;
            if (!c7) {
                if (cW.from.line != c1 && cW.to.line != c1) {
                    return
                }
                var c6 = c0
            } else {
                var c6 = "",
                    c4 = 0;
                if (b1.indentWithTabs) {
                    for (var c2 = Math.floor(c5 / b1.tabSize); c2; --c2) {
                        c4 += b1.tabSize;
                        c6 += "\t"
                    }
                }
                while (c4 < c5) {
                    ++c4;
                    c6 += " "
                }
            }
            bQ(c6, {
                line: c1,
                ch: 0
            }, {
                line: c1,
                ch: c0.length
            })
        }

        function bT() {
            cb = u.getMode(b1, b1.mode);
            cy.iter(0, cy.size, function(cZ) {
                cZ.stateAfter = null
            });
            ch = [0];
            bG()
        }

        function be() {
            var cZ = b1.gutter || b1.lineNumbers;
            aH.style.display = cZ ? "" : "none";
            if (cZ) {
                aS = true
            } else {
                aq.parentNode.style.marginLeft = 0
            }
        }

        function cG(c1, c0) {
            if (b1.lineWrapping) {
                aD.className += " CodeMirror-wrap";
                var cZ = bk.clientWidth / bh() - 3;
                cy.iter(0, cy.size, function(c2) {
                    if (c2.hidden) {
                        return
                    }
                    var c3 = Math.ceil(c2.text.length / cZ) || 1;
                    if (c3 != 1) {
                        a3(c2, c3)
                    }
                });
                bu.style.width = bM.style.width = ""
            } else {
                aD.className = aD.className.replace(" CodeMirror-wrap", "");
                aF = null;
                bD = "";
                cy.iter(0, cy.size, function(c2) {
                    if (c2.height != 1 && !c2.hidden) {
                        a3(c2, 1)
                    }
                    if (c2.text.length > bD.length) {
                        bD = c2.text
                    }
                })
            }
            aB.push({
                from: 0,
                to: cy.size
            })
        }

        function a9(c0) {
            var cZ = b1.tabSize - c0 % b1.tabSize,
                c2 = ap[cZ];
            if (c2) {
                return c2
            }
            for (var c3 = '<span class="cm-tab">', c1 = 0; c1 < cZ; ++c1) {
                c3 += " "
            }
            return (ap[cZ] = {
                html: c3 + "</span>",
                width: cZ
            })
        }

        function cD() {
            bk.className = bk.className.replace(/\s*cm-s-\S+/g, "") + b1.theme.replace(/(^|\s)\s*/g, " cm-s-")
        }

        function cX() {
            this.set = []
        }
        cX.prototype.clear = ar(function() {
            var c4 = Infinity,
                c0 = -Infinity;
            for (var c3 = 0, c6 = this.set.length; c3 < c6; ++c3) {
                var c1 = this.set[c3],
                    cZ = c1.marked;
                if (!cZ || !c1.parent) {
                    continue
                }
                var c5 = Y(c1);
                c4 = Math.min(c4, c5);
                c0 = Math.max(c0, c5);
                for (var c2 = 0; c2 < cZ.length; ++c2) {
                    if (cZ[c2].marker == this) {
                        cZ.splice(c2--, 1)
                    }
                }
            }
            if (c4 != Infinity) {
                aB.push({
                    from: c4,
                    to: c0 + 1
                })
            }
        });
        cX.prototype.find = function() {
            var c4, c5;
            for (var c1 = 0, c3 = this.set.length; c1 < c3; ++c1) {
                var c7 = this.set[c1],
                    c2 = c7.marked;
                for (var c0 = 0; c0 < c2.length; ++c0) {
                    var cZ = c2[c0];
                    if (cZ.marker == this) {
                        if (cZ.from != null || cZ.to != null) {
                            var c6 = Y(c7);
                            if (c6 != null) {
                                if (cZ.from != null) {
                                    c4 = {
                                        line: c6,
                                        ch: cZ.from
                                    }
                                }
                                if (cZ.to != null) {
                                    c5 = {
                                        line: c6,
                                        ch: cZ.to
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return {
                from: c4,
                to: c5
            }
        };

        function bE(c5, c4, c1) {
            c5 = aT(c5);
            c4 = aT(c4);
            var cZ = new cX();
            if (!Z(c5, c4)) {
                return cZ
            }

            function c3(c6, c9, c8, c7) {
                cF(c6).addMark(new K(c9, c8, c7, cZ))
            }
            if (c5.line == c4.line) {
                c3(c5.line, c5.ch, c4.ch, c1)
            } else {
                c3(c5.line, c5.ch, null, c1);
                for (var c0 = c5.line + 1, c2 = c4.line; c0 < c2; ++c0) {
                    c3(c0, null, null, c1)
                }
                c3(c4.line, null, c4.ch, c1)
            }
            aB.push({
                from: c5.line,
                to: c4.line + 1
            });
            return cZ
        }

        function aU(c0) {
            c0 = aT(c0);
            var cZ = new G(c0.ch);
            cF(c0.line).addMark(cZ);
            return cZ
        }

        function bo(c4) {
            c4 = aT(c4);
            var c3 = [],
                c1 = cF(c4.line).marked;
            if (!c1) {
                return c3
            }
            for (var c0 = 0, c2 = c1.length; c0 < c2; ++c0) {
                var cZ = c1[c0];
                if ((cZ.from == null || cZ.from <= c4.ch) && (cZ.to == null || cZ.to >= c4.ch)) {
                    c3.push(cZ.marker || cZ)
                }
            }
            return c3
        }

        function bV(cZ, c1, c0) {
            if (typeof cZ == "number") {
                cZ = cF(bZ(cZ))
            }
            cZ.gutterMarker = {
                text: c1,
                style: c0
            };
            aS = true;
            return cZ
        }

        function au(cZ) {
            if (typeof cZ == "number") {
                cZ = cF(bZ(cZ))
            }
            cZ.gutterMarker = null;
            aS = true
        }

        function aX(c0, c2) {
            var c1 = c0,
                cZ = c0;
            if (typeof c0 == "number") {
                cZ = cF(bZ(c0))
            } else {
                c1 = Y(c0)
            }
            if (c1 == null) {
                return null
            }
            if (c2(cZ, c1)) {
                aB.push({
                    from: c1,
                    to: c1 + 1
                })
            } else {
                return null
            }
            return cZ
        }

        function bl(c0, cZ, c1) {
            return aX(c0, function(c2) {
                if (c2.className != cZ || c2.bgClassName != c1) {
                    c2.className = cZ;
                    c2.bgClassName = c1;
                    return true
                }
            })
        }

        function cK(c0, cZ) {
            return aX(c0, function(c1, c4) {
                if (c1.hidden != cZ) {
                    c1.hidden = cZ;
                    a3(c1, cZ ? 0 : 1);
                    var c3 = cW.from.line,
                        c2 = cW.to.line;
                    if (cZ && (c3 == c4 || c2 == c4)) {
                        var c6 = c3 == c4 ? bR({
                            line: c3,
                            ch: 0
                        }, c3, 0) : cW.from;
                        var c5 = c2 == c4 ? bR({
                            line: c2,
                            ch: 0
                        }, c2, 0) : cW.to;
                        if (!c5) {
                            return
                        }
                        bw(c6, c5)
                    }
                    return (aS = true)
                }
            })
        }

        function aV(c0) {
            if (typeof c0 == "number") {
                if (!br(c0)) {
                    return null
                }
                var c1 = c0;
                c0 = cF(c0);
                if (!c0) {
                    return null
                }
            } else {
                var c1 = Y(c0);
                if (c1 == null) {
                    return null
                }
            }
            var cZ = c0.gutterMarker;
            return {
                line: c1,
                handle: c0,
                text: c0.text,
                markerText: cZ && cZ.text,
                markerClass: cZ && cZ.style,
                lineClass: c0.className,
                bgClass: c0.bgClassName
            }
        }

        function ct(cZ) {
            av.innerHTML = "<pre><span>x</span></pre>";
            av.firstChild.firstChild.firstChild.nodeValue = cZ;
            return av.firstChild.firstChild.offsetWidth || 10
        }

        function aG(db, c5) {
            if (c5 <= 0) {
                return 0
            }
            var c2 = cF(db),
                c8 = c2.text;

            function c9(dc) {
                return b5(c2, dc).left
            }
            var c6 = 0,
                c4 = 0,
                c7 = c8.length,
                c3;
            var c0 = Math.min(c7, Math.ceil(c5 / bh()));
            for (;;) {
                var c1 = c9(c0);
                if (c1 <= c5 && c0 < c7) {
                    c0 = Math.min(c7, Math.ceil(c0 * 1.2))
                } else {
                    c3 = c1;
                    c7 = c0;
                    break
                }
            }
            if (c5 > c3) {
                return c7
            }
            c0 = Math.floor(c7 * 0.8);
            c1 = c9(c0);
            if (c1 < c5) {
                c6 = c0;
                c4 = c1
            }
            for (;;) {
                if (c7 - c6 <= 1) {
                    return (c3 - c5 > c5 - c4) ? c6 : c7
                }
                var da = Math.ceil((c6 + c7) / 2),
                    cZ = c9(da);
                if (cZ > c5) {
                    c7 = da;
                    c3 = cZ
                } else {
                    c6 = da;
                    c4 = cZ
                }
            }
        }
        var cz = "CodeMirror-temp-" + Math.floor(Math.random() * 16777215).toString(16);

        function b5(c0, c3) {
            if (c3 == 0) {
                return {
                    top: 0,
                    left: 0
                }
            }
            var cZ = b1.lineWrapping && c3 < c0.text.length && o.test(c0.text.slice(c3 - 1, c3 + 1));
            av.innerHTML = "<pre>" + c0.getHTML(a9, c3, cz, cZ) + "</pre>";
            var c2 = document.getElementById(cz);
            var c5 = c2.offsetTop,
                c4 = c2.offsetLeft;
            if (I && c5 == 0 && c4 == 0) {
                var c1 = document.createElement("span");
                c1.innerHTML = "x";
                c2.parentNode.insertBefore(c1, c2.nextSibling);
                c5 = c1.offsetTop
            }
            return {
                top: c5,
                left: c4
            }
        }

        function cR(c4, c2) {
            var cZ, c0 = bP(),
                c3 = c0 * (g(cy, c4.line) - (c2 ? bd : 0));
            if (c4.ch == 0) {
                cZ = 0
            } else {
                var c1 = b5(cF(c4.line), c4.ch);
                cZ = c1.left;
                if (b1.lineWrapping) {
                    c3 += Math.max(0, c1.top)
                }
            }
            return {
                x: cZ,
                y: c3,
                yBot: c3 + c0
            }
        }

        function bH(c8, c7) {
            if (c7 < 0) {
                c7 = 0
            }
            var c5 = bP(),
                c3 = bh(),
                de = bd + Math.floor(c7 / c5);
            var c9 = X(cy, de);
            if (c9 >= cy.size) {
                return {
                    line: cy.size - 1,
                    ch: cF(cy.size - 1).text.length
                }
            }
            var c0 = cF(c9),
                db = c0.text;
            var dg = b1.lineWrapping,
                c6 = dg ? de - g(cy, c9) : 0;
            if (c8 <= 0 && c6 == 0) {
                return {
                    line: c9,
                    ch: 0
                }
            }

            function df(di) {
                var dj = b5(c0, di);
                if (dg) {
                    var dk = Math.round(dj.top / c5);
                    return Math.max(0, dj.left + (dk - c6) * bk.clientWidth)
                }
                return dj.left
            }
            var dd = 0,
                dc = 0,
                c1 = db.length,
                cZ;
            var da = Math.min(c1, Math.ceil((c8 + c6 * bk.clientWidth * 0.9) / c3));
            for (;;) {
                var c4 = df(da);
                if (c4 <= c8 && da < c1) {
                    da = Math.min(c1, Math.ceil(da * 1.2))
                } else {
                    cZ = c4;
                    c1 = da;
                    break
                }
            }
            if (c8 > cZ) {
                return {
                    line: c9,
                    ch: c1
                }
            }
            da = Math.floor(c1 * 0.8);
            c4 = df(da);
            if (c4 < c8) {
                dd = da;
                dc = c4
            }
            for (;;) {
                if (c1 - dd <= 1) {
                    return {
                        line: c9,
                        ch: (cZ - c8 > c8 - dc) ? dd : c1
                    }
                }
                var dh = Math.ceil((dd + c1) / 2),
                    c2 = df(dh);
                if (c2 > c8) {
                    c1 = dh;
                    cZ = c2
                } else {
                    dd = dh;
                    dc = c2
                }
            }
        }

        function ao(c1) {
            var cZ = cR(c1, true),
                c0 = ak(bu);
            return {
                x: c0.left + cZ.x,
                y: c0.top + cZ.y,
                yBot: c0.top + cZ.yBot
            }
        }
        var a0, ax, bU;

        function bP() {
            if (bU == null) {
                bU = "<pre>";
                for (var c0 = 0; c0 < 49; ++c0) {
                    bU += "x<br/>"
                }
                bU += "x</pre>"
            }
            var cZ = aq.clientHeight;
            if (cZ == ax) {
                return a0
            }
            ax = cZ;
            av.innerHTML = bU;
            a0 = av.firstChild.offsetHeight / 50 || 1;
            av.innerHTML = "";
            return a0
        }
        var cS, bv = 0;

        function bh() {
            if (bk.clientWidth == bv) {
                return cS
            }
            bv = bk.clientWidth;
            return (cS = ct("x"))
        }

        function cr() {
            return bu.offsetTop
        }

        function a5() {
            return bu.offsetLeft
        }

        function a2(c3, c2) {
            var c1 = ak(bk, true),
                cZ, c4;
            try {
                cZ = c3.clientX;
                c4 = c3.clientY
            } catch (c3) {
                return null
            }
            if (!c2 && (cZ - c1.left > bk.clientWidth || c4 - c1.top > bk.clientHeight)) {
                return null
            }
            var c0 = ak(bu, true);
            return bH(cZ - c0.left, c4 - c0.top)
        }

        function a1(c0) {
            var c5 = a2(c0),
                c4 = bk.scrollTop;
            if (!c5 || window.opera) {
                return
            }
            if (ad(cW.from, cW.to) || Z(c5, cW.from) || !Z(c5, cW.to)) {
                ar(a6)(c5.line, c5.ch)
            }
            var c3 = bm.style.cssText;
            bX.style.position = "absolute";
            bm.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (c0.clientY - 5) + "px; left: " + (c0.clientX - 5) + "px; z-index: 1000; background: white; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
            bf = true;
            var c2 = bm.value = b3();
            bz();
            a(bm);

            function cZ() {
                var c6 = A(bm.value).join("\n");
                if (c6 != c2) {
                    ar(bs)(c6, "end")
                }
                bX.style.position = "relative";
                bm.style.cssText = c3;
                if (B) {
                    bk.scrollTop = c4
                }
                bf = false;
                cC(true);
                am()
            }
            if (N) {
                w(c0);
                var c1 = r(window, "mouseup", function() {
                    c1();
                    setTimeout(cZ, 20)
                }, true)
            } else {
                setTimeout(cZ, 50)
            }
        }

        function cM() {
            clearInterval(cP);
            var cZ = true;
            bc.style.visibility = "";
            cP = setInterval(function() {
                bc.style.visibility = (cZ = !cZ) ? "" : "hidden"
            }, 650)
        }
        var bp = {
            "(": ")>",
            ")": "(<",
            "[": "]>",
            "]": "[<",
            "{": "}>",
            "}": "{<"
        };

        function ce(c5) {
            var cZ = cW.inverted ? cW.from : cW.to,
                c7 = cF(cZ.line),
                c0 = cZ.ch - 1;
            var c4 = (c0 >= 0 && bp[c7.text.charAt(c0)]) || bp[c7.text.charAt(++c0)];
            if (!c4) {
                return
            }
            var c8 = c4.charAt(0),
                c6 = c4.charAt(1) == ">",
                di = c6 ? 1 : -1,
                dd = c7.styles;
            for (var dj = c0 + 1, df = 0, dh = dd.length; df < dh; df += 2) {
                if ((dj -= dd[df].length) <= 0) {
                    var dg = dd[df + 1];
                    break
                }
            }
            var c2 = [c7.text.charAt(c0)],
                dc = /[(){}[\]]/;

            function da(dw, dr, ds) {
                if (!dw.text) {
                    return
                }
                var dv = dw.styles,
                    dq = c6 ? 0 : dw.text.length - 1,
                    dt;
                for (var dm = c6 ? 0 : dv.length - 2, dp = c6 ? dv.length : -2; dm != dp; dm += 2 * di) {
                    var du = dv[dm];
                    if (dv[dm + 1] != null && dv[dm + 1] != dg) {
                        dq += di * du.length;
                        continue
                    }
                    for (var dl = c6 ? 0 : du.length - 1, dk = c6 ? du.length : -1; dl != dk; dl += di, dq += di) {
                        if (dq >= dr && dq < ds && dc.test(dt = du.charAt(dl))) {
                            var dn = bp[dt];
                            if (dn.charAt(1) == ">" == c6) {
                                c2.push(dt)
                            } else {
                                if (c2.pop() != dn.charAt(0)) {
                                    return {
                                        pos: dq,
                                        match: false
                                    }
                                } else {
                                    if (!c2.length) {
                                        return {
                                            pos: dq,
                                            match: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for (var df = cZ.line, dh = c6 ? Math.min(df + 100, cy.size) : Math.max(-1, df - 100); df != dh; df += di) {
                var c7 = cF(df),
                    c3 = df == cZ.line;
                var c9 = da(c7, c3 && c6 ? c0 + 1 : 0, c3 && !c6 ? c0 : c7.text.length);
                if (c9) {
                    break
                }
            }
            if (!c9) {
                c9 = {
                    pos: null,
                    match: false
                }
            }
            var dg = c9.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
            var de = bE({
                    line: cZ.line,
                    ch: c0
                }, {
                    line: cZ.line,
                    ch: c0 + 1
                }, dg),
                c1 = c9.pos != null && bE({
                    line: df,
                    ch: c9.pos
                }, {
                    line: df,
                    ch: c9.pos + 1
                }, dg);
            var db = ar(function() {
                de.clear();
                c1 && c1.clear()
            });
            if (c5) {
                setTimeout(db, 800)
            } else {
                b4 = db
            }
        }

        function a7(c5) {
            var c4, c1;
            for (var c0 = c5, c2 = c5 - 40; c0 > c2; --c0) {
                if (c0 == 0) {
                    return 0
                }
                var cZ = cF(c0 - 1);
                if (cZ.stateAfter) {
                    return c0
                }
                var c3 = cZ.indentation(b1.tabSize);
                if (c1 == null || c4 > c3) {
                    c1 = c0 - 1;
                    c4 = c3
                }
            }
            return c1
        }

        function cu(c1) {
            var c0 = a7(c1),
                cZ = c0 && cF(c0 - 1).stateAfter;
            if (!cZ) {
                cZ = V(cb)
            } else {
                cZ = p(cb, cZ)
            }
            cy.iter(c0, c1, function(c2) {
                c2.highlight(cb, cZ, b1.tabSize);
                c2.stateAfter = p(cb, cZ)
            });
            if (c0 < c1) {
                aB.push({
                    from: c0,
                    to: c1
                })
            }
            if (c1 < cy.size && !cF(c1).stateAfter) {
                ch.push(c1)
            }
            return cZ
        }

        function cH(c1, cZ) {
            var c0 = cu(c1);
            cy.iter(c1, cZ, function(c2) {
                c2.highlight(cb, c0, b1.tabSize);
                c2.stateAfter = p(cb, c0)
            })
        }

        function bS() {
            var c5 = +new Date + b1.workTime;
            var c8 = ch.length;
            while (ch.length) {
                if (!cF(cQ).stateAfter) {
                    var c2 = cQ
                } else {
                    var c2 = ch.pop()
                }
                if (c2 >= cy.size) {
                    continue
                }
                var c0 = a7(c2),
                    cZ = c0 && cF(c0 - 1).stateAfter;
                if (cZ) {
                    cZ = p(cb, cZ)
                } else {
                    cZ = V(cb)
                }
                var c4 = 0,
                    c1 = cb.compareStates,
                    c7 = false,
                    c6 = c0,
                    c3 = false;
                cy.iter(c6, cy.size, function(da) {
                    var db = da.stateAfter;
                    if (+new Date > c5) {
                        ch.push(c6);
                        bG(b1.workDelay);
                        if (c7) {
                            aB.push({
                                from: c2,
                                to: c6 + 1
                            })
                        }
                        return (c3 = true)
                    }
                    var dc = da.highlight(cb, cZ, b1.tabSize);
                    if (dc) {
                        c7 = true
                    }
                    da.stateAfter = p(cb, cZ);
                    var c9 = null;
                    if (c1) {
                        var dd = db && c1(db, cZ);
                        if (dd != ab) {
                            c9 = !!dd
                        }
                    }
                    if (c9 == null) {
                        if (dc !== false || !db) {
                            c4 = 0
                        } else {
                            if (++c4 > 3 && (!cb.indent || cb.indent(db, "") == cb.indent(cZ, ""))) {
                                c9 = true
                            }
                        }
                    }
                    if (c9) {
                        return true
                    }++c6
                });
                if (c3) {
                    return
                }
                if (c7) {
                    aB.push({
                        from: c2,
                        to: c6 + 1
                    })
                }
            }
            if (c8 && b1.onHighlightComplete) {
                b1.onHighlightComplete(b9)
            }
        }

        function bG(cZ) {
            if (!ch.length) {
                return
            }
            aw.set(cZ, ar(bS))
        }

        function aN() {
            cp = b6 = cN = null;
            aB = [];
            aP = false;
            cA = []
        }

        function ay() {
            var c3 = false,
                c0;
            if (aP) {
                c3 = !cf()
            }
            if (aB.length) {
                c0 = cd(aB, true)
            } else {
                if (aP) {
                    cV()
                }
                if (aS) {
                    aL()
                }
            }
            if (c3) {
                cf()
            }
            if (aP) {
                cY();
                cM()
            }
            if (cj && !bf && (cp === true || (cp !== false && aP))) {
                cC(b6)
            }
            if (aP && b1.matchBrackets) {
                setTimeout(ar(function() {
                    if (b4) {
                        b4();
                        b4 = null
                    }
                    if (ad(cW.from, cW.to)) {
                        ce(false)
                    }
                }), 20)
            }
            var cZ = cN,
                c1 = cA;
            if (aP && b1.onCursorActivity) {
                b1.onCursorActivity(b9)
            }
            if (cZ && b1.onChange && b9) {
                b1.onChange(b9, cZ)
            }
            for (var c2 = 0; c2 < c1.length; ++c2) {
                c1[c2](b9)
            }
            if (c0 && b1.onUpdate) {
                b1.onUpdate(b9)
            }
        }
        var cq = 0;

        function ar(cZ) {
            return function() {
                if (!cq++) {
                    aN()
                }
                try {
                    var c0 = cZ.apply(this, arguments)
                } finally {
                    if (!--cq) {
                        ay()
                    }
                }
                return c0
            }
        }

        function bO(cZ) {
            a8.startCompound();
            try {
                return cZ()
            } finally {
                a8.endCompound()
            }
        }
        for (var bJ in ac) {
            if (ac.propertyIsEnumerable(bJ) && !b9.propertyIsEnumerable(bJ)) {
                b9[bJ] = ac[bJ]
            }
        }
        return b9
    }
    u.defaults = {
        value: "",
        mode: null,
        theme: "default",
        indentUnit: 2,
        indentWithTabs: false,
        smartIndent: true,
        tabSize: 4,
        keyMap: "default",
        extraKeys: null,
        electricChars: true,
        autoClearEmptyLines: false,
        onKeyEvent: null,
        onDragEvent: null,
        lineWrapping: false,
        lineNumbers: false,
        gutter: false,
        fixedGutter: false,
        firstLineNumber: 1,
        readOnly: false,
        dragDrop: true,
        onChange: null,
        onCursorActivity: null,
        onGutterClick: null,
        onHighlightComplete: null,
        onUpdate: null,
        onFocus: null,
        onBlur: null,
        onScroll: null,
        matchBrackets: false,
        workTime: 100,
        workDelay: 200,
        pollInterval: 100,
        undoDepth: 40,
        tabindex: null,
        autofocus: null
    };
    var s = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
    var M = s || /Mac/.test(navigator.platform);
    var U = /Win/.test(navigator.platform);
    var aj = u.modes = {},
        S = u.mimeModes = {};
    u.defineMode = function(am, ao) {
        if (!u.defaults.mode && am != "null") {
            u.defaults.mode = am
        }
        if (arguments.length > 2) {
            ao.dependencies = [];
            for (var an = 2; an < arguments.length; ++an) {
                ao.dependencies.push(arguments[an])
            }
        }
        aj[am] = ao
    };
    u.defineMIME = function(an, am) {
        S[an] = am
    };
    u.resolveMode = function(am) {
        if (typeof am == "string" && S.hasOwnProperty(am)) {
            am = S[am]
        } else {
            if (typeof am == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(am)) {
                return u.resolveMode("application/xml")
            }
        }
        if (typeof am == "string") {
            return {
                name: am
            }
        } else {
            return am || {
                name: "null"
            }
        }
    };
    u.getMode = function(an, am) {
        var am = u.resolveMode(am);
        var ao = aj[am.name];
        if (!ao) {
            return u.getMode(an, "text/plain")
        }
        return ao(an, am)
    };
    u.listModes = function() {
        var an = [];
        for (var am in aj) {
            if (aj.propertyIsEnumerable(am)) {
                an.push(am)
            }
        }
        return an
    };
    u.listMIMEs = function() {
        var an = [];
        for (var am in S) {
            if (S.propertyIsEnumerable(am)) {
                an.push({
                    mime: am,
                    mode: S[am]
                })
            }
        }
        return an
    };
    var ac = u.extensions = {};
    u.defineExtension = function(am, an) {
        ac[am] = an
    };
    var L = u.commands = {
        selectAll: function(am) {
            am.setSelection({
                line: 0,
                ch: 0
            }, {
                line: am.lineCount() - 1
            })
        },
        killLine: function(am) {
            var ap = am.getCursor(true),
                ao = am.getCursor(false),
                an = !ad(ap, ao);
            if (!an && am.getLine(ap.line).length == ap.ch) {
                am.replaceRange("", ap, {
                    line: ap.line + 1,
                    ch: 0
                })
            } else {
                am.replaceRange("", ap, an ? ao : {
                    line: ap.line
                })
            }
        },
        deleteLine: function(am) {
            var an = am.getCursor().line;
            am.replaceRange("", {
                line: an,
                ch: 0
            }, {
                line: an
            })
        },
        undo: function(am) {
            am.undo()
        },
        redo: function(am) {
            am.redo()
        },
        goDocStart: function(am) {
            am.setCursor(0, 0, true)
        },
        goDocEnd: function(am) {
            am.setSelection({
                line: am.lineCount() - 1
            }, null, true)
        },
        goLineStart: function(am) {
            am.setCursor(am.getCursor().line, 0, true)
        },
        goLineStartSmart: function(am) {
            var ap = am.getCursor();
            var ao = am.getLine(ap.line),
                an = Math.max(0, ao.search(/\S/));
            am.setCursor(ap.line, ap.ch <= an && ap.ch ? 0 : an, true)
        },
        goLineEnd: function(am) {
            am.setSelection({
                line: am.getCursor().line
            }, null, true)
        },
        goLineUp: function(am) {
            am.moveV(-1, "line")
        },
        goLineDown: function(am) {
            am.moveV(1, "line")
        },
        goPageUp: function(am) {
            am.moveV(-1, "page")
        },
        goPageDown: function(am) {
            am.moveV(1, "page")
        },
        goCharLeft: function(am) {
            am.moveH(-1, "char")
        },
        goCharRight: function(am) {
            am.moveH(1, "char")
        },
        goColumnLeft: function(am) {
            am.moveH(-1, "column")
        },
        goColumnRight: function(am) {
            am.moveH(1, "column")
        },
        goWordLeft: function(am) {
            am.moveH(-1, "word")
        },
        goWordRight: function(am) {
            am.moveH(1, "word")
        },
        delCharLeft: function(am) {
            am.deleteH(-1, "char")
        },
        delCharRight: function(am) {
            am.deleteH(1, "char")
        },
        delWordLeft: function(am) {
            am.deleteH(-1, "word")
        },
        delWordRight: function(am) {
            am.deleteH(1, "word")
        },
        indentAuto: function(am) {
            am.indentSelection("smart")
        },
        indentMore: function(am) {
            am.indentSelection("add")
        },
        indentLess: function(am) {
            am.indentSelection("subtract")
        },
        insertTab: function(am) {
            am.replaceSelection("\t", "end")
        },
        transposeChars: function(am) {
            var ao = am.getCursor(),
                an = am.getLine(ao.line);
            if (ao.ch > 0 && ao.ch < an.length - 1) {
                am.replaceRange(an.charAt(ao.ch) + an.charAt(ao.ch - 1), {
                    line: ao.line,
                    ch: ao.ch - 1
                }, {
                    line: ao.line,
                    ch: ao.ch + 1
                })
            }
        },
        newlineAndIndent: function(am) {
            am.replaceSelection("\n", "end");
            am.indentLine(am.getCursor().line)
        },
        toggleOverwrite: function(am) {
            am.toggleOverwrite()
        }
    };
    var v = u.keyMap = {};
    v.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharRight",
        Backspace: "delCharLeft",
        Tab: "insertTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    };
    v.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goWordLeft",
        "Ctrl-Right": "goWordRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delWordLeft",
        "Ctrl-Delete": "delWordRight",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    };
    v.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goWordLeft",
        "Alt-Right": "goWordRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-Alt-Backspace": "delWordRight",
        "Alt-Delete": "delWordRight",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        fallthrough: ["basic", "emacsy"]
    };
    v["default"] = M ? v.macDefault : v.pcDefault;
    v.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageUp",
        "Shift-Ctrl-V": "goPageDown",
        "Ctrl-D": "delCharRight",
        "Ctrl-H": "delCharLeft",
        "Alt-D": "delWordRight",
        "Alt-Backspace": "delWordLeft",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    };

    function c(am) {
        if (typeof am == "string") {
            return v[am]
        } else {
            return am
        }
    }

    function l(an, am, ar, ap, ao) {
        function aq(ax) {
            ax = c(ax);
            var av = ax[an];
            if (av != null && ap(av)) {
                return true
            }
            if (ax.nofallthrough) {
                if (ao) {
                    ao()
                }
                return true
            }
            var au = ax.fallthrough;
            if (au == null) {
                return false
            }
            if (Object.prototype.toString.call(au) != "[object Array]") {
                return aq(au)
            }
            for (var at = 0, aw = au.length; at < aw; ++at) {
                if (aq(au[at])) {
                    return true
                }
            }
            return false
        }
        if (am && aq(am)) {
            return true
        }
        return aq(ar)
    }

    function Q(an) {
        var am = R[y(an, "keyCode")];
        return am == "Ctrl" || am == "Alt" || am == "Shift" || am == "Mod"
    }
    u.fromTextArea = function(an, ap) {
        if (!ap) {
            ap = {}
        }
        ap.value = an.value;
        if (!ap.tabindex && an.tabindex) {
            ap.tabindex = an.tabindex
        }
        if (ap.autofocus == null && an.getAttribute("autofocus") != null) {
            ap.autofocus = true
        }

        function ar() {
            an.value = am.getValue()
        }
        if (an.form) {
            var aq = r(an.form, "submit", ar, true);
            if (typeof an.form.submit == "function") {
                var ao = an.form.submit;

                function at() {
                    ar();
                    an.form.submit = ao;
                    an.form.submit();
                    an.form.submit = at
                }
                an.form.submit = at
            }
        }
        an.style.display = "none";
        var am = u(function(au) {
            an.parentNode.insertBefore(au, an.nextSibling)
        }, ap);
        am.save = ar;
        am.getTextArea = function() {
            return an
        };
        am.toTextArea = function() {
            ar();
            an.parentNode.removeChild(am.getWrapperElement());
            an.style.display = "";
            if (an.form) {
                aq();
                if (typeof an.form.submit == "function") {
                    an.form.submit = ao
                }
            }
        };
        return am
    };

    function p(ap, am) {
        if (am === true) {
            return am
        }
        if (ap.copyState) {
            return ap.copyState(am)
        }
        var ao = {};
        for (var aq in am) {
            var an = am[aq];
            if (an instanceof Array) {
                an = an.concat([])
            }
            ao[aq] = an
        }
        return ao
    }
    u.copyState = p;

    function V(ao, an, am) {
        return ao.startState ? ao.startState(an, am) : true
    }
    u.startState = V;

    function b(am, an) {
        this.pos = this.start = 0;
        this.string = am;
        this.tabSize = an || 8
    }
    b.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return this.pos == 0
        },
        peek: function() {
            return this.string.charAt(this.pos)
        },
        next: function() {
            if (this.pos < this.string.length) {
                return this.string.charAt(this.pos++)
            }
        },
        eat: function(am) {
            var ao = this.string.charAt(this.pos);
            if (typeof am == "string") {
                var an = ao == am
            } else {
                var an = ao && (am.test ? am.test(ao) : am(ao))
            }
            if (an) {
                ++this.pos;
                return ao
            }
        },
        eatWhile: function(am) {
            var an = this.pos;
            while (this.eat(am)) {}
            return this.pos > an
        },
        eatSpace: function() {
            var am = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
                ++this.pos
            }
            return this.pos > am
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(am) {
            var an = this.string.indexOf(am, this.pos);
            if (an > -1) {
                this.pos = an;
                return true
            }
        },
        backUp: function(am) {
            this.pos -= am
        },
        column: function() {
            return n(this.string, this.start, this.tabSize)
        },
        indentation: function() {
            return n(this.string, null, this.tabSize)
        },
        match: function(ap, an, am) {
            if (typeof ap == "string") {
                function aq(ar) {
                    return am ? ar.toLowerCase() : ar
                }
                if (aq(this.string).indexOf(aq(ap), this.pos) == this.pos) {
                    if (an !== false) {
                        this.pos += ap.length
                    }
                    return true
                }
            } else {
                var ao = this.string.slice(this.pos).match(ap);
                if (ao && an !== false) {
                    this.pos += ao[0].length
                }
                return ao
            }
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        }
    };
    u.StringStream = b;

    function K(ap, ao, an, am) {
        this.from = ap;
        this.to = ao;
        this.style = an;
        this.marker = am
    }
    K.prototype = {
        attach: function(am) {
            this.marker.set.push(am)
        },
        detach: function(an) {
            var am = q(this.marker.set, an);
            if (am > -1) {
                this.marker.set.splice(am, 1)
            }
        },
        split: function(ap, am) {
            if (this.to <= ap && this.to != null) {
                return null
            }
            var ao = this.from < ap || this.from == null ? null : this.from - ap + am;
            var an = this.to == null ? null : this.to - ap + am;
            return new K(ao, an, this.style, this.marker)
        },
        dup: function() {
            return new K(null, null, this.style, this.marker)
        },
        clipTo: function(an, aq, am, ap, ao) {
            if (an && ap > this.from && (ap < this.to || this.to == null)) {
                this.from = null
            } else {
                if (this.from != null && this.from >= aq) {
                    this.from = Math.max(ap, this.from) + ao
                }
            }
            if (am && (aq < this.to || this.to == null) && (aq > this.from || this.from == null)) {
                this.to = null
            } else {
                if (this.to != null && this.to > aq) {
                    this.to = ap < this.to ? this.to + ao : aq
                }
            }
        },
        isDead: function() {
            return this.from != null && this.to != null && this.from >= this.to
        },
        sameSet: function(am) {
            return this.marker == am.marker
        }
    };

    function G(am) {
        this.from = am;
        this.to = am;
        this.line = null
    }
    G.prototype = {
        attach: function(am) {
            this.line = am
        },
        detach: function(am) {
            if (this.line == am) {
                this.line = null
            }
        },
        split: function(an, am) {
            if (an < this.from) {
                this.from = this.to = (this.from - an) + am;
                return this
            }
        },
        isDead: function() {
            return this.from > this.to
        },
        clipTo: function(an, aq, am, ap, ao) {
            if ((an || aq < this.from) && (am || ap > this.to)) {
                this.from = 0;
                this.to = -1
            } else {
                if (this.from > aq) {
                    this.from = this.to = Math.max(ap, this.from) + ao
                }
            }
        },
        sameSet: function(am) {
            return false
        },
        find: function() {
            if (!this.line || !this.line.parent) {
                return null
            }
            return {
                line: Y(this.line),
                ch: this.from
            }
        },
        clear: function() {
            if (this.line) {
                var am = q(this.line.marked, this);
                if (am != -1) {
                    this.line.marked.splice(am, 1)
                }
                this.line = null
            }
        }
    };

    function e(an, am) {
        this.styles = am || [an, null];
        this.text = an;
        this.height = 1;
        this.marked = this.gutterMarker = this.className = this.bgClassName = this.handlers = null;
        this.stateAfter = this.parent = this.hidden = null
    }
    e.inheritMarks = function(aq, au) {
        var ap = new e(aq),
            am = au && au.marked;
        if (am) {
            for (var ao = 0; ao < am.length; ++ao) {
                if (am[ao].to == null && am[ao].style) {
                    var an = ap.marked || (ap.marked = []),
                        at = am[ao];
                    var ar = at.dup();
                    an.push(ar);
                    ar.attach(ap)
                }
            }
        }
        return ap
    };
    e.prototype = {
        replace: function(aq, ap, au) {
            var av = [],
                ao = this.marked,
                ar = ap == null ? this.text.length : ap;
            al(0, aq, this.styles, av);
            if (au) {
                av.push(au, null)
            }
            al(ar, this.text.length, this.styles, av);
            this.styles = av;
            this.text = this.text.slice(0, aq) + au + this.text.slice(ar);
            this.stateAfter = null;
            if (ao) {
                var at = au.length - (ar - aq);
                for (var an = 0; an < ao.length; ++an) {
                    var am = ao[an];
                    am.clipTo(aq == null, aq || 0, ap == null, ar, at);
                    if (am.isDead()) {
                        am.detach(this);
                        ao.splice(an--, 1)
                    }
                }
            }
        },
        split: function(au, ar) {
            var ap = [ar, null],
                an = this.marked;
            al(au, this.text.length, this.styles, ap);
            var ao = new e(ar + this.text.slice(au), ap);
            if (an) {
                for (var aq = 0; aq < an.length; ++aq) {
                    var at = an[aq];
                    var am = at.split(au, ar.length);
                    if (am) {
                        if (!ao.marked) {
                            ao.marked = []
                        }
                        ao.marked.push(am);
                        am.attach(ao);
                        if (am == at) {
                            an.splice(aq--, 1)
                        }
                    }
                }
            }
            return ao
        },
        append: function(an) {
            var at = this.text.length,
                am = an.marked,
                aq = this.marked;
            this.text += an.text;
            al(0, an.text.length, an.styles, this.styles);
            if (aq) {
                for (var ar = 0; ar < aq.length; ++ar) {
                    if (aq[ar].to == null) {
                        aq[ar].to = at
                    }
                }
            }
            if (am && am.length) {
                if (!aq) {
                    this.marked = aq = []
                }
                outer: for (var ar = 0; ar < am.length; ++ar) {
                    var au = am[ar];
                    if (!au.from) {
                        for (var ap = 0; ap < aq.length; ++ap) {
                            var ao = aq[ap];
                            if (ao.to == at && ao.sameSet(au)) {
                                ao.to = au.to == null ? null : au.to + at;
                                if (ao.isDead()) {
                                    ao.detach(this);
                                    am.splice(ar--, 1)
                                }
                                continue outer
                            }
                        }
                    }
                    aq.push(au);
                    au.attach(this);
                    au.from += at;
                    if (au.to != null) {
                        au.to += at
                    }
                }
            }
        },
        fixMarkEnds: function(an) {
            var am = this.marked,
                aq = an.marked;
            if (!am) {
                return
            }
            for (var ap = 0; ap < am.length; ++ap) {
                var at = am[ap],
                    ar = at.to == null;
                if (ar && aq) {
                    for (var ao = 0; ao < aq.length; ++ao) {
                        if (aq[ao].sameSet(at)) {
                            ar = false;
                            break
                        }
                    }
                }
                if (ar) {
                    at.to = this.text.length
                }
            }
        },
        fixMarkStarts: function() {
            var am = this.marked;
            if (!am) {
                return
            }
            for (var an = 0; an < am.length; ++an) {
                if (am[an].from == null) {
                    am[an].from = 0
                }
            }
        },
        addMark: function(am) {
            am.attach(this);
            if (this.marked == null) {
                this.marked = []
            }
            this.marked.push(am);
            this.marked.sort(function(ao, an) {
                return (ao.from || 0) - (an.from || 0)
            })
        },
        highlight: function(ar, an, at) {
            var aw = new b(this.text, at),
                ax = this.styles,
                au = 0;
            var aq = false,
                ao = ax[0],
                av;
            if (this.text == "" && ar.blankLine) {
                ar.blankLine(an)
            }
            while (!aw.eol()) {
                var am = ar.token(aw, an);
                var ap = this.text.slice(aw.start, aw.pos);
                aw.start = aw.pos;
                if (au && ax[au - 1] == am) {
                    ax[au - 2] += ap
                } else {
                    if (ap) {
                        if (!aq && (ax[au + 1] != am || (au && ax[au - 2] != av))) {
                            aq = true
                        }
                        ax[au++] = ap;
                        ax[au++] = am;
                        av = ao;
                        ao = ax[au]
                    }
                }
                if (aw.pos > 5000) {
                    ax[au++] = this.text.slice(aw.pos);
                    ax[au++] = null;
                    break
                }
            }
            if (ax.length != au) {
                ax.length = au;
                aq = true
            }
            if (au && ax[au - 2] != av) {
                aq = true
            }
            return aq || (ax.length < 5 && this.text.length < 10 ? null : false)
        },
        getTokenAt: function(ar, ap, ao) {
            var am = this.text,
                aq = new b(am);
            while (aq.pos < ao && !aq.eol()) {
                aq.start = aq.pos;
                var an = ar.token(aq, ap)
            }
            return {
                start: aq.start,
                end: aq.pos,
                string: aq.current(),
                className: an || null,
                state: ap
            }
        },
        indentation: function(am) {
            return n(this.text, null, am)
        },
        getHTML: function(aM, am, ao, aq) {
            var ax = [],
                av = true,
                at = 0;

            function aI(aY, aW) {
                if (!aY) {
                    return
                }
                if (av && I && aY.charAt(0) == " ") {
                    aY = "\u00a0" + aY.slice(1)
                }
                av = false;
                if (aY.indexOf("\t") == -1) {
                    at += aY.length;
                    var aX = P(aY)
                } else {
                    var aX = "";
                    for (var aZ = 0;;) {
                        var aU = aY.indexOf("\t", aZ);
                        if (aU == -1) {
                            aX += P(aY.slice(aZ));
                            at += aY.length - aZ;
                            break
                        } else {
                            at += aU - aZ;
                            var aV = aM(at);
                            aX += P(aY.slice(aZ, aU)) + aV.html;
                            at += aV.width;
                            aZ = aU + 1
                        }
                    }
                }
                if (aW) {
                    ax.push('<span class="', aW, '">', aX, "</span>")
                } else {
                    ax.push(aX)
                }
            }
            var aL = aI;
            if (am != null) {
                var aG = 0,
                    aB = '<span id="' + ao + '">';
                aL = function(aW, aV) {
                    var aU = aW.length;
                    if (am >= aG && am < aG + aU) {
                        if (am > aG) {
                            aI(aW.slice(0, am - aG), aV);
                            if (aq) {
                                ax.push("<wbr>")
                            }
                        }
                        ax.push(aB);
                        aI(aW.slice(am - aG), aV);
                        ax.push("</span>");
                        am--;
                        aG += aU
                    } else {
                        aG += aU;
                        aI(aW, aV);
                        if (aG == am && aG == aQ) {
                            ax.push(aB + "</span>")
                        } else {
                            if (aG > am + 10 && /\s/.test(aW)) {
                                aL = function() {}
                            }
                        }
                    }
                }
            }
            var aF = this.styles,
                aw = this.text,
                aC = this.marked;
            var aQ = aw.length;

            function ar(aU) {
                if (!aU) {
                    return null
                }
                return "cm-" + aU.replace(/ +/g, " cm-")
            }
            if (!aw && am == null) {
                aL(" ")
            } else {
                if (!aC || !aC.length) {
                    for (var aN = 0, ay = 0; ay < aQ; aN += 2) {
                        var aE = aF[aN],
                            aP = aF[aN + 1],
                            aH = aE.length;
                        if (ay + aH > aQ) {
                            aE = aE.slice(0, aQ - ay)
                        }
                        ay += aH;
                        aL(aE, ar(aP))
                    }
                } else {
                    var au = 0,
                        aN = 0,
                        aA = "",
                        aP, aT = 0;
                    var aS = aC[0].from || 0,
                        aK = [],
                        aR = 0;

                    function aO() {
                        var aU;
                        while (aR < aC.length && ((aU = aC[aR]).from == au || aU.from == null)) {
                            if (aU.style != null) {
                                aK.push(aU)
                            }++aR
                        }
                        aS = aR < aC.length ? aC[aR].from : Infinity;
                        for (var aV = 0; aV < aK.length; ++aV) {
                            var aW = aK[aV].to || Infinity;
                            if (aW == au) {
                                aK.splice(aV--, 1)
                            } else {
                                aS = Math.min(aW, aS)
                            }
                        }
                    }
                    var aD = 0;
                    while (au < aQ) {
                        if (aS == au) {
                            aO()
                        }
                        var az = Math.min(aQ, aS);
                        while (true) {
                            if (aA) {
                                var ap = au + aA.length;
                                var an = aP;
                                for (var aJ = 0; aJ < aK.length; ++aJ) {
                                    an = (an ? an + " " : "") + aK[aJ].style
                                }
                                aL(ap > az ? aA.slice(0, az - au) : aA, an);
                                if (ap >= az) {
                                    aA = aA.slice(az - au);
                                    au = az;
                                    break
                                }
                                au = ap
                            }
                            aA = aF[aN++];
                            aP = ar(aF[aN++])
                        }
                    }
                }
            }
            return ax.join("")
        },
        cleanUp: function() {
            this.parent = null;
            if (this.marked) {
                for (var am = 0, an = this.marked.length; am < an; ++am) {
                    this.marked[am].detach(this)
                }
            }
        }
    };

    function al(at, au, am, av) {
        for (var aq = 0, ar = 0, an = 0; ar < au; aq += 2) {
            var ao = am[aq],
                ap = ar + ao.length;
            if (an == 0) {
                if (ap > at) {
                    av.push(ao.slice(at - ar, Math.min(ao.length, au - ar)), am[aq + 1])
                }
                if (ap >= at) {
                    an = 1
                }
            } else {
                if (an == 1) {
                    if (ap > au) {
                        av.push(ao.slice(0, au - ar), am[aq + 1])
                    } else {
                        av.push(ao, am[aq + 1])
                    }
                }
            }
            ar = ap
        }
    }

    function ah(an) {
        this.lines = an;
        this.parent = null;
        for (var ao = 0, ap = an.length, am = 0; ao < ap; ++ao) {
            an[ao].parent = this;
            am += an[ao].height
        }
        this.height = am
    }
    ah.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        remove: function(am, au, aq) {
            for (var ap = am, ar = am + au; ap < ar; ++ap) {
                var an = this.lines[ap];
                this.height -= an.height;
                an.cleanUp();
                if (an.handlers) {
                    for (var ao = 0; ao < an.handlers.length; ++ao) {
                        aq.push(an.handlers[ao])
                    }
                }
            }
            this.lines.splice(am, au)
        },
        collapse: function(am) {
            am.splice.apply(am, [am.length, 0].concat(this.lines))
        },
        insertHeight: function(an, ao, am) {
            this.height += am;
            if (I) {
                this.lines = this.lines.slice(0, an).concat(ao).concat(this.lines.slice(an))
            } else {
                this.lines.splice.apply(this.lines, [an, 0].concat(ao))
            }
            for (var ap = 0, aq = ao.length; ap < aq; ++ap) {
                ao[ap].parent = this
            }
        },
        iterN: function(am, ap, ao) {
            for (var an = am + ap; am < an; ++am) {
                if (ao(this.lines[am])) {
                    return true
                }
            }
        }
    };

    function i(ap) {
        this.children = ap;
        var ao = 0,
            am = 0;
        for (var an = 0, ar = ap.length; an < ar; ++an) {
            var aq = ap[an];
            ao += aq.chunkSize();
            am += aq.height;
            aq.parent = this
        }
        this.size = ao;
        this.height = am;
        this.parent = null
    }
    i.prototype = {
        chunkSize: function() {
            return this.size
        },
        remove: function(ao, an, ar) {
            this.size -= an;
            for (var ap = 0; ap < this.children.length; ++ap) {
                var am = this.children[ap],
                    au = am.chunkSize();
                if (ao < au) {
                    var aq = Math.min(an, au - ao),
                        av = am.height;
                    am.remove(ao, aq, ar);
                    this.height -= av - am.height;
                    if (au == aq) {
                        this.children.splice(ap--, 1);
                        am.parent = null
                    }
                    if ((an -= aq) == 0) {
                        break
                    }
                    ao = 0
                } else {
                    ao -= au
                }
            }
            if (this.size - an < 25) {
                var aw = [];
                this.collapse(aw);
                this.children = [new ah(aw)];
                this.children[0].parent = this
            }
        },
        collapse: function(am) {
            for (var an = 0, ao = this.children.length; an < ao; ++an) {
                this.children[an].collapse(am)
            }
        },
        insert: function(an, ao) {
            var am = 0;
            for (var ap = 0, aq = ao.length; ap < aq; ++ap) {
                am += ao[ap].height
            }
            this.insertHeight(an, ao, am)
        },
        insertHeight: function(an, aw, av) {
            this.size += aw.length;
            this.height += av;
            for (var ao = 0, aq = this.children.length; ao < aq; ++ao) {
                var am = this.children[ao],
                    ar = am.chunkSize();
                if (an <= ar) {
                    am.insertHeight(an, aw, av);
                    if (am.lines && am.lines.length > 50) {
                        while (am.lines.length > 50) {
                            var ap = am.lines.splice(am.lines.length - 25, 25);
                            var au = new ah(ap);
                            am.height -= au.height;
                            this.children.splice(ao + 1, 0, au);
                            au.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                an -= ar
            }
        },
        maybeSpill: function() {
            if (this.children.length <= 10) {
                return
            }
            var ap = this;
            do {
                var an = ap.children.splice(ap.children.length - 5, 5);
                var ao = new i(an);
                if (!ap.parent) {
                    var aq = new i(ap.children);
                    aq.parent = ap;
                    ap.children = [aq, ao];
                    ap = aq
                } else {
                    ap.size -= ao.size;
                    ap.height -= ao.height;
                    var am = q(ap.parent.children, ap);
                    ap.parent.children.splice(am + 1, 0, ao)
                }
                ao.parent = ap.parent
            } while (ap.children.length > 10);
            ap.parent.maybeSpill()
        },
        iter: function(ao, an, am) {
            this.iterN(ao, an - ao, am)
        },
        iterN: function(am, av, au) {
            for (var an = 0, aq = this.children.length; an < aq; ++an) {
                var ar = this.children[an],
                    ap = ar.chunkSize();
                if (am < ap) {
                    var ao = Math.min(av, ap - am);
                    if (ar.iterN(am, ao, au)) {
                        return true
                    }
                    if ((av -= ao) == 0) {
                        break
                    }
                    am = 0
                } else {
                    am -= ap
                }
            }
        }
    };

    function C(am, aq) {
        while (!am.lines) {
            for (var an = 0;; ++an) {
                var ap = am.children[an],
                    ao = ap.chunkSize();
                if (aq < ao) {
                    am = ap;
                    break
                }
                aq -= ao
            }
        }
        return am.lines[aq]
    }

    function Y(am) {
        if (am.parent == null) {
            return null
        }
        var ar = am.parent,
            aq = q(ar.lines, am);
        for (var an = ar.parent; an; ar = an, an = an.parent) {
            for (var ao = 0, ap = an.children.length;; ++ao) {
                if (an.children[ao] == ar) {
                    break
                }
                aq += an.children[ao].chunkSize()
            }
        }
        return aq
    }

    function X(at, aq) {
        var ao = 0;
        outer: do {
            for (var ap = 0, ar = at.children.length; ap < ar; ++ap) {
                var an = at.children[ap],
                    am = an.height;
                if (aq < am) {
                    at = an;
                    continue outer
                }
                aq -= am;
                ao += an.chunkSize()
            }
            return ao
        } while (!at.lines);
        for (var ap = 0, ar = at.lines.length; ap < ar; ++ap) {
            var av = at.lines[ap],
                au = av.height;
            if (aq < au) {
                break
            }
            aq -= au
        }
        return ao + ap
    }

    function g(am, at) {
        var ao = 0;
        outer: do {
            for (var an = 0, aq = am.children.length; an < aq; ++an) {
                var ar = am.children[an],
                    ap = ar.chunkSize();
                if (at < ap) {
                    am = ar;
                    continue outer
                }
                at -= ap;
                ao += ar.height
            }
            return ao
        } while (!am.lines);
        for (var an = 0; an < at; ++an) {
            ao += am.lines[an].height
        }
        return ao
    }

    function k() {
        this.time = 0;
        this.done = [];
        this.undone = [];
        this.compound = 0;
        this.closed = false
    }
    k.prototype = {
        addChange: function(am, ar, an) {
            this.undone.length = 0;
            var ao = +new Date,
                au = this.done[this.done.length - 1],
                av = au && au[au.length - 1];
            var aq = ao - this.time;
            if (this.compound && au && !this.closed) {
                au.push({
                    start: am,
                    added: ar,
                    old: an
                })
            } else {
                if (aq > 400 || !av || this.closed || av.start > am + an.length || av.start + av.added < am) {
                    this.done.push([{
                        start: am,
                        added: ar,
                        old: an
                    }]);
                    this.closed = false
                } else {
                    var at = Math.max(0, av.start - am),
                        aw = Math.max(0, (am + an.length) - (av.start + av.added));
                    for (var ap = at; ap > 0; --ap) {
                        av.old.unshift(an[ap - 1])
                    }
                    for (var ap = aw; ap > 0; --ap) {
                        av.old.push(an[an.length - ap])
                    }
                    if (at) {
                        av.start = am
                    }
                    av.added += ar - (an.length - at - aw)
                }
            }
            this.time = ao
        },
        startCompound: function() {
            if (!this.compound++) {
                this.closed = true
            }
        },
        endCompound: function() {
            if (!--this.compound) {
                this.closed = true
            }
        }
    };

    function J() {
        w(this)
    }

    function O(am) {
        if (!am.stop) {
            am.stop = J
        }
        return am
    }

    function T(am) {
        if (am.preventDefault) {
            am.preventDefault()
        } else {
            am.returnValue = false
        }
    }

    function D(am) {
        if (am.stopPropagation) {
            am.stopPropagation()
        } else {
            am.cancelBubble = true
        }
    }

    function w(am) {
        T(am);
        D(am)
    }
    u.e_stop = w;
    u.e_preventDefault = T;
    u.e_stopPropagation = D;

    function j(am) {
        return am.target || am.srcElement
    }

    function x(am) {
        if (am.which) {
            return am.which
        } else {
            if (am.button & 1) {
                return 1
            } else {
                if (am.button & 2) {
                    return 3
                } else {
                    if (am.button & 4) {
                        return 2
                    }
                }
            }
        }
    }

    function y(an, ao) {
        var am = an.override && an.override.hasOwnProperty(ao);
        return am ? an.override[ao] : an[ao]
    }

    function r(ap, ao, an, am) {
        if (typeof ap.addEventListener == "function") {
            ap.addEventListener(ao, an, false);
            if (am) {
                return function() {
                    ap.removeEventListener(ao, an, false)
                }
            }
        } else {
            var aq = function(ar) {
                an(ar || window.event)
            };
            ap.attachEvent("on" + ao, aq);
            if (am) {
                return function() {
                    ap.detachEvent("on" + ao, aq)
                }
            }
        }
    }
    u.connect = r;

    function z() {
        this.id = null
    }
    z.prototype = {
        set: function(am, an) {
            clearTimeout(this.id);
            this.id = setTimeout(an, am)
        }
    };
    var ab = u.Pass = {
        toString: function() {
            return "CodeMirror.Pass"
        }
    };
    var N = /gecko\/\d{7}/i.test(navigator.userAgent);
    var I = /MSIE \d/.test(navigator.userAgent);
    var B = /MSIE [1-8]\b/.test(navigator.userAgent);
    var E = I && document.documentMode == 5;
    var f = /WebKit\//.test(navigator.userAgent);
    var af = /Chrome\//.test(navigator.userAgent);
    var h = /Apple Computer/.test(navigator.vendor);
    var m = /KHTML\//.test(navigator.userAgent);
    var F = function() {
        if (B) {
            return false
        }
        var am = document.createElement("div");
        return "draggable" in am || "dragDrop" in am
    }();
    var d = function() {
        var am = document.createElement("textarea");
        am.value = "foo\nbar";
        if (am.value.indexOf("\r") > -1) {
            return "\r\n"
        }
        return "\n"
    }();
    var o = /^$/;
    if (N) {
        o = /$'/
    } else {
        if (h) {
            o = /\-[^ \-?]|\?[^ !'\"\),.\-\/:;\?\]\}]/
        } else {
            if (af) {
                o = /\-[^ \-\.?]|\?[^ \-\.?\]\}:;!'\"\),\/]|[\.!\"#&%\)*+,:;=>\]|\}~][\(\{\[<]|\$'/
            }
        }
    }

    function n(an, am, ap) {
        if (am == null) {
            am = an.search(/[^\s\u00a0]/);
            if (am == -1) {
                am = an.length
            }
        }
        for (var ao = 0, aq = 0; ao < am; ++ao) {
            if (an.charAt(ao) == "\t") {
                aq += ap - (aq % ap)
            } else {
                ++aq
            }
        }
        return aq
    }

    function t(am) {
        if (am.currentStyle) {
            return am.currentStyle
        }
        return window.getComputedStyle(am, null)
    }

    function ak(an, aw) {
        var ap = an.ownerDocument.body;
        var av = 0,
            au = 0,
            ar = false;
        for (var am = an; am; am = am.offsetParent) {
            var at = am.offsetLeft,
                ao = am.offsetTop;
            if (am == ap) {
                av += Math.abs(at);
                au += Math.abs(ao)
            } else {
                av += at, au += ao
            }
            if (aw && t(am).position == "fixed") {
                ar = true
            }
        }
        var aq = aw && !ar ? null : ap;
        for (var am = an.parentNode; am != aq; am = am.parentNode) {
            if (am.scrollLeft != null) {
                av -= am.scrollLeft;
                au -= am.scrollTop
            }
        }
        return {
            left: av,
            top: au
        }
    }
    if (document.documentElement.getBoundingClientRect != null) {
        ak = function(ap, am) {
            try {
                var ao = ap.getBoundingClientRect();
                ao = {
                    top: ao.top,
                    left: ao.left
                }
            } catch (aq) {
                ao = {
                    top: 0,
                    left: 0
                }
            }
            if (!am) {
                if (window.pageYOffset == null) {
                    var an = document.documentElement || document.body.parentNode;
                    if (an.scrollTop == null) {
                        an = document.body
                    }
                    ao.top += an.scrollTop;
                    ao.left += an.scrollLeft
                } else {
                    ao.top += window.pageYOffset;
                    ao.left += window.pageXOffset
                }
            }
            return ao
        }
    }

    function H(am) {
        return am.textContent || am.innerText || am.nodeValue || ""
    }

    function a(am) {
        if (s) {
            am.selectionStart = 0;
            am.selectionEnd = am.value.length
        } else {
            am.select()
        }
    }

    function ad(an, am) {
        return an.line == am.line && an.ch == am.ch
    }

    function Z(an, am) {
        return an.line < am.line || (an.line == am.line && an.ch < am.ch)
    }

    function aa(am) {
        return {
            line: am.line,
            ch: am.ch
        }
    }
    var ai = document.createElement("pre");

    function P(am) {
        ai.textContent = am;
        return ai.innerHTML
    }
    if (P("a") == "\na") {
        P = function(am) {
            ai.textContent = am;
            return ai.innerHTML.slice(1)
        }
    } else {
        if (P("\t") != "\t") {
            P = function(am) {
                ai.innerHTML = "";
                ai.appendChild(document.createTextNode(am));
                return ai.innerHTML
            }
        }
    }
    u.htmlEscape = P;

    function W(ap, ao) {
        if (!ao) {
            return 0
        }
        if (!ap) {
            return ao.length
        }
        for (var an = ap.length, am = ao.length; an >= 0 && am >= 0; --an, --am) {
            if (ap.charAt(an) != ao.charAt(am)) {
                break
            }
        }
        return am + 1
    }

    function q(ap, am) {
        if (ap.indexOf) {
            return ap.indexOf(am)
        }
        for (var an = 0, ao = ap.length; an < ao; ++an) {
            if (ap[an] == am) {
                return an
            }
        }
        return -1
    }

    function ag(am) {
        return /\w/.test(am) || am.toUpperCase() != am.toLowerCase()
    }
    var A = "\n\nb".split(/\n/).length != 3 ? function(ao) {
        var ap = 0,
            an, am = [];
        while ((an = ao.indexOf("\n", ap)) > -1) {
            am.push(ao.slice(ap, ao.charAt(an - 1) == "\r" ? an - 1 : an));
            ap = an + 1
        }
        am.push(ao.slice(ap));
        return am
    } : function(am) {
        return am.split(/\r?\n/)
    };
    u.splitLines = A;
    var ae = window.getSelection ? function(an) {
        try {
            return an.selectionStart != an.selectionEnd
        } catch (am) {
            return false
        }
    } : function(ao) {
        try {
            var am = ao.ownerDocument.selection.createRange()
        } catch (an) {}
        if (!am || am.parentElement() != ao) {
            return false
        }
        return am.compareEndPoints("StartToEnd", am) != 0
    };
    u.defineMode("null", function() {
        return {
            token: function(am) {
                am.skipToEnd()
            }
        }
    });
    u.defineMIME("text/plain", "null");
    var R = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        127: "Delete",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63276: "PageUp",
        63277: "PageDown",
        63275: "End",
        63273: "Home",
        63234: "Left",
        63232: "Up",
        63235: "Right",
        63233: "Down",
        63302: "Insert",
        63272: "Delete"
    };
    u.keyNames = R;
    (function() {
        for (var am = 0; am < 10; am++) {
            R[am + 48] = String(am)
        }
        for (var am = 65; am <= 90; am++) {
            R[am] = String.fromCharCode(am)
        }
        for (var am = 1; am <= 12; am++) {
            R[am + 111] = R[am + 63235] = "F" + am
        }
    })();
    return u
})();
CodeMirror.defineMode("javascript", function(I, M) {
    var v = I.indentUnit;
    var Q = M.json;
    var b = function() {
        function W(Z) {
            return {
                type: Z,
                style: "keyword"
            }
        }
        var T = W("keyword a"),
            Y = W("keyword b"),
            X = W("keyword c");
        var U = W("operator"),
            V = {
                type: "atom",
                style: "atom"
            };
        return {
            "if": T,
            "while": T,
            "with": T,
            "else": Y,
            "do": Y,
            "try": Y,
            "finally": Y,
            "return": X,
            "break": X,
            "continue": X,
            "new": X,
            "delete": X,
            "throw": X,
            "var": W("var"),
            "const": W("var"),
            let: W("var"),
            "function": W("function"),
            "catch": W("catch"),
            "for": W("for"),
            "switch": W("switch"),
            "case": W("case"),
            "default": W("default"),
            "in": U,
            "typeof": U,
            "instanceof": U,
            "true": V,
            "false": V,
            "null": V,
            "undefined": V,
            "NaN": V,
            "Infinity": V
        }
    }();
    var N = /[+\-*&%=<>!?|]/;

    function R(V, U, T) {
        U.tokenize = T;
        return T(V, U)
    }

    function h(W, T) {
        var V = false,
            U;
        while ((U = W.next()) != null) {
            if (U == T && !V) {
                return false
            }
            V = !V && U == "\\"
        }
        return V
    }
    var S, p;

    function B(V, U, T) {
        S = V;
        p = T;
        return U
    }

    function l(X, V) {
        var T = X.next();
        if (T == '"' || T == "'") {
            return R(X, V, z(T))
        } else {
            if (/[\[\]{}\(\),;\:\.]/.test(T)) {
                return B(T)
            } else {
                if (T == "0" && X.eat(/x/i)) {
                    X.eatWhile(/[\da-f]/i);
                    return B("number", "number")
                } else {
                    if (/\d/.test(T)) {
                        X.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
                        return B("number", "number")
                    } else {
                        if (T == "/") {
                            if (X.eat("*")) {
                                return R(X, V, f)
                            } else {
                                if (X.eat("/")) {
                                    X.skipToEnd();
                                    return B("comment", "comment")
                                } else {
                                    if (V.reAllowed) {
                                        h(X, "/");
                                        X.eatWhile(/[gimy]/);
                                        return B("regexp", "string-2")
                                    } else {
                                        X.eatWhile(N);
                                        return B("operator", null, X.current())
                                    }
                                }
                            }
                        } else {
                            if (T == "#") {
                                X.skipToEnd();
                                return B("error", "error")
                            } else {
                                if (N.test(T)) {
                                    X.eatWhile(N);
                                    return B("operator", null, X.current())
                                } else {
                                    X.eatWhile(/[\w\$_]/);
                                    var W = X.current(),
                                        U = b.propertyIsEnumerable(W) && b[W];
                                    return (U && V.kwAllowed) ? B(U.type, U.style, W) : B("variable", "variable", W)
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function z(T) {
        return function(V, U) {
            if (!h(V, T)) {
                U.tokenize = l
            }
            return B("string", "string")
        }
    }

    function f(W, V) {
        var T = false,
            U;
        while (U = W.next()) {
            if (U == "/" && T) {
                V.tokenize = l;
                break
            }
            T = (U == "*")
        }
        return B("comment", "comment")
    }
    var k = {
        atom: true,
        number: true,
        variable: true,
        string: true,
        regexp: true
    };

    function t(Y, U, T, X, V, W) {
        this.indented = Y;
        this.column = U;
        this.type = T;
        this.prev = V;
        this.info = W;
        if (X != null) {
            this.align = X
        }
    }

    function w(V, U) {
        for (var T = V.localVars; T; T = T.next) {
            if (T.name == U) {
                return true
            }
        }
    }

    function E(X, U, T, W, Y) {
        var Z = X.cc;
        u.state = X;
        u.stream = Y;
        u.marked = null, u.cc = Z;
        if (!X.lexical.hasOwnProperty("align")) {
            X.lexical.align = true
        }
        while (true) {
            var V = Z.length ? Z.pop() : Q ? x : y;
            if (V(T, W)) {
                while (Z.length && Z[Z.length - 1].lex) {
                    Z.pop()()
                }
                if (u.marked) {
                    return u.marked
                }
                if (T == "variable" && w(X, W)) {
                    return "variable-2"
                }
                return U
            }
        }
    }
    var u = {
        state: null,
        column: null,
        marked: null,
        cc: null
    };

    function a() {
        for (var T = arguments.length - 1; T >= 0; T--) {
            u.cc.push(arguments[T])
        }
    }

    function G() {
        a.apply(null, arguments);
        return true
    }

    function m(U) {
        var V = u.state;
        if (V.context) {
            u.marked = "def";
            for (var T = V.localVars; T; T = T.next) {
                if (T.name == U) {
                    return
                }
            }
            V.localVars = {
                name: U,
                next: V.localVars
            }
        }
    }
    var D = {
        name: "this",
        next: {
            name: "arguments"
        }
    };

    function s() {
        if (!u.state.context) {
            u.state.localVars = D
        }
        u.state.context = {
            prev: u.state.context,
            vars: u.state.localVars
        }
    }

    function r() {
        u.state.localVars = u.state.context.vars;
        u.state.context = u.state.context.prev
    }

    function j(U, V) {
        var T = function() {
            var W = u.state;
            W.lexical = new t(W.indented, u.stream.column(), U, null, W.lexical, V)
        };
        T.lex = true;
        return T
    }

    function F() {
        var T = u.state;
        if (T.lexical.prev) {
            if (T.lexical.type == ")") {
                T.indented = T.lexical.indented
            }
            T.lexical = T.lexical.prev
        }
    }
    F.lex = true;

    function c(U) {
        return function T(V) {
            if (V == U) {
                return G()
            } else {
                if (U == ";") {
                    return a()
                } else {
                    return G(arguments.callee)
                }
            }
        }
    }

    function y(T) {
        if (T == "var") {
            return G(j("vardef"), J, c(";"), F)
        }
        if (T == "keyword a") {
            return G(j("form"), x, y, F)
        }
        if (T == "keyword b") {
            return G(j("form"), y, F)
        }
        if (T == "{") {
            return G(j("}"), n, F)
        }
        if (T == ";") {
            return G()
        }
        if (T == "function") {
            return G(i)
        }
        if (T == "for") {
            return G(j("form"), c("("), j(")"), g, c(")"), F, y, F)
        }
        if (T == "variable") {
            return G(j("stat"), C)
        }
        if (T == "switch") {
            return G(j("form"), x, j("}", "switch"), c("{"), n, F, F)
        }
        if (T == "case") {
            return G(x, c(":"))
        }
        if (T == "default") {
            return G(c(":"))
        }
        if (T == "catch") {
            return G(j("form"), s, c("("), q, c(")"), y, F, r)
        }
        return a(j("stat"), x, c(";"), F)
    }

    function x(T) {
        if (k.hasOwnProperty(T)) {
            return G(L)
        }
        if (T == "function") {
            return G(i)
        }
        if (T == "keyword c") {
            return G(A)
        }
        if (T == "(") {
            return G(j(")"), A, c(")"), F, L)
        }
        if (T == "operator") {
            return G(x)
        }
        if (T == "[") {
            return G(j("]"), O(x, "]"), F, L)
        }
        if (T == "{") {
            return G(j("}"), O(o, "}"), F, L)
        }
        return G()
    }

    function A(T) {
        if (T.match(/[;\}\)\],]/)) {
            return a()
        }
        return a(x)
    }

    function L(T, U) {
        if (T == "operator" && /\+\+|--/.test(U)) {
            return G(L)
        }
        if (T == "operator" || T == ":") {
            return G(x)
        }
        if (T == ";") {
            return
        }
        if (T == "(") {
            return G(j(")"), O(x, ")"), F, L)
        }
        if (T == ".") {
            return G(P, L)
        }
        if (T == "[") {
            return G(j("]"), x, c("]"), F, L)
        }
    }

    function C(T) {
        if (T == ":") {
            return G(F, y)
        }
        return a(L, c(";"), F)
    }

    function P(T) {
        if (T == "variable") {
            u.marked = "property";
            return G()
        }
    }

    function o(T) {
        if (T == "variable") {
            u.marked = "property"
        }
        if (k.hasOwnProperty(T)) {
            return G(c(":"), x)
        }
    }

    function O(V, T) {
        function U(X) {
            if (X == ",") {
                return G(V, U)
            }
            if (X == T) {
                return G()
            }
            return G(c(T))
        }
        return function W(X) {
            if (X == T) {
                return G()
            } else {
                return a(V, U)
            }
        }
    }

    function n(T) {
        if (T == "}") {
            return G()
        }
        return a(y, n)
    }

    function J(T, U) {
        if (T == "variable") {
            m(U);
            return G(H)
        }
        return G()
    }

    function H(T, U) {
        if (U == "=") {
            return G(x, H)
        }
        if (T == ",") {
            return G(J)
        }
    }

    function g(T) {
        if (T == "var") {
            return G(J, e)
        }
        if (T == ";") {
            return a(e)
        }
        if (T == "variable") {
            return G(K)
        }
        return a(e)
    }

    function K(T, U) {
        if (U == "in") {
            return G(x)
        }
        return G(L, e)
    }

    function e(T, U) {
        if (T == ";") {
            return G(d)
        }
        if (U == "in") {
            return G(x)
        }
        return G(x, c(";"), d)
    }

    function d(T) {
        if (T != ")") {
            G(x)
        }
    }

    function i(T, U) {
        if (T == "variable") {
            m(U);
            return G(i)
        }
        if (T == "(") {
            return G(j(")"), s, O(q, ")"), F, y, r)
        }
    }

    function q(T, U) {
        if (T == "variable") {
            m(U);
            return G()
        }
    }
    return {
        startState: function(T) {
            return {
                tokenize: l,
                reAllowed: true,
                kwAllowed: true,
                cc: [],
                lexical: new t((T || 0) - v, 0, "block", false),
                localVars: M.localVars,
                context: M.localVars && {
                    vars: M.localVars
                },
                indented: 0
            }
        },
        token: function(V, U) {
            if (V.sol()) {
                if (!U.lexical.hasOwnProperty("align")) {
                    U.lexical.align = false
                }
                U.indented = V.indentation()
            }
            if (V.eatSpace()) {
                return null
            }
            var T = U.tokenize(V, U);
            if (S == "comment") {
                return T
            }
            U.reAllowed = !!(S == "operator" || S == "keyword c" || S.match(/^[\[{}\(,;:]$/));
            U.kwAllowed = S != ".";
            return E(U, T, S, p, V)
        },
        indent: function(Y, T) {
            if (Y.tokenize != l) {
                return 0
            }
            var X = T && T.charAt(0),
                V = Y.lexical;
            if (V.type == "stat" && X == "}") {
                V = V.prev
            }
            var W = V.type,
                U = X == W;
            if (W == "vardef") {
                return V.indented + 4
            } else {
                if (W == "form" && X == "{") {
                    return V.indented
                } else {
                    if (W == "stat" || W == "form") {
                        return V.indented + v
                    } else {
                        if (V.info == "switch" && !U) {
                            return V.indented + (/^(?:case|default)\b/.test(T) ? v : 2 * v)
                        } else {
                            if (V.align) {
                                return V.column + (U ? 0 : 1)
                            } else {
                                return V.indented + (U ? 0 : v)
                            }
                        }
                    }
                }
            }
        },
        electricChars: ":{}"
    }
});
CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: true
});
CodeMirror.defineMode("xml", function(y, k) {
    var r = y.indentUnit;
    var x = k.htmlMode ? {
        autoSelfClosers: {
            area: true,
            base: true,
            br: true,
            col: true,
            command: true,
            embed: true,
            frame: true,
            hr: true,
            img: true,
            input: true,
            keygen: true,
            link: true,
            meta: true,
            param: true,
            source: true,
            track: true,
            wbr: true
        },
        implicitlyClosed: {
            dd: true,
            li: true,
            optgroup: true,
            option: true,
            p: true,
            rp: true,
            rt: true,
            tbody: true,
            td: true,
            tfoot: true,
            th: true,
            tr: true
        },
        contextGrabbers: {
            dd: {
                dd: true,
                dt: true
            },
            dt: {
                dd: true,
                dt: true
            },
            li: {
                li: true
            },
            option: {
                option: true,
                optgroup: true
            },
            optgroup: {
                optgroup: true
            },
            p: {
                address: true,
                article: true,
                aside: true,
                blockquote: true,
                dir: true,
                div: true,
                dl: true,
                fieldset: true,
                footer: true,
                form: true,
                h1: true,
                h2: true,
                h3: true,
                h4: true,
                h5: true,
                h6: true,
                header: true,
                hgroup: true,
                hr: true,
                menu: true,
                nav: true,
                ol: true,
                p: true,
                pre: true,
                section: true,
                table: true,
                ul: true
            },
            rp: {
                rp: true,
                rt: true
            },
            rt: {
                rp: true,
                rt: true
            },
            tbody: {
                tbody: true,
                tfoot: true
            },
            td: {
                td: true,
                th: true
            },
            tfoot: {
                tbody: true
            },
            th: {
                td: true,
                th: true
            },
            thead: {
                tbody: true,
                tfoot: true
            },
            tr: {
                tr: true
            }
        },
        doNotIndent: {
            pre: true
        },
        allowUnquoted: true,
        allowMissing: false
    } : {
        autoSelfClosers: {},
        implicitlyClosed: {},
        contextGrabbers: {},
        doNotIndent: {},
        allowUnquoted: false,
        allowMissing: false
    };
    var a = k.alignCDATA;
    var f, g;

    function o(E, D) {
        function B(G) {
            D.tokenize = G;
            return G(E, D)
        }
        var C = E.next();
        if (C == "<") {
            if (E.eat("!")) {
                if (E.eat("[")) {
                    if (E.match("CDATA[")) {
                        return B(w("atom", "]]>"))
                    } else {
                        return null
                    }
                } else {
                    if (E.match("--")) {
                        return B(w("comment", "-->"))
                    } else {
                        if (E.match("DOCTYPE", true, true)) {
                            E.eatWhile(/[\w\._\-]/);
                            return B(z(1))
                        } else {
                            return null
                        }
                    }
                }
            } else {
                if (E.eat("?")) {
                    E.eatWhile(/[\w\._\-]/);
                    D.tokenize = w("meta", "?>");
                    return "meta"
                } else {
                    g = E.eat("/") ? "closeTag" : "openTag";
                    E.eatSpace();
                    f = "";
                    var F;
                    while ((F = E.eat(/[^\s\u00a0=<>\"\'\/?]/))) {
                        f += F
                    }
                    D.tokenize = n;
                    return "tag"
                }
            }
        } else {
            if (C == "&") {
                var A;
                if (E.eat("#")) {
                    if (E.eat("x")) {
                        A = E.eatWhile(/[a-fA-F\d]/) && E.eat(";")
                    } else {
                        A = E.eatWhile(/[\d]/) && E.eat(";")
                    }
                } else {
                    A = E.eatWhile(/[\w\.\-:]/) && E.eat(";")
                }
                return A ? "atom" : "error"
            } else {
                E.eatWhile(/[^&<]/);
                return null
            }
        }
    }

    function n(C, B) {
        var A = C.next();
        if (A == ">" || (A == "/" && C.eat(">"))) {
            B.tokenize = o;
            g = A == ">" ? "endTag" : "selfcloseTag";
            return "tag"
        } else {
            if (A == "=") {
                g = "equals";
                return null
            } else {
                if (/[\'\"]/.test(A)) {
                    B.tokenize = j(A);
                    return B.tokenize(C, B)
                } else {
                    C.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
                    return "word"
                }
            }
        }
    }

    function j(A) {
        return function(C, B) {
            while (!C.eol()) {
                if (C.next() == A) {
                    B.tokenize = n;
                    break
                }
            }
            return "string"
        }
    }

    function w(B, A) {
        return function(D, C) {
            while (!D.eol()) {
                if (D.match(A)) {
                    C.tokenize = o;
                    break
                }
                D.next()
            }
            return B
        }
    }

    function z(A) {
        return function(D, C) {
            var B;
            while ((B = D.next()) != null) {
                if (B == "<") {
                    C.tokenize = z(A + 1);
                    return C.tokenize(D, C)
                } else {
                    if (B == ">") {
                        if (A == 1) {
                            C.tokenize = o;
                            break
                        } else {
                            C.tokenize = z(A - 1);
                            return C.tokenize(D, C)
                        }
                    }
                }
            }
            return "meta"
        }
    }
    var l, h;

    function b() {
        for (var A = arguments.length - 1; A >= 0; A--) {
            l.cc.push(arguments[A])
        }
    }

    function e() {
        b.apply(null, arguments);
        return true
    }

    function i(A, C) {
        var B = x.doNotIndent.hasOwnProperty(A) || (l.context && l.context.noIndent);
        l.context = {
            prev: l.context,
            tagName: A,
            indent: l.indented,
            startOfLine: C,
            noIndent: B
        }
    }

    function u() {
        if (l.context) {
            l.context = l.context.prev
        }
    }

    function d(A) {
        if (A == "openTag") {
            l.tagName = f;
            return e(m, c(l.startOfLine))
        } else {
            if (A == "closeTag") {
                var B = false;
                if (l.context) {
                    if (l.context.tagName != f) {
                        if (x.implicitlyClosed.hasOwnProperty(l.context.tagName.toLowerCase())) {
                            u()
                        }
                        B = !l.context || l.context.tagName != f
                    }
                } else {
                    B = true
                }
                if (B) {
                    h = "error"
                }
                return e(s(B))
            }
        }
        return e()
    }

    function c(A) {
        return function(B) {
            if (B == "selfcloseTag" || (B == "endTag" && x.autoSelfClosers.hasOwnProperty(l.tagName.toLowerCase()))) {
                q(l.tagName.toLowerCase());
                return e()
            }
            if (B == "endTag") {
                q(l.tagName.toLowerCase());
                i(l.tagName, A);
                return e()
            }
            return e()
        }
    }

    function s(A) {
        return function(B) {
            if (A) {
                h = "error"
            }
            if (B == "endTag") {
                u();
                return e()
            }
            h = "error";
            return e(arguments.callee)
        }
    }

    function q(B) {
        var A;
        while (true) {
            if (!l.context) {
                return
            }
            A = l.context.tagName.toLowerCase();
            if (!x.contextGrabbers.hasOwnProperty(A) || !x.contextGrabbers[A].hasOwnProperty(B)) {
                return
            }
            u()
        }
    }

    function m(A) {
        if (A == "word") {
            h = "attribute";
            return e(p, m)
        }
        if (A == "endTag" || A == "selfcloseTag") {
            return b()
        }
        h = "error";
        return e(m)
    }

    function p(A) {
        if (A == "equals") {
            return e(v, m)
        }
        if (!x.allowMissing) {
            h = "error"
        }
        return (A == "endTag" || A == "selfcloseTag") ? b() : e()
    }

    function v(A) {
        if (A == "string") {
            return e(t)
        }
        if (A == "word" && x.allowUnquoted) {
            h = "string";
            return e()
        }
        h = "error";
        return (A == "endTag" || A == "selfCloseTag") ? b() : e()
    }

    function t(A) {
        if (A == "string") {
            return e(t)
        } else {
            return b()
        }
    }
    return {
        startState: function() {
            return {
                tokenize: o,
                cc: [],
                indented: 0,
                startOfLine: true,
                tagName: null,
                context: null
            }
        },
        token: function(D, C) {
            if (D.sol()) {
                C.startOfLine = true;
                C.indented = D.indentation()
            }
            if (D.eatSpace()) {
                return null
            }
            h = g = f = null;
            var B = C.tokenize(D, C);
            C.type = g;
            if ((B || g) && B != "comment") {
                l = C;
                while (true) {
                    var A = C.cc.pop() || d;
                    if (A(g || B)) {
                        break
                    }
                }
            }
            C.startOfLine = false;
            return h || B
        },
        indent: function(D, A, C) {
            var B = D.context;
            if ((D.tokenize != n && D.tokenize != o) || B && B.noIndent) {
                return C ? C.match(/^(\s*)/)[0].length : 0
            }
            if (a && /<!\[CDATA\[/.test(A)) {
                return 0
            }
            if (B && /^<\//.test(A)) {
                B = B.prev
            }
            while (B && !B.startOfLine) {
                B = B.prev
            }
            if (B) {
                return B.indent + r
            } else {
                return 0
            }
        },
        compareStates: function(D, B) {
            if (D.indented != B.indented || D.tokenize != B.tokenize) {
                return false
            }
            for (var C = D.context, A = B.context;; C = C.prev, A = A.prev) {
                if (!C || !A) {
                    return C == A
                }
                if (C.tagName != A.tagName) {
                    return false
                }
            }
        },
        electricChars: "/"
    }
});
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html")) {
    CodeMirror.defineMIME("text/html", {
        name: "xml",
        htmlMode: true
    })
}
CodeMirror.defineMode("markdown", function(B, m) {
    var i = CodeMirror.getMode(B, {
        name: "xml",
        htmlMode: true
    });
    var y = "header",
        d = "comment",
        A = "quote",
        z = "string",
        E = "hr",
        s = "link",
        D = "string",
        g = "em",
        j = "strong",
        w = "emstrong";
    var F = /^([*\-=_])(?:\s*\1){2,}\s*$/,
        p = /^[*\-+]\s+/,
        u = /^[0-9]+\.\s+/,
        n = /^(?:\={3,}|-{3,})$/,
        f = /^[^\[*_\\<>`]+/;

    function e(I, H, G) {
        H.f = H.inline = G;
        return G(I, H)
    }

    function r(I, H, G) {
        H.f = H.block = G;
        return G(I, H)
    }

    function o(G) {
        G.em = false;
        G.strong = false;
        return null
    }

    function l(I, H) {
        var G;
        if (H.indentationDiff >= 4) {
            H.indentation -= H.indentationDiff;
            I.skipToEnd();
            return d
        } else {
            if (I.eatSpace()) {
                return null
            } else {
                if (I.peek() === "#" || I.match(n)) {
                    H.header = true
                } else {
                    if (I.eat(">")) {
                        H.indentation++;
                        H.quote = true
                    } else {
                        if (I.peek() === "[") {
                            return e(I, H, k)
                        } else {
                            if (I.match(F, true)) {
                                return E
                            } else {
                                if (G = I.match(p, true) || I.match(u, true)) {
                                    H.indentation += G[0].length;
                                    return z
                                }
                            }
                        }
                    }
                }
            }
        }
        return e(I, H, H.inline)
    }

    function x(I, H) {
        var G = i.token(I, H.htmlState);
        if (G === "tag" && H.htmlState.type !== "openTag" && !H.htmlState.context) {
            H.f = q;
            H.block = l
        }
        return G
    }

    function t(H) {
        var G = [];
        if (H.strong) {
            G.push(H.em ? w : j)
        } else {
            if (H.em) {
                G.push(g)
            }
        }
        if (H.header) {
            G.push(y)
        }
        if (H.quote) {
            G.push(A)
        }
        return G.length ? G.join(" ") : null
    }

    function b(H, G) {
        if (H.match(f, true)) {
            return t(G)
        }
        return undefined
    }

    function q(K, J) {
        var I = J.text(K, J);
        if (typeof I !== "undefined") {
            return I
        }
        var H = K.next();
        if (H === "\\") {
            K.next();
            return t(J)
        }
        if (H === "`") {
            return e(K, J, v(d, "`"))
        }
        if (H === "[") {
            return e(K, J, C)
        }
        if (H === "<" && K.match(/^\w/, false)) {
            K.backUp(1);
            return r(K, J, x)
        }
        var G = t(J);
        if (H === "*" || H === "_") {
            if (K.eat(H)) {
                return (J.strong = !J.strong) ? t(J) : G
            }
            return (J.em = !J.em) ? t(J) : G
        }
        return t(J)
    }

    function C(I, H) {
        while (!I.eol()) {
            var G = I.next();
            if (G === "\\") {
                I.next()
            }
            if (G === "]") {
                H.inline = H.f = h;
                return s
            }
        }
        return s
    }

    function h(I, H) {
        I.eatSpace();
        var G = I.next();
        if (G === "(" || G === "[") {
            return e(I, H, v(D, G === "(" ? ")" : "]"))
        }
        return "error"
    }

    function k(H, G) {
        if (H.match(/^[^\]]*\]:/, true)) {
            G.f = a;
            return s
        }
        return e(H, G, q)
    }

    function a(H, G) {
        H.eatSpace();
        H.match(/^[^\s]+/, true);
        G.f = G.inline = q;
        return D
    }

    function c(G) {
        if (!c[G]) {
            c[G] = new RegExp("^(?:[^\\\\\\" + G + "]|\\\\.)*(?:\\" + G + "|$)")
        }
        return c[G]
    }

    function v(H, I, G) {
        G = G || q;
        return function(K, J) {
            K.match(c(I));
            J.inline = J.f = G;
            return H
        }
    }
    return {
        startState: function() {
            return {
                f: l,
                block: l,
                htmlState: i.startState(),
                indentation: 0,
                inline: q,
                text: b,
                em: false,
                strong: false,
                header: false,
                quote: false
            }
        },
        copyState: function(G) {
            return {
                f: G.f,
                block: G.block,
                htmlState: CodeMirror.copyState(i, G.htmlState),
                indentation: G.indentation,
                inline: G.inline,
                text: G.text,
                em: G.em,
                strong: G.strong,
                header: G.header,
                quote: G.quote
            }
        },
        token: function(I, H) {
            if (I.sol()) {
                if (I.match(/^\s*$/, true)) {
                    return o(H)
                }
                H.header = false;
                H.quote = false;
                H.f = H.block;
                var G = I.match(/^\s*/, true)[0].replace(/\t/g, "    ").length;
                H.indentationDiff = G - H.indentation;
                H.indentation = G;
                if (G > 0) {
                    return null
                }
            }
            return H.f(I, H)
        },
        blankLine: o,
        getType: t
    }
}, "xml");
CodeMirror.defineMIME("text/x-markdown", "markdown");
Ext.define("Docs.History", {
    singleton: true,
    init: function() {
        Ext.util.History.useTopWindow = false;
        Ext.util.History.init(function() {
            this.historyLoaded = true;
            this.initialNavigate()
        }, this);
        Ext.util.History.on("change", function(b) {
            this.navigate(b, true)
        }, this)
    },
    notifyTabsLoaded: function() {
        this.tabsLoaded = true;
        this.initialNavigate()
    },
    initialNavigate: function() {
        if (this.tabsLoaded && this.historyLoaded) {
            this.navigate(Ext.util.History.getToken(), true)
        }
    },
    navigate: function(e, g) {
        var f = this.parseToken(e);
        if (f.url == "#!/api") {
            Docs.App.getController("Classes").loadIndex(g)
        } else {
            if (f.type === "api") {
                Docs.App.getController("Classes").loadClass(f.url, g)
            } else {
                if (f.url === "#!/guide") {
                    Docs.App.getController("Guides").loadIndex(g)
                } else {
                    if (f.type === "guide") {
                        Docs.App.getController("Guides").loadGuide(f.url, g)
                    } else {
                        if (f.url === "#!/video") {
                            Docs.App.getController("Videos").loadIndex(g)
                        } else {
                            if (f.type === "video") {
                                Docs.App.getController("Videos").loadVideo(f.url, g)
                            } else {
                                if (f.url === "#!/example") {
                                    Docs.App.getController("Examples").loadIndex()
                                } else {
                                    if (f.type === "example") {
                                        Docs.App.getController("Examples").loadExample(f.url, g)
                                    } else {
                                        if (f.url === "#!/comment") {
                                            Docs.App.getController("Comments").loadIndex()
                                        } else {
                                            if (f.url === "#!/tests") {
                                                Docs.App.getController("Tests").loadIndex()
                                            } else {
                                                if (Docs.App.getController("Welcome").isActive()) {
                                                    Docs.App.getController("Welcome").loadIndex(g)
                                                } else {
                                                    if (!this.noRepeatNav) {
                                                        this.noRepeatNav = true;
                                                        var h = Ext.getCmp("doctabs").staticTabs[0];
                                                        if (h) {
                                                            this.navigate(h.href, g)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    parseToken: function(d) {
        var c = d && d.match(/!?(\/(api|guide|example|video|comment|tests)(\/(.*))?)/);
        return c ? {
            type: c[2],
            url: "#!" + c[1]
        } : {}
    },
    push: function(e, f) {
        e = this.cleanUrl(e);
        if (!/^#!?/.test(e)) {
            e = "#!" + e
        }
        var d = Ext.util.History.getToken() || "";
        if ("#" + d.replace(/^%21/, "!") !== e) {
            Ext.util.History.add(e)
        }
    },
    cleanUrl: function(b) {
        return b.replace(/^[^#]*#/, "#")
    }
});
Ext.define("Docs.Auth", {
    singleton: true,
    requires: ["Ext.Ajax", "Ext.util.Cookies"],
    init: function(c, d) {
        Ext.Ajax.request({
            url: Docs.data.commentsUrl + "/session",
            params: {
                sid: this.getSid()
            },
            method: "GET",
            cors: true,
            callback: function(g, a, h) {
                if (h && h.responseText) {
                    var b = Ext.JSON.decode(h.responseText);
                    if (b && b.sessionID) {
                        this.setSid(b.sessionID)
                    }
                    if (b && b.userName) {
                        this.currentUser = b
                    }
                    c.call(d, true)
                } else {
                    c.call(d, false)
                }
            },
            scope: this
        })
    },
    login: function(b) {
        Ext.Ajax.request({
            url: Docs.data.commentsUrl + "/login",
            method: "POST",
            cors: true,
            params: {
                username: b.username,
                password: b.password
            },
            callback: function(h, f, a) {
                var g = Ext.JSON.decode(a.responseText);
                if (g.success) {
                    this.currentUser = g;
                    this.setSid(g.sessionID, b.remember);
                    b.success && b.success.call(b.scope)
                } else {
                    b.failure && b.failure.call(b.scope, g.reason)
                }
            },
            scope: this
        })
    },
    logout: function(c, d) {
        Ext.Ajax.request({
            url: Docs.data.commentsUrl + "/logout?sid=" + this.getSid(),
            method: "POST",
            cors: true,
            callback: function() {
                this.currentUser = undefined;
                c && c.call(d)
            },
            scope: this
        })
    },
    setSid: function(d, f) {
        this.sid = d;
        if (d) {
            var e = null;
            if (f) {
                e = new Date();
                e.setTime(e.getTime() + (60 * 60 * 24 * 30 * 1000))
            }
            Ext.util.Cookies.set("sid", d, e)
        } else {
            Ext.util.Cookies.clear("sid")
        }
    },
    getSid: function() {
        if (!this.sid) {
            this.sid = Ext.util.Cookies.get("sid")
        }
        return this.sid
    },
    getUser: function() {
        return this.currentUser
    },
    isLoggedIn: function() {
        return !!this.getUser()
    },
    isModerator: function() {
        return this.getUser() && this.getUser().mod
    },
    getRegistrationUrl: function() {
        return Docs.data.commentsUrl + "/register"
    }
});
Ext.define("Docs.CommentCounts", {
    constructor: function(b) {
        this.counts = {};
        Ext.Array.each(b, function(a) {
            this.counts[a._id] = a.value
        }, this)
    },
    get: function(b) {
        return this.counts[b.join("__")] || 0
    },
    change: function(c, d) {
        delete this.totals;
        return this.counts[c.join("__")] = this.get(c) + d
    },
    getClassTotal: function(b) {
        if (!this.totals) {
            this.totals = {};
            Ext.Object.each(this.counts, function(a, f) {
                var e = a.split("__");
                if (e[0] === "class") {
                    this.totals[e[1]] = (this.totals[e[1]] || 0) + f
                }
            }, this)
        }
        return this.totals[b]
    }
});
Ext.define("Docs.CommentSubscriptions", {
    constructor: function(b) {
        this.subscriptions = {};
        Ext.Array.each(b, function(a) {
            this.subscriptions[a.join("__")] = true
        }, this)
    },
    has: function(b) {
        return this.subscriptions[b.join("__")]
    },
    set: function(c, d) {
        this.subscriptions[c.join("__")] = d
    }
});
Ext.define("Docs.LocalStore", {
    storeName: "",
    init: function() {
        this.localStorage = !!window.localStorage;
        this.store = Ext.create(this.storeName);
        if (this.localStorage) {
            this.cleanup();
            this.store.load();
            if (window.addEventListener) {
                window.addEventListener("storage", Ext.Function.bind(this.onStorageChange, this), false)
            } else {
                window.attachEvent("onstorage", Ext.Function.bind(this.onStorageChange, this))
            }
        }
    },
    onStorageChange: function(b) {
        b = b || window.event;
        if (b.key === this.store.getProxy().id) {
            this.store.load()
        }
    },
    syncStore: function() {
        this.localStorage && this.store.sync()
    },
    cleanup: function() {
        var f = /-settings/;
        for (var d = 0; d < window.localStorage.length; d++) {
            var e = window.localStorage.key(d);
            if (!f.test(e)) {
                window.localStorage.removeItem(e)
            }
        }
    }
});
Ext.define("Docs.view.Header", {
    extend: "Ext.container.Container",
    alias: "widget.docheader",
    contentEl: "header-content",
    initComponent: function() {
        if (Docs.otherProducts) {
            this.style = "cursor: pointer;", this.cls = "dropdown";
            this.menu = Ext.create("Ext.menu.Menu", {
                renderTo: Ext.getBody(),
                plain: true,
                items: Docs.otherProducts
            })
        }
        this.callParent()
    },
    listeners: {
        afterrender: function(b) {
            if (this.menu) {
                b.el.addListener("click", function(d, a) {
                    this.menu.showBy(this.el, "bl", [120, 0])
                }, this)
            }
        }
    }
});
Ext.define("Docs.view.examples.Container", {
    extend: "Ext.panel.Panel",
    alias: "widget.examplecontainer",
    layout: "fit",
    initComponent: function() {
        this.dockedItems = [{
            xtype: "container",
            dock: "top",
            html: ['<div class="cls-grouping example-toolbar">', "<div>", '<button class="new-window">Open in new window</button>', "</div>", "</div>"].join("")
        }];
        this.tpl = new Ext.XTemplate('<iframe style="width: 100%; height: 100%; border: 0;" src="{url}"></iframe>');
        this.callParent(arguments)
    },
    load: function(b) {
        this.update(this.tpl.apply(b))
    },
    clear: function() {
        this.update("")
    }
});
Ext.define("Docs.controller.Content", {
    extend: "Ext.app.Controller",
    MIDDLE: 1,
    title: "",
    loadIndex: function(b) {
        b || Docs.History.push(this.baseUrl);
        this.getViewport().setPageTitle(this.title);
        Ext.getCmp("doctabs").activateTab(this.baseUrl);
        Ext.getCmp("card-panel").layout.setActiveItem(this.getIndex());
        this.getIndex().restoreScrollState()
    },
    opensNewWindow: function(b) {
        return b.button === this.MIDDLE || b.shiftKey || b.ctrlKey
    },
    getBaseUrl: function() {
        return document.location.href.replace(/\/?(index.html|template.html)?(\?[^#]*)?#.*/, "")
    }
});
Ext.define("Docs.Syntax", {
    singleton: true,
    highlight: function(b) {
        Ext.Array.forEach(Ext.query("pre", b.dom || b), function(a) {
            a = Ext.get(a);
            if (a.child("code")) {
                if (!(a.hasCls("inline-example") && a.hasCls("preview"))) {
                    a.addCls("prettyprint")
                }
            } else {
                if (!a.parent(".CodeMirror") && !a.hasCls("hierarchy")) {
                    a.addCls("notpretty")
                }
            }
        });
        prettyPrint()
    }
});
Ext.define("Docs.ClassRegistry", {
    singleton: true,
    canonicalName: function(b) {
        if (!this.altNames) {
            this.altNames = {};
            Ext.each(Docs.data.search, function(a) {
                if (a.type === "class" && !/:/.test(a.cls)) {
                    this.altNames[a.cls] = a.id
                }
            }, this)
        }
        return this.altNames[b] || b
    },
    shortName: function(b) {
        return b.split(/\./).pop()
    },
    packageName: function(b) {
        return b.slice(0, -this.shortName(b).length - 1) || ""
    },
    search: function(S, H) {
        var J = 5;
        var T = 4;
        var X = 3;
        var K = new Array(J * T * X);
        for (var E = 0; E < K.length; E++) {
            K[E] = []
        }
        var O = J * T * 0;
        var Z = J * T * 1;
        var R = J * T * 2;
        var U = J * 0;
        var L = J * 1;
        var W = J * 2;
        var F = J * 3;
        if (H) {
            var P = 4;
            for (var E = 0; E < H.length; E++) {
                var i = H[E];
                if (i.score > 5) {
                    K[P + U + O].push(i)
                } else {
                    if (i.score > 1) {
                        K[P + U + Z].push(i)
                    } else {
                        K[P + U + R].push(i)
                    }
                }
            }
        }
        var M = /[.:]/.test(S);
        var G = Ext.escapeRe(S);
        var g = new RegExp("^" + G + "$", "i");
        var Y = new RegExp("^" + G, "i");
        var N = new RegExp(G, "i");
        var V = Docs.data.search;
        for (var E = 0, r = V.length; E < r; E++) {
            var Q = V[E];
            var I = M ? Q.fullName : Q.name;
            var D = Q.meta.removed ? F : (Q.meta["private"] ? W : (Q.meta.deprecated ? L : U));
            if (g.test(I)) {
                K[Q.sort + D + O].push(this.highlightMatch(Q, g))
            } else {
                if (Y.test(I)) {
                    K[Q.sort + D + Z].push(this.highlightMatch(Q, Y))
                } else {
                    if (N.test(I)) {
                        K[Q.sort + D + R].push(this.highlightMatch(Q, N))
                    }
                }
            }
        }
        return Ext.Array.flatten(K)
    },
    highlightMatch: function(c, d) {
        c = Ext.apply({}, c);
        c.name = c.name.replace(d, "<strong>$&</strong>");
        c.fullName = c.fullName.replace(d, "<strong>$&</strong>");
        return c
    }
});
Ext.define("Docs.GuideSearch", {
    singleton: true,
    isEnabled: function() {
        return !!Docs.data.guideSearch.url
    },
    deferredSearch: function(f, h, j, g) {
        clearTimeout(this.timeout);
        var i = this.timeout = Ext.Function.defer(function() {
            this.search(f, function(a) {
                if (i === this.timeout) {
                    h.call(j, a)
                }
            }, this)
        }, g, this)
    },
    search: function(f, g, e) {
        var h = this.currentRequest = Ext.data.JsonP.request({
            url: Docs.data.guideSearch.url,
            params: {
                fragsize: 32,
                max_fragments: 1,
                q: f,
                product: Docs.data.guideSearch.product,
                version: Docs.data.guideSearch.version,
                start: 0,
                limit: 100
            },
            callback: function(a, b) {
                if (a && b.success && this.currentRequest === h) {
                    g.call(e, Ext.Array.map(b.docs, this.adaptJson, this))
                }
            },
            scope: this
        })
    },
    adaptJson: function(b) {
        return {
            icon: "icon-guide",
            name: this.format(b.title),
            fullName: this.format(b.body),
            url: b.url,
            meta: {},
            score: b.score
        }
    },
    format: function(c) {
        var d = c.replace(/\s+/g, " ");
        return d.replace(/<em class="match">(.*?)<\/em>/g, "<strong>$1</strong>")
    }
});
Ext.define("Docs.store.Search", {
    extend: "Ext.data.Store",
    fields: ["name", "fullName", "icon", "url", "meta", "sort"],
    proxy: {
        type: "memory",
        reader: {
            type: "json"
        }
    }
});
Ext.define("Docs.model.Setting", {
    fields: ["id", "key", "value"],
    extend: "Ext.data.Model",
    requires: ["Ext.data.proxy.LocalStorage"],
    proxy: {
        type: window.localStorage ? "localstorage" : "memory",
        id: Docs.data.localStorageDb + "-settings"
    }
});
Ext.define("Docs.view.TabMenu", {
    extend: "Ext.menu.Menu",
    plain: true,
    componentCls: "tab-menu",
    initComponent: function() {
        this.addEvents("tabItemClick", "closeAllTabs");
        this.items = [{
            text: "Close other tabs",
            iconCls: "close",
            cls: "close-all",
            handler: function() {
                this.fireEvent("closeAllTabs")
            },
            scope: this
        }];
        this.callParent()
    },
    addTab: function(c, d) {
        this.insert(this.items.length - 1, {
            text: c.text,
            iconCls: c.iconCls,
            origIcon: c.iconCls,
            href: c.href,
            cls: d,
            handler: this.onTabItemClick,
            scope: this
        })
    },
    onTabItemClick: function(b) {
        this.fireEvent("tabItemClick", b)
    },
    addTabCls: function(c, d) {
        this.items.each(function(a) {
            if (a.href === c.href) {
                a.addCls(d)
            }
        })
    }
});
Ext.define("Docs.view.Scrolling", {
    onClassMixedIn: function(b) {
        Ext.Function.interceptBefore(b.prototype, "initComponent", this.prototype.initScrolling)
    },
    initScrolling: function() {
        this.scrollContext = "index";
        this.scrollState = {};
        this.on("afterrender", function() {
            this.getScrollEl().addListener("scroll", this.saveScrollState, this)
        }, this)
    },
    setScrollContext: function(b) {
        this.scrollContext = b
    },
    eraseScrollContext: function(b) {
        delete this.scrollState[b]
    },
    saveScrollState: function() {
        this.scrollState[this.scrollContext] = this.getScrollTop()
    },
    restoreScrollState: function() {
        this.setScrollTop(this.scrollState[this.scrollContext] || 0)
    },
    scrollToView: function(d, c) {
        d = Ext.get(d);
        c = c || {};
        if (d) {
            this.setScrollTop(this.getScrollTop() + d.getY() + (c.offset || 0));
            this.setScrollLeft(0);
            c.highlight && d.highlight()
        }
    },
    getScrollTop: function() {
        return this.getScrollEl().getScroll()["top"]
    },
    setScrollTop: function(b) {
        return this.getScrollEl().scrollTo("top", b)
    },
    setScrollLeft: function(b) {
        return this.getScrollEl().scrollTo("left", b)
    },
    scrollToTop: function() {
        this.getScrollEl().scrollTo("top")
    },
    getScrollEl: function() {
        return this.body || this.el
    }
});
Ext.define("Docs.ContentGrabber", {
    singleton: true,
    get: function(f) {
        var e;
        var d = Ext.get(f);
        if (d) {
            e = d.dom.innerHTML;
            d.remove()
        }
        return e
    }
});
Ext.define("Docs.view.comments.HeaderMenu", {
    extend: "Ext.container.Container",
    alias: "widget.commentsHeaderMenu",
    componentCls: "comments-header-menu",
    html: ["<h1>", '  <a href="#" class="users selected">Users</a>', '  <a href="#" class="targets">Topics</a>', '  <a href="#" class="tags">Tags</a>', "</h1>"].join(""),
    afterRender: function() {
        this.callParent(arguments);
        Ext.Array.forEach(["users", "targets", "tags"], function(d) {
            var c = this.getEl().down("a." + d);
            c.on("click", function(b, a) {
                this.getEl().select("a", true).removeCls("selected");
                c.addCls("selected");
                this.fireEvent("select", d)
            }, this, {
                preventDefault: true
            })
        }, this)
    }
});
Ext.define("Docs.view.examples.Device", {
    config: {
        url: "",
        id: undefined,
        device: "phone",
        orientation: "landscape"
    },
    constructor: function(b) {
        this.initConfig(b);
        Ext.apply(this, this.getIframeSize());
        this.id = this.id || Ext.id();
        this.tpl = new Ext.XTemplate('<div class="touchExample {device} {orientation}">', '<iframe id={id} style="width: {width}; height: {height}; border: 0;" ', 'src="{[this.deviceUrl(values)]}"></iframe>', "</div>", {
            deviceUrl: function(a) {
                return a.url + "?deviceType=" + (a.device === "tablet" ? "Tablet" : "Phone")
            }
        })
    },
    toHtml: function() {
        return this.tpl.apply(this)
    },
    setDevice: function(b) {
        this.device = b;
        Ext.apply(this, this.getIframeSize())
    },
    setOrientation: function(b) {
        this.orientation = b;
        Ext.apply(this, this.getIframeSize())
    },
    getIframeSize: function() {
        var b = {
            phone: {
                width: "481px",
                height: "320px"
            },
            miniphone: {
                width: "320px",
                height: "219px"
            },
            tablet: {
                width: "717px",
                height: "538px"
            }
        }[this.device];
        if (this.orientation === "landscape") {
            return b
        } else {
            return {
                width: b.height,
                height: b.width
            }
        }
    }
});
Ext.define("Docs.model.Test", {
    extend: "Ext.data.Model",
    fields: ["id", "name", "href", "code", "options", {
        name: "status",
        defaultValue: "ready"
    }, "message"]
});
Ext.define("Docs.view.examples.InlineToolbar", {
    extend: "Ext.toolbar.Toolbar",
    componentCls: "inline-example-tb",
    height: 30,
    initComponent: function() {
        this.addEvents("buttonclick");
        this.items = [{
            iconCls: "code",
            padding: "0 2 0 0",
            margin: "0 3 0 0",
            text: "Code Editor",
            handler: this.createEventFirerer("code")
        }, {
            padding: 0,
            margin: "0 3 0 0",
            iconCls: "preview",
            text: "Live Preview",
            handler: this.createEventFirerer("preview")
        }, "->", {
            padding: 0,
            margin: 0,
            iconCls: "copy",
            text: "Select Code",
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
Ext.define("Docs.view.Signature", {
    singleton: true,
    render: function(f, d) {
        d = d || "short";
        var e = Ext.Array.map(Docs.data.signatures, function(a) {
            return f[a.tagname] ? '<span class="' + a.tagname + '">' + (a[d]) + "</span>" : ""
        }).join(" ");
        return '<span class="signature">' + e + "</span>"
    }
});
Ext.define("Docs.view.DocTree", {
    extend: "Ext.tree.Panel",
    alias: "widget.doctree",
    cls: "doc-tree iScroll",
    useArrows: true,
    rootVisible: false,
    border: false,
    bodyBorder: false,
    initComponent: function() {
        this.addEvents("urlclick");
        this.root.expanded = true;
        this.on("itemclick", this.onItemClick, this);
        this.on("beforeitemcollapse", this.handleBeforeExpandCollapse, this);
        this.on("beforeitemexpand", this.handleBeforeExpandCollapse, this);
        this.callParent();
        this.nodeTpl = new Ext.XTemplate('<a href="{url}" rel="{url}">{text}</a>');
        this.initNodeLinks()
    },
    initNodeLinks: function() {
        this.getRootNode().cascadeBy(this.applyNodeTpl, this)
    },
    applyNodeTpl: function(b) {
        if (b.get("leaf")) {
            b.set("text", this.nodeTpl.apply({
                text: b.get("text"),
                url: b.raw.url
            }));
            b.commit()
        }
    },
    onItemClick: function(h, j, k, l, i) {
        var e = j.raw ? j.raw.url : j.data.url;
        if (e) {
            this.fireEvent("urlclick", e, i)
        } else {
            if (!j.isLeaf()) {
                if (j.isExpanded()) {
                    j.collapse(false)
                } else {
                    j.expand(false)
                }
            }
        }
    },
    selectUrl: function(d) {
        var c = this.findNodeByUrl(d);
        if (c) {
            c.bubble(function(a) {
                a.expand()
            });
            this.getSelectionModel().select(c)
        } else {
            this.getSelectionModel().deselectAll()
        }
    },
    findNodeByUrl: function(b) {
        return this.getRootNode().findChildBy(function(a) {
            return b === a.raw.url
        }, this, true)
    },
    findRecordByUrl: function(d) {
        var c = this.findNodeByUrl(d);
        return c ? c.raw : undefined
    },
    handleBeforeExpandCollapse: function(b) {
        if (this.getView().isAnimating(b)) {
            return false
        }
    }
});
Ext.define("Docs.Tip", {
    singleton: true,
    show: function(g, e, f) {
        f = f || "right";
        this.tips = this.tips || {};
        if (this.tips[f]) {
            var h = this.tips[f];
            h.update(g);
            h.setTarget(e);
            h.show()
        } else {
            var h = this.tips[f] = Ext.create("Ext.tip.ToolTip", {
                anchor: f,
                target: e,
                html: g
            });
            h.show()
        }
    }
});
Ext.define("Docs.view.comments.Pager", {
    extend: "Ext.Component",
    alias: "widget.commentsPager",
    componentCls: "recent-comments-pager",
    afterRender: function() {
        this.callParent(arguments);
        this.getEl().on("click", function() {
            this.fireEvent("loadMore", this.offset + this.limit)
        }, this, {
            preventDefault: true,
            delegate: "a.fetchMoreComments"
        })
    },
    configure: function(b) {
        Ext.apply(this, b);
        this.update(this.getPagerHtml())
    },
    reset: function() {
        this.update("<span></span>No comments found.")
    },
    getPagerHtml: function() {
        var d = this.total_rows || 0;
        var e = this.offset + this.limit;
        var f = Math.min(this.limit, d - e);
        if (d > e) {
            return ["<span></span>", '<a href="#" class="fetchMoreComments" rel="' + e + '">', "Showing comments 1-" + e + " of " + d + ". ", "Click to load " + f + " more...", "</a>"].join("")
        } else {
            return "<span></span>That's all. Total " + d + " comments."
        }
    }
});
Ext.define("Docs.view.SimpleSelectBehavior", {
    mixins: {
        observable: "Ext.util.Observable"
    },
    constructor: function(c, d) {
        this.mixins.observable.constructor.call(this, {
            listeners: d
        });
        c.on({
            select: this.onSelect,
            deselect: this.onDeselect,
            scope: this
        })
    },
    onSelect: function(c, d) {
        this.selectedItem = d;
        this.fireEvent("select", d)
    },
    onDeselect: function(c, d) {
        this.selectedItem = undefined;
        Ext.Function.defer(function() {
            if (!this.selectedItem) {
                this.fireEvent("deselect", d)
            }
        }, 10, this)
    }
});
Ext.define("Docs.view.comments.FilterField", {
    extend: "Ext.form.field.Trigger",
    alias: "widget.commentsFilterField",
    triggerCls: "reset",
    componentCls: "comments-filter-field",
    hideTrigger: true,
    enableKeyEvents: true,
    initComponent: function() {
        this.callParent(arguments);
        this.on({
            keyup: this.onKeyUp,
            specialkey: this.onSpecialKey,
            scope: this
        })
    },
    onKeyUp: function() {
        this.fireEvent("filter", this.getValue());
        this.setHideTrigger(this.getValue().length === 0)
    },
    onSpecialKey: function(c, d) {
        if (d.keyCode === Ext.EventObject.ESC) {
            this.reset();
            this.fireEvent("filter", "")
        }
    },
    onTriggerClick: function() {
        this.reset();
        this.focus();
        this.fireEvent("filter", "");
        this.setHideTrigger(true)
    }
});
Ext.define("Docs.view.comments.TopList", {
    extend: "Ext.panel.Panel",
    componentCls: "comments-toplist",
    requires: ["Docs.view.SimpleSelectBehavior", "Docs.view.comments.FilterField"],
    layout: "border",
    displayField: "text",
    scoreField: "score",
    filterEmptyText: "Filter by name...",
    initComponent: function() {
        this.items = [this.tabpanel = Ext.widget("tabpanel", {
            plain: true,
            region: "north",
            height: 50,
            items: [{
                title: "By comment count"
            }],
            dockedItems: [{
                dock: "bottom",
                items: [{
                    xtype: "commentsFilterField",
                    emptyText: this.filterEmptyText,
                    width: 320,
                    height: 20,
                    listeners: {
                        filter: this.onFilter,
                        scope: this
                    }
                }]
            }]
        }), this.list = Ext.widget("dataview", {
            region: "center",
            cls: "iScroll top-list",
            autoScroll: true,
            store: new Ext.data.Store({
                model: this.model
            }),
            allowDeselect: true,
            tpl: ["<ul>", '<tpl for=".">', "<li>", '<span class="score">{' + this.scoreField + "}</span>", '<span class="text">{' + this.displayField + "}</span>", "</li>", "</tpl>", "</ul>"],
            itemSelector: "li"
        })];
        new Docs.view.SimpleSelectBehavior(this.list, {
            select: this.onSelect,
            deselect: this.onDeselect,
            scope: this
        });
        this.callParent(arguments)
    },
    afterRender: function() {
        this.callParent(arguments);
        this.list.getStore().load()
    },
    onFilter: function(b) {
        this.list.getSelectionModel().deselectAll();
        this.list.getStore().clearFilter(true);
        this.list.getStore().filter({
            property: this.displayField,
            value: b,
            anyMatch: true
        })
    },
    deselectAll: function() {
        this.list.getSelectionModel().deselectAll()
    },
    onSelect: function(b) {
        this.fireEvent("select", b)
    },
    onDeselect: function() {
        this.fireEvent("select", undefined)
    }
});
Ext.define("Docs.view.cls.MemberWrap", {
    constructor: function(b) {
        Ext.apply(this, b);
        this.el = Ext.get(b.el)
    },
    setExpanded: function(b) {
        if (b) {
            if (!this.isExpanded()) {
                this.el.addCls("open")
            }
        } else {
            this.el.removeCls("open")
        }
    },
    isExpanded: function() {
        return this.el.hasCls("open")
    },
    getDefinedIn: function() {
        return this.el.down(".meta .defined-in").getAttribute("rel")
    },
    getMemberId: function() {
        return this.el.getAttribute("id")
    }
});
Ext.define("Docs.view.examples.InlineEditor", {
    extend: "Ext.Panel",
    bodyPadding: 2,
    autoScroll: true,
    componentCls: "inline-example-editor",
    initComponent: function() {
        this.addEvents("init", "change");
        this.on("afterlayout", this.initCodeMirror, this);
        this.callParent(arguments)
    },
    initCodeMirror: function(b) {
        if (!this.codemirror) {
            this.codemirror = CodeMirror(this.body, {
                mode: "javascript",
                indentUnit: 4,
                value: this.value,
                extraKeys: {
                    Tab: "indentMore",
                    "Shift-Tab": "indentLess"
                },
                onChange: Ext.Function.bind(function(a) {
                    this.fireEvent("change")
                }, this)
            });
            this.fireEvent("init")
        }
    },
    refresh: function() {
        this.codemirror.refresh()
    },
    getValue: function() {
        return this.codemirror ? this.codemirror.getValue() : this.value
    },
    getHeight: function() {
        var b = this.el.down(".CodeMirror-lines");
        return b ? b.getHeight() : undefined
    },
    selectAll: function() {
        var d = this.codemirror.lineCount() - 1;
        var c = this.codemirror.getLine(d).length;
        this.codemirror.setSelection({
            line: 0,
            ch: 0
        }, {
            line: d,
            ch: c
        })
    }
});
Ext.define("Docs.view.examples.InlinePreview", {
    extend: "Ext.Panel",
    requires: ["Docs.view.examples.Device"],
    bodyPadding: "0 10",
    statics: {
        iframeCounter: 0,
        getNextIframeId: function() {
            this.iframeCounter++;
            return this.iframeCounter.toString()
        }
    },
    options: {},
    constructor: function(b) {
        debugger
        b = b || {};
        b.iframeId = this.self.getNextIframeId();
        b.id = "inline-preview-" + b.iframeId;
        this.callParent([b]);
        this.addEvents(["previewsuccess", "previewfailure"])
    },
    initComponent: function() {
        debugger
        this.html = this.getHtml();
        this.callParent(arguments)
    },
    getHtml: function() {
        if (Docs.data.touchExamplesUi) {
            return Ext.create("Docs.view.examples.Device", {
                url: "eg-iframe.html",
                id: this.iframeId,
                device: this.options.device,
                orientation: this.options.orientation
            }).toHtml()
        } else {
            var b = new Ext.XTemplate('<iframe id="{id}" style="width: 100%; height: 100%; border: 0" frameBorder="0"></iframe>');
            return b.apply({
                id: this.iframeId
            })
        }
    },
    update: function(h) {
        var f = this.options;
        debugger
        var e = Ext.get(this.iframeId);
        var g = Ext.Function.bind(this.iframeCallback, this);
        if (e) {
            e.on("load", function() {
                Ext.Function.defer(function() {
                    e.dom.contentWindow.loadInlineExample(h + "\n", f, g)
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
Ext.define("Docs.view.cls.Logic", {
    showPrivateClasses: false,
    constructor: function(b) {
        Ext.apply(this, b)
    }
});
Ext.define("Docs.view.comments.Form", {
    extend: "Ext.Component",
    alias: "widget.commentsForm",
    requires: ["Docs.Tip"],
    tpl: ['<form class="commentForm <tpl if="!updateComment">newComment</tpl>">', '<tpl if="title">', "<p>{title}</p>", "</tpl>", "<textarea>{content}</textarea>", '<div class="com-meta">', "{[Docs.Comments.avatar(values.user.emailHash)]}", '<div class="form-author">Logged in as {user.userName}</div>', '<tpl if="!updateComment">', '<label class="subscribe">', 'Email updates? <input type="checkbox" class="subscriptionCheckbox" <tpl if="userSubscribed">checked="checked"</tpl> />', '<span class="sep"> | </span>', "</label>", "</tpl>", '<a href="#" class="toggleCommentGuide">Show help &#8595;</a>', '<input type="submit" class="sub submitComment" value="{[values.updateComment ? "Update" : "Post"]} comment" />', '<tpl if="updateComment">', ' or <a href="#" class="cancelUpdateComment">cancel</a>', "</tpl>", "</div>", '<div class="commentGuideTxt" style="display: none;">', "<ul>", '<li>Use <strong><a href="http://daringfireball.net/projects/markdown/syntax" target="_blank">Markdown</a></strong>', " for formatting:</li>", "</ul>", '<div class="markdown preview">', "<h4>Markdown</h4>", "<pre>", "**Bold**, _italic_\n", "and `monospaced font`.\n", "\n", "    Indent with 4 spaces\n", "    for a code block.\n", "\n", "1. numbered lists\n", "2. are cool\n", "\n", "- bulleted lists\n", "- make your point\n", "\n", "[External link](http//example.com)\n", "\n", "Leave a blank line\n", "between paragraphs.\n", "</pre>", "</div>", '<div class="markdown result">', "<h4>Result</h4>", "<strong>Bold</strong>, <em>italic</em> and<br/>", "<code>monospaced font</code>.<br/>", '<pre class="prettyprint">', "Indent with 4 spaces\n", "for a code block.", "</pre>", "<ol>", "<li>numbered lists</li>", "<li>are cool</li>", "</ol>", "<ul>", "<li>bulleted lists</li>", "<li>make your point</li>", "</ul>", '<a href="http://example.com">External link</a><br/>', "<br/>", "Leave a blank line between paragraphs.<br/><br/>", "</div>", "<ul>", "<li>Use comments to:", "<ul>", "<li>Inform us about <strong>bugs in documentation.</strong></li>", "<li>Give <strong>useful tips</strong> to other developers.</li>", "<li><strong>Warn about bugs</strong> and problems that might bite.</li>", "</ul>", "</li>", "<li>Don't post comments for:", "<ul>", "<li><strong>Questions about code or usage</strong>", ' - use the <a href="http://www.sencha.com/forum" target="_blank">Sencha Forum</a>.</li>', "<li><strong>SDK bugs</strong>", ' - use the <a href="http://www.sencha.com/forum" target="_blank">Sencha Forum</a>.</li>', "<li><strong>Docs App bugs</strong>", ' - use the <a href="https://github.com/senchalabs/jsduck/issues" target="_blank">GitHub Issue tracker</a>.</li>', "</ul></li>", "<li>Comments may be edited or deleted at any time by a moderator.</li>", '<li>Avatars can be managed at <a href="http://www.gravatar.com" target="_blank">Gravatar</a> (use your forum email address).</li>', "<li>To write a reply use <strong><code>@username</code></strong> syntax &ndash; the user will get notified.</li>", "</ul>", "</div>", "</form>"],
    initComponent: function() {
        this.data = {
            title: this.title,
            updateComment: (this.content !== undefined),
            content: this.content,
            userSubscribed: this.userSubscribed,
            user: this.user
        };
        this.callParent(arguments)
    },
    setValue: function(b) {
        this.codeMirror.setValue(b)
    },
    afterRender: function() {
        this.callParent(arguments);
        this.makeCodeMirror(this.getEl().down("textarea").dom);
        this.bindEvents()
    },
    makeCodeMirror: function(d) {
        var c = true;
        this.codeMirror = CodeMirror.fromTextArea(d, {
            mode: "markdown",
            lineWrapping: true,
            indentUnit: 4,
            extraKeys: {
                Tab: "indentMore",
                "Shift-Tab": "indentLess"
            },
            onFocus: Ext.Function.bind(function() {
                if (c && this.codeMirror.getValue() === "") {
                    this.toggleGuide(true)
                }
                c = false
            }, this)
        })
    },
    bindEvents: function() {
        this.getEl().on("click", function() {
            this.toggleGuide()
        }, this, {
            preventDefault: true,
            delegate: "a.toggleCommentGuide"
        });
        this.getEl().on("click", function() {
            this.fireEvent("cancel")
        }, this, {
            preventDefault: true,
            delegate: "a.cancelUpdateComment"
        });
        this.getEl().on("click", function() {
            this.fireEvent("submit", this.codeMirror.getValue())
        }, this, {
            preventDefault: true,
            delegate: "input.submitComment"
        });
        this.getEl().on("click", function(c, d) {
            this.fireEvent("subscriptionChange", Ext.get(d).dom.checked)
        }, this, {
            delegate: "input.subscriptionCheckbox"
        })
    },
    toggleGuide: function(f) {
        var d = this.getEl().down(".commentGuideTxt");
        d.setVisibilityMode(Ext.dom.Element.DISPLAY);
        var e = this.getEl().down(".toggleCommentGuide");
        if (!d.isVisible() || f === true) {
            d.show(true);
            e.update("Hide help &#8593;")
        } else {
            d.hide(true);
            e.update("Show help &#8595;")
        }
    },
    showSubscriptionMessage: function(d) {
        var e = this.getEl().down("input.subscriptionCheckbox");
        var f = d ? "Updates to this thread will be e-mailed to you" : "You have unsubscribed from this thread";
        Docs.Tip.show(f, e, "bottom")
    }
});
Ext.define("Docs.view.comments.DragZone", {
    extend: "Ext.dd.DragZone",
    constructor: function(d, c) {
        this.view = d;
        this.callParent([d.getEl(), c])
    },
    getDragData: function(f) {
        var d = f.getTarget("img.drag-handle", 10);
        if (d) {
            var e = Ext.fly(d).up(this.view.itemSelector).dom;
            return {
                sourceEl: e,
                repairXY: Ext.fly(e).getXY(),
                ddel: this.cloneCommentEl(e),
                comment: this.view.getRecord(e)
            }
        }
        return false
    },
    cloneCommentEl: function(e) {
        var f = e.cloneNode(true);
        var d = Ext.fly(f).down(".comments-list-with-form");
        d && d.remove();
        f.id = Ext.id();
        return f
    },
    getRepairXY: function() {
        return this.dragData.repairXY
    }
});
Ext.define("Docs.view.comments.DropZone", {
    extend: "Ext.dd.DropZone",
    constructor: function(d, c) {
        this.view = d;
        this.callParent([d.getEl(), c])
    },
    getTargetFromEvent: function(b) {
        return b.getTarget(this.view.itemSelector, 10)
    },
    onNodeEnter: function(g, f, h, e) {
        if (this.isValidDropTarget(g, e)) {
            Ext.fly(g).addCls("drop-target-hover")
        }
    },
    onNodeOut: function(g, f, h, e) {
        Ext.fly(g).removeCls("drop-target-hover")
    },
    onNodeOver: function(g, f, h, e) {
        if (this.isValidDropTarget(g, e)) {
            return this.dropAllowed
        } else {
            return false
        }
    },
    isValidDropTarget: function(d, e) {
        var f = this.view.getRecord(d);
        return f && f.get("id") !== e.comment.get("id")
    },
    onNodeDrop: function(g, f, h, e) {
        if (this.isValidDropTarget(g, e)) {
            this.onValidDrop(e.comment, this.view.getRecord(g));
            return true
        }
        return false
    },
    onValidDrop: Ext.emptyFn
});
Ext.define("Docs.view.comments.TopLevelDropZone", {
    extend: "Ext.dd.DropZone",
    getTargetFromEvent: function(b) {
        return b.getTarget("a.side.toggleComments", 10)
    },
    onNodeEnter: function(g, f, h, e) {
        if (this.isValidDropTarget(e)) {
            Ext.fly(g).addCls("drop-target-hover")
        }
    },
    onNodeOut: function(g, f, h, e) {
        Ext.fly(g).removeCls("drop-target-hover")
    },
    onNodeOver: function(g, f, h, e) {
        if (this.isValidDropTarget(e)) {
            return this.dropAllowed
        } else {
            return false
        }
    },
    isValidDropTarget: function(b) {
        return !!b.comment.get("parentId")
    },
    onNodeDrop: function(g, f, h, e) {
        if (this.isValidDropTarget(e)) {
            this.onValidDrop(e.comment, undefined);
            return true
        }
        return false
    },
    onValidDrop: Ext.emptyFn
});
Ext.define("Docs.Comments", {
    extend: "Ext.util.Observable",
    singleton: true,
    requires: ["Docs.Auth", "Docs.CommentCounts", "Docs.CommentSubscriptions", "Ext.data.JsonP", "Ext.Ajax"],
    init: function(c, d) {
        if (!(Docs.data.commentsUrl && Docs.data.commentsDomain && this.isBrowserSupported())) {
            c.call(d);
            return
        }
        Docs.Auth.init(function(a) {
            if (a) {
                this.enabled = true;
                this.fetchCountsAndSubscriptions(function(f, b) {
                    this.counts = new Docs.CommentCounts(f);
                    this.subscriptions = new Docs.CommentSubscriptions(b);
                    c.call(d)
                }, this)
            } else {
                c.call(d)
            }
        }, this)
    },
    isBrowserSupported: function() {
        return ("withCredentials" in new XMLHttpRequest()) || (Ext.ieVersion >= 8)
    },
    fetchCountsAndSubscriptions: function(c, d) {
        this.request("jsonp", {
            url: "/comments_meta",
            method: "GET",
            success: function(a) {
                c.call(d, a.comments, a.subscriptions)
            },
            scope: this
        })
    },
    loadSubscriptions: function(c, d) {
        this.fetchSubscriptions(function(a) {
            this.subscriptions = new Docs.CommentSubscriptions(a);
            c.call(d)
        }, this)
    },
    clearSubscriptions: function() {
        this.subscriptions = new Docs.CommentSubscriptions([])
    },
    fetchSubscriptions: function(c, d) {
        this.request("jsonp", {
            url: "/subscriptions",
            method: "GET",
            success: function(a) {
                c.call(d, a.subscriptions)
            },
            scope: this
        })
    },
    isEnabled: function() {
        return this.enabled
    },
    getCount: function(b) {
        return this.enabled ? this.counts.get(b) : 0
    },
    changeCount: function(f, e) {
        var d = this.counts.change(f, e);
        this.fireEvent("countChange", f, d)
    },
    hasSubscription: function(b) {
        return this.subscriptions.has(b)
    },
    getClassTotalCount: function(b) {
        return this.counts.getClassTotal(b)
    },
    load: function(d, f, e) {
        this.request("jsonp", {
            url: "/comments",
            method: "GET",
            params: {
                startkey: Ext.JSON.encode(d)
            },
            success: f,
            scope: e
        })
    },
    loadReplies: function(f, d, e) {
        this.request("jsonp", {
            url: "/replies",
            method: "GET",
            params: {
                parentId: f
            },
            success: d,
            scope: e
        })
    },
    post: function(b) {
        this.request("ajax", {
            url: "/comments",
            method: "POST",
            params: {
                target: Ext.JSON.encode(b.target),
                parentId: b.parentId,
                comment: b.content,
                url: this.buildPostUrl(b.target)
            },
            callback: function(h, f, a) {
                var g = Ext.JSON.decode(a.responseText);
                if (f && g.success) {
                    this.changeCount(b.target, +1);
                    b.callback && b.callback.call(b.scope, g.comment)
                }
            },
            scope: this
        })
    },
    buildPostUrl: function(i) {
        var f = i[0];
        var g = i[1];
        var h = i[2];
        if (f == "video") {
            var j = "#!/video/" + g
        } else {
            if (f == "guide") {
                var j = "#!/guide/" + g
            } else {
                var j = "#!/api/" + g + (h ? "-" + h : "")
            }
        }
        return "http://" + window.location.host + window.location.pathname + j
    },
    subscribe: function(h, e, g, f) {
        this.request("ajax", {
            url: "/subscribe",
            method: "POST",
            params: {
                target: Ext.JSON.encode(h),
                subscribed: e
            },
            callback: function(c, a, d) {
                var b = Ext.JSON.decode(d.responseText);
                if (a && b.success) {
                    this.subscriptions.set(h, e);
                    g && g.call(f)
                }
            },
            scope: this
        })
    },
    request: function(c, d) {
        d.url = this.buildRequestUrl(d.url);
        if (c === "jsonp") {
            Ext.data.JsonP.request(d)
        } else {
            d.cors = true;
            Ext.Ajax.request(d)
        }
    },
    buildRequestUrl: function(b) {
        b = Docs.data.commentsUrl + "/" + Docs.data.commentsDomain + b;
        return b + (b.match(/\?/) ? "&" : "?") + "sid=" + Docs.Auth.getSid()
    },
    avatar: function(c, d) {
        return '<img class="avatar ' + (d || "") + '" width="25" height="25" src="http://www.gravatar.com/avatar/' + c + '?s=25&amp;r=PG&amp;d=identicon">'
    },
    counterHtml: function(b) {
        return b > 0 ? '<span class="comment-counter-small">' + b + "</span>" : ""
    }
});
Ext.define("Docs.controller.Auth", {
    extend: "Ext.app.Controller",
    requires: ["Docs.Auth", "Docs.Comments"],
    refs: [{
        ref: "authHeaderForm",
        selector: "authHeaderForm"
    }],
    init: function() {
        this.control({
            "authHeaderForm, authForm": {
                login: this.login,
                logout: this.logout
            }
        });
        var b = this.getController("Tabs");
        b.onLaunch = Ext.Function.createSequence(b.onLaunch, this.afterTabsLaunch, this)
    },
    afterTabsLaunch: function() {
        if (Docs.Comments.isEnabled()) {
            if (Docs.Auth.isLoggedIn()) {
                this.setLoggedIn()
            } else {
                this.setLoggedOut()
            }
        }
    },
    login: function(e, g, f, h) {
        Docs.Auth.login({
            username: g,
            password: f,
            remember: h,
            success: this.setLoggedIn,
            failure: function(a) {
                e.showMessage(a)
            },
            scope: this
        })
    },
    logout: function(b) {
        Docs.Auth.logout(this.setLoggedOut, this)
    },
    setLoggedIn: function() {
        Docs.Comments.loadSubscriptions(function() {
            this.getAuthHeaderForm().showLoggedIn(Docs.Auth.getUser());
            this.eachCmp("commentsListWithForm", function(b) {
                b.showCommentingForm()
            });
            this.eachCmp("commentsList", function(b) {
                b.refresh()
            });
            this.getController("Tabs").showCommentsTab()
        }, this)
    },
    setLoggedOut: function() {
        Docs.Comments.clearSubscriptions();
        this.getAuthHeaderForm().showLoggedOut();
        this.eachCmp("commentsListWithForm", function(b) {
            b.showAuthForm()
        });
        this.eachCmp("commentsList", function(b) {
            b.refresh()
        });
        this.getController("Tabs").hideCommentsTab()
    },
    eachCmp: function(e, f, d) {
        Ext.Array.forEach(Ext.ComponentQuery.query(e), f, d)
    }
});
Ext.define("Docs.controller.Welcome", {
    extend: "Docs.controller.Content",
    baseUrl: "#",
    refs: [{
        ref: "viewport",
        selector: "#viewport"
    }, {
        ref: "index",
        selector: "#welcomeindex"
    }],
    init: function() {
        this.addEvents("loadIndex")
    },
    loadIndex: function() {
        this.fireEvent("loadIndex");
        Ext.getCmp("treecontainer").hide();
        this.callParent([true])
    },
    isActive: function() {
        return !!this.getIndex().getTab()
    }
});
Ext.define("Docs.controller.Failure", {
    extend: "Docs.controller.Content",
    baseUrl: "#",
    refs: [{
        ref: "viewport",
        selector: "#viewport"
    }, {
        ref: "index",
        selector: "#failure"
    }],
    show404: function(c) {
        var d = new Ext.XTemplate("<h1>Oops...</h1>", "<p>{msg}</p>", "<p>Maybe it was renamed to something else?<br> Or maybe your internet connection has failed?<br> ", "This would be sad. Hopefully it's just a bug on our side.</p>", "<p>Most likely you just followed a broken link inside this very documentation. ", "Go and report it to the authors of the docs.</p>", "<p>But if you think it's a bug in JSDuck documentation-generator itself, feel free to open ", "an issue at the <a href='https://github.com/senchalabs/jsduck/issues'>JSDuck issue tracker</a>.</p>", "<p>Sorry for all this :(</p>");
        Ext.getCmp("failure").update(d.apply({
            msg: c
        }));
        Ext.getCmp("card-panel").layout.setActiveItem("failure")
    }
});
Ext.define("Docs.controller.Classes", {
    extend: "Docs.controller.Content",
    baseUrl: "#!/api",
    title: "API Documentation",
    requires: ["Docs.History", "Docs.Syntax", "Docs.ClassRegistry"],
    refs: [{
        ref: "viewport",
        selector: "#viewport"
    }, {
        ref: "index",
        selector: "#classindex"
    }, {
        ref: "header",
        selector: "classheader"
    }, {
        ref: "overview",
        selector: "classoverview"
    }, {
        ref: "tabPanel",
        selector: "classtabpanel"
    }, {
        ref: "tree",
        selector: "#classtree"
    }, {
        ref: "favoritesGrid",
        selector: "#favorites-grid"
    }],
    cache: {},
    init: function() {
        this.addEvents("showIndex", "showClass", "showMember");
        Ext.getBody().addListener("click", function(c, d) {
            this.handleUrlClick(decodeURI(d.href), c)
        }, this, {
            preventDefault: true,
            delegate: ".docClass"
        });
        this.control({
            classtree: {
                urlclick: function(d, c) {
                    this.handleUrlClick(d, c, this.getTree())
                }
            },
            toolbar: {
                toggleExpanded: function(b) {
                    this.getOverview().setAllMembersExpanded(b)
                }
            },
            classoverview: {
                afterrender: function(b) {
                    b.el.addListener("click", function(i, k) {
                        var h = Ext.get(k).up(".member"),
                            l = h.down(".meta .defined-in"),
                            j = l.getAttribute("rel"),
                            a = h.getAttribute("id");
                        if (this.getOverview().isMemberExpanded(a)) {
                            this.setExpanded(a, false)
                        } else {
                            this.setExpanded(a, true);
                            this.fireEvent("showMember", j, a)
                        }
                    }, this, {
                        preventDefault: true,
                        delegate: ".expandable"
                    });
                    b.el.addListener("click", Ext.emptyFn, this, {
                        preventDefault: true,
                        delegate: ".not-expandable"
                    })
                }
            },
            treecontainer: {
                afterrender: function(b) {
                    b.el.addListener("dblclick", function() {
                        if (b.getWidth() < 30) {
                            b.setWidth(b.expandedWidth)
                        } else {
                            b.expandedWidth = b.getWidth();
                            b.setWidth(20)
                        }
                    }, this, {
                        delegate: ".x-resizable-handle"
                    })
                }
            },
            doctabs: {
                tabClose: function(b) {
                    this.getOverview().eraseScrollContext(b)
                }
            }
        })
    },
    setExpanded: function(f, d) {
        var e = this.currentCls;
        if (!e.expanded) {
            e.expanded = {}
        }
        this.getOverview().setMemberExpanded(f, d);
        if (d) {
            e.expanded[f] = d
        } else {
            delete e.expanded[f]
        }
    },
    applyExpanded: function(b) {
        Ext.Object.each(b.expanded || {}, function(a) {
            Ext.get(a).addCls("open")
        }, this)
    },
    handleUrlClick: function(d, f, e) {
        d = Docs.History.cleanUrl(d);
        if (this.opensNewWindow(f)) {
            window.open(d);
            e && e.selectUrl(this.currentCls ? "#!/api/" + this.currentCls.name : "")
        } else {
            this.loadClass(d)
        }
    },
    loadIndex: function(b) {
        Ext.getCmp("treecontainer").showTree("classtree");
        this.callParent(arguments);
        this.fireEvent("showIndex")
    },
    loadClass: function(f, i) {
        Ext.getCmp("card-panel").layout.setActiveItem("classcontainer");
        Ext.getCmp("treecontainer").showTree("classtree");
        i || Docs.History.push(f);
        var j = f.match(/^#!\/api\/(.*?)(?:-(.*))?$/);
        var g = Docs.ClassRegistry.canonicalName(j[1]);
        var h = j[2];
        if (this.getOverview()) {
            this.getOverview().setLoading(true)
        }
        if (this.cache[g]) {
            this.showClass(this.cache[g], h)
        } else {
            this.cache[g] = "in-progress";
            Ext.data.JsonP.request({
                url: this.getBaseUrl() + "/output/" + g + ".js",
                callbackName: g.replace(/\./g, "_"),
                success: function(b, a) {
                    this.cache[g] = b;
                    this.showClass(b, h)
                },
                failure: function(b, a) {
                    this.cache[g] = false;
                    this.getOverview().setLoading(false);
                    this.getController("Failure").show404("Class <b>" + Ext.String.htmlEncode(g) + "</b> was not found.")
                },
                scope: this
            })
        }
    },
    showClass: function(e, f) {
        var d = false;
        if (e === "in-progress") {
            return
        }
        this.getOverview().setLoading(false);
        this.getViewport().setPageTitle(e.name);
        if (this.currentCls !== e) {
            this.currentCls = e;
            this.getHeader().load(e);
            this.getOverview().load(e);
            this.applyExpanded(e);
            d = true
        }
        this.currentCls = e;
        this.getOverview().setScrollContext("#!/api/" + e.name);
        if (f) {
            this.getOverview().scrollToEl("#" + f);
            this.fireEvent("showMember", e.name, f)
        } else {
            this.getOverview().restoreScrollState()
        }
        this.getTree().selectUrl("#!/api/" + e.name);
        this.fireEvent("showClass", e.name, {
            reRendered: d
        })
    }
});
Ext.define("Docs.controller.Search", {
    extend: "Ext.app.Controller",
    requires: ["Docs.ClassRegistry", "Docs.GuideSearch", "Docs.store.Search", "Docs.History"],
    stores: ["Search"],
    refs: [{
        ref: "field",
        selector: "#search-field"
    }],
    pageIndex: 0,
    pageSize: 10,
    basicSearchDelay: 50,
    guideSearchDelay: 500,
    dropdownHideDelay: 500,
    init: function() {
        this.control({
            "#search-dropdown": {
                itemclick: function(c, d) {
                    this.loadRecord(d)
                },
                changePage: function(c, d) {
                    this.pageIndex += d;
                    this.displayResults();
                    this.keepDropdown()
                },
                footerClick: function(b) {
                    this.keepDropdown()
                }
            },
            "#search-field": {
                keyup: function(m, l) {
                    var j = this.getDropdown();
                    m.setHideTrigger(m.getValue().length === 0);
                    if (l.keyCode === Ext.EventObject.ESC || !m.value) {
                        j.hide();
                        m.setValue("");
                        return
                    } else {
                        j.show()
                    }
                    var h = j.getSelectionModel();
                    var i = h.getLastSelected();
                    var n = j.store.indexOf(i);
                    var k = j.store.getCount() - 1;
                    if (l.keyCode === Ext.EventObject.UP) {
                        if (n === undefined) {
                            h.select(0)
                        } else {
                            h.select(n === 0 ? k : (n - 1))
                        }
                    } else {
                        if (l.keyCode === Ext.EventObject.DOWN) {
                            if (n === undefined) {
                                h.select(0)
                            } else {
                                h.select(n === k ? 0 : n + 1)
                            }
                        } else {
                            if (l.keyCode === Ext.EventObject.ENTER) {
                                l.preventDefault();
                                i && this.loadRecord(i)
                            } else {
                                this.pageIndex = 0;
                                clearTimeout(this.searchTimeout);
                                this.searchTimeout = Ext.Function.defer(function() {
                                    this.search(m.value)
                                }, this.basicSearchDelay, this)
                            }
                        }
                    }
                },
                focus: function(b) {
                    if (b.value && this.getDropdown().store.getCount() > 0) {
                        this.getDropdown().show()
                    }
                },
                blur: function() {
                    var b = this.getDropdown();
                    this.hideTimeout = Ext.Function.defer(b.hide, this.dropdownHideDelay, b)
                }
            }
        })
    },
    getDropdown: function() {
        return this.dropdown || (this.dropdown = Ext.getCmp("search-dropdown"))
    },
    keepDropdown: function() {
        clearTimeout(this.hideTimeout);
        this.getField().focus()
    },
    loadRecord: function(b) {
        Docs.History.navigate(b.get("url"));
        this.getDropdown().hide()
    },
    search: function(b) {
        if (b === this.previousTerm) {
            return
        }
        this.previousTerm = b;
        this.basicSearch(b);
        if (Docs.GuideSearch.isEnabled()) {
            this.guideSearch(b)
        }
    },
    guideSearch: function(b) {
        Docs.GuideSearch.deferredSearch(b, function(a) {
            this.basicSearch(b, a)
        }, this, this.guideSearchDelay)
    },
    basicSearch: function(c, d) {
        this.displayResults(Docs.ClassRegistry.search(c, d))
    },
    displayResults: function(d) {
        d = d || this.previousResults;
        if (this.pageIndex < 0) {
            this.pageIndex = 0
        } else {
            if (this.pageIndex > Math.floor(d.length / this.pageSize)) {
                this.pageIndex = Math.floor(d.length / this.pageSize)
            }
        }
        var f = this.pageIndex * this.pageSize;
        var e = f + this.pageSize;
        this.getDropdown().setTotal(d.length);
        this.getDropdown().setStart(f);
        this.getDropdown().getStore().loadData(d.slice(f, e));
        this.getDropdown().alignTo("search-field", "bl", [-12, -2]);
        if (d.length > 0) {
            this.getDropdown().getSelectionModel().select(0)
        }
        this.previousResults = d
    }
});
Ext.define("Docs.controller.Examples", {
    extend: "Docs.controller.Content",
    baseUrl: "#!/example",
    title: "Examples",
    refs: [{
        ref: "viewport",
        selector: "#viewport"
    }, {
        ref: "index",
        selector: "#exampleindex"
    }, {
        ref: "tree",
        selector: "#exampletree"
    }, {
        ref: "page",
        selector: "#example"
    }],
    init: function() {
        this.addEvents("showExample");
        this.control({
            "#exampletree": {
                urlclick: function(d, c) {
                    this.loadExample(d)
                }
            },
            "exampleindex > thumblist": {
                urlclick: function(b) {
                    this.loadExample(b)
                }
            },
            "touchexamplecontainer, examplecontainer": {
                afterrender: function(b) {
                    b.el.addListener("click", function(d, a) {
                        this.openInNewWindow()
                    }, this, {
                        delegate: "button.new-window"
                    })
                }
            },
            touchexamplecontainer: {
                afterrender: function(b) {
                    b.el.addListener("click", function(d, a) {
                        this.changeDevice("tablet")
                    }, this, {
                        delegate: "button.tablet"
                    });
                    b.el.addListener("click", function(d, a) {
                        this.changeDevice("phone")
                    }, this, {
                        delegate: "button.phone"
                    });
                    b.el.addListener("click", function(d, a) {
                        this.changeOrientation("portrait")
                    }, this, {
                        delegate: "button.portrait"
                    });
                    b.el.addListener("click", function(d, a) {
                        this.changeOrientation("landscape")
                    }, this, {
                        delegate: "button.landscape"
                    })
                }
            }
        })
    },
    loadIndex: function() {
        Ext.getCmp("treecontainer").showTree("exampletree");
        this.callParent()
    },
    loadExample: function(d, f) {
        var e = this.getExample(d);
        if (!e) {
            this.getController("Failure").show404("Example <b>" + Ext.String.htmlEncode(d) + "</b> was not found.");
            return
        }
        this.getViewport().setPageTitle(e.text);
        if (this.activeUrl !== d) {
            this.getPage().clear();
            this.activateExampleCard();
            this.getPage().load(e)
        } else {
            this.activateExampleCard()
        }
        f || Docs.History.push(d);
        this.fireEvent("showExample", d);
        this.getTree().selectUrl(d);
        this.activeUrl = d
    },
    activateExampleCard: function() {
        Ext.getCmp("card-panel").layout.setActiveItem("example");
        Ext.getCmp("treecontainer").showTree("exampletree")
    },
    getExample: function(b) {
        if (!this.map) {
            this.map = {};
            Ext.Array.forEach(Docs.data.examples, function(a) {
                Ext.Array.forEach(a.items, function(d) {
                    this.map["#!/example/" + d.name] = d
                }, this)
            }, this)
        }
        return this.map[b]
    },
    changeOrientation: function(b) {
        this.getPage().setOrientation(b)
    },
    changeDevice: function(b) {
        this.getPage().setDevice(b)
    },
    openInNewWindow: function() {
        window.open(this.getExample(this.activeUrl).url)
    }
});
Ext.define("Docs.controller.Guides", {
    extend: "Docs.controller.Content",
    baseUrl: "#!/guide",
    title: "Guides",
    refs: [{
        ref: "viewport",
        selector: "#viewport"
    }, {
        ref: "index",
        selector: "#guideindex"
    }, {
        ref: "tree",
        selector: "#guidetree"
    }, {
        ref: "guide",
        selector: "#guide"
    }],
    cache: {},
    init: function() {
        this.addEvents("showGuide");
        this.control({
            "#guidetree": {
                urlclick: function(d, c) {
                    this.handleUrlClick(d, c, this.getTree())
                }
            },
            "guideindex > thumblist": {
                urlclick: function(b) {
                    this.loadGuide(b)
                }
            },
            indexcontainer: {
                afterrender: function(b) {
                    b.el.addListener("click", function(d, a) {
                        this.handleUrlClick(a.href, d)
                    }, this, {
                        preventDefault: true,
                        delegate: ".guide"
                    })
                }
            },
            doctabs: {
                tabClose: function(b) {
                    this.getGuide().eraseScrollContext(b)
                }
            }
        })
    },
    handleUrlClick: function(d, f, e) {
        d = d.replace(/.*#!?/, "#!");
        if (this.opensNewWindow(f)) {
            window.open(d);
            e && e.selectUrl(this.activeUrl ? this.activeUrl : "")
        } else {
            this.loadGuide(d)
        }
    },
    loadIndex: function() {
        Ext.getCmp("treecontainer").showTree("guidetree");
        this.callParent()
    },
    loadGuide: function(j, h) {
        Ext.getCmp("card-panel").layout.setActiveItem("guide");
        Ext.getCmp("treecontainer").showTree("guidetree");
        var g = j.match(/^#!\/guide\/(.*?)(-section-.*)?$/);
        var f = g[1];
        var i = g[2];
        j = "#!/guide/" + f;
        h || Docs.History.push(j);
        if (this.cache[f]) {
            this.showGuide(this.cache[f], j, f, i)
        } else {
            this.cache[f] = "in-progress";
            Ext.data.JsonP.request({
                url: this.getBaseUrl() + "/guides/" + f + "/README.js",
                callbackName: f,
                success: function(a) {
                    this.cache[f] = a;
                    this.showGuide(a, j, f, i)
                },
                failure: function(b, a) {
                    this.cache[f] = false;
                    this.getController("Failure").show404("Guide <b>" + Ext.String.htmlEncode(f) + "</b> was not found.")
                },
                scope: this
            })
        }
    },
    showGuide: function(i, j, f, h) {
        var g = false;
        if (i === "in-progress") {
            return
        }
        this.getViewport().setPageTitle(i.title);
        if (this.activeUrl !== j) {
            Ext.getCmp("guide").load({
                name: f,
                content: i.guide
            });
            g = true
        }
        this.activeUrl = j;
        this.getGuide().setScrollContext(this.activeUrl);
        if (h) {
            this.getGuide().scrollToEl(f + h)
        } else {
            this.getGuide().restoreScrollState()
        }
        this.fireEvent("showGuide", f, {
            reRendered: g
        });
        this.getTree().selectUrl(j)
    }
});
Ext.define("Docs.controller.Videos", {
    extend: "Docs.controller.Content",
    baseUrl: "#!/video",
    title: "Videos",
    refs: [{
        ref: "viewport",
        selector: "#viewport"
    }, {
        ref: "index",
        selector: "#videoindex"
    }, {
        ref: "tree",
        selector: "#videotree"
    }],
    init: function() {
        this.addEvents("showVideo");
        this.control({
            "#videotree": {
                urlclick: function(b) {
                    this.loadVideo(b)
                }
            },
            "videoindex > thumblist": {
                urlclick: function(b) {
                    this.loadVideo(b)
                }
            }
        })
    },
    loadIndex: function() {
        Ext.getCmp("treecontainer").showTree("videotree");
        this.callParent()
    },
    loadVideo: function(j, h) {
        var f = false;
        Ext.getCmp("card-panel").layout.setActiveItem("video");
        Ext.getCmp("treecontainer").showTree("videotree");
        var g = j.match(/^#!\/video\/(.*)$/)[1];
        var i = this.getVideo(g);
        if (!i) {
            this.getController("Failure").show404("Video <b>" + Ext.String.htmlEncode(g) + "</b> was not found.");
            return
        }
        this.getViewport().setPageTitle(i.title);
        if (this.activeUrl !== j) {
            Ext.getCmp("video").load(i);
            f = true
        }
        h || Docs.History.push(j);
        this.fireEvent("showVideo", g, {
            reRendered: f
        });
        this.getTree().selectUrl(j);
        this.activeUrl = j
    },
    getVideo: function(b) {
        if (!this.map) {
            this.map = {};
            Ext.Array.forEach(Docs.data.videos, function(a) {
                Ext.Array.forEach(a.items, function(d) {
                    this.map[d.name] = d
                }, this)
            }, this)
        }
        return this.map[b]
    }
});
Ext.define("Docs.controller.CommentCounts", {
    extend: "Ext.app.Controller",
    requires: ["Docs.Comments"],
    refs: [{
        ref: "class",
        selector: "classoverview"
    }, {
        ref: "classIndex",
        selector: "#classindex"
    }, {
        ref: "guide",
        selector: "#guide"
    }, {
        ref: "guideIndex",
        selector: "#guideindex"
    }, {
        ref: "video",
        selector: "#video"
    }, {
        ref: "videoIndex",
        selector: "#videoindex"
    }],
    init: function() {
        Docs.Comments.on("countChange", this.updateCounts, this)
    },
    updateCounts: function(c, d) {
        this.getClass().updateCommentCounts();
        this.getClassIndex().updateCommentCounts();
        this.getGuide().updateCommentCounts();
        this.getGuideIndex().updateCommentCounts();
        this.getVideo().updateCommentCounts();
        this.getVideoIndex().updateCommentCounts()
    }
});
Ext.define("Docs.controller.Tests", {
    extend: "Docs.controller.Content",
    baseUrl: "#!/tests",
    refs: [{
        ref: "viewport",
        selector: "#viewport"
    }, {
        ref: "index",
        selector: "#testsindex"
    }],
    init: function() {
        this.addEvents("loadIndex");
        this.control({
            "#testsgrid": {
                afterrender: this.loadExamples
            }
        })
    },
    loadIndex: function() {
        this.fireEvent("loadIndex");
        Ext.getCmp("treecontainer").hide();
        this.callParent([true])
    },
    isActive: function() {
        return !!this.getIndex().getTab()
    },
    loadExamples: function() {
        this.getIndex().disable();
        Ext.data.JsonP.request({
            url: this.getBaseUrl() + "/inline-examples.js",
            callbackName: "__inline_examples__",
            success: function(b) {
                this.getIndex().addExamples(b);
                this.getIndex().enable()
            },
            scope: this
        })
    }
});
Ext.define("Docs.store.Settings", {
    extend: "Ext.data.Store",
    requires: ["Docs.model.Setting"],
    model: "Docs.model.Setting"
});
Ext.define("Docs.Settings", {
    extend: "Docs.LocalStore",
    singleton: true,
    requires: "Docs.store.Settings",
    storeName: "Docs.store.Settings",
    defaults: {
        show: {
            "public": true,
            "protected": false,
            "private": false,
            deprecated: false,
            removed: false,
            inherited: true,
            accessor: true
        },
        comments: {
            hideRead: false
        },
        showPrivateClasses: false,
        classTreeLogic: "PackageLogic"
    },
    set: function(d, f) {
        var e = this.store.findExact("key", d);
        if (e > -1) {
            this.store.removeAt(e)
        }
        this.store.add({
            key: d,
            value: f
        });
        this.syncStore()
    },
    get: function(c) {
        var d = this.store.findExact("key", c);
        return d > -1 ? this.store.getAt(d).get("value") : this.defaults[c]
    }
});
Ext.define("Docs.controller.Tabs", {
    extend: "Ext.app.Controller",
    requires: ["Docs.History", "Docs.Settings"],
    refs: [{
        ref: "welcomeIndex",
        selector: "#welcomeindex"
    }, {
        ref: "classIndex",
        selector: "#classindex"
    }, {
        ref: "guideIndex",
        selector: "#guideindex"
    }, {
        ref: "videoIndex",
        selector: "#videoindex"
    }, {
        ref: "exampleIndex",
        selector: "#exampleindex"
    }, {
        ref: "testsIndex",
        selector: "#testsindex"
    }, {
        ref: "commentIndex",
        selector: "#commentindex"
    }, {
        ref: "classTree",
        selector: "#classtree"
    }, {
        ref: "guideTree",
        selector: "#guidetree"
    }, {
        ref: "exampleTree",
        selector: "#exampletree"
    }, {
        ref: "videoTree",
        selector: "#videotree"
    }, {
        ref: "doctabs",
        selector: "#doctabs"
    }],
    init: function() {
        this.getController("Classes").addListener({
            showClass: function(b) {
                this.addTabFromTree("#!/api/" + b)
            },
            scope: this
        });
        this.getController("Guides").addListener({
            showGuide: function(b) {
                this.addTabFromTree("#!/guide/" + b)
            },
            scope: this
        });
        this.getController("Examples").addListener({
            showExample: function(b) {
                this.addTabFromTree(b)
            },
            scope: this
        });
        this.getController("Videos").addListener({
            showVideo: function(b) {
                this.addTabFromTree("#!/video/" + b)
            },
            scope: this
        });
        this.control({
            "[componentCls=doctabs]": {
                tabActivate: function(d, c) {
                    Docs.History.push(d, c)
                },
                scope: this
            }
        })
    },
    onLaunch: function() {
        this.getDoctabs().setStaticTabs(Ext.Array.filter([this.getWelcomeIndex().getTab(), this.getClassIndex().getTab(), this.getGuideIndex().getTab(), this.getVideoIndex().getTab(), this.getExampleIndex().getTab(), this.getTestsIndex().getTab()], function(a) {
            return a
        }));
        this.commentsTab = this.getCommentIndex().getTab();
        var b = Docs.Settings.get("tabs");
        if (b) {
            Ext.Array.forEach(b, function(a) {
                this.addTabFromTree(a, {
                    animate: false
                })
            }, this)
        }
        Docs.History.notifyTabsLoaded()
    },
    showCommentsTab: function() {
        var b = this.getDoctabs().getStaticTabs();
        this.getDoctabs().setStaticTabs(b.concat(this.commentsTab))
    },
    hideCommentsTab: function() {
        var b = this.getDoctabs().getStaticTabs();
        this.getDoctabs().setStaticTabs(Ext.Array.remove(b, this.commentsTab))
    },
    addTabFromTree: function(h, g) {
        var e = this.getTree(h);
        var f = e.findRecordByUrl(h);
        if (f) {
            this.addTab(f, g)
        }
    },
    addTab: function(d, c) {
        c = c || {
            animate: true,
            activate: true
        };
        this.getDoctabs().addTab({
            href: d.url,
            text: d.text,
            iconCls: d.iconCls
        }, c)
    },
    getTree: function(b) {
        if (/#!?\/api/.test(b)) {
            return this.getClassTree()
        } else {
            if (/#!?\/guide/.test(b)) {
                return this.getGuideTree()
            } else {
                if (/#!?\/video/.test(b)) {
                    return this.getVideoTree()
                } else {
                    if (/#!?\/example/.test(b)) {
                        return this.getExampleTree()
                    } else {
                        return this.getClassTree()
                    }
                }
            }
        }
    }
});
Ext.define("Docs.controller.Comments", {
    extend: "Docs.controller.Content",
    baseUrl: "#!/comment",
    title: "Comments",
    requires: ["Docs.Settings", "Docs.Comments"],
    refs: [{
        ref: "viewport",
        selector: "#viewport"
    }, {
        ref: "index",
        selector: "#commentindex"
    }, {
        ref: "commentsFullList",
        selector: "commentsFullList"
    }],
    recentCommentsSettings: {},
    init: function() {
        this.control({
            commentsFullList: {
                hideReadChange: function() {
                    this.fetchRecentComments()
                },
                sortOrderChange: function(b) {
                    this.recentCommentsSettings.sortByScore = (b === "votes");
                    this.fetchRecentComments()
                }
            },
            commentsPager: {
                loadMore: function(b) {
                    this.fetchRecentComments(b)
                }
            },
            commentsUsers: {
                select: function(b) {
                    this.recentCommentsSettings.username = b;
                    this.fetchRecentComments()
                }
            },
            commentsTargets: {
                select: function(b) {
                    this.recentCommentsSettings.targetId = b && b.get("id");
                    this.fetchRecentComments()
                }
            },
            commentsTags: {
                select: function(b) {
                    this.recentCommentsSettings.tagname = b && b.get("tagname");
                    this.fetchRecentComments()
                }
            }
        })
    },
    loadIndex: function() {
        this.fireEvent("loadIndex");
        Ext.getCmp("treecontainer").hide();
        if (!this.recentComments) {
            this.fetchRecentComments();
            this.recentComments = true
        }
        this.callParent([true])
    },
    fetchRecentComments: function(f) {
        var e = Docs.Settings.get("comments");
        var d = {
            offset: f || 0,
            limit: 100,
            hideRead: e.hideRead ? 1 : undefined,
            sortByScore: this.recentCommentsSettings.sortByScore ? 1 : undefined,
            username: this.recentCommentsSettings.username,
            targetId: this.recentCommentsSettings.targetId,
            tagname: this.recentCommentsSettings.tagname
        };
        this.getCommentsFullList().setMasked(true);
        Docs.Comments.request("jsonp", {
            url: "/comments_recent",
            method: "GET",
            params: d,
            success: function(a) {
                this.getCommentsFullList().setMasked(false);
                var b = f > 0;
                this.getCommentsFullList().load(a, b)
            },
            scope: this
        })
    }
});
Ext.define("Docs.view.Tabs", {
    extend: "Ext.container.Container",
    alias: "widget.doctabs",
    id: "doctabs",
    componentCls: "doctabs",
    requires: ["Docs.History", "Docs.ClassRegistry", "Docs.view.TabMenu"],
    minTabWidth: 80,
    maxTabWidth: 160,
    animDuration: 150,
    tabs: [],
    tabsInBar: [],
    tabCache: {},
    staticTabs: [],
    initComponent: function() {
        this.addEvents("tabActivate", "tabClose");
        this.tpl = Ext.create("Ext.XTemplate", '<tpl for=".">', '<div class="doctab overview {cls}{active}">', '<div class="l"></div>', '<div class="m">', '<tpl if="text">', '<a class="tabUrl ov-tab-text" href="{href}">{text}</a>', "<tpl else>", '<a class="tabUrl ov-tab" href="{href}">&nbsp;</a>', "</tpl>", "</div>", '<div class="r"></div>', "</div>", "</tpl>", '<div style="float: left; width: 8px">&nbsp;</div>', '<div class="tab-overflow"></div>');
        this.html = this.tpl.applyTemplate(this.staticTabs);
        this.tabTpl = Ext.create("Ext.XTemplate", '<div class="doctab', '{[values.active ? (" active") : ""]}', '" style="', '{[values.width ? ("width: " + values.width + "px;") : ""]}', '{[values.visible ? "" : "visibility: hidden;"]}">', '<div class="l"></div>', '<div class="m">', '<span class="icn {iconCls}">&nbsp;</span>', '<a class="tabUrl main-tab" href="{href}">{text}</a>', "</div>", '<div class="r"><a class="close" href="#">&nbsp;</a></div>', "</div>");
        this.on("afterrender", this.initListeners, this);
        this.on("resize", this.refresh, this);
        this.callParent()
    },
    initListeners: function() {
        this.el.on("mouseover", function(c, d) {
            Ext.get(d).addCls("ovr")
        }, this, {
            delegate: ".close"
        });
        this.el.on("mouseout", function(c, d) {
            Ext.get(d).removeCls("ovr")
        }, this, {
            delegate: ".close"
        });
        this.el.on("click", function(f, d) {
            var e = Ext.get(d).up(".doctab").down(".tabUrl").getAttribute("href");
            e = Docs.History.cleanUrl(e);
            this.removeTab(e);
            this.fireEvent("tabClose", e)
        }, this, {
            delegate: ".close",
            preventDefault: true
        });
        this.el.on("click", function(f, d) {
            if (Ext.fly(f.getTarget()).hasCls("close")) {
                return
            }
            var e = Ext.get(d).down(".tabUrl").getAttribute("href");
            this.fireEvent("tabActivate", e, {
                navigate: true
            })
        }, this, {
            delegate: ".doctab"
        });
        this.el.on("contextmenu", function(c, d) {
            if (!Ext.get(d).hasCls("overview")) {
                this.createMenu().showBy(d)
            }
        }, this, {
            delegate: ".doctab",
            preventDefault: true
        });
        this.el.on("click", Ext.emptyFn, this, {
            delegate: ".tabUrl",
            preventDefault: true
        });
        this.el.on("mouseleave", function() {
            if (this.shouldResize) {
                this.resizeTabs({
                    animate: true
                })
            }
        }, this)
    },
    setStaticTabs: function(b) {
        this.staticTabs = b;
        this.refresh()
    },
    getStaticTabs: function(b) {
        return this.staticTabs
    },
    addTab: function(d, c) {
        d = this.formatTabTexts(d);
        this.tabCache[d.href] = d;
        if (!this.hasTab(d.href)) {
            this.tabs.push(d.href);
            if (this.roomForNewTab()) {
                this.addTabToBar(d, c)
            }
            this.addTabToMenu(this.overflowButton.menu, d)
        }
        if (c.activate) {
            this.activateTab(d.href)
        }
        this.saveTabs()
    },
    formatTabTexts: function(c) {
        if (/#!?\/api\//.test(c.href)) {
            var d = c.href.replace(/^.*#!?\/api\//, "");
            c.text = Docs.ClassRegistry.shortName(d);
            c.tooltip = d
        } else {
            c.tooltip = c.text
        }
        return c
    },
    removeTab: function(d) {
        if (!this.hasTab(d)) {
            return
        }
        this.removeFromArray(this.tabs, d);
        var e = this.removeFromArray(this.tabsInBar, d);
        var f = this.tabs[this.tabsInBar.length];
        if (f) {
            this.tabsInBar.push(f)
        }
        if (this.activeTab === d) {
            if (this.tabs.length === 0) {
                Docs.App.getController(this.getControllerName(d)).loadIndex()
            } else {
                if (e === this.tabs.length) {
                    e -= 1
                }
                this.activateTab(this.tabs[e]);
                this.fireEvent("tabActivate", this.tabs[e])
            }
        }
        if (this.tabs.length >= this.maxTabsInBar()) {
            this.refresh()
        } else {
            this.removeTabFromBar(d)
        }
        this.saveTabs()
    },
    removeFromArray: function(f, d) {
        var e = Ext.Array.indexOf(f, d);
        if (e !== -1) {
            Ext.Array.erase(f, e, 1)
        }
        return e
    },
    activateTab: function(d) {
        this.activeTab = d;
        if (!this.inTabs(d)) {
            this.swapLastTabWith(d)
        }
        Ext.Array.each(Ext.query(".doctab a.tabUrl"), function(a) {
            Ext.get(a).up(".doctab").removeCls(["active", "highlight"])
        });
        var e = Ext.query('.doctab a[href="' + d + '"]')[0];
        if (e) {
            var f = Ext.get(e).up(".doctab");
            f.addCls("active")
        }
        this.highlightOverviewTab(d)
    },
    refresh: function() {
        var i = this.tpl.applyTemplate(this.staticTabs);
        var f = this.maxTabsInBar() < this.tabs.length ? this.maxTabsInBar() : this.tabs.length;
        this.tabsInBar = this.tabs.slice(0, f);
        for (var j = 0; j < f; j++) {
            var h = this.tabCache[this.tabs[j]];
            var g = Ext.apply(h, {
                visible: true,
                active: this.activeTab === h.href,
                width: this.tabWidth()
            });
            i += this.tabTpl.applyTemplate(g)
        }
        this.el.dom.innerHTML = i;
        if (this.activeTab && this.activeTab !== this.tabs[f - 1]) {
            this.activateTab(this.activeTab);
            this.fireEvent("tabActivate", this.activeTab)
        }
        this.highlightOverviewTab(this.activeTab);
        this.createOverflowButton();
        this.addToolTips()
    },
    closeAllTabs: function() {
        if (this.inTabBar(this.activeTab)) {
            this.tabs = this.tabsInBar = [this.activeTab]
        } else {
            this.tabs = this.tabsInBar = []
        }
        this.refresh();
        this.saveTabs()
    },
    tabData: function() {
        return Ext.Array.map(this.tabs, function(b) {
            return this.tabCache[b]
        }, this)
    },
    roomForNewTab: function() {
        return this.tabsInBar.length < this.maxTabsInBar()
    },
    hasTab: function(b) {
        return Ext.Array.contains(this.tabs, b)
    },
    addTabToBar: function(e, d) {
        this.tabsInBar.push(e.href);
        var f = Ext.get(this.tabTpl.append(this.el.dom, e));
        this.addMainTabTooltip(f, e);
        if (d.animate && !Ext.isIE) {
            f.setStyle("width", "10px");
            f.setStyle({
                visibility: "visible"
            });
            f.animate({
                to: {
                    width: this.tabWidth()
                }
            })
        } else {
            f.setStyle({
                visibility: "visible"
            })
        }
        this.resizeTabs(d)
    },
    inTabBar: function(b) {
        return Ext.Array.contains(this.tabsInBar, b)
    },
    inTabs: function(d) {
        var c = Ext.Array.pluck(this.staticTabs, "href").concat(this.tabsInBar);
        return Ext.Array.contains(c, d)
    },
    removeTabFromBar: function(d) {
        var c = this.getTabEl(d);
        c.dom.removed = true;
        if (Ext.isIE) {
            c.remove();
            this.createOverflowButton()
        } else {
            c.animate({
                to: {
                    top: 30
                },
                duration: this.animDuration
            }).animate({
                to: {
                    width: 10
                },
                duration: this.animDuration,
                listeners: {
                    afteranimate: function() {
                        c.remove();
                        this.shouldResize = true;
                        this.createOverflowButton()
                    },
                    scope: this
                }
            })
        }
    },
    swapLastTabWith: function(d) {
        var e = this.getTabEl(this.tabsInBar[this.tabsInBar.length - 1]);
        if (e) {
            var f = this.tabTpl.append(document.body, this.tabCache[d]);
            e.dom.parentNode.replaceChild(f, e.dom);
            this.tabsInBar[this.tabsInBar.length - 1] = d;
            Ext.get(f).setStyle({
                visibility: "visible",
                width: String(this.tabWidth()) + "px"
            });
            this.addMainTabTooltip(f, this.tabCache[d])
        }
    },
    highlightOverviewTab: function(d) {
        var c = Ext.query(".doctab." + this.getControllerName(d).toLowerCase());
        if (c && c[0]) {
            Ext.get(c[0]).addCls("highlight")
        }
    },
    maxTabsInBar: function() {
        return Math.floor(this.tabBarWidth() / this.minTabWidth)
    },
    tabWidth: function() {
        var b = Math.floor(this.tabBarWidth() / this.tabsInBar.length) + 6;
        if (b > this.maxTabWidth) {
            return this.maxTabWidth
        } else {
            if (b < this.minTabWidth) {
                return this.minTabWidth
            } else {
                return b
            }
        }
    },
    tabBarWidth: function() {
        return this.getWidth() - (this.staticTabs.length * 50) - 15
    },
    resizeTabs: function(b) {
        this.shouldResize = false;
        Ext.Array.each(Ext.query(".doctab"), function(a) {
            var d = Ext.get(a);
            if (!d.dom.removed && !d.hasCls("overview")) {
                if (b && b.animate && !Ext.isIE) {
                    d.animate({
                        to: {
                            width: this.tabWidth()
                        }
                    })
                } else {
                    d.setWidth(this.tabWidth())
                }
            }
        }, this)
    },
    getTabEl: function(c) {
        var d = Ext.query('.doctab a[href="' + c + '"]');
        if (d && d[0]) {
            return Ext.get(d[0]).up(".doctab")
        }
    },
    createOverflowButton: function() {
        if (this.overflowButton) {
            this.overflowButton.destroy()
        }
        this.overflowButton = Ext.create("Ext.button.Button", {
            baseCls: "",
            renderTo: this.getEl().down(".tab-overflow"),
            menu: this.createMenu()
        })
    },
    createMenu: function() {
        var b = new Docs.view.TabMenu({
            listeners: {
                closeAllTabs: this.closeAllTabs,
                tabItemClick: function(a) {
                    this.fireEvent("tabActivate", a.href, {
                        navigate: true
                    })
                },
                scope: this
            }
        });
        Ext.Array.each(this.tabs, function(a) {
            this.addTabToMenu(b, this.tabCache[a])
        }, this);
        return b
    },
    addTabToMenu: function(g, h) {
        var f = Ext.Array.indexOf(this.tabs, h.href);
        if (this.tabs.length > this.tabsInBar.length && f === this.maxTabsInBar()) {
            g.addTabCls(h, "overflow")
        }
        var e = this.inTabBar(h.href);
        g.addTab(h, e ? "" : "overflow")
    },
    addToolTips: function() {
        Ext.Array.each(this.staticTabs, function(c) {
            var d = Ext.get(Ext.query(".doctab." + c.cls)[0]);
            if (d) {
                Ext.create("Ext.tip.ToolTip", {
                    target: d,
                    html: c.tooltip
                })
            }
        });
        Ext.Array.each(this.tabsInBar, function(e) {
            var f = Ext.get(Ext.query('a.main-tab[href="' + e + '"]')[0]);
            var d = this.tabCache[e];
            if (f) {
                this.addMainTabTooltip(f.up(".doctab"), d)
            }
        }, this)
    },
    addMainTabTooltip: function(c, d) {
        if (d.tooltip) {
            Ext.create("Ext.tip.ToolTip", {
                target: c,
                html: d.tooltip
            })
        }
    },
    saveTabs: function() {
        Docs.Settings.set("tabs", this.tabs)
    },
    getControllerName: function(b) {
        if (/#!?\/api/.test(b)) {
            return "Classes"
        } else {
            if (/#!?\/guide/.test(b)) {
                return "Guides"
            } else {
                if (/#!?\/video/.test(b)) {
                    return "Videos"
                } else {
                    if (/#!?\/example/.test(b)) {
                        return "Examples"
                    } else {
                        if (/#!?\/tests/.test(b)) {
                            return "Tests"
                        } else {
                            if (/#!?\/comment/.test(b)) {
                                return "Comments"
                            } else {
                                return "Index"
                            }
                        }
                    }
                }
            }
        }
    }
});
Ext.define("Docs.view.welcome.Index", {
    extend: "Ext.container.Container",
    alias: "widget.welcomeindex",
    mixins: ["Docs.view.Scrolling"],
    requires: ["Docs.ContentGrabber"],
    cls: "welcome iScroll",
    initComponent: function() {
        this.html = Docs.ContentGrabber.get("welcome-content");
        this.hasContent = !!this.html;
        this.callParent(arguments)
    },
    getTab: function() {
        return this.hasContent ? {
            cls: "index",
            href: "#",
            tooltip: "Home"
        } : false
    }
});
Ext.define("Docs.view.cls.Index", {
    extend: "Ext.container.Container",
    alias: "widget.classindex",
    requires: ["Docs.ContentGrabber", "Docs.Comments"],
    mixins: ["Docs.view.Scrolling"],
    cls: "class-categories iScroll",
    margin: "15 10",
    autoScroll: true,
    initComponent: function() {
        this.tpl = new Ext.XTemplate('<h1 class="top" style="padding-bottom: 10px">API Documentation</h1>', '<tpl if="notice">', '<div class="notice">{notice}</div>', "</tpl>", "{categories}", "{news}");
        this.data = {
            notice: Docs.data.message || Docs.ContentGrabber.get("notice-text"),
            categories: Docs.ContentGrabber.get("categories-content"),
            news: Docs.ContentGrabber.get("news-content")
        };
        this.callParent(arguments)
    },
    afterRender: function() {
        this.callParent(arguments);
        if (!Docs.Comments.isEnabled()) {
            return
        }
        this.initComments()
    },
    initComments: function() {
        this.getEl().select("a.docClass").each(function(a) {
            var f = a.getHTML();
            var e = Docs.Comments.getClassTotalCount(f);
            if (e) {
                Ext.DomHelper.append(a, Docs.Comments.counterHtml(e))
            }
        }, this)
    },
    updateCommentCounts: function() {
        if (!this.getEl()) {
            return
        }
        this.getEl().select(".comment-counter-small").remove();
        this.initComments()
    },
    getTab: function() {
        var b = (Docs.data.classes || []).length > 0;
        return b ? {
            cls: "classes",
            href: "#!/api",
            tooltip: "API Documentation"
        } : false
    }
});
Ext.define("Docs.view.examples.TouchContainer", {
    extend: "Ext.panel.Panel",
    alias: "widget.touchexamplecontainer",
    requires: ["Docs.view.examples.Device"],
    layout: "fit",
    cls: "example-container iScroll",
    autoScroll: true,
    bodyPadding: "10 0 5 0",
    initComponent: function() {
        this.dockedItems = [{
            xtype: "container",
            dock: "top",
            html: ['<h1 class="example-title">Example</h1>', '<div class="cls-grouping example-toolbar">', '<div class="devices">', '<button class="phone selected">Phone</button>', '<button class="tablet">Tablet</button>', "</div>", '<span class="separator">&nbsp;</span>', '<div class="orientations">', '<button class="landscape selected">Landscape</button>', '<button class="portrait">Portrait</button>', "</div>", "<div>", '<button class="new-window">Open in new window</button>', "</div>", "</div>"].join("")
        }];
        this.callParent(arguments)
    },
    load: function(b) {
        this.title = b.title + " Example";
        this.device = Ext.create("Docs.view.examples.Device", {
            url: b.url,
            device: b.device || "phone",
            orientation: b.orientation || "landscape"
        });
        this.refresh()
    },
    refresh: function() {
        this.update(this.device.toHtml());
        this.updateScale();
        this.updateTitle();
        this.updateButtons()
    },
    setDevice: function(b) {
        this.device.setDevice(b);
        this.refresh()
    },
    setOrientation: function(b) {
        this.device.setOrientation(b);
        this.refresh()
    },
    updateScale: function() {
        var b = Ext.query("iframe", this.el.dom)[0];
        if (b) {
            b.onload = Ext.Function.bind(function() {
                var d = document.createElement("style");
                var a = "html { overflow: hidden }";
                if (this.device.getDevice() === "tablet") {
                    a += "body { font-size: 79.8% !important; }"
                }
                d.innerHTML = a;
                b.contentWindow.document.body.appendChild(d)
            }, this)
        }
    },
    updateTitle: function() {
        Ext.get(Ext.query(".example-title")).update(this.title)
    },
    updateButtons: function() {
        Ext.Array.each(Ext.query(".example-toolbar .orientations button"), function(b) {
            Ext.get(b).removeCls("selected")
        });
        Ext.get(Ext.query(".example-toolbar .orientations button." + this.device.getOrientation())).addCls("selected");
        Ext.Array.each(Ext.query(".example-toolbar .devices button"), function(b) {
            Ext.get(b).removeCls("selected")
        });
        Ext.get(Ext.query(".example-toolbar .devices button." + this.device.getDevice())).addCls("selected")
    },
    clear: function() {
        this.update("")
    }
});
Ext.define("Docs.view.search.Dropdown", {
    extend: "Ext.view.View",
    alias: "widget.searchdropdown",
    requires: ["Docs.view.Signature"],
    floating: true,
    autoShow: false,
    autoRender: true,
    toFrontOnShow: true,
    focusOnToFront: false,
    store: "Search",
    id: "search-dropdown",
    overItemCls: "x-view-over",
    trackOver: true,
    itemSelector: "div.item",
    singleSelect: true,
    pageStart: 0,
    pageSize: 10,
    initComponent: function() {
        this.addEvents("changePage", "footerClick");
        this.tpl = new Ext.XTemplate('<tpl for=".">', '<div class="item">', '<div class="icon {icon}"></div>', '<div class="meta">{[this.getMetaTags(values.meta)]}</div>', '<div class="title {[this.getCls(values.meta)]}">{name}</div>', '<div class="class">{fullName}</div>', "</div>", "</tpl>", '<div class="footer">', '<tpl if="this.getTotal()">', '<a href="#" class="prev">&lt;</a>', '<span class="total">{[this.getStart()+1]}-{[this.getEnd()]} of {[this.getTotal()]}</span>', '<a href="#" class="next">&gt;</a>', "<tpl else>", '<span class="total">Nothing found</span>', "</tpl>", "</div>", {
            getCls: function(b) {
                return b["private"] ? "private" : (b.removed ? "removed" : "")
            },
            getMetaTags: function(b) {
                return Docs.view.Signature.render(b)
            },
            getTotal: Ext.bind(this.getTotal, this),
            getStart: Ext.bind(this.getStart, this),
            getEnd: Ext.bind(this.getEnd, this)
        });
        this.on("afterrender", function() {
            this.el.addListener("click", function() {
                this.fireEvent("changePage", this, -1)
            }, this, {
                preventDefault: true,
                delegate: ".prev"
            });
            this.el.addListener("click", function() {
                this.fireEvent("changePage", this, +1)
            }, this, {
                preventDefault: true,
                delegate: ".next"
            });
            this.el.addListener("click", function() {
                this.fireEvent("footerClick", this)
            }, this, {
                delegate: ".footer"
            })
        }, this);
        this.callParent(arguments)
    },
    setTotal: function(b) {
        this.total = b
    },
    getTotal: function() {
        return this.total
    },
    setStart: function(b) {
        this.pageStart = b
    },
    getStart: function(b) {
        return this.pageStart
    },
    getEnd: function(c) {
        var d = this.pageStart + this.pageSize;
        return d > this.total ? this.total : d
    }
});
Ext.define("Docs.view.search.Container", {
    extend: "Ext.container.Container",
    alias: "widget.searchcontainer",
    requires: "Docs.view.search.Dropdown",
    initComponent: function() {
        if (Docs.data.search.length) {
            this.cls = "search";
            this.items = [{
                xtype: "triggerfield",
                triggerCls: "reset",
                emptyText: "Search",
                width: 170,
                id: "search-field",
                enableKeyEvents: true,
                hideTrigger: true,
                onTriggerClick: function() {
                    this.reset();
                    this.focus();
                    this.setHideTrigger(true);
                    Ext.getCmp("search-dropdown").hide()
                }
            }, {
                xtype: "searchdropdown"
            }]
        }
        this.callParent()
    }
});
Ext.define("Docs.view.GroupTree", {
    extend: "Docs.view.DocTree",
    alias: "widget.grouptree",
    initComponent: function() {
        this.root = {
            text: "Root",
            children: this.buildTree(this.data)
        };
        this.callParent()
    },
    buildTree: function(b) {
        return Ext.Array.map(b, function(a) {
            if (a.items) {
                return {
                    text: a.title,
                    expanded: true,
                    iconCls: "icon-pkg",
                    children: this.buildTree(a.items)
                }
            } else {
                return this.convert(a)
            }
        }, this)
    }
});
Ext.define("Docs.view.auth.BaseForm", {
    extend: "Ext.Component",
    requires: ["Docs.Tip", "Docs.Auth"],
    createLoginFormHtml: function() {
        return ['<form class="loginForm">', '<input class="username" type="text" name="username" placeholder="Username" />', '<input class="password" type="password" name="password" placeholder="Password" />', '<label><input type="checkbox" name="remember" /> Remember Me</label>', '<input class="submit" type="submit" value="Sign in" />', " or ", '<a class="register" href="' + Docs.Auth.getRegistrationUrl() + '" target="_blank">Register</a>', "</form>"].join("")
    },
    bindFormSubmitEvent: function() {
        this.getEl().down("form").on("submit", this.submitLogin, this, {
            preventDefault: true
        })
    },
    submitLogin: function(m, h) {
        var n = Ext.get(h);
        var j = n.down("input[name=username]").getValue();
        var i = n.down("input[name=password]").getValue();
        var l = n.down("input[name=remember]");
        var k = l ? !!(l.getAttribute("checked")) : false;
        this.fireEvent("login", this, j, i, k)
    },
    showMessage: function(c) {
        var d = this.getEl().down("input[type=submit]");
        Docs.Tip.show(c, d, "bottom")
    }
});
Ext.define("Docs.view.auth.HeaderForm", {
    extend: "Docs.view.auth.BaseForm",
    alias: "widget.authHeaderForm",
    requires: ["Docs.Comments"],
    afterRender: function() {
        this.callParent(arguments);
        this.getEl().addListener("click", this.showLoginForm, this, {
            preventDefault: true,
            delegate: ".login"
        });
        this.getEl().addListener("click", function() {
            this.fireEvent("logout", this)
        }, this, {
            preventDefault: true,
            delegate: ".logout"
        })
    },
    showLoginForm: function() {
        this.update(this.createLoginFormHtml());
        this.bindFormSubmitEvent()
    },
    showLoggedIn: function(d) {
        var c = Docs.Comments.avatar(d.emailHash);
        this.update(c + "<div><span>" + d.userName + '</span> | <a href="#" class="logout">Logout</a></div>')
    },
    showLoggedOut: function() {
        this.update('<a href="#" class="login">Sign in / Register</a>')
    }
});
Ext.define("Docs.view.comments.Users", {
    alias: "widget.commentsUsers",
    extend: "Ext.panel.Panel",
    componentCls: "comments-users",
    requires: ["Docs.Comments", "Docs.view.SimpleSelectBehavior", "Docs.view.comments.FilterField"],
    layout: "border",
    initComponent: function() {
        this.items = [this.tabpanel = Ext.widget("tabpanel", {
            plain: true,
            region: "north",
            height: 50,
            items: [{
                title: "Votes"
            }, {
                title: "Comments"
            }],
            dockedItems: [{
                dock: "bottom",
                items: [{
                    xtype: "commentsFilterField",
                    emptyText: "Filter users by name...",
                    width: 320,
                    height: 20,
                    listeners: {
                        filter: this.onFilter,
                        scope: this
                    }
                }]
            }],
            listeners: {
                tabchange: this.onTabChange,
                scope: this
            }
        }), this.list = Ext.widget("dataview", {
            region: "center",
            cls: "iScroll users-list",
            autoScroll: true,
            store: Ext.create("Ext.data.Store", {
                fields: ["userName", "score", "emailHash", "mod"]
            }),
            allowDeselect: true,
            tpl: ["<ul>", '<tpl for=".">', "<li>", '<span class="score">{score}</span>', "{[Docs.Comments.avatar(values.emailHash)]}", '<span class="username <tpl if="mod">moderator</tpl>">{userName}</span>', "</li>", "</tpl>", "</ul>"],
            itemSelector: "li"
        })];
        new Docs.view.SimpleSelectBehavior(this.list, {
            select: this.onSelect,
            deselect: this.onDeselect,
            scope: this
        });
        this.callParent(arguments)
    },
    afterRender: function() {
        this.callParent(arguments);
        this.fetchUsers("votes")
    },
    onTabChange: function(d, c) {
        if (c.title === "Votes") {
            this.fetchUsers("votes")
        } else {
            this.fetchUsers("comments")
        }
    },
    onFilter: function(b) {
        this.list.getSelectionModel().deselectAll();
        this.list.getStore().clearFilter(true);
        this.list.getStore().filter({
            property: "userName",
            value: b,
            anyMatch: true
        })
    },
    deselectAll: function() {
        this.list.getSelectionModel().deselectAll()
    },
    onSelect: function(b) {
        this.selectedUser = b;
        this.fireEvent("select", b.get("userName"))
    },
    onDeselect: function() {
        this.selectedUser = undefined;
        this.fireEvent("select", undefined)
    },
    fetchUsers: function(b) {
        Docs.Comments.request("jsonp", {
            url: "/users",
            method: "GET",
            params: {
                sortBy: b
            },
            success: this.loadUsers,
            scope: this
        })
    },
    loadUsers: function(c) {
        this.list.getStore().loadData(c.data);
        if (this.selectedUser) {
            var d = this.list.getStore().findExact("userName", this.selectedUser.get("userName"));
            this.list.getSelectionModel().select(d, false, true)
        }
    }
});
Ext.define("Docs.view.cls.Header", {
    extend: "Ext.container.Container",
    requires: ["Docs.view.Signature"],
    alias: "widget.classheader",
    cls: "classheader",
    padding: "10 0 17 0",
    height: 55,
    initComponent: function() {
        this.tpl = Ext.create("Ext.XTemplate", '<h1 class="{[this.getClass(values)]}">', '<tpl if="Docs.data.source">', '<a href="#" class="class-source-link">{name}', '<span class="class-source-tip">View source...</span>', "</a>", "<tpl else>", '<strong class="class-source-link">{name}</strong>', "</tpl>", '<tpl if="singleton">', '<span class="singleton">singleton</span>', "</tpl>", "<tpl if=\"values['enum']\">", '<span class="enum">enum of <b>{[values["enum"].type]}</b></span>', "</tpl>", "{[this.renderAliases(values.aliases)]}", "{[this.renderMetaTags(values.meta)]}", "</h1>", '<tpl if="Docs.data.showPrintButton">', '<a class="print" href="?print=/api/{name}" target="_blank">Print</a>', "</tpl>", {
            getClass: function(b) {
                if (b.singleton) {
                    return "singleton"
                } else {
                    if (b.component) {
                        return "component"
                    } else {
                        return "class"
                    }
                }
            },
            renderAliases: function(e) {
                var f = {
                    widget: "xtype",
                    plugin: "ptype",
                    feature: "ftype"
                };
                var d = [];
                e && Ext.Object.each(e, function(a, b) {
                    d.push((f[a] || a) + ": " + b.join(", "))
                });
                if (d.length > 0) {
                    return "<span class='xtype'>" + d.join(", ") + "</span>"
                } else {
                    return ""
                }
            },
            renderMetaTags: function(b) {
                return " " + Docs.view.Signature.render(b, "long")
            }
        });
        if (Docs.data.source) {
            this.on("render", this.initSourceLink, this)
        }
        this.callParent()
    },
    initSourceLink: function() {
        this.classLinkEvent("click", function() {
            var d = this.loadedCls.files;
            if (d.length === 1) {
                window.open("source/" + d[0].href)
            } else {
                var c = this.createFileMenu(d);
                c.showBy(this, undefined, [58, -20])
            }
        }, this);
        this.classLinkEvent("mouseover", function() {
            this.el.down(".class-source-tip").addCls("hover")
        }, this);
        this.classLinkEvent("mouseout", function() {
            this.el.down(".class-source-tip").removeCls("hover")
        }, this)
    },
    classLinkEvent: function(d, e, f) {
        this.el.on(d, e, f, {
            preventDefault: true,
            delegate: "a.class-source-link"
        })
    },
    createFileMenu: function(b) {
        return new Ext.menu.Menu({
            items: Ext.Array.map(b, function(a) {
                return {
                    text: a.filename,
                    handler: function() {
                        window.open("source/" + a.href)
                    }
                }
            }, this)
        })
    },
    load: function(b) {
        this.loadedCls = b;
        this.update(this.tpl.apply(b))
    }
});
Ext.override(Ext.dom.Element, {
    getAttribute: (Ext.isIE6 || Ext.isIE7 || Ext.isIE8) ? function(f, h) {
        var g = this.dom,
            d;
        if (h) {
            d = typeof g[h + ":" + f];
            if (d != "undefined" && d != "unknown") {
                return g[h + ":" + f] || null
            }
            return null
        }
        if (f === "for") {
            f = "htmlFor"
        }
        return g[f] || null
    } : function(e, d) {
        var f = this.dom;
        if (d) {
            return f.getAttributeNS(d, e) || f.getAttribute(d + ":" + e)
        }
        return f.getAttribute(e) || f[e] || null
    }
});
Ext.define("Docs.view.ThumbList", {
    extend: "Ext.view.View",
    alias: "widget.thumblist",
    requires: ["Docs.Comments"],
    cls: "thumb-list",
    itemSelector: "dl",
    urlField: "url",
    commentType: "",
    itemTpl: [],
    initComponent: function() {
        this.addEvents("urlclick");
        Ext.Array.forEach(this.data, function(c, d) {
            c.id = "sample-" + d
        });
        this.store = Ext.create("Ext.data.JsonStore", {
            fields: ["id", "title", "items"]
        });
        this.store.loadData(this.flattenSubgroups(this.data));
        this.tpl = new Ext.XTemplate(Ext.Array.flatten(["<div>", '<tpl for=".">', '<div><a name="{id}"></a><h2><div>{title}</div></h2>', "<dl>", '<tpl for="items">', this.itemTpl, "</tpl>", '<div style="clear:left"></div></dl></div>', "</tpl>", "</div>"]));
        this.itemTpl = undefined;
        this.data = undefined;
        this.on("viewready", function() {
            this.initHover();
            if (Docs.Comments.isEnabled()) {
                this.initComments()
            }
        }, this);
        this.callParent(arguments)
    },
    initHover: function() {
        this.getEl().on("mouseover", function(c, d) {
            Ext.get(d).addCls("over")
        }, this, {
            delegate: "dd"
        });
        this.getEl().on("mouseout", function(c, d) {
            Ext.get(d).removeCls("over")
        }, this, {
            delegate: "dd"
        })
    },
    initComments: function() {
        this.getEl().select("dd").each(function(e) {
            var d = e.getAttributeNS("ext", this.urlField).replace(/^.*\//, "");
            var f = Docs.Comments.getCount([this.commentType, d, ""]);
            if (f) {
                Ext.DomHelper.append(e.down("p"), Docs.Comments.counterHtml(f))
            }
        }, this)
    },
    updateCommentCounts: function() {
        if (!this.getEl()) {
            return
        }
        this.getEl().select(".comment-counter-small").remove();
        this.initComments()
    },
    flattenSubgroups: function(c) {
        function d(a) {
            if (a.items) {
                return Ext.Array.map(a.items, d)
            } else {
                return a
            }
        }
        return Ext.Array.map(c, function(a) {
            return {
                id: a.id,
                title: a.title,
                items: Ext.Array.map(a.items, function(b) {
                    if (b.items) {
                        var f = Ext.apply({}, d(b)[0]);
                        f.title = b.title;
                        return f
                    } else {
                        return b
                    }
                })
            }
        })
    },
    onContainerClick: function(c) {
        var d = c.getTarget("h2", 3, true);
        if (d) {
            d.up("div").toggleCls("collapsed")
        }
    },
    onItemClick: function(h, j, l, i) {
        var k = i.getTarget("dd", 5, true);
        if (k && !i.getTarget("a", 2)) {
            var e = k.getAttributeNS("ext", this.urlField);
            this.fireEvent("urlclick", e)
        }
        return this.callParent(arguments)
    }
});
Ext.define("Docs.view.guides.Index", {
    extend: "Ext.container.Container",
    alias: "widget.guideindex",
    requires: ["Docs.view.ThumbList"],
    mixins: ["Docs.view.Scrolling"],
    cls: "iScroll",
    margin: "10 0 0 0",
    autoScroll: true,
    initComponent: function() {
        this.items = [{
            xtype: "container",
            html: '<h1 class="eg">Guides</h1>'
        }, Ext.create("Docs.view.ThumbList", {
            commentType: "guide",
            itemTpl: ['<dd ext:url="#!/guide/{name}"><div class="thumb"><img src="guides/{name}/icon.png"/></div>', "<div><h4>{title}</h4><p>{description}</p></div>", "</dd>"],
            data: Docs.data.guides
        })];
        this.callParent(arguments)
    },
    getTab: function() {
        var b = (Docs.data.guides || []).length > 0;
        return b ? {
            cls: "guides",
            href: "#!/guide",
            tooltip: "Guides"
        } : false
    },
    updateCommentCounts: function() {
        this.down("thumblist").updateCommentCounts()
    }
});
Ext.define("Docs.view.videos.Index", {
    extend: "Ext.container.Container",
    alias: "widget.videoindex",
    requires: ["Docs.view.ThumbList"],
    mixins: ["Docs.view.Scrolling"],
    cls: "iScroll",
    margin: "10 0 0 0",
    autoScroll: true,
    initComponent: function() {
        this.items = [{
            xtype: "container",
            html: '<h1 class="eg">Videos</h1>'
        }, Ext.create("Docs.view.ThumbList", {
            commentType: "video",
            itemTpl: ['<dd ext:url="#!/video/{name}"><div class="thumb"><img src="{thumb}"/></div>', "<div><h4>{title}", "</h4><p>{[values.description.substr(0,80)]}...</p></div>", "</dd>"],
            data: Docs.data.videos
        })];
        this.callParent(arguments)
    },
    getTab: function() {
        var b = (Docs.data.videos || []).length > 0;
        return b ? {
            cls: "videos",
            href: "#!/video",
            tooltip: "Videos"
        } : false
    },
    updateCommentCounts: function() {
        this.down("thumblist").updateCommentCounts()
    }
});
Ext.define("Docs.view.examples.Index", {
    extend: "Ext.container.Container",
    alias: "widget.exampleindex",
    requires: ["Docs.view.ThumbList"],
    mixins: ["Docs.view.Scrolling"],
    cls: "iScroll",
    margin: "10 0 0 0",
    autoScroll: true,
    initComponent: function() {
        this.cls += Docs.data.touchExamplesUi ? " touch-examples-ui" : "";
        this.items = [{
            xtype: "container",
            html: '<h1 class="eg">Examples</h1>'
        }, Ext.create("Docs.view.ThumbList", {
            itemTpl: ['<dd ext:url="#!/example/{name}">', '<div class="thumb"><img src="{icon}"/></div>', "<div><h4>{title}", "<tpl if=\"status === 'new'\">", '<span class="new-sample"> (New)</span>', "</tpl>", "<tpl if=\"status === 'updated'\">", '<span class="updated-sample"> (Updated)</span>', "</tpl>", "<tpl if=\"status === 'experimental'\">", '<span class="new-sample"> (Experimental)</span>', "</tpl>", "</h4><p>{description}</p></div>", "</dd>"],
            data: Docs.data.examples
        })];
        this.callParent(arguments)
    },
    getTab: function() {
        var b = (Docs.data.examples || []).length > 0;
        return b ? {
            cls: "examples",
            href: "#!/example",
            tooltip: "Examples"
        } : false
    }
});
Ext.define("Docs.view.examples.Inline", {
    extend: "Ext.Panel",
    alias: "widget.inlineexample",
    requires: ["Docs.view.examples.InlineEditor", "Docs.view.examples.InlinePreview"],
    componentCls: "inline-example-cmp",
    layout: "card",
    border: 0,
    resizable: {
        transparent: true,
        handles: "s",
        constrainTo: false
    },
    maxCodeHeight: 400,
    options: {},
    constructor: function() {
        this.callParent(arguments);
        this.addEvents("previewsuccess", "previewfailure")
    },
    initComponent: function() {
        this.options = Ext.apply({
            device: "phone",
            orientation: "landscape"
        }, this.options);
        this.items = [this.editor = Ext.create("Docs.view.examples.InlineEditor", {
            cmpName: "code",
            value: this.value,
            listeners: {
                init: this.updateHeight,
                change: this.updateHeight,
                scope: this
            }
        }), this.preview = Ext.create("Docs.view.examples.InlinePreview", {
            cmpName: "preview",
            options: this.options
        })];
        this.relayEvents(this.preview, ["previewsuccess", "previewfailure"]);
        if (this.options.preview) {
            this.activeItem = 1;
            if (this.toolbar) {
                this.toolbar.activateButton("preview")
            }
        } else {
            this.activeItem = 0;
            if (this.toolbar) {
                this.toolbar.activateButton("code")
            }
        }
        this.on("afterrender", this.init, this);
        this.callParent(arguments)
    },
    init: function() {
        var b = this.layout.getActiveItem();
        if (b.cmpName === "preview") {
            this.showPreview()
        }
        this.updateHeight();
        if (this.toolbar) {
            this.initToolbarEvents()
        }
    },
    initToolbarEvents: function() {
        this.toolbar.on("buttonclick", function(b) {
            if (b === "code") {
                this.showCode()
            } else {
                if (b === "preview") {
                    this.showPreview()
                } else {
                    if (b === "copy") {
                        this.showCode();
                        this.editor.selectAll()
                    }
                }
            }
        }, this)
    },
    showCode: function() {
        this.layout.setActiveItem(0);
        this.updateHeight();
        if (this.toolbar) {
            this.toolbar.activateButton("code")
        }
    },
    showPreview: function() {
        this.preview.update(this.editor.getValue());
        this.layout.setActiveItem(1);
        this.updateHeight();
        if (this.toolbar) {
            this.toolbar.activateButton("preview")
        }
    },
    updateHeight: function() {
        var d = this.preview.getHeight();
        var e = this.editor.getHeight();
        var f = 30;
        if (Docs.data.touchExamplesUi && d > 0) {
            this.setHeight(d + f)
        } else {
            if (e > 0) {
                this.setHeight(Ext.Number.constrain(e + f, 0, this.maxCodeHeight))
            }
        }
    }
});
Ext.define("Docs.view.examples.InlineWrap", {
    requires: ["Docs.view.examples.Inline", "Docs.view.examples.InlineToolbar"],
    constructor: function(c) {
        this.pre = c;
        
        var d = this.parseOptions(c.className);
        this.initToolbar();
        if (d.preview) {
            this.replacePre(d)
        } else {
            this.tb.on("buttonclick", function(a) {
                d.preview = (a === "preview");
                this.replacePre(d)
            }, this, {
                single: true
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
    initToolbar: function() {
        var b = document.createElement("div");
        this.pre.parentNode.insertBefore(b, this.pre);
        this.tb = Ext.create("Docs.view.examples.InlineToolbar", {
            renderTo: b
        })
    },
    replacePre: function(d) {
        var c = document.createElement("div");
        this.pre.parentNode.replaceChild(c, this.pre);
        Ext.create("Docs.view.examples.Inline", {
            height: 200,
            renderTo: c,
            value: Ext.String.htmlDecode(Ext.util.Format.stripTags(this.pre.innerHTML)),
            options: d,
            toolbar: this.tb
        })
    }
});
Ext.define("Docs.controller.InlineExamples", {
    extend: "Ext.app.Controller",
    requires: ["Docs.view.examples.InlineWrap"],
    init: function() {
        this.control({
            classoverview: {
                resize: this.createResizer(".class-overview"),
                afterload: this.replaceExampleDivs
            },
            guidecontainer: {
                resize: this.createResizer(".guide-container"),
                afterload: this.replaceExampleDivs
            }
        })
    },
    createResizer: function(b) {
        return function() {
            Ext.Array.each(Ext.ComponentQuery.query(b + " .inlineexample"), function(a) {
                if (a.editor && a.isVisible()) {
                    a.doLayout()
                }
            })
        }
    },
    replaceExampleDivs: function() {
        Ext.Array.each(Ext.query(".inline-example"), function(b) {

            Ext.create("Docs.view.examples.InlineWrap", b)
        }, this)
    }
});
Ext.define("Docs.view.tests.BatchRunner", {
    extend: "Ext.container.Container",
    requires: ["Docs.view.examples.Inline"],
    initComponent: function() {
        this.addEvents("start", "finish", "statuschange");
        this.callParent(arguments)
    },
    run: function(b) {
        this.fireEvent("start");
        this.runNext({
            pass: 0,
            fail: 0,
            total: b.length,
            remaining: b
        })
    },
    runNext: function(h) {
        this.fireEvent("statuschange", h);
        if (!h.remaining || h.remaining.length < 1) {
            this.fireEvent("finish");
            return
        }
        var j = h.remaining.shift();
        var i = j.get("options");
        i.preview = false;
        var f = "var alert = function(){};\n";
        var g = Ext.create("Docs.view.examples.Inline", {
            cls: "doc-test-preview",
            height: 0,
            value: f + j.get("code"),
            options: i,
            listeners: {
                previewsuccess: function(a) {
                    this.onSuccess(j, h)
                },
                previewfailure: function(a, b) {
                    this.onFailure(j, h, b)
                },
                scope: this
            }
        });
        this.removeAll();
        this.add(g);
        g.showPreview()
    },
    onSuccess: function(d, c) {
        d.set("status", "success");
        d.commit();
        c.pass++;
        this.runNext(c)
    },
    onFailure: function(e, f, d) {
        e.set("status", "failure");
        e.set("message", d.toString());
        e.commit();
        f.fail++;
        this.runNext(f)
    }
});
Ext.define("Docs.view.tests.Index", {
    extend: "Ext.container.Container",
    requires: ["Docs.model.Test", "Docs.view.tests.BatchRunner"],
    mixins: ["Docs.view.Scrolling"],
    alias: "widget.testsindex",
    layout: {
        type: "vbox",
        align: "stretch",
        shrinkToFit: true
    },
    padding: 10,
    initComponent: function() {
        this.store = Ext.create("Ext.data.Store", {
            model: "Docs.model.Test",
            data: []
        });
        this.grid = Ext.create("Ext.grid.Panel", {
            itemId: "testsgrid",
            padding: "5 0 5 0",
            autoScroll: true,
            flex: 1,
            store: this.store,
            selModel: {
                mode: "MULTI"
            },
            columns: [{
                xtype: "templatecolumn",
                text: "Name",
                width: 300,
                tpl: '<a href="{href}">{name}</a>'
            }, {
                xtype: "templatecolumn",
                text: "Status",
                width: 80,
                tpl: '<span class="doc-test-{status}">{status}</span>'
            }, {
                text: "Message",
                flex: 1,
                dataIndex: "message"
            }],
            listeners: {
                itemdblclick: function(c, d) {
                    this.batchRunner.run([d])
                },
                scope: this
            }
        });
        this.batchRunner = Ext.create("Docs.view.tests.BatchRunner", {
            height: 0,
            listeners: {
                start: this.disable,
                finish: this.enable,
                statuschange: this.updateTestStatus,
                scope: this
            }
        });
        this.items = [{
            html: "<h1>Inline examples test page</h1>",
            height: 30
        }, {
            itemId: "testcontainer",
            layout: {
                type: "vbox",
                align: "stretch",
                shrinkToFit: true
            },
            flex: 1,
            items: [{
                itemId: "testcontrols",
                layout: "hbox",
                items: [{
                    html: "<b>Double-click</b> to run an example, or",
                    margin: "5 5 5 0"
                }, {
                    xtype: "button",
                    itemId: "run-selected-button",
                    text: "Run Selected",
                    margin: 5,
                    handler: function() {
                        this.batchRunner.run(this.grid.getSelectionModel().getSelection())
                    },
                    scope: this
                }, {
                    html: "or",
                    margin: 5
                }, {
                    xtype: "button",
                    itemId: "run-all-button",
                    text: "Run All Examples",
                    margin: 5,
                    handler: function() {
                        this.batchRunner.run(this.store.getRange())
                    },
                    scope: this
                }, {
                    itemId: "testStatus",
                    margin: "5 5 5 15"
                }]
            }, this.grid]
        }, this.batchRunner];
        this.callParent(arguments)
    },
    getTab: function() {
        return Docs.data.tests ? {
            cls: "tests",
            href: "#!/tests",
            tooltip: "Tests",
            text: "Tests"
        } : false
    },
    addExamples: function(b) {
        this.store.add(b);
        this.setStatus(true, this.store.getCount() + " examples loaded.")
    },
    updateTestStatus: function(d) {
        var c = d.pass + d.fail;
        this.setStatus(d.fail === 0, c + "/" + d.total + " examples tested, " + d.fail + " failures")
    },
    setStatus: function(d, f) {
        var e = d ? "doc-test-success" : "doc-test-failure";
        this.down("#testStatus").update('<span class="' + e + '">' + f + "</span>")
    }
});
Ext.define("Docs.view.cls.PackageLogic", {
    extend: "Docs.view.cls.Logic",
    requires: "Docs.ClassRegistry",
    create: function() {
        this.root = {
            children: [],
            text: "Root"
        };
        this.packages = {
            "": this.root
        };
        this.privates = [];
        Ext.Array.forEach(this.classes, this.addClass, this);
        this.sortTree(this.root);
        return {
            root: this.root,
            privates: this.privates
        }
    },
    sortTree: function(b) {
        b.children.sort(this.compare);
        Ext.Array.forEach(b.children, this.sortTree, this)
    },
    compare: function(g, h) {
        if (g.leaf === h.leaf) {
            var b = g.text.toLowerCase();
            var a = h.text.toLowerCase();
            return b > a ? 1 : (b < a ? -1 : 0)
        } else {
            return g.leaf ? 1 : -1
        }
    },
    addClass: function(g) {
        if (g["private"] && !this.showPrivateClasses) {
            this.privates.push(this.classNode(g));
            return
        }
        if (this.packages[g.name]) {
            var f = this.packages[g.name];
            var i = this.classNode(g);
            f.iconCls = i.iconCls;
            f.url = i.url
        } else {
            var h = Docs.ClassRegistry.packageName(g.name);
            var j = this.packages[h] || this.addPackage(h);
            var i = this.classNode(g);
            this.addChild(j, i);
            this.packages[g.name] = i
        }
    },
    addPackage: function(e) {
        var g = Docs.ClassRegistry.packageName(e);
        var h = this.packages[g] || this.addPackage(g);
        var f = this.packageNode(e);
        this.addChild(h, f);
        this.packages[e] = f;
        return f
    },
    addChild: function(d, c) {
        d.children.push(c);
        if (d.leaf) {
            d.leaf = false
        }
    },
    classNode: function(b) {
        return {
            text: Docs.ClassRegistry.shortName(b.name),
            url: "#!/api/" + b.name,
            iconCls: b.icon,
            cls: b["private"] ? "private" : "",
            leaf: true,
            children: []
        }
    },
    packageNode: function(b) {
        return {
            text: Docs.ClassRegistry.shortName(b),
            iconCls: "icon-pkg",
            leaf: false,
            children: []
        }
    }
});
Ext.define("Docs.view.cls.InheritanceLogic", {
    extend: "Docs.view.cls.Logic",
    create: function() {
        this.root = {
            children: [],
            text: "Root"
        };
        this.privates = [];
        this.subclasses = this.buildLookupTable(this.classes);
        Ext.Array.forEach(this.classes, this.addClass, this);
        if (!this.showPrivateClasses) {
            this.stripPrivateClasses(this.root)
        }
        this.sortTree(this.root);
        return {
            root: this.root,
            privates: this.privates
        }
    },
    sortTree: function(b) {
        b.children.sort(Ext.bind(this.compare, this));
        Ext.Array.forEach(b.children, this.sortTree, this)
    },
    compare: function(g, h) {
        var b = g.text.toLowerCase();
        var a = h.text.toLowerCase();
        return b > a ? 1 : (b < a ? -1 : 0)
    },
    buildLookupTable: function(d) {
        var c = {};
        Ext.Array.forEach(d, function(b) {
            var a = b["extends"];
            if (a && a !== "Object") {
                if (!c[a]) {
                    c[a] = []
                }
                c[a].push(b)
            }
        }, this);
        return c
    },
    classNode: function(b) {
        return {
            text: b.name,
            url: "#!/api/" + b.name,
            iconCls: b.icon,
            cls: b["private"] ? "private" : ""
        }
    },
    addClass: function(e) {
        var d = e["extends"];
        if (!d || d === "Object") {
            var f = this.classNode(e);
            this.root.children.push(f);
            f.children = this.getSubclasses(e.name);
            f.leaf = f.children.length === 0
        }
    },
    getSubclasses: function(b) {
        if (!this.subclasses[b]) {
            return []
        }
        return Ext.Array.map(this.subclasses[b], function(a) {
            var d = this.classNode(a);
            d.children = this.getSubclasses(a.name);
            d.leaf = d.children.length === 0;
            return d
        }, this)
    },
    stripPrivateClasses: function(b) {
        b.children = Ext.Array.filter(b.children, function(a) {
            this.stripPrivateClasses(a);
            if (a.cls === "private" && a.children.length === 0) {
                this.privates.push(a);
                return false
            } else {
                return true
            }
        }, this)
    }
});
Ext.define("Docs.view.cls.Tree", {
    extend: "Docs.view.DocTree",
    alias: "widget.classtree",
    requires: ["Docs.view.cls.PackageLogic", "Docs.view.cls.InheritanceLogic", "Docs.Settings"],
    initComponent: function() {
        this.setLogic(Docs.Settings.get("classTreeLogic"), Docs.Settings.get("showPrivateClasses"));
        this.dockedItems = [{
            xtype: "container",
            dock: "bottom",
            layout: "hbox",
            items: [{
                width: 34
            }, {
                xtype: "checkbox",
                boxLabel: "Show private classes",
                cls: "cls-private-cb",
                checked: Docs.Settings.get("showPrivateClasses"),
                listeners: {
                    change: function(d, c) {
                        this.setLogic(Docs.Settings.get("classTreeLogic"), c)
                    },
                    scope: this
                }
            }]
        }, {
            xtype: "container",
            dock: "bottom",
            cls: "cls-grouping",
            html: [this.makeButtonHtml("PackageLogic", "By Package"), this.makeButtonHtml("InheritanceLogic", "By Inheritance")].join("")
        }];
        this.on("afterrender", this.setupButtonClickHandler, this);
        this.callParent()
    },
    makeButtonHtml: function(d, c) {
        return Ext.String.format('<button class="{0} {1}">{2}</button>', d, Docs.Settings.get("classTreeLogic") === d ? "selected" : "", c)
    },
    setupButtonClickHandler: function() {
        this.el.addListener("click", function(g, h) {
            var f = Ext.get(h),
                e = Ext.get(Ext.query(".cls-grouping button.selected")[0]);
            if (e.dom === f.dom) {
                return
            }
            e.removeCls("selected");
            f.addCls("selected");
            if (f.hasCls("PackageLogic")) {
                this.setLogic("PackageLogic", Docs.Settings.get("showPrivateClasses"))
            } else {
                this.setLogic("InheritanceLogic", Docs.Settings.get("showPrivateClasses"))
            }
        }, this, {
            delegate: "button"
        })
    },
    setLogic: function(i, f) {
        Docs.Settings.set("classTreeLogic", i);
        Docs.Settings.set("showPrivateClasses", f);
        var g = new Docs.view.cls[i]({
            classes: this.data,
            showPrivateClasses: f
        });
        if (this.root) {
            var h = this.getSelectionModel().getLastSelected();
            var j = g.create();
            this.expandLonelyNode(j.root);
            this.setRootNode(j.root);
            this.initNodeLinks();
            h && this.selectUrl(h.raw.url)
        } else {
            var j = g.create();
            this.root = j.root;
            this.expandLonelyNode(this.root)
        }
        this.privates = j.privates
    },
    expandLonelyNode: function(d) {
        var c = Ext.Array.filter(d.children, function(a) {
            return a.children.length > 0
        });
        if (c.length == 1) {
            c[0].expanded = true
        }
    },
    findRecordByUrl: function(b) {
        return this.callParent([b]) || this.findPrivateRecordByUrl(b)
    },
    findPrivateRecordByUrl: function(e) {
        var f = this.privates;
        for (var d = 0; d < f.length; d++) {
            if (f[d].url === e) {
                return f[d]
            }
        }
        return undefined
    }
});
Ext.define("Docs.view.TreeContainer", {
    extend: "Ext.panel.Panel",
    alias: "widget.treecontainer",
    requires: ["Docs.view.cls.Tree", "Docs.view.GroupTree"],
    cls: "iScroll",
    layout: "card",
    resizable: true,
    resizeHandles: "e",
    collapsible: true,
    hideCollapseTool: true,
    animCollapse: true,
    header: false,
    initComponent: function() {
        this.items = [{}, {
            xtype: "classtree",
            id: "classtree",
            data: Docs.data.classes
        }, {
            xtype: "grouptree",
            id: "exampletree",
            data: Docs.data.examples,
            convert: function(b) {
                return {
                    leaf: true,
                    text: b.title,
                    url: "#!/example/" + b.name,
                    iconCls: "icon-example"
                }
            }
        }, {
            xtype: "grouptree",
            id: "guidetree",
            data: Docs.data.guides,
            convert: function(b) {
                return {
                    leaf: true,
                    text: b.title,
                    url: "#!/guide/" + b.name,
                    iconCls: "icon-guide"
                }
            }
        }, {
            xtype: "grouptree",
            id: "videotree",
            data: Docs.data.videos,
            convert: function(b) {
                return {
                    leaf: true,
                    text: b.title,
                    url: "#!/video/" + b.name,
                    iconCls: "icon-video"
                }
            }
        }];
        this.callParent()
    },
    showTree: function(b) {
        this.show();
        this.layout.setActiveItem(b)
    }
});
Ext.define("Docs.view.comments.Expander", {
    alias: "widget.commentsExpander",
    extend: "Ext.Component",
    requires: ["Docs.Comments", "Docs.view.comments.TopLevelDropZone"],
    uses: ["Docs.view.comments.ListWithForm"],
    componentCls: "comments-expander",
    initComponent: function() {
        this.tpl = new Ext.XTemplate('<a href="#" class="side toggleComments"><span></span></a>', '<a href="#" class="name toggleComments">', "{[this.renderCount(values.count)]}", "</a>", {
            renderCount: this.renderCount
        });
        this.data = {
            count: this.count
        };
        this.callParent(arguments)
    },
    renderCount: function(b) {
        if (b === 1) {
            return "View 1 comment."
        } else {
            if (b > 1) {
                return "View " + b + " comments."
            } else {
                return "No comments. Click to add."
            }
        }
    },
    afterRender: function() {
        this.callParent(arguments);
        this.getEl().select(".toggleComments").each(function(b) {
            b.on("click", this.toggle, this, {
                preventDefault: true
            })
        }, this);
        new Docs.view.comments.TopLevelDropZone(this.getEl().down(".side.toggleComments"), {
            onValidDrop: Ext.Function.bind(this.setParent, this)
        })
    },
    setParent: function(c, d) {
        c.setParent(d, this.reload, this)
    },
    toggle: function() {
        this.expanded ? this.collapse() : this.expand()
    },
    expand: function() {
        this.expanded = true;
        this.getEl().addCls("open");
        this.getEl().down(".name").setStyle("display", "none");
        if (this.list) {
            this.list.show()
        } else {
            this.loadComments()
        }
    },
    collapse: function() {
        this.expanded = false;
        this.getEl().removeCls("open");
        this.getEl().down(".name").setStyle("display", "block");
        if (this.list) {
            this.list.hide()
        }
    },
    loadComments: function() {
        this.list = new Docs.view.comments.ListWithForm({
            target: this.target,
            newCommentTitle: this.newCommentTitle,
            renderTo: this.getEl(),
            listeners: {
                reorder: this.reload,
                scope: this
            }
        });
        this.reload()
    },
    reload: function() {
        Docs.Comments.load(this.target, function(b) {
            this.list.load(b)
        }, this)
    },
    setCount: function(b) {
        this.getEl().down(".name").update(this.renderCount(b))
    }
});
Ext.define("Docs.view.comments.LargeExpander", {
    requires: ["Docs.Comments", "Docs.view.comments.Expander"],
    html: ['<div class="comments-large-expander">', '<h3 class="icon-comment">Comments</h3>', "<div></div>", "</div>"].join(""),
    type: "class",
    constructor: function(e) {
        Ext.apply(this, e);
        this.el = Ext.get(e.el);
        var d = Ext.DomHelper.append(this.el, this.html, true).down("div");
        var f = [this.type, this.name, ""];
        this.expander = new Docs.view.comments.Expander({
            count: Docs.Comments.getCount(f),
            target: f,
            renderTo: d,
            onCountUpdated: this.onCountUpdated
        })
    },
    getExpander: function() {
        return this.expander
    }
});
Ext.define("Docs.view.guides.Container", {
    extend: "Ext.panel.Panel",
    alias: "widget.guidecontainer",
    componentCls: "guide-container",
    mixins: ["Docs.view.Scrolling"],
    requires: ["Docs.Comments", "Docs.view.comments.LargeExpander"],
    initComponent: function() {
        this.addEvents("afterload");
        this.callParent(arguments)
    },
    scrollToEl: function(c) {
        var d = Ext.get(c);
        if (!d) {
            d = Ext.get(Ext.query("a[name='" + c + "']")[0])
        }
        this.scrollToView(d, {
            highlight: true,
            offset: -100
        })
    },
    load: function(b) {
        this.guide = b;
        this.tpl = this.tpl || new Ext.XTemplate(Docs.data.showPrintButton ? '<a class="print guide" href="?print=/guide/{name}" target="_blank">Print</a>' : "", "{content}");
        this.update(this.tpl.apply(b));
        Docs.Syntax.highlight(this.getEl());
        if (Docs.Comments.isEnabled()) {
            this.initComments()
        }
        this.fireEvent("afterload")
    },
    initComments: function() {
        this.expander = new Docs.view.comments.LargeExpander({
            type: "guide",
            name: this.guide.name,
            el: this.getEl().down(".x-panel-body")
        })
    },
    updateCommentCounts: function() {
        if (!this.expander) {
            return
        }
        this.expander.getExpander().setCount(Docs.Comments.getCount(["guide", this.guide.name, ""]))
    }
});
Ext.define("Docs.view.videos.Container", {
    extend: "Ext.panel.Panel",
    alias: "widget.videocontainer",
    componentCls: "video-container",
    requires: ["Docs.Comments", "Docs.view.comments.LargeExpander"],
    initComponent: function() {
        this.callParent(arguments);
        this.on("hide", this.pauseVideo, this)
    },
    pauseVideo: function() {
        var b = document.getElementById("video_player");
        if (b && b.api_pause) {
            b.api_pause()
        }
    },
    load: function(b) {
        this.video = b;
        this.tpl = this.tpl || new Ext.XTemplate('<iframe src="http://player.vimeo.com/video/{id}" width="640" height="360" frameborder="0" ', "webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>", "<h1>{title}</h1>", "<p>{[this.linkify(values.description)]}</p>", {
            linkify: function(a) {
                return a.replace(/(\bhttps?:\/\/\S+)/ig, "<a href='$1'>$1</a>")
            }
        });
        this.update(this.tpl.apply(b));
        if (Docs.Comments.isEnabled()) {
            this.initComments()
        }
    },
    initComments: function() {
        this.expander = new Docs.view.comments.LargeExpander({
            type: "video",
            name: this.video.name,
            el: this.getEl().down(".x-panel-body")
        })
    },
    updateCommentCounts: function() {
        if (!this.expander) {
            return
        }
        this.expander.getExpander().setCount(Docs.Comments.getCount(["video", this.video.name, ""]))
    }
});
Ext.define("Docs.view.comments.MemberWrap", {
    extend: "Docs.view.cls.MemberWrap",
    requires: ["Docs.Comments", "Docs.view.comments.Expander"],
    constructor: function(d) {
        this.callParent([d]);
        var c = Docs.Comments.getCount(this.getTarget());
        if (c > 0) {
            this.updateSignatureCommentCount(c)
        }
    },
    getTarget: function() {
        if (!this.target) {
            this.target = ["class", this.getDefinedIn(), this.getMemberId()]
        }
        return this.target
    },
    getExpander: function() {
        if (!this.expander) {
            var b = Ext.DomHelper.append(this.el.down(".long"), "<div></div>");
            this.expander = new Docs.view.comments.Expander({
                count: Docs.Comments.getCount(this.getTarget()),
                target: this.getTarget(),
                newCommentTitle: this.getNewCommentTitle(),
                renderTo: b
            })
        }
        return this.expander
    },
    setCount: function(b) {
        this.getExpander().setCount(b);
        this.updateSignatureCommentCount(b)
    },
    updateSignatureCommentCount: function(g) {
        var e = this.el.down(".title");
        var f = e.down(".comment-counter-small");
        if (g > 0) {
            if (f) {
                f.update("" + g)
            } else {
                var h = Ext.DomHelper.append(e, Docs.Comments.counterHtml(g), true);
                h.on("click", function() {
                    this.el.addCls("open");
                    this.getExpander().expand();
                    this.parent.scrollToEl(this.getExpander().getEl())
                }, this)
            }
        } else {
            if (f) {
                f.remove()
            }
        }
    },
    getNewCommentTitle: function() {
        if (this.getDefinedIn() !== this.className) {
            return ["<b>Be aware.</b> This member is inherited from <b>" + this.getDefinedIn() + "</b>; ", "comments posted here will also be posted to that page."].join("")
        } else {
            return undefined
        }
    },
    setExpanded: function(b) {
        this.callParent([b]);
        if (b) {
            this.getExpander().show()
        }
    }
});
Ext.define("Docs.view.comments.Template", {
    extend: "Ext.XTemplate",
    requires: ["Docs.Auth", "Docs.Comments"],
    statics: {
        create: function(d) {
            var c = "tpl-" + Ext.JSON.encode(d);
            if (!this[c]) {
                this[c] = new this();
                Ext.apply(this[c], d)
            }
            return this[c]
        }
    },
    constructor: function() {
        this.callParent(["<div>", '<tpl for=".">', '<div class="comment" id="{id}">', '<tpl if="deleted">', '<div class="deleted-comment">Comment was deleted. <a href="#" class="undoDeleteComment">Undo</a>.</div>', "<tpl else>", '<div class="com-meta">', "{[this.avatar(values.emailHash)]}", '<div class="author<tpl if="moderator"> moderator" title="Sencha Engineer</tpl>">', "{author}", '<tpl if="this.isTargetVisible()">', '<span class="target"> on {[this.target(values.target)]}</span>', "</tpl>", "</div>", '<div class="top-right">', '<tpl for="tags">', '<span href="#" class="command tag">', "<b>{.}</b>", '<tpl if="this.isMod()"><a href="#" class="remove-tag" title="Delete tag">&ndash;</a></tpl>', "</span>", "</tpl>", '<tpl if="this.isMod()">', '<a href="#" class="command add-tag" title="Add new tag">+</a>', "</tpl>", '<tpl if="this.isMod()">', '<a href="#" class="command readComment <tpl if="read">read</tpl>">Read</a>', "</tpl>", '<tpl if="this.isMod() || this.isAuthor(values.author)">', '<a href="#" class="command editComment">Edit</a>', '<a href="#" class="command deleteComment">Delete</a>', "</tpl>", '<span class="time" title="{[this.date(values.createdAt)]}">{[this.dateStr(values.createdAt)]}</span>', "</div>", '<div class="vote">', '<a href="#" class="voteCommentUp{[values.upVote ? " selected" : ""]}" ', 'title="Vote Up">&nbsp;</a>', '<span class="score">{score}</span>', '<a href="#" class="voteCommentDown{[values.downVote ? " selected" : ""]}" ', 'title="Vote Down">&nbsp;</a>', "</div>", "</div>", '<div class="content">{contentHtml}</div>', "</tpl>", "</div>", "</tpl>", "</div>", this])
    },
    avatar: function(b) {
        return Docs.Comments.avatar(b, this.isMod() && this.enableDragDrop ? "drag-handle" : "")
    },
    isTargetVisible: function() {
        return this.showTarget
    },
    dateStr: function(e) {
        try {
            var h = Math.ceil(Number(new Date()) / 1000);
            var i = Math.ceil(Number(new Date(e)) / 1000);
            var k = h - i;
            if (k < 60) {
                return "just now"
            } else {
                if (k < 60 * 60) {
                    var j = String(Math.round(k / (60)));
                    return j + (j == "1" ? " minute" : " minutes") + " ago"
                } else {
                    if (k < 60 * 60 * 24) {
                        var j = String(Math.round(k / (60 * 60)));
                        return j + (j == "1" ? " hour" : " hours") + " ago"
                    } else {
                        if (k < 60 * 60 * 24 * 31) {
                            var j = String(Math.round(k / (60 * 60 * 24)));
                            return j + (j == "1" ? " day" : " days") + " ago"
                        } else {
                            return Ext.Date.format(new Date(e), "jS M 'y")
                        }
                    }
                }
            }
        } catch (l) {
            return ""
        }
    },
    date: function(d) {
        try {
            return Ext.Date.format(new Date(d), "jS F Y g:ia")
        } catch (c) {
            return ""
        }
    },
    isMod: function() {
        return Docs.Auth.isModerator()
    },
    isAuthor: function(b) {
        return Docs.Auth.getUser().userName == b
    },
    target: function(h) {
        var e = h[1],
            g = h[1],
            f = "#!/api/";
        if (h[0] == "video") {
            g = "Video " + g;
            f = "#!/video/"
        } else {
            if (h[0] == "guide") {
                g = "Guide " + g;
                f = "#!/guide/"
            } else {
                if (h[2] != "") {
                    e += "-" + h[2];
                    if (h[0] == "class") {
                        g += "#" + h[2].replace(/^.*-/, "")
                    } else {
                        g += " " + h[2]
                    }
                }
            }
        }
        return '<a href="' + f + e + '">' + g + "</a>"
    }
});
Ext.define("Docs.view.comments.RepliesExpander", {
    alias: "widget.commentsRepliesExpander",
    extend: "Ext.Component",
    requires: ["Docs.Comments"],
    uses: ["Docs.view.comments.ListWithForm"],
    componentCls: "comments-replies-expander",
    initComponent: function() {
        this.tpl = new Ext.XTemplate('<a href="#" class="replies-button {[this.getCountCls(values.count)]}">', "{[this.renderCount(values.count)]}", "</a>", {
            renderCount: this.renderCount,
            getCountCls: this.getCountCls
        });
        this.data = {
            count: this.count
        };
        this.callParent(arguments)
    },
    renderCount: function(b) {
        if (b === 1) {
            return "1 reply..."
        } else {
            if (b > 1) {
                return b + " replies..."
            } else {
                return "Write reply..."
            }
        }
    },
    getCountCls: function(b) {
        return (b > 0) ? "with-replies" : ""
    },
    afterRender: function() {
        this.callParent(arguments);
        this.getEl().down(".replies-button").on("click", this.toggle, this, {
            preventDefault: true
        })
    },
    toggle: function() {
        this.expanded ? this.collapse() : this.expand()
    },
    expand: function() {
        this.expanded = true;
        this.getEl().down(".replies-button").update("Hide replies.");
        if (this.list) {
            this.list.show()
        } else {
            this.loadComments()
        }
    },
    collapse: function() {
        this.expanded = false;
        this.refreshRepliesButton();
        if (this.list) {
            this.list.hide()
        }
    },
    refreshRepliesButton: function() {
        var b = this.getEl().down(".replies-button");
        b.update(this.renderCount(this.count));
        b.removeCls("with-replies");
        b.addCls(this.getCountCls(this.count))
    },
    loadComments: function() {
        this.list = new Docs.view.comments.ListWithForm({
            target: this.target,
            parentId: this.parentId,
            newCommentTitle: "<b>Reply to comment</b>",
            renderTo: this.getEl(),
            listeners: {
                countChange: this.setCount,
                scope: this
            }
        });
        Docs.Comments.loadReplies(this.parentId, function(b) {
            this.list.load(b)
        }, this)
    },
    setCount: function(b) {
        this.count = b;
        if (!this.expanded) {
            this.refreshRepliesButton()
        }
    }
});
Ext.define("Docs.model.Comment", {
    extend: "Ext.data.Model",
    requires: ["Docs.Comments"],
    fields: [{
        name: "id",
        mapping: "_id"
    }, "author", "emailHash", "moderator", "createdAt", "target", "score", "upVote", "downVote", "contentHtml", "read", "tags", "deleted", "parentId", "replyCount"],
    proxy: {
        type: "ajax",
        reader: "json"
    },
    vote: function(c, d) {
        this.request({
            method: "POST",
            url: "/comments/" + this.get("id"),
            params: {
                vote: c
            },
            success: function(a) {
                this.set("upVote", a.direction === "up");
                this.set("downVote", a.direction === "down");
                this.set("score", a.total);
                this.commit()
            },
            failure: Ext.Function.bind(d.failure, d.scope),
            scope: this
        })
    },
    loadContent: function(c, d) {
        this.request({
            url: "/comments/" + this.get("id"),
            method: "GET",
            success: function(a) {
                c.call(d, a.content)
            },
            scope: this
        })
    },
    saveContent: function(b) {
        this.request({
            url: "/comments/" + this.get("id"),
            method: "POST",
            params: {
                content: b
            },
            success: function(a) {
                this.set("contentHtml", a.content);
                this.commit()
            },
            scope: this
        })
    },
    setDeleted: function(b) {
        this.request({
            url: "/comments/" + this.get("id") + (b ? "/delete" : "/undo_delete"),
            method: "POST",
            success: function() {
                this.set("deleted", b);
                this.commit();
                Docs.Comments.changeCount(this.get("target"), b ? -1 : +1)
            },
            scope: this
        })
    },
    markRead: function() {
        this.request({
            url: "/comments/" + this.get("id") + "/read",
            method: "POST",
            success: function() {
                this.set("read", true);
                this.commit()
            },
            scope: this
        })
    },
    setParent: function(d, f, e) {
        this.request({
            url: "/comments/" + this.get("id") + "/set_parent",
            method: "POST",
            params: d ? {
                parentId: d.get("id")
            } : undefined,
            success: f,
            scope: e
        })
    },
    addTag: function(b) {
        this.changeTag("add_tag", b, function() {
            this.get("tags").push(b)
        }, this)
    },
    removeTag: function(b) {
        this.changeTag("remove_tag", b, function() {
            Ext.Array.remove(this.get("tags"), b)
        }, this)
    },
    changeTag: function(h, e, g, f) {
        this.request({
            url: "/comments/" + this.get("id") + "/" + h,
            method: "POST",
            params: {
                tagname: e
            },
            success: function() {
                g.call(f);
                this.commit()
            },
            scope: this
        })
    },
    request: function(b) {
        Docs.Comments.request("ajax", {
            url: b.url,
            method: b.method,
            params: b.params,
            callback: function(h, f, a) {
                var g = Ext.JSON.decode(a.responseText);
                if (f && g.success) {
                    b.success && b.success.call(b.scope, g)
                } else {
                    b.failure && b.failure.call(b.scope, g.reason)
                }
            },
            scope: this
        })
    }
});
Ext.define("Docs.CommentsProxy", {
    extend: "Ext.data.proxy.JsonP",
    alias: "proxy.comments",
    requires: ["Docs.Comments"],
    constructor: function(b) {
        b.url = Docs.Comments.buildRequestUrl(b.url);
        this.callParent([b])
    }
});
Ext.define("Docs.model.Target", {
    extend: "Ext.data.Model",
    requires: ["Docs.CommentsProxy"],
    fields: ["id", "type", "cls", "member", "score", {
        name: "text",
        convert: function(e, f) {
            var d = f.data;
            if (d.type === "class") {
                return d.cls + (d.member ? "#" + d.member.replace(/^.*-/, "") : "")
            } else {
                return d.type + " " + d.cls
            }
        }
    }],
    proxy: {
        type: "comments",
        url: "/targets",
        reader: {
            type: "json",
            root: "data"
        }
    }
});
Ext.define("Docs.view.comments.Targets", {
    extend: "Docs.view.comments.TopList",
    alias: "widget.commentsTargets",
    requires: ["Docs.model.Target"],
    model: "Docs.model.Target",
    displayField: "text",
    filterEmptyText: "Filter topics by name..."
});
Ext.define("Docs.model.Tag", {
    extend: "Ext.data.Model",
    requires: ["Docs.CommentsProxy"],
    fields: ["tagname", "score"],
    proxy: {
        type: "comments",
        url: "/tags",
        reader: {
            type: "json",
            root: "data"
        }
    }
});
Ext.define("Docs.view.comments.Tags", {
    extend: "Docs.view.comments.TopList",
    alias: "widget.commentsTags",
    requires: ["Docs.model.Tag"],
    model: "Docs.model.Tag",
    displayField: "tagname",
    filterEmptyText: "Filter tags by name..."
});
Ext.define("Docs.view.comments.TagEditor", {
    extend: "Ext.container.Container",
    requires: ["Docs.model.Tag"],
    floating: true,
    hidden: true,
    componentCls: "comments-tageditor",
    statics: {
        cachedStore: undefined,
        getStore: function() {
            if (!this.cachedStore) {
                this.cachedStore = Ext.create("Ext.data.Store", {
                    model: "Docs.model.Tag",
                    listeners: {
                        load: function() {
                            this.cachedStore.sort("tagname", "ASC")
                        },
                        scope: this
                    }
                });
                this.cachedStore.load()
            }
            return this.cachedStore
        }
    },
    initComponent: function() {
        this.items = [{
            xtype: "combobox",
            listConfig: {
                cls: "comments-tageditor-boundlist"
            },
            store: this.statics().getStore(),
            queryMode: "local",
            displayField: "tagname",
            valueField: "tagname",
            enableKeyEvents: true,
            emptyText: "New tag name...",
            listeners: {
                select: this.handleSelect,
                blur: this.destroy,
                keyup: this.onKeyUp,
                scope: this
            }
        }];
        this.callParent(arguments)
    },
    popup: function(b) {
        this.show();
        this.alignTo(b, "bl", [-12, -2]);
        this.down("combobox").focus(true, 100)
    },
    onKeyUp: function(c, d) {
        if (d.keyCode === Ext.EventObject.ENTER) {
            this.handleSelect()
        } else {
            if (d.keyCode === Ext.EventObject.ESC) {
                this.destroy()
            }
        }
    },
    handleSelect: function() {
        var c = Ext.String.trim(this.down("combobox").getValue() || "");
        if (c) {
            var d = this.rememberNewTag(c);
            this.fireEvent("select", d)
        }
        this.destroy()
    },
    rememberNewTag: function(g) {
        var f = this.statics().getStore();
        var e = new RegExp("^" + Ext.String.escapeRegex(g) + "$", "i");
        var h = f.query("tagname", e);
        if (h.getCount() === 0) {
            f.add({
                tagname: g
            });
            f.sort("tagname", "ASC");
            return g
        } else {
            return h.get(0).get("tagname")
        }
    }
});
Ext.define("Docs.view.comments.List", {
    extend: "Ext.view.View",
    alias: "widget.commentsList",
    requires: ["Docs.Auth", "Docs.Syntax", "Docs.Comments", "Docs.view.comments.Template", "Docs.view.comments.Form", "Docs.view.comments.TagEditor", "Docs.view.comments.RepliesExpander", "Docs.view.comments.DragZone", "Docs.view.comments.DropZone", "Docs.model.Comment", "Docs.Tip"],
    componentCls: "comments-list",
    itemSelector: "div.comment",
    emptyText: '<div class="loading">Loading...</div>',
    deferEmptyText: false,
    initComponent: function() {
        this.store = Ext.create("Ext.data.Store", {
            model: "Docs.model.Comment",
            listeners: {
                update: this.fireChangeEvent,
                scope: this
            }
        });
        this.tpl = Docs.view.comments.Template.create({
            showTarget: this.showTarget,
            enableDragDrop: this.enableDragDrop
        });
        this.callParent(arguments);
        this.on("refresh", function() {
            Docs.Syntax.highlight(this.getEl());
            this.renderExpanders(this.store.getRange())
        }, this);
        this.on("itemupdate", function(f, e, d) {
            Docs.Syntax.highlight(d);
            this.renderExpanders([f])
        }, this)
    },
    renderExpanders: function(b) {
        if (b[0] && b[0].get("parentId")) {
            return
        }
        Ext.Array.forEach(b, function(a) {
            if (a.get("deleted")) {
                return
            }
            new Docs.view.comments.RepliesExpander({
                count: a.get("replyCount"),
                target: a.get("target"),
                parentId: a.get("id"),
                renderTo: this.getNode(a)
            })
        }, this)
    },
    afterRender: function() {
        this.callParent(arguments);
        this.mun(this.getTargetEl(), "keydown");
        this.delegateClick("a.voteCommentUp", function(d, c) {
            this.vote(d, c, "up")
        }, this);
        this.delegateClick("a.voteCommentDown", function(d, c) {
            this.vote(d, c, "down")
        }, this);
        this.delegateClick("a.editComment", function(d, c) {
            this.edit(d, c)
        }, this);
        this.delegateClick("a.deleteComment", function(d, c) {
            this.setDeleted(d, c, true)
        }, this);
        this.delegateClick("a.undoDeleteComment", function(d, c) {
            this.setDeleted(d, c, false)
        }, this);
        this.delegateClick("a.readComment", this.markRead, this);
        this.delegateClick("a.add-tag", this.addTag, this);
        this.delegateClick("a.remove-tag", this.removeTag, this);
        if (this.enableDragDrop) {
            new Docs.view.comments.DragZone(this);
            new Docs.view.comments.DropZone(this, {
                onValidDrop: Ext.Function.bind(this.setParent, this)
            })
        }
    },
    delegateClick: function(e, f, d) {
        this.getEl().on("click", function(b, c) {
            var a = this.getRecord(this.findItemByChild(c));
            if (a) {
                f.call(d, c, a)
            }
        }, this, {
            preventDefault: true,
            delegate: e
        })
    },
    vote: function(e, f, d) {
        if (!Docs.Auth.isLoggedIn()) {
            Docs.Tip.show("Please login to vote on this comment", e);
            return
        }
        if (f.get("upVote") && d === "up" || f.get("downVote") && d === "down") {
            Docs.Tip.show("You have already voted on this comment", e);
            return
        }
        f.vote(d, {
            failure: function(a) {
                Docs.Tip.show(a, e)
            }
        })
    },
    edit: function(d, c) {
        c.loadContent(function(a) {
            var b = Ext.get(d).up(".comment").down(".content");
            b.update("");
            new Docs.view.comments.Form({
                renderTo: b,
                title: "<b>Edit comment</b>",
                user: Docs.Auth.getUser(),
                content: a,
                listeners: {
                    submit: function(f) {
                        c.saveContent(f)
                    },
                    cancel: function() {
                        this.refreshComment(c)
                    },
                    scope: this
                }
            })
        }, this)
    },
    refreshComment: function(b) {
        this.refreshNode(this.getStore().findExact("id", b.get("id")))
    },
    setDeleted: function(d, f, e) {
        f.setDeleted(e)
    },
    markRead: function(d, c) {
        c.markRead()
    },
    addTag: function(d, f) {
        var e = new Docs.view.comments.TagEditor();
        e.on("select", f.addTag, f);
        e.popup(d)
    },
    removeTag: function(e, f) {
        var d = Ext.get(e).up(".tag").down("b").getHTML();
        f.removeTag(d)
    },
    setParent: function(c, d) {
        c.setParent(d, function() {
            this.fireEvent("reorder")
        }, this)
    },
    load: function(f, e) {
        if (f.length === 0) {
            this.emptyText = ""
        }
        var d = this.store.getProxy().getReader().readRecords(f).records;
        this.store.loadData(d, e);
        this.fireChangeEvent()
    },
    fireChangeEvent: function() {
        var b = function(a) {
            return !a.get("deleted")
        };
        this.fireEvent("countChange", this.getStore().queryBy(b).getCount())
    }
});
Ext.define("Docs.view.comments.FullList", {
    extend: "Ext.panel.Panel",
    alias: "widget.commentsFullList",
    requires: ["Docs.Settings", "Docs.Auth", "Docs.Comments", "Docs.view.comments.List", "Docs.view.comments.Pager"],
    componentCls: "comments-full-list",
    dockedItems: [{
        xtype: "container",
        dock: "top",
        height: 35,
        html: ['<h1 style="float:left;">Comments</h1>', '<p style="float:left; margin: 5px 0 0 25px">', '<label style="padding-right: 10px;"><input type="checkbox" name="hideRead" id="hideRead" /> Hide read</label>', "</p>"].join(" ")
    }],
    layout: "border",
    items: [{
        xtype: "tabpanel",
        cls: "comments-tabpanel",
        plain: true,
        region: "north",
        height: 25,
        items: [{
            title: "Recent"
        }, {
            title: "Votes"
        }]
    }, {
        region: "center",
        xtype: "container",
        autoScroll: true,
        cls: "iScroll",
        items: [{
            xtype: "commentsList",
            id: "recentcomments",
            showTarget: true
        }, {
            xtype: "commentsPager"
        }]
    }],
    afterRender: function() {
        this.callParent(arguments);
        this.initCheckboxes();
        this.initTabs();
        this.setMasked(true)
    },
    load: function(f, e) {
        this.down("commentsList").load(f, e);
        var d = f[f.length - 1];
        if (d) {
            this.down("commentsPager").configure(d)
        } else {
            this.down("commentsPager").reset()
        }
    },
    setMasked: function(c) {
        var d = this.getEl();
        if (d) {
            d[c ? "mask" : "unmask"]()
        }
    },
    initCheckboxes: function() {
        var f = Docs.Settings.get("comments");
        var e = Ext.get("hideRead");
        if (e) {
            e.dom.checked = f.hideRead;
            e.on("change", function() {
                this.saveSetting("hideRead", e.dom.checked);
                this.fireEvent("hideReadChange")
            }, this)
        }
        this.setHideReadVisibility();
        var d = Docs.App.getController("Auth");
        d.on("available", this.setHideReadVisibility, this);
        d.on("loggedIn", this.setHideReadVisibility, this);
        d.on("loggedOut", this.setHideReadVisibility, this)
    },
    setHideReadVisibility: function() {
        var b = Docs.Auth.isModerator();
        Ext.get("hideRead").up("label").setStyle("display", b ? "inline" : "none")
    },
    initTabs: function() {
        this.down("tabpanel[cls=comments-tabpanel]").on("tabchange", function(d, c) {
            if (c.title === "Recent") {
                this.fireEvent("sortOrderChange", "recent")
            } else {
                this.fireEvent("sortOrderChange", "votes")
            }
        }, this)
    },
    saveSetting: function(d, e) {
        var f = Docs.Settings.get("comments");
        f[d] = e;
        Docs.Settings.set("comments", f)
    },
    getTab: function() {
        return Docs.Comments.isEnabled() ? {
            cls: "comments",
            href: "#!/comment",
            tooltip: "Comments"
        } : false
    }
});
Ext.define("Docs.view.comments.Index", {
    extend: "Ext.panel.Panel",
    alias: "widget.commentindex",
    mixins: ["Docs.view.Scrolling"],
    requires: ["Docs.Comments", "Docs.view.comments.FullList", "Docs.view.comments.HeaderMenu", "Docs.view.comments.Users", "Docs.view.comments.Targets", "Docs.view.comments.Tags"],
    componentCls: "comments-index",
    margin: "10 0 0 0",
    layout: "border",
    items: [{
        region: "center",
        xtype: "commentsFullList"
    }, {
        region: "east",
        itemId: "cardPanel",
        layout: "border",
        width: 300,
        margin: "0 0 0 20",
        layout: "card",
        dockedItems: [{
            xtype: "commentsHeaderMenu",
            dock: "top",
            height: 35
        }],
        items: [{
            xtype: "commentsUsers"
        }, {
            xtype: "commentsTargets"
        }, {
            xtype: "commentsTags"
        }]
    }],
    initComponent: function() {
        this.callParent(arguments);
        var d = this.down("#cardPanel");
        var c = {
            users: this.down("commentsUsers"),
            targets: this.down("commentsTargets"),
            tags: this.down("commentsTags")
        };
        this.down("commentsHeaderMenu").on("select", function(a) {
            Ext.Object.each(c, function(b, f) {
                if (b !== a) {
                    f.deselectAll()
                }
            });
            d.getLayout().setActiveItem(c[a])
        }, this)
    },
    getTab: function() {
        return Docs.Comments.isEnabled() ? {
            cls: "comments",
            href: "#!/comment",
            tooltip: "Comments"
        } : false
    }
});
Ext.define("Docs.view.HoverMenu", {
    extend: "Ext.view.View",
    requires: ["Docs.Comments", "Docs.view.Signature"],
    alias: "widget.hovermenu",
    componentCls: "hover-menu",
    itemSelector: "div.item",
    deferEmptyText: false,
    columnHeight: 25,
    initComponent: function() {
        this.renderTo = Ext.getBody();
        this.tpl = new Ext.XTemplate("<table>", "<tr>", "<td>", '<tpl for=".">', '<div class="item">', "{[this.renderLink(values)]}", "</div>", '<tpl if="xindex % this.columnHeight === 0 && xcount &gt; xindex">', "</td><td>", "</tpl>", "</tpl>", "</td>", "</tr>", "</table>", {
            columnHeight: this.columnHeight,
            renderLink: function(e) {
                var d = Docs.view.Signature.render(e.meta);
                var f = Docs.Comments.counterHtml(e.commentCount);
                return Ext.String.format('<a href="#!/api/{0}" rel="{0}" class="docClass">{1} {2} {3}</a>', e.url, e.label, d, f)
            }
        });
        this.callParent()
    }
});
Ext.define("Docs.view.HoverMenuButton", {
    extend: "Ext.toolbar.TextItem",
    alias: "widget.hovermenubutton",
    componentCls: "hover-menu-button",
    requires: ["Docs.view.HoverMenu"],
    showCount: false,
    statics: {
        menus: []
    },
    initComponent: function() {
        this.addEvents("click");
        if (this.showCount) {
            this.initialText = this.text;
            this.text += " <sup>" + this.store.getCount() + "</sup>";
            this.store.on("datachanged", function() {
                this.setText(this.initialText + " <sup>" + this.store.getCount() + "</sup>")
            }, this)
        }
        this.callParent(arguments)
    },
    getColumnHeight: function() {
        var c = 200;
        var d = 18;
        return Math.floor((Ext.Element.getViewportHeight() - c) / d)
    },
    onRender: function() {
        this.callParent(arguments);
        this.getEl().on({
            click: function() {
                this.fireEvent("click")
            },
            mouseover: this.deferShowMenu,
            mouseout: this.deferHideMenu,
            scope: this
        })
    },
    onDestroy: function() {
        if (this.menu) {
            this.menu.destroy();
            Ext.Array.remove(Docs.view.HoverMenuButton.menus, this.menu)
        }
        this.callParent(arguments)
    },
    renderMenu: function() {
        this.menu = Ext.create("Docs.view.HoverMenu", {
            store: this.store,
            columnHeight: this.getColumnHeight()
        });
        this.menu.getEl().on({
            click: function(b) {
                this.menu.hide();
                b.preventDefault()
            },
            mouseover: function() {
                clearTimeout(this.hideTimeout)
            },
            mouseout: this.deferHideMenu,
            scope: this
        });
        Docs.view.HoverMenuButton.menus.push(this.menu)
    },
    deferHideMenu: function() {
        clearTimeout(Docs.view.HoverMenuButton.showTimeout);
        if (!this.menu) {
            return
        }
        this.hideTimeout = Ext.Function.defer(function() {
            this.menu.hide()
        }, 200, this)
    },
    deferShowMenu: function() {
        clearTimeout(Docs.view.HoverMenuButton.showTimeout);
        Docs.view.HoverMenuButton.showTimeout = Ext.Function.defer(function() {
            if (!this.menu) {
                this.renderMenu()
            }
            Ext.Array.forEach(Docs.view.HoverMenuButton.menus, function(a) {
                if (a !== this.menu) {
                    a.hide()
                }
            }, this);
            clearTimeout(this.hideTimeout);
            this.menu.show();
            var j = this.getEl().getXY(),
                n = Ext.ComponentQuery.query("classoverview toolbar")[0],
                k = j[0] - 10,
                l = n.getEl().getXY(),
                i = n.getWidth(),
                m = this.menu.getEl().getWidth(),
                h = Ext.getCmp("doctabs").getWidth();
            if (m > h) {
                k = 0
            } else {
                if ((k + m) > h) {
                    k = h - m - 30
                }
            }
            if (k < l[0]) {
                k = l[0]
            }
            this.menu.getEl().setStyle({
                left: k + "px",
                top: (j[1] + 25) + "px"
            })
        }, 200, this)
    },
    getStore: function() {
        return this.store
    }
});
Ext.define("Docs.view.cls.Toolbar", {
    extend: "Ext.toolbar.Toolbar",
    requires: ["Docs.view.HoverMenuButton", "Docs.Settings", "Docs.Comments", "Ext.form.field.Checkbox"],
    dock: "top",
    cls: "member-links",
    docClass: {},
    accessors: {},
    initComponent: function() {
        this.addEvents("menubuttonclick", "commentcountclick", "filter", "toggleExpanded");
        this.items = [];
        this.memberButtons = {};
        Ext.Array.forEach(Docs.data.memberTypes, function(e) {
            var a = Ext.Array.filter(this.docClass.members, function(c) {
                return c.tagname === e.name
            });
            a.sort(function(c, d) {
                if (c.name === "constructor" && c.tagname === "method") {
                    return -1
                }
                return c.name < d.name ? -1 : (c.name > d.name ? 1 : 0)
            });
            if (a.length > 0) {
                var f = this.createMemberButton({
                    text: e.toolbar_title || e.title,
                    type: e.name,
                    members: a
                });
                this.memberButtons[e.name] = f;
                this.items.push(f)
            }
        }, this);
        this.checkItems = {
            "public": this.createCb("Public", "public"),
            "protected": this.createCb("Protected", "protected"),
            "private": this.createCb("Private", "private"),
            inherited: this.createCb("Inherited", "inherited"),
            accessor: this.createCb("Accessor", "accessor"),
            deprecated: this.createCb("Deprecated", "deprecated"),
            removed: this.createCb("Removed", "removed")
        };
        var b = this;
        this.items = this.items.concat([{
            xtype: "tbfill"
        }, this.filterField = Ext.widget("triggerfield", {
            triggerCls: "reset",
            cls: "member-filter",
            hideTrigger: true,
            emptyText: "Filter class members",
            enableKeyEvents: true,
            width: 150,
            listeners: {
                keyup: function(a) {
                    this.fireEvent("filter", a.getValue(), this.getShowFlags());
                    a.setHideTrigger(a.getValue().length === 0)
                },
                specialkey: function(d, a) {
                    if (a.keyCode === Ext.EventObject.ESC) {
                        d.reset();
                        this.fireEvent("filter", "", this.getShowFlags())
                    }
                },
                scope: this
            },
            onTriggerClick: function() {
                this.reset();
                this.focus();
                b.fireEvent("filter", "", b.getShowFlags());
                this.setHideTrigger(true)
            }
        }), {
            xtype: "tbspacer",
            width: 10
        }, this.commentCount = this.createCommentCount(), {
            xtype: "button",
            text: "Show",
            menu: [this.checkItems["public"], this.checkItems["protected"], this.checkItems["private"], "-", this.checkItems.inherited, this.checkItems.accessor, this.checkItems.deprecated, this.checkItems.removed]
        }, {
            xtype: "button",
            iconCls: "expand-all-members",
            tooltip: "Expand all",
            enableToggle: true,
            toggleHandler: function(a, d) {
                a.setIconCls(d ? "collapse-all-members" : "expand-all-members");
                this.fireEvent("toggleExpanded", d)
            },
            scope: this
        }]);
        this.callParent(arguments)
    },
    getShowFlags: function() {
        var d = {};
        for (var c in this.checkItems) {
            d[c] = this.checkItems[c].checked
        }
        return d
    },
    createCb: function(c, d) {
        return Ext.widget("menucheckitem", {
            text: c,
            checked: Docs.Settings.get("show")[d],
            listeners: {
                checkchange: function() {
                    this.fireEvent("filter", this.filterField.getValue(), this.getShowFlags())
                },
                scope: this
            }
        })
    },
    createMemberButton: function(d) {
        var c = Ext.Array.map(d.members, function(a) {
            return this.createLinkRecord(this.docClass.name, a)
        }, this);
        return Ext.create("Docs.view.HoverMenuButton", {
            text: d.text,
            cls: "icon-" + d.type,
            store: this.createStore(c),
            showCount: true,
            listeners: {
                click: function() {
                    this.fireEvent("menubuttonclick", d.type)
                },
                scope: this
            }
        })
    },
    createStore: function(c) {
        var d = Ext.create("Ext.data.Store", {
            fields: ["id", "url", "label", "inherited", "accessor", "meta", "commentCount"]
        });
        d.add(c);
        return d
    },
    createLinkRecord: function(d, c) {
        return {
            id: c.id,
            url: d + "-" + c.id,
            label: (c.tagname === "method" && c.name === "constructor") ? "new " + d : c.name,
            inherited: c.owner !== d,
            accessor: c.tagname === "method" && this.accessors.hasOwnProperty(c.name),
            meta: c.meta,
            commentCount: Docs.Comments.getCount(["class", d, c.id])
        }
    },
    showMenuItems: function(d, e, f) {
        Ext.Array.forEach(Docs.data.memberTypes, function(b) {
            var c = this.memberButtons[b.name];
            if (c) {
                c.getStore().filterBy(function(h) {
                    return !(!d["public"] && !(h.get("meta")["private"] || h.get("meta")["protected"]) || !d["protected"] && h.get("meta")["protected"] || !d["private"] && h.get("meta")["private"] || !d.inherited && h.get("inherited") || !d.accessor && h.get("accessor") || !d.deprecated && h.get("meta")["deprecated"] || !d.removed && h.get("meta")["removed"] || e && !f.test(h.get("label")))
                });
                var a = c.menu;
                if (a && Ext.getVersion().version >= "4.1.0") {
                    a.show();
                    a.hide()
                }
            }
        }, this)
    },
    getFilterValue: function() {
        return this.filterField.getValue()
    },
    createCommentCount: function() {
        return Ext.create("Ext.container.Container", {
            width: 24,
            margin: "0 4 0 0",
            cls: "comment-btn",
            html: "0",
            hidden: true,
            listeners: {
                afterrender: function(b) {
                    b.el.addListener("click", function() {
                        this.fireEvent("commentcountclick")
                    }, this)
                },
                scope: this
            }
        })
    },
    showCommentCount: function() {
        this.commentCount.show()
    },
    setCommentCount: function(b) {
        this.commentCount.update("" + (b || 0));
        this.refreshMenuCommentCounts()
    },
    refreshMenuCommentCounts: function() {
        Ext.Object.each(this.memberButtons, function(c, d) {
            d.getStore().each(function(a) {
                a.set("commentCount", Docs.Comments.getCount(["class", this.docClass.name, a.get("id")]))
            }, this)
        }, this)
    }
});
Ext.define("Docs.view.cls.Overview", {
    extend: "Ext.panel.Panel",
    alias: "widget.classoverview",
    requires: ["Docs.view.cls.Toolbar", "Docs.view.examples.Inline", "Docs.view.comments.LargeExpander", "Docs.view.cls.MemberWrap", "Docs.view.comments.MemberWrap", "Docs.Syntax", "Docs.Settings", "Docs.Comments"],
    mixins: ["Docs.view.Scrolling"],
    cls: "class-overview iScroll",
    autoScroll: true,
    border: false,
    bodyPadding: "20 8 20 5",
    initComponent: function() {
        this.addEvents("afterload");
        this.callParent(arguments)
    },
    scrollToEl: function(j, h) {
        var g = (typeof j == "string") ? Ext.get(Ext.query(j)[0]) : j;
        if (g) {
            var f = g.hasCls("member");
            g.show();
            if (!g.isVisible(true)) {
                g.up(".subsection").show();
                g.up(".members-section").show()
            }
            if (f && g.down(".expandable")) {
                this.setMemberExpanded(j.replace(/#/, ""), true)
            }
            var i = this.body.getBox().y;
            this.scrollToView(g, {
                highlight: true,
                offset: (h || 0) - (f ? i : i - 10)
            })
        }
    },
    load: function(b) {
        this.docClass = b;
        this.accessors = this.buildAccessorsMap();
        if (this.toolbar) {
            this.removeDocked(this.toolbar, false);
            this.toolbar.destroy()
        }
        this.toolbar = Ext.create("Docs.view.cls.Toolbar", {
            docClass: this.docClass,
            accessors: this.accessors,
            listeners: {
                filter: function(d, a) {
                    this.filterMembers(d, a)
                },
                menubuttonclick: function(a) {
                    this.scrollToEl("h3.members-title.icon-" + a, -20)
                },
                commentcountclick: this.expandClassComments,
                scope: this
            }
        });
        this.addDocked(this.toolbar);
        this.update(b.html);
        Docs.Syntax.highlight(this.getEl());
        this.filterMembers("", Docs.Settings.get("show"));
        if (Docs.Comments.isEnabled()) {
            this.initComments()
        } else {
            this.initBasicMemberWrappers()
        }
        this.fireEvent("afterload")
    },
    initComments: function() {
        this.toolbar.showCommentCount();
        this.toolbar.setCommentCount(Docs.Comments.getCount(["class", this.docClass.name, ""]));
        this.clsExpander = new Docs.view.comments.LargeExpander({
            name: this.docClass.name,
            el: Ext.query(".doc-contents")[0]
        });
        this.memberWrappers = {};
        Ext.Array.forEach(Ext.query(".member"), function(c) {
            var d = new Docs.view.comments.MemberWrap({
                parent: this,
                className: this.docClass.name,
                el: c
            });
            this.memberWrappers[d.getMemberId()] = d
        }, this)
    },
    initBasicMemberWrappers: function() {
        this.memberWrappers = {};
        Ext.Array.forEach(Ext.query(".member"), function(c) {
            var d = new Docs.view.cls.MemberWrap({
                el: c
            });
            this.memberWrappers[d.getMemberId()] = d
        }, this)
    },
    updateCommentCounts: function() {
        if (!this.docClass) {
            return
        }
        var b = Docs.Comments.getCount(["class", this.docClass.name, ""]);
        this.toolbar.setCommentCount(b);
        this.clsExpander.getExpander().setCount(b);
        Ext.Object.each(this.memberWrappers, function(a, d) {
            d.setCount(Docs.Comments.getCount(d.getTarget()))
        }, this)
    },
    expandClassComments: function() {
        var b = this.clsExpander.getExpander();
        b.expand();
        this.scrollToEl(b.getEl(), -40)
    },
    setMemberExpanded: function(c, d) {
        this.memberWrappers[c].setExpanded(d)
    },
    isMemberExpanded: function(b) {
        return this.memberWrappers[b].isExpanded()
    },
    setAllMembersExpanded: function(b) {
        if (Docs.Comments.isEnabled()) {
            Ext.Object.each(this.memberWrappers, function(a, d) {
                d.getExpander().show()
            }, this)
        }
        Ext.Object.each(this.memberWrappers, function(a, d) {
            d.setExpanded(b)
        }, this)
    },
    filterMembers: function(h, e) {
        Docs.Settings.set("show", e);
        var f = h.length > 0;
        Ext.Array.forEach(Ext.query(".doc-contents, .hierarchy"), function(a) {
            Ext.get(a).setStyle({
                display: f ? "none" : "block"
            })
        });
        var g = new RegExp(Ext.String.escapeRegex(h), "i");
        this.eachMember(function(c) {
            var b = Ext.get(c.id);
            var a = !(!e["public"] && !(c.meta["private"] || c.meta["protected"]) || !e["protected"] && c.meta["protected"] || !e["private"] && c.meta["private"] || !e.inherited && (c.owner !== this.docClass.name) || !e.accessor && c.tagname === "method" && this.accessors.hasOwnProperty(c.name) || !e.deprecated && c.meta.deprecated || !e.removed && c.meta.removed || f && !g.test(c.name));
            if (a) {
                b.setStyle({
                    display: "block"
                })
            } else {
                b.setStyle({
                    display: "none"
                })
            }
        }, this);
        Ext.Array.forEach(Ext.query(".member.first-child"), function(a) {
            Ext.get(a).removeCls("first-child")
        });
        Ext.Array.forEach(Ext.query(".members-section"), function(b) {
            var a = this.getVisibleElements(".member", b);
            Ext.get(b).setStyle({
                display: a.length > 0 ? "block" : "none"
            });
            Ext.Array.forEach(Ext.query(".subsection", b), function(d) {
                var c = this.getVisibleElements(".member", d);
                if (c.length > 0) {
                    c[0].addCls("first-child");
                    Ext.get(d).setStyle({
                        display: "block"
                    })
                } else {
                    Ext.get(d).setStyle({
                        display: "none"
                    })
                }
            }, this)
        }, this);
        this.toolbar.showMenuItems(e, f, g)
    },
    buildAccessorsMap: function(c) {
        var d = {};
        Ext.Array.forEach(this.docClass.members, function(b) {
            if (b.tagname === "cfg") {
                var a = Ext.String.capitalize(b.name);
                d["get" + a] = true;
                d["set" + a] = true
            }
        });
        return d
    },
    getVisibleElements: function(e, d) {
        var f = Ext.Array.map(Ext.query(e, d), function(a) {
            return Ext.get(a)
        });
        return Ext.Array.filter(f, function(a) {
            return a.isVisible()
        })
    },
    eachMember: function(c, d) {
        Ext.Array.forEach(this.docClass.members, c, d)
    }
});
Ext.define("Docs.view.cls.Container", {
    extend: "Ext.container.Container",
    alias: "widget.classcontainer",
    requires: ["Docs.view.cls.Header", "Docs.view.cls.Overview"],
    layout: "border",
    padding: "5 10 0 10",
    initComponent: function() {
        this.items = [Ext.create("Docs.view.cls.Header", {
            region: "north"
        }), Ext.create("Docs.view.cls.Overview", {
            region: "center"
        })];
        this.callParent(arguments)
    }
});
Ext.define("Docs.view.Viewport", {
    extend: "Ext.container.Viewport",
    requires: ["Docs.view.search.Container", "Docs.view.Header", "Docs.view.Tabs", "Docs.view.TreeContainer", "Docs.view.welcome.Index", "Docs.view.auth.HeaderForm", "Docs.view.comments.Index", "Docs.view.cls.Index", "Docs.view.cls.Container", "Docs.view.guides.Index", "Docs.view.guides.Container", "Docs.view.videos.Index", "Docs.view.videos.Container", "Docs.view.examples.Index", "Docs.view.examples.Container", "Docs.view.examples.TouchContainer", "Docs.view.tests.Index"],
    id: "viewport",
    layout: "border",
    defaults: {
        xtype: "container"
    },
    initComponent: function() {
        this.items = [{
            region: "north",
            id: "north-region",
            height: 65,
            layout: {
                type: "vbox",
                align: "stretch"
            },
            items: [{
                height: 37,
                xtype: "container",
                layout: "hbox",
                items: [{
                    xtype: "docheader"
                }, {
                    xtype: "container",
                    flex: 1
                }, {
                    id: "loginContainer",
                    xtype: "authHeaderForm",
                    padding: "10 20 0 0"
                }, {
                    xtype: "searchcontainer",
                    id: "search-container",
                    width: 230,
                    margin: "4 0 0 0"
                }]
            }, {
                xtype: "doctabs"
            }]
        }, {
            region: "center",
            layout: "border",
            items: [{
                region: "west",
                xtype: "treecontainer",
                id: "treecontainer",
                border: 1,
                bodyPadding: "10 9 4 9",
                width: 240
            }, {
                region: "center",
                id: "center-container",
                layout: "fit",
                border: false,
                padding: "5 10",
                items: {
                    id: "card-panel",
                    cls: "card-panel",
                    xtype: "container",
                    layout: {
                        type: "card",
                        deferredRender: true
                    },
                    items: [{
                        autoScroll: true,
                        xtype: "welcomeindex",
                        id: "welcomeindex"
                    }, {
                        xtype: "container",
                        id: "failure"
                    }, {
                        autoScroll: true,
                        xtype: "classindex",
                        id: "classindex"
                    }, {
                        xtype: "classcontainer",
                        id: "classcontainer"
                    }, {
                        autoScroll: true,
                        xtype: "guideindex",
                        id: "guideindex"
                    }, {
                        autoScroll: true,
                        xtype: "guidecontainer",
                        id: "guide",
                        cls: "iScroll"
                    }, {
                        xtype: "videoindex",
                        id: "videoindex"
                    }, {
                        autoScroll: true,
                        xtype: "videocontainer",
                        id: "video",
                        cls: "iScroll"
                    }, {
                        xtype: "exampleindex",
                        id: "exampleindex"
                    }, {
                        xtype: Docs.data.touchExamplesUi ? "touchexamplecontainer" : "examplecontainer",
                        id: "example"
                    }, {
                        xtype: "testsindex",
                        id: "testsindex"
                    }, {
                        xtype: "commentindex",
                        id: "commentindex"
                    }]
                }
            }]
        }, {
            region: "south",
            id: "footer",
            height: 20,
            contentEl: "footer-content"
        }];
        this.callParent(arguments)
    },
    setPageTitle: function(b) {
        b = Ext.util.Format.stripTags(b);
        if (!this.origTitle) {
            this.origTitle = document.title
        }
        document.title = b ? (b + " - " + this.origTitle) : this.origTitle
    }
});
Ext.define("Docs.Application", {
    requires: ["Ext.app.Application", "Docs.History", "Docs.Comments", "Docs.Settings", "Docs.view.Viewport", "Docs.controller.Auth", "Docs.controller.Welcome", "Docs.controller.Failure", "Docs.controller.Classes", "Docs.controller.Search", "Docs.controller.InlineExamples", "Docs.controller.Examples", "Docs.controller.Guides", "Docs.controller.Videos", "Docs.controller.Tabs", "Docs.controller.Comments", "Docs.controller.CommentCounts", "Docs.controller.Tests"],
    constructor: function() {
        Docs.Comments.init(this.createApp, this)
    },
    createApp: function() {
        new Ext.app.Application({
            name: "Docs",
            controllers: ["Auth", "Welcome", "Failure", "Classes", "Search", "InlineExamples", "Examples", "Guides", "Videos", "Tabs", "Comments", "CommentCounts", "Tests"],
            launch: this.launch
        })
    },
    launch: function() {
        Docs.App = this;
        Docs.Settings.init();
        Ext.create("Docs.view.Viewport");
        Docs.History.init();
        if (Docs.initEventTracking) {
            Docs.initEventTracking()
        }
        Ext.get("loading").remove()
    }
});
Ext.define("Docs.view.auth.Form", {
    extend: "Docs.view.auth.BaseForm",
    alias: "widget.authForm",
    componentCls: "auth-form",
    initComponent: function() {
        this.html = ['<span class="before-text">Sign in to post a comment:</span>', this.createLoginFormHtml()];
        this.callParent(arguments)
    },
    afterRender: function() {
        this.callParent(arguments);
        this.bindFormSubmitEvent()
    }
});
Ext.define("Docs.view.comments.ListWithForm", {
    extend: "Ext.container.Container",
    alias: "widget.commentsListWithForm",
    requires: ["Docs.view.comments.List", "Docs.view.comments.Form", "Docs.view.auth.Form", "Docs.Comments", "Docs.Auth"],
    componentCls: "comments-list-with-form",
    initComponent: function() {
        this.items = [this.list = new Docs.view.comments.List({
            enableDragDrop: true
        })];
        this.relayEvents(this.list, ["countChange", "reorder"]);
        this.callParent(arguments)
    },
    load: function(c, d) {
        this.list.load(c, d);
        if (Docs.Auth.isLoggedIn()) {
            this.showCommentingForm()
        } else {
            this.showAuthForm()
        }
    },
    showAuthForm: function() {
        if (this.commentingForm) {
            this.remove(this.commentingForm);
            delete this.commentingForm
        }
        if (!this.authForm) {
            this.authForm = new Docs.view.auth.Form();
            this.add(this.authForm)
        }
    },
    showCommentingForm: function() {
        if (this.authForm) {
            this.remove(this.authForm);
            delete this.authForm
        }
        if (!this.commentingForm) {
            this.commentingForm = new Docs.view.comments.Form({
                title: this.newCommentTitle,
                user: Docs.Auth.getUser(),
                userSubscribed: Docs.Comments.hasSubscription(this.target),
                listeners: {
                    submit: this.postComment,
                    subscriptionChange: this.subscribe,
                    scope: this
                }
            });
            this.add(this.commentingForm)
        }
    },
    postComment: function(b) {
        Docs.Comments.post({
            target: this.target,
            parentId: this.parentId,
            content: b,
            callback: function(a) {
                this.commentingForm.setValue("");
                this.list.load([a], true)
            },
            scope: this
        })
    },
    subscribe: function(b) {
        Docs.Comments.subscribe(this.target, b, function() {
            this.commentingForm.showSubscriptionMessage(b)
        }, this)
    }
});
Ext.ns("Docs");
Ext.Loader.setConfig({
    enabled: true,
    paths: {
        Docs: "app"
    }
});
Ext.require("Ext.form.field.Trigger");
Ext.require("Ext.tab.Panel");
Ext.require("Ext.grid.column.Action");
Ext.require("Ext.grid.plugin.DragDrop");
Ext.require("Ext.layout.container.Border");
Ext.require("Ext.data.TreeStore");
Ext.require("Ext.toolbar.Spacer");
Ext.require("Docs.Application");
Ext.onReady(function() {
    Ext.create("Docs.Application")
});
! function() {
    var a = null;
    window.PR_SHOULD_USE_CONTINUATION = !0;
    (function() {
        function h(J) {
            function G(O) {
                var M = O.charCodeAt(0);
                if (M !== 92) {
                    return M
                }
                var N = O.charAt(1);
                return (M = p[N]) ? M : "0" <= N && N <= "7" ? parseInt(O.substring(1), 8) : N === "u" || N === "x" ? parseInt(O.substring(2), 16) : O.charCodeAt(1)
            }

            function F(M) {
                if (M < 32) {
                    return (M < 16 ? "\\x0" : "\\x") + M.toString(16)
                }
                M = String.fromCharCode(M);
                return M === "\\" || M === "-" || M === "]" || M === "^" ? "\\" + M : M
            }

            function I(R) {
                var M = R.substring(1, R.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),
                    R = [],
                    O = M[0] === "^",
                    S = ["["];
                O && S.push("^");
                for (var O = O ? 1 : 0, Q = M.length; O < Q; ++O) {
                    var P = M[O];
                    if (/\\[bdsw]/i.test(P)) {
                        S.push(P)
                    } else {
                        var P = G(P),
                            N;
                        O + 2 < Q && "-" === M[O + 1] ? (N = G(M[O + 2]), O += 2) : N = P;
                        R.push([P, N]);
                        N < 65 || P > 122 || (N < 65 || P > 90 || R.push([Math.max(65, P) | 32, Math.min(N, 90) | 32]), N < 97 || P > 122 || R.push([Math.max(97, P) & -33, Math.min(N, 122) & -33]))
                    }
                }
                R.sort(function(U, T) {
                    return U[0] - T[0] || T[1] - U[1]
                });
                M = [];
                Q = [];
                for (O = 0; O < R.length; ++O) {
                    P = R[O], P[0] <= Q[1] + 1 ? Q[1] = Math.max(Q[1], P[1]) : M.push(Q = P)
                }
                for (O = 0; O < M.length; ++O) {
                    P = M[O], S.push(F(P[0])), P[1] > P[0] && (P[1] + 1 > P[0] && S.push("-"), S.push(F(P[1])))
                }
                S.push("]");
                return S.join("")
            }

            function L(Q) {
                for (var N = Q.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), S = N.length, R = [], P = 0, O = 0; P < S; ++P) {
                    var M = N[P];
                    M === "(" ? ++O : "\\" === M.charAt(0) && (M = +M.substring(1)) && (M <= O ? R[M] = -1 : N[P] = F(M))
                }
                for (P = 1; P < R.length; ++P) {
                    -1 === R[P] && (R[P] = ++K)
                }
                for (O = P = 0; P < S; ++P) {
                    M = N[P], M === "(" ? (++O, R[O] || (N[P] = "(?:")) : "\\" === M.charAt(0) && (M = +M.substring(1)) && M <= O && (N[P] = "\\" + R[M])
                }
                for (P = 0; P < S; ++P) {
                    "^" === N[P] && "^" !== N[P + 1] && (N[P] = "")
                }
                if (Q.ignoreCase && y) {
                    for (P = 0; P < S; ++P) {
                        M = N[P], Q = M.charAt(0), M.length >= 2 && Q === "[" ? N[P] = I(M) : Q !== "\\" && (N[P] = M.replace(/[A-Za-z]/g, function(T) {
                            T = T.charCodeAt(0);
                            return "[" + String.fromCharCode(T & -33, T | 32) + "]"
                        }))
                    }
                }
                return N.join("")
            }
            for (var K = 0, y = !1, D = !1, C = 0, H = J.length; C < H; ++C) {
                var E = J[C];
                if (E.ignoreCase) {
                    D = !0
                } else {
                    if (/[a-z]/i.test(E.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                        y = !0;
                        D = !1;
                        break
                    }
                }
            }
            for (var p = {
                    b: 8,
                    t: 9,
                    n: 10,
                    v: 11,
                    f: 12,
                    r: 13
                }, v = [], C = 0, H = J.length; C < H; ++C) {
                E = J[C];
                if (E.global || E.multiline) {
                    throw Error("" + E)
                }
                v.push("(?:" + L(E) + ")")
            }
            return RegExp(v.join("|"), D ? "gi" : "g")
        }

        function g(C, G) {
            function F(H) {
                var I = H.nodeType;
                if (I == 1) {
                    if (!y.test(H.className)) {
                        for (I = H.firstChild; I; I = I.nextSibling) {
                            F(I)
                        }
                        I = H.nodeName.toLowerCase();
                        if ("br" === I || "li" === I) {
                            E[D] = "\n", p[D << 1] = v++, p[D++ << 1 | 1] = H
                        }
                    }
                } else {
                    if (I == 3 || I == 4) {
                        I = H.nodeValue, I.length && (I = G ? I.replace(/\r\n?/g, "\n") : I.replace(/[\t\n\r ]+/g, " "), E[D] = I, p[D << 1] = v, v += I.length, p[D++ << 1 | 1] = H)
                    }
                }
            }
            var y = /(?:^|\s)nocode(?:\s|$)/,
                E = [],
                v = 0,
                p = [],
                D = 0;
            F(C);
            return {
                a: E.join("").replace(/\n$/, ""),
                d: p
            }
        }

        function t(v, C, y, p) {
            C && (v = {
                a: C,
                e: v
            }, y(v), p.push.apply(p, v.g))
        }

        function f(v) {
            for (var C = void 0, y = v.firstChild; y; y = y.nextSibling) {
                var p = y.nodeType,
                    C = p === 1 ? C ? v : y : p === 3 ? e.test(y.nodeValue) ? v : C : C
            }
            return C === v ? void 0 : C
        }

        function A(y, E) {
            function D(R) {
                for (var K = R.e, J = [K, "pln"], Q = 0, L = R.a.match(C) || [], F = {}, H = 0, O = L.length; H < O; ++H) {
                    var P = L[H],
                        S = F[P],
                        T = void 0,
                        N;
                    if (typeof S === "string") {
                        N = !1
                    } else {
                        var M = v[P.charAt(0)];
                        if (M) {
                            T = P.match(M[1]), S = M[0]
                        } else {
                            for (N = 0; N < p; ++N) {
                                if (M = E[N], T = P.match(M[1])) {
                                    S = M[0];
                                    break
                                }
                            }
                            T || (S = "pln")
                        }
                        if ((N = S.length >= 5 && "lang-" === S.substring(0, 5)) && !(T && typeof T[1] === "string")) {
                            N = !1, S = "src"
                        }
                        N || (F[P] = S)
                    }
                    M = Q;
                    Q += P.length;
                    if (N) {
                        N = T[1];
                        var I = P.indexOf(N),
                            G = I + N.length;
                        T[2] && (G = P.length - T[2].length, I = G - N.length);
                        S = S.substring(5);
                        t(K + M, P.substring(0, I), D, J);
                        t(K + M + I, N, s(S, N), J);
                        t(K + M + G, P.substring(G), D, J)
                    } else {
                        J.push(K + M, S)
                    }
                }
                R.g = J
            }
            var v = {},
                C;
            (function() {
                for (var J = y.concat(E), G = [], F = {}, M = 0, H = J.length; M < H; ++M) {
                    var I = J[M],
                        L = I[3];
                    if (L) {
                        for (var K = L.length; --K >= 0;) {
                            v[L.charAt(K)] = I
                        }
                    }
                    I = I[1];
                    L = "" + I;
                    F.hasOwnProperty(L) || (G.push(I), F[L] = a)
                }
                G.push(/[\S\s]/);
                C = h(G)
            })();
            var p = E.length;
            return D
        }

        function u(v) {
            var D = [],
                C = [];
            v.tripleQuotedStrings ? D.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, a, "'\""]) : v.multiLineStrings ? D.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, a, "'\"`"]) : D.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, a, "\"'"]);
            v.verbatimStrings && C.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, a]);
            var p = v.hashComments;
            p && (v.cStyleComments ? (p > 1 ? D.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, a, "#"]) : D.push(["com", /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/, a, "#"]), C.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, a])) : D.push(["com", /^#[^\n\r]*/, a, "#"]));
            v.cStyleComments && (C.push(["com", /^\/\/[^\n\r]*/, a]), C.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, a]));
            if (p = v.regexLiterals) {
                var y = (p = p > 1 ? "" : "\n\r") ? "." : "[\\S\\s]";
                C.push(["lang-regex", RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" + ("/(?=[^/*" + p + "])(?:[^/\\x5B\\x5C" + p + "]|\\x5C" + y + "|\\x5B(?:[^\\x5C\\x5D" + p + "]|\\x5C" + y + ")*(?:\\x5D|$))+/") + ")")])
            }(p = v.types) && C.push(["typ", p]);
            p = ("" + v.keywords).replace(/^ | $/g, "");
            p.length && C.push(["kwd", RegExp("^(?:" + p.replace(/[\s,]+/g, "|") + ")\\b"), a]);
            D.push(["pln", /^\s+/, a, " \r\n\t\u00a0"]);
            p = "^.[^\\s\\w.$@'\"`/\\\\]*";
            v.regexLiterals && (p += "(?!s*/)");
            C.push(["lit", /^@[$_a-z][\w$@]*/i, a], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, a], ["pln", /^[$_a-z][\w$@]*/i, a], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, a, "0123456789"], ["pln", /^\\[\S\s]?/, a], ["pun", RegExp(p), a]);
            return A(D, C)
        }

        function q(J, G, F) {
            function I(M) {
                var P = M.nodeType;
                if (P == 1 && !K.test(M.className)) {
                    if ("br" === M.nodeName) {
                        L(M), M.parentNode && M.parentNode.removeChild(M)
                    } else {
                        for (M = M.firstChild; M; M = M.nextSibling) {
                            I(M)
                        }
                    }
                } else {
                    if ((P == 3 || P == 4) && F) {
                        var O = M.nodeValue,
                            N = O.match(y);
                        if (N) {
                            P = O.substring(0, N.index), M.nodeValue = P, (O = O.substring(N.index + N[0].length)) && M.parentNode.insertBefore(D.createTextNode(O), M.nextSibling), L(M), P || M.parentNode.removeChild(M)
                        }
                    }
                }
            }

            function L(N) {
                function M(P, U) {
                    var T = U ? P.cloneNode(!1) : P,
                        S = P.parentNode;
                    if (S) {
                        var S = M(S, 1),
                            R = P.nextSibling;
                        S.appendChild(T);
                        for (var Q = R; Q; Q = R) {
                            R = Q.nextSibling, S.appendChild(Q)
                        }
                    }
                    return T
                }
                for (; !N.nextSibling;) {
                    if (N = N.parentNode, !N) {
                        return
                    }
                }
                for (var N = M(N.nextSibling, 0), O;
                    (O = N.parentNode) && O.nodeType === 1;) {
                    N = O
                }
                H.push(N)
            }
            for (var K = /(?:^|\s)nocode(?:\s|$)/, y = /\r\n?|\n/, D = J.ownerDocument, C = D.createElement("li"); J.firstChild;) {
                C.appendChild(J.firstChild)
            }
            for (var H = [C], E = 0; E < H.length; ++E) {
                I(H[E])
            }
            G === (G | 0) && H[0].setAttribute("value", G);
            var p = D.createElement("ol");
            p.className = "linenums";
            for (var G = Math.max(0, G - 1 | 0) || 0, E = 0, v = H.length; E < v; ++E) {
                C = H[E], C.className = "L" + (E + G) % 10, C.firstChild || C.appendChild(D.createTextNode("\u00a0")), p.appendChild(C)
            }
            J.appendChild(p)
        }

        function B(v, C) {
            for (var y = C.length; --y >= 0;) {
                var p = C[y];
                w.hasOwnProperty(p) ? z.console && console.warn("cannot override language handler %s", p) : w[p] = v
            }
        }

        function s(p, v) {
            if (!p || !w.hasOwnProperty(p)) {
                p = /^\s*</.test(v) ? "default-markup" : "default-code"
            }
            return w[p]
        }

        function o(ad) {
            var aa = ad.h;
            try {
                var X = g(ad.c, ad.i),
                    ac = X.a;
                ad.a = ac;
                ad.d = X.d;
                ad.e = 0;
                s(aa, ac)(ad);
                var J = /\bMSIE\s(\d+)/.exec(navigator.userAgent),
                    J = J && +J[1] <= 8,
                    aa = /\n/g,
                    C = ad.a,
                    R = C.length,
                    X = 0,
                    U = ad.d,
                    T = U.length,
                    ac = 0,
                    ab = ad.g,
                    V = ab.length,
                    K = 0;
                ab[V] = R;
                var Q, Z;
                for (Z = Q = 0; Z < V;) {
                    ab[Z] !== ab[Z + 2] ? (ab[Q++] = ab[Z++], ab[Q++] = ab[Z++]) : Z += 2
                }
                V = Q;
                for (Z = Q = 0; Z < V;) {
                    for (var O = ab[Z], D = ab[Z + 1], I = Z + 2; I + 2 <= V && ab[I + 1] === D;) {
                        I += 2
                    }
                    ab[Q++] = O;
                    ab[Q++] = D;
                    Z = I
                }
                ab.length = Q;
                var Y = ad.c,
                    W;
                if (Y) {
                    W = Y.style.display, Y.style.display = "none"
                }
                try {
                    for (; ac < T;) {
                        var S = U[ac + 2] || R,
                            M = ab[K + 2] || R,
                            I = Math.min(S, M),
                            N = U[ac + 1],
                            F;
                        if (N.nodeType !== 1 && (F = C.substring(X, I))) {
                            J && (F = F.replace(aa, "\r"));
                            N.nodeValue = F;
                            var y = N.ownerDocument,
                                P = y.createElement("span");
                            P.className = ab[K + 1];
                            var E = N.parentNode;
                            E.replaceChild(P, N);
                            P.appendChild(N);
                            X < S && (U[ac + 1] = N = y.createTextNode(C.substring(I, S)), E.insertBefore(N, P.nextSibling))
                        }
                        X = I;
                        X >= S && (ac += 2);
                        X >= M && (K += 2)
                    }
                } finally {
                    if (Y) {
                        Y.style.display = W
                    }
                }
            } catch (H) {
                z.console && console.log(H && H.stack || H)
            }
        }
        var z = window,
            r = ["break,continue,do,else,for,if,return,while"],
            x = [
                [r, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
            ],
            n = [x, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
            m = [x, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
            l = [m, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],
            x = [x, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
            k = [r, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
            j = [r, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
            d = [r, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],
            r = [r, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
            i = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
            e = /\S/,
            c = u({
                keywords: [n, l, x, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", k, j, r],
                hashComments: !0,
                cStyleComments: !0,
                multiLineStrings: !0,
                regexLiterals: !0
            }),
            w = {};
        B(c, ["default-code"]);
        B(A([], [
            ["pln", /^[^<?]+/],
            ["dec", /^<!\w[^>]*(?:>|$)/],
            ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
            ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
            ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
            ["pun", /^(?:<[%?]|[%?]>)/],
            ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
            ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
            ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
            ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
        ]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
        B(A([
            ["pln", /^\s+/, a, " \t\r\n"],
            ["atv", /^(?:"[^"]*"?|'[^']*'?)/, a, "\"'"]
        ], [
            ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
            ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
            ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
            ["pun", /^[/<->]+/],
            ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
            ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
            ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
            ["lang-css", /^style\s*=\s*"([^"]+)"/i],
            ["lang-css", /^style\s*=\s*'([^']+)'/i],
            ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]
        ]), ["in.tag"]);
        B(A([], [
            ["atv", /^[\S\s]+/]
        ]), ["uq.val"]);
        B(u({
            keywords: n,
            hashComments: !0,
            cStyleComments: !0,
            types: i
        }), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
        B(u({
            keywords: "null,true,false"
        }), ["json"]);
        B(u({
            keywords: l,
            hashComments: !0,
            cStyleComments: !0,
            verbatimStrings: !0,
            types: i
        }), ["cs"]);
        B(u({
            keywords: m,
            cStyleComments: !0
        }), ["java"]);
        B(u({
            keywords: r,
            hashComments: !0,
            multiLineStrings: !0
        }), ["bash", "bsh", "csh", "sh"]);
        B(u({
            keywords: k,
            hashComments: !0,
            multiLineStrings: !0,
            tripleQuotedStrings: !0
        }), ["cv", "py", "python"]);
        B(u({
            keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: 2
        }), ["perl", "pl", "pm"]);
        B(u({
            keywords: j,
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }), ["rb", "ruby"]);
        B(u({
            keywords: x,
            cStyleComments: !0,
            regexLiterals: !0
        }), ["javascript", "js"]);
        B(u({
            keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
            hashComments: 3,
            cStyleComments: !0,
            multilineStrings: !0,
            tripleQuotedStrings: !0,
            regexLiterals: !0
        }), ["coffee"]);
        B(u({
            keywords: d,
            cStyleComments: !0,
            multilineStrings: !0
        }), ["rc", "rs", "rust"]);
        B(A([], [
            ["str", /^[\S\s]+/]
        ]), ["regex"]);
        var b = z.PR = {
            createSimpleLexer: A,
            registerLangHandler: B,
            sourceDecorator: u,
            PR_ATTRIB_NAME: "atn",
            PR_ATTRIB_VALUE: "atv",
            PR_COMMENT: "com",
            PR_DECLARATION: "dec",
            PR_KEYWORD: "kwd",
            PR_LITERAL: "lit",
            PR_NOCODE: "nocode",
            PR_PLAIN: "pln",
            PR_PUNCTUATION: "pun",
            PR_SOURCE: "src",
            PR_STRING: "str",
            PR_TAG: "tag",
            PR_TYPE: "typ",
            prettyPrintOne: z.prettyPrintOne = function(v, C, y) {
                var p = document.createElement("div");
                p.innerHTML = "<pre>" + v + "</pre>";
                p = p.firstChild;
                y && q(p, y, !0);
                o({
                    h: C,
                    j: y,
                    c: p,
                    i: 1
                });
                return p.innerHTML
            },
            prettyPrint: z.prettyPrint = function(T, Q) {
                function N() {
                    for (var v = z.PR_SHOULD_USE_CONTINUATION ? R.now() + 250 : Infinity; L < G.length && R.now() < v; L++) {
                        for (var Y = G[L], W = M, U = Y; U = U.previousSibling;) {
                            var p = U.nodeType,
                                X = (p === 7 || p === 8) && U.nodeValue;
                            if (X ? !/^\??prettify\b/.test(X) : p !== 3 || /\S/.test(U.nodeValue)) {
                                break
                            }
                            if (X) {
                                W = {};
                                X.replace(/\b(\w+)=([\w%+\-.:]+)/g, function(ab, aa, ac) {
                                    W[aa] = ac
                                });
                                break
                            }
                        }
                        U = Y.className;
                        if ((W !== M || P.test(U)) && !C.test(U)) {
                            p = !1;
                            for (X = Y.parentNode; X; X = X.parentNode) {
                                if (O.test(X.tagName) && X.className && P.test(X.className)) {
                                    p = !0;
                                    break
                                }
                            }
                            if (!p) {
                                Y.className += " prettyprinted";
                                p = W.lang;
                                if (!p) {
                                    var p = U.match(H),
                                        Z;
                                    if (!p && (Z = f(Y)) && D.test(Z.tagName)) {
                                        p = Z.className.match(H)
                                    }
                                    p && (p = p[1])
                                }
                                if (y.test(Y.tagName)) {
                                    X = 1
                                } else {
                                    var X = Y.currentStyle,
                                        V = E.defaultView,
                                        X = (X = X ? X.whiteSpace : V && V.getComputedStyle ? V.getComputedStyle(Y, a).getPropertyValue("white-space") : 0) && "pre" === X.substring(0, 3)
                                }
                                V = W.linenums;
                                if (!(V = V === "true" || +V)) {
                                    V = (V = U.match(/\blinenums\b(?::(\d+))?/)) ? V[1] && V[1].length ? +V[1] : !0 : !1
                                }
                                V && q(Y, V, X);
                                F = {
                                    h: p,
                                    c: Y,
                                    j: V,
                                    i: X
                                };
                                o(F)
                            }
                        }
                    }
                    L < G.length ? setTimeout(N, 250) : "function" === typeof T && T()
                }
                for (var S = Q || document.body, E = S.ownerDocument || document, S = [S.getElementsByTagName("pre"), S.getElementsByTagName("code"), S.getElementsByTagName("xmp")], G = [], I = 0; I < S.length; ++I) {
                    for (var K = 0, J = S[I].length; K < J; ++K) {
                        G.push(S[I][K])
                    }
                }
                var S = a,
                    R = Date;
                R.now || (R = {
                    now: function() {
                        return +new Date
                    }
                });
                var L = 0,
                    F, H = /\blang(?:uage)?-([\w.]+)(?!\S)/,
                    P = /\bprettyprint\b/,
                    C = /\bprettyprinted\b/,
                    y = /pre|xmp/i,
                    D = /^code$/i,
                    O = /^(?:pre|code|xmp)$/i,
                    M = {};
                N()
            }
        };
        typeof define === "function" && define.amd && define("google-code-prettify", [], function() {
            return b
        })
    })()
}();
