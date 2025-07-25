( () => {
    var t, e, n, r, a, o, l = Object.create, i = Object.defineProperty, s = Object.getOwnPropertyDescriptor, u = Object.getOwnPropertyNames, c = Object.getPrototypeOf, f = Object.prototype.hasOwnProperty, h = (t, e) => function() {
        return e || (0,
        t[u(t)[0]])((e = {
            exports: {}
        }).exports, e),
        e.exports
    }
    , d = h({
        "../../node_modules/d3-dispatch/dist/d3-dispatch.js"(t, e) {
            var n, r;
            n = t,
            r = function(t) {
                "use strict";
                var e = {
                    value: function() {}
                };
                function n() {
                    for (var t, e = 0, n = arguments.length, a = {}; e < n; ++e) {
                        if (!(t = arguments[e] + "") || t in a || /[\s.]/.test(t))
                            throw new Error("illegal type: " + t);
                        a[t] = []
                    }
                    return new r(a)
                }
                function r(t) {
                    this._ = t
                }
                function a(t, e) {
                    for (var n, r = 0, a = t.length; r < a; ++r)
                        if ((n = t[r]).name === e)
                            return n.value
                }
                function o(t, n, r) {
                    for (var a = 0, o = t.length; a < o; ++a)
                        if (t[a].name === n) {
                            t[a] = e,
                            t = t.slice(0, a).concat(t.slice(a + 1));
                            break
                        }
                    return null != r && t.push({
                        name: n,
                        value: r
                    }),
                    t
                }
                r.prototype = n.prototype = {
                    constructor: r,
                    on: function(t, e) {
                        var n, r, l = this._, i = (r = l,
                        (t + "").trim().split(/^|\s+/).map((function(t) {
                            var e = ""
                              , n = t.indexOf(".");
                            if (n >= 0 && (e = t.slice(n + 1),
                            t = t.slice(0, n)),
                            t && !r.hasOwnProperty(t))
                                throw new Error("unknown type: " + t);
                            return {
                                type: t,
                                name: e
                            }
                        }
                        ))), s = -1, u = i.length;
                        if (!(arguments.length < 2)) {
                            if (null != e && "function" != typeof e)
                                throw new Error("invalid callback: " + e);
                            for (; ++s < u; )
                                if (n = (t = i[s]).type)
                                    l[n] = o(l[n], t.name, e);
                                else if (null == e)
                                    for (n in l)
                                        l[n] = o(l[n], t.name, null);
                            return this
                        }
                        for (; ++s < u; )
                            if ((n = (t = i[s]).type) && (n = a(l[n], t.name)))
                                return n
                    },
                    copy: function() {
                        var t = {}
                          , e = this._;
                        for (var n in e)
                            t[n] = e[n].slice();
                        return new r(t)
                    },
                    call: function(t, e) {
                        if ((n = arguments.length - 2) > 0)
                            for (var n, r, a = new Array(n), o = 0; o < n; ++o)
                                a[o] = arguments[o + 2];
                        if (!this._.hasOwnProperty(t))
                            throw new Error("unknown type: " + t);
                        for (o = 0,
                        n = (r = this._[t]).length; o < n; ++o)
                            r[o].value.apply(e, a)
                    },
                    apply: function(t, e, n) {
                        if (!this._.hasOwnProperty(t))
                            throw new Error("unknown type: " + t);
                        for (var r = this._[t], a = 0, o = r.length; a < o; ++a)
                            r[a].value.apply(e, n)
                    }
                },
                t.dispatch = n,
                Object.defineProperty(t, "__esModule", {
                    value: !0
                })
            }
            ,
            "object" == typeof t && void 0 !== e ? r(t) : "function" == typeof define && define.amd ? define(["exports"], r) : r((n = n || self).d3 = n.d3 || {})
        }
    }), p = h({
        "foo.js"(t, e) {
            var n = d().dispatch
              , r = Math.PI / 180
              , a = {
                archimedean: v,
                rectangular: function(t) {
                    var e = 4 * t[0] / t[1]
                      , n = 0
                      , r = 0;
                    return function(t) {
                        var a = t < 0 ? -1 : 1;
                        switch (Math.sqrt(1 + 4 * a * t) - a & 3) {
                        case 0:
                            n += e;
                            break;
                        case 1:
                            r += 4;
                            break;
                        case 2:
                            n -= e;
                            break;
                        default:
                            r -= 4
                        }
                        return [n, r]
                    }
                }
            }
              , o = 2048;
            function l(t) {
                return t.text
            }
            function i() {
                return "serif"
            }
            function s() {
                return "normal"
            }
            function u(t) {
                return Math.sqrt(t.value)
            }
            function c() {
                return 30 * (~~(6 * random()) - 3)
            }
            function f() {
                return 1
            }
            function h(t, e, n, a) {
                if (!e.sprite) {
                    var l = t.context
                      , i = t.ratio;
                    l.clearRect(0, 0, 2048 / i, o / i);
                    var s = 0
                      , u = 0
                      , c = 0
                      , f = n.length;
                    for (--a; ++a < f; ) {
                        e = n[a],
                        l.save(),
                        l.font = e.style + " " + e.weight + " " + ~~((e.size + 1) / i) + "px " + e.font;
                        const t = l.measureText(e.text)
                          , f = -Math.floor(t.width / 2);
                        let x = (t.width + 1) * i
                          , m = e.size << 1;
                        if (e.rotate) {
                            var h = Math.sin(e.rotate * r)
                              , d = Math.cos(e.rotate * r)
                              , p = x * d
                              , y = x * h
                              , v = m * d
                              , g = m * h;
                            x = Math.max(Math.abs(p + g), Math.abs(p - g)) + 31 >> 5 << 5,
                            m = ~~Math.max(Math.abs(y + v), Math.abs(y - v))
                        } else
                            x = x + 31 >> 5 << 5;
                        if (m > c && (c = m),
                        s + x >= 2048 && (s = 0,
                        u += c,
                        c = 0),
                        u + m >= o)
                            break;
                        l.translate((s + (x >> 1)) / i, (u + (m >> 1)) / i),
                        e.rotate && l.rotate(e.rotate * r),
                        l.fillText(e.text, f, 0),
                        e.padding && (l.lineWidth = 2 * e.padding,
                        l.strokeText(e.text, f, 0)),
                        l.restore(),
                        e.width = x,
                        e.height = m,
                        e.xoff = s,
                        e.yoff = u,
                        e.x1 = x >> 1,
                        e.y1 = m >> 1,
                        e.x0 = -e.x1,
                        e.y0 = -e.y1,
                        e.hasText = !0,
                        s += x
                    }
                    for (var x = l.getImageData(0, 0, 2048 / i, o / i).data, m = []; --a >= 0; )
                        if ((e = n[a]).hasText) {
                            for (var w = e.width, b = w >> 5, M = e.y1 - e.y0, k = 0; k < M * b; k++)
                                m[k] = 0;
                            if (null == (s = e.xoff))
                                return;
                            u = e.yoff;
                            for (var O = 0, z = -1, A = 0; A < M; A++) {
                                for (k = 0; k < w; k++) {
                                    var _ = b * A + (k >> 5)
                                      , j = x[2048 * (u + A) + (s + k) << 2] ? 1 << 31 - k % 32 : 0;
                                    m[_] |= j,
                                    O |= j
                                }
                                O ? z = A : (e.y0++,
                                M--,
                                A--,
                                u++)
                            }
                            e.y1 = e.y0 + z,
                            e.sprite = m.slice(0, (e.y1 - e.y0) * b)
                        }
                }
            }
            function p(t, e, n) {
                n >>= 5;
                for (var r, a = t.sprite, o = t.width >> 5, l = t.x - (o << 4), i = 127 & l, s = 32 - i, u = t.y1 - t.y0, c = (t.y + t.y0) * n + (l >> 5), f = 0; f < u; f++) {
                    r = 0;
                    for (var h = 0; h <= o; h++)
                        if ((r << s | (h < o ? (r = a[f * o + h]) >>> i : 0)) & e[c + h])
                            return !0;
                    c += n
                }
                return !1
            }
            function y(t, e) {
                var n = t[0]
                  , r = t[1];
                e.x + e.x0 < n.x && (n.x = e.x + e.x0),
                e.y + e.y0 < n.y && (n.y = e.y + e.y0),
                e.x + e.x1 > r.x && (r.x = e.x + e.x1),
                e.y + e.y1 > r.y && (r.y = e.y + e.y1)
            }
            function v(t) {
                var e = t[0] / t[1];
                return function(t) {
                    return [e * (t *= .1) * Math.cos(t), t * Math.sin(t)]
                }
            }
            function g() {
                return document.createElement("canvas")
            }
            function x(t) {
                return "function" == typeof t ? t : function() {
                    return t
                }
            }
            e.exports = function() {
                var t = [256, 256]
                  , e = l
                  , r = i
                  , d = u
                  , m = s
                  , w = s
                  , b = c
                  , M = f
                  , k = v
                  , O = []
                  , z = 1 / 0
                  , A = n("word", "end")
                  , _ = null
                  , j = Math.random
                  , P = {}
                  , E = g;
                function L(e, n, r) {
                    t[0],
                    t[1];
                    for (var a, o, l, i, s, u = n.x, c = n.y, f = Math.sqrt(t[0] * t[0] + t[1] * t[1]), h = k(t), d = j() < .5 ? 1 : -1, y = -d; (a = h(y += d)) && (o = ~~a[0],
                    l = ~~a[1],
                    !(Math.min(Math.abs(o), Math.abs(l)) >= f)); )
                        if (n.x = u + o,
                        n.y = c + l,
                        !(n.x + n.x0 < 0 || n.y + n.y0 < 0 || n.x + n.x1 > t[0] || n.y + n.y1 > t[1] || r && (s = r,
                        !((i = n).x + i.x1 > s[0].x && i.x + i.x0 < s[1].x && i.y + i.y1 > s[0].y && i.y + i.y0 < s[1].y)) || p(n, e, t[0]))) {
                            for (var v, g = n.sprite, x = n.width >> 5, m = t[0] >> 5, w = n.x - (x << 4), b = 127 & w, M = 32 - b, O = n.y1 - n.y0, z = (n.y + n.y0) * m + (w >> 5), A = 0; A < O; A++) {
                                v = 0;
                                for (var _ = 0; _ <= x; _++)
                                    e[z + _] |= v << M | (_ < x ? (v = g[A * x + _]) >>> b : 0);
                                z += m
                            }
                            return !0
                        }
                    return !1
                }
                return P.canvas = function(t) {
                    return arguments.length ? (E = x(t),
                    P) : E
                }
                ,
                P.start = function() {
                    var n = function(t) {
                        const e = t.getContext("2d", {
                            willReadFrequently: !0
                        });
                        t.width = t.height = 1;
                        const n = Math.sqrt(e.getImageData(0, 0, 1, 1).data.length >> 2);
                        return t.width = 2048 / n,
                        t.height = o / n,
                        e.fillStyle = e.strokeStyle = "red",
                        {
                            context: e,
                            ratio: n
                        }
                    }(E())
                      , a = function(t) {
                        var e = []
                          , n = -1;
                        for (; ++n < t; )
                            e[n] = 0;
                        return e
                    }((t[0] >> 5) * t[1])
                      , l = null
                      , i = O.length
                      , s = -1
                      , u = []
                      , c = O.map((function(t, n) {
                        return t.text = e.call(this, t, n),
                        t.font = r.call(this, t, n),
                        t.style = m.call(this, t, n),
                        t.weight = w.call(this, t, n),
                        t.rotate = b.call(this, t, n),
                        t.size = ~~d.call(this, t, n),
                        t.padding = M.call(this, t, n),
                        t
                    }
                    )).sort((function(t, e) {
                        return e.size - t.size
                    }
                    ));
                    return _ && clearInterval(_),
                    _ = setInterval(f, 0),
                    f(),
                    P;
                    function f() {
                        for (var e = Date.now(); Date.now() - e < z && ++s < i && _; ) {
                            var r = c[s];
                            r.x = t[0] * (j() + .5) >> 1,
                            r.y = t[1] * (j() + .5) >> 1,
                            h(n, r, c, s),
                            r.hasText && L(a, r, l) && (u.push(r),
                            A.call("word", P, r),
                            l ? y(l, r) : l = [{
                                x: r.x + r.x0,
                                y: r.y + r.y0
                            }, {
                                x: r.x + r.x1,
                                y: r.y + r.y1
                            }],
                            r.x -= t[0] >> 1,
                            r.y -= t[1] >> 1)
                        }
                        s >= i && (P.stop(),
                        A.call("end", P, u, l))
                    }
                }
                ,
                P.stop = function() {
                    _ && (clearInterval(_),
                    _ = null);
                    for (const t of O)
                        delete t.sprite;
                    return P
                }
                ,
                P.timeInterval = function(t) {
                    return arguments.length ? (z = null == t ? 1 / 0 : t,
                    P) : z
                }
                ,
                P.words = function(t) {
                    return arguments.length ? (O = t,
                    P) : O
                }
                ,
                P.size = function(e) {
                    return arguments.length ? (t = [+e[0], +e[1]],
                    P) : t
                }
                ,
                P.font = function(t) {
                    return arguments.length ? (r = x(t),
                    P) : r
                }
                ,
                P.fontStyle = function(t) {
                    return arguments.length ? (m = x(t),
                    P) : m
                }
                ,
                P.fontWeight = function(t) {
                    return arguments.length ? (w = x(t),
                    P) : w
                }
                ,
                P.rotate = function(t) {
                    return arguments.length ? (b = x(t),
                    P) : b
                }
                ,
                P.text = function(t) {
                    return arguments.length ? (e = x(t),
                    P) : e
                }
                ,
                P.spiral = function(t) {
                    return arguments.length ? (k = a[t] || t,
                    P) : k
                }
                ,
                P.fontSize = function(t) {
                    return arguments.length ? (d = x(t),
                    P) : d
                }
                ,
                P.padding = function(t) {
                    return arguments.length ? (M = x(t),
                    P) : M
                }
                ,
                P.random = function(t) {
                    return arguments.length ? (j = t,
                    P) : j
                }
                ,
                P.on = function() {
                    var t = A.on.apply(A, arguments);
                    return t === A ? P : t
                }
                ,
                P
            }
        }
    }), y = (t = p(),
    n = null != t ? l(c(t)) : {},
    ( (t, e, n, r) => {
        if (e && "object" == typeof e || "function" == typeof e)
            for (let a of u(e))
                f.call(t, a) || a === n || i(t, a, {
                    get: () => e[a],
                    enumerable: !(r = s(e, a)) || r.enumerable
                });
        return t
    }
    )(!e && t && t.__esModule ? n : i(n, "default", {
        value: t,
        enumerable: !0
    }), t)), v = d3.scale.category20b(), g = 960, x = 600, m = [], w = 1, b = 0, M = d3.select("#status"), k = (0,
    y.default)().timeInterval(10).size([g, x]).fontSize((function(t) {
        return o(+t.value)
    }
    )).text((function(t) {
        return t.key
    }
    )).on("word", (function(t) {
        M.text(++b + "/" + r)
    }
    )).on("end", (function(t, e) {
        M.style("display", "none"),
        w = e ? Math.min(g / Math.abs(e[1].x - 480), g / Math.abs(e[0].x - 480), x / Math.abs(e[1].y - 300), x / Math.abs(e[0].y - 300)) / 2 : 1,
        m = t;
        var n = P.selectAll("text").data(m, (function(t) {
            return t.text.toLowerCase()
        }
        ));
        n.transition().duration(1e3).attr("transform", (function(t) {
            return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
        }
        )).style("font-size", (function(t) {
            return t.size + "px"
        }
        )),
        n.enter().append("text").attr("text-anchor", "middle").attr("transform", (function(t) {
            return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
        }
        )).style("font-size", "1px").transition().duration(1e3).style("font-size", (function(t) {
            return t.size + "px"
        }
        )),
        n.style("font-family", (function(t) {
            return t.font
        }
        )).style("fill", (function(t) {
            return v(t.text.toLowerCase())
        }
        )).text((function(t) {
            return t.text
        }
        ));
        var r = j.append("g").attr("transform", P.attr("transform"))
          , a = r.node();
        n.exit().each((function() {
            a.appendChild(this)
        }
        )),
        r.transition().duration(1e3).style("opacity", 1e-6).remove(),
        P.transition().delay(1e3).duration(750).attr("transform", "translate(" + [480, 300] + ")scale(" + w + ")")
    }
    )), O = d3.select("body").append("form").attr("action", "https://www.jasondavies.com/echo").attr("target", "_blank").attr("method", "POST"), z = O.append("input").attr("type", "hidden").attr("name", "content-type"), A = O.append("input").attr("type", "hidden").attr("name", "echo"), _ = d3.select("#vis").append("svg").attr("width", g).attr("height", x), j = _.append("g"), P = _.append("g").attr("transform", "translate(" + [480, 300] + ")");
    d3.select("#download-svg").on("click", (function() {
        d3.event.preventDefault(),
        z.attr("value", "image/svg+xml;charset=utf-8"),
        A.attr("value", _.attr("version", "1.1").attr("xmlns", "http://www.w3.org/2000/svg").node().parentNode.innerHTML),
        O.node().submit()
    }
    )),
    d3.select("#download-png").on("click", (function() {
        d3.event.preventDefault();
        var t = document.createElement("canvas")
          , e = t.getContext("2d");
        t.width = g,
        t.height = x,
        e.translate(480, 300),
        e.scale(w, w),
        m.forEach((function(t, n) {
            e.save(),
            e.translate(t.x, t.y),
            e.rotate(t.rotate * Math.PI / 180),
            e.textAlign = "center",
            e.fillStyle = v(t.text.toLowerCase()),
            e.font = t.size + "px " + t.font,
            e.fillText(t.text, 0, 0),
            e.restore()
        }
        )),
        z.attr("value", "image/png"),
        A.attr("value", t.toDataURL("image/png")),
        O.node().submit()
    }
    ));
    var E = d3.select("#form").on("submit", (function() {
        T(d3.select("#text").property("value")),
        d3.event.preventDefault()
    }
    ));
    E.selectAll("input[type=number]").on("click.refresh", (function() {
        this.value !== this.defaultValue && (S(),
        this.defaultValue = this.value)
    }
    )),
    E.selectAll("input[type=radio], #font").on("change", S);
    var L = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/
      , C = new RegExp("[!-#%-*,-/:;?@\\[-\\]_{}¡§«¶·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰૰෴๏๚๛༄-༒༔༺-༽྅࿐-࿔࿙࿚၊-၏჻፠-፨᐀᙭᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳀-᳇᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰-⸻、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꫰꫱꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･]","g")
      , D = /[ \f\n\r\t\v\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g
      , I = /^(@|https?:|\/\/)/;
    function T(t) {
        a = {};
        var e = {}
          , n = d3.select("#per-line").property("checked");
        t.split(n ? /\n/g : D).forEach((function(t) {
            I.test(t) || (n || (t = t.replace(C, "")),
            L.test(t.toLowerCase()) || (t = t.substr(0, 100),
            e[t.toLowerCase()] = t,
            a[t = t.toLowerCase()] = (a[t] || 0) + 1))
        }
        )),
        (a = d3.entries(a).sort((function(t, e) {
            return e.value - t.value
        }
        ))).forEach((function(t) {
            t.key = e[t.key]
        }
        )),
        S()
    }
    function S() {
        k.font(d3.select("#font").property("value")).spiral(d3.select("input[name=spiral]:checked").property("value")),
        o = d3.scale[d3.select("input[name=scale]:checked").property("value")]().range([10, 100]),
        a.length && o.domain([+a[a.length - 1].value || 1, +a[0].value]),
        b = 0,
        M.style("display", null),
        m = [],
        k.stop().words(a.slice(0, r = Math.min(a.length, +d3.select("#max").property("value")))).start()
    }
    d3.select("#random-palette").on("click", (function() {
        paletteJSON("http://www.colourlovers.com/api/palettes/random", {}, (function(t) {
            v.range(t[0].colors),
            P.selectAll("text").style("fill", (function(t) {
                return v(t.text.toLowerCase())
            }
            ))
        }
        )),
        d3.event.preventDefault()
    }
    )),
    function() {
        var t = 40.5
          , e = d3.select("#angles").append("svg").attr("width", 2 * (t + 35)).attr("height", t + 30).append("g").attr("transform", "translate(" + [t + 35, t + 20] + ")");
        e.append("path").style("fill", "none").attr("d", ["M", -t, 0, "A", t, t, 0, 0, 1, t, 0].join(" ")),
        e.append("line").attr("x1", -t - 7).attr("x2", t + 7),
        e.append("line").attr("y2", -t - 7),
        e.selectAll("text").data([-90, 0, 90]).enter().append("text").attr("dy", (function(t, e) {
            return 1 === e ? null : ".3em"
        }
        )).attr("text-anchor", (function(t, e) {
            return ["end", "middle", "start"][e]
        }
        )).attr("transform", (function(e) {
            return "rotate(" + (e += 90) + ")translate(" + -(t + 10) + ")rotate(" + -e + ")translate(2)"
        }
        )).text((function(t) {
            return t + "°"
        }
        ));
        var n, r, a, o = Math.PI / 180, l = d3.scale.linear(), i = d3.svg.arc().innerRadius(0).outerRadius(t);
        function s() {
            a = +d3.select("#angle-count").property("value"),
            n = Math.max(-90, Math.min(90, +d3.select("#angle-from").property("value"))),
            r = Math.max(-90, Math.min(90, +d3.select("#angle-to").property("value"))),
            u()
        }
        function u() {
            l.domain([0, a - 1]).range([n, r]);
            var s = e.selectAll("path.angle").data([{
                startAngle: n * o,
                endAngle: r * o
            }]);
            s.enter().insert("path", "circle").attr("class", "angle").style("fill", "#fc0"),
            s.attr("d", i);
            var c = e.selectAll("line.angle").data(d3.range(a).map(l));
            c.enter().append("line").attr("class", "angle"),
            c.exit().remove(),
            c.attr("transform", (function(t) {
                return "rotate(" + (90 + t) + ")"
            }
            )).attr("x2", (function(e, n) {
                return n && n !== a - 1 ? -t : -t - 5
            }
            ));
            var f = e.selectAll("path.drag").data([n, r]);
            f.enter().append("path").attr("class", "drag").attr("d", "M-9.5,0L-3,3.5L-3,-3.5Z").call(d3.behavior.drag().on("drag", (function(e, a) {
                e = (a ? r : n) + 90;
                var l, i, s = [-t * Math.cos(e * o), -t * Math.sin(e * o)], c = [d3.event.x, d3.event.y], f = ~~(Math.atan2((l = s,
                i = c,
                l[0] * i[1] - l[1] * i[0]), function(t, e) {
                    return t[0] * e[0] + t[1] * e[1]
                }(s, c)) / o);
                e = Math.max(-90, Math.min(90, e + f - 90)),
                f = r - n,
                a ? (r = e,
                f > 360 ? n += f - 360 : f < 0 && (n = r)) : (n = e,
                f > 360 ? r += 360 - f : f < 0 && (r = n)),
                u()
            }
            )).on("dragend", S)),
            f.attr("transform", (function(e) {
                return "rotate(" + (e + 90) + ")translate(-" + t + ")"
            }
            )),
            k.rotate((function() {
                return l(~~(Math.random() * a))
            }
            )),
            d3.select("#angle-count").property("value", a),
            d3.select("#angle-from").property("value", n),
            d3.select("#angle-to").property("value", r)
        }
        d3.selectAll("#angle-count, #angle-from, #angle-to").on("change", s).on("mouseup", s),
        s(),
        T(d3.select("#text").property("value"))
    }()
}
)();
