if (window.JSON && window.JSON.stringify.toString().indexOf("[native code]") !== -1) {
    window.JSONYoudao = window.JSON
} else {
    window.JSONYoudao = {}
}
(function() {
    function formatDateInt(n) { // 日期文本处理
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + formatDateInt(this.getUTCMonth() + 1) + "-" + formatDateInt(this.getUTCDate()) + "T" + formatDateInt(this.getUTCHours()) + ":" + formatDateInt(this.getUTCMinutes()) + ":" + formatDateInt(this.getUTCSeconds()) + "Z" : null
        }
        ;
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key)
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value)
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null"
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null"
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v)
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v
        }
    }
    if (typeof JSONYoudao.stringify !== "function") {
        JSONYoudao.stringify = function(value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " "
                }
            } else {
                if (typeof space === "string") {
                    indent = space
                }
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": value
            })
        }
    }
    if (typeof JSONYoudao.parse !== "function") {
        JSONYoudao.parse = function(text, reviver) {
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v
                            } else {
                                delete value[k]
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value)
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}());

// 定义并创建 YoudaoUtils
(function() {
    var YoudaoUtils = {
        createNode: function(nodeName, c, f) {
            var b = f || document;
            var e = b.createElement(nodeName);
            if (c) {
                YoudaoUtils.each(c, function(g, h) {
                    if (g === "class") {
                        e.className = h
                    } else {
                        e.setAttribute(g, h)
                    }
                })
            }
            return e
        },
        isDOM: function(b) {
            return b !== null && b.nodeType === 1
        },
        isArray: function(b) {
            return Object.prototype.toString.call(b) === "[object Array]"
        },
        isFunction: function(b) {
            return Object.prototype.toString.call(b) === "[object Function]"
        },
        browser: function() {
            var b = {};
            var c = navigator.userAgent.toLowerCase();
            var d = null;
            if (d = c.match(/chrome\/([\d.]+)/)) {
                b.chrome = d[1]
            } else {
                if (d = c.match(/firefox\/([\d.]+)/)) {
                    b.firefox = d[1]
                } else {
                    if (d = c.match(/msie ([\d.]+)/)) {
                        b.msie = d[1]
                    }
                }
            }
            return b
        }(),
        each: function(d, g, f) {
            if (d === null) {
                return
            }
            if (d.length === undefined || YoudaoUtils.isFunction(d)) {
                for (var c in d) {
                    if (d.hasOwnProperty(c)) {
                        if (g.call(f || d[c], c, d[c]) === false) {
                            break
                        }
                    }
                }
            } else {
                for (var e = 0, b = d.length; e < b; e++) {
                    if (g.call(f || d[e], e, d[e]) === false) {
                        break
                    }
                }
            }
            return d
        },
        indexOf: function(c, d) {
            if (c.indexOf) {
                return c.indexOf(d)
            } else {
                var b = -1;
                YoudaoUtils.each(c, function(e) {
                    if (this === d) {
                        b = e;
                        return false
                    }
                });
                return b
            }
        },
        log: function() {
            if (window.console !== undefined && window.console.log !== undefined) {
                var d = YoudaoUtils.makeArray(arguments);
                d.unshift("[YoudaoUtils]");
                try {
                    window.console.log.apply(window.console, d)
                } catch (g) {
                    var b = "[YoudaoUtils.log]";
                    for (var f = 0, c = arguments.length; f < c; f++) {
                        b += (" " + arguments[f])
                    }
                    window.console.log(b)
                }
            }
        },
        makeArray: function(b) {
            return Array.prototype.slice.call(b, 0)
        },
        prototypeExtend: function(b, c) {
            var d = YoudaoUtils.isFunction(c) ? c : function() {}
            ;
            d.prototype = b;
            return new d()
        },
        location: function() {
            return !!window.location ? window.location : !!document.location ? document.location : null
        },
        url: function() {
            var b = YoudaoUtils.location();
            if (!!b && b.href !== undefined) {
                return b.href
            } else {
                return null
            }
        },
        bind: function(node, eventName, callback) {
            if (!callback) {
                return
            }
            if (node.addEventListener) {
                node.addEventListener(eventName, callback, false)
            } else {
                if (node.attachEvent) {
                    node.attachEvent("on" + eventName, callback)
                } else {
                    node["on" + eventName] = callback
                }
            }
            return this
        },
        unbind: function(node, eventName, callback) {
            if (!callback) {
                return
            }
            if (node.removeEventListener) {
                node.removeEventListener(eventName, callback, false)
            } else {
                if (node.detachEvent) {
                    node.detachEvent("on" + eventName, callback)
                } else {
                    node["on" + eventName] = function() {}
                }
            }
            return this
        },
        stopPropagation: function(jsEvent) {
            var b = jsEvent || window.event;
            if (b.stopPropagation) {
                b.stopPropagation()
            } else {
                b.cancelBubble = true
            }
            return b
        },
        preventDefault: function(c) {
            var b = c || window.event;
            if (b.preventDefault) {
                b.preventDefault()
            } else {
                b.returnValue = false
            }
            return b
        },
        getSelectionText: function() {
            var b = null;
            if (window.getSelection) {
                b = window.getSelection().toString()
            }
            if (!!b) {
                return b
            } else {
                if (document.selection) {
                    return document.selection.createRange().text
                } else {
                    return null
                }
            }
        },
        trim: function(b) {
            return b.replace(/^\s*/, "").replace(/\s*$/, "")
        },
        parameter: function(c) {
            var b = [];
            YoudaoUtils.each(c, function(d, e) {
                b.push(encodeURIComponent(d) + "=" + encodeURIComponent(e))
            });
            return b.join("&")
        },
        formatTemplate: function(e, f) {
            var c = document.createElement("div");
            for (var d in f) {
                if (f.hasOwnProperty(d)) {
                    e = e.replace(new RegExp("{" + d + "}","g"), f[d])
                }
            }
            c.innerHTML = e;
            var b = c.firstChild;
            c.removeChild(b);
            return b
        },
        getDocumentCharset: function() {
            return document.characterSet || document.charset
        },
        css: function() {
            var b = function(g, c) {
                var h = "";
                if (c == "float") {
                    document.defaultView ? c = "float" : c = "styleFloat"
                }
                if (g.style[c]) {
                    h = g.style[c]
                } else {
                    if (g.currentStyle) {
                        h = g.currentStyle[c]
                    } else {
                        if (document.defaultView && document.defaultView.getComputedStyle) {
                            c = c.replace(/([A-Z])/g, "-$1").toLowerCase();
                            var d = document.defaultView.getComputedStyle(g, "");
                            h = d && d.getPropertyValue(c)
                        } else {
                            h = null
                        }
                    }
                }
                if ((h == "auto" || h.indexOf("%") !== -1) && ("width" === c.toLowerCase() || "height" === c.toLowerCase()) && g.style.display != "none" && h.indexOf("%") !== -1) {
                    h = g["offset" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()] + "px"
                }
                if (c == "opacity") {
                    try {
                        h = g.filters["DXImageTransform.Microsoft.Alpha"].opacity;
                        h = h / 100
                    } catch (i) {
                        try {
                            h = g.filters("alpha").opacity
                        } catch (f) {}
                    }
                }
                return h
            };
            return function(d, c) {
                if (typeof c === "string") {
                    return b(d, c)
                } else {
                    YoudaoUtils.each(c, function(e, f) {
                        d.style[e] = f
                    })
                }
            }
        }(),
        hasClass: function(f, e) {
            if (YoudaoUtils.isDOM(f)) {
                if (f.className === e) {
                    return true
                }
                var d = f.className.split(" ");
                for (var c = 0, b = d.length; c < b; c++) {
                    if (e === d[c]) {
                        return true
                    }
                }
            }
            return false
        },
        loadCSS: function(f, c) {
            if (f && f.createElement) {
                var e = f.createElement("link");
                var b = YoudaoUtils.generateResourceLink(c);
                e.setAttribute("rel", "stylesheet");
                e.setAttribute("href", b);
                e.setAttribute("type", "text/css");
                var d = f.getElementsByTagName("head")[0] || f.body;
                d.appendChild(e)
            }
        },
        loadCSSToLink: function(e, f, c) {
            if (e) {
                var d = e.getElementById(f);
                if (d) {
                    var b = YoudaoUtils.generateResourceLink(c);
                    d.setAttribute("href", b)
                }
            }
        },
        generateResourceLink: function(b) {
            var c = null;
            if ("" === "revision") {
                c = (new Date()).getTime()
            } else {
                c = ""
            }
            return b.indexOf("?") === -1 ? b + "?" + c : b + "&" + c
        },
        addClass: function(f, e) {
            if (YoudaoUtils.isDOM(f)) {
                var d = f.className.split(" ");
                for (var c = 0, b = d.length; c < b; c++) {
                    if (e === d[c]) {
                        return
                    }
                }
                d.push(e);
                f.className = d.join(" ")
            }
        },
        removeClass: function(f, e) {
            if (YoudaoUtils.isDOM(f)) {
                var d = f.className.split(" ")
                  , g = [];
                for (var c = 0, b = d.length; c < b; c++) {
                    if (e !== d[c]) {
                        g.push(d[c])
                    }
                }
                f.className = g.join(" ")
            }
        },
        toggleClass: function(f, e) {
            if (YoudaoUtils.isDOM(f)) {
                var d = f.className.split(" ")
                  , h = []
                  , g = "add";
                for (var c = 0, b = d.length; c < b; c++) {
                    if (e === d[c]) {
                        g = "remove"
                    } else {
                        h.push(d[c])
                    }
                }
                if (g === "add") {
                    d.push(e)
                } else {
                    d = h
                }
                f.className = d.join(" ")
            }
        },
        scroll: function() {
            return {
                left: document.body.scrollLeft || document.documentElement.scrollLeft,
                top: document.body.scrollTop || document.documentElement.scrollTop
            }
        },
        windowSize: function() {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        },
        storage: function(c, e) {
            var d = function(g, h) {
                var f = window.localStorage;
                if (h === undefined) {
                    return f.getItem(g)
                }
                if (g !== undefined && h !== undefined) {
                    f.setItem(g, h);
                    return h
                }
            };
            var b = function(g, h) {
                var f = document.documentElement;
                f.addBehavior("#default#userData");
                if (h === undefined) {
                    f.load("youdao");
                    return f.getAttribute(g)
                }
                if (g !== undefined && h !== undefined) {
                    f.setAttribute(g, h);
                    f.save("youdao");
                    return h
                }
            };
            if (!!window.localStorage) {
                return d(c, e)
            }
            if (!!document.documentElement.addBehavior) {
                return b(c, e)
            }
        },
        cookie: function(b, e) {
            function c(g, h) {
                var i = 30;
                var f = new Date();
                f.setTime(f.getTime() + i * 24 * 60 * 60 * 1000);
                document.cookie = g + "=" + encodeURIComponent(h) + ";expires=" + f.toGMTString()
            }
            function d(g) {
                var f = document.cookie.match(new RegExp("(^| )" + g + "=([^;]*)(;|$)"));
                if (f != null) {
                    return decodeURIComponent(f[2])
                } else {
                    return null
                }
            }
            if (!!e) {
                c(b, e)
            } else {
                return d(b)
            }
        },
        parseData: function() {
            var b = {
                json: function(c) {
                    try {
                        return c = JSONYoudao.parse(c)
                    } catch (d) {
                        YoudaoUtils.log("[Error]", "Invalid JSON data:", c)
                    }
                },
                xml: function(d) {
                    if (window.DOMParser) {
                        return (new DOMParser()).parseFromString(d, "text/xml")
                    } else {
                        var c = new ActiveXObject("Microsoft.XMLDOM");
                        c.async = "false";
                        c.loadXML(d);
                        return c
                    }
                }
            };
            return function(c, d) {
                if (YoudaoUtils.isFunction(c)) {
                    return c(d)
                }
                if (typeof c !== "string") {
                    YoudaoUtils.log("[Error]", "Function parseData() encounters invalid type");
                    return d
                } else {
                    if (!b[c]) {
                        YoudaoUtils.log("[Error]", "Function parseData() dosen't support this type:", c);
                        return d
                    } else {
                        return b[c](d)
                    }
                }
            }
        }(),
        guid: function() {
            var b = function() {
                var e = (1 + Math.random()) * 65536;
                var d = e | 0;
                var c = d.toString(16).substring(1);
                return c
            };
            return (b() + b() + "-" + b() + "-" + b() + "-" + b() + "-" + b() + b() + b())
        }()
    };
    window.YoudaoUtils = YoudaoUtils
}
)();

