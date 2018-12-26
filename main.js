!function (t) {
    var e = {};

    function i(n) {
        if (e[n]) return e[n].exports;
        var s = e[n] = {i: n, l: !1, exports: {}};
        return t[n].call(s.exports, s, s.exports, i), s.l = !0, s.exports
    }

    i.m = t, i.c = e, i.d = function (t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
    }, i.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, i.t = function (t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t) for (var s in t) i.d(n, s, function (e) {
            return t[e]
        }.bind(null, s));
        return n
    }, i.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 0)
}([function (t, e, i) {
    "use strict";
    i.r(e);
    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/src/FileSaver.js */
    var n = n || function (t) {
        if (!(void 0 === t || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
            var e = t.document, i = function () {
                    return t.URL || t.webkitURL || t
                }, n = e.createElementNS("http://www.w3.org/1999/xhtml", "a"), s = "download" in n,
                o = /constructor/i.test(t.HTMLElement) || t.safari, r = /CriOS\/[\d]+/.test(navigator.userAgent),
                l = t.setImmediate || t.setTimeout, h = function (t) {
                    l(function () {
                        throw t
                    }, 0)
                }, a = function (t) {
                    setTimeout(function () {
                        "string" == typeof t ? i().revokeObjectURL(t) : t.remove()
                    }, 4e4)
                }, f = function (t) {
                    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], {type: t.type}) : t
                }, c = function (e, c, d) {
                    d || (e = f(e));
                    var u, p = this, g = "application/octet-stream" === e.type, m = function () {
                        !function (t, e, i) {
                            for (var n = (e = [].concat(e)).length; n--;) {
                                var s = t["on" + e[n]];
                                if ("function" == typeof s) try {
                                    s.call(t, i || t)
                                } catch (t) {
                                    h(t)
                                }
                            }
                        }(p, "writestart progress write writeend".split(" "))
                    };
                    if (p.readyState = p.INIT, s) return u = i().createObjectURL(e), void l(function () {
                        var t, e;
                        n.href = u, n.download = c, t = n, e = new MouseEvent("click"), t.dispatchEvent(e), m(), a(u), p.readyState = p.DONE
                    }, 0);
                    !function () {
                        if ((r || g && o) && t.FileReader) {
                            var n = new FileReader;
                            return n.onloadend = function () {
                                var e = r ? n.result : n.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                                t.open(e, "_blank") || (t.location.href = e), e = void 0, p.readyState = p.DONE, m()
                            }, n.readAsDataURL(e), void(p.readyState = p.INIT)
                        }
                        u || (u = i().createObjectURL(e)), g ? t.location.href = u : t.open(u, "_blank") || (t.location.href = u);
                        p.readyState = p.DONE, m(), a(u)
                    }()
                }, d = c.prototype;
            return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function (t, e, i) {
                return e = e || t.name || "download", i || (t = f(t)), navigator.msSaveOrOpenBlob(t, e)
            } : (d.abort = function () {
            }, d.readyState = d.INIT = 0, d.WRITING = 1, d.DONE = 2, d.error = d.onwritestart = d.onprogress = d.onwrite = d.onabort = d.onerror = d.onwriteend = null, function (t, e, i) {
                return new c(t, e || t.name || "download", i)
            })
        }
    }("undefined" != typeof self && self || "undefined" != typeof window && window || void 0);
    let s = function (t, e) {
        let i = 0;
        this.id = t[i++], this.pid = t[i++], this.w = t[i++], this.h = t[i++], this.x = t[i++], this.y = t[i++], this.children_num = t[i++], this.isZero = t[i++], this.overflow = t[i++], this.search = t[i++], this.footer = t[i++], this.header = t[i++], this.image = t[i++], this.logo = t[i++], this.navigation = t[i++], this.is_href = t[i++], this.textarea = t[i++], this.is_input = t[i++], this.is_txt = t[i++], this.is_title = t[i++], this.sibling_num = t[i++], this.tag = t[i++], this.lv = t[i++], this.children = e, this.verticalSidedness = t[i++], this.horizontalSidedness = t[i++], this.leftSidedness = t[i++], this.topSideness = t[i++], this.shapeAppearance = t[i++], this.color = t[i++], this.fontColor = t[i++], this.font_size = t[i++], this.font_weight = t[i++], this.word_count = t[i++], this.word_len = t[i++], this.bottom = t[i++], this.top = t[i++], this.fillsHeight = t[i++], this.fillsWidth = t[i++], this.selector = t[i++], this.sib_order = t[i++], this.coverage = 0
    };

    function o(t, e) {
        !function t(e, i, n, s) {
            if (n < s) {
                let o = function (t, e, i, n) {
                    let s = t[e[i]], o = e[i], r = i;
                    for (; i < n;) {
                        for (; i < n && t[e[n]] >= s;) n--;
                        for (i < n && (e[i] = e[n], ++i); i < n && t[e[i]] <= s;) i++;
                        i < n && (e[n] = e[i], --n)
                    }
                    return e[i] = o, r = i
                }(e, i, n, s);
                t(e, i, n, o - 1), t(e, i, o + 1, s)
            }
        }(t, e, 0, e.length - 1)
    }

    function r(t, e) {
        this.root = t, this.elems = e
    }

    function l(t, e, i) {
        let n = e.x - i.x, s = e.y - i.y;
        for (let o = 0; o < e.w; o++) for (let r = 0; r < e.h; r++) h(o + n, 0, i.w) && h(r + s, 0, i.h) && (t[o + n][r + s] = 1)
    }

    function h(t, e, i) {
        return t >= e && t <= i
    }

    s.prototype.getSpecialTags = function () {
        let t = [this.search, this.footer, this.header, this.image, this.logo, this.navigation, this.is_input, this.is_txt, this.is_title],
            e = "1";
        for (let i = 0; i < t.length; i++) e += t[i];
        return e
    }, s.prototype.setSpecialTags = function (t) {
        this.search = parseInt(t.charAt(1)), this.footer = parseInt(t.charAt(2)), this.header = parseInt(t.charAt(3)), this.image = parseInt(t.charAt(4)), this.logo = parseInt(t.charAt(5)), this.navigation = parseInt(t.charAt(6)), this.is_input = parseInt(t.charAt(7)), this.is_txt = parseInt(t.charAt(8)), this.is_title = parseInt(t.charAt(9))
    }, s.prototype.getProperties = function () {
        return this.id + "," + this.pid + "," + this.w + "," + this.h + "," + this.x + "," + this.y + "," + this.verticalSidedness + "," + this.horizontalSidedness + "," + this.leftSidedness + "," + this.topSideness + "," + this.shapeAppearance + "," + this.isZero + ",'" + this.tag + "','" + this.color + "','" + this.fontColor + "','" + this.overflow + "'," + this.font_size + "," + this.font_weight + "," + this.word_count + "," + this.word_len + "," + this.search + "," + this.footer + "," + this.logo + "," + this.image + "," + this.navigation + "," + this.bottom + "," + this.top + "," + this.fillsHeight + "," + this.fillsWidth + ",'" + this.selector + "'," + this.lv + "," + this.sib_order + "," + this.children_num + "," + this.is_href + "," + this.sibling_num + "," + this.textarea + "," + this.is_input + "," + this.is_txt + "," + this.is_title + "," + this.coverage
    }, r.prototype.getCoverage = function (t) {
        let e = this.elems[t], i = function (t) {
            let e = [];
            for (let i = 0; i < t.w; i++) {
                e[i] = [];
                for (let n = 0; n < t.h; n++) e[i][n] = 0
            }
            return e
        }(this.elems[t]), n = this.getDescendant(this.elems[t].id);
        for (let e = 0; e < n.length; e++) l(i, n[e], this.elems[t]);
        let s = 0;
        for (let t = 0; t < e.w; t++) for (let n = 0; n < e.h; n++) s = 1 === i[t][n] ? s + 1 : s;
        let o = s / (e.w * e.h);
        return 1 === t && (console.log("des=" + n.length), console.log(o)), o
    }, r.prototype.sortByLv = function (t) {
        let e = [], i = [];
        for (let n = 0; n < t.length; n++) {
            let s = t[n];
            i.push(n), e.push(this.elems[s].lv)
        }
        o(e, i);
        let n = [];
        for (let e = 0; e < i.length; e++) n[e] = t[i[e]];
        for (let e = 0; e < i.length; e++) t[e] = n[e]
    }, r.prototype.init = function () {
        this.checkOverlap();
        let t = [];
        for (let e = 1; e < this.elems.length; e++) 1 === this.elems[e].isZero && t.push(e);
        this.sortByLv(t);
        for (let e = 0; e < t.length; e++) this.deleteElemAt(t[e]);
        this.updateNodesType(), this.updateNodesCoverage()
    }, r.prototype.deleteElemAt = function (t) {
        let e = this.elems[t].children, i = e.length, n = this.elems[t].pid, s = this.elems[t].sib_order;
        console.log("to be deleted..." + t + " lv=" + this.elems[t].lv + " sib_order=" + this.elems[t].sib_order + " tmpc.size=" + i);
        for (let e = s + 1; e < this.elems[n].children.length; e++) {
            let s = this.elems[n].children[e].id;
            this.elems[s].sib_order = this.elems[s].sib_order - 1 + i, console.log("jump into sib-for-loop, id=" + t + " current=" + s + " before=" + this.elems[n].children[e].sib_order + " after=" + this.elems[s].sib_order + " apndS=" + i)
        }
        for (let t = 0; t < e.length; t++) console.log("jump into children-for-loop, id=" + e[t].id + " pid-before=" + this.elems[e[t].id].pid + " siboder-defore=" + this.elems[e[t].id].sib_order), this.elems[e[t].id].pid = n, this.elems[e[t].id].sib_order += s, console.log("jump into children-for-loop, id=" + e[t].id + " pid-after=" + this.elems[e[t].id].pid + " siboder-defore=" + this.elems[e[t].id].sib_order), this.elems[e[t].id].lv -= 1;
        this.elems[n].children.splice(s, 1, e), this.elems[n].children_num = this.elems[n].children_num - 1 + i, delete this.elems[t]
    }, r.prototype.getLeaves = function () {
        let t = [];
        for (let e = 1; e < this.elems.length; e++) this.elems[e] && 0 === this.elems[e].children_num && t.push(e);
        return t
    }, r.prototype.getSingleLeaves = function (t) {
        let e = [];
        for (let i = 0; i < t.length; i++) 1 === this.elems[t[i]].sibling_num && e.push(t[i]);
        return e
    }, r.prototype.getSingleBranch = function (t) {
        let e = [], i = t, n = this.elems[i].pid, s = this.elems[n].children_num;
        for (; 1 === s;) e.push(i), i = this.elems[i].pid, s = this.elems[i].children_num;
        return e
    }, r.prototype.updateNodesType = function () {
        let t = this.getSingleLeaves(this.getLeaves());
        for (let e = 0; e < t.length; e++) {
            let i = this.getSingleBranch(t[e]), n = this.elems[i[0]].getSpecialTags(), s = n;
            for (let t = 0; t < i.length; t++) {
                let e = this.elems[i[t]].getSpecialTags();
                s = parseInt(n, 2), s |= e = parseInt(e, 2)
            }
            n = s.toString(2);
            for (let t = 0; t < i.length; t++) this.elems[i[t]].setSpecialTags(n)
        }
    }, r.prototype.updateNodesCoverage = function () {
        for (let t = 1; t < this.elems.length; t++) this.elems[t] && (this.elems[t].coverage = this.getCoverage(t))
    }, r.prototype.dfs_traverse = function (t) {
        let e = [],
            i = "insert into `" + t + "` (`ID`, `parentID`, `width`, `height`, `offsetLeft`, `offsetTop`,`v_side`, `h_side`, `l_side`, `t_side`, `shapeAprnc`, `isZero`,`tag`, `color`, `fontColor`, `overflow`, `font_size`, `font_weight`,`word_count`, `word_len`, `search`, `footer`, `logo`, `image`,`navigation`, `bottom`, `top`, `fills_height`, `fills_width`, `selector`,`lv`, `sib_order`,`children_num`,`is_href`, `sib_num`,`textarea`,`is_input`,`is_txt`,`is_title`,) values\r\n";
        e.push(i);
        for (let t = 1; t < this.elems.length; t++) if (this.elems[t]) {
            let i = "(" + this.elems[t].getProperties() + ")\r\n";
            e.push(i), console.log(i)
        }
        let n = e[e.length - 1];
        return n = n.substr(0, n.lastIndexOf(",")) + ";", e.pop(), e.push(n), e
    }, r.prototype.printSingle = function () {
        let t = this.getSingleLeaves(this.getLeaves());
        console.log("sl.len=" + t.length);
        for (let e = 0; e < t.length; e++) {
            let i = this.getSingleBranch(t[e]);
            console.log("slb.len=" + i.length);
            for (let t = 0; t < i.length; t++) console.log("s_brch_" + e + " node_" + t + " id=" + this.elems[i[t]].id + " tag=" + this.elems[i[t]].tag)
        }
    }, r.prototype.getDescendant = function (t) {
        let e = this.elems[t].children;
        1 === t && console.log("children,len=" + e.length);
        let i = e;
        for (; 0 !== e.length;) {
            let t = [];
            for (let i = 0; i < e.length; i++) e[i].children && t.push(e[i].children);
            0 !== (e = t).length && i.push(e)
        }
        return i
    }, r.prototype.checkOverlap = function () {
        let t = [];
        for (let e = 1; e < this.elems.length; e++) "hidden" === this.elems[e].overflow && t.push(e);
        for (let e = 0; e < t.length; e++) {
            let i = t[e], n = this.elems[i].x, s = this.elems[i].y, o = this.elems[i].w, r = this.elems[i].h,
                l = this.getDescendant(i);
            for (let t = 0; t < l.length; t++) {
                let e = l[t], i = l[t].id, h = e.x, a = e.y, f = e.w, c = e.h,
                    d = d(h, n, n + o) && d(h + f, n, n + o) && d(a, s, s + r) && d(a + c, s, s + r);
                d || (this.elems[i].isZero = 1)
            }
        }
    };
    let a = 0;
    const f = $(document.body)[0].clientWidth, c = $(document.body)[0].clientHeight, d = function () {
        let t = window.location.href;
        return t = (t = t.substr(t.lastIndexOf("/") + 1)).substring(0, t.lastIndexOf(".html"))
    }();
    let u = [], p = new r(null, u);

    function g(t, e, i, n, o, r) {
        let l = parseInt($(t).width()), h = parseInt($(t).height()), d = parseInt($(t).offset().left),
            u = parseInt($(t).offset().top), p = $(t).children().length, g = 0 === c ? 0 : (u + h) / c;
        g = (g = g > 1 ? 1 : g).toFixed(2);
        let _ = 0 === f ? 0 : (d + l) / f;
        _ = (_ = _ > 1 ? 1 : _).toFixed(2);
        let b = (d / f).toFixed(2), y = (u / c).toFixed(2), w = 0 !== l && 0 !== h ? Math.min(l / h, h / l) : 0;
        w = w.toFixed(2);
        let S = l * h == 0 ? 1 : 0, x = $(t).get(0).tagName.toLowerCase(), I = $(t).css("background-color"),
            O = $(t).css("background-image"), A = $(t).css("color"), L = parseInt($(t).css("padding-top")),
            T = parseInt($(t).css("padding-left")), N = $(t).css("overflow"), E = function (t) {
                let e = t.html(), i = function (t) {
                    let e = t.contents().filter(function () {
                        return 3 === this.nodeType
                    });
                    if (1 === e.length) {
                        let t = [];
                        return t[0] = e[0].nodeValue, t
                    }
                    if (e.length > 1) {
                        let t = [];
                        for (let i = 0; i < e.length; i++) e.length, t[i] = e[i].nodeValue;
                        return t
                    }
                    return []
                }(t), n = 0, s = "";
                for (let t = 0; t < i.length; t++) {
                    let o = e.indexOf(i[t]), r = 0;
                    if (o !== n) {
                        let l = e.substring(n, o);
                        n = o + i[t].length - 1;
                        let h = l.match(/<[a-z]+>|<\/[a-z]+>/g), a = [];
                        if (null === h) {
                            s += i[t];
                            continue
                        }
                        for (let t = 0; t < h.length; t++) h[t].search(/<[a-z]+>/) >= 0 ? a.push(h[t]) : (a.pop(), 0 === a.length && ++r)
                    }
                    s = s + r + "(sep1)" + i[t] + "(sep2)"
                }
                return s
            }($(t)), j = $(t).css("font-size");
        j = j.substring(0, j.length - 2);
        let C = $(t).css("font-weight");
        C /= 100;
        let z = function (t) {
            let e = 0;
            for (let i = 0; i < t.length; i++) {
                let n = [];
                n = t[i].split(/ +/), e += n.length
            }
            return e
        }(E), D = function (t) {
            let e = 0;
            for (let i = 0; i < t.length; i++) e += t[i].length;
            return e
        }(E), R = E.replace(/(\n)+|(\r\n)+/g, "");
        R = R.replace(/(\s)+/g, " ");
        let k = v($(t)), B = function (t, e, i) {
                let n = !1, s = i, o = $(t).children(), r = 0, l = 0;
                $(o).each(function () {
                    let t = v($(this));
                    s = s + "(sep)" + t, "button" === e ? l += 1 : "input" === e && (-1 !== t.indexOf("submit") || -1 !== t.indexOf("button") ? l += 1 : r += 1)
                }), n = -1 !== s.indexOf("search") || r * l != 0;
                return n
            }(t, x, k) ? 1 : 0, M = m(t, x, k, "footer") ? 1 : 0, F = m(t, x, k, "header") ? 1 : 0,
            P = O.length > 0 || m(t, x, k, "img") ? 1 : 0, U = m(t, x, k, "logo") ? 1 : 0,
            Z = m(t, x, k, "nav") ? 1 : 0, H = u / c >= .9 ? 1 : 0, W = u / c <= .1 ? 1 : 0, V = h / c >= .9 ? 1 : 0,
            G = l / f >= .9 ? 1 : 0;
        d += T, u += L;
        let q = m(t, x, k, "href") ? 1 : 0, J = m(t, x, k, "text") ? l * h : 0, K = m(t, x, k, "input") ? 1 : 0,
            Q = E.length > 0 ? 1 : 0, X = "h" === x.charAt(0) && x.charAt(1) >= "1" && x.charAt(1) <= "6" ? 1 : 0;
        return new s([a, e, l, h, d, u, p, S, N, B, M, F, P, U, Z, q, J, K, Q, X, r, x, n, g, _, b, y, w, I, A, j, C, z, D, H, W, V, G, i, o], null)
    }

    function m(t, e, i, n) {
        let s = !1;
        return -1 !== i.indexOf(n) ? s = !0 : e === n && (s = !0), s
    }

    function v(t) {
        let e = t[0].attributes, i = "";
        for (let t = 0; t < e.length; t++) {
            let n = e.item(t).value;
            n = n.replace(/'/g, '"'), i += e.item(t).name + "=" + n + "(sep)"
        }
        return i
    }

    !function () {
        let t = $("html").first(), e = a;
        a += 1;
        let i = $(t).get(0).tagName.toLowerCase(), n = i, s = $(t).attr("id"), o = $(t).attr("class");
        void 0 !== s ? n = "#" + s : void 0 !== o && (n = i + formatedCls(o));
        let r = g(t, e, n, 0, 0, 1), l = function t(e, i, n, s) {
            let o = $(e).children();
            let r = [];
            let l = 0;
            let h = o.length;
            $(o).each(function () {
                let e = $(this).get(0).tagName.toLowerCase(), o = e, f = $(this).attr("id"), c = $(this).attr("class");
                o = void 0 !== f ? "#" + f : void 0 !== c ? n + " " + e + function (t) {
                    let e = [];
                    e = t.split(/ +/);
                    let i = "";
                    for (let t = 0; t < e.length; t++) i = i + "." + e[t];
                    return i
                }(c) : n + " " + e, a += 1;
                let d = g(this, i, o, s, l, h);
                if (++l, e.indexOf("FRAME") > 0) {
                    innerElem = $(this).contents().find("html");
                    let e = t(innerElem, a, o, s + 1);
                    d.children = e
                } else {
                    let e = t(this, a, o, s + 1);
                    d.children = e
                }
                r.push(d), u[d.id] = d
            });
            return r
        }(t, a, n, 1);
        r.children = l, console.log("children,len=" + l.length), u[r.id] = r, p.elems = u, p.root = r, p.dfs_traverse(d), p.init(), console.log("children,len=" + p.elems[1].length);
        p.dfs_traverse(d)
    }()
}]);