// 声明 YoudaoSelector 对象
(function() {
    window.YoudaoSelector = {}
}
)();

// 定义 Config 类，并创建新的 Config 实例
(function(YoudaoUtils) {
    function Config() {
        var f = this;
        this.bindTo = null;
        this.backgroundImage = null;
        this.borderColor = "#8CA5C5";
        this.select = "on";
        this.translate = "on";
        this.title = "on";
        this.resize = "on";
        this.relatedUrl = YoudaoUtils.url();
        var d = {
            origin: 0,
            full: 0,
            half: 0,
            query: 0,
            button: 64,
            result: 0
        };
        var e = {
            origin: 0,
            full: 0,
            half: 0,
            top: 20,
            center: 0,
            query: 27,
            button: 23,
            result: 0
        };
        this.init = function(j, g) {
            var i = this;
            var k = parseInt(j.substring(0, j.indexOf("px")));
            var h = parseInt(g.substring(0, g.indexOf("px")));
            c.call(i, k, h, true)
        }
        ;
        function c(l, j, n) {
            if (n === true) {
                if (l < 240) {
                    d.origin = 240
                } else {
                    d.origin = l
                }
            }
            if (l < 240) {
                l = 240
            }
            d.full = l;
            var m = (l % 2 === 0) ? l / 2 : (l - 1) / 2;
            d.half = m;
            if (n === true) {
                if (j < 180) {
                    e.origin = 180
                } else {
                    e.origin = j
                }
            }
            if (this.title === "off") {
                if (j < 80) {
                    j = 80
                }
            } else {
                if (j < 100) {
                    j = 100
                }
            }
            e.full = j;
            var g = (j % 2 === 0) ? j / 2 : (j - 1) / 2;
            e.half = g;
            var i = l - 3 * 2 - 1 * 2 - 5 * 2;
            d.result = i;
            var h = j - e.top;
            if (this.title === "off") {
                h = j
            }
            h = h - 3;
            e.center = h;
            var k = h - 3 - 1 * 2;
            e.result = k
        }
        this.reConfigByResultHeight = function(i) {
            var h = this;
            var g = e.top + (3 * 2 + 1 * 2 + i);
            if (this.title === "off") {
                g = 3 * 2 + 1 * 2 + i
            }
            if (g > e.origin) {
                g = e.origin
            }
            if (g === e.full) {
                return false
            } else {
                c.call(h, d.full, g, false);
                return true
            }
        }
        ;
        this.getWidth = function(g) {
            return d[g]
        }
        ;
        this.getHeight = function(g) {
            return e[g]
        }
    }
    window.YoudaoSelector.Config = new Config()
}
)(YoudaoUtils);

// 定义 UI 类，并创建新的 UI 实例
(function(YoudaoUtils, config) {
    function UI() {
        var h = this;
        var selectorWapper = null;
        this.init = function(callback) {
            var that = this;
            selectorWapper = document.getElementById("YOUDAO_SELECTOR_WRAPPER");
            config.init(selectorWapper.style.width, selectorWapper.style.height);
            var k = selectorWapper.getAttribute("bindTo");
            if (k !== null) {
                config.bindTo = k
            }
            var n = selectorWapper.getAttribute("borderColor");
            var m = selectorWapper.getAttribute("backgroundImage");
            if (n !== null) {
                config.borderColor = n
            }
            if (m !== null) {
                config.backgroundImage = m
            }
            var l = createSelectorIframe();
            setTimeout(function() {
                try {
                    that.iframeDocument = l.contentDocument || l.contentWindow.document
                } catch (p) {
                    alert("由于该网页存在安全性限制, 无法加载有道翻译");
                    return
                }
                writeHtmlIntoIframe(that.iframeDocument);
                that.resultDiv = loadCSSToIframe(that.iframeDocument);
                positionSelector(that.iframeDocument, true);
                callback.call()
            }, 100)
        }
        ;
        function createSelectorIframe() {
            selectorWapper.innerHTML = '<iframe id="YOUDAO_SELECTOR_IFRAME" frameBorder="0" src="about:blank"></iframe>';
            var selectorIframe = document.getElementById("YOUDAO_SELECTOR_IFRAME");
            YoudaoUtils.css(selectorIframe, {
                "background-color": "white",
                border: "0",
                width: config.getWidth("full") + "px",
                height: config.getHeight("full") + "px"
            });
            if (YoudaoUtils.browser.msie) {
                if (document.domain != document.location.hostname) {
                    selectorIframe.src = "<script>document.domain='" + document.domain + "'<\/script>"
                }
            }
            return selectorIframe
        }
        function writeHtmlIntoIframe(iframeDocument) {
            var l = null;
            var j = "</head><body></body></html>";
            if (YoudaoUtils.browser.msie) {
                l = '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8" /><link id="linkStyle" rel="stylesheet" type="text/css" href="javascript:void(0)" />'
            } else {
                l = '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>'
            }
            iframeDocument.open();
            iframeDocument.write(l + j);
            iframeDocument.close()
        }
        function loadCSSToIframe(iframeDocument) {
            var k = "http://shared.ydstatic.com/api/1.0/selector.css";
            if (YoudaoUtils.browser.msie) {
                YoudaoUtils.loadCSSToLink(iframeDocument, "linkStyle", k)
            } else {
                YoudaoUtils.loadCSS(iframeDocument, k)
            }
            var l = null;
            if (config.backgroundImage !== null) {
                l = '<div id="youdaoDictBg"style="background: url(' + config.backgroundImage + ") repeat 0 0; width:" + config.getWidth("full") + "px; height:" + config.getHeight("full") + 'px;"></div>'
            } else {
                l = '                <div id="youdaoDictBg">                    <div id="bgTop" class="bg-sprite">                        <div id="bgTopRight" class="bg-sprite"></div>                    </div>                    <div id="bgBottom" class="bg-sprite">                        <div id="bgBottomRight" class="bg-sprite"></div>                    </div>                </div>'
            }
            var j = '                    <div id="youdaoDictTop">                        <div id="dictIcon" class="sprite"></div>                        <span id="dictTitle">有道翻译</span>                    </div>';
            if (config.title === "off") {
                j = ""
            }
            iframeDocument.body.innerHTML = l + '                <div id="youdaoDictMain">' + j + '                    <div id="youdaoDictCenter">                        <div id="result" class="no-x-scroll"></div>                    </div>                </div>';
            return iframeDocument.getElementById("result")
        }
        function positionSelector(iframeDocument, n) {
            if (n === false) {
                YoudaoUtils.css(selectorWapper, {
                    width: config.getWidth("full") + "px",
                    height: config.getHeight("full") + "px"
                });
                YoudaoUtils.css(document.getElementById("YOUDAO_SELECTOR_IFRAME"), {
                    width: config.getWidth("full") + "px",
                    height: config.getHeight("full") + "px"
                })
            }
            var j = iframeDocument.getElementById("youdaoDictBg");
            YoudaoUtils.css(j, {
                width: config.getWidth("full") + "px",
                height: config.getHeight("full") + "px"
            });
            var l = iframeDocument.getElementById("bgTop");
            if (l !== null) {
                YoudaoUtils.css(l, {
                    height: config.getHeight("half") + "px"
                });
                YoudaoUtils.css(iframeDocument.getElementById("bgTopRight"), {
                    width: config.getWidth("half") + "px",
                    height: config.getHeight("half") + "px"
                });
                YoudaoUtils.css(iframeDocument.getElementById("bgBottom"), {
                    height: (config.getHeight("full") - config.getHeight("half")) + "px"
                });
                YoudaoUtils.css(iframeDocument.getElementById("bgBottomRight"), {
                    width: config.getWidth("half") + "px",
                    height: (config.getHeight("full") - config.getHeight("half")) + "px"
                })
            }
            YoudaoUtils.css(iframeDocument.getElementById("youdaoDictMain"), {
                height: config.getHeight("full") + "px"
            });
            var k = iframeDocument.getElementById("youdaoDictTop");
            if (k !== null) {
                YoudaoUtils.css(iframeDocument.getElementById("youdaoDictTop"), {
                    height: config.getHeight("top") + "px"
                })
            }
            YoudaoUtils.css(iframeDocument.getElementById("youdaoDictCenter"), {
                height: config.getHeight("center") + "px"
            });
            YoudaoUtils.css(iframeDocument.getElementById("result"), {
                "border-color": config.borderColor,
                width: config.getWidth("result") + "px",
                height: config.getHeight("result") + "px"
            })
        }
        this.getSelectEventPos = function(event, l) {
            var r = this;
            var j = event || window.event;
            if (r.getSelectionText(l) === null) {
                return null
            }
            var m = {};
            var o = 0;
            var n = 0;
            var q = YoudaoUtils.scroll().left;
            var p = YoudaoUtils.scroll().top;
            if (j.pageX || j.pageY) {
                o = j.pageX;
                n = j.pageY
            } else {
                if (j.clientX || j.clientY) {
                    o = j.clientX + q;
                    n = j.clientY + p
                }
            }
            m.x = o;
            m.y = n;
            return m
        }
        ;
        this.getSelectionText = function(k) {
            var l = YoudaoUtils.getSelectionText();
            if (l === null || YoudaoUtils.trim(l) === "") {
                if (k.value !== undefined && k.selectionStart !== undefined) {
                    var m = k.selectionStart;
                    var j = k.selectionEnd;
                    if (m === j) {
                        return null
                    } else {
                        l = k.value.substring(m, j)
                    }
                } else {
                    return null
                }
            }
            return l
        }
        ;
        this.getSelectorPos = function(o) {
            var j = o.x;
            var n = o.y;
            var m = YoudaoUtils.scroll().left;
            var l = YoudaoUtils.scroll().top;
            var k = YoudaoUtils.windowSize().width;
            if (j + 10 + config.getWidth("full") + 20 <= k + m) {
                j += 10
            } else {
                j = k + m - config.getWidth("full") - 20
            }
            if (n - 20 - config.getHeight("full") - 20 >= l) {
                n = n - 20 - config.getHeight("full")
            } else {
                n += 20
            }
            o.x = j;
            o.y = n;
            return o
        }
        ;
        this.tryResize = function(o) {
            if (config.resize !== "on") {
                return
            }
            var m = this.iframeDocument;
            var k = m.getElementById("translation");
            var x = (k === null) ? 0 : 3 + o.translation.length * (18 + 3);
            var u = m.getElementById("noResult");
            var z = (u === null) ? 0 : 3 + (o.error === 10 ? 18 * 3 : 18) + 3;
            var s = m.getElementById("copyright");
            var l = (s === null) ? 0 : 3 + 18;
            var v = m.getElementById("title");
            var q = (v === null) ? 0 : 3 + 19 + 3;
            var n = m.getElementById("basic");
            var y = (n === null) ? 0 : o.basic.explains.length * (18 + 3);
            var p = m.getElementById("web");
            var r = (p === null) ? 0 : (1 + Math.floor((o.web[0].value.length + 3) / 4)) * (18 + 3);
            var j = m.getElementById("bottom");
            var t = (j === null) ? 0 : 18 + 3;
            var w = x + z + l + q + y + r + t;
            if (config.reConfigByResultHeight(w)) {
                positionSelector(m, false)
            }
        }
        ;
        this.resize = function() {
            if (config.resize !== "on") {
                return
            }
            var m = this.iframeDocument;
            var k = m.getElementById("translation");
            var w = (k === null) ? 0 : 3 + k.offsetHeight + 3;
            var t = m.getElementById("noResult");
            var y = (t === null) ? 0 : 3 + t.offsetHeight + 3;
            var r = m.getElementById("copyright");
            var l = (r === null) ? 0 : 3 + r.offsetHeight;
            var u = m.getElementById("title");
            var p = (u === null) ? 0 : 3 + u.offsetHeight + 3;
            var n = m.getElementById("basic");
            var x = (n === null) ? 0 : n.offsetHeight + 3;
            var o = m.getElementById("web");
            var q = (o === null) ? 0 : o.offsetHeight + 3;
            var j = m.getElementById("bottom");
            var s = (j === null) ? 0 : j.offsetHeight + 3;
            var v = w + y + l + p + x + q + s;
            if (config.reConfigByResultHeight(v)) {
                positionSelector(m, false)
            }
        }
        ;
        this.show = function(j) {
            YoudaoUtils.css(selectorWapper, {
                display: "block",
                position: "absolute",
                left: j.x + "px",
                top: j.y + "px"
            })
        }
        ;
        this.hide = function() {
            YoudaoUtils.css(selectorWapper, {
                display: "none"
            })
        }
    }
    window.YoudaoSelector.UI = new UI()
}
)(YoudaoUtils, YoudaoSelector.Config);

// 定义并创建 DataRender 对象，用以处理获取到的数据
(function(YoudaoUtils) {
    var DataRender = {
        renderTranslation: function(g, d, j) {
            var n = g.createElement("div");
            n.setAttribute("id", "translation");
            var m = g.createElement("h3");
            m.className = "sub-item";
            m.appendChild(g.createTextNode("有道翻译"));
            var h = g.createElement("span");
            h.appendChild(g.createTextNode("┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈"));
            m.appendChild(h);
            n.appendChild(m);
            var c = j.translation;
            for (var k = 0, f = c.length; k < f; k++) {
                var e = g.createElement("p");
                e.appendChild(g.createTextNode(c[k]));
                n.appendChild(e)
            }
            d.appendChild(n)
        },
        renderError: function(d, c, e) {
            var i = d.createElement("div");
            i.setAttribute("id", "noResult");
            var j = d.createElement("p");
            j.setAttribute("id", "error");
            var l = e.errorCode;
            if (l === 10) {
                j.appendChild(d.createTextNode("抱歉，没有找到与您查询的“" + e.query + "”相符的内容："));
                i.appendChild(j);
                var h = d.createElement("ul");
                h.setAttribute("id", "noResultTip");
                var g = d.createElement("li");
                g.appendChild(d.createTextNode("请检查您的输入是否正确"));
                h.appendChild(g);
                var f = d.createElement("li");
                f.appendChild(d.createTextNode("或者使用有道专业翻译“"));
                var k = d.createElement("a");
                k.setAttribute("href", "http://f.youdao.com/?path=fanyi&vendor=openapi.selector&text=" + encodeURIComponent(e.query));
                k.setAttribute("target", "_blank");
                k.appendChild(d.createTextNode(e.query));
                f.appendChild(k);
                f.appendChild(d.createTextNode("”"));
                h.appendChild(f);
                i.appendChild(h)
            } else {
                var m = null;
                if (l === 20) {
                    if (e.translation !== undefined) {
                        m = "输入文字不能超过200个字符！"
                    } else {
                        m = "输入文字不能超过40个字符！"
                    }
                } else {
                    if (l === 30) {
                        m = "服务器忙，请稍后再试！"
                    } else {
                        if (l === 40) {
                            m = "无法识别您输入文字的语言！"
                        } else {
                            if (l === 50) {
                                m = "该网站使用的有道翻译服务序列号无效，请联系网站管理人员解决！"
                            } else {
                                m = "未知错误！"
                            }
                        }
                    }
                }
                j.appendChild(d.createTextNode(m));
                i.appendChild(j)
            }
            c.appendChild(i)
        },
        renderCopyRight: function(e, c) {
            var f = e.createElement("h3");
            f.setAttribute("id", "copyright");
            f.className = "sub-item";
            f.appendChild(e.createTextNode("有道词典"));
            var d = e.createElement("span");
            d.appendChild(e.createTextNode("┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈"));
            f.appendChild(d);
            c.appendChild(f)
        },
        renderTitle: function(f, c, d) {
            var e = f.createElement("h2");
            e.setAttribute("id", "title");
            e.appendChild(f.createTextNode(d.query));
            c.appendChild(e)
        },
        renderBasicResult: function(f, c, k) {
            var n = f.getElementById("title");
            var g = k.basic;
            var o = g.phonetic;
            if (o !== undefined) {
                var h = f.createElement("span");
                h.setAttribute("id", "phonetic");
                h.appendChild(f.createTextNode("[" + o + "]"));
                n.appendChild(h)
            }
            var p = f.createElement("div");
            p.setAttribute("id", "basic");
            for (var j = 0, e = g.explains.length; j < e; j++) {
                var m = g.explains[j];
                var d = f.createElement("p");
                d.appendChild(f.createTextNode(m));
                p.appendChild(d)
            }
            c.appendChild(p)
        },
        renderWebResult: function(e, c, h) {
            var o = e.createElement("div");
            o.setAttribute("id", "web");
            var j = e.createElement("h3");
            j.className = "sub-item";
            j.appendChild(e.createTextNode("网络释义"));
            var f = e.createElement("span");
            f.appendChild(e.createTextNode("┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈"));
            j.appendChild(f);
            o.appendChild(j);
            var k = h.web[0];
            var m = e.createElement("p");
            for (var g = 0, d = k.value.length; g < d; g++) {
                if (g > 0) {
                    var n = e.createElement("span");
                    n.className = "split";
                    m.appendChild(n)
                }
                var p = e.createElement("span");
                p.className = "web-item";
                p.appendChild(e.createTextNode(k.value[g]));
                m.appendChild(p)
            }
            o.appendChild(m);
            c.appendChild(o)
        },
        renderMore: function(f, d) {
            var e = f.getElementById("title");
            var c = f.createElement("a");
            c.setAttribute("id", "more");
            c.setAttribute("href", "http://dict.youdao.com/search?keyfrom=selector&q=" + encodeURIComponent(d.query));
            c.setAttribute("target", "_blank");
            c.setAttribute("hideFocus", "true");
            c.appendChild(f.createTextNode("详细>>"));
            e.appendChild(c)
        },
        renderBottom: function(h, f, g) {
            var d = h.createElement("p");
            d.setAttribute("id", "bottom");
            d.className = "has-layout";
            var c = h.createElement("a");
            c.setAttribute("id", "download");
            c.className = "bottom-link";
            c.setAttribute("href", "http://cidian.youdao.com/?keyfrom=dictapi.selector");
            c.setAttribute("target", "_blank");
            c.appendChild(h.createTextNode("下载有道词典"));
            d.appendChild(c);
            var e = h.createElement("a");
            e.setAttribute("id", "search");
            e.className = "bottom-link";
            e.setAttribute("href", "http://f.youdao.com/?path=fanyi&vendor=openapi.selector&text=" + encodeURIComponent(g.query));
            e.setAttribute("target", "_blank");
            e.appendChild(h.createTextNode("获取人工翻译"));
            d.appendChild(e);
            f.appendChild(d)
        }
    };
    window.YoudaoSelector.DataRender = DataRender
}
)(YoudaoUtils);

// 定义 YoudaoSelector 类，并创建实例
(function(YoudaoUtils, config, ui, dataRender) {
    function YoudaoSelector() {
        var that = this;
        var l = null;
        var f = null;
        var r = null;
        var p = {};
        function initUI() {
            ui.init(bindEventHandler)
        }
        function bindEventHandler() {
            l = ui.iframeDocument;
            f = ui.resultDiv;
            if (config.bindTo !== null) {
                var w = config.bindTo.split(":");
                for (var x = 0, v = w.length; x < v; x++) {
                    YoudaoUtils.bind(document.getElementById(w[x]), "mouseup", processSelectEvent)
                }
            } else {
                YoudaoUtils.bind(document.body, "mouseup", processSelectEvent)
            }
            YoudaoUtils.bind(document.body, "mousedown", ui.hide);
            g()
        }
        var m = "点击关闭有道翻译划词功能";
        var j = "点击打开有道翻译划词功能";
        function g() {
            var v = document.getElementById("YOUDAO_FANYIAPI_SWITCHER");
            if (v !== null) {
                v.setAttribute("status", "off");
                v.setAttribute("title", j);
                YoudaoUtils.css(v, {
                    margin: 0,
                    border: 0,
                    padding: 0,
                    backgroundImage: "url(http://shared.ydstatic.com/api/1.0/switcher.png)",
                    width: "20px",
                    height: "40px",
                    cursor: "pointer"
                });
                config.select = "off";
                YoudaoUtils.bind(v, "click", function() {
                    var w = v.getAttribute("status");
                    if (w === "on") {
                        YoudaoUtils.css(v, {
                            backgroundPosition: "0 0"
                        });
                        v.setAttribute("status", "off");
                        v.setAttribute("title", j);
                        config.select = "off"
                    } else {
                        YoudaoUtils.css(v, {
                            backgroundPosition: "-20px 0"
                        });
                        v.setAttribute("status", "on");
                        v.setAttribute("title", m);
                        config.select = "on"
                    }
                })
            }
        }
        this.update = function(v) {
            var w = p;
            if (v.errorCode !== 0) {
                dataRender.renderError(l, f, v)
            } else {
                if (v.basic === undefined && v.web === undefined) {
                    dataRender.renderTranslation(l, f, v)
                } else {
                    if (config.title === "off") {
                        dataRender.renderCopyRight(l, f)
                    }
                    dataRender.renderTitle(l, f, v);
                    if (v.basic !== undefined) {
                        dataRender.renderBasicResult(l, f, v)
                    }
                    if (v.web !== undefined) {
                        dataRender.renderWebResult(l, f, v)
                    }
                    dataRender.renderMore(l, v)
                }
            }
            dataRender.renderBottom(l, f, v);
            ui.tryResize(v);
            w = ui.getSelectorPos(w);
            ui.show(w);
            ui.resize();
            f.scrollTop = 0
        }
        ;
        this.updateTranslate = function(v) {
            var w = p;
            if (v.errorCode !== 0) {
                dataRender.renderError(l, f, v)
            } else {
                dataRender.renderTranslation(l, f, v)
            }
            dataRender.renderBottom(l, f, v);
            ui.tryResize(v);
            w = ui.getSelectorPos(w);
            ui.show(w);
            ui.resize();
            f.scrollTop = 0
        }
        ;
        initUI();
        function processSelectEvent(jsEvent) {
            var that = this; // 选中的内容
            var selectPos = ui.getSelectEventPos(jsEvent, that);
            if (selectPos == null) {
                return
            }
            setTimeout(function() {
                processSelectContent(selectPos, that)
            }, 10)
        }
        function processSelectContent(selectPos, selectionContent) {
            if (config.select !== "on") {
                return
            }
            var selectText = ui.getSelectionText(selectionContent);
            if (selectText === null) {
                return
            }
            selectText = YoudaoUtils.trim(selectText);
            if (selectText === "") {} else {
                if (selectText.length > 200) {} else {
                    if (selectText.length > 40) {
                        if (config.translate === "on") {
                            p = selectPos;
                            queryTranslation(selectText)
                        }
                    } else {
                        p = selectPos;
                        queryDict(selectText)
                    }
                }
            }
        }
        function k(v) {}
        function queryDict(w) {
            o();
            var y = "YoudaoSelector.Instance.update";
            var x = document.createElement("script");
            x.setAttribute("type", "text/javascript");
            x.setAttribute("src", "http://fanyi.youdao.com/openapi.do?type=data&doctype=jsonp&version=1.1&" + YoudaoUtils.parameter({
                relatedUrl: config.relatedUrl,
                keyfrom: "Wizhelper",
                key: "342921866",
                callback: y,
                translate: config.translate,
                q: w,
                ts: (new Date()).getTime()
            }));
            x.setAttribute("charset", "utf-8");
            var v = document.getElementsByTagName("head")[0] || document.body;
            v.appendChild(x)
        }
        function queryTranslation(w) {
            o();
            var y = "YoudaoSelector.Instance.updateTranslate";
            var x = document.createElement("script");
            x.setAttribute("type", "text/javascript");
            x.setAttribute("src", "http://fanyi.youdao.com/openapi.do?type=data&only=on&doctype=jsonp&version=1.1&" + YoudaoUtils.parameter({
                relatedUrl: config.relatedUrl,
                keyfrom: "Wizhelper",
                key: "342921866",
                callback: y,
                q: w,
                ts: (new Date()).getTime()
            }));
            x.setAttribute("charset", "utf-8");
            var v = document.getElementsByTagName("head")[0] || document.body;
            v.appendChild(x)
        }
        function o() {
            var w = f.childNodes;
            for (var v = w.length - 1; v >= 0; v--) {
                f.removeChild(w[v])
            }
        }
    }
    window.YoudaoSelector.Instance = new YoudaoSelector()
}
)(YoudaoUtils, YoudaoSelector.Config, YoudaoSelector.UI, YoudaoSelector.DataRender);
