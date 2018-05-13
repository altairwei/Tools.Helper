!function e(t, n, r) {
    function o(a, l) {
        if (!n[a]) {
            if (!t[a]) {
                var s = "function" == typeof require && require;
                if (!l && s)
                    return s(a, !0);
                if (i)
                    return i(a, !0);
                var d = new Error("Cannot find module '" + a + "'");
                throw d.code = "MODULE_NOT_FOUND",
                d
            }
            var c = n[a] = {
                exports: {}
            };
            t[a][0].call(c.exports, function(e) {
                var n = t[a][1][e];
                return o(n ? n : e)
            }, c, c.exports, e, t, n, r)
        }
        return n[a].exports
    }
    for (var i = "function" == typeof require && require, a = 0; a < r.length; a++)
        o(r[a]);
    return o
}({
    1: [function(e, t, n) {
        "use strict";
        function r(e) {
            var t = e.length;
            if (t % 4 > 0)
                throw new Error("Invalid string. Length must be a multiple of 4");
            return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
        }
        function o(e) {
            return 3 * e.length / 4 - r(e)
        }
        function i(e) {
            var t, n, o, i, a, l, s = e.length;
            a = r(e),
            l = new u(3 * s / 4 - a),
            o = a > 0 ? s - 4 : s;
            var d = 0;
            for (t = 0,
            n = 0; t < o; t += 4,
            n += 3)
                i = c[e.charCodeAt(t)] << 18 | c[e.charCodeAt(t + 1)] << 12 | c[e.charCodeAt(t + 2)] << 6 | c[e.charCodeAt(t + 3)],
                l[d++] = i >> 16 & 255,
                l[d++] = i >> 8 & 255,
                l[d++] = 255 & i;
            return 2 === a ? (i = c[e.charCodeAt(t)] << 2 | c[e.charCodeAt(t + 1)] >> 4,
            l[d++] = 255 & i) : 1 === a && (i = c[e.charCodeAt(t)] << 10 | c[e.charCodeAt(t + 1)] << 4 | c[e.charCodeAt(t + 2)] >> 2,
            l[d++] = i >> 8 & 255,
            l[d++] = 255 & i),
            l
        }
        function a(e) {
            return d[e >> 18 & 63] + d[e >> 12 & 63] + d[e >> 6 & 63] + d[63 & e]
        }
        function l(e, t, n) {
            for (var r, o = [], i = t; i < n; i += 3)
                r = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2],
                o.push(a(r));
            return o.join("")
        }
        function s(e) {
            for (var t, n = e.length, r = n % 3, o = "", i = [], a = 16383, s = 0, c = n - r; s < c; s += a)
                i.push(l(e, s, s + a > c ? c : s + a));
            return 1 === r ? (t = e[n - 1],
            o += d[t >> 2],
            o += d[t << 4 & 63],
            o += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1],
            o += d[t >> 10],
            o += d[t >> 4 & 63],
            o += d[t << 2 & 63],
            o += "="),
            i.push(o),
            i.join("")
        }
        n.byteLength = o,
        n.toByteArray = i,
        n.fromByteArray = s;
        for (var d = [], c = [], u = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", g = 0, m = f.length; g < m; ++g)
            d[g] = f[g],
            c[f.charCodeAt(g)] = g;
        c["-".charCodeAt(0)] = 62,
        c["_".charCodeAt(0)] = 63
    }
    , {}],
    2: [function(e, t, n) {
        (function(t) {
            "use strict";
            function r() {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    },
                    42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                } catch (e) {
                    return !1
                }
            }
            function o() {
                return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }
            function i(e, t) {
                if (o() < t)
                    throw new RangeError("Invalid typed array length");
                return a.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t),
                e.__proto__ = a.prototype) : (null  === e && (e = new a(t)),
                e.length = t),
                e
            }
            function a(e, t, n) {
                if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a))
                    return new a(e,t,n);
                if ("number" == typeof e) {
                    if ("string" == typeof t)
                        throw new Error("If encoding is specified then the first argument must be a string");
                    return c(this, e)
                }
                return l(this, e, t, n)
            }
            function l(e, t, n, r) {
                if ("number" == typeof t)
                    throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? g(e, t, n, r) : "string" == typeof t ? u(e, t, n) : m(e, t)
            }
            function s(e) {
                if ("number" != typeof e)
                    throw new TypeError('"size" argument must be a number');
                if (e < 0)
                    throw new RangeError('"size" argument must not be negative')
            }
            function d(e, t, n, r) {
                return s(t),
                t <= 0 ? i(e, t) : void 0 !== n ? "string" == typeof r ? i(e, t).fill(n, r) : i(e, t).fill(n) : i(e, t)
            }
            function c(e, t) {
                if (s(t),
                e = i(e, t < 0 ? 0 : 0 | p(t)),
                !a.TYPED_ARRAY_SUPPORT)
                    for (var n = 0; n < t; ++n)
                        e[n] = 0;
                return e
            }
            function u(e, t, n) {
                if ("string" == typeof n && "" !== n || (n = "utf8"),
                !a.isEncoding(n))
                    throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | v(t, n);
                e = i(e, r);
                var o = e.write(t, n);
                return o !== r && (e = e.slice(0, o)),
                e
            }
            function f(e, t) {
                var n = t.length < 0 ? 0 : 0 | p(t.length);
                e = i(e, n);
                for (var r = 0; r < n; r += 1)
                    e[r] = 255 & t[r];
                return e
            }
            function g(e, t, n, r) {
                if (t.byteLength,
                n < 0 || t.byteLength < n)
                    throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < n + (r || 0))
                    throw new RangeError("'length' is out of bounds");
                return t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t,n) : new Uint8Array(t,n,r),
                a.TYPED_ARRAY_SUPPORT ? (e = t,
                e.__proto__ = a.prototype) : e = f(e, t),
                e
            }
            function m(e, t) {
                if (a.isBuffer(t)) {
                    var n = 0 | p(t.length);
                    return e = i(e, n),
                    0 === e.length ? e : (t.copy(e, 0, 0, n),
                    e)
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t)
                        return "number" != typeof t.length || X(t.length) ? i(e, 0) : f(e, t);
                    if ("Buffer" === t.type && Q(t.data))
                        return f(e, t.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }
            function p(e) {
                if (e >= o())
                    throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
                return 0 | e
            }
            function h(e) {
                return +e != e && (e = 0),
                a.alloc(+e)
            }
            function v(e, t) {
                if (a.isBuffer(e))
                    return e.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer))
                    return e.byteLength;
                "string" != typeof e && (e = "" + e);
                var n = e.length;
                if (0 === n)
                    return 0;
                for (var r = !1; ; )
                    switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return n;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return q(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * n;
                    case "hex":
                        return n >>> 1;
                    case "base64":
                        return K(e).length;
                    default:
                        if (r)
                            return q(e).length;
                        t = ("" + t).toLowerCase(),
                        r = !0
                    }
            }
            function b(e, t, n) {
                var r = !1;
                if ((void 0 === t || t < 0) && (t = 0),
                t > this.length)
                    return "";
                if ((void 0 === n || n > this.length) && (n = this.length),
                n <= 0)
                    return "";
                if (n >>>= 0,
                t >>>= 0,
                n <= t)
                    return "";
                for (e || (e = "utf8"); ; )
                    switch (e) {
                    case "hex":
                        return R(this, t, n);
                    case "utf8":
                    case "utf-8":
                        return L(this, t, n);
                    case "ascii":
                        return I(this, t, n);
                    case "latin1":
                    case "binary":
                        return x(this, t, n);
                    case "base64":
                        return D(this, t, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return M(this, t, n);
                    default:
                        if (r)
                            throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(),
                        r = !0
                    }
            }
            function C(e, t, n) {
                var r = e[t];
                e[t] = e[n],
                e[n] = r
            }
            function E(e, t, n, r, o) {
                if (0 === e.length)
                    return -1;
                if ("string" == typeof n ? (r = n,
                n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648),
                n = +n,
                isNaN(n) && (n = o ? 0 : e.length - 1),
                n < 0 && (n = e.length + n),
                n >= e.length) {
                    if (o)
                        return -1;
                    n = e.length - 1
                } else if (n < 0) {
                    if (!o)
                        return -1;
                    n = 0
                }
                if ("string" == typeof t && (t = a.from(t, r)),
                a.isBuffer(t))
                    return 0 === t.length ? -1 : T(e, t, n, r, o);
                if ("number" == typeof t)
                    return t = 255 & t,
                    a.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : T(e, [t], n, r, o);
                throw new TypeError("val must be string, number or Buffer")
            }
            function T(e, t, n, r, o) {
                function i(e, t) {
                    return 1 === a ? e[t] : e.readUInt16BE(t * a)
                }
                var a = 1
                  , l = e.length
                  , s = t.length;
                if (void 0 !== r && (r = String(r).toLowerCase(),
                "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (e.length < 2 || t.length < 2)
                        return -1;
                    a = 2,
                    l /= 2,
                    s /= 2,
                    n /= 2
                }
                var d;
                if (o) {
                    var c = -1;
                    for (d = n; d < l; d++)
                        if (i(e, d) === i(t, c === -1 ? 0 : d - c)) {
                            if (c === -1 && (c = d),
                            d - c + 1 === s)
                                return c * a
                        } else
                            c !== -1 && (d -= d - c),
                            c = -1
                } else
                    for (n + s > l && (n = l - s),
                    d = n; d >= 0; d--) {
                        for (var u = !0, f = 0; f < s; f++)
                            if (i(e, d + f) !== i(t, f)) {
                                u = !1;
                                break
                            }
                        if (u)
                            return d
                    }
                return -1
            }
            function S(e, t, n, r) {
                n = Number(n) || 0;
                var o = e.length - n;
                r ? (r = Number(r),
                r > o && (r = o)) : r = o;
                var i = t.length;
                if (i % 2 !== 0)
                    throw new TypeError("Invalid hex string");
                r > i / 2 && (r = i / 2);
                for (var a = 0; a < r; ++a) {
                    var l = parseInt(t.substr(2 * a, 2), 16);
                    if (isNaN(l))
                        return a;
                    e[n + a] = l
                }
                return a
            }
            function y(e, t, n, r) {
                return j(q(t, e.length - n), e, n, r)
            }
            function A(e, t, n, r) {
                return j(V(t), e, n, r)
            }
            function N(e, t, n, r) {
                return A(e, t, n, r)
            }
            function _(e, t, n, r) {
                return j(K(t), e, n, r)
            }
            function O(e, t, n, r) {
                return j(Z(t, e.length - n), e, n, r)
            }
            function D(e, t, n) {
                return 0 === t && n === e.length ? $.fromByteArray(e) : $.fromByteArray(e.slice(t, n))
            }
            function L(e, t, n) {
                n = Math.min(e.length, n);
                for (var r = [], o = t; o < n; ) {
                    var i = e[o]
                      , a = null 
                      , l = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                    if (o + l <= n) {
                        var s, d, c, u;
                        switch (l) {
                        case 1:
                            i < 128 && (a = i);
                            break;
                        case 2:
                            s = e[o + 1],
                            128 === (192 & s) && (u = (31 & i) << 6 | 63 & s,
                            u > 127 && (a = u));
                            break;
                        case 3:
                            s = e[o + 1],
                            d = e[o + 2],
                            128 === (192 & s) && 128 === (192 & d) && (u = (15 & i) << 12 | (63 & s) << 6 | 63 & d,
                            u > 2047 && (u < 55296 || u > 57343) && (a = u));
                            break;
                        case 4:
                            s = e[o + 1],
                            d = e[o + 2],
                            c = e[o + 3],
                            128 === (192 & s) && 128 === (192 & d) && 128 === (192 & c) && (u = (15 & i) << 18 | (63 & s) << 12 | (63 & d) << 6 | 63 & c,
                            u > 65535 && u < 1114112 && (a = u))
                        }
                    }
                    null  === a ? (a = 65533,
                    l = 1) : a > 65535 && (a -= 65536,
                    r.push(a >>> 10 & 1023 | 55296),
                    a = 56320 | 1023 & a),
                    r.push(a),
                    o += l
                }
                return w(r)
            }
            function w(e) {
                var t = e.length;
                if (t <= ee)
                    return String.fromCharCode.apply(String, e);
                for (var n = "", r = 0; r < t; )
                    n += String.fromCharCode.apply(String, e.slice(r, r += ee));
                return n
            }
            function I(e, t, n) {
                var r = "";
                n = Math.min(e.length, n);
                for (var o = t; o < n; ++o)
                    r += String.fromCharCode(127 & e[o]);
                return r
            }
            function x(e, t, n) {
                var r = "";
                n = Math.min(e.length, n);
                for (var o = t; o < n; ++o)
                    r += String.fromCharCode(e[o]);
                return r
            }
            function R(e, t, n) {
                var r = e.length;
                (!t || t < 0) && (t = 0),
                (!n || n < 0 || n > r) && (n = r);
                for (var o = "", i = t; i < n; ++i)
                    o += G(e[i]);
                return o
            }
            function M(e, t, n) {
                for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2)
                    o += String.fromCharCode(r[i] + 256 * r[i + 1]);
                return o
            }
            function k(e, t, n) {
                if (e % 1 !== 0 || e < 0)
                    throw new RangeError("offset is not uint");
                if (e + t > n)
                    throw new RangeError("Trying to access beyond buffer length")
            }
            function P(e, t, n, r, o, i) {
                if (!a.isBuffer(e))
                    throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > o || t < i)
                    throw new RangeError('"value" argument is out of bounds');
                if (n + r > e.length)
                    throw new RangeError("Index out of range")
            }
            function B(e, t, n, r) {
                t < 0 && (t = 65535 + t + 1);
                for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o)
                    e[n + o] = (t & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o)
            }
            function U(e, t, n, r) {
                t < 0 && (t = 4294967295 + t + 1);
                for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o)
                    e[n + o] = t >>> 8 * (r ? o : 3 - o) & 255
            }
            function z(e, t, n, r, o, i) {
                if (n + r > e.length)
                    throw new RangeError("Index out of range");
                if (n < 0)
                    throw new RangeError("Index out of range")
            }
            function F(e, t, n, r, o) {
                return o || z(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38),
                J.write(e, t, n, r, 23, 4),
                n + 4
            }
            function H(e, t, n, r, o) {
                return o || z(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308),
                J.write(e, t, n, r, 52, 8),
                n + 8
            }
            function Y(e) {
                if (e = W(e).replace(te, ""),
                e.length < 2)
                    return "";
                for (; e.length % 4 !== 0; )
                    e += "=";
                return e
            }
            function W(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }
            function G(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }
            function q(e, t) {
                t = t || 1 / 0;
                for (var n, r = e.length, o = null , i = [], a = 0; a < r; ++a) {
                    if (n = e.charCodeAt(a),
                    n > 55295 && n < 57344) {
                        if (!o) {
                            if (n > 56319) {
                                (t -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            if (a + 1 === r) {
                                (t -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            o = n;
                            continue
                        }
                        if (n < 56320) {
                            (t -= 3) > -1 && i.push(239, 191, 189),
                            o = n;
                            continue
                        }
                        n = (o - 55296 << 10 | n - 56320) + 65536
                    } else
                        o && (t -= 3) > -1 && i.push(239, 191, 189);
                    if (o = null ,
                    n < 128) {
                        if ((t -= 1) < 0)
                            break;
                        i.push(n)
                    } else if (n < 2048) {
                        if ((t -= 2) < 0)
                            break;
                        i.push(n >> 6 | 192, 63 & n | 128)
                    } else if (n < 65536) {
                        if ((t -= 3) < 0)
                            break;
                        i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                    } else {
                        if (!(n < 1114112))
                            throw new Error("Invalid code point");
                        if ((t -= 4) < 0)
                            break;
                        i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                    }
                }
                return i
            }
            function V(e) {
                for (var t = [], n = 0; n < e.length; ++n)
                    t.push(255 & e.charCodeAt(n));
                return t
            }
            function Z(e, t) {
                for (var n, r, o, i = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
                    n = e.charCodeAt(a),
                    r = n >> 8,
                    o = n % 256,
                    i.push(o),
                    i.push(r);
                return i
            }
            function K(e) {
                return $.toByteArray(Y(e))
            }
            function j(e, t, n, r) {
                for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o)
                    t[o + n] = e[o];
                return o
            }
            function X(e) {
                return e !== e
            }
            var $ = e("base64-js")
              , J = e("ieee754")
              , Q = e("isarray");
            n.Buffer = a,
            n.SlowBuffer = h,
            n.INSPECT_MAX_BYTES = 50,
            a.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : r(),
            n.kMaxLength = o(),
            a.poolSize = 8192,
            a._augment = function(e) {
                return e.__proto__ = a.prototype,
                e
            }
            ,
            a.from = function(e, t, n) {
                return l(null , e, t, n)
            }
            ,
            a.TYPED_ARRAY_SUPPORT && (a.prototype.__proto__ = Uint8Array.prototype,
            a.__proto__ = Uint8Array,
            "undefined" != typeof Symbol && Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, {
                value: null ,
                configurable: !0
            })),
            a.alloc = function(e, t, n) {
                return d(null , e, t, n)
            }
            ,
            a.allocUnsafe = function(e) {
                return c(null , e)
            }
            ,
            a.allocUnsafeSlow = function(e) {
                return c(null , e)
            }
            ,
            a.isBuffer = function(e) {
                return !(null  == e || !e._isBuffer)
            }
            ,
            a.compare = function(e, t) {
                if (!a.isBuffer(e) || !a.isBuffer(t))
                    throw new TypeError("Arguments must be Buffers");
                if (e === t)
                    return 0;
                for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o)
                    if (e[o] !== t[o]) {
                        n = e[o],
                        r = t[o];
                        break
                    }
                return n < r ? -1 : r < n ? 1 : 0
            }
            ,
            a.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
                }
            }
            ,
            a.concat = function(e, t) {
                if (!Q(e))
                    throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length)
                    return a.alloc(0);
                var n;
                if (void 0 === t)
                    for (t = 0,
                    n = 0; n < e.length; ++n)
                        t += e[n].length;
                var r = a.allocUnsafe(t)
                  , o = 0;
                for (n = 0; n < e.length; ++n) {
                    var i = e[n];
                    if (!a.isBuffer(i))
                        throw new TypeError('"list" argument must be an Array of Buffers');
                    i.copy(r, o),
                    o += i.length
                }
                return r
            }
            ,
            a.byteLength = v,
            a.prototype._isBuffer = !0,
            a.prototype.swap16 = function() {
                var e = this.length;
                if (e % 2 !== 0)
                    throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2)
                    C(this, t, t + 1);
                return this
            }
            ,
            a.prototype.swap32 = function() {
                var e = this.length;
                if (e % 4 !== 0)
                    throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4)
                    C(this, t, t + 3),
                    C(this, t + 1, t + 2);
                return this
            }
            ,
            a.prototype.swap64 = function() {
                var e = this.length;
                if (e % 8 !== 0)
                    throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8)
                    C(this, t, t + 7),
                    C(this, t + 1, t + 6),
                    C(this, t + 2, t + 5),
                    C(this, t + 3, t + 4);
                return this
            }
            ,
            a.prototype.toString = function() {
                var e = 0 | this.length;
                return 0 === e ? "" : 0 === arguments.length ? L(this, 0, e) : b.apply(this, arguments)
            }
            ,
            a.prototype.equals = function(e) {
                if (!a.isBuffer(e))
                    throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === a.compare(this, e)
            }
            ,
            a.prototype.inspect = function() {
                var e = ""
                  , t = n.INSPECT_MAX_BYTES;
                return this.length > 0 && (e = this.toString("hex", 0, t).match(/.{2}/g).join(" "),
                this.length > t && (e += " ... ")),
                "<Buffer " + e + ">"
            }
            ,
            a.prototype.compare = function(e, t, n, r, o) {
                if (!a.isBuffer(e))
                    throw new TypeError("Argument must be a Buffer");
                if (void 0 === t && (t = 0),
                void 0 === n && (n = e ? e.length : 0),
                void 0 === r && (r = 0),
                void 0 === o && (o = this.length),
                t < 0 || n > e.length || r < 0 || o > this.length)
                    throw new RangeError("out of range index");
                if (r >= o && t >= n)
                    return 0;
                if (r >= o)
                    return -1;
                if (t >= n)
                    return 1;
                if (t >>>= 0,
                n >>>= 0,
                r >>>= 0,
                o >>>= 0,
                this === e)
                    return 0;
                for (var i = o - r, l = n - t, s = Math.min(i, l), d = this.slice(r, o), c = e.slice(t, n), u = 0; u < s; ++u)
                    if (d[u] !== c[u]) {
                        i = d[u],
                        l = c[u];
                        break
                    }
                return i < l ? -1 : l < i ? 1 : 0
            }
            ,
            a.prototype.includes = function(e, t, n) {
                return this.indexOf(e, t, n) !== -1
            }
            ,
            a.prototype.indexOf = function(e, t, n) {
                return E(this, e, t, n, !0)
            }
            ,
            a.prototype.lastIndexOf = function(e, t, n) {
                return E(this, e, t, n, !1)
            }
            ,
            a.prototype.write = function(e, t, n, r) {
                if (void 0 === t)
                    r = "utf8",
                    n = this.length,
                    t = 0;
                else if (void 0 === n && "string" == typeof t)
                    r = t,
                    n = this.length,
                    t = 0;
                else {
                    if (!isFinite(t))
                        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t = 0 | t,
                    isFinite(n) ? (n = 0 | n,
                    void 0 === r && (r = "utf8")) : (r = n,
                    n = void 0)
                }
                var o = this.length - t;
                if ((void 0 === n || n > o) && (n = o),
                e.length > 0 && (n < 0 || t < 0) || t > this.length)
                    throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                for (var i = !1; ; )
                    switch (r) {
                    case "hex":
                        return S(this, e, t, n);
                    case "utf8":
                    case "utf-8":
                        return y(this, e, t, n);
                    case "ascii":
                        return A(this, e, t, n);
                    case "latin1":
                    case "binary":
                        return N(this, e, t, n);
                    case "base64":
                        return _(this, e, t, n);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return O(this, e, t, n);
                    default:
                        if (i)
                            throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(),
                        i = !0
                    }
            }
            ,
            a.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }
            ;
            var ee = 4096;
            a.prototype.slice = function(e, t) {
                var n = this.length;
                e = ~~e,
                t = void 0 === t ? n : ~~t,
                e < 0 ? (e += n,
                e < 0 && (e = 0)) : e > n && (e = n),
                t < 0 ? (t += n,
                t < 0 && (t = 0)) : t > n && (t = n),
                t < e && (t = e);
                var r;
                if (a.TYPED_ARRAY_SUPPORT)
                    r = this.subarray(e, t),
                    r.__proto__ = a.prototype;
                else {
                    var o = t - e;
                    r = new a(o,(void 0));
                    for (var i = 0; i < o; ++i)
                        r[i] = this[i + e]
                }
                return r
            }
            ,
            a.prototype.readUIntLE = function(e, t, n) {
                e = 0 | e,
                t = 0 | t,
                n || k(e, t, this.length);
                for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
                    r += this[e + i] * o;
                return r
            }
            ,
            a.prototype.readUIntBE = function(e, t, n) {
                e = 0 | e,
                t = 0 | t,
                n || k(e, t, this.length);
                for (var r = this[e + --t], o = 1; t > 0 && (o *= 256); )
                    r += this[e + --t] * o;
                return r
            }
            ,
            a.prototype.readUInt8 = function(e, t) {
                return t || k(e, 1, this.length),
                this[e]
            }
            ,
            a.prototype.readUInt16LE = function(e, t) {
                return t || k(e, 2, this.length),
                this[e] | this[e + 1] << 8
            }
            ,
            a.prototype.readUInt16BE = function(e, t) {
                return t || k(e, 2, this.length),
                this[e] << 8 | this[e + 1]
            }
            ,
            a.prototype.readUInt32LE = function(e, t) {
                return t || k(e, 4, this.length),
                (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }
            ,
            a.prototype.readUInt32BE = function(e, t) {
                return t || k(e, 4, this.length),
                16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }
            ,
            a.prototype.readIntLE = function(e, t, n) {
                e = 0 | e,
                t = 0 | t,
                n || k(e, t, this.length);
                for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); )
                    r += this[e + i] * o;
                return o *= 128,
                r >= o && (r -= Math.pow(2, 8 * t)),
                r
            }
            ,
            a.prototype.readIntBE = function(e, t, n) {
                e = 0 | e,
                t = 0 | t,
                n || k(e, t, this.length);
                for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256); )
                    i += this[e + --r] * o;
                return o *= 128,
                i >= o && (i -= Math.pow(2, 8 * t)),
                i
            }
            ,
            a.prototype.readInt8 = function(e, t) {
                return t || k(e, 1, this.length),
                128 & this[e] ? (255 - this[e] + 1) * -1 : this[e]
            }
            ,
            a.prototype.readInt16LE = function(e, t) {
                t || k(e, 2, this.length);
                var n = this[e] | this[e + 1] << 8;
                return 32768 & n ? 4294901760 | n : n
            }
            ,
            a.prototype.readInt16BE = function(e, t) {
                t || k(e, 2, this.length);
                var n = this[e + 1] | this[e] << 8;
                return 32768 & n ? 4294901760 | n : n
            }
            ,
            a.prototype.readInt32LE = function(e, t) {
                return t || k(e, 4, this.length),
                this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }
            ,
            a.prototype.readInt32BE = function(e, t) {
                return t || k(e, 4, this.length),
                this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }
            ,
            a.prototype.readFloatLE = function(e, t) {
                return t || k(e, 4, this.length),
                J.read(this, e, !0, 23, 4)
            }
            ,
            a.prototype.readFloatBE = function(e, t) {
                return t || k(e, 4, this.length),
                J.read(this, e, !1, 23, 4)
            }
            ,
            a.prototype.readDoubleLE = function(e, t) {
                return t || k(e, 8, this.length),
                J.read(this, e, !0, 52, 8)
            }
            ,
            a.prototype.readDoubleBE = function(e, t) {
                return t || k(e, 8, this.length),
                J.read(this, e, !1, 52, 8)
            }
            ,
            a.prototype.writeUIntLE = function(e, t, n, r) {
                if (e = +e,
                t = 0 | t,
                n = 0 | n,
                !r) {
                    var o = Math.pow(2, 8 * n) - 1;
                    P(this, e, t, n, o, 0)
                }
                var i = 1
                  , a = 0;
                for (this[t] = 255 & e; ++a < n && (i *= 256); )
                    this[t + a] = e / i & 255;
                return t + n
            }
            ,
            a.prototype.writeUIntBE = function(e, t, n, r) {
                if (e = +e,
                t = 0 | t,
                n = 0 | n,
                !r) {
                    var o = Math.pow(2, 8 * n) - 1;
                    P(this, e, t, n, o, 0)
                }
                var i = n - 1
                  , a = 1;
                for (this[t + i] = 255 & e; --i >= 0 && (a *= 256); )
                    this[t + i] = e / a & 255;
                return t + n
            }
            ,
            a.prototype.writeUInt8 = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 1, 255, 0),
                a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                this[t] = 255 & e,
                t + 1
            }
            ,
            a.prototype.writeUInt16LE = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 2, 65535, 0),
                a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
                this[t + 1] = e >>> 8) : B(this, e, t, !0),
                t + 2
            }
            ,
            a.prototype.writeUInt16BE = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 2, 65535, 0),
                a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
                this[t + 1] = 255 & e) : B(this, e, t, !1),
                t + 2
            }
            ,
            a.prototype.writeUInt32LE = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 4, 4294967295, 0),
                a.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24,
                this[t + 2] = e >>> 16,
                this[t + 1] = e >>> 8,
                this[t] = 255 & e) : U(this, e, t, !0),
                t + 4
            }
            ,
            a.prototype.writeUInt32BE = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 4, 4294967295, 0),
                a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
                this[t + 1] = e >>> 16,
                this[t + 2] = e >>> 8,
                this[t + 3] = 255 & e) : U(this, e, t, !1),
                t + 4
            }
            ,
            a.prototype.writeIntLE = function(e, t, n, r) {
                if (e = +e,
                t = 0 | t,
                !r) {
                    var o = Math.pow(2, 8 * n - 1);
                    P(this, e, t, n, o - 1, -o)
                }
                var i = 0
                  , a = 1
                  , l = 0;
                for (this[t] = 255 & e; ++i < n && (a *= 256); )
                    e < 0 && 0 === l && 0 !== this[t + i - 1] && (l = 1),
                    this[t + i] = (e / a >> 0) - l & 255;
                return t + n
            }
            ,
            a.prototype.writeIntBE = function(e, t, n, r) {
                if (e = +e,
                t = 0 | t,
                !r) {
                    var o = Math.pow(2, 8 * n - 1);
                    P(this, e, t, n, o - 1, -o)
                }
                var i = n - 1
                  , a = 1
                  , l = 0;
                for (this[t + i] = 255 & e; --i >= 0 && (a *= 256); )
                    e < 0 && 0 === l && 0 !== this[t + i + 1] && (l = 1),
                    this[t + i] = (e / a >> 0) - l & 255;
                return t + n
            }
            ,
            a.prototype.writeInt8 = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 1, 127, -128),
                a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                e < 0 && (e = 255 + e + 1),
                this[t] = 255 & e,
                t + 1
            }
            ,
            a.prototype.writeInt16LE = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 2, 32767, -32768),
                a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
                this[t + 1] = e >>> 8) : B(this, e, t, !0),
                t + 2
            }
            ,
            a.prototype.writeInt16BE = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 2, 32767, -32768),
                a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
                this[t + 1] = 255 & e) : B(this, e, t, !1),
                t + 2
            }
            ,
            a.prototype.writeInt32LE = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 4, 2147483647, -2147483648),
                a.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
                this[t + 1] = e >>> 8,
                this[t + 2] = e >>> 16,
                this[t + 3] = e >>> 24) : U(this, e, t, !0),
                t + 4
            }
            ,
            a.prototype.writeInt32BE = function(e, t, n) {
                return e = +e,
                t = 0 | t,
                n || P(this, e, t, 4, 2147483647, -2147483648),
                e < 0 && (e = 4294967295 + e + 1),
                a.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
                this[t + 1] = e >>> 16,
                this[t + 2] = e >>> 8,
                this[t + 3] = 255 & e) : U(this, e, t, !1),
                t + 4
            }
            ,
            a.prototype.writeFloatLE = function(e, t, n) {
                return F(this, e, t, !0, n)
            }
            ,
            a.prototype.writeFloatBE = function(e, t, n) {
                return F(this, e, t, !1, n)
            }
            ,
            a.prototype.writeDoubleLE = function(e, t, n) {
                return H(this, e, t, !0, n)
            }
            ,
            a.prototype.writeDoubleBE = function(e, t, n) {
                return H(this, e, t, !1, n)
            }
            ,
            a.prototype.copy = function(e, t, n, r) {
                if (n || (n = 0),
                r || 0 === r || (r = this.length),
                t >= e.length && (t = e.length),
                t || (t = 0),
                r > 0 && r < n && (r = n),
                r === n)
                    return 0;
                if (0 === e.length || 0 === this.length)
                    return 0;
                if (t < 0)
                    throw new RangeError("targetStart out of bounds");
                if (n < 0 || n >= this.length)
                    throw new RangeError("sourceStart out of bounds");
                if (r < 0)
                    throw new RangeError("sourceEnd out of bounds");
                r > this.length && (r = this.length),
                e.length - t < r - n && (r = e.length - t + n);
                var o, i = r - n;
                if (this === e && n < t && t < r)
                    for (o = i - 1; o >= 0; --o)
                        e[o + t] = this[o + n];
                else if (i < 1e3 || !a.TYPED_ARRAY_SUPPORT)
                    for (o = 0; o < i; ++o)
                        e[o + t] = this[o + n];
                else
                    Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);
                return i
            }
            ,
            a.prototype.fill = function(e, t, n, r) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (r = t,
                    t = 0,
                    n = this.length) : "string" == typeof n && (r = n,
                    n = this.length),
                    1 === e.length) {
                        var o = e.charCodeAt(0);
                        o < 256 && (e = o)
                    }
                    if (void 0 !== r && "string" != typeof r)
                        throw new TypeError("encoding must be a string");
                    if ("string" == typeof r && !a.isEncoding(r))
                        throw new TypeError("Unknown encoding: " + r)
                } else
                    "number" == typeof e && (e = 255 & e);
                if (t < 0 || this.length < t || this.length < n)
                    throw new RangeError("Out of range index");
                if (n <= t)
                    return this;
                t >>>= 0,
                n = void 0 === n ? this.length : n >>> 0,
                e || (e = 0);
                var i;
                if ("number" == typeof e)
                    for (i = t; i < n; ++i)
                        this[i] = e;
                else {
                    var l = a.isBuffer(e) ? e : q(new a(e,r).toString())
                      , s = l.length;
                    for (i = 0; i < n - t; ++i)
                        this[i + t] = l[i % s]
                }
                return this
            }
            ;
            var te = /[^+\/0-9A-Za-z-_]/g
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {
        "base64-js": 1,
        ieee754: 3,
        isarray: 4
    }],
    3: [function(e, t, n) {
        n.read = function(e, t, n, r, o) {
            var i, a, l = 8 * o - r - 1, s = (1 << l) - 1, d = s >> 1, c = -7, u = n ? o - 1 : 0, f = n ? -1 : 1, g = e[t + u];
            for (u += f,
            i = g & (1 << -c) - 1,
            g >>= -c,
            c += l; c > 0; i = 256 * i + e[t + u],
            u += f,
            c -= 8)
                ;
            for (a = i & (1 << -c) - 1,
            i >>= -c,
            c += r; c > 0; a = 256 * a + e[t + u],
            u += f,
            c -= 8)
                ;
            if (0 === i)
                i = 1 - d;
            else {
                if (i === s)
                    return a ? NaN : (g ? -1 : 1) * (1 / 0);
                a += Math.pow(2, r),
                i -= d
            }
            return (g ? -1 : 1) * a * Math.pow(2, i - r)
        }
        ,
        n.write = function(e, t, n, r, o, i) {
            var a, l, s, d = 8 * i - o - 1, c = (1 << d) - 1, u = c >> 1, f = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, g = r ? 0 : i - 1, m = r ? 1 : -1, p = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t),
            isNaN(t) || t === 1 / 0 ? (l = isNaN(t) ? 1 : 0,
            a = c) : (a = Math.floor(Math.log(t) / Math.LN2),
            t * (s = Math.pow(2, -a)) < 1 && (a--,
            s *= 2),
            t += a + u >= 1 ? f / s : f * Math.pow(2, 1 - u),
            t * s >= 2 && (a++,
            s /= 2),
            a + u >= c ? (l = 0,
            a = c) : a + u >= 1 ? (l = (t * s - 1) * Math.pow(2, o),
            a += u) : (l = t * Math.pow(2, u - 1) * Math.pow(2, o),
            a = 0)); o >= 8; e[n + g] = 255 & l,
            g += m,
            l /= 256,
            o -= 8)
                ;
            for (a = a << o | l,
            d += o; d > 0; e[n + g] = 255 & a,
            g += m,
            a /= 256,
            d -= 8)
                ;
            e[n + g - m] |= 128 * p
        }
    }
    , {}],
    4: [function(e, t, n) {
        var r = {}.toString;
        t.exports = Array.isArray || function(e) {
            return "[object Array]" == r.call(e)
        }
    }
    , {}],
    5: [function(e, t, n) {
        "use strict";
        var r = e("./config/const")
          , o = e("./libs/utils")
          , i = e("./libs/base64")
          , a = e("./libs/xssUtils")
          , l = e("./config/env")
          , s = e("./locale/Lang")
          , d = e("./common/amendUtils/Amend")
          , c = e("./common/amendUtils/AmendInfo")
          , u = e("./common/amendUtils/AmendUser")
          , f = e("./common/amendUtils/AmendUserAction")
          , g = e("./common/amendUtils/AmendUtils")
          , m = e("./common/blockUtils/BlockCore")
          , p = e("./common/blockUtils/BlockUtils")
          , h = e("./common/codeUtils/CodeCore")
          , v = e("./common/codeUtils/CodeStyle")
          , b = e("./common/codeUtils/CodeUtils")
          , C = e("./common/CommandExtend")
          , E = e("./common/DomUtils")
          , T = e("./common/editorCore/Editor")
          , S = e("./common/editorCore/EditorEvent")
          , y = e("./common/editorCore/EditorUtils")
          , A = e("./common/FormatPainter")
          , N = e("./common/frameViewUtils/FrameViewCore")
          , _ = e("./common/frameViewUtils/FrameViewStyle")
          , O = e("./common/frameViewUtils/FrameViewUtils")
          , D = e("./common/HighlightUtils")
          , L = e("./common/HistoryUtils")
          , w = e("./common/imgUtils/ImgClick")
          , I = e("./common/imgUtils/ImgCore")
          , x = e("./common/imgUtils/ImgResize")
          , R = e("./common/imgUtils/ImgUtils")
          , M = e("./common/LinkUtils")
          , k = e("./common/MarkdownRender")
          , P = e("./common/MathJaxRender")
          , B = e("./common/NightModeUtils")
          , U = e("./common/PasteUtils")
          , z = e("./common/RangeUtils")
          , F = e("./common/readerCore/Reader")
          , H = e("./common/readerCore/ReaderEvent")
          , Y = e("./common/SelectPlugin")
          , W = e("./common/TabKey")
          , G = e("./common/tableUtils/TableCore")
          , q = e("./common/tableUtils/TableMenu")
          , V = e("./common/tableUtils/TableUtils")
          , Z = e("./common/tableUtils/TableZone")
          , K = e("./common/todoUtils/TodoCore")
          , j = e("./common/todoUtils/TodoRouteForClient")
          , X = e("./common/todoUtils/TodoStyle")
          , $ = e("./common/todoUtils/TodoUtils")
          , J = e("./common/frameViewUtils/ToolbarMarkdown")
          , Q = e("./common/WizStyle")
          , ee = "1.0.1"
          , te = function(e, t) {
            function n() {
                var e = void 0
                  , t = void 0
                  , n = void 0
                  , o = void 0
                  , i = ne.options.container;
                return i ? (e = i.querySelector("." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER),
                e || (i.innerHTML = "",
                Ce.addClass(i, r.CLASS.EDITOR_CONTAINER),
                e = ne.doc.createElement("div"),
                Ce.addClass(e, r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER),
                i.appendChild(e)),
                t = i.querySelector("." + r.CLASS.WIZ_EIDTOR_BODY_CONTAINER),
                t || (t = ne.doc.createElement("div"),
                Ce.addClass(t, r.CLASS.WIZ_EIDTOR_BODY_CONTAINER),
                i.appendChild(t)),
                ne.options.noFrame ? (o = t.querySelector("." + r.CLASS.WIZ_BODY),
                o || (o = ne.doc.createElement("div"),
                o.innerHTML = "<div><br/></div>",
                t.appendChild(o)),
                ne.body = o) : (n = i.querySelector("." + r.CLASS.WIZ_EIDTOR_IFRAME),
                n || (n = ne.doc.createElement("iframe"),
                Ce.addClass(n, r.CLASS.WIZ_EIDTOR_IFRAME),
                n.setAttribute("frameborder", "0"),
                n.setAttribute("width", "100%"),
                n.setAttribute("height", "100%"),
                n.src = 'javascript:void(function(){document.open();document.write("<!DOCTYPE html><html><head></head><body><div><br/></div></body></html>");document.close();}())',
                t.appendChild(n)),
                ne.doc = n.contentDocument,
                ne.win = n.contentWindow,
                ne.body = ne.doc.body),
                ne.frame.toolbarDoc = ne.doc,
                ne.frame.toolbarContainer = e,
                void (ne.frame.bodyContainer = t)) : (ne.frame.toolbarContainer = null ,
                void (ne.frame.bodyContainer = null ))
            }
            function te(e) {
                return e ? (e.total = !!e.total,
                e.cursor = !!e.cursor) : e = {
                    dom: null ,
                    cursor: !1,
                    total: !0
                },
                e
            }
            var ne = new l(e,ee)
              , re = {
                env: ne,
                lang: new s(ne.options.lang,ne),
                require: {
                    amend: new d,
                    amendInfo: new c,
                    amendUser: new u,
                    amendUserAction: new f,
                    amendUtils: new g,
                    blockCore: new m,
                    blockUtils: new p,
                    codeCore: new h,
                    codeStyle: new v,
                    codeUtils: new b,
                    commandExtend: new C,
                    domUtils: new E,
                    editor: new T,
                    editorEvent: new S,
                    editorUtils: new y,
                    formatPainter: new A,
                    frameViewCore: new N,
                    frameViewStyle: new _,
                    frameViewUtils: new O,
                    highlightUtils: new D,
                    historyUtils: new L,
                    imgClick: new w,
                    imgCore: new I,
                    imgResize: new x,
                    imgUtils: new R,
                    linkUtils: new M,
                    markdownRender: new k,
                    mathJaxRender: new P,
                    nightModeUtils: new B,
                    pasteUtils: new U,
                    rangeUtils: new z,
                    reader: new F,
                    readerEvent: new H,
                    selectPlugin: new Y,
                    tabKey: new W,
                    tableCore: new G,
                    tableMenu: new q,
                    tableUtils: new V,
                    tableZone: new Z,
                    todoCore: new K,
                    todoRouteForClient: new j,
                    todoStyle: new X,
                    todoUtils: new $,
                    toolbarMarkdown: new J,
                    wizStyle: new Q
                }
            }
              , oe = !0
              , ie = !1
              , ae = void 0;
            try {
                for (var le, se = Object.keys(re.require)[Symbol.iterator](); !(oe = (le = se.next()).done); oe = !0) {
                    var de = le.value
                      , ce = re.require[de];
                    ce.initCore(re),
                    delete ce.initCore
                }
            } catch (e) {
                ie = !0,
                ae = e
            } finally {
                try {
                    !oe && se.return && se.return()
                } finally {
                    if (ie)
                        throw ae
                }
            }
            var ue = re.require.reader
              , fe = re.require.editor
              , ge = re.require.editorEvent
              , me = re.require.amend
              , pe = re.require.amendInfo
              , he = re.require.amendUser
              , ve = re.require.commandExtend
              , be = re.require.codeCore
              , Ce = re.require.domUtils
              , Ee = re.require.editorUtils
              , Te = re.require.formatPainter
              , Se = re.require.highlightUtils
              , ye = re.require.historyUtils
              , Ae = re.require.imgUtils
              , Ne = re.require.linkUtils
              , _e = re.require.markdownRender
              , Oe = re.require.mathJaxRender
              , De = re.require.nightModeUtils
              , Le = re.require.pasteUtils
              , we = re.require.rangeUtils
              , Ie = re.require.tableCore
              , xe = re.require.todoCore
              , Re = re.require.toolbarMarkdown
              , Me = re.require.wizStyle
              , ke = !1
              , Pe = "";
            n(),
            _e.init(),
            Oe.init();
            for (var Be = ne.body.className.split(" "), Ue = void 0, ze = Be.length - 1; ze >= 0; ze--)
                Ue = Be[ze],
                Ue && !/^wiz-/gi.test(Ue) || Be.splice(ze, 1);
            ne.body.className = Be.join(" "),
            Ce.addClass(ne.body, r.CLASS.WIZ_BODY),
            ne.options.noAmend || (he.initUser(),
            he.setUsersData()),
            ne.win.WizTemplate && ne.win.WizTemplate.init({
                document: ne.doc,
                lang: ne.options.lang,
                clientType: ne.options.clientType
            });
            var Fe = {
                version: ee,
                destroy: function() {
                    window.WizTemplate && window.WizTemplate.off(),
                    fe.off(),
                    ue.off(),
                    ne.readonly = null 
                },
                editor: {
                    on: function(e, t) {
                        if (ne.readonly !== !1) {
                            var n = Ce.getPageScroll().top
                              , i = function() {
                                ne.readonly !== !0 && (ne.win.WizTemplate && ne.win.WizTemplate.on(!1),
                                ne.options.editor.autoFocus && (ne.win.WizTemplate && ne.win.WizTemplate.getTemplate() ? ne.win.WizTemplate.focus() : Fe.editor.focus()),
                                setTimeout(function() {
                                    ne.client.type.isPhone && ne.client.type.isPad || (ne.client.type.isMac && ne.options.reader.type !== r.NOTE_READER_TYPE.COMMON ? setTimeout(function() {
                                        Ce.setPageScrollTop(n)
                                    }, 100) : Ce.setPageScrollTop(n)),
                                    "function" == typeof t && t()
                                }, 0))
                            }
                            ;
                            Fe.reader.amendInfo.off(),
                            ne.win.WizTemplate && ne.win.WizTemplate.off(),
                            "function" == typeof e && (t = e,
                            e = {}),
                            e = e || {};
                            var l = e.documentBody
                              , s = e.documentBodyType
                              , d = {
                                noteSrc: null 
                            };
                            "string" != typeof l && ke && (d.noteSrc = a.xssFilter(o.txt2HTML(Pe, {
                                wizTableSaveDom: !0
                            }))),
                            ue.off(d),
                            "string" == typeof l && ("text" === s ? ne.body.innerHTML = a.xssFilter(o.txt2HTML(l, {
                                wizTableSaveDom: !0
                            })) : (l = a.xssFilter(l),
                            ne.body.innerHTML = l)),
                            fe.on(i)
                        }
                    },
                    caretBackup: function() {
                        return we.caretBackup()
                    },
                    execCommand: function() {
                        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                            t[n] = arguments[n];
                        return ye.saveSnap(!1),
                        ve.execCommand.apply(Fe, t)
                    },
                    find: function(e, t, n, r) {
                        return Ee.find(e, t, n, r)
                    },
                    focus: function() {
                        Ce.focus()
                    },
                    getBodyText: function() {
                        return Ce.getBodyText()
                    },
                    getContentHtml: function(e) {
                        var t = []
                          , n = we.getRange()
                          , r = void 0;
                        return n && (r = Ce.getParentRoot([n.startContainer, n.endContainer]),
                        r && (t = [r])),
                        Ce.clearChild(ne.body, t),
                        me.hideAmendInfo(),
                        xe.checkTodoStyle(),
                        Ce.getContentHtml(e)
                    },
                    getMarkdownSrc: function(e) {
                        return _e.getMarkdownSrcForEditor(e)
                    },
                    insertB64Html: function(e, t) {
                        Ee.insertHtml(i.decode(e), t)
                    },
                    insertHtml: function(e, t) {
                        ne.readonly === !1 && Ee.insertHtml(e, t)
                    },
                    isModified: function() {
                        var e = ne.readonly === !1;
                        if (!e)
                            return e;
                        var t = Ce.getContentHtml()
                          , n = fe.getOriginalHtml();
                        return t = Ce.removeByTagFromHtml(t, r.TAG.CODE_MIRROR),
                        n = Ce.removeByTagFromHtml(n, r.TAG.CODE_MIRROR),
                        ne.readonly === !1 && t !== n
                    },
                    modifySelectionDom: function(e, t) {
                        Ee.modifySelectionDom(e, t)
                    },
                    paste: function(e, t) {
                        ne.readonly === !1 && Le.pasteFromClient(e, t)
                    },
                    pasteB64: function(e, t) {
                        Fe.editor.paste(i.decode(e), i.decode(t))
                    },
                    redo: function() {
                        ye.redo()
                    },
                    removeFormat: function(e, t, n) {
                        Me.removeFormat(e, t, n)
                    },
                    replace: function(e, t, n) {
                        return Ee.replace(e, t, n)
                    },
                    replaceAll: function(e, t, n) {
                        Ee.replaceAll(e, t, n)
                    },
                    caretRestore: function() {
                        return we.caretRestore()
                    },
                    saveSnap: function() {
                        ye.saveSnap(!1)
                    },
                    setUnModified: function() {
                        fe.setOriginalHtml()
                    },
                    undo: function() {
                        ye.undo()
                    },
                    ListenerType: ge.TYPE,
                    addListener: function(e, t) {
                        ge.addListener(e, t)
                    },
                    removeListener: function(e, t) {
                        ge.removeListener(e, t)
                    },
                    triggerListener: function(e, t) {
                        ge.triggerListener(e, t)
                    },
                    startTrackEvent: function(e, t) {
                        ge.startTrackEvent(e, t)
                    },
                    stopTrackEvent: function(e, t) {
                        ge.stopTrackEvent(e, t)
                    },
                    amend: {
                        on: function() {
                            me.start()
                        },
                        off: function() {
                            me.startReverse()
                        },
                        changeCurUser: function(e) {
                            me.changeCurUser(e)
                        },
                        isEdited: function() {
                            return me.isAmendEdited()
                        },
                        isEditing: function() {
                            return me.isAmendEditing()
                        },
                        hasAmendSpanByCursor: function() {
                            return me.hasAmendSpanByCursor()
                        },
                        accept: function(e) {
                            me.accept(te(e))
                        },
                        refuse: function(e) {
                            me.refuse(te(e))
                        }
                    },
                    code: {
                        insertCode: be.insertCode
                    },
                    formatPainter: {
                        on: function(e) {
                            return Te.on(e)
                        },
                        off: function() {
                            Te.off()
                        }
                    },
                    img: {
                        getAll: function(e) {
                            return Ae.getAll(e).join(",")
                        },
                        insertAsAttachment: function(e, t) {
                            Ee.insertDom(Ae.makeAttachmentDom(e, t), !0)
                        },
                        insertByPath: function(e) {
                            Ee.insertDom(Ae.makeDomByPath(e), !0)
                        },
                        removeCur: function() {
                            var e = "img[" + r.ATTR.IMG_EDITING + "]";
                            Ae.remove(e)
                        },
                        replaceCur: function(e) {
                            var t = "img[" + r.ATTR.IMG_EDITING + "]";
                            Ae.replaceSrc(t, e)
                        }
                    },
                    link: {
                        on: function() {
                            Ne.on()
                        },
                        off: function() {
                            Ne.off()
                        },
                        getCurrentLink: function() {
                            return Ne.getCurrentLink()
                        },
                        removeSelectedLink: function() {
                            Ne.removeSelectedLink()
                        },
                        setCurrentLink: function(e) {
                            Ne.setCurrentLink(e);
                        }
                    },
                    range: {
                        moveToPoint: function(e, t) {
                            we.moveToPoint(e, t)
                        }
                    },
                    table: {
                        canCreateTable: Ie.canCreateTable,
                        clearCellValue: Ie.clearCellValue,
                        deleteCols: Ie.deleteCols,
                        deleteRows: Ie.deleteRows,
                        deleteTable: Ie.deleteTable,
                        distributeCols: Ie.distributeCols,
                        insertCol: Ie.insertCol,
                        insertRow: Ie.insertRow,
                        insertTable: Ie.insertTable,
                        merge: Ie.merge,
                        setCellAlign: Ie.setCellAlign,
                        setCellBg: Ie.setCellBg,
                        split: Ie.split
                    },
                    todo: {
                        setTodo: xe.setTodo,
                        setTodoInfo: xe.setTodoInfo
                    },
                    nightMode: {
                        on: function(e, t, n) {
                            De.on(e, t, n)
                        },
                        off: function() {
                            De.off()
                        }
                    },
                    utils: {
                        clearStyleFromHtml: function(e, t) {
                            return Ce.clearStyleFromHtml(e, t)
                        }
                    },
                    toolbar: {
                        setImgUploaderId: function(e) {
                            Re.setImgUploaderId(e)
                        },
                        onImgUploadBegin: function(e, t) {
                            Re.onImgUploadBegin(e, t)
                        },
                        onImgUploadProgress: function(e, t) {
                            Re.onImgUploadProgress(e, t)
                        },
                        onImgUploadComplete: function(e, t) {
                            Re.onImgUploadComplete(e, t)
                        },
                        onImgUploadError: function(e) {
                            Re.onImgUploadError(e)
                        }
                    }
                },
                reader: {
                    on: function(e, t) {
                        function n() {
                            ne.readonly !== !1 && ue.afterRender(function() {
                                ne.body.style.opacity = 1,
                                ne.client.type.isPhone && ne.client.type.isPad || Ce.setPageScrollTop(o),
                                "function" == typeof t && t()
                            })
                        }
                        if (ne.readonly !== !0) {
                            e = e || {},
                            e.noteType && (e.reader = {
                                type: e.noteType
                            },
                            delete e.noteType);
                            var o = Ce.getPageScroll().top;
                            window.WizTemplate && window.WizTemplate.off(),
                            fe.off(),
                            "function" == typeof e && (t = e,
                            e = {}),
                            e.reader && e.reader.type && (ne.options.reader.type = e.reader.type),
                            ne.options.pc.pluginModified = !1;
                            var i = e.documentBody
                              , l = e.documentBodyType;
                            ke = !1,
                            Pe = "",
                            "string" == typeof i && (ne.options.reader.type === r.NOTE_READER_TYPE.MARKDOWN && (ne.body.style.opacity = 0),
                            "text" === l ? (ke = !0,
                            Pe = i) : (i = a.xssFilter(i),
                            ne.body.innerHTML = i)),
                            ue.on(),
                            Fe.reader.amendInfo.on(),
                            ne.win.WizTemplate && ne.win.WizTemplate.on(!0),
                            ne.options.reader.type === r.NOTE_READER_TYPE.MARKDOWN ? "text" === l ? _e.do({
                                container: ne.body,
                                markdownSrc: i
                            }, n) : _e.do({
                                container: ne.body
                            }, n) : ne.options.reader.type === r.NOTE_READER_TYPE.MATHJAX ? Oe.do({
                                container: ne.body
                            }, n) : setTimeout(function() {
                                n()
                            }, 0)
                        }
                    },
                    closeDocument: function() {
                        return xe.closeDocument()
                    },
                    getRenderDocument: function() {
                        return me.hideAmendInfo(),
                        Ce.getRenderDocument()
                    },
                    getWordCount: function() {
                        var e = ne.body.innerText ? ne.body.innerText : ""
                          , t = o.getWordCount(e);
                        return JSON.stringify(t)
                    },
                    setPluginModify: function(e) {
                        return ne.options.pc.pluginModified ? ne.options.pc.pluginModified : (ne.options.reader.type === r.NOTE_READER_TYPE.COMMON && (ne.options.pc.pluginModified = !!e),
                        l.options.pc.pluginModified)
                    },
                    amendInfo: {
                        on: function() {
                            ne.options.noAmend || pe.init({
                                readonly: !0
                            }, {
                                onAccept: null ,
                                onRefuse: null 
                            })
                        },
                        off: function() {
                            pe.remove()
                        }
                    },
                    highlight: {
                        next: function() {
                            Se.next()
                        },
                        off: function() {
                            Se.off()
                        },
                        on: function(e, t) {
                            return Se.on(e, t)
                        },
                        previous: function() {
                            Se.previous()
                        }
                    },
                    nightMode: {
                        on: function(e, t, n) {
                            De.on(e, t, n)
                        },
                        off: function() {
                            De.off()
                        }
                    },
                    todo: {
                        setTodoInfo: xe.setTodoInfo,
                        onCheckDocLock: xe.onCheckDocLock
                    }
                },
                insertCustomStyle: function(e, t, n) {
                    Me.insertCustomStyle(e, t, n)
                },
                insertDefaultStyle: function(e, t) {
                    Me.insertDefaultStyle(e, t)
                },
                removeStyleById: function(e) {
                    Me.removeStyleById(e)
                }
            };
            return t && t(re),
            Fe
        }
        ;
        window.WizDocument = te,
        te.version = ee,
        t.exports = te
    }
    , {
        "./common/CommandExtend": 6,
        "./common/DomUtils": 7,
        "./common/FormatPainter": 8,
        "./common/HighlightUtils": 9,
        "./common/HistoryUtils": 10,
        "./common/LinkUtils": 11,
        "./common/MarkdownRender": 12,
        "./common/MathJaxRender": 13,
        "./common/NightModeUtils": 14,
        "./common/PasteUtils": 15,
        "./common/RangeUtils": 16,
        "./common/SelectPlugin": 17,
        "./common/TabKey": 18,
        "./common/WizStyle": 19,
        "./common/amendUtils/Amend": 20,
        "./common/amendUtils/AmendInfo": 21,
        "./common/amendUtils/AmendUser": 22,
        "./common/amendUtils/AmendUserAction": 23,
        "./common/amendUtils/AmendUtils": 24,
        "./common/blockUtils/BlockCore": 25,
        "./common/blockUtils/BlockUtils": 26,
        "./common/codeUtils/CodeCore": 27,
        "./common/codeUtils/CodeStyle": 28,
        "./common/codeUtils/CodeUtils": 29,
        "./common/editorCore/Editor": 30,
        "./common/editorCore/EditorEvent": 31,
        "./common/editorCore/EditorUtils": 32,
        "./common/frameViewUtils/FrameViewCore": 33,
        "./common/frameViewUtils/FrameViewStyle": 34,
        "./common/frameViewUtils/FrameViewUtils": 35,
        "./common/frameViewUtils/ToolbarMarkdown": 36,
        "./common/imgUtils/ImgClick": 37,
        "./common/imgUtils/ImgCore": 38,
        "./common/imgUtils/ImgResize": 39,
        "./common/imgUtils/ImgUtils": 40,
        "./common/readerCore/Reader": 41,
        "./common/readerCore/ReaderEvent": 42,
        "./common/tableUtils/TableCore": 43,
        "./common/tableUtils/TableMenu": 44,
        "./common/tableUtils/TableUtils": 45,
        "./common/tableUtils/TableZone": 46,
        "./common/todoUtils/TodoCore": 47,
        "./common/todoUtils/TodoRouteForClient": 48,
        "./common/todoUtils/TodoStyle": 49,
        "./common/todoUtils/TodoUtils": 50,
        "./config/const": 51,
        "./config/env": 52,
        "./libs/base64": 56,
        "./libs/utils": 59,
        "./libs/xssUtils": 61,
        "./locale/Lang": 62
    }],
    6: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = e("../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.domUtils,
                a = t.require.historyUtils,
                l = t.require.rangeUtils,
                s = t.require.todoUtils
            }
            ;
            var d = function() {
                var e = []
                  , t = l.getRange();
                if (!t)
                    return e;
                var r = l.getRangeDetail(t.startContainer, t.startOffset).container
                  , o = l.getRangeDetail(t.endContainer, t.endOffset).container
                  , a = i.getBlockParent(r, !0);
                a && a !== n.body && (r = a);
                var s = r === o ? r : i.getParentRoot([r, o]);
                s !== n.body && (s = i.getBlockParent(s, !0)),
                i.isTag(s, ["h1", "h2", "h3", "h4", "h5", "h6"]) && e.push(s);
                for (var d = i.getIndexList(r).join("."), c = i.getIndexList(o).join("."), u = 1; u < 7; u++)
                    e = e.concat(i.getListFromTagAndIndex("h" + u, s, d, c));
                return e
            }
              , c = function() {
                var e = []
                  , t = l.getRange();
                if (!t)
                    return e;
                for (var a = l.getRangeDetail(t.startContainer, t.startOffset).container, d = l.getRangeDetail(t.endContainer, t.endOffset).container, c = i.getBlockParent(a, !0), f = (i.getBlockParent(d, !0),
                i.getIndexList(d).join(".")), g = c, m = void 0, p = void 0, h = void 0, v = void 0, b = void 0, C = void 0, E = void 0, T = void 0, S = void 0, y = void 0, A = void 0, N = void 0; g && (A = !1,
                v = !1,
                b = !1,
                C = !1,
                E = !1,
                T = !1,
                h = i.isBlock(g),
                N = i.getIndexList(g).join("."),
                !(o.compareVersion(N, f) > 0) || !h && S); ) {
                    if (!h) {
                        if (v = 3 === g.nodeType && o.isEmpty(g.nodeValue),
                        S || v || (S = g),
                        m = g.nextSibling) {
                            g = m;
                            continue
                        }
                        A = !0
                    }
                    if (S && (A || h)) {
                        for (y = g,
                        g = n.doc.createElement("div"),
                        A ? i.after(g, y) : i.before(g, y); S && S !== g; )
                            g.appendChild(S),
                            S = S.nextSibling;
                        e.push(g)
                    } else if (h && (C = !!i.getParentByClass(g, r.CLASS.CODE_CONTAINER, !0),
                    C || (T = i.isWizDom(g),
                    T || (E = !!i.getParentByClass(g, r.CLASS.TABLE_CONTAINER, !0))),
                    !T && !C && !E))
                        if (b = !!s.isLayer(g))
                            e.push(g);
                        else {
                            if (p = u(g),
                            p.hasBlock || !p.hasLine) {
                                g = g.firstChild;
                                continue
                            }
                            if (i.isTag(g, "li")) {
                                for (m = n.doc.createElement("div"),
                                i.after(m, g); g.firstChild; )
                                    m.appendChild(g.firstChild);
                                g.appendChild(m),
                                g = m
                            }
                            e.push(g)
                        }
                    for (S = null ,
                    y = null ,
                    m = g.nextSibling; !m && g !== n.body && g.parentNode; )
                        g = g.parentNode,
                        m = g.nextSibling;
                    g = m
                }
                return e
            }
              , u = function(e) {
                for (var t = e.childNodes || [], n = !1, r = !1, o = 0, a = t.length; o < a; o++) {
                    var l = t[o];
                    if (i.isBlock(l) ? n = !0 : (1 === l.nodeType || 3 === l.nodeType && !i.isEmptyDom(l)) && (r = !0),
                    n && r)
                        break
                }
                return {
                    hasBlock: n,
                    hasLine: r
                }
            }
              , f = function(e) {
                var t = l.getRange();
                if (t) {
                    for (var r = l.getRangeDetail(t.startContainer, t.startOffset), o = l.getRangeDetail(t.endContainer, t.endOffset), a = i.getPreviousNode(r.container, !1) || n.body, s = i.getNextNode(o.container, !1) || n.body, u = d(), f = 0; f < u.length; f++) {
                        var g = u[f];
                        i.isTag(g, [e]) || i.replaceTagName(g, e)
                    }
                    for (var m = c(), p = 0; p < m.length; p++) {
                        var h = m[p];
                        i.replaceTagName(h, e)
                    }
                    r.container.parentNode || (r = {
                        container: a,
                        offset: i.getEndOffset(a)
                    }),
                    o.container.parentNode || (o = {
                        container: s,
                        offset: 0
                    }),
                    l.setRange(r.container, r.offset, o.container, o.offset)
                }
            }
              , g = function(t) {
                return m(t) ? (e.clearSubSup(),
                !1) : n.doc.execCommand(t, !1)
            }
              , m = function(e) {
                var t = "subscript" === e ? "sub" : "sup"
                  , n = l.getRange()
                  , r = void 0;
                return n && (r = l.getRangeDetail(n.startContainer, n.startOffset),
                r = r.container,
                r = i.getFirstDeepChild(r),
                r = i.getParentByTagName(r, t, !0)),
                !!r
            }
              , p = {
                bind: function() {
                    p.unbind(),
                    n.event.add(r.EVENT.EXEC_COMMEND, p.handler.onExecCommand)
                },
                unbind: function() {
                    n.event.remove(r.EVENT.EXEC_COMMEND, p.handler.onExecCommand)
                },
                handler: {
                    onExecCommand: function() {
                        for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
                            n[r] = arguments[r];
                        e.execCommand.apply(e, n)
                    }
                }
            };
            this.on = function() {
                p.bind()
            }
            ,
            this.off = function() {
                p.unbind()
            }
            ,
            this.clearSubSup = function() {
                var e = l.getRangeDomList({
                    noSplit: !1
                })
                  , t = void 0
                  , n = void 0
                  , o = void 0
                  , a = void 0
                  , s = void 0;
                if (!e || 0 === e.list.length)
                    return n = l.getRange(),
                    void (n && n.collapsed && (o = i.createSpan(),
                    o.innerHTML = r.FILL_CHAR + r.FILL_CHAR,
                    n.insertNode(o),
                    t = i.getParentByTagName(o, ["sub", "sup"], !0),
                    t ? (t = i.splitDomSingle(t, o),
                    i.peelDom(t),
                    l.setRange(o, 1)) : i.remove(o)));
                var d = i.getParentByTagName(e.list[0], ["sub", "sup"], !0);
                if (1 === e.list.length)
                    return t = i.splitDomSingle(d, e.list[0]),
                    void (t ? (a = t.firstChild,
                    s = t.lastChild,
                    i.peelDom(t),
                    l.setRange(a, 0, s, i.getEndOffset(s))) : l.setRange(e.startDom, e.startOffset, e.endDom, e.endOffset));
                d && i.splitDomBeforeSub(d, e.list[0]);
                var c = i.getParentByTagName(e.list[e.list.length - 1], ["sub", "sup"], !0);
                c && i.splitDomAfterSub(c, e.list[e.list.length - 1]);
                for (var u = !1, f = 0; f < e.list.length; f++) {
                    var g = e.list[f];
                    t = i.getParentByTagName(g, ["sub", "sup"], !0),
                    0 === f ? a = g : f === e.list.length - 1 && (s = g),
                    t && (0 === f ? a = t.firstChild : f === e.list.length - 1 && (s = t.lastChild),
                    i.peelDom(t),
                    u = !0)
                }
                u ? l.setRange(a, 0, s, i.getEndOffset(s)) : l.fixRange(e)
            }
            ,
            this.execCommand = function() {
                for (var e = arguments.length, t = Array(e), o = 0; o < e; o++)
                    t[o] = arguments[o];
                var a = l.getRange()
                  , d = void 0
                  , c = void 0
                  , u = void 0;
                a && a.collapsed && (d = s.getMainByCaret(),
                c = s.getCheckbox(d),
                u = c ? c.id : "");
                var m = void 0;
                m = /formatblock/i.test(t[0]) ? f(t[2]) : /subscript|superscript/i.test(t[0]) ? g(t[0]) : n.doc.execCommand.apply(n.doc, t);
                var p = t[0];
                if (/^(indent)|(outdent)|(insertOrderedList)|(insertUnorderedList)$/i.test(p) && i.fixOrderList(),
                u && (/^indent$/i.test(p) && n.client.type.isIOS || /^outdent$/i.test(p)) && (/^outdent$/i.test(p) && s.fixNewTodo(),
                c = n.body.querySelector("#" + u),
                d = s.getMainFromChild(c),
                d && s.isEmptyMain(d))) {
                    for (var h = s.getCheckbox(d); d.lastChild !== h; )
                        d.removeChild(d.lastChild);
                    var v = i.createSpan();
                    i.after(v, h),
                    v.innerHTML = r.FILL_CHAR + r.FILL_CHAR,
                    l.setRange(v, 1)
                }
                return i.fixFontSize(),
                n.event.call(r.EVENT.ON_EXEC_COMMAND),
                m
            }
            ,
            this.queryCommandState = function(e) {
                var t = void 0;
                return t = /subscript|superscript/i.test(e) ? m(e) : n.doc.queryCommandState(e)
            }
        }
        ;
        t.exports = i
    }
    , {
        "../config/const": 51,
        "../libs/utils": 59
    }],
    7: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = e("../libs/utils")
          , i = 12
          , a = function() {
            var e = this
              , t = null 
              , n = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env
            }
            ,
            this.addClass = function(t, n) {
                if (t) {
                    t.nodeType && (t = [t]);
                    var r = void 0
                      , o = void 0;
                    for (r = t.length - 1; r >= 0; r--)
                        o = t[r],
                        1 !== o.nodeType || e.hasClass(o, n) || (o.className = (o.className + " " + n).trim())
                }
            }
            ,
            this.after = function(t, n) {
                e.before(t, n, !0)
            }
            ,
            this.appendStyle = function(e, t) {
                if (e) {
                    var n = e.split(";")
                      , r = void 0
                      , o = void 0
                      , i = void 0;
                    for (r = 0,
                    o = n.length; r < o; r++)
                        n[r].indexOf(":") > 0 && (i = n[r].split(":"),
                        t[i[0].trim()] = i[1].trim())
                }
            }
            ,
            this.attr = function(e, t) {
                var n = void 0
                  , r = void 0;
                if (e && t && 1 === e.nodeType)
                    for (n in t)
                        t.hasOwnProperty(n) && "string" == typeof n && (r = t[n],
                        r ? e.setAttribute(n, r) : e.removeAttribute(n))
            }
            ,
            this.before = function(e, t, r) {
                if (r = !!r,
                t && e) {
                    var i = t === n.body
                      , a = i ? t : t.parentNode
                      , l = i ? r ? null  : n.body.childNodes[0] : r ? t.nextSibling : t
                      , s = void 0;
                    if (o.isArray(e)) {
                        s = l;
                        for (var d = e.length - 1; d >= 0; d--) {
                            var c = e[d];
                            a.insertBefore(c, s),
                            s = c
                        }
                    } else
                        a.insertBefore(e, l)
                }
            }
            ,
            this.getBodyText = function() {
                var e = n.body;
                return e ? e.innerText ? e.innerText : "" : " "
            }
            ,
            this.canEdit = function(t) {
                var n = ["script", "style"];
                return t && (1 === t.nodeType || 3 === t.nodeType) && (e.isTag(t, "br") || !e.isEmptyDom(t)) && !e.getParentByTagName(t, r.TAG.TMP_TAG, !0, null ) && !(1 === t.nodeType && e.isTag(t, n) || 3 === t.nodeType && t.parentNode && e.isTag(t.parentNode, n))
            }
            ,
            this.childNodesFilter = function(t) {
                if (t && 1 === t.nodeType)
                    for (var n = t.childNodes.length - 1; n >= 0; n--) {
                        var r = t.childNodes[n];
                        1 === r.nodeType ? (/link|style|script|meta/gi.test(r.nodeName) && t.removeChild(r),
                        e.childNodesFilter(r)) : 3 !== r.nodeType && t.removeChild(r)
                    }
            }
            ,
            this.clearChild = function(t, n) {
                if (t) {
                    var o = n.indexOf(t) >= 0
                      , i = void 0;
                    if (!(o || 3 !== t.nodeType || e.isUsableTextNode(t) || e.getParentByTagName(t, "pre", !1)))
                        return void e.remove(t);
                    if (!o && 3 === t.nodeType)
                        return i = t.nodeValue.replace(r.FILL_CHAR_REG, ""),
                        void (i !== t.nodeValue && (t.nodeValue = i));
                    if (!o && 1 === t.nodeType) {
                        var a = t.childNodes
                          , l = void 0
                          , s = void 0;
                        for (l = a.length - 1; l >= 0; l--)
                            s = a[l],
                            e.clearChild(s, n);
                        e.mergeChildSpan(t, n),
                        n.indexOf(t) < 0 && 0 === t.childNodes.length && 1 === t.nodeType && !e.isSelfClosingTag(t) && t.getAttribute(r.ATTR.SPAN) && e.remove(t)
                    }
                }
            }
            ,
            this.clearStyle = function(t, n, r) {
                var o = function(t, r) {
                    t.style[n] = "",
                    e.isTag(t, "font") && "color" === r && t.removeAttribute("color")
                }
                ;
                if (o(t, n),
                !r)
                    for (; t && !e.isBlock(t); )
                        o(t, n),
                        t = t.parentNode
            }
            ,
            this.clearStyleFromHtml = function(t, n) {
                var o = /(<[^<>]* style=(['"]))((\r?\n|(?!(\2|[<>])).)*)/gi;
                n = n ? n : [];
                for (var i = void 0, a = void 0, l = 0; l < n.length; l++)
                    i = n[l],
                    a = i.indexOf("*"),
                    n[l] = a >= 0 ? i.substr(0, a).escapeRegex() : i.escapeRegex() + "$";
                var s = n.length > 0 ? new RegExp("^(" + n.join("|") + ")","i") : null ;
                return t = t.replace(o, function(t, n, o, i) {
                    var a = [n];
                    i = i.replace(/&quot;/gi, '"');
                    for (var l = i.split(";"), d = void 0, c = void 0, u = void 0, f = void 0, g = 0, m = l.length; g < m; g++)
                        if (d = l[g],
                        c = d.indexOf(":"),
                        u = "",
                        f = "",
                        c > -1 && (u = d.substr(0, c).trim(),
                        f = d.substr(c + 1).trim(),
                        u && f && s && s.test(u))) {
                            if (/^font-size$/i.test(u))
                                f = e.getFontSizeRem(f, {
                                    useRootSize: !0
                                });
                            else if (/^font-family$/i.test(u) && f.replace(/"| /g, "").toLowerCase() === r.CSS.DEFAULT_FONT.replace(/"| /g, "").toLowerCase())
                                continue;/^(inherit|initial|transparent)$/i.test(f) || a.push(u, ":", f.replace(/"/gi, "&quot;"), ";")
                        }
                    return a.join("")
                })
            }
            ,
            this.clone = function(t, r) {
                var o = void 0
                  , i = void 0
                  , a = void 0
                  , l = void 0
                  , s = void 0
                  , d = void 0
                  , c = void 0;
                if (!t)
                    return null ;
                if (r)
                    if (3 === t.nodeType)
                        o = n.doc.createTextNode("");
                    else {
                        for (o = n.doc.createElement(t.tagName),
                        a = t.attributes,
                        l = {},
                        s = 0,
                        d = a.length; s < d; s++)
                            c = a[s],
                            /^id$/i.test(c.nodeName) || (l[c.nodeName] = c.nodeValue);
                        e.attr(o, l)
                    }
                else
                    3 === t.nodeType ? o = n.doc.createTextNode(t.nodeValue) : (i = n.doc.createElement("div"),
                    i.innerHTML = t.outerHTML,
                    o = i.childNodes[0]);
                return o
            }
            ,
            this.compareIndexList = function(e, t) {
                for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
                    var o = e[r]
                      , i = t[r];
                    if (o < i)
                        return -1;
                    if (o > i)
                        return 1
                }
                return e.length < t.length ? -1 : e.length > t.length ? 1 : 0
            }
            ,
            this.contains = function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e
                  , r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }
            ,
            this.convertImageToBase64 = function(e, t, r, o) {
                var i = n.doc.createElement("img");
                i.onload = function() {
                    var e = n.doc.createElement("canvas");
                    e.width = t,
                    e.height = r;
                    var a = e.getContext("2d")
                      , l = t / i.width
                      , s = r / i.height
                      , d = Math.max(l, s);
                    a.scale(d, d),
                    a.drawImage(i, 0, 0),
                    o(e.toDataURL()),
                    i = null ,
                    e = null 
                }
                ,
                i.src = e
            }
            ,
            this.createSpan = function() {
                var e = n.doc.createElement("span");
                return e.setAttribute(r.ATTR.SPAN, r.ATTR.SPAN),
                e
            }
            ,
            this.css = function(t, n) {
                if (t && n && !e.isTag(t, "br")) {
                    var r = {}
                      , o = void 0
                      , i = void 0;
                    for (o in n)
                        n.hasOwnProperty(o) && "string" == typeof o && (i = n[o],
                        i || 0 === i ? r[o] = i : e.clearStyle(t, o, !1));
                    for (o in r)
                        r.hasOwnProperty(o) && "string" == typeof o && (i = r[o],
                        i || 0 === i ? i.toString().indexOf("!important") > 0 ? (e.clearStyle(t, o, !0),
                        t.style.cssText += o + ":" + i) : "font-size" === o.toLowerCase() ? (e.clearStyle(t, o, !0),
                        i = e.getFontSizeRem(i),
                        i && (t.style.cssText += o + ":" + i)) : t.style[o] = i : e.clearStyle(t, o, !1))
                }
            }
            ,
            this.fixFontSize = function() {
                for (var t = n.body.querySelectorAll("[style]"), r = /font-size\s*:\s*([%.\w]*)/i, o = void 0, i = 0; i < t.length; i++) {
                    var a = t[i]
                      , l = a.getAttribute("style");
                    o = r.exec(l),
                    !o || o[1].indexOf("rem") > 0 || e.isTag(a, "html") || (a.style.fontSize = e.getFontSizeRem(o[1], {
                        useRootSize: !0
                    }))
                }
            }
            ,
            this.fixOrderList = function() {
                for (var t = n.body.querySelectorAll("ol"), o = 0; o < t.length; o++) {
                    for (var i = t[o], a = i, l = 0; a; )
                        l++,
                        a = e.getParentByTagName(a, ["ul", "ol"], !1);
                    e.removeClass(i, r.CLASS.ORDER_LIST_LEVEL),
                    e.addClass(i, r.CLASS.ORDER_LIST_LEVEL[l % 3])
                }
            }
            ,
            this.focus = function() {
                n.win.WizTemplate ? n.win.WizTemplate.focus() : n.body.focus()
            }
            ,
            this.fragmentFilterForCopy = function(t) {
                var n = function(t) {
                    for (var n = t.length - 1; n >= 0; n--) {
                        var r = t[n];
                        e.remove(r)
                    }
                }
                ;
                n(t.querySelectorAll("." + r.CLASS.CODE_CONTAINER + " textarea")),
                n(t.querySelectorAll("." + r.CLASS.CODE_MIRROR_MEASURE)),
                n(t.querySelectorAll("." + r.CLASS.CODE_MIRROR_GUTTER)),
                n(t.querySelectorAll("." + r.CLASS.CODE_TOOLS))
            }
            ,
            this.getBlockParent = function(t, n) {
                return t ? e.getParentByFilter(t, function(t) {
                    return e.isBlock(t)
                }, n) : null 
            }
            ,
            this.getComputedStyle = function(e, t, r) {
                if (!e || 3 === e.nodeType || !t)
                    return "";
                for (var i = void 0; !i; ) {
                    if (!e)
                        return "";
                    if (1 === e.nodeType) {
                        var a = n.win.getComputedStyle(e, null );
                        if (i = a[t] || "",
                        /^rgba?\(.*\)$/i.test(i) && (i = o.rgb2Hex(i)),
                        e === n.body || !r || i)
                            break;
                        e = e.parentNode
                    } else
                        e = e.parentNode
                }
                return i
            }
            ,
            this.getContentHtml = function(t) {
                e.fixFontSize();
                var i = t && t.isSaveTemp;
                n.event.call(r.EVENT.BEFORE_GET_DOCHTML, null );
                for (var a = void 0, l = n.body.getElementsByTagName("input"), s = 0, d = l.length; s < d; s++)
                    a = l[s],
                    /^test$/i.test(a.getAttribute("type")) && a.value !== a.getAttribute("value") && a.setAttribute("value", a.value);
                l = n.body.getElementsByTagName("textarea");
                for (var c = 0, u = l.length; c < u; c++)
                    a = l[c],
                    e.setTextarea(a);
                l = n.body.querySelectorAll("." + r.CLASS.TABLE_CONTAINER);
                for (var f = 0, g = l.length; f < g; f++)
                    e.moveOutFromTableContainer(l[f]);
                var m = [r.NAME.TMP_STYLE];
                i || m.push(r.NAME.UNSAVE_STYLE);
                var p = void 0
                  , h = "";
                if (n.options.container && n.options.noFrame) {
                    if (n.options.editor.type !== r.NOTE_EDITOR_TYPE.MARKDOWN)
                        throw p = "",
                        new Error("普通笔记不适合采用 noFrame 方式");
                    p = n.body.innerHTML
                } else {
                    h = e.getDocType(n.doc);
                    var v = void 0;
                    n.isSetBodyFontSize && (v = n.body.style.fontSize,
                    n.body.style.fontSize = null ),
                    p = n.doc.documentElement.outerHTML,
                    n.isSetBodyFontSize && (n.body.style.fontSize = v)
                }
                p = e.removeStyleByNameFromHtml(p, m),
                p = e.removeByTagFromHtml(p, r.TAG.TMP_TAG),
                p = e.peelTagFromHtml(p, r.TAG.TMP_PLUGIN_TAG),
                p = p.replace(/<!--(.|\n)*?(-->)/g, ""),
                p = p.replace(/<script[^<>]*\/>/gi, "").replace(/<script[^<>]*>(((?!<\/script>).)|(\r?\n))*<\/script>/gi, "");
                var b = /(<[\w]*[^<>]*[ ]+)contenteditable([ ]*=[ ]*['"][^'"<>]*['"])?/gi;
                if (p = p.replace(b, "$1"),
                p = p.replace(/(<div class="CodeMirror-measure">)<pre><span>xxxxxxxxxx<\/span><\/pre>/gi, "$1"),
                p = e.hideTableFromHtml(p),
                p = e.hideCodeFromHtml(p),
                n.win.WizTemplate && (p = n.win.WizTemplate.hideTemplateFormHtml(p)),
                p = o.replaceSpecialChar(p),
                !i) {
                    var C = new RegExp("(<img[^<>]*)( " + r.ATTR.IMG_EDITING + "=('|\")1\\3)","ig");
                    p = p.replace(C, "$1"),
                    p = e.restoreImgPath(p)
                }
                return h + p
            }
            ,
            this.getRenderDocument = function() {
                n.event.call(r.EVENT.BEFORE_GET_DOCHTML, null );
                var t = void 0
                  , o = "";
                return n.options.container && n.options.noFrame ? t = n.body.innerHTML : (o = e.getDocType(n.doc),
                t = n.doc.documentElement.outerHTML),
                t = e.removeByTagFromHtml(t, r.TAG.TMP_TAG),
                t = e.peelTagFromHtml(t, r.TAG.TMP_PLUGIN_TAG),
                t = t.replace(/<!--(.|\n)*?(-->)/g, ""),
                t = t.replace(/<script[^<>]*\/>/gi, "").replace(/<script[^<>]*>(((?!<\/script>).)|(\r?\n))*<\/script>/gi, ""),
                t = t.replace(/(<div class="CodeMirror-measure">)<pre><span>xxxxxxxxxx<\/span><\/pre>/gi, "$1"),
                t = e.hideTableFromHtml(t),
                t = e.hideCodeFromHtml(t),
                n.win.WizTemplate && (t = n.win.WizTemplate.hideTemplateFormHtml(t)),
                t = e.restoreImgPath(t),
                o + t
            }
            ,
            this.restoreImgPath = function(e) {
                var t = new RegExp("(<[^<>]*src[ ]*=[ ]*(\"|'))" + n.options.indexFilesFullPath.escapeRegex(),"ig")
                  , r = new RegExp("(!\\[[^[\\]]*\\]\\()" + n.options.indexFilesFullPath.escapeRegex(),"ig");
                return e.replace(t, "$1" + n.options.indexFilesPath + "/").replace(r, "$1" + n.options.indexFilesPath + "/")
            }
            ,
            this.getDocType = function(e) {
                var t = e.doctype;
                return (!t || t.systemId || t.publicId) && t ? (t = "<!",
                t += 'DOCTYPE HTML PUBLIC "' + t.publicId + '" "' + t.systemId + '" >') : t = "<!DOCTYPE HTML>",
                t
            }
            ,
            this.getEndOffset = function(e) {
                return e ? 3 === e.nodeType ? e.nodeValue.length : e.childNodes.length : 0
            }
            ,
            this.getFirstDeepChild = function(e) {
                if (!e)
                    return null ;
                for (var t = e; t && t.childNodes && t.childNodes.length > 0; ) {
                    for (t = t.childNodes[0]; t && 1 === t.nodeType && /^wiz_/gi.test(t.tagName); )
                        t = t.nextSibling;
                    t && (e = t)
                }
                return e
            }
            ,
            this.getFontSizeRem = function(t, r) {
                t = t.trim();
                var o = parseFloat(t);
                if (t.indexOf("%") > -1)
                    return Math.round(o / 100 * 1e3) / 1e3 + "rem";
                if (/^smaller$/i.test(t))
                    return "0.83rem";
                if (/^small$/i.test(t))
                    return "0.8125rem";
                if (/^x-small$/i.test(t))
                    return "0.75rem";
                if (/^xx-small$/i.test(t))
                    return "0.75rem";
                if (/^larger$/i.test(t))
                    return "1.2rem";
                if (/^large$/i.test(t))
                    return "1.125rem";
                if (/^x-large$/i.test(t))
                    return "1.5rem";
                if (/^xx-large$/i.test(t))
                    return "2rem";
                if (/^medium$/i.test(t))
                    return "1rem";
                if (!/pt|px/i.test(t))
                    return isNaN(o) ? null  : o + "rem";
                var a = {
                    useRootSize: !(!r || !r.useRootSize)
                }
                  , l = n.win.getComputedStyle(n.doc.body.parentNode)
                  , s = parseFloat(l.fontSize)
                  , d = a.useRootSize ? i * e.getRootSizeRate() : i;
                return isNaN(s) || isNaN(o) || 0 === s ? null  : (o /= /pt/i.test(t) ? d : s,
                Math.round(1e3 * o) / 1e3 + "rem")
            }
            ,
            this.getFromIndexList = function(e) {
                if (!e || 0 === e.length)
                    return null ;
                var t = n.body
                  , r = void 0;
                try {
                    var o = void 0
                      , i = void 0;
                    for (o = 0,
                    i = e.length - 1; o < i; o++)
                        t = t.childNodes[e[o]];
                    return r = e[o],
                    {
                        dom: t,
                        offset: r
                    }
                } catch (e) {
                    return null 
                }
            }
            ,
            this.getImageData = function(t) {
                var r = e.getImageSize(t.src)
                  , o = n.doc.createElement("canvas");
                o.width = r.width,
                o.height = r.height;
                var i = o.getContext("2d");
                i.drawImage(t, 0, 0);
                var a = o.toDataURL("image/png");
                return a.replace(/^data:image\/(png|jpg);base64,/, "")
            }
            ,
            this.getImageSize = function(e) {
                var t = new Image;
                return t.src = e,
                {
                    width: t.width,
                    height: t.height
                }
            }
            ,
            this.getIndex = function(e) {
                if (!e || !e.parentNode)
                    return -1;
                for (var t = 0, n = e; n = n.previousSibling; )
                    ++t;
                return t
            }
            ,
            this.getIndexList = function(t) {
                for (var n = t, r = []; n && !e.isBody(n); )
                    r.splice(0, 0, e.getIndex(n)),
                    n = n.parentNode;
                return r
            }
            ,
            this.getInnerText = function(e) {
                var t = ""
                  , n = function(e) {
                    return e ? e.replace(/ +/gm, " ").replace(/[\t]+/gm, "").replace(/[ ]+$/gm, "").replace(/^[ ]+/gm, "").replace(/\n+/gm, "\n").replace(/\n+$/, "").replace(/^\n+/, "").replace(/NEWLINE/gm, "\n") : ""
                }
                  , r = function(e) {
                    var t = function(e) {
                        return !/[^\t\n\r ]/.test(e.nodeValue)
                    }
                      , n = []
                      , r = function e(r) {
                        for (var o = 0; o < r.childNodes.length; o++) {
                            var i = r.childNodes[o];
                            3 === i.nodeType && t(i) ? n.push(i) : i.hasChildNodes() && e(i)
                        }
                    }
                    ;
                    r(e);
                    for (var o = 0; o < n.length; o++)
                        n[o].parentNode.removeChild(n[o])
                }
                  , o = function(e, t) {
                    if (e.style[t])
                        return e.style[t];
                    var n = e.currentStyle || e.ownerDocument.defaultView.getComputedStyle(e, null );
                    return "SCRIPT" === e.tagName ? "none" : n[t] ? "block" === n[t] && "TD" === e.tagName ? "feaux-inline" : n[t] : "LI,P,TR".indexOf(e.tagName) > -1 ? "block" : e.style[t]
                }
                  , i = "table-row,block,list-item"
                  , a = function(e) {
                    var t = o(e, "display") || "feaux-inline";
                    return i.indexOf(t) > -1
                }
                  , l = function e(n) {
                    if (/pre/.test(o(n, "whiteSpace")))
                        return t += n.innerHTML.replace(/\t/g, " "),
                        "";
                    var r = o(n, "display");
                    if ("none" === r)
                        return "";
                    var i = a(n) ? "\n" : " ";
                    t += i;
                    for (var l = 0; l < n.childNodes.length; l++) {
                        var s = n.childNodes[l];
                        3 === s.nodeType && (t += s.nodeValue),
                        s.childNodes.length && e(s)
                    }
                    return t += i
                }
                  , s = e.cloneNode(!0);
                return s.innerHTML = s.innerHTML.replace(/<br[\/]?>/gi, "NEWLINE"),
                r(s),
                n(l(s))
            }
            ,
            this.getLastDeepChild = function(e) {
                if (!e)
                    return null ;
                for (var t = e; t && t.childNodes && t.childNodes.length > 0; ) {
                    for (t = t.childNodes[t.childNodes.length - 1]; t && 1 === t.nodeType && /^wiz_/gi.test(t.tagName); )
                        t = t.previousSibling;
                    t && (e = t)
                }
                return e
            }
            ,
            this.getListA2B = function(t) {
                function n(e, t) {
                    e.push(t)
                }
                var o = t.startDom
                  , i = t.startOffset
                  , a = t.endDom
                  , l = t.endOffset
                  , s = !!t.noSplit
                  , d = void 0
                  , c = !1
                  , u = !1;
                1 === o.nodeType && i > 0 && i < o.childNodes.length && (o = o.childNodes[i],
                i = 0),
                1 === a.nodeType && l > 0 && l < a.childNodes.length && (a = a.childNodes[l],
                l = 0),
                o !== a && 0 === l && (a = e.getPreviousNode(a, !1, o),
                a || (a = o),
                l = e.isSelfClosingTag(a) ? 1 : e.getEndOffset(a)),
                o === a && i !== l ? (d = 3 === o.nodeType,
                !d || o.parentNode.getAttribute(r.ATTR.SPAN_DELETE) || s ? 1 === o.nodeType && o.childNodes.length > 0 && !e.isSelfClosingTag(o) && (o = o.childNodes[i],
                a = a.childNodes[l - 1],
                c = !0,
                u = !0) : (o = e.splitRangeText(o, i, l, !1),
                a = o,
                c = !0,
                u = !0)) : o !== a && (3 !== o.nodeType || o.parentNode.getAttribute(r.ATTR.SPAN_DELETE) || s ? 1 === o.nodeType && o.childNodes.length > 0 && i < o.childNodes.length && (o = o.childNodes[i],
                c = !0) : (o = e.splitRangeText(o, i, null , !1),
                c = !0),
                3 === a.nodeType && l > 0 && !a.parentNode.getAttribute(r.ATTR.SPAN_DELETE) && !s ? (a = e.splitRangeText(a, 0, l, !0),
                u = !0) : !e.isSelfClosingTag(a) && 1 === a.nodeType && l > 0 && (a = e.getLastDeepChild(a.childNodes[l - 1]),
                u = !0)),
                c && (i = 0),
                u && (l = e.getEndOffset(a));
                var f = o
                  , g = [];
                for (i === o.length && (f = e.getNextNode(f, !1, a)); f && (o !== a || i !== l); ) {
                    if (f === a || f === a.parentNode) {
                        n(g, a);
                        break
                    }
                    if (e.isBody(f)) {
                        n(g, f);
                        break
                    }
                    n(g, f),
                    f = e.getNextNode(f, !1, a)
                }
                var m = e.getPreviousNode(g[0], !1, null )
                  , p = e.getNextNode(g[g.length - 1], !1, null );
                m && 1 === m.nodeType && m.firstChild && (m = m.firstChild),
                p && 1 === p.nodeType && p.lastChild && (p = p.lastChild);
                var h = e.getEndOffset(m)
                  , v = 0;
                return {
                    list: g,
                    startDom: o,
                    startOffset: i,
                    endDom: a,
                    endOffset: l,
                    startDomBak: m,
                    startOffsetBak: h,
                    endDomBak: p,
                    endOffsetBak: v
                }
            }
            ,
            this.getListFromTagAndIndex = function(t, n, r, i) {
                for (var a = [], l = n.querySelectorAll(t), s = 0; s < l.length; s++) {
                    var d = l[s]
                      , c = e.getIndexList(d).join(".");
                    o.compareVersion(c, r) > -1 && o.compareVersion(c, i) < 1 && a.push(d)
                }
                return a
            }
            ,
            this.getNextBlock = function(t) {
                var n = !1
                  , r = void 0;
                if (e.isBlock(t) || e.isTag(t, "br"))
                    return t;
                for (; t && (n && t.childNodes && t.childNodes.length > 0 ? (t = t.childNodes[0],
                n = !1) : (r = t.nextSibling,
                r ? (t = r,
                n = !0) : (t = t.parentNode,
                n = !1)),
                !e.isBlock(t) && !e.isTag(t, "br")); )
                    ;
                return t
            }
            ,
            this.getNextNode = function(t, n, r) {
                function o(e) {
                    return e ? n ? e.nextElementSibling : e.nextSibling : null 
                }
                function i(e) {
                    return e ? n ? e.firstElementChild : e.firstChild : null 
                }
                var a = t;
                if (!t || t === r)
                    return null ;
                if (n = !!n,
                !o(t) && !t.parentNode)
                    return null ;
                if (o(t))
                    t = o(t);
                else
                    for (; t.parentNode; ) {
                        if (t = t.parentNode,
                        e.isBody(t)) {
                            t = null ;
                            break
                        }
                        if (t === r)
                            break;
                        if (o(t)) {
                            t = o(t);
                            break
                        }
                    }
                if (t === r)
                    return t;
                var l = i(t);
                if (t && l)
                    for (; l && (t = l,
                    t !== r); )
                        l = i(l);
                return t === a ? null  : t
            }
            ,
            this.getNextNodeCanEdit = function(t, n, r) {
                for (t = e.getNextNode(t, n, r); t && !e.canEdit(t); )
                    t = e.getNextNode(t, n, r);
                return t
            }
            ,
            this.getOffset = function(e) {
                var t = {
                    top: 0,
                    left: 0
                };
                if (e.offsetParent)
                    for (; e.offsetParent; )
                        t.top += e.offsetTop,
                        t.left += e.offsetLeft,
                        e = e.offsetParent;
                else
                    t.left += e.offsetLeft,
                    t.top += e.offsetTop;
                return t
            }
            ,
            this.getPageScroll = function() {
                var e = {};
                return "undefined" != typeof n.win.pageYOffset ? (e.left = n.win.pageXOffset,
                e.top = n.win.pageYOffset) : "undefined" != typeof n.doc.compatMode && "BackCompat" !== n.doc.compatMode ? (e.left = n.doc.documentElement.scrollLeft,
                e.top = n.doc.documentElement.scrollTop) : "undefined" != typeof n.doc.body && (e.left = n.doc.body.scrollLeft,
                e.top = n.doc.body.scrollTop),
                e
            }
            ,
            this.getParentByClass = function(t, n, r) {
                return e.getParentByFilter(t, function(t) {
                    return e.hasClass(t, n)
                }, r)
            }
            ,
            this.getParentByFilter = function(t, n, r) {
                if (t && !e.isBody(t))
                    for (t = r ? t : t.parentNode; t; ) {
                        if (!n || n(t))
                            return t;
                        if (e.isBody(t))
                            return null ;
                        t = t.parentNode
                    }
                return null 
            }
            ,
            this.getParentByTagName = function(t, n, r, i) {
                return t ? (n = o.listToMap(o.isArray(n) ? n : [n]),
                e.getParentByFilter(t, function(e) {
                    return n[e.tagName] && !(i && i(e))
                }, r)) : null 
            }
            ,
            this.getParentList = function(t) {
                for (var o = [], i = t.parentNode; i && i !== n.body && !e.hasClass(i, r.CLASS.WIZ_BODY); )
                    o.splice(0, 0, i),
                    i = i.parentNode;
                return o
            }
            ,
            this.getParentRoot = function(t) {
                if (!t || 0 === t.length)
                    return null ;
                var r = void 0
                  , o = void 0
                  , i = [];
                for (o = 1 === t[0].nodeType ? t[0] : t[0].parentNode; o && !e.isBody(o); )
                    i.push(o),
                    o = o.parentNode;
                for (var a = 1, l = t.length; a < l; a++)
                    for (o = t[a]; o; ) {
                        if (e.isBody(o))
                            return n.body;
                        if (r = i.indexOf(o),
                        r > -1) {
                            i.splice(0, r);
                            break
                        }
                        o = o.parentNode
                    }
                return 0 === i.length ? n.body : i[0]
            }
            ,
            this.getPosition = function(e) {
                return e ? {
                    top: e.offsetTop,
                    left: e.offsetLeft,
                    height: e.offsetHeight,
                    width: e.offsetWidth
                } : null 
            }
            ,
            this.getPrevBlock = function(t) {
                var n = !1
                  , r = void 0;
                if (e.isBlock(t) || e.isTag(t, "br"))
                    return t;
                for (; t && (n && t.childNodes && t.childNodes.length > 0 ? (t = t.childNodes[t.childNodes.length - 1],
                n = !1) : (r = t.previousSibling,
                r ? (t = r,
                n = !0) : (t = t.parentNode,
                n = !1)),
                !e.isBlock(t) && !e.isTag(t, "br")); )
                    ;
                return t
            }
            ,
            this.getPreviousNode = function(t, n, r) {
                function o(e) {
                    return n ? e.previousElementSibling : e.previousSibling
                }
                function i(e) {
                    return n ? e.lastElementChild : e.lastChild
                }
                var a = t;
                if (!t || t === r)
                    return null ;
                if (n = !!n,
                o(t))
                    t = o(t);
                else
                    for (; t.parentNode; ) {
                        if (t = t.parentNode,
                        e.isBody(t)) {
                            t = null ;
                            break
                        }
                        if (t === r)
                            break;
                        if (o(t)) {
                            t = o(t);
                            break
                        }
                    }
                if (!t)
                    return null ;
                if (t === r && (3 === t.nodeType || 1 === t.nodeType && 0 === t.childNodes.length))
                    return t;
                var l = void 0;
                if (l = i(t),
                t && l)
                    for (; l && (t = l,
                    t !== r || 3 !== t.nodeType && (1 !== t.nodeType || 0 !== t.childNodes.length)); )
                        l = i(l);
                return t === a ? null  : t
            }
            ,
            this.getPreviousNodeCanEdit = function(t, n, r) {
                for (t = e.getPreviousNode(t, n, r); t && !e.canEdit(t); )
                    t = e.getPreviousNode(t, n, r);
                return t
            }
            ,
            this.getRootSizeRate = function() {
                if (!n.doc.getElementById(r.ID.WIZ_DEFAULT_STYLE))
                    return 1;
                var t = n.win.getComputedStyle(n.body.parentNode)
                  , o = parseFloat(t.fontSize);
                return o / e.pt2px() / i
            }
            ,
            this.getTab = function() {
                var e = n.doc.createElement("span");
                return e.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;",
                e.childNodes[0]
            }
            ,
            this.getWindowSize = function() {
                return {
                    width: n.doc.documentElement.clientWidth,
                    height: n.doc.documentElement.clientHeight
                }
            }
            ,
            this.getWizAmendParent = function(t) {
                return e.getParentByFilter(t, function(e) {
                    return e && 1 === e.nodeType && (e.getAttribute(r.ATTR.SPAN_INSERT) || e.getAttribute(r.ATTR.SPAN_DELETE))
                }, !0)
            }
            ,
            this.hasClass = function(e, t) {
                return !(!e || 1 !== e.nodeType) && (" " + e.className + " ").indexOf(" " + t + " ") > -1
            }
            ,
            this.hideCodeFromHtml = function(e) {
                var t = /(<div [^<>]*)(CodeMirror-activeline-background|CodeMirror-cursors|CodeMirror-selected|CodeMirror-hscrollbar|CodeMirror-vscrollbar)([^<>]*>)/gi;
                e = e.replace(t, "$1 wiz-hide wiz_$2$3");
                var n = /(<span [^<>]*)(CodeMirror-matchingbracket)([^<>]*>)/gi;
                return e = e.replace(n, "$1$3")
            }
            ,
            this.hideTableFromHtml = function(e) {
                var t = /(<[^<> ]*[^<>]* class[ ]*=[ ]*['"])([^'"]*)(['"])/i
                  , n = /(<[^<> ]*[^<>]* class[ ]*=[ ]*['"])([^'"]*)(['"])/gi;
                if (!t.test(e))
                    return e;
                for (var o = [], i = void 0, a = 0, l = void 0, s = void 0; i = n.exec(e); )
                    l = i[2],
                    (" " + l + " ").indexOf(" " + r.CLASS.SELECTED_CELL + " ") > -1 && (s = new RegExp(" " + r.CLASS.SELECTED_CELL + " ","ig"),
                    l = (" " + l + " ").replace(s, "").trim()),
                    o.push(e.substr(a, i.index - a), i[1], l, i[3]),
                    a = i.index + i[0].length;
                return o.push(e.substr(a)),
                o.join("")
            }
            ,
            this.html2Markdown = function(t, i) {
                var a = void 0
                  , l = void 0
                  , s = void 0;
                if (i = i || {},
                3 === t.nodeType)
                    return s = t.nodeValue,
                    i.isInA && (s = s.replace(/([\[\]])/g, "\\$1")),
                    void (t.nodeValue = s);
                if (!(1 !== t.nodeType || i.noPureLink && e.isTag(t, "a") && 0 === t.childElementCount)) {
                    i.isInA || (i.isInA = e.isTag(t, "a")),
                    l = t.childNodes;
                    for (var d = l.length - 1; d >= 0; d--)
                        e.html2Markdown(l[d], {
                            isInA: i.isInA,
                            noPureLink: i.noPureLink
                        });
                    if (!e.getParentByTagName(t, "table"))
                        if (e.isTag(t, "a"))
                            s = t.innerText,
                            a = n.doc.createElement("span"),
                            a.innerText = "[" + s + "](" + t.href + ")",
                            e.before(a, t),
                            e.remove(t);
                        else if (e.isTag(t, "img") && !e.hasClass(t, r.CLASS.TODO_CHECKBOX))
                            s = t.alt || o.getFileNameByUrl(t.src),
                            a = n.doc.createElement("span"),
                            a.innerText = "![" + s + "](" + t.src + ")",
                            e.before(a, t),
                            e.remove(t);
                        else if (e.isTag(t, ["h1", "h2", "h3", "h4", "h5", "h6", "li"]))
                            s = t.innerText,
                            a = n.doc.createElement("div"),
                            a.innerText = s,
                            e.before(a, t),
                            e.remove(t);
                        else if (e.isTag(t, ["ol", "ul"])) {
                            for (; t.lastChild; )
                                e.after(t.lastChild, t);
                            e.remove(t)
                        }
                }
            }
            ,
            this.isBlock = function(t) {
                if (!t)
                    return !1;
                if (e.isWizDom(t))
                    return !0;
                var n = e.getComputedStyle(t, "display", !1);
                return !!n && !/^(inline|inline-block|inline-table|none)$/i.test(n)
            }
            ,
            this.isBody = function(e) {
                return e && e === n.body
            }
            ,
            this.isEmptyDom = function(t) {
                if (!t)
                    return !1;
                if (3 === t.nodeType) {
                    var n = t.nodeValue;
                    return o.isEmpty(n)
                }
                if (1 !== t.nodeType)
                    return !0;
                if (0 === t.childNodes.length)
                    return e.isTag(t, "br") || !e.isSelfClosingTag(t);
                for (var r = 0, i = t.childNodes.length; r < i; r++)
                    if (!e.isEmptyDom(t.childNodes[r]))
                        return !1;
                return !0
            }
            ,
            this.isFillChar = function(e, t) {
                return 3 === e.nodeType && !e.nodeValue.replace(new RegExp((t ? "^" : "") + r.FILL_CHAR), "").length
            }
            ,
            this.isParent = function(e, t) {
                if (!e || !t || e === t)
                    return !1;
                for (; e; )
                    if (e = e.parentNode,
                    e === t)
                        return !0;
                return !1
            }
            ,
            this.isSameAttr = function(e, t) {
                var n = e.attributes
                  , i = t.attributes;
                if (n.length !== i.length)
                    return !1;
                for (var a = 0, l = n.length; a < l; a++) {
                    var s = n[a];
                    if ("style" !== s.name)
                        if (s.name === r.ATTR.SPAN_TIMESTAMP) {
                            if (!o.isSameAmendTime(s.value, i[s.name].value))
                                return !1
                        } else if (!i[s.name] || i[s.name].value !== s.value)
                            return !1
                }
                return !0
            }
            ,
            this.isSameSpan = function(t, n) {
                return !!t && !!n && 1 === t.nodeType && 1 === n.nodeType && e.isTag(t, "span") && t.tagName === n.tagName && t.getAttribute(r.ATTR.SPAN) === r.ATTR.SPAN && e.isSameStyle(t, n) && e.isSameAttr(t, n)
            }
            ,
            this.isSameStyle = function(t, n) {
                var r = {}
                  , o = {};
                e.appendStyle(t.getAttribute("style"), r),
                e.appendStyle(n.getAttribute("style"), o);
                for (var i in r)
                    if (r.hasOwnProperty(i)) {
                        if (o[i] !== r[i])
                            return !1;
                        delete r[i],
                        delete o[i]
                    }
                for (var a in o)
                    if (o.hasOwnProperty(a))
                        return !1;
                return !0
            }
            ,
            this.isSelfClosingTag = function(e) {
                var t = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
                return e && 1 === e.nodeType && t.test(e.tagName)
            }
            ,
            this.isTag = function(e, t) {
                if (o.isArray(t) || (t = [t]),
                !e || 1 !== e.nodeType)
                    return !1;
                for (var n = e.tagName.toLowerCase(), r = 0, i = t.length; r < i; r++)
                    if (n === t[r].toLowerCase())
                        return !0;
                return !1
            }
            ,
            this.isUsableTextNode = function(e) {
                return 3 === e.nodeType && !o.isEmpty(e.nodeValue)
            }
            ,
            this.isWizDom = function(e) {
                return 1 === e.nodeType && /^wiz_/i.test(e.tagName)
            }
            ,
            this.isWizSpan = function(e) {
                return !!e && !!e.getAttribute(r.ATTR.SPAN)
            }
            ,
            this.mergeAtoB = function(t, n, r) {
                e.mergeStyleAToB(t, n, r),
                e.mergeAttrAtoB(t, n, r)
            }
            ,
            this.mergeAttrAtoB = function(e, t, n) {
                if (1 === e.nodeType && 1 === t.nodeType) {
                    var r = e.attributes
                      , o = t.attributes
                      , i = void 0
                      , a = void 0
                      , l = void 0;
                    for (i = 0,
                    a = r.length; i < a; i++)
                        l = r[i],
                        "style" !== l.name && (o[l.name] && !n || t.setAttribute(l.name, l.value))
                }
            }
            ,
            this.mergeChildSpan = function(t, n) {
                if (t && 1 === t.nodeType) {
                    for (var o = 0, i = t.children.length; o < i; o++)
                        e.mergeChildSpan(t.children[o], n);
                    e.mergeSiblingSpan(t, n);
                    var a = t.children[0]
                      , l = void 0;
                    if (a && n.indexOf(a) < 0 && 1 === t.childNodes.length && t.getAttribute(r.ATTR.SPAN) === r.ATTR.SPAN && a.getAttribute(r.ATTR.SPAN) === r.ATTR.SPAN)
                        e.mergeChildToParent(t, a);
                    else
                        for (; a; )
                            n.indexOf(a) < 0 && n.indexOf(t) < 0 && e.isSameSpan(t, a) ? (l = a.previousElementSibling,
                            e.mergeChildToParent(t, a),
                            a = l ? l.nextElementSibling : t.children[0]) : a = a.nextElementSibling
                }
            }
            ,
            this.mergeChildToParent = function(t, n) {
                if (t && n && n.parentNode === t) {
                    for (; n.childNodes.length > 0; )
                        e.before(n.childNodes[0], n);
                    e.mergeAtoB(t, n, !1),
                    e.mergeAtoB(n, t, !0),
                    t.removeChild(n)
                }
            }
            ,
            this.mergeSiblingSpan = function(t, n) {
                var o = t.childNodes[0]
                  , i = void 0
                  , a = void 0;
                if (o)
                    for (; o; )
                        if (i = o.nextSibling,
                        i && n.indexOf(i) < 0 && n.indexOf(o) < 0 && e.isSameSpan(o, i)) {
                            for (; i.childNodes.length; )
                                a = i.childNodes[0],
                                a && (a.innerHTML || a.nodeValue && a.nodeValue !== r.FILL_CHAR) ? o.appendChild(a) : i.removeChild(a);
                            e.remove(i)
                        } else
                            o = i
            }
            ,
            this.mergeStyleAToB = function(t, n, r) {
                if (1 === t.nodeType && 1 === n.nodeType) {
                    var o = t.getAttribute("style")
                      , i = n.getAttribute("style") || "";
                    if (o) {
                        var a = {};
                        r ? (e.appendStyle(i, a),
                        e.appendStyle(o, a)) : (e.appendStyle(o, a),
                        e.appendStyle(i, a));
                        var l = [];
                        for (var s in a)
                            a.hasOwnProperty(s) && l.push(s + ":" + a[s]);
                        n.setAttribute("style", l.join(";"))
                    }
                }
            }
            ,
            this.modifyChildNodesStyle = function(t, n, r) {
                if (t)
                    for (var o = t.childNodes, i = !1, a = 0; a < o.length; a++) {
                        var l = o[a];
                        !i && e.isUsableTextNode(l) ? (i = !0,
                        e.modifyStyle(t, n, r)) : 1 === l.nodeType && e.modifyChildNodesStyle(l, n, r)
                    }
            }
            ,
            this.modifyNodeStyle = function(t, n, r, o) {
                return 1 === t.nodeType ? e.isSelfClosingTag(t) ? e.modifyStyle(t, n, r) : e.modifyChildNodesStyle(t, n, r) : e.isUsableTextNode(t) && (t = e.splitRangeText(t, null , null , o),
                e.modifyStyle(t, n, r)),
                t
            }
            ,
            this.modifyNodesStyle = function(t, n, r) {
                if (0 !== t.length)
                    for (var o = 0, i = t.length; o < i; o++) {
                        var a = t[o];
                        t[o] = e.modifyNodeStyle(a, n, r, o === i - 1)
                    }
            }
            ,
            this.modifyNodesStyleAndClear = function(t, n, r, o) {
                e.modifyNodesStyle(t, n, r);
                for (var i = [], a = void 0, l = void 0, s = 0, d = t.length; s < d; s++)
                    a = t[s].parentNode,
                    a && i.indexOf(a) < 0 && i.push(a);
                a = e.getParentRoot(i),
                l = e.getWizAmendParent(a),
                a = l ? l.parentNode : a,
                e.clearChild(a, o)
            }
            ,
            this.modifyStyle = function(t, n, o) {
                var i = e.isSelfClosingTag(t)
                  , a = e.hasClass(t, r.CLASS.TODO_CHECKBOX);
                if (!(a || o && o[r.ATTR.SPAN_INSERT] && i)) {
                    var l = t
                      , s = function(t) {
                        if (t) {
                            var n = e.createSpan();
                            for (n.setAttribute("style", t.getAttribute("style") || ""),
                            t.removeAttribute("style"); t.firstChild; )
                                n.insertBefore(t.firstChild, null );
                            t.insertBefore(n, null )
                        }
                    }
                    ;
                    if (o && (o[r.ATTR.SPAN_INSERT] || o[r.ATTR.SPAN_DELETE]) && (l = e.getWizAmendParent(t),
                    l ? t = null  : l = t),
                    t && !i && (!e.isTag(t, "span") || t.getAttribute(r.ATTR.SPAN) !== r.ATTR.SPAN))
                        for (l = e.createSpan(),
                        t.insertBefore(l, null ); t.childNodes.length > 1; )
                            l.insertBefore(t.childNodes[0], null );
                    var d = void 0
                      , c = void 0
                      , u = [];
                    for (d in n)
                        n.hasOwnProperty(d) && (c = n[d],
                        c || u.push(d));
                    var f = l
                      , g = void 0
                      , m = l;
                    if (u.length > 0) {
                        for (; f && !e.isBlock(f) && !e.hasClass(f, r.CLASS.TODO_MAIN); )
                            e.isTag(f, "a") && (g = f),
                            m = f,
                            f = m.parentNode;
                        g ? g === m ? (s(g),
                        e.splitDomSingle(g.firstChild, l)) : (e.splitDomSingle(m, g),
                        s(g),
                        e.splitDomSingle(g.firstChild, l)) : e.splitDomSingle(m, l)
                    }
                    e.css(l, n),
                    e.attr(l, o)
                }
            }
            ,
            this.moveOutFromTableContainer = function(t) {
                if (t) {
                    var n = function(t, n) {
                        if (t && n) {
                            var o = t === n
                              , i = void 0
                              , a = void 0
                              , l = void 0
                              , s = void 0
                              , d = !1
                              , c = !1;
                            for (i = n.childNodes,
                            l = t,
                            s = i.length - 1; s >= 0; s--)
                                a = i[s],
                                1 !== a.nodeType || !(o && e.hasClass(a, r.CLASS.TABLE_BODY) || !o && e.isTag(a, ["table", r.TAG.TMP_TAG])) || c ? (e.before(a, l, !d),
                                d && (l = a)) : (e.hasClass(a, r.CLASS.TABLE_BODY) || e.isTag(a, "table")) && (d = !0,
                                c = !0);
                            0 === n.childNodes.length && e.remove(t)
                        }
                    }
                    ;
                    n(t, t),
                    n(t, t.querySelector("." + r.CLASS.TABLE_BODY))
                }
            }
            ,
            this.packageByDiv = function(t) {
                var r = void 0
                  , o = void 0;
                for (r = t; r; ) {
                    if (e.isBlock(r)) {
                        o = r,
                        r = null ;
                        break
                    }
                    if (e.isTag(r.parentNode, ["body", "td", "th"]))
                        break;
                    r = r.parentNode
                }
                if (o)
                    return o;
                for (var i = r, a = r, l = void 0, s = void 0, d = void 0; i && (d = i.previousSibling,
                d && !e.isBlock(d)); )
                    i = d;
                for (; a && (d = a.nextSibling,
                d && !e.isBlock(d)); )
                    a = d;
                o = n.doc.createElement("div"),
                e.before(o, i),
                d = i;
                do
                    l = d.nextSibling,
                    o.appendChild(d),
                    s = d === a,
                    d = l;
                while (!s);return o
            }
            ,
            this.peelDom = function(t, n) {
                if (t && 3 !== t.nodeType) {
                    var r = {
                        start: null ,
                        end: null 
                    }
                      , o = void 0
                      , i = void 0
                      , a = void 0;
                    for (o = t.childNodes,
                    a = o.length - 1; a >= 0; a--)
                        i = o[a],
                        n && !n(i) || (e.after(i, t),
                        r.start ? r.end = i : (r.start = i,
                        r.end = i));
                    return e.remove(t),
                    r
                }
            }
            ,
            this.peelTag = function(t) {
                var r = n.body.querySelectorAll(t)
                  , o = void 0
                  , i = void 0;
                for (o = r.length - 1; o >= 0; o--) {
                    for (i = r[o]; i.firstChild; )
                        e.before(i.firstChild, i);
                    e.remove(i)
                }
            }
            ,
            this.peelTagFromHtml = function(e, t) {
                var n = new RegExp("<" + t + "( [^>]*)?>|</" + t + ">","ig");
                return e.replace(n, "")
            }
            ,
            this.pt2px = function() {
                var t = void 0
                  , r = document.createElement("span");
                return r.style.visibility = "hidden",
                r.style.position = "absolute",
                r.style.top = "0",
                r.style.left = "0",
                r.style.fontSize = i + "pt",
                n.body.appendChild(r),
                t = n.win.getComputedStyle(r).fontSize,
                t = parseInt(t, 10) / i,
                n.body.removeChild(r),
                e.pt2px = function() {
                    return t
                }
                ,
                t
            }
            ,
            this.remove = function(e) {
                e && e.parentNode && e.parentNode.removeChild(e)
            }
            ,
            this.removeClass = function(e, t) {
                if (e) {
                    e.nodeType && (e = [e]),
                    o.isArray(t) || (t = [t]);
                    for (var n = e.length - 1; n >= 0; n--) {
                        var r = e[n];
                        if (1 === r.nodeType) {
                            r.className = " " + r.className + " ";
                            for (var i = t.length; i >= 0; i--) {
                                var a = t[i];
                                r.className = r.className.replace(" " + a + " ", " ")
                            }
                            r.className = r.className.trim()
                        }
                    }
                }
            }
            ,
            this.removeByName = function(t) {
                for (var r = n.doc.getElementsByName(t), o = r.length - 1; o >= 0; o--) {
                    var i = r[o];
                    e.remove(i)
                }
            }
            ,
            this.removeByTag = function(t) {
                for (var r = n.doc.getElementsByTagName(t), o = r.length - 1; o >= 0; o--) {
                    var i = r[o];
                    e.remove(i)
                }
            }
            ,
            this.removeEmptyParent = function(t) {
                if (t) {
                    var r = void 0;
                    e.isEmptyDom(t) && (t === n.body || e.isTag(t, ["td", "th"]) ? t.innerHTML = "<br/>" : (r = t.parentNode,
                    r && (r.removeChild(t),
                    e.removeEmptyParent(r))))
                }
            }
            ,
            this.removeListFilter = function(e, t) {
                var n = []
                  , r = void 0;
                if (!e || !t)
                    return n;
                for (var o = e.length - 1; o >= 0; o--)
                    r = e[o],
                    t(r) && n.unshift(e.splice(o, 1)[0]);
                return n
            }
            ,
            this.removeStyleByNameFromHtml = function(e, t) {
                var n = "(" + t.join("|") + ")"
                  , r = new RegExp("<style( ([^<>])+[ ]+|[ ]+)name *= *(['\"])" + n + "\\3[^<>]*>[^<]*</style>","ig")
                  , o = new RegExp("<link( ([^<>])+[ ]+|[ ]+)name *= *(['\"])" + n + "\\3[^<>]*>","ig");
                return e.replace(r, "").replace(o, "")
            }
            ,
            this.replaceTagName = function(t, o) {
                if (!e.isTag(t, o)) {
                    var i = e.hasClass(t, r.CLASS.TODO_LAYER)
                      , a = n.doc.createElement(o);
                    for (e.after(a, t); t.firstChild; )
                        a.appendChild(t.firstChild);
                    i && (t.className && (a.className = t.className),
                    t.id && (a.id = t.id)),
                    e.remove(t)
                }
            }
            ,
            this.removeByTagFromHtml = function(e, t) {
                var n = new RegExp("<" + t + "( [^>]*)?>((?!</" + t + ">).|\r|\n)*?</" + t + ">","ig");
                return e.replace(n, "")
            }
            ,
            this.search = function(e, t, n) {
                var r = e.querySelectorAll(t)
                  , o = void 0
                  , i = void 0
                  , a = void 0;
                for (n = n ? n : [],
                o = 0,
                i = r.length; o < i; o++)
                    a = r[o],
                    n.push(a)
            }
            ,
            this.setContenteditable = function(e, t) {
                !e && n.win.WizTemplate ? n.win.WizTemplate.setContenteditable(t) : (e || (e = n.body),
                e.setAttribute("contenteditable", t ? "true" : "false"))
            }
            ,
            this.setLayout = function(t) {
                var o = t.layerObj
                  , i = t.target
                  , a = t.layout
                  , l = !!t.fixed
                  , s = t.noSpace
                  , d = !!t.reverse
                  , c = e.getPosition(o)
                  , u = i.nodeType ? e.getPosition(i) : i
                  , f = e.getPageScroll()
                  , g = n.doc.documentElement.clientWidth
                  , m = n.doc.documentElement.clientHeight
                  , p = n.win.getComputedStyle(n.doc.body, null )["margin-top"]
                  , h = "50%"
                  , v = "30%"
                  , b = 0
                  , C = -c.width / 2
                  , E = void 0
                  , T = void 0
                  , S = void 0
                  , y = void 0
                  , A = void 0;
                p && (A = parseInt(p),
                isNaN(A) && (A = 0)),
                l ? (E = 0,
                T = g - 5,
                S = A,
                y = m) : (E = 0 + f.left,
                T = g + f.left - 5,
                S = A + (f.top <= A ? 0 : Math.abs(f.top - A)),
                y = m + f.top),
                u && a && (b = 0,
                C = 0,
                a === r.TYPE.POS.upLeft || a === r.TYPE.POS.upRight ? v = u.top - c.height - (s ? 0 : r.AMEND.INFO_SPACE) : a === r.TYPE.POS.downLeft || a === r.TYPE.POS.downRight ? v = u.top + u.height + (s ? 0 : r.AMEND.INFO_SPACE) : a === r.TYPE.POS.leftUp || a === r.TYPE.POS.leftDown ? h = u.left - c.width - (s ? 0 : r.AMEND.INFO_SPACE) : a !== r.TYPE.POS.rightUp && a !== r.TYPE.POS.rightDown || (h = u.left + u.width + (s ? 0 : r.AMEND.INFO_SPACE)),
                a === r.TYPE.POS.upLeft || a === r.TYPE.POS.downLeft ? (h = u.left,
                l && (h -= f.left)) : a === r.TYPE.POS.upRight || a === r.TYPE.POS.downRight ? (h = u.left + u.width - c.width,
                l && (h -= f.left)) : a === r.TYPE.POS.leftUp || a === r.TYPE.POS.rightUp ? (v = u.top,
                l && (v -= f.top)) : a !== r.TYPE.POS.leftDown && a !== r.TYPE.POS.rightDown || (v = u.top + u.height - c.height,
                l && (v -= f.top)),
                h + c.width > T && (h = T - c.width),
                h < E && (h = E),
                v + c.height > y && (v = y - c.height),
                d && v < S && (v = u.top + u.height),
                (v < S || v + c.height > y) && (v = S)),
                e.css(o, {
                    left: h + "px",
                    top: v + "px",
                    "margin-top": b + "px",
                    "margin-left": C + "px"
                })
            }
            ,
            this.setPageScrollLeft = function(e) {
                "undefined" != typeof n.doc.compatMode && "BackCompat" !== n.doc.compatMode ? n.doc.documentElement.scrollLeft = e : "undefined" != typeof n.doc.body && (n.doc.body.scrollLeft = e)
            }
            ,
            this.setPageScrollTop = function(e) {
                "undefined" != typeof n.doc.compatMode && "BackCompat" !== n.doc.compatMode ? (n.doc.body.scrollTop = e,
                n.doc.documentElement.scrollTop = e) : "undefined" != typeof n.doc.body && (n.doc.body.scrollTop = e)
            }
            ,
            this.setTextarea = function(e, t) {
                var n = void 0 === e.textContent ? "innerText" : "textContent";
                return t ? void (e[n] = o.replaceSpecialChar(t)) : void (e.value !== e[n] && (e[n] = e.value))
            }
            ,
            this.splitDomAfterSub = function(t, n) {
                var r = void 0
                  , o = void 0;
                if (n.nextSibling)
                    o = n.nextSibling;
                else
                    for (r = n.parentNode; r && r !== t && !(o = r.nextSibling); )
                        r = r.parentNode;
                return o && e.splitDomBeforeSub(t, o),
                t
            }
            ,
            this.splitDomBeforeSub = function(e, t) {
                function n(e, t) {
                    for (var n = e.parentNode, r = e.cloneNode(!1), o = void 0; t; )
                        o = t.nextSibling,
                        r.appendChild(t),
                        t = o;
                    return n.insertBefore(r, e.nextSibling),
                    r
                }
                if (!e || !t)
                    return e;
                for (var r = [t], o = t.parentNode, i = o.firstChild === t; o && (r.push(o),
                i && o.parentNode.firstChild !== o && (i = !1),
                o !== e); )
                    o = o.parentNode;
                if (i)
                    return e;
                if (r[r.length - 1] !== e)
                    return e;
                for (; r.length > 1; )
                    r[1] = n(r[1], r[0]),
                    r.splice(0, 1);
                return r[0]
            }
            ,
            this.splitDomSingle = function(t, n) {
                if (t && n && 1 === t.nodeType && n === t.firstChild && 1 === t.childNodes.length)
                    return t;
                var r = e.splitDomBeforeSub(t, n);
                return r = e.splitDomAfterSub(r, n)
            }
            ,
            this.splitRangeText = function(t, r, o, i) {
                if (!e.isUsableTextNode(t))
                    return t;
                var a = void 0
                  , l = void 0
                  , s = void 0
                  , d = t.nodeValue;
                return a = t.parentNode,
                l = e.createSpan(),
                !r && !o || 0 === r && o === t.nodeValue.length ? a.childNodes.length > 1 || e.isTag(a, ["td", "th"]) ? (i ? a.insertBefore(l, t) : a.insertBefore(l, t.nextSibling),
                l.appendChild(t)) : l = a : 0 === r ? (l.textContent = d.substring(r, o),
                a.insertBefore(l, t),
                t.nodeValue = d.substring(o)) : o && o !== t.nodeValue.length ? (s = n.doc.createTextNode(d.substring(o)),
                l.textContent = d.substring(r, o),
                a.insertBefore(l, t.nextSibling),
                a.insertBefore(s, l.nextSibling),
                t.nodeValue = d.substring(0, r)) : (l.textContent = d.substring(r),
                a.insertBefore(l, t.nextSibling),
                t.nodeValue = d.substring(0, r)),
                l
            }
        }
        ;
        t.exports = a
    }
    , {
        "../config/const": 51,
        "../libs/utils": 59
    }],
    8: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = (e("../libs/utils"),
        ["background", "background-color", "color", "font-family", "font-size", "font-weight", "font-style", "text-decoration", "text-align"])
          , i = ["h1", "h2", "h3", "h4", "h5", "h6"]
          , a = ["sub", "sup"]
          , l = ["b", "i", "u", "strike"]
          , s = {
            b: "bold",
            div: "formatBlock",
            h1: "formatBlock",
            h2: "formatBlock",
            h3: "formatBlock",
            h4: "formatBlock",
            h5: "formatBlock",
            h6: "formatBlock",
            i: "italic",
            strike: "strikeThrough",
            sub: "subscript",
            sup: "superscript",
            u: "underline",
            "text-align-center": "justifyCenter",
            "text-align-justify": "justifyFull",
            "text-align-left": "JustifyLeft",
            "text-align-right": "JustifyRight"
        }
          , d = function() {
            var e = this
              , t = null 
              , n = null 
              , d = null 
              , c = null 
              , u = null 
              , f = null 
              , g = null 
              , m = null 
              , p = null 
              , h = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                d = t.require.codeUtils,
                c = t.require.commandExtend,
                u = t.require.domUtils,
                f = t.require.historyUtils,
                g = t.require.rangeUtils,
                m = t.require.tableCore,
                p = t.require.tableZone,
                h = t.require.wizStyle
            }
            ;
            var v = !1
              , b = void 0
              , C = function(e, t, r, o) {
                for (var i = n.win.getComputedStyle(e), a = r.length - 1; a >= 0; a--) {
                    var l = r[a]
                      , s = t.style[l];
                    !s && "color" === l && u.isTag(t, "font") && (s = t.getAttribute(l)),
                    s && u.getFontSizeRem(s) === u.getFontSizeRem(i[l]) && (r.splice(a, 1),
                    o[l] = s)
                }
            }
              , E = function(e) {
                return "h" === e.charAt(0) || "div" === e
            }
              , T = function(e) {
                return /sub|sup/i.test(e)
            }
              , S = function(e) {
                for (var t = o.concat(), r = {}, s = i.concat(a, l), d = {}, c = void 0, f = void 0, g = !1, m = !1, h = !1, v = !1, S = 1 === e.nodeType ? e : e.parentNode, y = S; y && y !== n.body; )
                    C(S, y, t, r),
                    y = y.parentNode;
                for (var A = t.length - 1; A >= 0; A--)
                    r[t[A]] = null ;
                for (b.style = r,
                y = e; y; )
                    y = u.getParentByTagName(y, s, !0),
                    y && (c = y.tagName.toLowerCase(),
                    f = {
                        name: c,
                        enabled: !0
                    },
                    E(c) ? (b.tagList.splice(0, 0, f),
                    g = !0) : T(c) ? (b.tagList.push(f),
                    m = !0) : (b.tagList.push(f),
                    /^i$/i.test(c) ? h = !0 : /^b$/i.test(c) && (v = !0)),
                    d[c] = 1,
                    y = y.parentNode);
                g || b.tagList.splice(0, 0, {
                    name: "div",
                    enabled: !0
                }),
                m || b.tagList.push({
                    name: "sub",
                    enabled: !1
                });
                for (var N = 0; N < s.length; N++)
                    c = s[N],
                    E(c) || T(c) || d[c] || b.tagList.push({
                        name: c,
                        enabled: !1
                    });
                var _ = p.getZone();
                _.range ? delete b.style["text-align"] : (c = b.style["text-align"] ? "text-align-" + b.style["text-align"] : "text-align-left",
                delete b.style["text-align"],
                b.tagList.push({
                    name: c,
                    enabled: !0
                }))
            }
              , y = function() {
                b = {
                    style: null ,
                    tagList: []
                }
            }
              , A = {
                bind: function() {
                    A.unbind(),
                    n.event.add(r.EVENT.ON_KEY_DOWN, A.handler.onKeyDown),
                    n.event.add(r.EVENT.ON_MOUSE_UP, A.handler.onMouseUp)
                },
                unbind: function() {
                    n.event.remove(r.EVENT.ON_KEY_DOWN, A.handler.onKeyDown),
                    n.event.remove(r.EVENT.ON_MOUSE_UP, A.handler.onMouseUp)
                },
                handler: {
                    onKeyDown: function(t) {
                        var n = t.keyCode || t.which;
                        27 === n && e.off()
                    },
                    onMouseUp: function() {
                        if (b.style) {
                            f.saveSnap(!1);
                            var t = void 0
                              , n = void 0
                              , r = void 0
                              , o = p.getZone();
                            o.range && (delete b.tagList["text-align-left"],
                            delete b.tagList["text-align-right"]);
                            for (var i = 0; i < b.tagList.length; i++) {
                                var a = b.tagList[i]
                                  , l = s[a.name];
                                if (E(a.name))
                                    c.execCommand(l, !1, a.name);
                                else if (T(a.name))
                                    a.enabled ? c.execCommand(l, !1) : c.clearSubSup();
                                else {
                                    var d = c.queryCommandState(l);
                                    a.enabled && !d ? c.execCommand(l, !1) : !a.enabled && d ? c.execCommand(l, !1) : (c.execCommand(l, !1),
                                    t = g.getRange(),
                                    t && (n = g.getRangeDetail(t.startContainer, t.startOffset),
                                    r = g.getRangeDetail(t.endContainer, t.endOffset)),
                                    c.execCommand(l, !1),
                                    t && g.setRange(n.container, n.offset, r.container, r.offset))
                                }
                            }
                            m.modifySelectionDom(b.style, null ) || g.modifySelectionDom(b.style, null ),
                            v || e.init()
                        }
                    }
                }
            };
            this.init = function() {
                e.off()
            }
            ,
            this.on = function(t) {
                if (y(),
                v = !!t,
                0 === e.status())
                    return 0;
                var o = g.getRange()
                  , i = p.getZone()
                  , a = void 0
                  , l = 0;
                return o ? (a = g.getRangeDetail(o.startContainer, o.startOffset),
                l = a.offset,
                a = a.container) : a = i.start.cell,
                a = u.getFirstDeepChild(a),
                S(a, l),
                A.bind(),
                h.insertStyle({
                    id: r.ID.FORMAT_PAINTER_STYLE,
                    name: r.NAME.TMP_STYLE
                }, 'body {cursor:url("' + n.dependency.files.cursor.formatPainter + '"), auto;}'),
                2
            }
            ,
            this.off = function() {
                return y(),
                h.removeStyleById(r.ID.FORMAT_PAINTER_STYLE),
                A.unbind(),
                e.status()
            }
            ,
            this.status = function() {
                if (n.readonly || n.client.type.isPhone || n.client.type.isPad)
                    return 0;
                var e = g.getRange()
                  , t = p.getZone();
                return !e && !t.range || t.active ? 0 : e && d.getContainerFromChild(e.startContainer) ? 0 : b && b.style ? 2 : 1
            }
        }
        ;
        t.exports = d
    }
    , {
        "../config/const": 51,
        "../libs/utils": 59
    }],
    9: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = e("../libs/utils")
          , i = "yellow"
          , a = "#FF9632"
          , l = function() {
            var e = this
              , t = null 
              , n = null 
              , l = null 
              , s = null 
              , d = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                l = t.require.codeUtils,
                s = t.require.domUtils,
                d = t.require.rangeUtils
            }
            ;
            var c = !1
              , u = void 0
              , f = void 0
              , g = []
              , m = {
                searching: "cm-searching"
            }
              , p = function(e, t) {
                var o = n.win.getSelection();
                t && (f = -1,
                u = null ,
                g = []),
                c = !1,
                t && n.win.find(e, !1, !1, !0) && (u = h(e)),
                o.collapse(n.body, n.body.childNodes.length);
                for (var i = 1; i++ < 101 && n.win.find(e, !1, !0); )
                    h(e);
                c = !!n.body.querySelector(r.TAG.TMP_HIGHLIGHT_TAG) || !!n.body.querySelector(r.TAG.CODE_MIRROR + " ." + m.searching),
                c && !t && (o.collapse(document.body, 0),
                o.extend(document.body, 0))
            }
              , h = function(e) {
                var t = void 0
                  , n = void 0
                  , o = void 0;
                if (t = d.getRange()) {
                    if (t && s.getParentByTagName(t.startContainer, r.TAG.TMP_HIGHLIGHT_TAG))
                        return t.collapse(!0),
                        null ;
                    var a = l.getContainerFromChild(t.startContainer);
                    if (a)
                        a.state && a.state.query === e || (l.highlight.search(a, e),
                        u || (n = a.querySelector("." + m.searching)));
                    else {
                        for (n = document.createElement(r.TAG.TMP_HIGHLIGHT_TAG),
                        s.addClass(n, m.searching),
                        n.style.backgroundColor = i,
                        o = t.extractContents(); o.firstChild; )
                            n.appendChild(o.firstChild);
                        s.isEmptyDom(n) || t.insertNode(n)
                    }
                    return n
                }
            }
              , v = function() {
                if (g = n.body.querySelectorAll("." + m.searching),
                0 !== g.length) {
                    for (var e = g.length - 1; e >= 0; e--) {
                        var t = g[e];
                        if (t === u)
                            return void (f = e)
                    }
                    f = 0,
                    u = g[0]
                }
            }
              , b = function(e) {
                var t = f;
                if (0 !== g.length) {
                    if (e >= g.length ? e = 0 : e < 0 && (e = g.length - 1),
                    e === t)
                        return void (u.style.backgroundColor = a);
                    g[t].style.backgroundColor = i,
                    f = e,
                    u = g[f],
                    u.style.backgroundColor = a,
                    u.scrollIntoViewIfNeeded && u.scrollIntoViewIfNeeded()
                }
            }
            ;
            this.on = function(t, n) {
                if (e.off(),
                !t)
                    return !1;
                o.isArray(t) || (t = [t]),
                t.length > 1 && (n = !1);
                for (var r = 0, i = t.length; r < i; r++)
                    p(t[r], n);
                return n && (v(),
                b(f)),
                c
            }
            ,
            this.off = function() {
                s.peelTag(r.TAG.TMP_HIGHLIGHT_TAG),
                l.highlight.clearAll()
            }
            ,
            this.next = function() {
                b(f + 1)
            }
            ,
            this.previous = function() {
                b(f - 1)
            }
        }
        ;
        t.exports = l
    }
    , {
        "../config/const": 51,
        "../libs/utils": 59
    }],
    10: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = e("../libs/utils")
          , i = function(e, t) {
            var n = null 
              , r = e.querySelector("#" + t);
            return r && r.codeMirror && (n = r.codeMirror),
            n
        }
          , a = function(e) {
            return e.querySelectorAll("." + r.CLASS.CODE_CONTAINER)
        }
          , l = function() {
            var e = this
              , t = null 
              , n = null 
              , l = null 
              , s = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                l = t.require.domUtils,
                s = t.require.rangeUtils
            }
            ;
            var d = 100
              , c = {}
              , u = function() {
                var e = a(n.body)
                  , t = void 0
                  , r = void 0
                  , o = void 0;
                for (o = e.length - 1; o >= 0; o--)
                    t = e[o],
                    r = t.codeMirror,
                    r && (c[t.id] = r.getDoc().copy(!0))
            }
              , f = {
                bind: function() {
                    f.unbind(),
                    n.event.add(r.EVENT.ON_KEY_DOWN, f.onKeyDown)
                },
                unbind: function() {
                    n.event.remove(r.EVENT.ON_KEY_DOWN, f.onKeyDown)
                },
                onKeyDown: function(t) {
                    var n = t.keyCode || t.which;
                    return t.ctrlKey && 90 === n || t.metaKey && 90 === n && !t.shiftKey ? (e.undo(),
                    void o.stopEvent(t)) : void ((t.ctrlKey && 89 === n || t.metaKey && 89 === n || t.metaKey && 90 === n && t.shiftKey) && (e.redo(),
                    o.stopEvent(t)))
                }
            };
            this.enable = !1,
            this.callback = [],
            this.stack = [],
            this.stackIndex = 0,
            this.init = function() {
                e.callback = [],
                e.stack = [],
                e.stackIndex = 0
            }
            ,
            this.addCallback = function(t) {
                if (t && "function" == typeof t) {
                    for (var n = 0, r = e.callback.length; n < r; n++)
                        if (e.callback[n] === t)
                            return;
                    e.callback.push(t)
                }
            }
            ,
            this.applyCallback = function() {
                for (var t = e.getUndoState(), n = 0, r = e.callback.length; n < r; n++)
                    e.callback[n](t)
            }
            ,
            this.canSave = function(e, t) {
                function n(e, t) {
                    if (e.isCollapsed !== t.isCollapsed)
                        return 0;
                    if (e.start.length !== t.start.length || e.end.length !== t.end.length)
                        return 0;
                    var n = r(e.start, t.start);
                    return n < 1 ? n : n = r(e.end, t.end)
                }
                function r(e, t) {
                    var n = 1
                      , r = void 0
                      , o = void 0;
                    for (r = 0,
                    o = e.length - 1; r < o; r++)
                        if (e[r] !== t[r]) {
                            n = 0;
                            break
                        }
                    return n && e[o] < t[o] && (n = -1),
                    n
                }
                var o = {
                    add: !1,
                    replace: !1,
                    direct: 0
                };
                return (e.content.length !== t.content.length || e.content.localeCompare(t.content)) && (o.direct = n(e.focus, t.focus),
                0 === o.direct || o.direct !== t.direct || !/^\s*$/g.test(e.focus.lastChar + t.focus.lastChar) && /\s/.test(t.focus.lastChar) || Math.abs(e.focus.startOffset - t.focus.startOffset) > 20 ? o.add = !0 : o.replace = !0),
                o
            }
            ,
            this.getCodeMirrorDoc = function(e) {
                var t = c[e] || null ;
                return t && (t = t.copy(!0)),
                t
            }
            ,
            this.getUndoState = function() {
                return {
                    undoCount: e.stack.length,
                    undoIndex: e.stackIndex
                }
            }
            ,
            this.redo = function() {
                if (e.enable && !(e.stackIndex >= e.stack.length - 1)) {
                    var t = e.stack[++e.stackIndex];
                    t.type === r.HISTORY.TYPE.CODE_MIRROR ? e.restoreCodeMirror("redo", t) : (u(),
                    e.restoreSnap(t.snap)),
                    n.event.call(r.EVENT.AFTER_RESTORE_HISTORY, {
                        type: t.type
                    }),
                    e.applyCallback(),
                    t.type === r.HISTORY.TYPE.COMMON && l.focus()
                }
            }
            ,
            this.removeCallback = function(t) {
                for (var n = 0, r = e.callback.length; n < r; n++)
                    if (e.callback[n] === t)
                        return void e.callback.splice(n, 1)
            }
            ,
            this.restoreCodeMirror = function(t, r) {
                if (e.enable && r) {
                    var o = void 0
                      , a = void 0;
                    o = "undo" === t ? r.nextChange.cmContainerId : r.cmContainerId,
                    a = i(n.body, o),
                    a && ("redo" === t ? a.redo() : a.undo())
                }
            }
            ,
            this.restoreSnap = function(t) {
                if (e.enable && t) {
                    var r = void 0
                      , o = void 0
                      , i = void 0;
                    r = n.doc.getSelection(),
                    n.body.innerHTML = t.content;
                    try {
                        o = l.getFromIndexList(t.focus.start),
                        r.collapse(o.dom, o.offset),
                        t.focus.isCollapsed ? s.setRange(o.dom, o.offset, o.dom, o.offset) : (i = l.getFromIndexList(t.focus.end),
                        s.setRange(o.dom, o.offset, i.dom, i.offset)),
                        s.caretFocus()
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
            ,
            this.saveSnap = function(t, o) {
                if (e.enable && (!n.compositionStart || o && o.type !== r.HISTORY.TYPE.COMMON)) {
                    n.event.call(r.EVENT.BEFORE_SAVESNAP);
                    var a = {
                        type: r.HISTORY.TYPE.COMMON
                    };
                    o && o.type === r.HISTORY.TYPE.CODE_MIRROR && (a.type = r.HISTORY.TYPE.CODE_MIRROR,
                    a.cmContainerId = o.cmContainerId);
                    var l = {
                        nextChange: a
                    }
                      , s = void 0
                      , c = void 0
                      , u = void 0
                      , f = void 0
                      , g = void 0
                      , m = void 0
                      , p = void 0;
                    if (g = e.stackIndex > 0 ? e.stack[e.stackIndex - 1] : null ,
                    g && g.nextChange.type === r.HISTORY.TYPE.CODE_MIRROR) {
                        if (f = g.cmContainerId,
                        u = g.nextChange.cmContainerId,
                        l.type = r.HISTORY.TYPE.CODE_MIRROR,
                        l.cmContainerId = u,
                        c = i(n.body, u)) {
                            if (e.stackIndex >= 0 && e.stack.splice(e.stackIndex, e.stack.length - e.stackIndex),
                            l.nextChange.type === r.HISTORY.TYPE.COMMON && (l.snap = e.snapshot()),
                            l.cmHistory = c.historySize(),
                            f === u && g.cmHistory.undo === l.cmHistory.undo && g.cmHistory.redo === l.cmHistory.redo)
                                return g.nextChange = l.nextChange,
                                l.snap && (g.snap = l.snap),
                                void (t && e.stackIndex--);
                            e.stack.push(l),
                            t || e.stackIndex++
                        }
                    } else
                        l.type = r.HISTORY.TYPE.COMMON,
                        s = {
                            add: !0,
                            replace: !1,
                            direct: 0
                        },
                        m = e.snapshot(),
                        !t && g && g.type === r.HISTORY.TYPE.COMMON && (s = e.canSave(m, g.snap)),
                        (s.add || s.replace) && (m.direct = s.direct,
                        e.stackIndex >= 0 && e.stack.splice(e.stackIndex, e.stack.length - e.stackIndex),
                        s.add ? (l.snap = m,
                        e.stack.push(l),
                        t || e.stackIndex++) : s.replace && (p = g.snap,
                        m.focus.startOffset = p.focus.startOffset,
                        g.snap = m));
                    e.stack.length > d && (e.stack.shift(),
                    e.stackIndex--),
                    e.applyCallback()
                }
            }
            ,
            this.snapshot = function() {
                var e = n.doc.getSelection()
                  , t = n.body.innerHTML
                  , r = {
                    isCollapsed: !0,
                    start: [],
                    end: [],
                    lastChar: null ,
                    startOffset: -1
                }
                  , o = {
                    content: t,
                    focus: r
                }
                  , i = s.getRange();
                return i ? (r.start = l.getIndexList(i.startContainer),
                r.start.push(i.startOffset),
                r.isCollapsed = e.isCollapsed,
                e.isCollapsed ? 3 === i.startContainer.nodeType && i.startOffset > 0 && (r.lastChar = i.startContainer.nodeValue.charAt(i.startOffset - 1),
                r.startOffset = i.startOffset) : (r.end = l.getIndexList(i.endContainer),
                r.end.push(i.endOffset)),
                o) : (r.start.push(0),
                o)
            }
            ,
            this.start = function(t, n) {
                t && t > 0 && (d = t),
                e.enable = !0,
                f.bind(),
                e.addCallback(n)
            }
            ,
            this.stop = function() {
                e.enable = !1,
                e.init(),
                f.unbind()
            }
            ,
            this.undo = function() {
                if (!e.enable || e.stackIndex <= 0 || 0 === e.stack.length)
                    return void (e.stackIndex = 0);
                e.stackIndex >= e.stack.length && e.saveSnap(!0);
                var t = e.stack[--e.stackIndex];
                t.nextChange.type === r.HISTORY.TYPE.CODE_MIRROR ? e.restoreCodeMirror("undo", t) : (u(),
                e.restoreSnap(t.snap)),
                n.event.call(r.EVENT.AFTER_RESTORE_HISTORY, {
                    type: t.nextChange.type
                }),
                e.applyCallback(),
                t.type === r.HISTORY.TYPE.COMMON && l.focus()
            }
        }
        ;
        t.exports = l
    }
    , {
        "../config/const": 51,
        "../libs/utils": 59
    }],
    11: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = function() {
            var e = null 
              , t = null 
              , n = null 
              , o = null 
              , i = null 
              , a = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.commandExtend,
                o = e.require.domUtils,
                i = e.require.historyUtils,
                a = e.require.rangeUtils
            }
            ;
            var l = {
                bind: function() {
                    l.unbind(),
                    t.event.add(r.EVENT.ON_KEY_DOWN, l.handler.onKeyDown)
                },
                unbind: function() {
                    t.event.remove(r.EVENT.ON_KEY_DOWN, l.handler.onKeyDown)
                },
                handler: {
                    onKeyDown: function(e) {
                        var n = e.keyCode || e.which
                          , l = void 0
                          , s = void 0
                          , d = void 0
                          , c = void 0
                          , u = void 0
                          , f = void 0;
                        if (32 === n || 13 === n) {
                            for (i.saveSnap(!1),
                            c = a.getRange(),
                            c = c.cloneRange(),
                            l = c.startContainer; 1 === l.nodeType && c.startOffset > 0 && (l = c.startContainer.childNodes[c.startOffset - 1]); )
                                c.setStart(l, o.getEndOffset(l)),
                                c.collapse(!0),
                                l = c.startContainer;
                            do {
                                if (0 === c.startOffset) {
                                    for (l = c.startContainer.previousSibling; l && 1 === l.nodeType; )
                                        l = l.lastChild;
                                    if (!l || o.isFillChar(l, !1))
                                        break;
                                    u = l.nodeValue.length
                                } else
                                    l = c.startContainer,
                                    u = c.startOffset;
                                c.setStart(l, u - 1),
                                f = c.toString().charCodeAt(0)
                            } while (160 !== f && 32 !== f);if (c.toString().replace(r.FILL_CHAR_REG, "").match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
                                for (; c.toString().length && !/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(c.toString()); )
                                    try {
                                        c.setStart(c.startContainer, c.startOffset + 1)
                                    } catch (e) {
                                        for (l = c.startContainer; !(s = l.nextSibling); ) {
                                            if (o.isBody(l))
                                                return;
                                            l = l.parentNode
                                        }
                                        c.setStart(s, 0)
                                    }
                                if (o.getParentByTagName(c.startContainer, "a", !0, null ))
                                    return;
                                var g = t.doc.createElement("a")
                                  , m = t.doc.createTextNode(" ")
                                  , p = void 0
                                  , h = c.extractContents();
                                g.href = h.textContent,
                                g.appendChild(t.doc.createTextNode(h.textContent)),
                                p = g.getAttribute("href").replace(r.FILL_CHAR_REG, ""),
                                p = /^(?:https?:\/\/)/gi.test(p) ? p : "http://" + p,
                                g.href = p,
                                c.insertNode(g),
                                g.parentNode.insertBefore(m, g.nextSibling),
                                c.setStart(m, 0),
                                c.collapse(!0),
                                d = t.doc.getSelection(),
                                d.removeAllRanges(),
                                d.addRange(c)
                            }
                        }
                    }
                }
            }
              , s = function() {
                var e = a.getRange()
                  , t = void 0
                  , n = void 0
                  , r = void 0
                  , i = void 0;
                e && (t = d(e.startContainer, e.startOffset),
                t ? n = 0 : (t = e.startContainer,
                n = e.startOffset),
                e.collapsed ? (r = t,
                i = o.getEndOffset(t)) : (r = d(e.endContainer, e.endOffset),
                r ? i = o.getEndOffset(r) : (r = e.endContainer,
                i = e.endOffset)),
                a.setRange(t, n, r, i))
            }
              , d = function(e, t) {
                return 1 === e.nodeType && e.childNodes.length > t && (e = e.childNodes[t]),
                o.getParentByTagName(e, "a", !0)
            }
            ;
            this.off = function() {
                l.unbind()
            }
            ,
            this.on = function() {
                t.options.reader.type !== r.NOTE_READER_TYPE.MARKDOWN && l.bind()
            }
            ,
            this.getCurrentLink = function() {
                var e = a.getRange();
                if (!e)
                    return "";
                var t = o.getParentByTagName(e.startContainer, "a", !0);
                return t ? t.href : ""
            }
            ,
            this.removeSelectedLink = function() {
                s(),
                i.saveSnap(!1),
                n.execCommand("unlink", !1, !1)
            }
            ,
            this.setCurrentLink = function(e) {
                e && (s(),
                i.saveSnap(!1),
                n.execCommand("createLink", !1, e))
            }
        }
        ;
        t.exports = o
    }
    , {
        "../config/const": 51
    }],
    12: [function(e, t, n) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
         : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , o = e("../config/const")
          , i = e("../libs/utils")
          , a = e("../libs/Markdown.Converter")
          , l = e("../libs/Markdown.Extra")
          , s = e("../common/MathJaxRender")
          , d = e("../libs/dependLoader")
          , c = e("../libs/LoadController")
          , u = e("../libs/xssUtils")
          , f = new c
          , g = "#wizToc"
          , m = function(e) {
            var t = this;
            e = e || {};
            var n = null 
              , c = null 
              , m = null 
              , p = null 
              , h = null 
              , v = void 0
              , b = void 0
              , C = void 0
              , E = void 0;
            this.initCore = function(r) {
                n = r,
                c = n.env,
                m = n.require.codeCore,
                p = n.require.codeUtils,
                h = n.require.domUtils,
                t.init(),
                S = new s(e),
                S.initCore(n)
            }
            ;
            var T = !1
              , S = void 0
              , y = ""
              , A = !1
              , N = function() {
                v.prettyPrint(),
                L.tocRender(),
                L.flowRender(),
                L.sequenceRender()
            }
              , _ = function() {
                var e = b.createElement("span");
                e.innerHTML = "<math>a</math>",
                e.style.opacity = "0",
                C.appendChild(e);
                var t = e.innerText;
                if (h.remove(e),
                !t)
                    for (var n = b.getElementsByTagName("math"), r = void 0, o = void 0, i = void 0; n.length > 0; )
                        r = n[0],
                        o = r.parentNode,
                        i = b.createElement("span"),
                        i.innerText = r.textContent,
                        o.insertBefore(i, r),
                        o.removeChild(r)
            }
              , O = function(e) {
                f.addCallback(e),
                f.loading || (v.$ && v.Diagram && v.flowchart ? f.callback() : (f.loading = !0,
                d.loadJs(b, d.getDependencyFiles(c.dependency, "js", "markdown"), function() {
                    f.loading = !1,
                    f.callback()
                })))
            }
              , D = function(e) {
                d.loadCss(b, d.getDependencyFiles(c.dependency, "css", "markdown")),
                L.markdownConvert(),
                N(),
                m.on({
                    body: C,
                    readOnly: !0
                }, function() {
                    c.options.reader.callback.markdown && c.options.reader.callback.markdown(),
                    T ? S.do({
                        container: C
                    }, e) : e()
                })
            }
              , L = {
                getBodyTxt: function(e) {
                    _();
                    var t = e.innerText;
                    return t || (t = h.getInnerText(e)),
                    t = t.replace(String.fromCharCode(65279), ""),
                    t.replace(/\u00a0/g, " ")
                },
                markdownConvert: function() {
                    var e = /(\$\$?|\\(?:begin|end){[a-z]*\*?}|\\[\\{}$]|[{}]|(?:\n\s*)+|@@\d+@@)/i
                      , n = void 0
                      , r = void 0
                      , i = void 0
                      , s = void 0
                      , d = void 0
                      , u = void 0
                      , f = !1
                      , g = v.$(C);
                    g.addClass(o.CLASS.MARKDOWN_BODY);
                    var m = new a.Converter({
                        nonAsciiLetters: !0,
                        asteriskIntraWordEmphasis: !0,
                        imgSrcFilter: function(e) {
                            return c.options.reader.markdownPlugIn.imgSrcFilter ? c.options.reader.markdownPlugIn.imgSrcFilter(e) : e
                        },
                        customBlockGamut: function(e) {
                            return c.options.reader.markdownPlugIn.customBlockGamut ? c.options.reader.markdownPlugIn.customBlockGamut(e) : e
                        }
                    })
                      , p = function(e) {
                        return e = e.replace(/@@(\d+)@@/g, function(e, t) {
                            return d[t]
                        }),
                        d = null ,
                        e
                    }
                      , h = function(e, t) {
                        var o = s.slice(e, t + 1).join("");
                        if (!o.match(/`/i)) {
                            for (o = o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); t > e; )
                                s[t] = "",
                                t--;
                            s[e] = "@@" + d.length + "@@",
                            d.push(o)
                        }
                        n = r = i = null 
                    }
                      , b = function(t) {
                        n = r = i = null ,
                        d = [],
                        s = t.replace(/\r\n?/g, "\n").split(e);
                        for (var o = void 0, a = 1, l = s.length; a < l; a += 2)
                            o = s[a],
                            f && o.match(/[\n`]/) ? n = r = i = null  : "@" === o.charAt(0) ? (s[a] = "@@" + d.length + "@@",
                            d.push(o)) : n ? o === r ? u ? i = a : h(n, a) : o.match(/\n.*\n/) ? (i && (a = i,
                            h(n, a)),
                            n = r = i = null ,
                            u = 0) : "{" === o ? u++ : "}" === o && u && u-- : /^\$\$?$/.test(o) ? (f = o.length < 2,
                            n = a,
                            r = o,
                            u = 0) : "begin" === o.substr(1, 5) && (n = a,
                            r = "\\end" + o.substr(6),
                            u = 0);
                        return i && h(n, i),
                        s.join("")
                    }
                    ;
                    try {
                        var E = void 0;
                        A ? E = y : (y = C.innerHTML,
                        E = t.getMarkdownSrc(C)),
                        E = L.tocReady(E);
                        var S = /^```/gm
                          , N = E.match(S);
                        N = N ? N.length / 2 : 0,
                        l.init(m, {
                            extensions: "all",
                            highlighter: N > 50 ? "prettify" : "codeMirror"
                        });
                        var _ = E.replace(/\n/g, "\\n").replace(/\r\n?/g, "\n").replace(/```(.*\n)+?```/gm, "");
                        T = /(\$\$?)[^$\n]+\1/.test(_),
                        T && (E = b(E)),
                        E = m.makeHtml(E),
                        T && (E = p(E)),
                        E = L.xssFilter(E),
                        g[0].innerHTML = E
                    } catch (e) {
                        console.error(e)
                    }
                },
                markdownPreProcess: function(e) {
                    i.forEach(e.querySelectorAll(".wiz-table-container"), function(e) {
                        var t = b.createElement("span");
                        t.appendChild(b.createTextNode(e.outerHTML)),
                        e.parentNode.insertBefore(t, e),
                        e.parentNode.insertBefore(b.createElement("br"), e),
                        e.parentNode.removeChild(e)
                    }),
                    i.forEach(e.querySelectorAll("label.wiz-todo-label"), function(e) {
                        var t = e.querySelector(".wiz-todo-img");
                        if (t) {
                            var n = b.createElement("span");
                            n.appendChild(b.createTextNode(e.outerHTML)),
                            e.parentNode.insertBefore(n, e),
                            e.parentNode.removeChild(e)
                        }
                    }),
                    i.forEach(e.querySelectorAll(".wiz-todo-layer"), function(e) {
                        var t = e.querySelector(".wiz-todo-checkbox");
                        if (t) {
                            var n = b.createElement("span");
                            n.appendChild(b.createTextNode(e.outerHTML)),
                            e.parentNode.insertBefore(n, e),
                            e.parentNode.removeChild(e)
                        }
                    }),
                    i.forEach(e.querySelectorAll("a"), function(e) {
                        var t = e.getAttribute("href");
                        if (t && (/^(wiz|wiznote):/.test(t) || e.childElementCount > 0)) {
                            var n = b.createElement("span");
                            n.appendChild(b.createTextNode(e.outerHTML)),
                            e.parentNode.insertBefore(n, e),
                            e.parentNode.removeChild(e)
                        }
                    }),
                    i.forEach(e.querySelectorAll("img"), function(e) {
                        var t = b.createElement("span");
                        t.appendChild(b.createTextNode(e.outerHTML)),
                        e.parentNode.insertBefore(t, e),
                        e.parentNode.removeChild(e)
                    }),
                    i.forEach(e.querySelectorAll("p"), function(e) {
                        var t = b.createElement("div");
                        for (e.parentNode.insertBefore(t, e); e.firstChild; )
                            t.appendChild(e.firstChild);
                        e.parentNode.removeChild(e)
                    })
                },
                tocReady: function(e) {
                    return e.replace(/(^[ ]*)\[toc]([ ]*(\n|$))/gim, "$1[](" + g + ")$2")
                },
                tocRender: function() {
                    var e = {}
                      , t = []
                      , n = 6;
                    v.$("h1,h2,h3,h4,h5,h6", C).each(function(e, t) {
                        var r = parseInt(t.tagName.charAt(1), 10);
                        n = Math.min(n, r)
                    }),
                    v.$("h1,h2,h3,h4,h5,h6", C).each(function(r, o) {
                        var i = (o.textContent || o.innerText).replace(/[()<> '"]/g, "");
                        e[i] ? (++e[i],
                        i += "-" + e[i]) : e[i] = 1;
                        var a = parseInt(o.tagName.charAt(1), 10)
                          , l = v.$(o);
                        l.attr("id", i),
                        t.push('<a class="wiz_toc h' + (a - n + 1) + '" href="#' + i + '">' + l.text() + "</a>")
                    }),
                    t = '<div class="wiz_toc_layer">' + t.join("<br/>") + "</div>",
                    v.$("a", C).each(function(e, n) {
                        n = v.$(n),
                        n.attr("href") === g && n.before(t)
                    })
                },
                flowRender: function() {
                    var e = v.$(".language-flow", C).parents("pre");
                    e.each(function(e, t) {
                        var n = "wiz-flow-" + e
                          , r = v.$("textarea", t).val();
                        if (r.length > 0)
                            try {
                                t.style.display = "none";
                                var o = v.flowchart.parse(r)
                                  , i = b.createElement("div");
                                if (i.id = n,
                                t.parentNode.insertBefore(i, t),
                                o.drawSVG(n),
                                c.client.type.isPhone) {
                                    var a = v.$("svg", i);
                                    a.attr("width") && a.css({
                                        "max-width": a.attr("width")
                                    }).attr({
                                        height: null ,
                                        width: "95%"
                                    })
                                }
                            } catch (e) {
                                console.error(e)
                            }
                    })
                },
                sequenceRender: function() {
                    var e = function(e) {
                        e.each(function(e, t) {
                            var n = "wiz-sequence-" + e
                              , r = v.$("textarea", t).val();
                            if (r.length > 0)
                                try {
                                    t.style.display = "none";
                                    var o = v.Diagram.parse(r)
                                      , i = b.createElement("div");
                                    if (i.id = n,
                                    t.parentNode.insertBefore(i, t),
                                    o.drawSVG(n, {
                                        theme: "simple"
                                    }),
                                    c.client.type.isPhone) {
                                        var a = v.$("svg", i);
                                        a.attr("width") && (a.get(0).setAttribute("viewBox", "0 0 " + a.attr("width") + " " + a.attr("height")),
                                        a.css({
                                            "max-width": a.attr("width")
                                        }).attr({
                                            preserveAspectRatio: "xMidYMid meet",
                                            height: null ,
                                            width: "95%"
                                        }))
                                    }
                                } catch (e) {
                                    console.error(e)
                                }
                        })
                    }
                      , t = v.$(".language-sequence", C).parents("pre");
                    e(t),
                    t = v.$(".language-seq", C).parents("pre"),
                    e(t)
                },
                xssFilter: u.xssFilter
            };
            this.getMarkdownSrcForEditor = function(e) {
                p.saveToText(),
                e = e || {};
                var n = void 0
                  , r = void 0;
                r = c.readonly ? y.replace(/\n/g, "<div><br/></div>") : c.body.innerHTML;
                var i = c.doc.createElement("div");
                e.unEscapeHtml || (r = r.replace(/&/g, "&amp;")),
                i.innerHTML = r,
                h.html2Markdown(i, {
                    noPureLink: !0
                }),
                h.css(i, {
                    opacity: 0,
                    position: "absolute",
                    top: "-9999px",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden"
                }),
                c.body.appendChild(i),
                p.clearCodeForMarkdown(i);
                for (var a = i.querySelectorAll(o.TAG.TMP_TAG), l = a.length - 1; l >= 0; l--)
                    h.remove(a[l]);
                return n = t.getMarkdownSrc(i),
                n = h.restoreImgPath(n),
                c.body.removeChild(i),
                i = null ,
                n
            }
            ,
            this.getMarkdownSrc = function(e) {
                var t = e ? e : C;
                return L.markdownPreProcess(t),
                L.getBodyTxt(t)
            }
            ,
            this.do = function(e, t) {
                e.container && (C = e.container),
                "string" == typeof e.markdownSrc ? (y = e.markdownSrc,
                A = !0) : (y = "",
                A = !1);
                var n = function() {
                    h.addClass(C, o.CLASS.READONLY);
                    var e = c.options.reader.timeout.markdown;
                    t = t || E;
                    var n = !1
                      , i = function() {
                        t && /^function$/i.test("undefined" == typeof t ? "undefined" : r(t)) && !n && (t(),
                        n = !0)
                    }
                    ;
                    setTimeout(i, e),
                    D(function() {
                        i()
                    })
                }
                ;
                O(n)
            }
            ,
            this.init = function() {
                v = e.win || c.win,
                b = e.doc || c.doc,
                C = e.container || c.body,
                E = e.callback
            }
        }
        ;
        t.exports = m
    }
    , {
        "../common/MathJaxRender": 13,
        "../config/const": 51,
        "../libs/LoadController": 53,
        "../libs/Markdown.Converter": 54,
        "../libs/Markdown.Extra": 55,
        "../libs/dependLoader": 57,
        "../libs/utils": 59,
        "../libs/xssUtils": 61
    }],
    13: [function(e, t, n) {
        "use strict";
        var r = e("../libs/dependLoader")
          , o = e("../libs/scriptLoader")
          , i = e("../libs/LoadController")
          , a = new i
          , l = 'MathJax.Hub.Config({\n  skipStartupTypeset: true,\n  "HTML-CSS": {\n      preferredFont: "TeX",\n      availableFonts: [\n          "STIX",\n          "TeX"\n      ],\n      linebreaks: {\n          automatic: true\n      },\n      EqnChunk: 10,\n      imageFont: null\n  },\n  SVG: { linebreaks: { automatic: true } },\n  tex2jax: {\n      inlineMath: [["$","$"],["\\\\\\\\(","\\\\\\\\)"]],\n      displayMath: [["$$","$$"],["\\\\[","\\\\]"]],\n      processEscapes: true },\n  TeX: {\n      equationNumbers: {\n          autoNumber: "AMS"\n      },\n      noUndefined: {\n          attributes: {\n              mathcolor: "red",\n              mathbackground: "#FFEEEE",\n              mathsize: "90%"\n          }\n      },\n      Safe: {\n          allow: {\n              URLs: "safe",\n              classes: "safe",\n              cssIDs: "safe",\n              styles: "safe",\n              fontsize: "all"\n          }\n      }\n  },\n  messageStyle: "none"\n});'
          , s = function(e) {
            var t = this;
            e = e || {};
            var n = null 
              , i = null 
              , s = null 
              , d = void 0
              , c = void 0
              , u = void 0
              , f = void 0;
            this.initCore = function(e) {
                n = e,
                i = n.env,
                s = n.require.domUtils,
                t.init()
            }
            ;
            var g = function(e) {
                if (a.addCallback(e),
                !a.loading) {
                    a.loading = !0,
                    o.appendJsCode(c, "MathJax = null", "text/javascript"),
                    o.appendJsCode(c, l, "text/x-mathjax-config");
                    for (var t = r.getDependencyFiles(i.dependency, "js", "mathJax"), n = 0; n < t.length; n++)
                        for (var d = t[n], u = 0; u < d.length; u++) {
                            var f = d[u];
                            if (f.indexOf("MathJax.js") > -1) {
                                var g = i.doc.getElementById("wiz_" + f);
                                g && s.remove(g)
                            }
                        }
                    r.loadJs(c, t, function() {
                        a.loading = !1,
                        a.callback()
                    })
                }
            }
              , m = function(e) {
                d.MathJax.Hub.Queue(["Typeset", d.MathJax.Hub, u, function() {
                    e()
                }
                ])
            }
            ;
            this.do = function(e, t) {
                e.container && (u = e.container);
                var n = function() {
                    var e = i.options.reader.timeout.mathJax;
                    t = t || f;
                    var n = !1
                      , r = function() {
                        t && !n && (t(),
                        n = !0)
                    }
                    ;
                    setTimeout(r, e),
                    m(function() {
                        i.options.reader.callback.mathJax && i.options.reader.callback.mathJax(),
                        r()
                    })
                }
                ;
                g(n)
            }
            ,
            this.init = function() {
                d = e.win || i.win,
                c = e.doc || i.doc,
                u = e.container || i.body,
                f = e.callback
            }
        }
        ;
        t.exports = s
    }
    , {
        "../libs/LoadController": 53,
        "../libs/dependLoader": 57,
        "../libs/scriptLoader": 58
    }],
    14: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = function() {
            var e = this
              , t = null 
              , n = null 
              , o = null 
              , i = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                o = t.require.domUtils,
                i = t.require.wizStyle
            }
            ;
            var a = "#7990b6"
              , l = "#1f2126"
              , s = "50%"
              , d = "wiz_night_mode_style"
              , c = function(e, t) {
                t[e] || /^[.|#]?[\d]+/i.test(e) || !/^[.|#]?[. \w-]+$/i.test(e) || (t[e] = "")
            }
              , u = function(e, t, n) {
                if (t) {
                    var i = t.tagName;
                    if (!/^(style|script|link|meta|img)$/gi.test(i) && !o.hasClass(t, r.CLASS.TODO_CHECKBOX) && !o.hasClass(t, r.CLASS.TODO_AVATAR)) {
                        var a = t.className;
                        if (a && a.length > 0)
                            for (var l = a.split(" "), s = 0; s < l.length; s++) {
                                var d = l[s];
                                0 !== d.length && c("." + g(d), n)
                            }
                        var u = t.id;
                        u && u.length > 0 && c("#" + g(u), n),
                        e ? c("#" + g(e) + " " + i, n) : c(g(i), n)
                    }
                }
            }
              , f = function e(t, n, r) {
                u(t, n, r);
                for (var o = n.children, i = 0; i < o.length; i++) {
                    var a = o[i];
                    e(n.id ? n.id : t, a, r)
                }
            }
              , g = function(e) {
                return e.replace(/ /g, "")
            }
            ;
            this.on = function(t, o, c) {
                t && (a = t),
                o && (l = o),
                c && (s = c),
                e.off();
                var u = {}
                  , g = [];
                f("", n.body, u);
                var m = "{color:" + a + " !important; background-color:" + l + " !important; background-image: none !important; box-shadow: none !important; border-color:" + a + " !important; }";
                for (var p in u)
                    u.hasOwnProperty(p) && g.push(p);
                var h = g.join(", ");
                h += m,
                h += "img{filter: brightness(" + s + ");-webkit-filter: brightness(" + s + ");}",
                h += r.TAG.TMP_HIGHLIGHT_TAG + "{background-color: #50a9fb !important;  color: black !important;}",
                i.insertStyle({
                    id: d,
                    name: r.NAME.TMP_STYLE
                }, h)
            }
            ,
            this.off = function() {
                var e = n.doc.getElementById(d);
                e && e.remove()
            }
        }
        ;
        t.exports = o
    }
    , {
        "../config/const": 51
    }],
    15: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = e("../libs/utils")
          , i = e("../libs/xssUtils")
          , a = function() {
            var e = this
              , t = null 
              , n = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null 
              , f = null 
              , g = null 
              , m = null 
              , p = null 
              , h = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                a = t.require.amend,
                l = t.require.amendUser,
                s = t.require.amendUtils,
                d = t.require.codeUtils,
                c = t.require.commandExtend,
                u = t.require.domUtils,
                f = t.require.historyUtils,
                g = t.require.rangeUtils,
                m = t.require.tableCore,
                p = t.require.tableUtils,
                h = t.require.tableZone
            }
            ;
            var v = function(e) {
                var t = /<body[^>]*>((\r?\n|.)*)(\r?\n)*<\/body>/gi
                  , o = /<head[^>]*>((\r?\n|.)*)(\r?\n)*<\/head>/i
                  , a = /<style[^>]*>[^<>]*<\/style>/gi
                  , l = t.exec(e)
                  , s = void 0
                  , d = void 0;
                if (l) {
                    if (s = o.exec(e),
                    e = "",
                    s)
                        for (s = s[1],
                        s = s.replace(/<!--.*?(-->)/g, ""); null  !== (d = a.exec(s)); )
                            d.index === a.lastIndex && a.lastIndex++,
                            e += d[0];
                    e += l[1]
                } else {
                    e = e.replace(/<!--.*?(-->)/g, "");
                    for (var c = [/<body( [^<>]*)?>/i, /<html( [^<>]*)?>/i], f = [/<\/body>/i, /<\/html>/i], g = 0, m = c.length; g < m; g++) {
                        var p = c[g]
                          , h = e.match(p);
                        if (h) {
                            e = e.substr(h.index + h[0].length);
                            break
                        }
                    }
                    for (var v = 0, b = f.length; v < b; v++) {
                        var C = f[v]
                          , E = e.match(C);
                        E && (e = e.substr(0, E.index))
                    }
                }
                e = e.replace(/(^(\r?\n)*)|((\r?\n)*$)/g, ""),
                e = e.replace(/\u00A0/gi, "&nbsp;");
                var T = [];
                return n.options.editor.type === r.NOTE_EDITOR_TYPE.MARKDOWN || (T = ["display", "color", "width", "font-family", "font-size", "font-style", "font-weight", "text-align", "text-indent", "background*", "text-decoration*", "padding*", "margin*", "list*", "border*"]),
                e = u.clearStyleFromHtml(e, T),
                e = i.xssFilter(e),
                /^<tr/.test(e) && (e = "<table>" + e + "</table>"),
                e
            }
              , b = function(e) {
                var t = n.doc.getSelection()
                  , r = /\n/g;
                if (e.match(r).length > 400) {
                    var i = o.txt2HTML(e, {
                        wizTableSaveDom: !1
                    });
                    c.execCommand("insertparagraph");
                    var a = g.getRange()
                      , l = n.doc.createElement("div");
                    a.insertNode(l),
                    l.innerHTML = i,
                    g.setRangeToEnd(l)
                } else
                    c.execCommand("insertText", !1, e);
                t.collapseToEnd()
            }
              , C = function(e, t) {
                var o = n.doc.createElement("div")
                  , i = void 0;
                a.isAmendEditing() ? a.readyForPaste() : (i = s.fixedAmendRange(),
                a.splitAmendDomByRange(i));
                var l = g.getRange()
                  , c = void 0
                  , f = void 0
                  , m = void 0
                  , p = void 0
                  , h = void 0
                  , v = void 0
                  , C = null ;
                if (e)
                    for (o.innerHTML = e,
                    n.options.editor.type === r.NOTE_EDITOR_TYPE.MARKDOWN && u.html2Markdown(o, {
                        noPureLink: !1
                    }),
                    d.pastePatch.ready(o),
                    c = g.getRangeDetail(l.startContainer, l.startOffset),
                    f = u.getParentByTagName(c.container, ["li", "td", "th"], !0),
                    u.isEmptyDom(f) && (g.setRange(f, 0, f, u.getEndOffset(f)),
                    l = g.getRange()); o.firstChild; )
                        l = g.getRange(),
                        c = g.getRangeDetail(l.startContainer, l.startOffset),
                        v = u.getBlockParent(c.container, !0),
                        m = u.getParentByTagName(v, ["pre"], !0),
                        m && (v = m),
                        h = o.firstChild,
                        /^h[1-6]$/i.test(v.tagName) && (h.tagName === v.tagName || 3 === h.nodeType || u.isTag(h, ["span"])) ? (p = n.doc.createElement("span"),
                        p.appendChild(n.doc.createTextNode(3 === h.nodeType ? h.nodeValue : h.innerText)),
                        l.deleteContents(),
                        l.insertNode(p),
                        o.removeChild(h),
                        h = p) : /^h[1-6]$/i.test(v.tagName) || /^h[1-6]$/i.test(h.tagName) && v !== n.body && !u.isParent(v, C) ? (p = n.doc.createElement("span"),
                        l.insertNode(p),
                        v = u.splitDomBeforeSub(v, p),
                        u.after(h, v),
                        u.isEmptyDom(v) ? u.remove(v) : u.remove(p)) : C ? u.after(h, C) : l.insertNode(h),
                        n.options.editor.type === r.NOTE_EDITOR_TYPE.MARKDOWN && (E(h),
                        h = T(h)),
                        g.setRangeToEnd(h),
                        C = h;
                else
                    b(t);
                d.pastePatch.fix()
            }
              , E = function(e) {
                var t = function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        r(n)
                    }
                }
                  , r = function(e) {
                    for (var t = {}, n = {}, r = e.querySelectorAll("img"), a = 0, l = r.length - 1; l >= 0; l--)
                        o(a++, r[l], n);
                    for (var s = e.querySelectorAll("a"), d = s.length - 1; d >= 0; d--)
                        o(a++, s[d], t);
                    e.innerText = e.innerText.trim();
                    var c = e.innerHTML;
                    e.innerHTML = i(i(c, t), n)
                }
                  , o = function(e, t, r) {
                    e = "$$_WIZ_" + (new Date).valueOf() + "_" + e + "_$$",
                    r[e] = t.outerHTML;
                    var o = n.doc.createTextNode(e);
                    u.after(o, t),
                    u.remove(t)
                }
                  , i = function(e, t) {
                    for (var n in t)
                        e = e.replace(n, t[n]);
                    return e
                }
                ;
                t(e.querySelectorAll("td")),
                t(e.querySelectorAll("th"))
            }
              , T = function(e) {
                var t = function(e) {
                    for (var t = [], r = e.length - 1; r >= 0; r--) {
                        for (var o = e[r], i = n.doc.createElement("span"); o.firstChild; )
                            i.appendChild(o.firstChild);
                        u.before(i, o),
                        u.remove(o),
                        t.push(i)
                    }
                    return t
                }
                ;
                return t(e.querySelectorAll("strong")),
                t(e.querySelectorAll("u")),
                t(e.querySelectorAll("i")),
                t(e.querySelectorAll("b")),
                u.isTag(e, ["u", "i", "b", "strong"]) && (e = t([e])[0]),
                e
            }
              , S = function(e, t) {
                var r = void 0
                  , o = void 0
                  , i = void 0
                  , c = void 0
                  , f = void 0
                  , v = void 0
                  , b = void 0
                  , E = void 0
                  , T = void 0
                  , S = void 0
                  , y = void 0
                  , A = void 0
                  , N = void 0
                  , _ = g.getRange()
                  , O = h.getZone();
                if (e ? (r = p.getTemplateByHtmlForPaste(e),
                r.isHtml = !0,
                d.pastePatch.ready(r.pasteDom, !0)) : t && !h.isSingleCell() ? (r = p.getTemplateByTxtForPaste(t),
                r.isHtml = !0) : r = {
                    isTable: !1,
                    isHtml: !1,
                    pasteDom: n.doc.createElement("div")
                },
                r.isTable) {
                    for (i = p.getTableGrid(r.pasteDom),
                    v = i.length,
                    f = i[0] ? i[0].length : 0,
                    E = O.grid.length - O.range.minY - v,
                    b = O.grid[0].length - O.range.minX - f,
                    A = E; A < 0; A++)
                        m.insertRow(!1);
                    for (y = b; y < 0; y++)
                        m.insertCol(!1);
                    O = h.getZone(),
                    e ? (S = Math.max(O.range.minY + v - 1, O.range.maxY),
                    T = Math.max(O.range.minX + f - 1, O.range.maxX)) : (S = O.range.minY + v - 1,
                    T = O.range.minX + f - 1),
                    p.eachRange(O.grid, {
                        minY: O.range.minY,
                        maxY: S,
                        minX: O.range.minX,
                        maxX: T
                    }, function(e) {
                        if (!e.fake)
                            if (N = e.cell,
                            c = i[(e.y - O.range.minY) % v][(e.x - O.range.minX) % f],
                            a.isAmendEditing()) {
                                if (g.setRange(N, 0, N.lastChild, u.getEndOffset(N.lastChild)),
                                s.removeSelection(l.getCurUser()),
                                s.removeUserDel(N, l.getCurUser()),
                                c.fake)
                                    return;
                                if (u.isEmptyDom(N))
                                    N.innerHTML = c.cell.innerHTML;
                                else
                                    for (; c.cell.firstChild; )
                                        N.appendChild(c.cell.firstChild);
                                a.fixPaste(N.firstChild, N.lastChild, l.getCurUser())
                            } else
                                N.innerHTML = c.fake ? "" : c.cell.innerHTML
                    }),
                    h.setStart(O.grid[O.range.minY][O.range.minX].cell).setEnd(O.grid[S][T].cell)
                } else
                    !_ && O.range && (o = O.grid[O.range.minY][O.range.minX].cell,
                    h.setStart(o).setEnd(o),
                    g.setRange(o, 0, o.lastChild, u.getEndOffset(o.lastChild))),
                    C(e, t)
            }
            ;
            this.paste = function(e, t) {
                e = v(e),
                e = o.replaceSpecialChar(e),
                t = o.replaceSpecialChar(t);
                var n = g.getRange()
                  , r = h.getZone();
                if ((n || r.table || r.range) && (e || t)) {
                    var i = d.getContainerFromChild(n.startContainer);
                    if (i)
                        return void d.insertCodeSrc(i, t);
                    f.saveSnap(!1),
                    r.table || r.range ? S(e, t) : C(e, t),
                    u.fixOrderList();
                    for (var a = d.oldPatch.fixOldCode(), l = 0; l < a.length; l++) {
                        var s = a[l];
                        d.fixCodeContainer({
                            container: s
                        })
                    }
                }
            }
            ,
            this.pasteForIOS = function(e) {
                e && o.stopEvent(e);
                var t = n.doc.getSelection();
                g.caretBackup(),
                t.removeAllRanges(),
                setTimeout(function() {
                    g.caretRestore(),
                    e && n.client.sendCmdToWiznote(r.CLIENT_EVENT.WizEditorPaste)
                }, 0)
            }
            ,
            this.pasteFromClient = function(t, n) {
                e.paste(t, n)
            }
            ,
            this.pasteFromClipBoard = function(t) {
                var r = t.clipboardData && t.clipboardData.items && 1 === t.clipboardData.items.length && /^image\//.test(t.clipboardData.items[0].type) ? t.clipboardData.items : null ;
                if (r && n.options.editor.callback.onPasteFile)
                    return n.options.editor.callback.onPasteFile(r),
                    o.stopEvent(t),
                    !0;
                if (d.getContainerFromChild(t.target))
                    return !1;
                if (n.client.type.isIOS)
                    return e.pasteForIOS(t),
                    !1;
                var i = t.clipboardData.getData("text/html") || ""
                  , a = t.clipboardData.getData("text/plain");
                return e.paste(i, a),
                o.stopEvent(t),
                !0
            }
        }
        ;
        t.exports = a
    }
    , {
        "../config/const": 51,
        "../libs/utils": 59,
        "../libs/xssUtils": 61
    }],
    16: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = e("../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                a = t.require.domUtils,
                i = t.require.codeUtils
            }
            ;
            var l = void 0
              , s = void 0;
            this.caretBackup = function() {
                var t = e.getRange();
                if (!t) {
                    if (s)
                        return !0;
                    if (a.focus(),
                    t = e.getRange(),
                    !t)
                        return !1
                }
                return s = e.getRange(),
                !0
            }
            ,
            this.caretFocus = function() {
                var t = e.getRange()
                  , r = t ? t.getClientRects() : null 
                  , o = r && r.length > 0 ? r[0] : null 
                  , i = n.doc.documentElement.clientHeight
                  , l = n.doc.documentElement.clientWidth
                  , s = a.getPageScroll();
                o && o.top < 0 ? a.setPageScrollTop(s.top + o.top) : o && o.top + o.height > i && a.setPageScrollTop(s.top + (o.top + o.height - i)),
                o && o.left < 0 ? a.setPageScrollLeft(s.left + o.left) : o && o.left + o.width > l && a.setPageScrollLeft(s.left + (o.left + o.width - l))
            }
            ,
            this.caretRestore = function() {
                if (!s)
                    return !1;
                var e = n.doc.getSelection();
                return 0 === e.rangeCount && a.focus(),
                e.removeAllRanges(),
                e.addRange(s),
                s = null ,
                !0
            }
            ,
            this.clearFillCharByCollapsed = function() {
                var t = e.getRange()
                  , n = void 0
                  , i = void 0
                  , a = void 0;
                if (t && t.collapsed && 3 === t.startContainer.nodeType) {
                    n = t.startContainer;
                    var l = n.nodeValue;
                    !o.isEmpty(l) && l.indexOf(r.FILL_CHAR) > -1 && (i = l.substr(0, t.startOffset),
                    a = l.substr(t.startOffset),
                    i = i.replace(r.FILL_CHAR_REG, ""),
                    a = a.replace(r.FILL_CHAR_REG, ""),
                    n.nodeValue = i + a,
                    e.setRange(n, i.length))
                }
            }
            ,
            this.fixRange = function(t) {
                var n = !t.startDom.parentNode
                  , r = !t.endDom.parentNode
                  , o = a.isSelfClosingTag(t.endDom);
                n && a.isSelfClosingTag(t.startDomBak) && (t.startDomBak = a.getNextNode(t.startDomBak, !1, t.endDomBak),
                t.startOffsetBak = 0),
                e.setRange(n ? t.startDomBak : t.startDom, n ? t.startOffsetBak : t.startOffset, r || o ? t.endDomBak : t.endDom, r || o ? t.endOffsetBak : t.endOffset)
            }
            ,
            this.fixScroll = function() {
                l && clearTimeout(l);
                var t = function() {
                    var t = void 0
                      , r = void 0
                      , o = void 0
                      , i = void 0
                      , l = e.getRange();
                    if (l && (l.collapsed || !n.client.type.isPhone && !n.client.type.isPad) && (t = e.getRangeClientRect())) {
                        r = a.getWindowSize();
                        var s = r.height
                          , d = 0;
                        n.client.type.isIOS && (s = r.height);
                        var c = 25
                          , u = a.getPageScroll();
                        o = u.top,
                        i = u.left;
                        var f = null 
                          , g = null ;
                        n.client.type.isIOS && t.top + d < 0 ? f = o + t.top + d : n.client.type.isIOS && t.top + t.height > s - d ? f = o + t.top + t.height + d - s + c : !n.client.type.isIOS && t.top < 0 ? f = o + t.top : !n.client.type.isIOS && t.top + t.height > r.height && (f = o + t.top + t.height - r.height + c),
                        t.left < i ? g = i + t.left : t.left + t.width > r.width && (g = i + t.left + t.width - r.width),
                        null  !== f && (n.doc.documentElement.scrollTop = f,
                        0 === n.doc.documentElement.scrollTop && (n.doc.body.scrollTop = f)),
                        null  !== g && (n.doc.documentElement.scrollLeft = g,
                        0 === n.doc.documentElement.scrollLeft && (n.doc.body.scrollLeft = g))
                    }
                }
                ;
                l = setTimeout(t, 30)
            }
            ,
            this.getFragmentForCopy = function() {
                var t = e.getRange()
                  , r = null ;
                return !t || t.collapsed ? r : (r = n.doc.createElement("div"),
                r.appendChild(t.cloneContents()),
                a.fragmentFilterForCopy(r),
                a.css(r, {
                    position: "absolute",
                    top: "-99999px",
                    left: "-99999px",
                    overflow: "hidden"
                }),
                n.body.appendChild(r),
                r)
            }
            ,
            this.getRange = function() {
                var t = n.doc.getSelection();
                if (0 === t.rangeCount)
                    return null ;
                var o = t.getRangeAt(0)
                  , i = void 0;
                o.startContainer !== n.body || 0 !== o.startOffset || !o.collapsed || n.body.firstChild && !a.isTag(n.body.firstChild, r.TAG.TMP_TAG) || (i = n.doc.createElement("div"),
                i.appendChild(n.doc.createElement("br")),
                n.body.insertBefore(i, n.body.firstChild),
                e.setRange(i, 0));
                var l = e.getRangeDetail(o.startContainer, o.startOffset)
                  , s = a.getParentByClass(l.container, r.CLASS.WIZ_BODY, !0);
                return s || (o = null ),
                o
            }
            ,
            this.getRangeAnchor = function(t) {
                var n = e.getRange();
                if (!n)
                    return null ;
                var r = t ? n.startContainer : n.endContainer
                  , o = t ? n.startOffset : n.endOffset;
                return n.collapsed || t ? 3 === r.nodeType && o < r.nodeValue.length ? r : 3 === r.nodeType ? a.getNextNode(r, !1, null ) : 0 === r.childNodes.length ? r : o === r.childNodes.length ? a.getNextNode(r.childNodes[o - 1], !1, null ) : a.getFirstDeepChild(r.childNodes[o]) : 3 === r.nodeType && o > 0 ? r : 3 === r.nodeType ? a.getPreviousNode(r, !1, null ) : o > 0 ? a.getLastDeepChild(r.childNodes[o - 1]) : a.getPreviousNode(r, !1, null )
            }
            ,
            this.getRangeClientRect = function() {
                var t = e.getRange();
                if (!t)
                    return null ;
                var n = void 0
                  , r = t.getBoundingClientRect()
                  , o = void 0;
                return 0 === r.width && 0 === r.height && (n = e.getRange().getClientRects(),
                n.length > 0 && (r = n[0])),
                0 === r.width && 0 === r.height && (o = t.startContainer,
                1 === o.nodeType && (o = o.childNodes[t.startOffset === o.childNodes.length ? t.startOffset - 1 : t.startOffset],
                o.getBoundingClientRect && (r = o.getBoundingClientRect(),
                r = {
                    bottom: r.bottom,
                    height: r.height,
                    left: r.left + r.width,
                    right: r.right,
                    top: r.top,
                    width: 0
                }))),
                r
            }
            ,
            this.getRangeDetail = function(e, t) {
                var n = !1;
                return t > 0 && t === a.getEndOffset(e) ? (1 === e.nodeType && (e = a.getLastDeepChild(e.childNodes[t - 1]),
                t = a.getEndOffset(e)),
                n = !0) : 1 === e.nodeType && (0 === e.childNodes.length || t < e.childNodes.length && (e = e.childNodes[t],
                t = 0)),
                {
                    container: e,
                    offset: t,
                    isEnd: n
                }
            }
            ,
            this.getRangeDomList = function(t) {
                var n = e.getRange();
                if (!n)
                    return null ;
                var r = n.startContainer
                  , o = n.startOffset
                  , i = n.endContainer
                  , l = n.endOffset;
                return a.getListA2B({
                    startDom: r,
                    startOffset: o,
                    endDom: i,
                    endOffset: l,
                    noSplit: !!t.noSplit
                })
            }
            ,
            this.getRangeParentRoot = function() {
                var t = e.getRange()
                  , n = void 0
                  , r = void 0;
                return t ? (n = t.startContainer,
                r = t.endContainer,
                a.getParentRoot([n, r])) : null 
            }
            ,
            this.insertNode = function(t) {
                var n = e.getRange();
                if (!n)
                    return null ;
                if (n.collapsed && a.isTag(n.startContainer, "br")) {
                    var r = n.startContainer.parentNode
                      , o = a.getIndex(n.startContainer);
                    e.setRange(r, o, r, o + 1),
                    n = e.getRange()
                }
                n.insertNode(t)
            }
            ,
            this.isRangeEdge = function(t) {
                var n = {
                    isStart: !1,
                    isEnd: !1
                }
                  , r = e.getRange();
                if (r) {
                    n.isCollapsed = r.collapsed,
                    n.startDom = r.startContainer,
                    n.startOffset = r.startOffset,
                    n.endDom = r.endContainer,
                    n.endOffset = r.endOffset;
                    var o = void 0
                      , i = void 0;
                    return 1 === n.startDom.nodeType && n.startOffset < n.startDom.childNodes.length ? o = a.getFirstDeepChild(n.startDom.childNodes[n.startOffset]) : 1 === n.startDom.nodeType && (o = a.getNextNode(n.startDom.childNodes[n.startOffset - 1], !1, null )),
                    1 === n.endDom.nodeType && n.endOffset > 0 ? i = a.getLastDeepChild(n.endDom.childNodes[n.endOffset - 1]) : 1 === n.endDom.nodeType && (i = a.getPreviousNode(n.endDom, !1, null )),
                    n.isStart = n.startDom === t || n.startDom === o,
                    n.isEnd = n.endDom === t || n.endDom === i,
                    n
                }
            }
            ,
            this.modifyCaretStyle = function(t, o) {
                var i = n.doc.getSelection()
                  , l = i.focusNode
                  , s = void 0
                  , d = void 0
                  , c = void 0
                  , u = !0
                  , f = void 0;
                3 === l.nodeType && (l = l.parentNode);
                for (d in t)
                    t.hasOwnProperty(d) && "string" == typeof d && (c = t[d],
                    l.style[d] !== c && (u = !1));
                if (!u) {
                    a.isTag(l, "span") && a.isEmptyDom(l) ? (a.modifyStyle(l, t, o),
                    f = l) : (s = i.getRangeAt(0),
                    s.deleteContents(),
                    f = a.createSpan(),
                    f.innerHTML = r.FILL_CHAR,
                    s.insertNode(f),
                    a.modifyStyle(f, t, o));
                    var g = l.parentNode ? l.parentNode : l;
                    a.clearChild(g, [f]),
                    e.setRange(f.childNodes[0], 1, f.childNodes[0], 1)
                }
            }
            ,
            this.modifyRangeStyle = function(t, n) {
                var r = void 0
                  , o = void 0
                  , l = void 0;
                if (r = e.getRangeDomList({
                    noSplit: !1
                })) {
                    o = [];
                    var s = !0
                      , d = !1
                      , c = void 0;
                    try {
                        for (var u, f = r.list[Symbol.iterator](); !(s = (u = f.next()).done); s = !0) {
                            var g = u.value
                              , m = i.getContainerFromChild(g);
                            m || o.push(g)
                        }
                    } catch (e) {
                        d = !0,
                        c = e
                    } finally {
                        try {
                            !s && f.return && f.return()
                        } finally {
                            if (d)
                                throw c
                        }
                    }
                    l = o.length,
                    0 !== l && (a.modifyNodesStyleAndClear(o, t, n, [r.startDomBak, r.endDomBak]),
                    e.fixRange(r))
                }
            }
            ,
            this.modifySelectionDom = function(t, n) {
                var r = e.getRange();
                return !!r && (r.collapsed ? e.modifyCaretStyle(t, n) : e.modifyRangeStyle(t, n),
                !0)
            }
            ,
            this.moveToPoint = function(t, r) {
                var o = void 0
                  , i = void 0
                  , a = void 0;
                n.doc.caretPositionFromPoint ? (o = n.doc.caretPositionFromPoint(t, r),
                i = o.offsetNode,
                a = o.offset) : n.doc.caretRangeFromPoint && (o = n.doc.caretRangeFromPoint(t, r),
                i = o.startContainer,
                a = o.startOffset),
                e.setRange(i, a)
            }
            ,
            this.selectCharIncludeFillChar = function(t) {
                var o = n.doc.getSelection()
                  , i = o.getRangeAt(0)
                  , l = t ? "backward" : "forward"
                  , s = void 0
                  , d = void 0
                  , c = void 0
                  , u = void 0;
                if (1 === i.startContainer.nodeType) {
                    if (s = e.getRangeAnchor(!1),
                    i.startContainer === s && a.isTag(s, "br") && a.isEmptyDom(s.parentNode))
                        return void (s.parentNode.nextSibling ? e.setRange(s.parentNode, 0, s.parentNode.nextSibling, 0) : (o.modify("move", "forward", "character"),
                        o.modify("extend", "backward", "character"),
                        s.nextSibling && o.modify("extend", "backward", "character")));
                    a.isTag(s, "br") && o.modify("extend", l, "character")
                }
                o.modify("extend", l, "character"),
                i = o.getRangeAt(0),
                u = i.toString(),
                s = e.getRangeAnchor(t),
                s && (d = t && s === i.startContainer ? i.startOffset : t || s !== i.endContainer ? -1 : i.endOffset,
                c = 3 === s.nodeType && d > 0 && d < s.nodeValue.length ? s : t ? a.getPreviousNode(s, !1, null ) : a.getNextNode(s, !1, null ),
                0 === u.length ? s && !a.isSelfClosingTag(s) && c && (1 !== c.nodeType || 1 === c.nodeType && a.isSelfClosingTag(c)) && o.modify("extend", l, "character") : u.indexOf(r.FILL_CHAR) > -1 && "" === u.replace(r.FILL_CHAR_REG, "") && o.modify("extend", l, "character"))
            }
            ,
            this.setRange = function(e, t, r, o) {
                if (e || r) {
                    var i = a.getEndOffset(e)
                      , l = a.getEndOffset(r);
                    t < 0 ? t = 0 : t > i && (t = i),
                    o < 0 ? o = a.getEndOffset(r) : o > l && (o = l);
                    var s = n.doc.getSelection();
                    e || (e = n.body,
                    t = 0);
                    var d = void 0;
                    0 === s.rangeCount && (d = n.doc.createRange(),
                    d.selectNode(e),
                    s.addRange(d)),
                    s.collapse(e, t),
                    r && s.extend(r, o)
                }
            }
            ,
            this.setRangeToEnd = function(t) {
                var n = t
                  , r = a.getEndOffset(t);
                a.isSelfClosingTag(n) && (n = n.parentNode,
                r = a.getIndex(t) + 1),
                e.setRange(n, r)
            }
        }
        ;
        t.exports = i
    }
    , {
        "../config/const": 51,
        "../libs/utils": 59
    }],
    17: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = {
            active: "active",
            selected: "selected"
        }
          , i = function() {
            var e = null 
              , t = null 
              , n = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.domUtils
            }
            ;
            var i = {
                bind: function() {
                    i.unbind(),
                    t.event.add(r.EVENT.ON_MOUSE_DOWN, i.handler.onMouseDown)
                },
                unbind: function() {
                    t.event.remove(r.EVENT.ON_MOUSE_DOWN, i.handler.onMouseDown)
                },
                handler: {
                    onMouseDown: function(e) {
                        var t = e.target
                          , n = a.getHeaderFromDom(t);
                        if (n)
                            return void a.showOptions(n);
                        var r = a.getOptionFromDom(t);
                        r && a.selectOption(r);
                        var o = a.getContainerFromDom(t);
                        o || a.hideOptions()
                    }
                }
            }
              , a = {
                getContainerFromDom: function(e) {
                    return n.getParentByClass(e, r.CLASS.SELECT_PLUGIN_CONTAINER, !0)
                },
                getHeaderFromDom: function(e) {
                    return n.getParentByClass(e, r.CLASS.SELECT_PLUGIN_HEADER, !0)
                },
                getHeaderText: function(e) {
                    return e.querySelector("." + r.CLASS.SELECT_PLUGIN_HEADER_TEXT)
                },
                getOptionFromDom: function(e) {
                    return n.getParentByClass(e, r.CLASS.SELECT_PLUGIN_OPTIONS_ITEM, !0)
                },
                hideOptions: function(e) {
                    var i = void 0;
                    i = e ? [e] : t.body.querySelectorAll("." + r.CLASS.SELECT_PLUGIN_CONTAINER + "." + o.active);
                    for (var a = i.length - 1; a >= 0; a--)
                        n.removeClass(i[a], o.active)
                },
                selectOption: function(e) {
                    var i = a.getContainerFromDom(e);
                    if (i) {
                        var l = i.querySelectorAll("." + r.CLASS.SELECT_PLUGIN_OPTIONS_ITEM + "." + o.selected);
                        if (l !== e) {
                            i.value = e.getAttribute("value"),
                            n.removeClass(l, o.selected),
                            n.addClass(e, o.selected);
                            var s = a.getHeaderText(i);
                            s.textContent = e.textContent,
                            a.hideOptions(i),
                            t.event.call(r.EVENT.ON_SELECT_PLUGIN_CHANGE, i)
                        }
                    }
                },
                showOptions: function(e) {
                    var t = a.getContainerFromDom(e);
                    return n.hasClass(t, o.active) ? void a.hideOptions(t) : (a.hideOptions(),
                    void n.addClass(t, o.active))
                }
            };
            this.on = function() {
                i.bind()
            }
            ,
            this.off = function() {
                i.unbind()
            }
            ,
            this.create = function(e, i, a) {
                var l = t.doc.createElement("div")
                  , s = t.doc.createElement("div")
                  , d = t.doc.createElement("span")
                  , c = t.doc.createElement("i")
                  , u = t.doc.createElement("ul");
                s.appendChild(d),
                s.appendChild(c),
                l.appendChild(s),
                l.appendChild(u);
                for (var f = 0, g = e.length; f < g; f++) {
                    var m = e[f].text
                      , p = e[f].value
                      , h = t.doc.createElement("li");
                    h.textContent = m,
                    n.attr(h, {
                        value: p,
                        "data-index": f
                    }),
                    p === a && (d.textContent = m,
                    l.value = p,
                    n.addClass(h, o.selected)),
                    n.addClass(h, r.CLASS.SELECT_PLUGIN_OPTIONS_ITEM),
                    u.appendChild(h)
                }
                return n.addClass(c, "icon-down_arrow editor-icon"),
                n.addClass(d, r.CLASS.SELECT_PLUGIN_HEADER_TEXT),
                n.addClass(s, r.CLASS.SELECT_PLUGIN_HEADER),
                n.addClass(u, r.CLASS.SELECT_PLUGIN_OPTIONS),
                n.addClass(l, r.CLASS.SELECT_PLUGIN_CONTAINER + " " + i),
                n.attr(l, {
                    onselectstart: "return false;"
                }),
                l
            }
            ,
            this.destory = function() {}
        }
        ;
        t.exports = i
    }
    , {
        "../config/const": 51
    }],
    18: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = e("../libs/utils")
          , i = function() {
            var e = null 
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.commandExtend,
                i = e.require.domUtils,
                a = e.require.historyUtils,
                l = e.require.rangeUtils,
                s = e.require.tableZone,
                d = e.require.todoUtils
            }
            ;
            var c = "&nbsp; &nbsp;&nbsp;"
              , u = function(e) {
                var r = l.getRange()
                  , o = s.getZone();
                if (!r || o.range)
                    return !1;
                if (e)
                    return a.saveSnap(!1),
                    t.client.type.isMac ? setTimeout(function() {
                        n.execCommand("outdent")
                    }, 10) : n.execCommand("outdent"),
                    !0;
                var u = r.startContainer
                  , f = r.startOffset
                  , g = l.getRangeDetail(u, f)
                  , m = i.isTag(u, ["ul", "ol", "li"])
                  , p = d.isCaretAfterCheckbox()
                  , h = i.getParentByTagName(u, ["ul", "ol", "li"], !1)
                  , v = !1
                  , b = g.container;
                if (h && 0 === g.offset)
                    for (; b !== t.body; ) {
                        if (b.previousSibling) {
                            v = !1;
                            break
                        }
                        if (v = !0,
                        b = b.parentNode,
                        b === h)
                            break
                    }
                return !i.isTag(u, ["td", "th"]) && (!r.collapsed || p || v || m ? (a.saveSnap(!1),
                t.client.type.isMac ? setTimeout(function() {
                    n.execCommand("indent")
                }, 10) : n.execCommand("indent"),
                !0) : !(3 !== u.nodeType && !i.getParentByTagName(u, ["a", "b", "body", "div", "font", "html", "i", "p", "span", "strong", "u"])) && (a.saveSnap(!1),
                n.execCommand("insertHTML", !1, c),
                !0))
            }
              , f = {
                bind: function() {
                    f.unbind(),
                    t.event.add(r.EVENT.ON_KEY_DOWN, f.handler.onKeyDown)
                },
                unbind: function() {
                    t.event.remove(r.EVENT.ON_KEY_DOWN, f.handler.onKeyDown)
                },
                handler: {
                    onKeyDown: function(e) {
                        var t = e.keyCode || e.which;
                        9 === t && u(e.shiftKey) && o.stopEvent(e)
                    }
                }
            };
            this.init = function(e) {
                c = e
            }
            ,
            this.on = function() {
                f.bind()
            }
            ,
            this.off = function() {
                f.unbind()
            }
        }
        ;
        t.exports = i
    }
    , {
        "../config/const": 51,
        "../libs/utils": 59
    }],
    19: [function(e, t, n) {
        "use strict";
        var r = e("../config/const")
          , o = {
            iosPhone: "." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " {overflow-y:scroll;-webkit-overflow-scrolling: touch;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + "[contenteditable=true], .wiz-template-editable {padding-bottom: 44px !important;}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " td,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th {position:static;}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th:before,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " td:before,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th:after,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " td:after {display:none;}",
            iosPad: "." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " {min-width: 90%;max-width: 100%;min-height: 100%;background: #ffffff;overflow-y:scroll;-webkit-overflow-scrolling: touch;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + "[contenteditable=true], .wiz-template-editable {padding-bottom: 44px !important;}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " td,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th {position:static;}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th:before,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " td:before,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th:after,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " td:after {display:none;}",
            imageResize: ".wiz-img-resize-handle {position: absolute;z-index: 1000;border: 1px solid black;background-color: white;}.wiz-img-resize-handle {width:5px;height:5px;}.wiz-img-resize-handle.lt {cursor: nw-resize;}.wiz-img-resize-handle.tm {cursor: n-resize;}.wiz-img-resize-handle.rt {cursor: ne-resize;}.wiz-img-resize-handle.lm {cursor: w-resize;}.wiz-img-resize-handle.rm {cursor: e-resize;}.wiz-img-resize-handle.lb {cursor: sw-resize;}.wiz-img-resize-handle.bm {cursor: s-resize;}.wiz-img-resize-handle.rb {cursor: se-resize;}",
            selectPlugin: "." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-container {position:relative;display:inline-block;width:160px;height:28px;border-radius:4px;padding:0;margin-left:5px;cursor:pointer;}." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-container, ." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-options {box-sizing:border-box;background:white;border:1px solid #e7e7e7;color:#333;box-shadow: 1px 1px 5px #d0d0d0;}." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-header {line-height:28px;font-size:14px;padding: 0 0 0 5px;overflow:hidden;margin-right:27px;white-space:nowrap;}." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-header i {position:absolute;top:0;right:0;line-height:26px;padding:0 6px;border-left:1px solid #e7e7e7;box-sizing:border-box;}." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-options {display:none;background:white;list-style:none;padding:0px;white-space:nowrap;max-height:200px;min-width:160px;max-width:260px;overflow-x:hidden;overflow-y:auto;position:absolute;top:30px;right:-1px;}." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-options:hover .wiz-select-plugin-options-item.selected {background:white;color:inherit;}." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-options-item {font-size:11px;padding:0 5px;height:20px;line-height:20px;}." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-options-item.selected {background:#448aff;color:white;}." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-options-item:hover {background:#448aff !important;color:white !important;}." + r.CLASS.WIZ_BODY + " .wiz-select-plugin-container.active .wiz-select-plugin-options {display:block;}",
            tableInMarkdown: "." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " table tr {background-color:white;}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " table tr:nth-child(2n) {background-color:#f8f8f8;}",
            table: "." + r.CLASS.EDITING + " ." + r.CLASS.TABLE_BODY + "." + r.CLASS.TABLE_MOVING + " *, ." + r.CLASS.EDITING + " ." + r.CLASS.TABLE_BODY + "." + r.CLASS.TABLE_MOVING + " *:before, ." + r.CLASS.EDITING + " ." + r.CLASS.TABLE_BODY + "." + r.CLASS.TABLE_MOVING + " *:after {cursor:default !important;} ." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " td, ." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th {position:relative;}#wiz-table-range-border {display: none;width: 0;height: 0;position: absolute;top: 0;left: 0; z-index:" + r.CSS.Z_INDEX.tableBorder + "}#wiz-table-col-line, #wiz-table-row-line {display: none;background-color: #448aff;position: absolute;z-index:" + r.CSS.Z_INDEX.tableColRowLine + ";}#wiz-table-col-line {width: 1px;cursor:col-resize;}#wiz-table-row-line {height: 1px;cursor:row-resize;}#wiz-table-range-border_start, #wiz-table-range-border_range {display: none;width: 0;height: 0;position: absolute;}#wiz-table-range-border_start_top, #wiz-table-range-border_range_top {height: 2px;background-color: #448aff;position: absolute;top: 0;left: 0;}#wiz-table-range-border_range_top {height: 1px;}#wiz-table-range-border_start_right, #wiz-table-range-border_range_right {width: 2px;background-color: #448aff;position: absolute;top: 0;}#wiz-table-range-border_range_right {width: 1px;}#wiz-table-range-border_start_bottom, #wiz-table-range-border_range_bottom {height: 2px;background-color: #448aff;position: absolute;top: 0;}#wiz-table-range-border_range_bottom {height: 1px;}#wiz-table-range-border_start_left, #wiz-table-range-border_range_left {width: 2px;background-color: #448aff;position: absolute;top: 0;left: 0;}#wiz-table-range-border_range_left {width: 1px;}#wiz-table-range-border_start_dot, #wiz-table-range-border_range_dot {width: 5px;height: 5px;border: 2px solid rgb(255, 255, 255);background-color: #448aff;cursor: crosshair;position: absolute;z-index:" + r.CSS.Z_INDEX.tableRangeDot + ";}.wiz-table-tools {display: block;background-color:#fff;position: absolute;left: 0px;border: 1px solid #ddd;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;z-index:" + r.CSS.Z_INDEX.tableTools + ';}.wiz-table-tools ul {list-style: none;padding: 0;width:auto;}.wiz-table-tools .wiz-table-menu-item {position: relative;float: left;margin:5px 2px 5px 8px;clear: initial;}.wiz-table-tools .wiz-table-menu-item .wiz-table-menu-button {font-size:15px;width:20px;height:20px;line-height:20px;cursor: pointer;position:relative;}.wiz-table-tools i.editor-icon{font-size: 15px;color: #455a64;}.wiz-table-tools .wiz-table-menu-item .wiz-table-menu-button i#wiz-menu-bg-demo{position: absolute;top:1px;left:0;}.wiz-table-tools .wiz-table-menu-sub {position: absolute;display: none;width: 125px;padding: 5px 0;background: #fff;border-radius: 3px;border: 1px solid #E0E0E0;top:28px;left:-9px;box-shadow: 1px 1px 5px #d0d0d0;}.wiz-table-tools .wiz-table-menu-sub > div{font-size:15px;min-width:63px;}.wiz-table-tools .wiz-table-menu-item.active .wiz-table-menu-sub {display: block}.wiz-table-tools .wiz-table-menu-sub:before, .wiz-table-tools .wiz-table-menu-sub:after {position: absolute;content: " ";border-style: solid;border-color: transparent;border-bottom-color: #cccccc;left: 22px;margin-left: -14px;top: -8px;border-width: 0 8px 8px 8px;z-index:' + r.CSS.Z_INDEX.tableToolsArrow + ";}.wiz-table-tools .wiz-table-menu-sub:after {border-bottom-color: #ffffff;top: -7px;}.wiz-table-tools .wiz-table-menu-sub-item {padding: 4px 12px;font-size: 14px;}.wiz-table-tools .wiz-table-menu-sub-item.split {border-top: 1px solid #E0E0E0;}.wiz-table-tools .wiz-table-menu-sub-item:hover {background-color: #ececec;}.wiz-table-tools .wiz-table-menu-sub-item.disabled {color: #bbbbbb;cursor: default;}.wiz-table-tools .wiz-table-menu-sub-item.disabled:hover {background-color: transparent;}.wiz-table-tools .wiz-table-menu-item.wiz-table-cell-bg:hover .wiz-table-color-pad {display: block;}.wiz-table-tools .wiz-table-color-pad {display: none;padding: 10px;box-sizing: border-box;width: 85px;height: 88px;background-color: #fff;cursor: default;}.wiz-table-tools .wiz-table-color-pad > div{font-size:15px;}.wiz-table-tools .wiz-table-color-pad .wiz-table-color-pad-item {display: inline-block;width: 15px;height: 15px;margin-right: 9px;position: relative;}.wiz-table-tools .wiz-table-color-pad .wiz-table-color-pad-item i.pad-demo {position: absolute;top:3px;left:0;}.wiz-table-tools .wiz-table-color-pad .wiz-table-color-pad-item .icon-oblique_line{color: #cc0000;}.wiz-table-tools .wiz-table-color-pad .wiz-table-color-pad-item:last-child {margin-right: 0;}.wiz-table-tools .wiz-table-color-pad .wiz-table-color-pad-item.active i.editor-icon.icon-box {color: #448aff;}.wiz-table-tools .wiz-table-cell-align {display: none;padding: 10px;box-sizing: border-box;width: 85px;height: 65px;background-color: #fff;cursor: default;}.wiz-table-tools .wiz-table-cell-align .wiz-table-cell-align-item {display: inline-block;width: 15px;height: 15px;margin-right: 9px;position: relative;}.wiz-table-tools .wiz-table-cell-align .wiz-table-cell-align-item[data-align-type=align] {margin-right:8px}.wiz-table-tools .wiz-table-cell-align .wiz-table-cell-align-item:last-child {margin-right:0}.wiz-table-tools .wiz-table-cell-align .wiz-table-cell-align-item i.valign{position: absolute;top:3px;left:0;color: #d2d2d2;}.wiz-table-tools .wiz-table-cell-align-item i.editor-icon.align {font-size:17px;}.wiz-table-tools .wiz-table-cell-align-item.active i.editor-icon.valign {color: #a1c4ff;}.wiz-table-tools .wiz-table-cell-align-item.active i.editor-icon.icon-box,.wiz-table-tools .wiz-table-cell-align-item.active i.editor-icon.align {color: #448aff;}.wiz-table-tools .wiz-table-color-pad .wiz-table-color-pad-item:last-child,.wiz-table-tools .wiz-table-cell-align .wiz-table-cell-align-item:last-child {margin-right: 0;}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th.wiz-selected-cell-multi,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " td.wiz-selected-cell-multi {background: rgba(0,102,255,.05);}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th:before,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + ' td:before,#wiz-table-col-line:before,#wiz-table-range-border_start_right:before,#wiz-table-range-border_range_right:before {content: " ";position: absolute;top: 0;bottom: 0;right: -5px;width: 9px;cursor: col-resize;background: transparent;z-index:' + r.CSS.Z_INDEX.tableTDBefore + ";}." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + " th:after,." + r.CLASS.EDITING + "." + r.CLASS.WIZ_BODY + ' td:after,#wiz-table-row-line:before,#wiz-table-range-border_start_bottom:before,#wiz-table-range-border_range_bottom:before {content: " ";position: absolute;left: 0;right: 0;bottom: -5px;height: 9px;cursor: row-resize;background: transparent;z-index:' + r.CSS.Z_INDEX.tableTDBefore + ";}"
        }
          , i = {
            ios: "." + r.CLASS.READONLY + "." + r.CLASS.WIZ_BODY + " img {max-width: 100%;height: auto !important;margin: 0px auto;cursor: pointer;}"
        }
          , a = {
            body: "html {height:100%;} ." + r.CLASS.WIZ_BODY + " {min-height:100%;box-sizing:border-box;word-wrap: break-word !important;outline:none;position:relative;}." + r.CLASS.WIZ_BODY + " a {word-wrap: break-word;}." + r.CLASS.WIZ_BODY + " img::selection {background-color: rgba(0, 0, 255, 0.3);}",
            blockScroll: ".wiz-block-scroll::-webkit-scrollbar {width: 7px;height: 7px;}.wiz-block-scroll::-webkit-scrollbar-thumb {background-color: #7f7f7f;border-radius: 7px;}.wiz-block-scroll::-webkit-scrollbar-button {display: none;}",
            table: "." + r.CLASS.WIZ_BODY + " ." + r.CLASS.TABLE_CONTAINER + " {border:0px !important;}." + r.CLASS.WIZ_BODY + " ." + r.CLASS.TABLE_BODY + " {border:0px !important;position:relative;margin:10px 0;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;}." + r.CLASS.WIZ_BODY + " ." + r.CLASS.TABLE_BODY + " table {margin:0;outline:none;}." + r.CLASS.WIZ_BODY + " td,." + r.CLASS.WIZ_BODY + " th {outline:none;}"
        }
          , l = {
            common: "html, ." + r.CLASS.WIZ_BODY + " {font-size: 12pt;}." + r.CLASS.WIZ_BODY + " {font-family: " + r.CSS.DEFAULT_FONT + ";line-height: 1.6;margin: 0 auto;padding: 20px 16px;padding: 1.25rem 1rem;}." + r.CLASS.WIZ_BODY + " h1,." + r.CLASS.WIZ_BODY + " h2,." + r.CLASS.WIZ_BODY + " h3,." + r.CLASS.WIZ_BODY + " h4,." + r.CLASS.WIZ_BODY + " h5,." + r.CLASS.WIZ_BODY + " h6 {margin:20px 0 10px;margin:1.25rem 0 0.625rem;padding: 0;font-weight: bold;}." + r.CLASS.WIZ_BODY + " h1 {font-size:20pt;font-size:1.67rem;}." + r.CLASS.WIZ_BODY + " h2 {font-size:18pt;font-size:1.5rem;}." + r.CLASS.WIZ_BODY + " h3 {font-size:15pt;font-size:1.25rem;}." + r.CLASS.WIZ_BODY + " h4 {font-size:14pt;font-size:1.17rem;}." + r.CLASS.WIZ_BODY + " h5 {font-size:12pt;font-size:1rem;}." + r.CLASS.WIZ_BODY + " h6 {font-size:12pt;font-size:1rem;color: #777777;margin: 1rem 0;}." + r.CLASS.WIZ_BODY + " div,." + r.CLASS.WIZ_BODY + " p,." + r.CLASS.WIZ_BODY + " ul,." + r.CLASS.WIZ_BODY + " ol,." + r.CLASS.WIZ_BODY + " dl,." + r.CLASS.WIZ_BODY + " li {margin:0;}." + r.CLASS.WIZ_BODY + " blockquote,." + r.CLASS.WIZ_BODY + " table,." + r.CLASS.WIZ_BODY + " pre,." + r.CLASS.WIZ_BODY + " code {margin:8px 0;}." + r.CLASS.WIZ_BODY + " ." + r.CLASS.CODE_MIRROR + " pre {margin:0;}." + r.CLASS.WIZ_BODY + " ul,." + r.CLASS.WIZ_BODY + " ol {padding-left:32px;padding-left:2rem;}." + r.CLASS.WIZ_BODY + " ol.wiz-list-level1 > li {list-style-type:decimal;}." + r.CLASS.WIZ_BODY + " ol.wiz-list-level2 > li {list-style-type:lower-latin;}." + r.CLASS.WIZ_BODY + " ol.wiz-list-level3 > li {list-style-type:lower-roman;}." + r.CLASS.WIZ_BODY + " blockquote {padding:0 12px;padding:0 0.75rem;}." + r.CLASS.WIZ_BODY + " blockquote > :first-child {margin-top:0;}." + r.CLASS.WIZ_BODY + " blockquote > :last-child {margin-bottom:0;}." + r.CLASS.WIZ_BODY + " img {border:0;max-width:100%;height:auto !important;margin:2px 0;}." + r.CLASS.WIZ_BODY + " table {border-collapse:collapse;border:1px solid #bbbbbb;}." + r.CLASS.WIZ_BODY + " td,." + r.CLASS.WIZ_BODY + " th {padding:4px 8px;border-collapse:collapse;border:1px solid #bbbbbb;min-height:28px;word-break:break-word;box-sizing: border-box;}.wiz-hide {display:none !important;}"
        }
          , s = function() {
            var e = this
              , t = null 
              , n = null 
              , s = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                s = t.require.domUtils
            }
            ,
            this.insertDefaultStyle = function(t, n) {
                if (e.replaceStyleById(r.ID.WIZ_DEFAULT_STYLE, l.common, t),
                n) {
                    var o = void 0
                      , i = !1;
                    if ("string" == typeof n)
                        o = n,
                        i = !0;
                    else {
                        o = "html, body{";
                        for (var a in n)
                            n.hasOwnProperty(a) && (o += "font-family" === a.toLowerCase() ? a + ":" + n[a] + "," + r.CSS.DEFAULT_FONT + ";" : a + ":" + n[a] + ";",
                            i = !0);
                        o += "}"
                    }
                    i && e.insertStyle({
                        id: r.ID.TMP_STYLE_PRE + "default_custom",
                        name: r.NAME.TMP_STYLE
                    }, o)
                }
            }
            ,
            this.insertCustomStyle = function(t, n, o) {
                if (t && n) {
                    var i = {
                        id: t
                    };
                    o && (i.name = r.NAME.TMP_STYLE),
                    e.insertStyle(i, n)
                }
            }
            ,
            this.insertStyle = function(t, r) {
                var o = n.doc.createElement("style");
                return t.name && o.setAttribute("name", t.name),
                t.id && (o.setAttribute("id", t.id),
                e.removeStyleById(t.id)),
                n.doc.getElementsByTagName("HEAD")[0].insertBefore(o, null ),
                o.innerHTML = r,
                o
            }
            ,
            this.insertTmpEditorStyle = function() {
                var t = a.body + a.table + o.imageResize + o.selectPlugin + o.table;
                n.options.editor.type === r.NOTE_EDITOR_TYPE.MARKDOWN && (t += o.tableInMarkdown),
                e.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "editor_common",
                    name: r.NAME.TMP_STYLE
                }, t),
                n.client.type.isIOS && n.client.type.isPhone ? e.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "editor_ios_phone",
                    name: r.NAME.TMP_STYLE
                }, o.iosPhone) : n.client.type.isIOS && n.client.type.isPad && e.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "editor_ios_pad",
                    name: r.NAME.TMP_STYLE
                }, o.iosPad),
                n.client.type.isMac && e.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "editor_block_scroll",
                    name: r.NAME.TMP_STYLE
                }, a.blockScroll)
            }
            ,
            this.insertTmpReaderStyle = function() {
                e.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "reader_common",
                    name: r.NAME.TMP_STYLE
                }, a.body + a.table + a.code + i.code),
                n.client.type.isIOS && e.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "reader_ios",
                    name: r.NAME.TMP_STYLE
                }, i.ios),
                n.client.type.isMac && e.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "reader_block_scroll",
                    name: r.NAME.TMP_STYLE
                }, a.blockScroll)
            }
            ,
            this.removeFormat = function(e, t, o) {
                var i = function(e) {
                    return !!e && 1 === e.nodeType && (s.isTag(e, [r.TAG.TMP_TAG, r.TAG.TMP_PLUGIN_TAG]) || e.getAttribute("name") === r.NAME.TMP_STYLE || /^wiz[_-]/i.test(e.id) || /(^| )wiz[_-]/i.test(e.className))
                }
                  , a = function e(t) {
                    if (t && !s.hasClass(t, r.CLASS.CODE_CONTAINER)) {
                        i(t) || (t.removeAttribute("style"),
                        t.style.cssText && (t.style.cssText = ""));
                        var n = t.children;
                        if (n)
                            for (var o = 0; o < n.length; o++)
                                1 === n[o].nodeType && e(n[o])
                    }
                }
                  , l = function e(t) {
                    if (t && !s.hasClass(t, r.CLASS.CODE_CONTAINER)) {
                        i(t) || s.attr(t, {
                            class: null 
                        });
                        var n = t.children;
                        if (n)
                            for (var o = 0; o < n.length; o++)
                                1 === n[o].nodeType && e(n[o])
                    }
                }
                  , d = void 0
                  , c = void 0
                  , u = void 0
                  , f = void 0
                  , g = void 0;
                try {
                    if (e && n.doc.execCommand("SelectAll"),
                    t && n.doc.execCommand("RemoveFormat"),
                    e && (d = n.doc.documentElement,
                    d && o && (l(d),
                    a(d))),
                    o) {
                        c = n.doc.getElementsByTagName("link");
                        for (var m = c.length - 1; m >= 0; m--)
                            u = c[m],
                            "stylesheet" !== u.getAttribute("rel") || i(u) || u.remove();
                        f = n.doc.getElementsByTagName("style");
                        for (var p = f.length - 1; p >= 0; p--)
                            g = f[p],
                            i(g) || g.remove()
                    }
                } catch (e) {
                    return void console.error(e)
                }
            }
            ,
            this.removeStyleById = function(e) {
                var t = n.doc.getElementById(e);
                t && s.isTag(t, ["style", "link"]) && s.remove(t)
            }
            ,
            this.removeStyleByName = function(e) {
                for (var t = n.doc.getElementsByName(e), r = t.length - 1; r >= 0; r--) {
                    var o = t[r];
                    o && s.isTag(o, ["style", "link"]) && s.remove(o)
                }
            }
            ,
            this.replaceStyleById = function(e, t, r) {
                r = !!r;
                var o = n.doc.getElementById(e);
                o || r || (o = n.doc.createElement("style"),
                o.id = e,
                n.doc.getElementsByTagName("HEAD")[0].insertBefore(o, null )),
                o && (o.innerHTML = t)
            }
        }
        ;
        t.exports = s
    }
    , {
        "../config/const": 51
    }],
    20: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null 
              , f = null 
              , g = null 
              , m = null 
              , p = null 
              , h = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.lang,
                a = t.require.amendInfo,
                l = t.require.amendUser,
                s = t.require.amendUtils,
                d = t.require.blockUtils,
                c = t.require.codeCore,
                u = t.require.domUtils,
                f = t.require.historyUtils,
                g = t.require.rangeUtils,
                m = t.require.tableCore,
                p = t.require.tableUtils,
                h = t.require.todoCore,
                function() {
                    var e = u.modifyNodeStyle;
                    u.modifyNodeStyle = function(t, n, o, i) {
                        var a = void 0;
                        return 1 === t.nodeType && o && o[r.ATTR.SPAN_DELETE] && u.isTag(t, "img") ? (s.deleteImg(t, l.getCurUser()),
                        t) : 1 === t.nodeType && o && o[r.ATTR.SPAN_DELETE] && u.isEmptyDom(t) ? (a = t.parentNode,
                        a.removeChild(t),
                        u.removeEmptyParent(a),
                        t) : 1 === t.nodeType && o && o[r.ATTR.SPAN_DELETE] && u.isSelfClosingTag(t) ? t : o && o[r.ATTR.SPAN_DELETE] && s.getWizDeleteParent(t) ? t : e(t, n, o, i)
                    }
                    ;
                    var t = u.addDomForGetDomList;
                    u.addDomForGetDomList = function(e, n) {
                        s.isWizDelete(n) || 3 === n.nodeType && !u.getParentByTagName(n, ["td", "th"], !1, null ) && u.getParentByTagName(n, "table", !1, null ) || t(e, n)
                    }
                }()
            }
            ;
            var v = function() {
                var e = void 0
                  , t = void 0
                  , r = void 0
                  , o = void 0
                  , i = !1
                  , a = function(e, t) {
                    if (!e)
                        return !1;
                    var n = u.getLastDeepChild(e)
                      , r = u.getParentByFilter(n, function(e) {
                        return e === t
                    }, !0);
                    return !!r
                }
                ;
                return e = g.getRange(),
                t = n.doc.queryCommandValue("formatBlock"),
                /^h[1-6]+$/i.test(t) && e && e.startOffset === u.getEndOffset(e.startContainer) && (r = u.getParentByTagName(e.startContainer, t, !0),
                i = a(r, e.startContainer)),
                !(!i || !r) && (o = n.doc.createElement("div"),
                o.appendChild(n.doc.createElement("br")),
                u.after(o, r),
                g.setRange(o, 0),
                !0)
            }
              , b = !1
              , C = {
                bind: function() {
                    C.unbind(),
                    n.event.add(r.EVENT.ON_KEY_DOWN, C.onKeyDown),
                    n.event.add(r.EVENT.ON_COMPOSITION_START, C.onCompositionStart),
                    n.event.add(r.EVENT.ON_COMPOSITION_END, C.onCompositionEnd),
                    n.client.type.isIOS || n.client.type.isAndroid ? n.event.add(r.EVENT.ON_TOUCH_START, C.onTouchStart) : (n.event.add(r.EVENT.ON_MOUSE_DOWN, C.onMouseDown),
                    n.event.add(r.EVENT.ON_MOUSE_UP, C.onMouseUp)),
                    n.event.add(r.EVENT.ON_DRAG_START, C.onDragDrop),
                    n.event.add(r.EVENT.ON_DRAG_ENTER, C.onDragDrop),
                    n.event.add(r.EVENT.ON_DROP, C.onDragDrop)
                },
                unbind: function() {
                    n.event.remove(r.EVENT.ON_KEY_DOWN, C.onKeyDown),
                    n.event.remove(r.EVENT.ON_COMPOSITION_START, C.onCompositionStart),
                    n.event.remove(r.EVENT.ON_COMPOSITION_END, C.onCompositionEnd),
                    n.event.remove(r.EVENT.ON_MOUSE_DOWN, C.onMouseDown),
                    n.event.remove(r.EVENT.ON_MOUSE_UP, C.onMouseUp),
                    n.event.remove(r.EVENT.ON_TOUCH_START, C.onTouchStart),
                    n.event.remove(r.EVENT.ON_DRAG_START, C.onDragDrop),
                    n.event.remove(r.EVENT.ON_DRAG_ENTER, C.onDragDrop),
                    n.event.remove(r.EVENT.ON_DROP, C.onDragDrop)
                },
                bindReverse: function() {
                    C.unbindReverse(),
                    n.event.add(r.EVENT.ON_KEY_DOWN, C.onKeyDown),
                    n.event.add(r.EVENT.ON_COMPOSITION_START, C.onCompositionStart),
                    n.event.add(r.EVENT.ON_COMPOSITION_END, C.onCompositionEnd),
                    n.client.type.isIOS || n.client.type.isAndroid || (n.event.add(r.EVENT.ON_MOUSE_DOWN, C.onMouseDown),
                    n.event.add(r.EVENT.ON_MOUSE_UP, C.onMouseUp))
                },
                unbindReverse: function() {
                    n.event.remove(r.EVENT.ON_KEY_DOWN, C.onKeyDown),
                    n.event.remove(r.EVENT.ON_COMPOSITION_START, C.onCompositionStart),
                    n.event.remove(r.EVENT.ON_COMPOSITION_END, C.onCompositionEnd),
                    n.event.remove(r.EVENT.ON_MOUSE_DOWN, C.onMouseDown),
                    n.event.remove(r.EVENT.ON_MOUSE_UP, C.onMouseUp)
                },
                onAccept: function(t) {
                    e.accept(t)
                },
                onRefuse: function(t) {
                    e.refuse(t)
                },
                onBeforeSaveSnap: function() {
                    a.hide(!0)
                },
                onAfterRestoreHistory: function() {
                    e.startAmendInfo()
                },
                onCompositionStart: function() {
                    n.compositionStart = !0
                },
                onCompositionEnd: function() {
                    n.compositionStart = !1,
                    setTimeout(function() {
                        f.saveSnap(!0)
                    }, 0)
                },
                onDragDrop: function(e) {
                    return o.stopEvent(e),
                    !1
                },
                onKeyDown: function(t) {
                    var r = n.doc.getSelection();
                    n.compositionStart || g.clearFillCharByCollapsed(),
                    c.onKeyDown(t) && m.onKeyDown(t) && h.onKeyDown(t) && (0 === r.rangeCount || n.compositionStart || (e.isAmendEditing() ? C.onKeyDownAmend(t) : C.onKeyDownReverse(t)))
                },
                onKeyDownAmend: function(e) {
                    var t = e.keyCode || e.which
                      , i = n.doc.getSelection()
                      , a = void 0
                      , d = void 0
                      , c = void 0
                      , m = void 0
                      , p = void 0
                      , h = void 0
                      , b = void 0
                      , C = void 0
                      , E = void 0
                      , T = void 0
                      , S = void 0;
                    if (8 === t)
                        return f.saveSnap(!1),
                        i.isCollapsed ? (g.selectCharIncludeFillChar(!0),
                        s.removeSelection(l.getCurUser()),
                        S = g.getRangeParentRoot(),
                        i.collapseToStart(),
                        s.removeUserDel(S, l.getCurUser()),
                        i.collapseToStart()) : (s.removeSelection(l.getCurUser()),
                        s.removeUserDel(null , l.getCurUser()),
                        i.collapseToStart()),
                        g.caretFocus(),
                        void o.stopEvent(e);
                    if (46 === t)
                        return f.saveSnap(!1),
                        i.isCollapsed && g.selectCharIncludeFillChar(!1),
                        s.removeSelection(l.getCurUser()),
                        s.removeUserDel(null , l.getCurUser()),
                        i.collapseToEnd(),
                        g.caretFocus(),
                        void o.stopEvent(e);
                    if (!o.checkNonTxtKey(e)) {
                        var y = void 0
                          , A = void 0;
                        if (f.saveSnap(!1),
                        i.isCollapsed || (s.removeSelection(l.getCurUser()),
                        s.removeUserDel(null , l.getCurUser())),
                        a = i.getRangeAt(0),
                        d = a.endContainer,
                        c = a.endOffset,
                        13 === t) {
                            var N = s.getWizDeleteParent(d)
                              , _ = s.getWizInsertParent(d)
                              , O = !!_ && s.getWizAmendImgParent(d)
                              , D = N || _;
                            if (D && 1 === D.childNodes.length && (!u.isUsableTextNode(D.childNodes[0]) || 1 === D.childNodes[0].nodeType && u.isTag(D.childNodes[0], "br")))
                                !function() {
                                    var e = D.parentNode
                                      , t = n.doc.createElement("br");
                                    e.insertBefore(t, D),
                                    e.removeChild(D),
                                    g.setRange(t, 1, t, 1)
                                }();
                            else if (_ && O)
                                !function() {
                                    var e = u.createSpan();
                                    e.innerHTML = r.FILL_CHAR,
                                    u.after(e, _),
                                    g.setRange(e, 1, e, 1)
                                }();
                            else if (_)
                                !function() {
                                    var e = u.createSpan();
                                    e.innerHTML = r.FILL_CHAR,
                                    y = s.splitInsertDom(d, c, !0, l.getCurUser()),
                                    y.isInsert && y.split ? (u.after(e, _),
                                    g.setRange(e, 1, e, 1)) : y.isInsert && (u.before(e, _, c > 0),
                                    g.setRange(e, 1, e, 1))
                                }();
                            else if (N)
                                !function() {
                                    var e = u.createSpan();
                                    e.innerHTML = r.FILL_CHAR,
                                    y = s.splitDeletedDom(d, c),
                                    y ? (u.after(e, N),
                                    g.setRange(e, 1, e, 1)) : (u.before(e, N, c > 0),
                                    g.setRange(e, 1, e, 1))
                                }();
                            else if (v())
                                return void o.stopEvent(e);
                            return void i.collapseToEnd()
                        }
                        if (y = s.splitInsertDom(d, c, !1, l.getCurUser()),
                        A = s.getWizAmendImgParent(d),
                        y.isInsert && !y.split && !A)
                            return 0 === c && 1 === y.insertDom.nodeType ? (u.before(n.doc.createTextNode(r.FILL_CHAR), y.insertDom.childNodes[0]),
                            g.setRange(y.insertDom, 1, null , null )) : g.setRange(d, c, null , null ),
                            a = i.getRangeAt(0),
                            void (9 === t && (a.insertNode(u.getTab()),
                            i.modify("move", "forward", "character"),
                            i.modify("move", "forward", "character"),
                            i.modify("move", "forward", "character"),
                            i.modify("move", "forward", "character"),
                            o.stopEvent(e)));
                        m = s.createDomForInsert(l.getCurUser()),
                        y.split ? (3 === d.nodeType && (d = d.parentNode),
                        u.before(m, d, c > 0)) : A ? u.after(m, A) : 1 === d.nodeType ? c < d.childNodes.length ? d.getAttribute(r.ATTR.SPAN) && (0 === d.childNodes.length || 1 === d.childNodes.length && u.isTag(d.childNodes[0], "br")) ? (u.before(m, d),
                        u.remove(d)) : u.before(m, d.childNodes[c]) : u.isTag(d, ["td", "th"]) || u.hasClass(d, r.CLASS.TODO_MAIN) ? (u.isEmptyDom(d) && (d.innerHTML = ""),
                        d.appendChild(m)) : u.after(m, d) : 3 === d.nodeType && (s.splitDeletedDom(d, c) ? u.after(m, d.parentNode) : c < d.nodeValue.length ? (E = d.nodeValue.substr(c),
                        T = n.doc.createTextNode(E),
                        d.nodeValue = d.nodeValue.substr(0, c),
                        u.after([m, T], d)) : (h = u.getParentByTagName(d, "a", !0, null ),
                        C = h ? u.getNextNode(d) : null ,
                        b = C ? u.getParentByTagName(C, "a", !0, null ) : null ,
                        p = d.nextSibling,
                        h && h !== b ? u.after(m, h) : p ? u.before(m, p) : d.parentNode.insertBefore(m, null ))),
                        9 === t ? (m.appendChild(u.getTab()),
                        g.setRange(m, 2, null , null ),
                        o.stopEvent(e)) : g.setRange(m.childNodes[0], 1, null , null )
                    }
                },
                onKeyDownReverse: function(t) {
                    var i = t.keyCode || t.which
                      , a = n.doc.getSelection()
                      , l = s.fixedAmendRange()
                      , c = function(e, t) {
                        if (e) {
                            var n = void 0
                              , o = void 0;
                            o = s.getWizAmendParent(e),
                            o && 1 === o.childNodes.length && (n = u.createSpan(),
                            n.innerHTML = r.FILL_CHAR + r.FILL_CHAR,
                            u.before(n, o, t > 0),
                            u.remove(o),
                            g.setRange(n, t > 0 ? 0 : 2, n, 1))
                        }
                    }
                    ;
                    if (8 === i)
                        return f.saveSnap(!1),
                        void (a.isCollapsed && l.leftDom && (l.startImg = s.getWizAmendImgParent(l.leftDom),
                        l.startImg ? (l.startDom = l.startImg,
                        l.startOffset = 0,
                        g.setRange(l.startDom, l.startOffset, l.endDom, l.endOffset)) : 3 === l.leftDom.nodeType && 1 === l.leftDom.nodeValue.length && c(l.leftDom, -1)));
                    if (46 === i)
                        return f.saveSnap(!1),
                        void (a.isCollapsed && l.rightDom && (l.endImg = s.getWizAmendImgParent(l.rightDom),
                        l.endImg ? (l.endDom = l.endImg,
                        l.endOffset = l.endImg.childNodes.length,
                        g.setRange(l.startDom, l.startOffset, l.endDom, l.endOffset)) : 3 === l.rightDom.nodeType && 1 === l.rightDom.nodeValue.length && c(l.rightDom, 1)));
                    if (!o.checkNonTxtKey(t)) {
                        f.saveSnap(!1),
                        e.splitAmendDomByRange(l);
                        var m = p.checkCaretInTableContainer();
                        d.insertEmptyLine(m.tableContainer, m.after),
                        13 === i && v() && o.stopEvent(t)
                    }
                },
                onMouseDown: function(e) {
                    var t = a.isInfo(e.target);
                    return t ? void o.stopEvent(e) : void a.stop()
                },
                onMouseUp: function() {
                    a.start()
                },
                onTouchStart: function(e) {}
            };
            this.accept = function(e) {
                var t = n.doc.getSelection()
                  , r = {}
                  , o = void 0;
                if (e.total)
                    r.selection = !0,
                    r.selectAll = !0;
                else if (e.dom && !e.isSelection)
                    r.domList = s.getSameTimeStampDom(e.dom),
                    r.selection = !1;
                else {
                    if (0 === t.rangeCount)
                        return;
                    r.selection = !0,
                    r.selectAll = !1
                }
                f.saveSnap(!1),
                o = r.selection && !r.selectAll ? s.getSelectedAmendDoms() : s.getAmendDoms(r),
                o && (s.splitSelectedAmendDoms(o),
                s.wizAmendDelete(o.deleteList),
                s.wizAmendDelete(o.deletedInsertList),
                s.wizAmendSave(o.insertList)),
                u.clearChild(n.body, [])
            }
            ,
            this.changeCurUser = function(e) {
                n.options.userInfo = e,
                l.initUser()
            }
            ,
            this.fixPaste = function(e, t, n) {
                s.modifyDomForPaste(e, t, n)
            }
            ,
            this.fragmentFilter = function(e) {
                if (!e)
                    return !1;
                for (var t = e.querySelectorAll("." + r.CLASS.WIZ_BODY + " span[" + r.ATTR.SPAN_DELETE + '="' + l.getCurUser().hash + '"]'), n = t.length - 1; n >= 0; n--) {
                    var o = t[n];
                    u.remove(o)
                }
            }
            ,
            this.hideAmendInfo = function() {
                a.hide(!0)
            }
            ,
            this.isAmendEdited = function() {
                return s.isAmendEdited()
            }
            ,
            this.isAmendEditing = function() {
                return b
            }
            ,
            this.hasAmendSpanByCursor = function() {
                var e = s.getAmendDoms({
                    selection: !0,
                    selectAll: !1
                });
                return e.insertList.length > 0 || e.deleteList.length > 0 || e.deletedInsertList.length > 0
            }
            ,
            this.readyForPaste = function() {
                var t = g.getRange()
                  , o = void 0
                  , i = void 0
                  , a = void 0
                  , d = void 0
                  , c = void 0
                  , f = void 0
                  , m = void 0
                  , p = void 0
                  , h = void 0
                  , v = void 0
                  , b = void 0
                  , C = void 0
                  , E = void 0
                  , T = void 0
                  , S = void 0;
                t && (t.collapsed || (o = u.getParentByTagName(t.endContainer, ["td", "th"], !0, null ),
                s.removeSelection(l.getCurUser()),
                s.removeUserDel(null , l.getCurUser())),
                t = g.getRange(),
                i = t.endContainer,
                a = t.endOffset,
                u.isTag(i, ["td", "th"]) && 0 === a && o !== i && (i = o,
                a = u.getEndOffset(i)),
                E = s.splitInsertDom(i, a, !0, l.getCurUser()),
                d = (new Date).valueOf(),
                c = s.createDomForPaste(d),
                f = c.start,
                m = c.content,
                p = c.end,
                T = s.getWizAmendImgParent(i),
                E.split ? (3 === i.nodeType && (i = i.parentNode),
                u.before([f, m, p], i, a > 0)) : T ? u.after([f, m, p], T) : 1 === i.nodeType ? (S = !1,
                u.isTag(i, ["td", "th"]) && (u.isEmptyDom(i) && (i.innerHTML = "",
                i.appendChild(u.createSpan())),
                S = !0),
                a < i.childNodes.length ? u.before([f, m, p], i.childNodes[a]) : S ? (i.appendChild(f),
                i.appendChild(m),
                i.appendChild(p)) : u.after([f, m, p], i)) : 3 === i.nodeType && (s.splitDeletedDom(i, a) ? u.after([f, m, p], i.parentNode) : a < i.nodeValue.length ? (C = n.doc.createTextNode(i.nodeValue.substr(a)),
                i.nodeValue = i.nodeValue.substr(0, a),
                u.after([f, m, p, C], i)) : (v = u.getParentByTagName(i, "a", !0, null ),
                h = i.nextSibling,
                v ? u.after([f, m, p], v) : h ? u.before([f, m, p], h) : (b = i.parentNode,
                b.insertBefore(f, null ),
                b.insertBefore(m, null ),
                b.insertBefore(p, null )))),
                g.setRange(m.childNodes[0], 0, m.childNodes[0], 1),
                setTimeout(function() {
                    p = n.body.querySelector(" span[" + r.ATTR.SPAN_PASTE_TYPE + '="' + r.TYPE.PASTE.END + '"][' + r.ATTR.SPAN_PASTE_ID + '="' + p.getAttribute(r.ATTR.SPAN_PASTE_ID) + '"]'),
                    e.fixPaste(f, p, l.getCurUser())
                }, 200))
            }
            ,
            this.refuse = function(e) {
                var t = n.doc.getSelection()
                  , r = {}
                  , o = void 0;
                if (e.total)
                    r.selection = !0,
                    r.selectAll = !0;
                else if (e.dom && !e.isSelection)
                    r.domList = s.getSameTimeStampDom(e.dom),
                    r.selection = !1;
                else {
                    if (0 === t.rangeCount)
                        return;
                    r.selection = !0,
                    r.selectAll = !1
                }
                if (f.saveSnap(!1),
                o = r.selection && !r.selectAll ? s.getSelectedAmendDoms() : s.getAmendDoms(r)) {
                    s.splitSelectedAmendDoms(o);
                    var i = o.deletedInsertList.length > 0 && 0 === o.deleteList.length && 0 === o.insertList.length;
                    s.wizAmendSave(o.deleteList),
                    i && s.wizAmendSave(o.deletedInsertList),
                    s.wizAmendDelete(o.insertList),
                    i || s.wizAmendDelete(o.deletedInsertList)
                }
                u.clearChild(n.body, [])
            }
            ,
            this.splitAmendDomByRange = function(e) {
                return s.splitAmendDomByRange(e)
            }
            ,
            this.start = function() {
                b = !0,
                e.stopReverse(),
                C.bind(),
                e.startAmendInfo(),
                n.event.add(r.EVENT.BEFORE_SAVESNAP, C.onBeforeSaveSnap),
                n.event.add(r.EVENT.AFTER_RESTORE_HISTORY, C.onAfterRestoreHistory)
            }
            ,
            this.startReverse = function() {
                e.stop(),
                C.bindReverse(),
                e.startAmendInfo()
            }
            ,
            this.startAmendInfo = function(e) {
                a.init(e, {
                    onAccept: C.onAccept,
                    onRefuse: C.onRefuse
                })
            }
            ,
            this.stop = function() {
                b = !1,
                C.unbind(),
                a.remove(),
                !e.isAmendEdited(),
                n.event.remove(r.EVENT.BEFORE_SAVESNAP, C.onBeforeSaveSnap),
                n.event.remove(r.EVENT.AFTER_RESTORE_HISTORY, C.onAfterRestoreHistory)
            }
            ,
            this.stopReverse = function() {
                C.unbindReverse(),
                a.remove(),
                !e.isAmendEdited()
            }
            ,
            this.stopAmendInfo = function() {
                a.remove()
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    21: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.lang,
                a = t.require.amendUser,
                l = t.require.amendUserAction,
                s = t.require.amendUtils,
                d = t.require.domUtils
            }
            ;
            var c = {
                onAccept: null ,
                onRefuse: null 
            }
              , u = !1
              , f = {
                x: null ,
                y: null 
            }
              , g = {
                bind: function() {
                    n.client.type.isIOS || n.client.type.isAndroid ? (n.event.add(r.EVENT.ON_TOUCH_START, g.handler.onTouchstart),
                    n.event.add(r.EVENT.ON_TOUCH_END, g.handler.onMouseMove)) : n.event.add(r.EVENT.ON_MOUSE_MOVE, g.handler.onMouseMove)
                },
                unbind: function() {
                    n.event.remove(r.EVENT.ON_TOUCH_START, g.handler.onTouchstart),
                    n.event.remove(r.EVENT.ON_TOUCH_END, g.handler.onMouseMove),
                    n.event.remove(r.EVENT.ON_MOUSE_MOVE, g.handler.onMouseMove)
                },
                bindInfoBtn: function() {
                    g.unbindInfoBtn(),
                    n.client.type.isIOS || n.client.type.isAndroid ? e.main.addEventListener("touchend", g.handler.onClick) : e.main.addEventListener("click", g.handler.onClick)
                },
                unbindInfoBtn: function() {
                    n.client.type.isIOS || n.client.type.isAndroid ? e.main.removeEventListener("touchend", g.handler.onClick) : e.main.removeEventListener("click", g.handler.onClick)
                },
                handler: {
                    onAccept: function(t) {
                        c.onAccept && c.onAccept(h()),
                        e.hide(!0),
                        l.save(l.ActionId.ClickAcceptFromAmendInfo)
                    },
                    onClick: function(e) {
                        var t = void 0;
                        t = e.changedTouches ? e.changedTouches[0].target : e.target,
                        t.id === r.ID.AMEND_INFO_ACCEPT ? g.handler.onAccept(e) : t.id === r.ID.AMEND_INFO_REFUSE && g.handler.onRefuse(e),
                        o.stopEvent(e)
                    },
                    onMouseMove: function(t) {
                        var r = o.getEventClientPos(t);
                        if ((f.x !== r.x || f.y !== r.y) && (f = r,
                        !u)) {
                            var i = t.target
                              , a = e.isInfo(i)
                              , l = void 0
                              , c = {
                                width: 20,
                                height: 20
                            };
                            if (a)
                                return clearTimeout(e.showTimer),
                                void clearTimeout(e.hideTimer);
                            var g = n.doc.getSelection()
                              , m = void 0
                              , p = s.getWizDeleteParent(i) || s.getWizInsertParent(i);
                            !g.isCollapsed && p && g.containsNode(p, !0) && (m = g.isCollapsed ? null  : s.getAmendDoms({
                                selection: !0,
                                selectAll: !1
                            })),
                            m && (m = m.deletedInsertList.concat(m.insertList, m.deleteList),
                            0 === m.length && (m = null ));
                            var h = void 0;
                            m || p ? (h = parseInt(n.win.getComputedStyle(p)["font-size"]),
                            isNaN(h) && (h = 14),
                            l = d.getPageScroll(),
                            c.left = r.x + l.left,
                            c.top = r.y + l.top - h,
                            c.top < p.offsetTop && (c.top = p.offsetTop),
                            e.show(m || p, c)) : e.hide(!1)
                        }
                    },
                    onTouchstart: function(t) {
                        var n = t.target
                          , r = e.isInfo(n);
                        r || e.hide(!1)
                    },
                    onRefuse: function(t) {
                        c.onRefuse && c.onRefuse(h()),
                        e.hide(!0),
                        l.save(l.ActionId.ClickRefuseFromAmendInfo)
                    }
                }
            }
              , m = function() {
                var t = n.body.querySelector("#" + r.ID.AMEND_INFO)
                  , o = void 0;
                return d.remove(t),
                t = n.doc.createElement("div"),
                o = n.doc.createElement("div"),
                d.setContenteditable(o, !1),
                t.appendChild(o),
                t.id = r.ID.AMEND_INFO,
                d.css(t, {
                    position: "absolute",
                    "z-index": r.CSS.Z_INDEX.amendInfo,
                    display: "none",
                    padding: "6px",
                    "font-family": '"Microsoft Yahei","微软雅黑",Helvetica,SimSun,SimHei'
                }),
                o.innerHTML = p(),
                d.css(o, {
                    "background-color": "white",
                    padding: "0px",
                    "font-size": "12px",
                    border: "1px solid #D8D8D8",
                    "-webkit-border-radius": "4px",
                    "-moz-border-radius": "4px",
                    "-border-radius": "4px",
                    "-webkit-box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 3px",
                    "-moz-box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 3px",
                    "box-shadow": "rgba(0, 0, 0, 0.24) 0px 3px 3px",
                    "min-width": "160px",
                    "max-width": "280px",
                    "min-height": "50px"
                }),
                e.template.appendChild(t),
                t
            }
              , p = function() {
                return n.client.type.isIOS || n.client.type.isMac || n.client.type.isAndroid ? '<div id="' + r.ID.AMEND_INFO_SINGLE + '" style="display:none; padding: 8px 16px;"><img id="' + r.ID.AMEND_INFO_IMG + '" class="' + r.CLASS.IMG_NOT_DRAG + '" style="width: 40px; height: 40px !important; position: absolute; -webkit-border-radius: 40px;-moz-border-radius:40px;border-radius:40px;"><ul style="list-style-type: none;margin: 4px 0 0 50px;padding-left: 0;"><li style="line-height: 18px;white-space: nowrap;padding: 2px 0;"><span id="' + r.ID.AMEND_INFO_NAME + '" style="color:#000;font-size:12px;font-weight:bold;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;"></span><span id="' + r.ID.AMEND_INFO_CONTENT + '" style="color:#000;font-size:12px;margin-left:.5em;display:inline-block;overflow:hidden;float:right"></span></li><li style="line-height: 18px;text-align: right;"><span id="' + r.ID.AMEND_INFO_TIME + '" style="color:#A3A3A3;font-size:12px;"></span></li></ul></div><div id="' + r.ID.AMEND_INFO_MULTI + '" style="display:none; padding: 8px 16px;"><p style="margin: 4px 16px;">' + i.Amend.MultiInfo + '</p></div><div id="' + r.ID.AMEND_INFO_TOOLS + '" style="padding:0;margin:0;box-sizing: border-box;"><div style="line-height: 26px;width: 50%;display:inline-block;text-align: center;padding:0 8px;margin:0;box-sizing: border-box;"><a id="' + r.ID.AMEND_INFO_REFUSE + '" href="javascript:void(0);" style="font-size:12px;display:block;cursor:pointer;color:#447BD8;text-decoration: blink;">' + i.Amend.BtnRefuse + '</a></div><div style="line-height: 26px;width: 50%;display:inline-block;text-align: center;padding:0 8px;margin:0;box-sizing: border-box;"><a id="' + r.ID.AMEND_INFO_ACCEPT + '" href="javascript:void(0);" style="font-size:12px;display:block;cursor:pointer;color:#447BD8;text-decoration: blink;">' + i.Amend.BtnAccept + "</a></div></div>" : '<div id="' + r.ID.AMEND_INFO_SINGLE + '" style="display:none; padding: 8px 16px;"><img id="' + r.ID.AMEND_INFO_IMG + '" class="' + r.CLASS.IMG_NOT_DRAG + '" style="width: 40px; height: 40px !important; position: absolute;"><ul style="list-style-type: none;margin: 4px 0 0 50px;padding-left: 0;"><li style="line-height: 18px;white-space: nowrap;padding: 2px 0;"><span id="' + r.ID.AMEND_INFO_NAME + '" style="color:#000;font-size:12px;font-weight:bold;max-width:90px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;"></span><span id="' + r.ID.AMEND_INFO_CONTENT + '" style="color:#000;font-size:12px;margin-left:.5em;display:inline-block;overflow:hidden;float:right"></span></li><li style="line-height: 18px;text-align: right;"><span id="' + r.ID.AMEND_INFO_TIME + '" style="color:#A3A3A3;font-size:12px;"></span></li></ul></div><div id="' + r.ID.AMEND_INFO_MULTI + '" style="display:none; padding: 8px 16px;"><p style="margin: 4px 16px;">' + i.Amend.MultiInfo + '</p></div><div id="' + r.ID.AMEND_INFO_TOOLS + '" style="padding:0;margin:0;box-sizing:border-box;border-top:1px solid #D8D8D8"><div style="line-height: 26px;width: 50%;display:inline-block;text-align: center;padding:0 8px;margin:0;box-sizing: border-box;border-right: 1px solid #D8D8D8"><a id="' + r.ID.AMEND_INFO_ACCEPT + '" href="javascript:void(0);" style="font-size:12px;display:block;cursor:pointer;color:#447BD8;text-decoration: blink;">' + i.Amend.BtnAccept + '</a></div><div style="line-height: 26px;width: 50%;display:inline-block;text-align: center;padding:0 8px;margin:0;box-sizing: border-box;"><a id="' + r.ID.AMEND_INFO_REFUSE + '" href="javascript:void(0);" style="font-size:12px;display:block;cursor:pointer;color:#447BD8;text-decoration: blink;">' + i.Amend.BtnRefuse + "</a></div></div>"
            }
              , h = function() {
                return {
                    dom: e.cur,
                    isSelection: !!e.isSelection
                }
            }
              , v = function() {
                e.main && (g.unbindInfoBtn(),
                e.cur = null ,
                e.curPos = null ,
                e.isMulti = !1,
                e.isSelection = !1,
                e.img.src = "",
                e.name.innerText = "",
                e.name.setAttribute("title", ""),
                e.content.innerText = "",
                d.css(e.main, {
                    display: "none"
                }),
                e.template.appendChild(e.main))
            }
              , b = function(t) {
                e.curPos = t,
                e.singleUser.style.display = "none",
                e.multiUser.style.display = "block"
            }
              , C = function(t) {
                var n = e.cur
                  , o = n.getAttribute(r.ATTR.SPAN_USERID)
                  , l = a.getUserByGuid(o)
                  , s = l ? l.name : i.Amend.UserNameDefault
                  , d = n.getAttribute(r.ATTR.SPAN_TIMESTAMP)
                  , c = !!n.getAttribute(r.ATTR.SPAN_DELETE);
                d = d.substring(0, d.length - 3),
                e.curPos = t,
                e.img.src = l ? l.imgUrl : "",
                e.name.innerText = s,
                e.name.setAttribute("title", s),
                e.content.innerText = c ? i.Amend.Delete : i.Amend.Edit,
                e.time.innerText = d,
                e.multiUser.style.display = "none",
                e.singleUser.style.display = "block"
            }
              , E = function() {
                d.remove(n.body.querySelector("#" + r.ID.AMEND_INFO))
            }
              , T = function(t) {
                e.main.parentNode === e.template && (n.body.appendChild(e.main),
                e.singleUser = n.body.querySelector("#" + r.ID.AMEND_INFO_SINGLE),
                e.multiUser = n.body.querySelector("#" + r.ID.AMEND_INFO_MULTI),
                e.img = n.body.querySelector("#" + r.ID.AMEND_INFO_IMG),
                e.name = n.body.querySelector("#" + r.ID.AMEND_INFO_NAME),
                e.content = n.body.querySelector("#" + r.ID.AMEND_INFO_CONTENT),
                e.time = n.body.querySelector("#" + r.ID.AMEND_INFO_TIME),
                e.tools = n.body.querySelector("#" + r.ID.AMEND_INFO_TOOLS),
                e.btnAccept = n.body.querySelector("#" + r.ID.AMEND_INFO_ACCEPT),
                e.btnRefuse = n.body.querySelector("#" + r.ID.AMEND_INFO_REFUSE)),
                e.cur ? C(t) : b(t),
                g.bindInfoBtn(),
                e.readonly ? e.tools.style.display = "none" : e.tools.style.display = "block",
                d.css(e.main, {
                    top: "0px",
                    left: "0px",
                    display: "block",
                    visibility: "hidden"
                }),
                d.setLayout({
                    layerObj: e.main,
                    target: t,
                    layout: r.TYPE.POS.upLeft,
                    fixed: !1,
                    noSpace: !1,
                    reverse: !0
                }),
                d.css(e.main, {
                    display: "block",
                    visibility: "visible"
                })
            }
            ;
            this.btnAccept = null ,
            this.btnRefuse = null ,
            this.content = null ,
            this.cur = null ,
            this.curPos = null ,
            this.img = null ,
            this.isMulti = !1,
            this.isSelection = !1,
            this.main = null ,
            this.name = null ,
            this.template = null ,
            this.time = null ,
            this.hide = function(t) {
                clearTimeout(e.showTimer),
                clearTimeout(e.hideTimer),
                (e.cur || e.isMulti) && (t ? v() : e.hideTimer = setTimeout(v, r.AMEND.INFO_TIMER))
            }
            ,
            this.init = function(t, r) {
                e.template = n.doc.createElement("div"),
                e.main = m(),
                e.readonly = !(!t || !t.readonly),
                d.setContenteditable(e.main, !1),
                r && r.onAccept && (c.onAccept = r.onAccept),
                r && r.onRefuse && (c.onRefuse = r.onRefuse),
                g.unbind(),
                g.bind()
            }
            ,
            this.isInfo = function(t) {
                var n = d.getParentByFilter(t, function(t) {
                    return t === e.main
                }, !0);
                return !!n
            }
            ,
            this.remove = function() {
                g.unbind(),
                E(),
                e.main = null ,
                e.img = null ,
                e.name = null ,
                e.content = null ,
                e.time = null ,
                e.btnAccept = null ,
                e.btnRefuse = null 
            }
            ,
            this.show = function(t, n) {
                clearTimeout(e.showTimer),
                clearTimeout(e.hideTimer);
                var i = o.isArray(t)
                  , a = i && t.length > 1
                  , l = i ? a ? null  : t[0] : t
                  , s = !1;
                e.isSelection = i,
                e.isMulti !== a || l !== e.cur ? (e.hide(!0),
                s = !0) : (!e.curPos || Math.abs(e.curPos.left - n.left) > 75 || Math.abs(e.curPos.top - n.top) > 24) && (s = !0),
                s && (e.showTimer = setTimeout(function() {
                    e.isMulti = a,
                    e.cur = l,
                    T(n)
                }, 2 * r.AMEND.INFO_TIMER))
            }
            ,
            this.start = function() {
                u = !1
            }
            ,
            this.stop = function() {
                e.hide(!0),
                u = !0
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    22: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAExUlEQVRYR9WZz08bRxTHvya1CHbUSHXCiZzCIaaBBOUUEveQSORWYwwRxRCpqtIqjZL8XQkEUppAbQMX6hgh5UetRiFV4MABQXoK2AgUx1vNzs7u7Hpmf3m3Vc3Blm2Gz/vOd95784goiqLgf/aIhAVdrVaxu7sLKomC7u7uwKQJBPrFi5eoVvfx6VMdZONOnIhjf78KBQoINQEnrwcuD+DkyS9bhvcNfXR0hFKppEKqWqp8BE0l1N7XgPXvKOjq6kJfX29L4L6hCfDh4aEnYBbQjRuD+PhxD4nEV77gfUEvLy/rXm1S2GIJQ3VtJ9TdoFtDfuKxOK5fv+YJ3jM0BfZmCd4y5tcUPp3+Njzo1dVV1Go1X5Yw+Z1oTOLWVI91HMfg4KBrcE9KLy0tq+mrVUvwwGSxzs5ODAxcDgt6yXWWcLIEVd5QezgzFA704iKBdk5rQmCLJdRzwYEPD2fCgS4WF408LMkSooOmhsl5mBYcTmlFQTY7HA50oVi0LRxeLcHDj4QGXShKK50jsGpfsyWY2uR5dCQbjtL5QsHUSzgVDidL8AcxNOiVlRXUagdccTEfSqGfLVmCt4RRpBTcHB0JR+lS6Tn29va04iIBdsgSvCVoxlMQ/SKKTCYdPPT29jb+qFSEB5HvJbxYgnqctq2958+jpyfpCtx1RVxY+M1eYUsKYyrqAWmf85ZgwAx+bOxm8ND0D4rLOK+wXZbQg+F6bALfQAOj2Syi0agjuGul5+cXTA1+EJbg7UFeZ4bS6OjoCA762fy87udWsoTMHkT43PiYIzD5gmul19bW8OHD36Yy7tUSVg/T8q6VeCjIjX8XLDRZ/OkzojZNdX6zhNUSzOPEGrFYLFhotlpxcQkHBwdaZTS3l7LCYWeJeDyGoTBvLgy8XC5jl1jFppeQZQm/luC3wLWn+V9qNBqYm/u1qb3kewmZDXjVe5JJ9PdfdGWJlqHJAk9+mQOBl1nC6dCRTZrIuTt41qh8Kc0WmZmZ1dXmFbTzMCtOly71I3nunGeVPaU80eo7Ozv4vfRcvzY1WULrK8wBqW7HRG7cF3DL0GSBqenHRk9iKc3WQ8eGka0ABwZtpzADNZ4VTE7kfKscCPSjqWm9vZRnDGoJVv1uTf7H0A8fTen24DOGSGH23q3JiX9f6Xq9jnfv/sKfb954BmbTqYsX+nDmTBcSiYTnAFynvK2tLZDhef3zZ60S0huHLNXxHrZTnXwWiUTQffYsUqkrrgKQQpMLbD6fF+ZhN4WD9zB/cTC/ZsN3YwysN1CZNE6fOiUMwgT99u061tfXjRmb4IrkpnCIgOVBNAObdg/A1z1JfJO6qgegQ5fLqyDFwnqnY/M2L4WD75GZh5nCIqWlFqOyq7sdaWvDnZ9uq+A69Ozsk1AUtt4rhd2fNkpg4wWzULT9JZ/d/uF7tLe3U+iNjU1tPGAMBu1uzbJKZ1W4FUuIhpQX+nqRSl2l0O/fb6BSqZhbTX32xmUJm14iVGCN5VjbMfx850cK/erVa2xuburb4LaBl6U1mSVE6zpZwphhE4s0cP/eXQqdzxewX61Kcy6bS9ComPLm0ixKa34PXXMyoMDkoUNPP56Rt5fcITGUEgMH6mGLPdl/fh/cv4t/ANultPKz243RAAAAAElFTkSuQmCC"
          , i = function() {
            var e = null 
              , t = null 
              , n = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.domUtils
            }
            ;
            var i = function(e) {
                v[e.guid] = e,
                b[e.guid] = {
                    color: e.color,
                    name: e.name
                }
            }
              , a = function(e) {
                var t = e.hash
                  , n = r.COLOR.length
                  , o = {};
                if (f(),
                v[t])
                    return v[t].color;
                for (var i in v)
                    if (v.hasOwnProperty(i)) {
                        var a = v[i].color;
                        o[a] = !0
                    }
                for (var l = 0; l < n; l++) {
                    var s = r.COLOR[l];
                    if (!o[s])
                        return s
                }
                return r.COLOR[0]
            }
              , l = function() {
                h = t.doc.createElement("meta"),
                h.id = r.ID.AMEND_USER_INFO,
                h.name = r.ID.AMEND_USER_INFO,
                t.doc.getElementsByTagName("HEAD")[0].insertBefore(h, null )
            }
              , s = function(e) {
                return e
            }
              , d = function(e) {
                if (t.client.type.isWeb)
                    return "/wizas/a/users/avatar/" + e + "?default=true&_" + (new Date).valueOf();
                if (t.client.type.isWin)
                    try {
                        var n = external.GetAvatarByUserGUID(e);
                        return n ? n : o
                    } catch (e) {
                        console.error(e)
                    }
                else
                    t.client.type.isMac || t.client.type.isIOS || t.client.type.isAndroid;
                return o
            }
              , c = function() {
                return h ? h : h = t.doc.getElementById(r.ID.AMEND_USER_INFO)
            }
              , u = function(e) {
                if (t.client.type.isWeb)
                    ;
                else if (t.client.type.isWin)
                    try {
                        return external.GetAliasByUserGUID(e)
                    } catch (e) {
                        console.error(e)
                    }
                else
                    t.client.type.isMac || t.client.type.isIOS || t.client.type.isAndroid;
                return null 
            }
              , f = function() {
                if (!v && (v = {},
                b = {},
                h = c()))
                    try {
                        b = JSON.parse(h.content);
                        for (var e in b)
                            if (b.hasOwnProperty(e)) {
                                var t = b[e];
                                t.user_guid = e;
                                var n = u(e);
                                n ? t.user_name = n : t.user_name = t.name,
                                v[e] = new m(t)
                            }
                    } catch (e) {}
            }
              , g = function() {
                h || l(),
                h.content = JSON.stringify(b)
            }
              , m = function(e) {
                e || (e = {}),
                this.guid = e.user_guid || "",
                this.hash = s(this.guid),
                this.name = e.user_name || "",
                this.imgUrl = e.img_url ? e.img_url : d(this.guid),
                this.color = e.color || a(this)
            }
              , p = null 
              , h = null 
              , v = null 
              , b = null ;
            this.initUser = function() {
                f();
                var e = t.options.userInfo;
                return e ? (p = new m(e),
                void i(p)) : null 
            }
            ,
            this.getCurUser = function() {
                return g(),
                p
            }
            ,
            this.getUserByGuid = function(e) {
                return p && e === p.guid ? p : v && v[e] ? v[e] : (f(),
                v[e])
            }
            ,
            this.setUsersData = function() {
                var e = t.options.usersData;
                if (e)
                    for (var n = 0, r = e.length; n < r; n++) {
                        var o = e[n]
                          , i = v[o.user_guid]
                          , a = b[o.user_guid];
                        i && o.user_name && (i.name = o.user_name),
                        i && o.img_url && (i.imgUrl = o.img_url),
                        a && o.user_name && (a.name = o.user_name)
                    }
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51
    }],
    23: [function(e, t, n) {
        "use strict";
        var r = {
            ClickAcceptFromAmendInfo: "ClickAcceptFromAmendInfo",
            ClickRefuseFromAmendInfo: "ClickRefuseFromAmendInfo"
        }
          , o = function() {
            var e = null 
              , t = null ;
            this.initCore = function(n) {
                e = n,
                t = e.env
            }
            ;
            var n = {
                save: function(e) {
                    if (t.client.type.isWin)
                        try {
                            external && external.LogAction && external.LogAction(e)
                        } catch (e) {
                            console.error(e.toString())
                        }
                }
            };
            this.ActionId = r,
            this.save = n.save
        }
        ;
        t.exports = o
    }
    , {}],
    24: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.amendUser,
                a = t.require.commandExtend,
                l = t.require.domUtils,
                s = t.require.rangeUtils
            }
            ,
            this.add2SelectedAmendDoms = function(e, t) {
                t && (t.getAttribute(r.ATTR.SPAN_INSERT) && t.getAttribute(r.ATTR.SPAN_DELETE) ? e.deletedInsertList.push(t) : t.getAttribute(r.ATTR.SPAN_INSERT) ? e.insertList.push(t) : t.getAttribute(r.ATTR.SPAN_DELETE) && e.deleteList.push(t))
            }
            ,
            this.createDomForImg = function(t, o) {
                var i = n.doc.createElement("span");
                return e.setDefaultAttr(i, o),
                i.setAttribute(r.ATTR.IMG, "1"),
                t === r.TYPE.IMG_DELETE && (i.removeAttribute(r.ATTR.SPAN_INSERT),
                i.setAttribute(r.ATTR.SPAN_DELETE, o.hash)),
                e.setUserImgContainerStyle(i),
                i
            }
            ,
            this.createDomForInsert = function(t) {
                var o = n.doc.createElement("span");
                return e.setDefaultAttr(o, t),
                e.setUserInsertStyle(o, t),
                o.innerHTML = r.FILL_CHAR,
                o
            }
            ,
            this.createDomForReverse = function() {
                var e = n.doc.createElement("span");
                return e.innerHTML = r.FILL_CHAR,
                e
            }
            ,
            this.createDomForPaste = function(e) {
                var t = void 0
                  , n = void 0
                  , o = void 0;
                return t = l.createSpan(),
                t.setAttribute(r.ATTR.SPAN_PASTE_TYPE, r.TYPE.PASTE.START),
                t.setAttribute(r.ATTR.SPAN_PASTE_ID, e),
                t.innerHTML = r.FILL_CHAR,
                n = l.createSpan(),
                n.setAttribute(r.ATTR.SPAN_PASTE_TYPE, r.TYPE.PASTE.CONTENT),
                n.setAttribute(r.ATTR.SPAN_PASTE_ID, e),
                n.innerHTML = r.FILL_CHAR + r.FILL_CHAR,
                o = l.createSpan(),
                o.setAttribute(r.ATTR.SPAN_PASTE_TYPE, r.TYPE.PASTE.END),
                o.setAttribute(r.ATTR.SPAN_PASTE_ID, e),
                o.innerHTML = r.FILL_CHAR,
                {
                    start: t,
                    content: n,
                    end: o
                }
            }
            ,
            this.deleteImg = function(t, n) {
                var o = e.getWizAmendImgParent(t)
                  , i = void 0;
                if (o)
                    return void (o.getAttribute(r.ATTR.SPAN_DELETE) || (o.setAttribute(r.ATTR.SPAN_USERID, n.hash),
                    o.setAttribute(r.ATTR.SPAN_DELETE, n.hash),
                    i = o.querySelector("img[" + r.ATTR.IMG_MASK + "]"),
                    l.css(i, r.CSS.IMG.MASK),
                    l.css(i, r.CSS.IMG_DELETED)));
                var a = s.isRangeEdge(t)
                  , d = e.packageImg(t, r.TYPE.IMG_DELETE, n);
                a.isStart && (a.startDom = d,
                a.startOffset = 0),
                a.isEnd && (a.endDom = d.parentNode,
                a.endOffset = l.getIndex(d) + 1),
                a.isCollapsed && a.isStart ? s.setRange(a.startDom, l.getEndOffset(a.startDom), null , null ) : a.isCollapsed || !a.isStart && !a.isEnd || s.setRange(a.startDom, a.startOffset, a.endDom, a.endOffset)
            }
            ,
            this.fixedAmendRange = function() {
                var t = n.doc.getSelection()
                  , r = t.getRangeAt(0)
                  , o = r.startContainer
                  , i = r.endContainer
                  , a = r.startOffset
                  , d = r.endOffset
                  , c = void 0
                  , u = void 0
                  , f = void 0
                  , g = void 0
                  , m = void 0
                  , p = void 0;
                return t.isCollapsed ? (u = s.getRangeAnchor(!1),
                c = 3 === i.nodeType && d > 0 && d < i.nodeValue.length ? u : l.getPreviousNode(u, !1, null )) : (f = s.getRangeAnchor(!0),
                g = s.getRangeAnchor(!1),
                m = e.getWizAmendImgParent(f),
                p = e.getWizAmendImgParent(g),
                m && (o = m,
                a = 0),
                p && (i = p,
                d = p.childNodes.length),
                (m || p) && s.setRange(o, a, i, d)),
                {
                    startImg: m,
                    endImg: p,
                    startDom: o,
                    startOffset: a,
                    endDom: i,
                    endOffset: d,
                    leftDom: c,
                    rightDom: u
                }
            }
            ,
            this.fixSelectionByDeleteImg = function() {
                var t = n.doc.getSelection()
                  , o = t.getRangeAt(0)
                  , i = void 0
                  , a = void 0
                  , s = void 0
                  , d = void 0
                  , c = !1
                  , u = !1;
                0 !== t.rangeCount && (i = e.getWizAmendImgParent(o.startContainer),
                i && !i.getAttribute(r.ATTR.SPAN_DELETE) && (i = null ),
                i ? (c = !0,
                s = 0) : (i = o.startContainer,
                s = o.startOffset),
                t.isCollapsed ? (a = i,
                u = c) : (a = e.getWizAmendImgParent(o.endContainer),
                a ? u = !0 : (a = o.endContainer,
                d = o.endOffset)),
                u && a && a.nextSibling ? (d = 0,
                a = a.nextSibling) : u && a ? (d = l.getIndex(a) + 1,
                a = a.parentNode) : d = o.endOffset,
                t.isCollapsed ? t.collapse(a, d) : (t.collapse(i, s),
                t.extend(a, d)))
            }
            ,
            this.getAmendDoms = function(t) {
                var n = {}
                  , i = {}
                  , a = {
                    insertList: [],
                    deleteList: [],
                    deletedInsertList: []
                }
                  , s = [];
                if (t.selection)
                    n[r.ATTR.SPAN_INSERT] = "",
                    a.insertList = e.getWizSpanFromRange(t.selectAll, n),
                    a.deletedInsertList = l.removeListFilter(a.insertList, function(e) {
                        return e.getAttribute(r.ATTR.SPAN_DELETE)
                    }),
                    i[r.ATTR.SPAN_DELETE] = "",
                    a.deleteList = e.getWizSpanFromRange(t.selectAll, i),
                    s = l.removeListFilter(a.deleteList, function(e) {
                        return e.getAttribute(r.ATTR.SPAN_INSERT)
                    }),
                    a.deletedInsertList = o.removeDup(a.deletedInsertList.concat(s));
                else
                    for (var d = 0, c = t.domList.length; d < c; d++) {
                        var u = t.domList[d];
                        u.getAttribute(r.ATTR.SPAN_DELETE) && u.getAttribute(r.ATTR.SPAN_INSERT) ? a.deletedInsertList.push(u) : u.getAttribute(r.ATTR.SPAN_DELETE) ? a.deleteList.push(u) : u.getAttribute(r.ATTR.SPAN_INSERT) && a.insertList.push(u)
                    }
                return a
            }
            ,
            this.getDeletedStyle = function(e) {
                var t = {};
                t[r.ATTR.SPAN_DELETE] = e.hash,
                t[r.ATTR.SPAN_USERID] = e.hash,
                t[r.ATTR.SPAN_TIMESTAMP] = o.getTime();
                var n = {
                    color: e.color,
                    "text-decoration": "line-through"
                };
                return {
                    attr: t,
                    style: n
                }
            }
            ,
            this.getSameTimeStampDom = function(t) {
                if (!t || 1 !== t.nodeType)
                    return [];
                var n = []
                  , i = function(e, t) {
                    return t ? l.getPreviousNode(e, !1, null ) : l.getNextNode(e, !1, null )
                }
                  , a = function(e) {
                    return e.getAttribute(r.ATTR.SPAN_DELETE) && e.getAttribute(r.ATTR.SPAN_INSERT) ? 1 : e.getAttribute(r.ATTR.SPAN_INSERT) ? 2 : e.getAttribute(r.ATTR.SPAN_DELETE) ? 3 : 0
                }
                  , s = function(t, n, l) {
                    var s = void 0
                      , d = void 0
                      , c = void 0
                      , u = a(t)
                      , f = t.getAttribute(r.ATTR.SPAN_TIMESTAMP)
                      , g = t.getAttribute(r.ATTR.SPAN_USERID);
                    if (f)
                        for (var m = i(t, n); m; )
                            s = e.getWizInsertParent(m) || e.getWizDeleteParent(m),
                            m = s,
                            m && m.getAttribute(r.ATTR.SPAN_USERID) !== g ? m = null  : m && (d = m.getAttribute(r.ATTR.SPAN_TIMESTAMP),
                            c = a(m),
                            u === c && o.isSameAmendTime(m.getAttribute(r.ATTR.SPAN_TIMESTAMP), f) ? (n ? l.splice(0, 0, m) : l.push(m),
                            m = i(m, n)) : m = null )
                }
                ;
                return s(t, !0, n),
                n.push(t),
                s(t, !1, n),
                n
            }
            ,
            this.getSelectedAmendDoms = function() {
                var t = n.doc.getSelection()
                  , r = t.getRangeAt(0)
                  , o = void 0
                  , i = void 0
                  , a = void 0
                  , s = void 0
                  , d = e.getAmendDoms({
                    selection: !0,
                    selectAll: !1
                });
                if (0 === d.insertList.length && 0 === d.deleteList.length && 0 === d.deletedInsertList.length)
                    return null ;
                if (t.isCollapsed)
                    return d;
                var c = function(e, t, n) {
                    if (0 === e.length || 0 === n)
                        return null ;
                    var r = e[0];
                    return r === t || l.contains(r, t) ? (e.splice(0, 1),
                    {
                        dom: t,
                        offset: n
                    }) : null 
                }
                  , u = function(e, t, n) {
                    if (0 === e.length)
                        return null ;
                    var r = 3 === t.nodeType ? t.length : t.childNodes.length;
                    if (n === r)
                        return null ;
                    var o = e[e.length - 1];
                    return o === t || l.contains(o, t) ? (e.splice(e.length - 1, 1),
                    {
                        dom: t,
                        offset: n
                    }) : null 
                }
                ;
                o = r.startContainer,
                a = r.startOffset,
                i = r.endContainer,
                s = r.endOffset;
                var f = c(d.deleteList, o, a);
                f || (f = c(d.insertList, o, a),
                f || (f = c(d.deletedInsertList, o, a)));
                var g = {};
                return i === o && f ? (g.dom = f.dom,
                g.offset = s) : (g = u(d.deleteList, i, s),
                g || (g = u(d.insertList, i, s),
                g || (g = u(d.deletedInsertList, i, s)))),
                d.start = f,
                d.end = g,
                d
            }
            ,
            this.getWizAmendImgParent = function(e) {
                return l.getParentByFilter(e, function(e) {
                    return e && 1 === e.nodeType && e.getAttribute(r.ATTR.IMG)
                }, !0)
            }
            ,
            this.getWizAmendParent = function(e) {
                return l.getParentByFilter(e, function(e) {
                    return e && 1 === e.nodeType && (e.getAttribute(r.ATTR.SPAN_INSERT) || e.getAttribute(r.ATTR.SPAN_DELETE))
                }, !0)
            }
            ,
            this.getWizDeleteParent = function(e) {
                return l.getParentByFilter(e, function(e) {
                    return e && 1 === e.nodeType && e.getAttribute(r.ATTR.SPAN_DELETE)
                }, !0)
            }
            ,
            this.getWizInsertParent = function(e) {
                return l.getParentByFilter(e, function(e) {
                    return e && 1 === e.nodeType && e.getAttribute(r.ATTR.SPAN_INSERT) && !e.getAttribute(r.ATTR.SPAN_DELETE) && e.childNodes.length > 0
                }, !0)
            }
            ,
            this.getWizSpanFromRange = function(e, t) {
                var r = "span";
                if (!t)
                    return [];
                for (var o in t)
                    t.hasOwnProperty(o) && (r += t[o] ? "[" + o + '="' + t[o] + '"]' : "[" + o + "]");
                var i = function(e) {
                    if (!e || 1 !== e.nodeType)
                        return !1;
                    for (var n in t)
                        if (t.hasOwnProperty(n) && (!e.getAttribute(n) || t[n] && e.getAttribute(n) !== t[n]))
                            return !1;
                    return !0
                }
                  , a = n.doc.getSelection()
                  , d = void 0
                  , c = void 0
                  , u = void 0
                  , f = void 0
                  , g = void 0
                  , m = void 0
                  , p = void 0
                  , h = void 0
                  , v = void 0
                  , b = [];
                if (e) {
                    for (var C = n.body.querySelectorAll(r), E = 0, T = C.length; E < T; E++)
                        b.push(C[E]);
                    return b
                }
                if (0 === a.rangeCount)
                    return [];
                if (a.isCollapsed)
                    return c = s.getRangeAnchor(!1),
                    d = l.getPreviousNode(c, !1, null ),
                    c && (c = l.getParentByFilter(c, i, !0),
                    c && b.push(c)),
                    b;
                if (d = s.getRangeAnchor(!0),
                c = s.getRangeAnchor(!1),
                !d || !c)
                    return [];
                if (u = l.getParentByFilter(d, i, !0),
                f = l.getParentByFilter(c, i, !0),
                u && u == f)
                    return [u];
                g = l.getParentRoot([d, c]),
                m = g.querySelectorAll(r),
                p = l.getIndexList(d),
                h = l.getIndexList(c),
                u && b.push(u);
                for (var S = 0, y = m.length; S < y; S++) {
                    var A = m[S];
                    v = l.getIndexList(A),
                    l.compareIndexList(p, v) <= 0 && l.compareIndexList(h, v) >= 0 && b.push(A)
                }
                return b
            }
            ,
            this.isAmendEdited = function() {
                var t = e.getAmendDoms({
                    selection: !0,
                    selectAll: !0
                });
                return !!t && (t.deleteList.length > 0 || t.insertList.length > 0 || t.deletedInsertList.length > 0)
            }
            ,
            this.isWizAmend = function(t) {
                return e.getWizAmendParent(t)
            }
            ,
            this.isWizDelete = function(t) {
                return !!e.getWizDeleteParent(t)
            }
            ,
            this.isWizInsert = function(t) {
                return !!e.getWizInsertParent(t)
            }
            ,
            this.modifyDomForPaste = function(t, i, a) {
                if (t && i) {
                    1 === t.childNodes.length && t.innerText === r.FILL_CHAR && (t.innerHTML = ""),
                    1 === i.childNodes.length && i.innerText === r.FILL_CHAR && (i.innerHTML = "");
                    var s = l.getParentRoot([t, i]);
                    if (s) {
                        var d = void 0
                          , c = void 0
                          , u = void 0
                          , f = void 0
                          , g = void 0;
                        f = l.getListA2B({
                            startDom: t,
                            startOffset: 0,
                            endDom: i,
                            endOffset: l.getEndOffset(i)
                        }),
                        g = f.list;
                        for (var m = 0, p = g.length; m < p; m++) {
                            var h = g[m];
                            if (d = h.parentNode,
                            u = e.getWizAmendParent(h),
                            d) {
                                if (u)
                                    h = u;
                                else if (3 === h.nodeType) {
                                    if (o.isEmpty(h.nodeValue))
                                        continue;l.isWizSpan(d) && 0 === d.children.length ? h = d : (c = e.createDomForInsert(a),
                                    c.innerHTML = "",
                                    d.insertBefore(c, h),
                                    c.appendChild(h),
                                    h = c)
                                }
                                if (l.isTag(h, "img"))
                                    h = e.packageImg(h, r.TYPE.IMG_INSERT, a);
                                else if (l.isSelfClosingTag(h))
                                    continue;e.setDefaultAttr(h, a),
                                e.setUserInsertStyle(h, a)
                            }
                        }
                        s !== n.body && s !== n.body.parentNode && s.parentNode && (s = s.parentNode),
                        g = s.querySelectorAll("span[" + r.ATTR.SPAN_PASTE_TYPE + "]");
                        for (var v = 0, b = g.length; v < b; v++) {
                            var C = g[v];
                            0 === C.childNodes.length ? l.remove(C) : (C.removeAttribute(r.ATTR.SPAN_PASTE_TYPE),
                            C.removeAttribute(r.ATTR.SPAN_PASTE_ID))
                        }
                    }
                }
            }
            ,
            this.packageImg = function(t, o, i) {
                var a = void 0
                  , s = void 0
                  , d = void 0
                  , c = e.createDomForImg(o, i);
                for (a = t.parentNode,
                s = t.nextSibling; s && 3 === s.nodeType && s.nodeValue === r.FILL_CHAR; )
                    d = s,
                    s = s.nextSibiling,
                    l.remove(d);
                c.appendChild(t);
                var u = n.doc.createElement("img");
                return u.className += r.CLASS.IMG_NOT_DRAG,
                u.setAttribute(r.ATTR.IMG_MASK, "1"),
                t.style.maxWidth && (u.style.maxWidth = t.style.maxWidth),
                t.style.maxHeight && (u.style.maxHeight = t.style.maxHeight),
                t.style.width && (u.style.width = t.style.width),
                t.style.height && (u.style.height = t.style.height),
                l.css(u, r.CSS.IMG.MASK),
                o === r.TYPE.IMG_DELETE ? l.css(u, r.CSS.IMG_DELETED) : l.css(u, r.CSS.IMG_INSERT),
                c.appendChild(u),
                a.insertBefore(c, s),
                c
            }
            ,
            this.removeUserDel = function(t, n) {
                var o = []
                  , i = void 0;
                t || (t = s.getRangeParentRoot()),
                t && (l.isBody(t) || (t = t.parentNode),
                i = e.getWizAmendImgParent(t),
                i && i.getAttribute(r.ATTR.SPAN_USERID) !== n.hash && (i = null ),
                i ? o.push(i) : (l.search(t, "[" + r.ATTR.SPAN_INSERT + '="' + n.hash + '"][' + r.ATTR.SPAN_DELETE + '="' + n.hash + '"]', o),
                l.search(t, "[" + r.ATTR.SPAN_USERID + '="' + n.hash + '"] [' + r.ATTR.SPAN_DELETE + '="' + n.hash + '"]', o)));
                for (var a = 0, d = o.length; a < d; a++) {
                    var c = o[a]
                      , u = c.parentNode;
                    u.removeChild(c),
                    l.removeEmptyParent(u)
                }
            }
            ,
            this.removeSelection = function(t) {
                var r = n.doc.getSelection()
                  , o = r.getRangeAt(0)
                  , i = o.startContainer
                  , a = o.startOffset
                  , l = o.endContainer
                  , d = o.endOffset
                  , c = e.getWizAmendImgParent(i)
                  , u = e.getWizAmendImgParent(l)
                  , f = void 0;
                if (u || (f = e.splitInsertDom(l, d, !0, t),
                f.isInsert && f.split && s.setRange(i, a, l, d)),
                c || (f = e.splitInsertDom(i, a, !0, t),
                f.isInsert && f.split && (l === i && (l = f.insertDom.nextSibling,
                d = l.childNodes.length),
                i = f.insertDom,
                a = f.insertDom.childNodes.length,
                s.setRange(i, a, l, d))),
                !r.isCollapsed) {
                    var g = e.getDeletedStyle(t);
                    s.modifySelectionDom(g.style, g.attr),
                    e.fixSelectionByDeleteImg()
                }
            }
            ,
            this.setDefaultAttr = function(e, t) {
                1 === e.nodeType && (e.setAttribute(r.ATTR.SPAN, r.ATTR.SPAN),
                e.setAttribute(r.ATTR.SPAN_INSERT, t.hash),
                e.setAttribute(r.ATTR.SPAN_USERID, t.hash),
                e.setAttribute(r.ATTR.SPAN_TIMESTAMP, o.getTime()))
            }
            ,
            this.setUserImgContainerStyle = function(e) {
                l.css(e, r.CSS.IMG.SPAN)
            }
            ,
            this.setUserInsertStyle = function(e, t) {
                l.css(e, {
                    color: t.color,
                    "text-decoration": "underline"
                })
            }
            ,
            this.splitAmendDomByRange = function(t) {
                var r = n.doc.getSelection()
                  , o = void 0
                  , i = t.startContainer
                  , l = t.endContainer
                  , d = t.startOffset
                  , c = t.endOffset
                  , u = void 0
                  , f = void 0;
                r.isCollapsed ? (u = e.getWizAmendImgParent(t.leftDom),
                f = e.getWizAmendImgParent(t.rightDom),
                f ? (l = f,
                c = 0,
                s.setRange(l, c, l, c)) : u && (i = u,
                d = u.childNodes.length,
                s.setRange(i, d, i, d)),
                o = r.getRangeAt(0),
                l = o.endContainer,
                c = o.endOffset) : (a.execCommand("delete"),
                o = r.getRangeAt(0),
                l = o.endContainer,
                c = o.endOffset);
                var g = e.splitAmendDomForReverse(l, c);
                return g ? (s.setRange(g, 1, g, 1),
                g) : null 
            }
            ,
            this.splitAmendDomForReverse = function(t, n) {
                var r = e.getWizAmendImgParent(t);
                if (!r && 1 === t.nodeType && n > 0 ? (t = t.childNodes[n - 1],
                n = l.getEndOffset(t)) : r || 1 !== t.nodeType || (t = t.childNodes[0]),
                !t)
                    return null ;
                var o = e.getWizInsertParent(t)
                  , i = e.getWizDeleteParent(t)
                  , a = o || i
                  , s = e.createDomForReverse();
                if (r)
                    l.before(s, r, n > 0);
                else {
                    if (!a)
                        return null ;
                    if (a = e.splitWizDomWithTextNode(t, n),
                    !a)
                        return null ;
                    l.after(s, a)
                }
                return s
            }
            ,
            this.splitDeletedDom = function(t, n) {
                if (1 === t.nodeType)
                    return !1;
                var r = null ;
                return !!e.isWizDelete(t) && (r = e.splitWizDomWithTextNode(t, n),
                !!r)
            }
            ,
            this.splitInsertDom = function(t, n, i, a) {
                var s = {
                    insertDom: null ,
                    isInsert: !1,
                    split: !1
                };
                if (!t)
                    return s;
                if (1 === t.nodeType && n > 0 ? (t = t.childNodes[n - 1],
                n = l.getEndOffset(t)) : 1 === t.nodeType && (t = t.childNodes[0]),
                !t)
                    return s;
                var d = e.getWizAmendImgParent(t)
                  , c = e.getWizInsertParent(t)
                  , u = void 0
                  , f = void 0;
                return s.insertDom = c,
                c || 1 !== t.nodeType ? d ? s : (c && (i || c.getAttribute(r.ATTR.SPAN_USERID) !== a.hash) ? s.split = !0 : c && (u = c.getAttribute(r.ATTR.SPAN_TIMESTAMP),
                f = o.getTime(),
                o.getDateForTimeStr(f) - o.getDateForTimeStr(u) >= r.AMEND_TIME_SPACE ? s.split = !0 : c.setAttribute(r.ATTR.SPAN_TIMESTAMP, f)),
                s.split && (s.split = !!e.splitWizDomWithTextNode(t, n)),
                s.isInsert = !!c,
                s) : s
            }
            ,
            this.splitSelectedAmendDoms = function(t) {
                if (t && (t.start || t.end)) {
                    var r = n.doc.getSelection()
                      , o = r.getRangeAt(0)
                      , i = o.startContainer
                      , a = o.startOffset
                      , l = o.endContainer
                      , d = o.endOffset
                      , c = void 0;
                    t.start && t.end && mendDoms.start.dom === t.end.dom ? (e.splitWizDomWithTextNode(t.end.dom, t.end.offset),
                    c = e.splitWizDomWithTextNode(t.start.dom, t.start.offset),
                    c = c.nextSibling,
                    e.add2SelectedAmendDoms(t, c),
                    i = c,
                    a = 0,
                    l = c,
                    d = c.childNodes.length) : (t.start && (c = e.splitWizDomWithTextNode(t.start.dom, t.start.offset),
                    c = c.nextSibling,
                    e.add2SelectedAmendDoms(t, c),
                    i = c,
                    a = 0),
                    t.end && (c = e.splitWizDomWithTextNode(t.end.dom, t.end.offset),
                    e.add2SelectedAmendDoms(t, c),
                    l = c,
                    d = c.childNodes.length)),
                    delete t.start,
                    delete t.end,
                    s.setRange(i, a, l, d)
                }
            }
            ,
            this.splitWizDomWithTextNode = function(e, t) {
                if (!e || 3 !== e.nodeType)
                    return null ;
                var n = void 0
                  , o = void 0
                  , i = void 0
                  , a = void 0
                  , s = null ;
                for (t < e.nodeValue.length ? (n = e.nodeValue.substr(t),
                o = e.cloneNode(!1),
                o.nodeValue = n,
                e.nodeValue = e.nodeValue.substr(0, t),
                e.parentNode.insertBefore(o, e.nextSibling),
                s = e,
                i = e.parentNode,
                a = o) : (i = e.parentNode,
                a = e.nextSibling); i && !l.isBody(i) && (s = i,
                l.splitDomBeforeSub(i, a),
                !i || 1 !== i.nodeType || !i.getAttribute(r.ATTR.SPAN_DELETE) && !i.getAttribute(r.ATTR.SPAN_INSERT)); )
                    a = i.nextSibling,
                    i = i.parentNode;
                return s
            }
            ,
            this.wizAmendDelete = function(e) {
                for (var t = 0, n = e.length; t < n; t++) {
                    var r = e[t]
                      , o = r.parentNode;
                    o.removeChild(r),
                    l.removeEmptyParent(o)
                }
            }
            ,
            this.wizAmendSave = function(t) {
                for (var n = 0, o = t.length; n < o; n++) {
                    var a = t[n];
                    if (a.getAttribute(r.ATTR.SPAN_DELETE) && a.getAttribute(r.ATTR.SPAN_INSERT) && a.getAttribute(r.ATTR.SPAN_INSERT) !== a.getAttribute(r.ATTR.SPAN_USERID)) {
                        var s = i.getUserByGuid(a.getAttribute(r.ATTR.SPAN_INSERT));
                        s = s ? s : {},
                        a.removeAttribute(r.ATTR.SPAN_DELETE),
                        a.setAttribute(r.ATTR.SPAN_USERID, s.hash),
                        a.getAttribute(r.ATTR.IMG) ? (e.setUserImgContainerStyle(a),
                        l.css(mask, r.CSS.IMG_INSERT)) : e.setUserInsertStyle(a, s)
                    } else
                        a.getAttribute(r.ATTR.IMG) ? (l.before(a.children[0], a),
                        l.remove(a)) : (l.css(a, {
                            color: "",
                            "text-decoration": ""
                        }),
                        a.removeAttribute(r.ATTR.SPAN_USERID),
                        a.removeAttribute(r.ATTR.SPAN_INSERT),
                        a.removeAttribute(r.ATTR.SPAN_DELETE),
                        a.removeAttribute(r.ATTR.SPAN_PASTE),
                        a.removeAttribute(r.ATTR.SPAN_PASTE_TYPE),
                        a.removeAttribute(r.ATTR.SPAN_PASTE_ID),
                        a.removeAttribute(r.ATTR.SPAN_TIMESTAMP))
                }
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    25: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = {
            Table: "table",
            Code: "code"
        }
          , i = function() {
            var e = null 
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.blockUtils,
                i = e.require.codeUtils,
                a = e.require.domUtils,
                l = e.require.tableUtils
            }
            ;
            var s = void 0
              , d = void 0
              , c = []
              , u = void 0
              , f = function() {
                if (0 !== c.length) {
                    for (var e = t.options.document.documentElement.clientHeight, n = a.getPageScroll(), r = n.top + e, o = c.length - 1; o >= 0; o--) {
                        var i = c[o];
                        if (i.top < r && i.top + i.height > r && i.target.offsetWidth < i.target.scrollWidth)
                            return d && d.curBlock && d.curBlock.target === i.target ? void h(i) : (d && p(),
                            void v(i))
                    }
                    p()
                }
            }
              , g = function() {
                c = [];
                for (var e = void 0, n = t.body.querySelectorAll("table"), a = n.length - 1; a >= 0; a--) {
                    var s = n[a]
                      , d = l.getContainer(s);
                    d || (l.initTableContainer(s),
                    d = l.getContainer(s)),
                    e = d.querySelector("." + r.CLASS.TABLE_BODY),
                    c.push({
                        type: o.Table,
                        target: e,
                        top: d.offsetTop,
                        height: d.offsetHeight
                    })
                }
                if (!t.client.type.isPhone && !t.client.type.isPad)
                    for (var u = t.body.querySelectorAll("." + r.CLASS.CODE_MIRROR), g = u.length - 1; g >= 0; g--) {
                        var m = u[g]
                          , p = i.getContainerFromChild(m);
                        p || (i.fixCode(m),
                        p = i.getContainerFromChild(m)),
                        p && (e = m.querySelector("." + r.CLASS.CODE_MIRROR_HSCROLL),
                        c.push({
                            type: o.Code,
                            target: e,
                            codeMirror: p.codeMirror,
                            top: p.offsetTop,
                            height: p.offsetHeight
                        }))
                    }
                f()
            }
              , m = function() {
                d && d.parentNode !== s && f(),
                u && clearTimeout(u),
                u = setTimeout(g, 100)
            }
              , p = function() {
                d && (b.unbindScroll(),
                d.curBlock = null ,
                s.appendChild(d))
            }
              , h = function(e) {
                var n = void 0;
                d ? n = d.children[0] : (d = t.doc.createElement(r.TAG.TMP_TAG),
                n = t.doc.createElement("div"),
                d.appendChild(n),
                a.addClass(d, r.CLASS.BLOCK_SCROLL));
                var o = e.target.scrollWidth;
                a.css(n, {
                    width: o + "px",
                    height: "1px",
                    "background-color": "rgba(255, 255, 255, 0.2)"
                }),
                a.css(d, {
                    "background-color": "rgba(255, 255, 255, 0.2)",
                    height: "17px",
                    width: e.target.offsetWidth + "px",
                    "overflow-x": "scroll",
                    "overflow-y": "hidden",
                    position: "fixed",
                    bottom: "0px",
                    "z-index": 999
                }),
                d.scrollLeft = e.target.scrollLeft
            }
              , v = function(e) {
                h(e),
                d.curBlock = e,
                a.after(d, e.target),
                b.bindScroll(),
                b.handler.onTxScroll()
            }
              , b = {
                bind: function() {
                    b.unbind(),
                    t.client.type.isIOS || t.client.type.isAndroid || (t.event.add(r.EVENT.ON_SCROLL, b.handler.onScroll),
                    t.event.add(r.EVENT.ON_DOM_SUBTREE_MODIFIED, b.handler.updateRender),
                    t.win.addEventListener("resize", b.handler.updateRender)),
                    t.readonly || (t.client.type.isPhone || t.client.type.isPad ? t.event.add(r.EVENT.ON_TOUCH_START, b.handler.onMouseDown) : t.event.add(r.EVENT.ON_MOUSE_DOWN, b.handler.onMouseDown))
                },
                unbind: function() {
                    p(),
                    t.event.remove(r.EVENT.ON_SCROLL, b.handler.onScroll),
                    t.event.remove(r.EVENT.ON_DOM_SUBTREE_MODIFIED, b.handler.updateRender),
                    t.win.removeEventListener("resize", b.handler.updateRender),
                    t.event.remove(r.EVENT.ON_TOUCH_START, b.handler.onMouseDown),
                    t.event.remove(r.EVENT.ON_MOUSE_DOWN, b.handler.onMouseDown)
                },
                bindScroll: function() {
                    b.unbindScroll(),
                    d.addEventListener("scroll", b.handler.onSxScroll)
                },
                unbindScroll: function() {
                    d.removeEventListener("scroll", b.handler.onSxScroll)
                },
                handler: {
                    onMouseDown: function(e) {
                        var t = "mousedown" !== e.type || 0 === e.button || 1 === e.button;
                        t && n.checkAndInsertEmptyLine(e)
                    },
                    onScroll: function() {
                        m()
                    },
                    onSxScroll: function() {
                        d.curBlock && (d.curBlock.target.scrollLeft = d.scrollLeft)
                    },
                    onTxScroll: function() {
                        d.curBlock && (d.scrollLeft = d.curBlock.target.scrollLeft)
                    },
                    updateRender: function() {
                        m()
                    }
                }
            };
            this.on = function() {
                b.bind(),
                t.client.type.isIOS || t.client.type.isAndroid || (s || (s = t.doc.createElement("div")),
                m())
            }
            ,
            this.off = function() {
                b.unbind()
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51
    }],
    26: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.commandExtend,
                a = t.require.domUtils,
                l = t.require.historyUtils,
                s = t.require.rangeUtils,
                d = t.require.tableZone
            }
            ;
            var c = function(e, t, n, o) {
                var i = !1
                  , l = !1
                  , s = void 0
                  , d = void 0
                  , c = t ? a.getFirstDeepChild(e) : a.getLastDeepChild(e);
                if (d = a.getParentByClass(c, r.CLASS.CODE_CONTAINER))
                    c = d;
                else
                    for (; c && !a.canEdit(c); )
                        c = t ? a.getNextNodeCanEdit(c, !1) : a.getPreviousNodeCanEdit(c, !1);
                return c && (3 === c.nodeType && (c = c.parentNode),
                s = a.getOffset(c),
                d = a.getParentByFilter(c, o, !0),
                t && n < s.top && d ? i = !0 : !t && n > s.top + c.offsetHeight && d ? l = !0 : c = null ),
                {
                    container: d,
                    isFirst: i,
                    isLast: l
                }
            }
              , u = function(e) {
                return a.hasClass(e, r.CLASS.CODE_CONTAINER) || a.hasClass(e, r.CLASS.TABLE_CONTAINER)
            }
              , f = function(e) {
                return a.getParentByFilter(e, u, !0)
            }
              , g = function(e) {
                return a.hasClass(e, r.CLASS.CODE_CONTAINER) || a.hasClass(e, r.CLASS.TABLE_CONTAINER) || a.hasClass(e, r.CLASS.TABLE_BODY)
            }
            ;
            this.checkAndInsertEmptyLine = function(t) {
                var r = t.changedTouches ? t.changedTouches[0] : null 
                  , i = r ? r.target : t.target
                  , s = o.getEventClientPos(t)
                  , d = a.getPageScroll().top + s.y
                  , m = void 0
                  , p = void 0
                  , h = void 0
                  , v = !1
                  , b = !1
                  , C = void 0
                  , E = a.getParentByFilter(i, function(e) {
                    return "true" === e.getAttribute("contenteditable")
                }, !0) || n.body
                  , T = E && i === E
                  , S = E && i === E.parentNode;
                T || S ? (T && (h = c(E, !0, d, u),
                b = h.isFirst,
                p = h.container),
                b || (h = c(E, !1, d, u),
                v = h.isLast,
                p = h.container)) : g(i) && (p = f(i),
                C = 0,
                p && (C = d - a.getOffset(p).top),
                p && C < 15 ? (m = a.getPreviousNodeCanEdit(i, !1),
                m && !f(m) || (b = !0)) : p && i.offsetHeight - C < 15 && (m = a.getNextNodeCanEdit(i, !1),
                m && !f(m) || (v = !0))),
                p && (v || b) ? (l.saveSnap(!1),
                e.insertEmptyLine(p, v)) : m = null 
            }
            ,
            this.insertBlock = function(e) {
                var t = s.getRange()
                  , o = void 0
                  , l = void 0
                  , d = void 0
                  , c = void 0;
                return t ? (o = s.getRangeDetail(t.startContainer, t.startOffset),
                l = o.container,
                d = a.getBlockParent(l, !0),
                a.hasClass(d, r.CLASS.TODO_LAYER) ? (l = n.doc.createElement(d.tagName),
                a.after(l, d),
                l.appendChild(e),
                d = l) : d && a.isEmptyDom(d) || (i.execCommand("insertparagraph"),
                t = s.getRange(),
                l = t.startContainer,
                d = a.getBlockParent(l, !0)),
                a.isEmptyDom(d) && a.isTag(d, "div") ? (d.innerHTML = "",
                d.appendChild(e)) : (l = n.doc.createElement("div"),
                a.before(l, d),
                l.appendChild(e),
                a.isEmptyDom(d) && a.remove(d),
                d = l)) : (d = n.doc.createElement("div"),
                d.appendChild(e),
                n.body.appendChild(d),
                c = n.doc.createElement("div"),
                c.appendChild(n.doc.createElement("br")),
                n.body.appendChild(c)),
                d
            }
            ,
            this.insertEmptyLine = function(e, t) {
                if (e) {
                    var r = n.doc.createElement("div")
                      , o = n.doc.createElement("br");
                    r.appendChild(o),
                    a.before(r, e, t),
                    d.clear(),
                    s.setRange(o, 0)
                }
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    27: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = e("../../libs/LoadController")
          , a = e("../../libs/dependLoader")
          , l = new i
          , s = function() {
            var e = null 
              , t = null 
              , n = null 
              , i = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.blockUtils,
                i = e.require.codeStyle,
                s = e.require.codeUtils,
                d = e.require.domUtils,
                c = e.require.historyUtils,
                u = e.require.rangeUtils
            }
            ;
            var f = function(e) {
                l.addCallback(e),
                l.loading || ("undefined" == typeof t.win.CodeMirror ? (l.loading = !0,
                a.loadJs(t.doc, a.getDependencyFiles(t.dependency, "js", "codeMirror"), function() {
                    l.loading = !1,
                    l.callback()
                })) : l.callback())
            }
              , g = {
                bind: function() {
                    g.unbind(),
                    t.event.add(r.EVENT.ON_SELECT_PLUGIN_CHANGE, g.handler.onChangeSelector),
                    t.event.add(r.EVENT.BEFORE_GET_DOCHTML, g.handler.beforeGetDocHtml),
                    t.event.add(r.EVENT.BEFORE_SAVESNAP, g.handler.onBeforeSaveSnap),
                    t.event.add(r.EVENT.AFTER_RESTORE_HISTORY, g.handler.onAfterRestoreHistory),
                    t.event.add(r.EVENT.ON_MOUSE_DOWN, g.handler.onMouseDown)
                },
                unbind: function() {
                    t.event.remove(r.EVENT.ON_SELECT_PLUGIN_CHANGE, g.handler.onChangeSelector),
                    t.event.remove(r.EVENT.BEFORE_GET_DOCHTML, g.handler.beforeGetDocHtml),
                    t.event.remove(r.EVENT.BEFORE_SAVESNAP, g.handler.onBeforeSaveSnap),
                    t.event.remove(r.EVENT.AFTER_RESTORE_HISTORY, g.handler.onAfterRestoreHistory),
                    t.event.remove(r.EVENT.ON_MOUSE_DOWN, g.handler.onMouseDown)
                },
                handler: {
                    beforeGetDocHtml: function() {
                        s.saveToText(),
                        i.clearStyle()
                    },
                    onAfterRestoreHistory: function() {
                        for (var e = s.getContainerList(), t = e.length - 1; t >= 0; t--) {
                            var n = e[t]
                              , r = n.codeMirror;
                            if (!r) {
                                s.fixCodeContainer({
                                    container: n
                                });
                                var o = c.getCodeMirrorDoc(n.id);
                                o && (r = n.codeMirror,
                                r.swapDoc(o))
                            }
                        }
                    },
                    onBeforeSaveSnap: function() {
                        for (var e = s.getContainerList(), t = e.length - 1; t >= 0; t--) {
                            var n = e[t]
                              , r = n.codeMirror;
                            r && (r.save(),
                            d.setTextarea(r.getTextArea()))
                        }
                    },
                    onChangeSelector: function(e) {
                        var t = void 0;
                        return d.hasClass(e, r.CLASS.CODE_TOOLS_MODE) ? (t = s.getContainerFromChild(e),
                        s.changeMode(t, e.value, !1),
                        void t.codeMirror.focus()) : void (d.hasClass(e, r.CLASS.CODE_TOOLS_THEME) && (t = s.getContainerFromChild(e),
                        i.insertTheme(e.value),
                        s.changeTheme(t, e.value, !1),
                        t.codeMirror.focus()))
                    },
                    onMouseDown: function(e) {
                        var t = s.getToolsFromChild(e.target);
                        t && o.stopEvent(e)
                    },
                    onKeyDown: function(e) {
                        return !s.onKeyDown(e) || (o.stopEvent(e),
                        !1)
                    }
                }
            };
            this.on = function(e, t) {
                var n = function() {
                    g.bind(),
                    e = e || {},
                    i.initCommon(),
                    s.oldPatch.fixOldCode(e.body),
                    s.fixCodeContainer({
                        body: e.body,
                        container: null ,
                        readOnly: e.readOnly
                    }),
                    t && t()
                }
                ;
                f(n)
            }
            ,
            this.off = function() {
                g.unbind(),
                s.clearCodeMirror()
            }
            ,
            this.insertCode = function() {
                c.saveSnap(!1);
                var e = u.getRange();
                if (!e || s.canCreateCode()) {
                    var o = void 0
                      , i = void 0
                      , a = void 0
                      , l = void 0
                      , f = void 0
                      , g = "";
                    if (e) {
                        if (!e.collapsed) {
                            for (l = t.doc.createElement("div"),
                            f = e.cloneContents(); f.firstChild; )
                                l.appendChild(f.firstChild);
                            l.style.position = "absolute",
                            l.style.top = "0px",
                            l.style.left = "-10000px",
                            l.style.height = "1px",
                            t.body.appendChild(l),
                            g = l.innerText,
                            t.body.removeChild(l),
                            e.deleteContents()
                        }
                        o = u.getRangeDetail(e.startContainer, e.startOffset),
                        o = d.getBlockParent(o.container, !0),
                        o && o !== t.body && d.isEmptyDom(o) && d.isTag(o, "div") && (i = o,
                        o.innerHTML = "")
                    }
                    a = t.doc.createElement("textarea"),
                    d.setTextarea(a, g),
                    i = i ? i : t.doc.createElement("div"),
                    i.appendChild(a),
                    d.addClass(i, r.CLASS.CODE_CONTAINER),
                    i.isNew = !0,
                    i.parentNode || n.insertBlock(i),
                    s.fixCodeContainer({
                        container: i
                    }),
                    i.isNew = !1,
                    setTimeout(function() {
                        i.codeMirror.focus()
                    }, 100),
                    t.event.call(r.EVENT.UPDATE_RENDER)
                }
            }
            ,
            this.onKeyDown = g.handler.onKeyDown
        }
        ;
        t.exports = s
    }
    , {
        "../../config/const": 51,
        "../../libs/LoadController": 53,
        "../../libs/dependLoader": 57,
        "../../libs/utils": 59
    }],
    28: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = {
            tmp: {
                common: ".wiz-code-tools {display:none;position: absolute; top: -32px; right: 0; opacity: .95; z-index: 110;}." + r.CLASS.EDITING + " .CodeMirror-focused .wiz-code-tools {display:block;}.CodeMirror-sizer {border-right: 0 !important;}." + r.CLASS.WIZ_BODY + " pre.prettyprint {padding:0;}." + r.CLASS.WIZ_BODY + " pre.prettyprint code {white-space: pre;}." + r.CLASS.WIZ_BODY + " pre.prettyprint.linenums {box-shadow:none; overflow: auto;-webkit-overflow-scrolling: touch;}." + r.CLASS.WIZ_BODY + " pre.prettyprint.linenums ol.linenums {box-shadow: 40px 0 0 #FBFBFC inset, 41px 0 0 #ECECF0 inset; padding: 10px 10px 10px 40px !important;}",
                reader: "." + r.CLASS.READONLY + " .CodeMirror-cursors {visibility: hidden !important;}",
                phone: "." + r.CLASS.CODE_CONTAINER + "{margin-left:0; margin-right:0;}"
            },
            common: "." + r.CLASS.CODE_CONTAINER + '{position: relative; padding:8px 0; margin: 5px 25px 5px 5px;text-indent:0; text-align:left;}.CodeMirror {font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace; color: black; font-size: 10pt; font-size: 0.83rem}.CodeMirror-lines {padding: 4px 0;}.CodeMirror pre {padding: 0 4px;}.CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {background-color: white;}.CodeMirror-gutters {border-right: 1px solid #ddd; background-color: #f7f7f7; white-space: nowrap;}.CodeMirror-linenumbers {}.CodeMirror-linenumber {padding: 0 3px 0 5px; min-width: 20px; text-align: right; color: #999; white-space: nowrap;}.CodeMirror-guttermarker {color: black;}.CodeMirror-guttermarker-subtle {color: #999;}.CodeMirror-cursor {border-left: 1px solid black; border-right: none; width: 0;}.CodeMirror div.CodeMirror-secondarycursor {border-left: 1px solid silver;}.cm-fat-cursor .CodeMirror-cursor {width: auto; border: 0 !important; background: #7e7;}.cm-fat-cursor div.CodeMirror-cursors {z-index: 1;}.cm-animate-fat-cursor {width: auto; border: 0; -webkit-animation: blink 1.06s steps(1) infinite; -moz-animation: blink 1.06s steps(1) infinite; animation: blink 1.06s steps(1) infinite; background-color: #7e7;}@-moz-keyframes blink {  0% {}  50% { background-color: transparent; }  100% {}}@-webkit-keyframes blink {  0% {}  50% { background-color: transparent; }  100% {}}@keyframes blink {  0% {}  50% { background-color: transparent; }  100% {}}.CodeMirror-overwrite .CodeMirror-cursor {}.cm-tab { display: inline-block; text-decoration: inherit; }.CodeMirror-rulers {position: absolute; left: 0; right: 0; top: -50px; bottom: -20px; overflow: hidden;}.CodeMirror-ruler {border-left: 1px solid #ccc; top: 0; bottom: 0; position: absolute;}.cm-s-default .cm-header {color: blue;}.cm-s-default .cm-quote {color: #090;}.cm-negative {color: #d44;}.cm-positive {color: #292;}.cm-header, .cm-strong {font-weight: bold;}.cm-em {font-style: italic;}.cm-link {text-decoration: underline;}.cm-strikethrough {text-decoration: line-through;}.cm-s-default .cm-keyword {color: #708;}.cm-s-default .cm-atom {color: #219;}.cm-s-default .cm-number {color: #164;}.cm-s-default .cm-def {color: #00f;}.cm-s-default .cm-variable,.cm-s-default .cm-punctuation,.cm-s-default .cm-property,.cm-s-default .cm-operator {}.cm-s-default .cm-variable-2 {color: #05a;}.cm-s-default .cm-variable-3 {color: #085;}.cm-s-default .cm-comment {color: #a50;}.cm-s-default .cm-string {color: #a11;}.cm-s-default .cm-string-2 {color: #f50;}.cm-s-default .cm-meta {color: #555;}.cm-s-default .cm-qualifier {color: #555;}.cm-s-default .cm-builtin {color: #30a;}.cm-s-default .cm-bracket {color: #997;}.cm-s-default .cm-tag {color: #170;}.cm-s-default .cm-attribute {color: #00c;}.cm-s-default .cm-hr {color: #999;}.cm-s-default .cm-link {color: #00c;}.cm-s-default .cm-error {color: #f00;}.cm-invalidchar {color: #f00;}.CodeMirror-composing { border-bottom: 2px solid; }div.CodeMirror span.CodeMirror-matchingbracket {color: #0f0;}div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #f22;}.CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }.CodeMirror-activeline-background {background: #e8f2ff;}.CodeMirror {position: relative; background: #f5f5f5;}.CodeMirror-scroll {overflow: hidden !important; margin-bottom: 0; margin-right: -30px; padding: 16px 30px 16px 0; outline: none; position: relative;}.CodeMirror-sizer {position: relative; border-right: 30px solid transparent;}.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {position: absolute; z-index: 6; display: none;}.CodeMirror-vscrollbar {right: 0; top: 0; overflow-x: hidden; overflow-y: scroll;}.CodeMirror-hscrollbar {bottom: 0; left: 0 !important; overflow-y: hidden; overflow-x: scroll;}.CodeMirror-scrollbar-filler {right: 0; bottom: 0;}.CodeMirror-gutter-filler {left: 0; bottom: 0;}.CodeMirror-gutters {position: absolute; left: 0; top: -5px; min-height: 100%; z-index: 3;}.CodeMirror-gutter {white-space: normal; height: inherit; display: inline-block; vertical-align: top; margin-bottom: -30px;}.CodeMirror-gutter-wrapper {position: absolute; z-index: 4; background: none !important; border: none !important;}.CodeMirror-gutter-background {position: absolute; top: 0; bottom: 0; z-index: 4;}.CodeMirror-gutter-elt {position: absolute; cursor: default; z-index: 4; text-align: center;}.CodeMirror-gutter-wrapper ::selection { background-color: transparent }.CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }.CodeMirror-lines {cursor: text; min-height: 1px;}.CodeMirror pre {-moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0; border-width: 0; background: transparent; font-family: inherit; font-size: inherit; margin: 0; white-space: pre; word-wrap: normal; line-height: inherit; color: inherit; z-index: 2; position: relative; overflow: visible; -webkit-tap-highlight-color: transparent; -webkit-font-variant-ligatures: contextual; font-variant-ligatures: contextual;}.CodeMirror-wrap pre {word-wrap: break-word; white-space: pre-wrap; word-break: normal;}.CodeMirror-linebackground {position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 0;}.CodeMirror-linewidget {position: relative; z-index: 2; overflow: auto;}.CodeMirror-widget {}.CodeMirror-rtl pre { direction: rtl; }.CodeMirror-code {outline: none;}.CodeMirror-scroll,.CodeMirror-sizer,.CodeMirror-gutter,.CodeMirror-gutters,.CodeMirror-linenumber {-moz-box-sizing: content-box; box-sizing: content-box;}.CodeMirror-measure {position: absolute; width: 100%; height: 0; overflow: hidden; visibility: hidden;}.CodeMirror-cursor {position: absolute; pointer-events: none;}.CodeMirror-measure pre { position: static; }div.CodeMirror-cursors {visibility: hidden; position: relative; z-index: 3;}div.CodeMirror-dragcursors {visibility: visible;}.CodeMirror-focused div.CodeMirror-cursors {visibility: visible;}.CodeMirror-selected { background: #d9d9d9; }.CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }.CodeMirror-crosshair { cursor: crosshair; }.CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }.CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }.cm-searching {background: #ffa; background: rgba(255, 255, 0, .4);}.cm-force-border { padding-right: .1px; }@media print {  .CodeMirror div.CodeMirror-cursors {visibility: hidden;}}.cm-tab-wrap-hack:after { content: ""; }span.CodeMirror-selectedtext { background: none; }.CodeMirror-activeline-background, .CodeMirror-selected {transition: visibility 0ms 100ms;}.CodeMirror-blur .CodeMirror-activeline-background, .CodeMirror-blur .CodeMirror-selected {visibility:hidden;}.CodeMirror-blur .CodeMirror-matchingbracket {color:inherit !important;outline:none !important;text-decoration:none !important;}',
            theme: {
                "base16-dark": ".cm-s-base16-dark.CodeMirror { background: #151515; color: #e0e0e0; }.cm-s-base16-dark div.CodeMirror-selected { background: #303030; }.cm-s-base16-dark .CodeMirror-line::selection, .cm-s-base16-dark .CodeMirror-line > span::selection, .cm-s-base16-dark .CodeMirror-line > span > span::selection { background: rgba(48, 48, 48, .99); }.cm-s-base16-dark .CodeMirror-line::-moz-selection, .cm-s-base16-dark .CodeMirror-line > span::-moz-selection, .cm-s-base16-dark .CodeMirror-line > span > span::-moz-selection { background: rgba(48, 48, 48, .99); }.cm-s-base16-dark .CodeMirror-gutters { background: #151515; border-right: 0px; }.cm-s-base16-dark .CodeMirror-guttermarker { color: #ac4142; }.cm-s-base16-dark .CodeMirror-guttermarker-subtle { color: #505050; }.cm-s-base16-dark .CodeMirror-linenumber { color: #505050; }.cm-s-base16-dark .CodeMirror-cursor { border-left: 1px solid #b0b0b0; }.cm-s-base16-dark span.cm-comment { color: #8f5536; }.cm-s-base16-dark span.cm-atom { color: #aa759f; }.cm-s-base16-dark span.cm-number { color: #aa759f; }.cm-s-base16-dark span.cm-property, .cm-s-base16-dark span.cm-attribute { color: #90a959; }.cm-s-base16-dark span.cm-keyword { color: #ac4142; }.cm-s-base16-dark span.cm-string { color: #f4bf75; }.cm-s-base16-dark span.cm-variable { color: #90a959; }.cm-s-base16-dark span.cm-variable-2 { color: #6a9fb5; }.cm-s-base16-dark span.cm-def { color: #d28445; }.cm-s-base16-dark span.cm-bracket { color: #e0e0e0; }.cm-s-base16-dark span.cm-tag { color: #ac4142; }.cm-s-base16-dark span.cm-link { color: #aa759f; }.cm-s-base16-dark span.cm-error { background: #ac4142; color: #b0b0b0; }.cm-s-base16-dark .CodeMirror-activeline-background { background: #202020; }.cm-s-base16-dark .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }",
                "base16-light": ".cm-s-base16-light.CodeMirror { background: #f5f5f5; color: #202020; }.cm-s-base16-light div.CodeMirror-selected { background: #e0e0e0; }.cm-s-base16-light .CodeMirror-line::selection, .cm-s-base16-light .CodeMirror-line > span::selection, .cm-s-base16-light .CodeMirror-line > span > span::selection { background: #e0e0e0; }.cm-s-base16-light .CodeMirror-line::-moz-selection, .cm-s-base16-light .CodeMirror-line > span::-moz-selection, .cm-s-base16-light .CodeMirror-line > span > span::-moz-selection { background: #e0e0e0; }.cm-s-base16-light .CodeMirror-gutters { background: #f5f5f5; border-right: 0px; }.cm-s-base16-light .CodeMirror-guttermarker { color: #ac4142; }.cm-s-base16-light .CodeMirror-guttermarker-subtle { color: #b0b0b0; }.cm-s-base16-light .CodeMirror-linenumber { color: #b0b0b0; }.cm-s-base16-light .CodeMirror-cursor { border-left: 1px solid #505050; }.cm-s-base16-light span.cm-comment { color: #8f5536; }.cm-s-base16-light span.cm-atom { color: #aa759f; }.cm-s-base16-light span.cm-number { color: #aa759f; }.cm-s-base16-light span.cm-property, .cm-s-base16-light span.cm-attribute { color: #90a959; }.cm-s-base16-light span.cm-keyword { color: #ac4142; }.cm-s-base16-light span.cm-string { color: #f4bf75; }.cm-s-base16-light span.cm-variable { color: #90a959; }.cm-s-base16-light span.cm-variable-2 { color: #6a9fb5; }.cm-s-base16-light span.cm-def { color: #d28445; }.cm-s-base16-light span.cm-bracket { color: #202020; }.cm-s-base16-light span.cm-tag { color: #ac4142; }.cm-s-base16-light span.cm-link { color: #aa759f; }.cm-s-base16-light span.cm-error { background: #ac4142; color: #505050; }.cm-s-base16-light .CodeMirror-activeline-background { background: #DDDCDC; }.cm-s-base16-light .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }",
                blackboard: ".cm-s-blackboard.CodeMirror { background: #0C1021; color: #F8F8F8; }.cm-s-blackboard div.CodeMirror-selected { background: #253B76; }.cm-s-blackboard .CodeMirror-line::selection, .cm-s-blackboard .CodeMirror-line > span::selection, .cm-s-blackboard .CodeMirror-line > span > span::selection { background: rgba(37, 59, 118, .99); }.cm-s-blackboard .CodeMirror-line::-moz-selection, .cm-s-blackboard .CodeMirror-line > span::-moz-selection, .cm-s-blackboard .CodeMirror-line > span > span::-moz-selection { background: rgba(37, 59, 118, .99); }.cm-s-blackboard .CodeMirror-gutters { background: #0C1021; border-right: 0; }.cm-s-blackboard .CodeMirror-guttermarker { color: #FBDE2D; }.cm-s-blackboard .CodeMirror-guttermarker-subtle { color: #888; }.cm-s-blackboard .CodeMirror-linenumber { color: #888; }.cm-s-blackboard .CodeMirror-cursor { border-left: 1px solid #A7A7A7; }.cm-s-blackboard .cm-keyword { color: #FBDE2D; }.cm-s-blackboard .cm-atom { color: #D8FA3C; }.cm-s-blackboard .cm-number { color: #D8FA3C; }.cm-s-blackboard .cm-def { color: #8DA6CE; }.cm-s-blackboard .cm-variable { color: #FF6400; }.cm-s-blackboard .cm-operator { color: #FBDE2D; }.cm-s-blackboard .cm-comment { color: #AEAEAE; }.cm-s-blackboard .cm-string { color: #61CE3C; }.cm-s-blackboard .cm-string-2 { color: #61CE3C; }.cm-s-blackboard .cm-meta { color: #D8FA3C; }.cm-s-blackboard .cm-builtin { color: #8DA6CE; }.cm-s-blackboard .cm-tag { color: #8DA6CE; }.cm-s-blackboard .cm-attribute { color: #8DA6CE; }.cm-s-blackboard .cm-header { color: #FF6400; }.cm-s-blackboard .cm-hr { color: #AEAEAE; }.cm-s-blackboard .cm-link { color: #8DA6CE; }.cm-s-blackboard .cm-error { background: #9D1E15; color: #F8F8F8; }.cm-s-blackboard .CodeMirror-activeline-background { background: #3C3636; }.cm-s-blackboard .CodeMirror-matchingbracket { outline:1px solid grey;color:white !important; }",
                eclipse: ".cm-s-eclipse span.cm-meta { color: #FF1717; }.cm-s-eclipse span.cm-keyword { line-height: 1em; font-weight: bold; color: #7F0055; }.cm-s-eclipse span.cm-atom { color: #219; }.cm-s-eclipse span.cm-number { color: #164; }.cm-s-eclipse span.cm-def { color: #00f; }.cm-s-eclipse span.cm-variable { color: black; }.cm-s-eclipse span.cm-variable-2 { color: #0000C0; }.cm-s-eclipse span.cm-variable-3 { color: #0000C0; }.cm-s-eclipse span.cm-property { color: black; }.cm-s-eclipse span.cm-operator { color: black; }.cm-s-eclipse span.cm-comment { color: #3F7F5F; }.cm-s-eclipse span.cm-string { color: #2A00FF; }.cm-s-eclipse span.cm-string-2 { color: #f50; }.cm-s-eclipse span.cm-qualifier { color: #555; }.cm-s-eclipse span.cm-builtin { color: #30a; }.cm-s-eclipse span.cm-bracket { color: #cc7; }.cm-s-eclipse span.cm-tag { color: #170; }.cm-s-eclipse span.cm-attribute { color: #00c; }.cm-s-eclipse span.cm-link { color: #219; }.cm-s-eclipse span.cm-error { color: #f00; }.cm-s-eclipse .CodeMirror-activeline-background { background: #e8f2ff; }.cm-s-eclipse .CodeMirror-matchingbracket { outline:1px solid grey; color:black !important; }",
                material: ".cm-s-material.CodeMirror {background-color: #263238; color: rgba(233, 237, 237, 1);}.cm-s-material .CodeMirror-gutters {background: #263238; color: rgb(83,127,126); border: none;}.cm-s-material .CodeMirror-guttermarker, .cm-s-material .CodeMirror-guttermarker-subtle, .cm-s-material .CodeMirror-linenumber { color: rgb(83,127,126); }.cm-s-material .CodeMirror-cursor { border-left: 1px solid #f8f8f0; }.cm-s-material div.CodeMirror-selected { background: rgba(255, 255, 255, 0.15); }.cm-s-material.CodeMirror-focused div.CodeMirror-selected { background: rgba(255, 255, 255, 0.10); }.cm-s-material .CodeMirror-line::selection, .cm-s-material .CodeMirror-line > span::selection, .cm-s-material .CodeMirror-line > span > span::selection { background: rgba(255, 255, 255, 0.10); }.cm-s-material .CodeMirror-line::-moz-selection, .cm-s-material .CodeMirror-line > span::-moz-selection, .cm-s-material .CodeMirror-line > span > span::-moz-selection { background: rgba(255, 255, 255, 0.10); }.cm-s-material .CodeMirror-activeline-background { background: rgba(0, 0, 0, 0); }.cm-s-material .cm-keyword { color: rgba(199, 146, 234, 1); }.cm-s-material .cm-operator { color: rgba(233, 237, 237, 1); }.cm-s-material .cm-variable-2 { color: #80CBC4; }.cm-s-material .cm-variable-3 { color: #82B1FF; }.cm-s-material .cm-builtin { color: #DECB6B; }.cm-s-material .cm-atom { color: #F77669; }.cm-s-material .cm-number { color: #F77669; }.cm-s-material .cm-def { color: rgba(233, 237, 237, 1); }.cm-s-material .cm-string { color: #C3E88D; }.cm-s-material .cm-string-2 { color: #80CBC4; }.cm-s-material .cm-comment { color: #546E7A; }.cm-s-material .cm-variable { color: #82B1FF; }.cm-s-material .cm-tag { color: #80CBC4; }.cm-s-material .cm-meta { color: #80CBC4; }.cm-s-material .cm-attribute { color: #FFCB6B; }.cm-s-material .cm-property { color: #80CBAE; }.cm-s-material .cm-qualifier { color: #DECB6B; }.cm-s-material .cm-variable-3 { color: #DECB6B; }.cm-s-material .cm-tag { color: rgba(255, 83, 112, 1); }.cm-s-material .cm-error {color: rgba(255, 255, 255, 1.0); background-color: #EC5F67;}.cm-s-material .CodeMirror-matchingbracket {text-decoration: underline; color: white !important;}",
                monokai: ".cm-s-monokai.CodeMirror { background: #272822; color: #f8f8f2; }.cm-s-monokai div.CodeMirror-selected { background: #49483E; }.cm-s-monokai .CodeMirror-line::selection, .cm-s-monokai .CodeMirror-line > span::selection, .cm-s-monokai .CodeMirror-line > span > span::selection { background: rgba(73, 72, 62, .99); }.cm-s-monokai .CodeMirror-line::-moz-selection, .cm-s-monokai .CodeMirror-line > span::-moz-selection, .cm-s-monokai .CodeMirror-line > span > span::-moz-selection { background: rgba(73, 72, 62, .99); }.cm-s-monokai .CodeMirror-gutters { background: #272822; border-right: 0px; }.cm-s-monokai .CodeMirror-guttermarker { color: white; }.cm-s-monokai .CodeMirror-guttermarker-subtle { color: #d0d0d0; }.cm-s-monokai .CodeMirror-linenumber { color: #d0d0d0; }.cm-s-monokai .CodeMirror-cursor { border-left: 1px solid #f8f8f0; }.cm-s-monokai span.cm-comment { color: #75715e; }.cm-s-monokai span.cm-atom { color: #ae81ff; }.cm-s-monokai span.cm-number { color: #ae81ff; }.cm-s-monokai span.cm-property, .cm-s-monokai span.cm-attribute { color: #a6e22e; }.cm-s-monokai span.cm-keyword { color: #f92672; }.cm-s-monokai span.cm-builtin { color: #66d9ef; }.cm-s-monokai span.cm-string { color: #e6db74; }.cm-s-monokai span.cm-variable { color: #f8f8f2; }.cm-s-monokai span.cm-variable-2 { color: #9effff; }.cm-s-monokai span.cm-variable-3 { color: #66d9ef; }.cm-s-monokai span.cm-def { color: #fd971f; }.cm-s-monokai span.cm-bracket { color: #f8f8f2; }.cm-s-monokai span.cm-tag { color: #f92672; }.cm-s-monokai span.cm-header { color: #ae81ff; }.cm-s-monokai span.cm-link { color: #ae81ff; }.cm-s-monokai span.cm-error { background: #f92672; color: #f8f8f0; }.cm-s-monokai .CodeMirror-activeline-background { background: #373831; }.cm-s-monokai .CodeMirror-matchingbracket {text-decoration: underline; color: white !important;}",
                "tomorrow-night-eighties": ".cm-s-tomorrow-night-eighties.CodeMirror { background: #000000; color: #CCCCCC; }.cm-s-tomorrow-night-eighties div.CodeMirror-selected { background: #2D2D2D; }.cm-s-tomorrow-night-eighties .CodeMirror-line::selection, .cm-s-tomorrow-night-eighties .CodeMirror-line > span::selection, .cm-s-tomorrow-night-eighties .CodeMirror-line > span > span::selection { background: rgba(45, 45, 45, 0.99); }.cm-s-tomorrow-night-eighties .CodeMirror-line::-moz-selection, .cm-s-tomorrow-night-eighties .CodeMirror-line > span::-moz-selection, .cm-s-tomorrow-night-eighties .CodeMirror-line > span > span::-moz-selection { background: rgba(45, 45, 45, 0.99); }.cm-s-tomorrow-night-eighties .CodeMirror-gutters { background: #000000; border-right: 0px; }.cm-s-tomorrow-night-eighties .CodeMirror-guttermarker { color: #f2777a; }.cm-s-tomorrow-night-eighties .CodeMirror-guttermarker-subtle { color: #777; }.cm-s-tomorrow-night-eighties .CodeMirror-linenumber { color: #515151; }.cm-s-tomorrow-night-eighties .CodeMirror-cursor { border-left: 1px solid #6A6A6A; }.cm-s-tomorrow-night-eighties span.cm-comment { color: #d27b53; }.cm-s-tomorrow-night-eighties span.cm-atom { color: #a16a94; }.cm-s-tomorrow-night-eighties span.cm-number { color: #a16a94; }.cm-s-tomorrow-night-eighties span.cm-property, .cm-s-tomorrow-night-eighties span.cm-attribute { color: #99cc99; }.cm-s-tomorrow-night-eighties span.cm-keyword { color: #f2777a; }.cm-s-tomorrow-night-eighties span.cm-string { color: #ffcc66; }.cm-s-tomorrow-night-eighties span.cm-variable { color: #99cc99; }.cm-s-tomorrow-night-eighties span.cm-variable-2 { color: #6699cc; }.cm-s-tomorrow-night-eighties span.cm-def { color: #f99157; }.cm-s-tomorrow-night-eighties span.cm-bracket { color: #CCCCCC; }.cm-s-tomorrow-night-eighties span.cm-tag { color: #f2777a; }.cm-s-tomorrow-night-eighties span.cm-link { color: #a16a94; }.cm-s-tomorrow-night-eighties span.cm-error { background: #f2777a; color: #6A6A6A; }.cm-s-tomorrow-night-eighties .CodeMirror-activeline-background { background: #343600; }.cm-s-tomorrow-night-eighties .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }"
            }
        }
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.wizStyle
            }
            ,
            this.clearStyle = function() {
                for (var e = n.doc.getElementsByName(r.NAME.CODE_STYLE), t = e.length - 1; t >= 0; t--) {
                    var o = e[t]
                      , a = o.id.replace(r.ID.CODE_STYLE + "-", "");
                    n.doc.querySelector("." + r.CLASS.CODE_CONTAINER + "[data-theme=" + a + "]") || i.removeStyleById(o.id)
                }
                var l = n.doc.querySelectorAll("." + r.CLASS.CODE_CONTAINER);
                0 === l.length && i.removeStyleById(r.ID.CODE_STYLE)
            }
            ,
            this.initCommon = function() {
                i.replaceStyleById(r.ID.CODE_STYLE, o.common, !1),
                e.insertTemp()
            }
            ,
            this.insertCommon = function() {
                var e = n.doc.getElementById(r.ID.CODE_STYLE);
                e || i.replaceStyleById(r.ID.CODE_STYLE, o.common, !1)
            }
            ,
            this.insertTemp = function() {
                i.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "code_common",
                    name: r.NAME.TMP_STYLE
                }, o.tmp.common),
                (n.client.type.isPhone || n.client.type.isPad) && i.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "code_phone",
                    name: r.NAME.TMP_STYLE
                }, o.tmp.phone),
                i.insertStyle({
                    id: r.ID.TMP_STYLE_PRE + "code_reader",
                    name: r.NAME.TMP_STYLE
                }, o.tmp.reader)
            }
            ,
            this.insertTheme = function(e) {
                o.theme[e] && !n.doc.querySelector("#" + r.ID.CODE_STYLE + "-" + e) && i.insertStyle({
                    id: r.ID.CODE_STYLE + "-" + e,
                    name: r.NAME.CODE_STYLE
                }, o.theme[e])
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51
    }],
    29: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = {
            MODE: {
                APL: {
                    cm: "text/apl",
                    file: "apl",
                    same: ["apollo"]
                },
                C: {
                    cm: "text/x-csrc",
                    file: "clike",
                    same: []
                },
                "C++": {
                    cm: "text/x-c++src",
                    file: "clike",
                    same: ["cpp"]
                },
                "C#": {
                    cm: "text/x-csharp",
                    file: "clike",
                    same: ["cs"]
                },
                CSS: {
                    cm: "text/css",
                    file: "css",
                    same: []
                },
                Dart: {
                    cm: "application/dart",
                    file: ["clike", "dart"],
                    same: []
                },
                Erlang: {
                    cm: "text/x-erlang",
                    file: "erlang",
                    same: []
                },
                Go: {
                    cm: "text/x-go",
                    file: "go",
                    same: []
                },
                HTML: {
                    cm: "text/html",
                    file: [["xml", "css", "javascript", "vbscript"], ["htmlmixed"]],
                    same: []
                },
                Java: {
                    cm: "text/x-java",
                    file: "clike",
                    same: []
                },
                JavaScript: {
                    cm: "text/javascript",
                    file: "javascript",
                    same: ["js"]
                },
                JSX: {
                    cm: "text/jsx",
                    file: [["xml", "javascript"], ["jsx"]],
                    same: []
                },
                Lisp: {
                    cm: "text/x-common-lisp",
                    file: "commonlisp",
                    same: []
                },
                Lua: {
                    cm: "text/x-lua",
                    file: "lua",
                    same: []
                },
                "Octave (MATLAB)": {
                    cm: "text/x-octave",
                    file: "octave",
                    same: ["matlab", "octave"]
                },
                "Objective-C": {
                    cm: "text/x-objectivec",
                    file: "clike",
                    same: []
                },
                Pascal: {
                    cm: "text/x-pascal",
                    file: "pascal",
                    same: []
                },
                Perl: {
                    cm: "text/x-perl",
                    file: "perl",
                    same: []
                },
                PHP: {
                    cm: "application/x-httpd-php",
                    file: "php",
                    same: []
                },
                Python: {
                    cm: "text/x-python",
                    file: "python",
                    same: ["py"]
                },
                Ruby: {
                    cm: "text/x-ruby",
                    file: "ruby",
                    same: ["rb"]
                },
                Shell: {
                    cm: "text/x-sh",
                    file: "shell",
                    same: ["sh"]
                },
                SQL: {
                    cm: "text/x-sql",
                    file: "sql",
                    same: []
                },
                Swift: {
                    cm: "text/x-swift",
                    file: "swift",
                    same: []
                },
                VBScript: {
                    cm: "text/vbscript",
                    file: "vbscript",
                    same: ["basic", "vb"]
                },
                Verilog: {
                    cm: "text/x-verilog",
                    file: "verilog",
                    same: []
                },
                VHDL: {
                    cm: "text/x-vhdl",
                    file: "vhdl",
                    same: []
                },
                XML: {
                    cm: "application/xml",
                    file: "xml",
                    same: []
                },
                XSL: {
                    cm: "application/xml",
                    file: "xml",
                    same: []
                },
                YAML: {
                    cm: "text/x-yaml",
                    file: "yaml",
                    same: []
                }
            },
            THEME: {
                default: {
                    name: "L1 (default)",
                    same: ["L1"]
                },
                "base16-light": {
                    name: "L2 (base16-light)",
                    same: ["L2"]
                },
                eclipse: {
                    name: "L3 (eclipse)",
                    same: ["L3"]
                },
                "base16-dark": {
                    name: "D1 (base16-dark)",
                    same: ["D1"]
                },
                blackboard: {
                    name: "D2 (blackboard)",
                    same: ["D2"]
                },
                material: {
                    name: "D3 (material)",
                    same: ["D3"]
                },
                monokai: {
                    name: "D4 (monokai)",
                    same: ["D4"]
                },
                "tomorrow-night-eighties": {
                    name: "D5 (tomorrow)",
                    same: ["D5"]
                }
            }
        }
          , a = {
            mode: "wiz-code-mode",
            theme: "wiz-code-theme"
        }
          , l = []
          , s = []
          , d = {}
          , c = {};
        !function() {
            for (var e in i.MODE)
                if (i.MODE.hasOwnProperty(e)) {
                    l.push({
                        text: e,
                        value: e
                    });
                    var t = i.MODE[e].same;
                    d[e.toLowerCase()] = e;
                    for (var n = 0; n < t.length; n++)
                        d[t[n].toLowerCase()] = e
                }
            for (var r in i.THEME)
                if (i.THEME.hasOwnProperty(r)) {
                    s.push({
                        text: i.THEME[r].name,
                        value: r
                    });
                    var o = i.THEME[r].same;
                    c[r.toLowerCase()] = r;
                    for (var a = 0; a < o.length; a++)
                        c[o[a].toLowerCase()] = r
                }
        }();
        var u = function() {
            var e = this
              , t = null 
              , n = null 
              , u = null 
              , f = null 
              , g = null 
              , m = null 
              , p = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                u = t.require.codeStyle,
                f = t.require.domUtils,
                g = t.require.historyUtils,
                m = t.require.rangeUtils,
                p = t.require.selectPlugin
            }
            ,
            this.canCreateCode = function() {
                var t = m.getRange();
                return !(!t || e.getContainerFromChild(t.startContainer) || f.getParentByClass(t.startContainer, r.CLASS.TABLE_CONTAINER, !0))
            }
            ,
            this.changeMode = function(e, t, r) {
                if (e) {
                    var o = e.codeMirror;
                    o && (o.setOption("mode", i.MODE[t].cm),
                    f.attr(e, {
                        "data-mode": t
                    }),
                    n.win.localStorage && !r && n.win.localStorage.setItem(a.mode, t))
                }
            }
            ,
            this.changeTheme = function(e, t, r) {
                if (e) {
                    t = t || "default";
                    var o = e.codeMirror;
                    o && (u.insertTheme(t),
                    o.setOption("theme", t),
                    f.attr(e, {
                        "data-theme": t
                    }),
                    n.win.localStorage && !r && n.win.localStorage.setItem(a.theme, t))
                }
            }
            ,
            this.clearCodeMirror = function(t) {
                t = t ? t : e.getContainerList();
                for (var n = t.length - 1; n >= 0; n--) {
                    var r = t[n];
                    if (r.codeMirror) {
                        var o = r.codeMirror;
                        o.setOption("readOnly", !0),
                        o.setOption("styleActiveLine", !1),
                        o.getDoc().clearHistory()
                    }
                }
            }
            ,
            this.clearCodeForMarkdown = function(t) {
                for (var o = t.querySelectorAll("." + r.CLASS.CODE_CONTAINER), i = n.readonly, a = o.length - 1; a >= 0; a--) {
                    var l = o[a]
                      , s = l.querySelector("textarea")
                      , d = e.getCmMode(l, i)
                      , c = e.getCmTheme(l, i)
                      , u = "```" + d + "," + c + "\n" + s.value + "\n```"
                      , g = n.doc.createElement("pre");
                    g.appendChild(n.doc.createTextNode(u)),
                    f.before(g, l),
                    f.remove(l)
                }
            }
            ,
            this.fixCode = function(e) {
                if (!e)
                    return null ;
                var t = e.parentNode;
                return f.hasClass(t, r.CLASS.CODE_CONTAINER) ? null  : (t !== n.body && 1 === t.childNodes.length || (t = n.doc.createElement("div"),
                f.before(t, e),
                t.appendChild(e)),
                t)
            }
            ,
            this.fixCodeContainer = function(t) {
                t = t || {};
                for (var r = t.container ? [t.container] : e.getContainerList(t.body), o = r.length - 1; o >= 0; o--) {
                    var i = r[o];
                    i.removeAttribute("style"),
                    i.removeAttribute("id"),
                    i.removeAttribute("class"),
                    e.fixCodeContainerParent(i),
                    n.options.reader.codeNoIDE ? e.initCodeNoIDE(i) : e.initCodeMirror({
                        container: i,
                        readOnly: t.readOnly
                    })
                }
            }
            ,
            this.fixCodeContainerParent = function(e) {
                var t = void 0
                  , n = void 0
                  , o = f.getParentByTagName(e, ["ol", "ul"], !0);
                if (!o && (t = f.getParentList(e),
                t.length > 0)) {
                    if (f.hasClass(t[0], r.CLASS.WIZ_EIDTOR_PREVIEW_CONTAINER) || f.hasClass(t[0], r.CLASS.WIZ_BODY))
                        return;
                    n = f.splitDomSingle(t[0], e),
                    f.before(e, n),
                    f.remove(n)
                }
            }
            ,
            this.focusToFirst = function(e) {
                e.focus(),
                e.setCursor({
                    line: 0,
                    ch: 0
                })
            }
            ,
            this.focusToLast = function(e) {
                e.focus(),
                e.setCursor({
                    line: e.lastLine(),
                    ch: e.getLineHandle(e.lastLine()).text.length
                })
            }
            ,
            this.getCmMode = function(e, t) {
                var r = (e.getAttribute("data-mode") || "").toLowerCase()
                  , o = "";
                return e.isNew && n.win.localStorage && !t && (o = (n.win.localStorage.getItem(a.mode) || "").toLowerCase()),
                d[r] || d[o] || "JavaScript"
            }
            ,
            this.getCmTheme = function(e, t) {
                var r = (e.getAttribute("data-theme") || "").toLowerCase()
                  , o = "";
                return e.isNew && n.win.localStorage && !t && (o = (n.win.localStorage.getItem(a.theme) || "").toLowerCase()),
                c[r] || c[o] || "default"
            }
            ,
            this.getCmWrapper = function(e) {
                return e.querySelector("." + r.CLASS.CODE_MIRROR)
            }
            ,
            this.getContainerFromChild = function(e) {
                return f.getParentByClass(e, r.CLASS.CODE_CONTAINER, !0)
            }
            ,
            this.getContainerList = function(e) {
                return e = e || n.body,
                e.querySelectorAll("." + r.CLASS.CODE_CONTAINER)
            }
            ,
            this.getToolsFromChild = function(e) {
                return f.getParentByClass(e, r.CLASS.CODE_TOOLS, !0)
            }
            ,
            this.initCodeNoIDE = function(t) {
                if (t) {
                    e.removeCmWrapper(t);
                    var r = t.querySelector("textarea")
                      , o = ""
                      , i = void 0
                      , a = void 0;
                    r && (o = r.textContent,
                    i = n.doc.createElement("pre"),
                    a = n.doc.createElement("code"),
                    i.appendChild(a),
                    a.textContent = o,
                    f.before(i, r),
                    f.remove(r))
                }
            }
            ,
            this.initCodeMirror = function(t) {
                var a = t.container
                  , l = t.readOnly;
                if (a) {
                    u.insertCommon();
                    var s = void 0
                      , d = void 0
                      , c = void 0
                      , p = void 0
                      , h = void 0
                      , v = void 0
                      , b = void 0;
                    if (a.id || (a.id = "wiz_cm_" + (new Date).valueOf() + "_" + Math.floor(1e4 * Math.random())),
                    f.addClass(a, r.CLASS.CODE_CONTAINER),
                    f.attr(a, {
                        contenteditable: "false"
                    }),
                    v = e.getCmMode(a, l),
                    b = e.getCmTheme(a, l),
                    a.codeMirror)
                        return c = a.codeMirror,
                        void (l ? (c.setOption("matchBrackets", !1),
                        c.setOption("readOnly", !n.client.type.isPhone && !n.client.type.isPad || "nocursor"),
                        c.setOption("styleActiveLine", !1),
                        c.getDoc().clearHistory()) : (c.setOption("matchBrackets", !0),
                        c.setOption("readOnly", !1),
                        c.setOption("styleActiveLine", !0)));
                    for (e.removeCmWrapper(a); a.lastChild && !f.isTag(a.lastChild, "textarea"); )
                        a.removeChild(a.lastChild);
                    d = a.querySelector("textarea"),
                    f.setTextarea(d, o.replaceSpecialChar(d.value)),
                    s = {
                        fixedGutter: !1,
                        indentUnit: 4,
                        lineWrapping: !0,
                        scrollbarStyle: "null",
                        lineNumbers: !0,
                        matchBrackets: !l,
                        mode: i.MODE[v].cm,
                        extraKeys: {
                            Tab: function(e) {
                                var t = Array(e.getOption("indentUnit") + 1).join(" ");
                                e.replaceSelection(t)
                            },
                            "Ctrl-Z": function() {
                                g.undo()
                            },
                            "Cmd-Z": function() {
                                g.undo()
                            },
                            "Ctrl-Y": function() {
                                g.redo()
                            },
                            "Shift-Cmd-Z": function() {
                                g.redo()
                            },
                            "Cmd-Y": function() {
                                g.redo()
                            }
                        }
                    },
                    l ? (s.readOnly = !n.client.type.isPhone && !n.client.type.isPad || "nocursor",
                    s.styleActiveLine = !1) : (s.readOnly = !1,
                    s.styleActiveLine = !0),
                    c = n.win.CodeMirror.fromTextArea(d, s),
                    a.codeMirror = c,
                    a.mode = v,
                    c.display.wrapper.setAttribute("data-id", a.id),
                    p = a.querySelector("." + r.CLASS.CODE_MIRROR),
                    h = n.doc.createElement(r.TAG.CODE_MIRROR),
                    f.before(h, p),
                    h.appendChild(p),
                    e.changeMode(a, v, l),
                    e.changeTheme(a, b, l);
                    var C = void 0
                      , E = "";
                    c.on("keydown", function(e, t) {
                        var n = t.keyCode || t.which;
                        C = 37 === n || 38 === n ? -1 : 39 === n || 40 === n ? 1 : 0
                    }),
                    c.on("beforeSelectionChange", function(t, r) {
                        var o = r.ranges[0]
                          , i = o.anchor
                          , l = o.head
                          , s = void 0
                          , d = [i.line, i.ch, l.line, l.ch].join(".")
                          , c = void 0;
                        if ("+move" === r.origin && i.line === l.line && i.ch === l.ch && d === E)
                            if (C === -1) {
                                for (s = f.getPreviousNode(a); s && !f.isTag(s, "br") && f.isEmptyDom(s); )
                                    s = f.getPreviousNode(s);
                                s && (c = e.getContainerFromChild(s),
                                c ? (t = c.codeMirror,
                                e.focusToLast(t)) : (n.body.setAttribute("contenteditable", !0),
                                m.setRange(s, f.getEndOffset(s))))
                            } else if (1 === C) {
                                for (s = f.getNextNode(a); s && !f.isTag(s, "br") && f.isEmptyDom(s); )
                                    s = f.getNextNode(s);
                                s && (c = e.getContainerFromChild(s),
                                c ? (t = c.codeMirror,
                                e.focusToFirst(t)) : (n.body.setAttribute("contenteditable", !0),
                                m.setRange(s, 0)))
                            }
                        E = d
                    }),
                    c.on("beforeChange", function(e, t) {
                        "redo" !== t.origin && "undo" !== t.origin && g.saveSnap(!1, {
                            type: r.HISTORY.TYPE.CODE_MIRROR,
                            cmContainerId: a.id
                        })
                    }),
                    c.on("change", function(e, t) {
                        /^(redo|undo|paste)$/i.test(t.origin) && e.setSize()
                    }),
                    c.on("copy", function(e, t) {
                        (n.client.type.isPhone || n.client.type.isPad) && l && (t.codemirrorIgnore = !0)
                    }),
                    c.on("focus", function(t, n) {
                        var r = e.getContainerFromChild(t.display.wrapper);
                        e.initTools(r, l)
                    }),
                    c.on("blur", function(e, t) {});
                    var T = a.querySelector(".CodeMirror-sizer")
                      , S = void 0;
                    T && (S = T.nextElementSibling,
                    S && (S.style.height = "13px"))
                }
            }
            ,
            this.initTools = function(t, o) {
                if (t && !o && !n.client.type.isPhone && !n.client.type.isPad) {
                    var i = e.getCmWrapper(t)
                      , a = t.querySelector("." + r.CLASS.CODE_TOOLS)
                      , d = void 0
                      , c = void 0
                      , u = e.getCmMode(t, o)
                      , g = t.getAttribute("data-theme");
                    a || (a = n.doc.createElement(r.TAG.TMP_TAG),
                    d = p.create(l, r.CLASS.CODE_TOOLS_MODE, u),
                    c = p.create(s, r.CLASS.CODE_TOOLS_THEME, g),
                    a.appendChild(d),
                    a.appendChild(c),
                    f.addClass(d, r.CLASS.CODE_TOOLS_MODE),
                    f.addClass(c, r.CLASS.CODE_TOOLS_THEME),
                    f.addClass(a, r.CLASS.CODE_TOOLS)),
                    i.appendChild(a)
                }
            }
            ,
            this.insertCodeSrc = function(e, t) {
                var n = e.codeMirror;
                n && n.replaceSelection(t, "end")
            }
            ,
            this.onKeyDown = function(t) {
                var r = m.getRange()
                  , o = n.doc.getSelection();
                if (!r || !r.collapsed)
                    return !1;
                var i = t.keyCode || t.which
                  , a = m.getRangeDetail(r.startContainer, r.startOffset)
                  , l = void 0
                  , s = void 0
                  , d = void 0
                  , c = void 0
                  , u = void 0
                  , p = !1
                  , h = !1
                  , v = null 
                  , b = null 
                  , C = null 
                  , E = void 0;
                if (8 === i && 0 === a.offset && (d = f.getPreviousNode(a.container, !1),
                C = e.getContainerFromChild(d)),
                46 === i && (f.isTag(a.container, "br") || a.offset === f.getEndOffset(a.container)) && (d = f.getNextNode(a.container, !1),
                C = e.getContainerFromChild(d),
                C && f.isTag(a.container, "br")))
                    return f.remove(a.container),
                    e.focusToFirst(C.codeMirror),
                    !0;
                if (C)
                    return g.saveSnap(!1),
                    f.remove(C),
                    !0;
                switch (i) {
                case 37:
                    t.ctrlKey || t.metaKey || (u = !0,
                    o.modify("move", "backward", "character")),
                    c = {
                        x: -1,
                        y: 0
                    };
                    break;
                case 38:
                    t.ctrlKey || t.metaKey || (u = !0,
                    o.modify("move", "backward", "line")),
                    c = {
                        x: 0,
                        y: -1
                    };
                    break;
                case 39:
                    t.ctrlKey || t.metaKey || (u = !0,
                    o.modify("move", "forward", "character")),
                    c = {
                        x: 1,
                        y: 0
                    };
                    break;
                case 40:
                    t.ctrlKey || t.metaKey || (u = !0,
                    o.modify("move", "forward", "line")),
                    c = {
                        x: 0,
                        y: 1
                    }
                }
                if (u) {
                    if (r = m.getRange(),
                    l = m.getRangeDetail(r.startContainer, r.startOffset),
                    v = a.container,
                    b = l.container,
                    l.container === a.container && l.offset !== a.offset || (l.container !== a.container ? c.x > 0 || c.y > 0 ? h = !0 : p = !0 : (c.x > 0 || c.y > 0 ? h = !0 : p = !0,
                    b = n.body)),
                    h) {
                        for (s = f.getNextNode(v, !1, b); s && s !== b && !f.isTag(s, "br") && f.isEmptyDom(s); )
                            s = f.getNextNode(s, !1, b);
                        s && (s = f.getNextBlock(s))
                    } else if (p) {
                        for (s = f.getPreviousNode(v, !1, b); s && s !== b && !f.isTag(s, "br") && f.isEmptyDom(s); )
                            s = f.getPreviousNode(s, !1, b);
                        s && (s = f.getPrevBlock(s))
                    }
                    s && (C = e.getContainerFromChild(s),
                    E = C && C.codeMirror,
                    E ? (E.focus(),
                    c.x > 0 || c.y > 0 ? e.focusToFirst(E) : e.focusToLast(E)) : C = null ),
                    C || (c.x < 0 ? o.modify("move", "forward", "character") : c.y < 0 ? o.modify("move", "forward", "line") : c.x > 0 ? o.modify("move", "backward", "character") : c.y > 0 && o.modify("move", "backward", "line"))
                }
                return !!C
            }
            ,
            this.removeCmWrapper = function(e) {
                if (e.id) {
                    var t = e.querySelector("." + r.CLASS.CODE_MIRROR + "[data-id=" + e.id + "]");
                    f.remove(t)
                }
            }
            ,
            this.saveToText = function() {
                for (var t = e.getContainerList(), n = t.length - 1; n >= 0; n--) {
                    var r = t[n]
                      , o = r.codeMirror;
                    if (o) {
                        o.save();
                        var i = r.querySelector("textarea");
                        f.setTextarea(i)
                    }
                }
            }
            ,
            this.highlight = {
                clear: function(e) {
                    var t = e.codeMirror;
                    if (t) {
                        var n = e.state;
                        n || (n = {},
                        e.state = n),
                        t.operation(function() {
                            n.lastQuery = n.query || null ,
                            n.query && (n.query = n.queryText = null ,
                            t.removeOverlay(n.overlay))
                        })
                    }
                },
                clearAll: function() {
                    for (var t = e.getContainerList(), n = 0; n < t.length; n++) {
                        var r = t[n];
                        e.highlight.clear(r)
                    }
                },
                overlay: function(e) {
                    var t = new RegExp(e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),"gi");
                    return {
                        token: function(e) {
                            t.lastIndex = e.pos;
                            var n = t.exec(e.string);
                            return n && n.index === e.pos ? (e.pos += n[0].length || 1,
                            "searching") : void (n ? e.pos = n.index : e.skipToEnd())
                        }
                    }
                },
                search: function(t, n) {
                    if (!t.state || !t.state.query || t.state.query.toLowerCase() !== n.toLowerCase()) {
                        var r = t.codeMirror;
                        if (r) {
                            e.highlight.clear(t);
                            var o = t.state;
                            n = n.toLowerCase(),
                            o.query = n,
                            r.removeOverlay(o.overlay),
                            o.overlay = e.highlight.overlay(o.query),
                            r.addOverlay(o.overlay)
                        }
                    }
                }
            },
            this.oldPatch = {
                oldCodeReady: function() {
                    var e = void 0
                      , t = void 0
                      , i = void 0
                      , a = function(e, t) {
                        var i = void 0;
                        i = e.querySelectorAll(t);
                        for (var a = i.length - 1; a >= 0; a--) {
                            var l = i[a];
                            if (o.isEmpty(l.innerText)) {
                                var s = f.getParentByClass(l, r.CLASS.CODE_CONTAINER_OLD, !1);
                                if (s) {
                                    var d = f.splitDomSingle(s, l)
                                      , c = n.doc.createElement("div");
                                    c.appendChild(l),
                                    f.before(c, d),
                                    f.remove(d)
                                }
                            }
                        }
                    }
                    ;
                    for (t = n.body.querySelector("." + r.CLASS.CODE_CONTAINER_OLD + " ." + r.CLASS.CODE_CONTAINER_OLD); t; ) {
                        var l = f.getParentByClass(t, r.CLASS.CODE_CONTAINER_OLD, !1);
                        f.after(t, l),
                        t = n.body.querySelector("." + r.CLASS.CODE_CONTAINER_OLD + " ." + r.CLASS.CODE_CONTAINER_OLD)
                    }
                    for (e = n.body.querySelectorAll("." + r.CLASS.CODE_CONTAINER_OLD),
                    i = e.length - 1; i >= 0; i--)
                        t = e[i],
                        a(t, "a");
                    for (e = n.body.querySelectorAll("." + r.CLASS.CODE_CONTAINER_OLD),
                    i = e.length - 1; i >= 0; i--)
                        t = e[i],
                        a(t, "img")
                },
                fixOldCode: function(t) {
                    var o = void 0
                      , i = [];
                    if (t = t || n.body,
                    e.oldPatch.oldCodeReady(),
                    o = t.querySelectorAll("." + r.CLASS.CODE_CONTAINER_OLD),
                    o.length > 50)
                        return i;
                    for (var a = o.length - 1; a >= 0; a--) {
                        var l = o[a]
                          , s = e.fixCode(l)
                          , d = e.oldPatch.getSrc(l)
                          , c = e.oldPatch.getMode(l);
                        if (s.removeChild(l),
                        d) {
                            var u = n.doc.createElement("textarea");
                            u.value = d,
                            u.style.display = "none",
                            s.appendChild(u),
                            f.addClass(s, r.CLASS.CODE_CONTAINER),
                            c && f.attr(s, {
                                "data-mode": c
                            }),
                            i.push(s)
                        }
                    }
                    return i
                },
                getMode: function(e) {
                    var t = /language-([\w]+)/i
                      , n = /lang-([\w]+)/i
                      , r = e.querySelector("code")
                      , o = void 0
                      , i = void 0;
                    return r && r.className && (o = r.className.match(t)) ? i = o[1] : e.className && (o = e.className.match(n)) && (i = o[1]),
                    i && (i = d[i.toLowerCase()]),
                    i
                },
                getSrc: function(e) {
                    if (!e)
                        return "";
                    for (var t = e.querySelectorAll("code"), n = 0, r = t.length; n < r; n++) {
                        var o = t[n];
                        o.innerText || (o.innerText = "\n")
                    }
                    return (e.innerText || e.textContent || "").replace(/\n$/, "")
                }
            },
            this.pastePatch = {
                fix: function() {
                    for (var t = n.body.querySelectorAll("." + r.CLASS.CODE_CONTAINER_PASTE), o = t.length; o >= 0; o--) {
                        var i = t[o];
                        f.removeClass(i, r.CLASS.CODE_CONTAINER_PASTE),
                        e.fixCodeContainer({
                            container: i
                        })
                    }
                },
                ready: function(t, o) {
                    for (var i = t.querySelectorAll("." + r.CLASS.CODE_MIRROR), a = void 0, l = void 0, s = void 0, d = void 0, c = void 0, u = void 0, g = void 0, m = void 0, p = void 0, h = i.length - 1; h >= 0; h--) {
                        d = i[h],
                        s = e.getContainerFromChild(d),
                        s || (s = d),
                        m = [],
                        c = d.querySelectorAll("." + r.CLASS.CODE_MIRROR_LINE);
                        for (var v = 0; v < c.length; v++) {
                            var b = c[v];
                            p = b.innerText || b.textContent,
                            m.push(p.replace(r.FILL_CHAR_REG, ""))
                        }
                        a = n.doc.createElement("div"),
                        o ? a.innerHTML = "<br/>" + m.join("<br/>") + "<br/><br/>" : (u = s.getAttribute("data-mode"),
                        g = s.getAttribute("data-theme"),
                        l = n.doc.createElement("textarea"),
                        l.textContent = m.join("\n"),
                        f.addClass(a, r.CLASS.CODE_CONTAINER_PASTE),
                        a.appendChild(l),
                        u && a.setAttribute("data-mode", u),
                        g && a.setAttribute("data-theme", g)),
                        f.before(a, s),
                        f.remove(s)
                    }
                }
            }
        }
        ;
        t.exports = u
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    30: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/dependLoader")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null 
              , f = null 
              , g = null 
              , m = null 
              , p = null 
              , h = null 
              , v = null 
              , b = null 
              , C = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.amend,
                a = t.require.blockCore,
                l = t.require.codeCore,
                s = t.require.commandExtend,
                d = t.require.domUtils,
                c = t.require.editorEvent,
                u = t.require.formatPainter,
                f = t.require.frameViewCore,
                g = t.require.historyUtils,
                m = t.require.imgCore,
                p = t.require.selectPlugin,
                h = t.require.tabKey,
                v = t.require.tableCore,
                b = t.require.todoCore,
                C = t.require.wizStyle
            }
            ;
            var E = "";
            this.off = function() {
                g.stop(),
                i.stopReverse(),
                i.stop(),
                u.off(),
                l.off(),
                a.off(),
                b.off(),
                h.off(),
                v.off(),
                m.off(),
                p.off(),
                s.off(),
                c.unbind(),
                f.off(),
                n.readonly = !0,
                n.isSetBodyFontSize && (n.body.style.fontSize = null ,
                n.isSetBodyFontSize = !1),
                d.setContenteditable(null , !1),
                d.removeByTag(r.TAG.TMP_TAG)
            }
            ,
            this.on = function(t) {
                var r = function() {
                    i.startReverse(),
                    g.start(n.options.editor.maxRedo, n.options.editor.callback.redo),
                    m.setImgFullPath(),
                    n.client.type.isPhone || n.client.type.isPad ? setTimeout(function() {
                        e.setOriginalHtml()
                    }, 500) : e.setOriginalHtml(),
                    "function" == typeof t && t()
                }
                ;
                n.frame.toolbarContainer && n.options.document !== n.doc && o.loadCss(n.options.document, [n.dependency.files.css.fonts]),
                o.loadCss(n.doc, [n.dependency.files.css.fonts]),
                n.readonly = !1,
                g.init(),
                d.setContenteditable(null , !0),
                f.on(),
                C.insertTmpEditorStyle(),
                d.fixOrderList(),
                c.bind(),
                s.on(),
                p.on(),
                m.on(),
                v.on(),
                h.on(),
                b.on(),
                a.on(),
                u.init(),
                l.on({}, r),
                n.body.style.fontSize ? n.isSetBodyFontSize = !1 : (n.body.style.fontSize = window.getComputedStyle(n.body).fontSize,
                n.isSetBodyFontSize = !0)
            }
            ,
            this.getOriginalHtml = function() {
                return E
            }
            ,
            this.setOriginalHtml = function() {
                E = d.getContentHtml()
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/dependLoader": 57
    }],
    31: [function(e, t, n) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
         : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
          , o = e("../../config/const")
          , i = e("../../libs/utils")
          , a = {
            SelectionChange: "selectionchange",
            HistoryUndo: "historyUndo"
        }
          , l = function() {
            var e = this
              , t = null 
              , n = null 
              , l = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null 
              , f = null 
              , g = null 
              , m = null 
              , p = null 
              , h = null 
              , v = null 
              , b = null 
              , C = null 
              , E = null 
              , T = null 
              , S = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                l = t.lang,
                s = t.require.amend,
                d = t.require.amendUser,
                c = t.require.amendUtils,
                u = t.require.codeUtils,
                f = t.require.commandExtend,
                g = t.require.domUtils,
                m = t.require.formatPainter,
                p = t.require.frameViewUtils,
                h = t.require.historyUtils,
                v = t.require.pasteUtils,
                b = t.require.rangeUtils,
                C = t.require.tableCore,
                E = t.require.tableUtils,
                T = t.require.tableZone,
                S = t.require.todoUtils;
            }
            ;
            var y = {
                selectionchange: [],
                historyUndo: []
            }
              , A = {}
              , N = null 
              , _ = function(e) {
                var t = [];
                for (var n in e) {
                    var o = e[n]
                      , i = ("undefined" == typeof o ? "undefined" : r(o)).toLowerCase();
                    "string" !== i && "number" !== i || ("string" === i && (o = '"' + o.replace(/"/g, '\\"') + '"'),
                    t.push('"' + n + '":' + o))
                }
                return "{" + t.join(",") + "}"
            }
              , O = function(e, t) {
                var r = T.getZone()
                  , a = b.getRange()
                  , u = void 0
                  , f = void 0
                  , m = void 0
                  , p = !1
                  , v = void 0
                  , S = void 0
                  , y = !0
                  , A = void 0
                  , N = void 0
                  , _ = [];
                return t = !!t,
                r.range || !a || a.collapsed || (S = a.cloneContents(),
                p = !!S.querySelector("." + o.CLASS.CODE_CONTAINER)),
                a && (v = g.getParentRoot([a.startContainer, a.endContainer]),
                s.isAmendEditing() && v && v.getAttribute(o.ATTR.SPAN_DELETE) === d.getCurUser().hash) ? (alert(t ? l.Err.Cut_Null : l.Err.Copy_Null),
                void i.stopEvent(e)) : void (!(r.range || a && !a.collapsed && (p || s.isAmendEditing())) || r.range && a && !a.collapsed || (!r.range || a && !a.collapsed ? a && !a.collapsed && (u = b.getFragmentForCopy()) : u = T.getFragmentForCopy(),
                u && (s.isAmendEditing() && (f = u.innerHTML.length,
                s.fragmentFilter(u),
                m = u.innerHTML.length,
                0 === m && f > 0 && (alert(l.Err.Copy_Null),
                y = !1)),
                y && (e.clipboardData.clearData(),
                e.clipboardData.setData("text/plain", u.innerText),
                e.clipboardData.setData("text/html", u.innerHTML),
                t && h.saveSnap(!1),
                t && s.isAmendEditing() ? (A = d.getCurUser(),
                N = c.getDeletedStyle(A),
                !r.range || a && !a.collapsed ? (c.removeSelection(A),
                c.removeUserDel(null , A),
                n.doc.getSelection().collapseToEnd(),
                b.caretFocus()) : (_ = E.getDomsByCellList(T.getSelectedCells()),
                g.modifyNodesStyleAndClear(_, N.style, N.attr, []),
                c.removeUserDel(r.table, A))) : t && r.range && (!a || a.collapsed) && C.clearCellValue()),
                u.innerHTML = "",
                u.parentNode && u.parentNode.removeChild(u),
                u = null ),
                i.stopEvent(e)))
            }
              , D = function() {
                N && clearTimeout(N),
                N = setTimeout(L, 200)
            }
              , L = function() {
                var t = function(e) {
                    return f.queryCommandState(e) ? "1" : "0"
                }
                  , r = {
                    backColor: "",
                    blockFormat: "",
                    bold: "0",
                    canCreateCode: "1",
                    canCreateTable: "1",
                    canCreateTodo: "1",
                    isInCode: "0",
                    isInTable: "0",
                    clientTools: "1",
                    fontName: "",
                    fontSize: "",
                    foreColor: "",
                    formatPainterStatus: m.status().toString(),
                    InsertOrderedList: "0",
                    InsertUnorderedList: "0",
                    italic: "0",
                    justifyleft: "0",
                    justifycenter: "0",
                    justifyright: "0",
                    justifyfull: "0",
                    strikeThrough: "0",
                    subscript: "0",
                    superscript: "0",
                    underline: "0"
                }
                  , o = void 0
                  , l = b.getRange()
                  , s = T.getZone()
                  , d = void 0
                  , c = void 0
                  , p = [];
                if (l || s.range && !s.active) {
                    s.grid && s.range ? (r.canCreateTable = "0",
                    r.canCreateCode = "0",
                    r.isInTable = "1") : l && u.getContainerFromChild(l.startContainer) ? (r.isInCode = "1",
                    r.clientTools = "0",
                    r.canCreateCode = "0",
                    r.canCreateTable = "0",
                    r.canCreateTodo = "0",
                    r.canFormatPainter = "0") : S.canCreateTodo() || (r.canCreateTodo = "0"),
                    !l || s.range && !T.isSingleCell() ? (c = E.getAlign(s.grid, s.range),
                    d = T.getSelectedCells(),
                    p = E.getDomsByCellList(d),
                    r.justifyleft = "left" === c.align ? "1" : "0",
                    r.justifycenter = "center" === c.align ? "1" : "0",
                    r.justifyright = "right" === c.align ? "1" : "0",
                    o = {
                        "font-size": "",
                        "font-family": "",
                        "font-weight": "",
                        "font-style": "",
                        "text-decoration": "",
                        color: "",
                        "background-color": ""
                    }) : (r.blockFormat = n.doc.queryCommandValue("formatBlock"),
                    r.fontName = n.doc.queryCommandValue("fontName"),
                    r.foreColor = i.rgb2Hex(n.doc.queryCommandValue("foreColor")),
                    r.backColor = i.rgb2Hex(n.doc.queryCommandValue("backColor")),
                    r.bold = t("bold"),
                    r.italic = t("italic"),
                    r.underline = t("underline"),
                    r.strikeThrough = t("strikeThrough"),
                    r.subscript = t("subscript"),
                    r.superscript = t("superscript"),
                    r.justifyleft = t("justifyleft"),
                    r.justifycenter = t("justifycenter"),
                    r.justifyright = t("justifyright"),
                    r.justifyfull = t("justifyfull"),
                    r.InsertOrderedList = t("InsertOrderedList"),
                    r.InsertUnorderedList = t("InsertUnorderedList"),
                    o = {
                        "font-size": ""
                    },
                    p = b.getRangeDomList({
                        noSplit: !0
                    }),
                    p && (p = p.list.length > 0 ? p.list : [p.startDom]));
                    for (var h = 0, v = p.length; h < v; h++) {
                        var C = p[h];
                        if (3 === C.nodeType || 1 === C.nodeType) {
                            C = 3 === C.nodeType ? C.parentNode : p[h];
                            for (var y in o)
                                if (o.hasOwnProperty(y)) {
                                    var A = g.getComputedStyle(C, y, !0);
                                    if (!A)
                                        continue;0 === h ? o[y] = A : o[y] !== A && (o[y] = "")
                                }
                        }
                    }
                    var N = o["font-size"];
                    N && (r.fontSize = Math.round(parseFloat(N) / g.pt2px() / g.getRootSizeRate()) + "pt"),
                    N = o["font-family"],
                    N && (r.fontName = N),
                    N = o["font-weight"],
                    N && /bold|bolder/.test(N) && (r.bold = "1"),
                    N = o["font-style"],
                    N && /italic|oblique/.test(N) && (r.italic = "1"),
                    N = o["text-decoration"],
                    N && /underline/.test(N) ? r.underline = "1" : N && /line\-through/.test(N) && (r.strikeThrough = "1"),
                    "#f3f7ff" === r.backColor && (r.backColor = ""),
                    e.triggerListener(a.SelectionChange, [r])
                }
            }
              , w = {
                onClick: function(e) {
                    n.event.call(o.EVENT.ON_CLICK, e)
                },
                onCompositionend: function(e) {
                    n.event.call(o.EVENT.ON_COMPOSITION_END, e)
                },
                onCompositionstart: function(e) {
                    n.event.call(o.EVENT.ON_COMPOSITION_START, e)
                },
                onCopy: function(e) {
                    u.getContainerFromChild(e.target) || O(e, !1)
                },
                onCut: function(e) {
                    u.getContainerFromChild(e.target) || (h.saveSnap(!1),
                    O(e, !0),
                    n.event.call(o.EVENT.ON_CUT, e),
                    p.onAdjustContainerSize())
                },
                onDOMSubtreeModified: function(e) {
                    n.event.call(o.EVENT.ON_DOM_SUBTREE_MODIFIED, e)
                },
                onDragStart: function(e) {
                    n.event.call(o.EVENT.ON_DRAG_START, e)
                },
                onDragEnter: function(e) {
                    n.event.call(o.EVENT.ON_DRAG_ENTER, e)
                },
                onDrop: function(e) {
                    var t = e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : null ;
                    return t && n.options.editor.callback.onDropFile ? (n.options.editor.callback.onDropFile(t),
                    void i.stopEvent(e)) : void n.event.call(o.EVENT.ON_DROP, e)
                },
                onKeydown: function(e) {
                    var t = b.getRange()
                      , r = void 0;
                    t && t.collapsed && n.body && 0 === n.body.childNodes.length && (r = n.doc.createElement("div"),
                    r.appendChild(n.doc.createElement("br")),
                    n.body.appendChild(r),
                    b.setRange(r, 1));
                    var i = e.keyCode || e.which;
                    if (!u.getContainerFromChild(e.target)) {
                        n.win.WizQtEditor && n.client.type.isMac && 83 === i && (n.client.type.isLinux && e.ctrlKey || !n.client.type.isLinux && e.metaKey) && n.win.WizQtEditor.saveCurrentNote();
                        var a = void 0
                          , l = void 0
                          , s = void 0
                          , d = void 0
                          , c = T.getZone();
                        if (n.win.WizQtEditor && n.client.type.isMac && !c.range && (a = n.doc.getSelection(),
                        l = e.shiftKey ? "extend" : "move",
                        e.metaKey && 37 === i || e.ctrlKey && 65 === i ? (s = "backward",
                        d = "lineboundary") : e.metaKey && 39 === i || e.ctrlKey && 69 === i ? (s = "forward",
                        d = "lineboundary") : e.metaKey && 38 === i ? (s = "backward",
                        d = "documentboundary") : e.metaKey && 40 === i ? (s = "forward",
                        d = "documentboundary") : e.ctrlKey && 80 === i ? (s = "backward",
                        d = "line") : e.ctrlKey && 78 === i ? (s = "forward",
                        d = "line") : e.ctrlKey && 70 === i ? (s = "forward",
                        d = "character") : e.ctrlKey && 66 === i && (s = "backward",
                        d = "character")),
                        s)
                            return a.modify(l, s, d),
                            void b.fixScroll();
                        n.event.call(o.EVENT.ON_KEY_DOWN, e),
                        p.onAdjustContainerSize()
                    }
                },
                onKeyup: function(e) {
                    n.event.call(o.EVENT.ON_KEY_UP, e),
                    n.client.type.isIOS && b.fixScroll()
                },
                onMousedown: function(e) {
                    n.isShowPreview || (n.event.call(o.EVENT.ON_MOUSE_DOWN, e),
                    p.onAdjustContainerSize())
                },
                onMousemove: function(e) {
                    n.isShowPreview || n.event.call(o.EVENT.ON_MOUSE_MOVE, e)
                },
                onMouseover: function(e) {
                    n.isShowPreview || n.event.call(o.EVENT.ON_MOUSE_OVER, e)
                },
                onMouseup: function(e) {
                    n.isShowPreview || n.event.call(o.EVENT.ON_MOUSE_UP, e)
                },
                onOrientationchange: function(e) {
                    n.event.call(o.EVENT.ON_ORIENTATION_CHANGE, e),
                    n.client.type.isIOS && b.fixScroll()
                },
                onPaste: function(e) {
                    n.isShowPreview || (v.pasteFromClipBoard(e) && n.event.call(o.EVENT.ON_PASTE, e),
                    p.onAdjustContainerSize())
                },
                onScroll: function(e) {
                    n.event.call(o.EVENT.ON_SCROLL, e)
                },
                onSelectionStart: function(e) {
                    n.event.call(o.EVENT.ON_SELECT_START, e)
                },
                onSelectionChange: function(e) {
                    if (!n.isShowPreview) {
                        var t = b.getRange()
                          , r = T.getZone();
                        (t || r.range) && (n.event.call(o.EVENT.ON_SELECTION_CHANGE, e),
                        n.client.type.isIOS && b.fixScroll(),
                        p.onAdjustContainerSize())
                    }
                },
                onTouchEnd: function(e) {
                    n.event.call(o.EVENT.ON_TOUCH_END, e)
                },
                onTouchStart: function(e) {
                    n.event.call(o.EVENT.ON_TOUCH_START, e)
                }
            };
            this.TYPE = a,
            this.bind = function() {
                e.unbind(),
                n.body.addEventListener("click", w.onClick),
                n.body.addEventListener("compositionstart", w.onCompositionstart),
                n.body.addEventListener("compositionend", w.onCompositionend),
                n.body.addEventListener("copy", w.onCopy),
                n.body.addEventListener("cut", w.onCut),
                n.body.addEventListener("DOMSubtreeModified", w.onDOMSubtreeModified),
                n.body.addEventListener("dragstart", w.onDragStart),
                n.body.addEventListener("dragenter", w.onDragEnter),
                n.body.addEventListener("drop", w.onDrop),
                n.body.addEventListener("keydown", w.onKeydown),
                n.body.addEventListener("keyup", w.onKeyup),
                n.body.addEventListener("mousedown", w.onMousedown),
                n.body.addEventListener("mousemove", w.onMousemove),
                n.body.addEventListener("mouseover", w.onMouseover),
                n.body.addEventListener("mouseup", w.onMouseup),
                n.body.addEventListener("paste", w.onPaste),
                n.body.addEventListener("selectstart", w.onSelectionStart),
                n.doc.addEventListener("orientationchange", w.onOrientationchange),
                n.doc.addEventListener("scroll", w.onScroll),
                n.doc.addEventListener("selectionchange", w.onSelectionChange),
                (n.client.type.isIOS || n.client.type.isAndroid) && (n.body.addEventListener("touchend", w.onTouchEnd),
                n.body.addEventListener("touchstart", w.onTouchStart)),
                p.onAdjustContainerSize()
            }
            ,
            this.unbind = function() {
                n.body.removeEventListener("click", w.onClick),
                n.body.removeEventListener("compositionstart", w.onCompositionstart),
                n.body.removeEventListener("compositionend", w.onCompositionend),
                n.body.removeEventListener("copy", w.onCopy),
                n.body.removeEventListener("cut", w.onCut),
                n.body.removeEventListener("DOMSubtreeModified", w.onDOMSubtreeModified),
                n.body.removeEventListener("dragstart", w.onDragStart),
                n.body.removeEventListener("dragenter", w.onDragEnter),
                n.body.removeEventListener("drop", w.onDrop),
                n.body.removeEventListener("keydown", w.onKeydown),
                n.body.removeEventListener("keyup", w.onKeyup),
                n.body.removeEventListener("mousedown", w.onMousedown),
                n.body.removeEventListener("mousemove", w.onMousemove),
                n.body.removeEventListener("mouseover", w.onMouseover),
                n.body.removeEventListener("mouseup", w.onMouseup),
                n.body.removeEventListener("paste", w.onPaste),
                n.body.removeEventListener("selectstart", w.onSelectionStart),
                n.body.removeEventListener("touchend", w.onTouchEnd),
                n.body.removeEventListener("touchstart", w.onTouchStart),
                n.doc.removeEventListener("orientationchange", w.onOrientationchange),
                n.doc.removeEventListener("scroll", w.onScroll),
                n.doc.removeEventListener("selectionchange", w.onSelectionChange)
            }
            ,
            this.addListener = function(e, t) {
                if (t && "function" == typeof t) {
                    var r = y[e];
                    if (r) {
                        for (var i = 0, l = r.length; i < l; i++)
                            if (r[i] === t)
                                return;
                        r.push(t),
                        e === a.SelectionChange && n.event.add(o.EVENT.ON_SELECTION_CHANGE, D)
                    }
                }
            }
            ,
            this.removeListener = function(e, t) {
                if (!t || "function" == typeof t) {
                    var r = y[e];
                    if (r) {
                        for (var i = r.length - 1; i >= 0; i--)
                            r[i] !== t && t || r.splice(i, 1);
                        0 === r.length && n.event.remove(o.EVENT.ON_SELECTION_CHANGE, D)
                    }
                }
            }
            ,
            this.startTrackEvent = function(e, t) {
                A[t] || (A[t] = function(e) {
                    n.client.sendCmdToWiznote(o.CLIENT_EVENT.WizEditorTrackEvent, {
                        id: t,
                        e: _(e)
                    })
                }
                ,
                n.body.addEventListener(e, A[t]))
            }
            ,
            this.stopTrackEvent = function(e, t) {
                A[t] && (n.body.removeEventListener(e, A[t]),
                delete A[t])
            }
            ,
            this.triggerListener = function(t, n) {
                var r = y[t];
                if (r)
                    for (var o = 0, i = r.length; o < i; o++) {
                        var a = r[o];
                        a.apply(e, n)
                    }
            }
        }
        ;
        t.exports = l
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    32: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.amend,
                a = t.require.amendUser,
                l = t.require.amendUtils,
                s = t.require.commandExtend,
                d = t.require.domUtils,
                c = t.require.rangeUtils,
                u = t.require.tableCore
            }
            ;
            var f = void 0
              , g = function(e) {
                if (e) {
                    f && clearTimeout(f);
                    var t = 30
                      , r = 30;
                    n.client.type.isPhone && (t = 100,
                    r = 300),
                    f = setTimeout(function() {
                        var t = void 0
                          , n = e;
                        d.isSelfClosingTag(e) ? (n = n.parentNode,
                        t = d.getIndex(e) + 1) : t = d.getEndOffset(e),
                        d.isEmptyDom(n) && (t = 0),
                        c.setRange(n, t, null , null ),
                        1 === e.nodeType && (f = setTimeout(function() {
                            c.fixScroll()
                        }, r))
                    }, t)
                }
            }
              , m = function() {
                return n.doc.getSelection().toString()
            }
            ;
            this.find = function(e, t, r, o) {
                if (!e)
                    return !1;
                var i = n.win.find(e, t, r);
                return !i && o && (c.setRange(n.body, r ? n.body.childNodes.length : 0),
                i = n.win.find(e, t, r)),
                i
            }
            ,
            this.readyForInsert = function() {
                var e = n.doc.getSelection()
                  , t = c.getRange()
                  , o = void 0
                  , s = void 0
                  , u = {
                    parent: null ,
                    target: null 
                }
                  , f = void 0
                  , g = void 0;
                t || c.caretRestore() || d.focus(),
                i.isAmendEditing() && (t.collapsed || (l.removeSelection(a.getCurUser()),
                l.removeUserDel(null , a.getCurUser()),
                e.collapseToEnd())),
                t = c.getRange(),
                t.collapsed && (o = t.startContainer,
                s = t.startOffset,
                g = d.getParentByFilter(o, function(e) {
                    if (1 !== e.nodeType)
                        return !1;
                    var t = e.getAttribute("href");
                    return !(!t || !/^wiz:\/*open_attachment\?/i.test(t))
                }, !0),
                g && (f = d.createSpan(),
                f.innerHTML = r.FILL_CHAR,
                0 === s ? (d.before(f, g),
                c.setRange(f, 0)) : (d.after(f, g),
                c.setRange(f, 1))));
                var m = l.fixedAmendRange()
                  , p = i.splitAmendDomByRange(m);
                return t = c.getRange(),
                o = t.startContainer,
                s = t.startOffset,
                p ? (u.target = p,
                u.parent = p.parentNode) : 3 === o.nodeType && s > 0 && s < o.nodeValue.length ? (u.target = d.splitRangeText(o, s, null , !1),
                u.parent = u.target.parentNode) : 1 === o.nodeType && s > 0 && s < o.childNodes.length ? (u.target = o.childNodes[s],
                u.parent = o) : o === n.body || o === n.body.parentNode ? (u.target = 0 === s ? n.body.childNodes[0] : null ,
                u.parent = n.body) : 0 === s ? (u.target = o,
                u.parent = o.parentNode) : 3 === o.nodeType ? (u.target = o.nextSibling,
                u.parent = o.parentNode) : (u.target = null ,
                u.parent = o),
                u.target && 1 === u.target.nodeType && !d.isSelfClosingTag(u.target) && d.isEmptyDom(u.target) && (u.parent = u.target,
                d.isTag(u.parent.childNodes[0], "br") ? (u.parent.removeChild(u.parent.childNodes[0]),
                u.target = u.parent.childNodes.length > 0 ? u.parent.childNodes[0] : null ) : u.target = u.parent.childNodes[0]),
                d.isWizDom(u.parent) && (u.target = u.parent,
                u.parent = u.parent.parentNode),
                u
            }
            ,
            this.insertDom = function(t, r) {
                if (t) {
                    var i = function(e) {
                        if (e.parent && !e.target)
                            for (; e.parent !== n.body && !e.target; )
                                e.target = e.parent.nextSibling,
                                e.parent = e.parent.parentNode
                    }
                      , a = function(e) {
                        if (1 !== e.nodeType)
                            return null ;
                        var t = void 0;
                        return d.isTag(e, "img") ? e : (t = e.querySelectorAll("img"),
                        t.length > 0 ? t[t.length - 1] : null )
                    }
                      , l = e.readyForInsert()
                      , s = void 0
                      , c = void 0
                      , u = void 0
                      , f = void 0;
                    r && d.isEmptyDom(l.parent) && !d.isTag(l.parent, ["td", "th"]) && !l.target && (s = l.parent,
                    l.parent = s.parentNode,
                    l.target = s.nextSibling,
                    l.parent.removeChild(s)),
                    o.isArray(t) || (t = [t]);
                    for (var m = 0, p = t.length; m < p; m++) {
                        var h = t[m];
                        d.isBlock(h) && i(h),
                        l.parent.insertBefore(t[m], l.target),
                        f = a(t[m]),
                        f && (u = f),
                        c = t[m]
                    }
                    g(c),
                    u && u.addEventListener("load", function() {
                        g(c)
                    })
                }
            }
            ,
            this.insertHtml = function(t, o) {
                if (t) {
                    var i = n.doc.createElement("div")
                      , a = [];
                    i.innerHTML = t;
                    for (var l = 0, s = i.childNodes.length; l < s; l++)
                        a.push(i.childNodes[l]);
                    e.insertDom(a, o),
                    i = null ,
                    n.event.call(r.EVENT.AFTER_INSERT_DOM)
                }
            }
            ,
            this.modifySelectionDom = function(e, t) {
                u.modifySelectionDom(e, t) || c.modifySelectionDom(e, t)
            }
            ,
            this.replace = function(t, r, o) {
                if (!t)
                    return !1;
                var i = m()
                  , a = void 0
                  , l = void 0;
                return i === t && (r ? (l = n.doc.createTextNode(r),
                a = n.doc.createElement("span"),
                a.appendChild(l),
                r = a.innerHTML,
                a = null ,
                l = null ) : r = "",
                s.execCommand("insertHTML", !1, r)),
                e.find(t, o)
            }
            ,
            this.replaceAll = function(t, r, o) {
                if (!t)
                    return !1;
                for (c.setRange(n.body, 0); e.replace(t, r, o); )
                    ;
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    33: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = function() {
            var e = null 
              , t = null 
              , n = null 
              , o = null 
              , i = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.frameViewStyle,
                o = e.require.frameViewUtils,
                i = e.require.toolbarMarkdown
            }
            ,
            this.init = function() {}
            ,
            this.off = function() {
                n.removeFrameStyle(),
                o.off(),
                i.off()
            }
            ,
            this.on = function() {
                return t.options.container && !t.options.noFrame && n.insertFrameStyle(),
                !t.readonly && t.options.editor.type === r.NOTE_EDITOR_TYPE.MARKDOWN && t.frame.toolbarContainer ? void i.on() : void o.on()
            }
        }
        ;
        t.exports = o
    }
    , {
        "../../config/const": 51
    }],
    34: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = {
            toolbar: "." + r.CLASS.EDITING + "." + r.CLASS.EDITOR_CONTAINER + " {border: 1px solid silver;padding-top: 5px;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " {display:flex;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_MAIN + " {flex:1;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_MAIN + " .toolbar-split {width: 0;border-left: 1px solid #d9d9d9;border-right: 1px solid #fff;color: transparent;text-indent: -10px;margin: 0 6px;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-button {display:inline-block;position:relative;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-button .editor-submenu {position: absolute;display: none;width: 195px;padding: 5px 0;background: #fff;border-radius: 3px;border: 1px solid #E0E0E0;top:28px;left:-9px;box-shadow: 1px 1px 5px #d0d0d0;z-index:100;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-button.active .editor-submenu {display:block;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-button .editor-submenu-label{padding: 0 6px; font-size: 14px;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-button .editor-submenu table{border: 0;border-collapse: initial;border-spacing: 3px;background-color: white;margin: 0 auto;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-button .editor-submenu table td{border-collapse: collapse;border: 1px solid #bbbbbb;box-sizing: border-box;position: relative;padding: 3px;width: 16px;height: 16px;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-button .editor-submenu table td.selected{border-color: #448aff;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-icon {font-size:16px;padding:4px;border:1px solid transparent;border-radius: 3px;cursor: pointer;color:#2c3e50}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-icon:hover {background:#fcfcfc;border-color:#95a5a6;}." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-icon.disabled,." + r.CLASS.WIZ_EIDTOR_TOOlBAR_CONTAINER + " .editor-icon.disabled:hover {background:#fcfcfc;border-color:transparent;color:#94a0ad;}",
            preview: "." + r.CLASS.WIZ_EIDTOR_PREVIEW_CONTAINER + "{position:absolute;top:2px;bottom:0;left:0;right:0;background:#FFF;display:none;z-index:999;overflow:auto;}." + r.CLASS.WIZ_EIDTOR_PREVIEW_CONTAINER + "." + r.CLASS.EDITOR_PREVIEW_SHOW + "{display:block;}",
            frame: "body {overflow-y: hidden;}"
        }
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.domUtils,
                a = t.require.wizStyle
            }
            ,
            this.insertFrameStyle = function() {
                e.removeFrameStyle(),
                a.insertStyle({
                    id: r.ID.WIZ_EIDTOR_FRAME_STYLE,
                    name: r.NAME.TMP_STYLE
                }, o.frame)
            }
            ,
            this.insertPreviewStyle = function() {
                e.removePreviewStyle(),
                a.insertStyle({
                    id: r.ID.WIZ_EIDTOR_PREVIEW_STYLE,
                    name: r.NAME.TMP_STYLE
                }, o.preview)
            }
            ,
            this.insertToolbarStyle = function() {
                e.removeToolbarStyle();
                var t = n.frame.toolbarDoc.getElementById(r.ID.WIZ_EIDTOR_TOOlBAR_STYLE);
                t || (t = n.frame.toolbarDoc.createElement("style"),
                t.id = r.ID.WIZ_EIDTOR_TOOlBAR_STYLE,
                n.frame.toolbarDoc.getElementsByTagName("HEAD")[0].insertBefore(t, null )),
                t && (t.innerHTML = o.toolbar)
            }
            ,
            this.removeFrameStyle = function() {
                i.remove(n.doc.getElementById(r.ID.WIZ_EIDTOR_FRAME_STYLE))
            }
            ,
            this.removePreviewStyle = function() {
                i.remove(n.doc.getElementById(r.ID.WIZ_EIDTOR_PREVIEW_STYLE))
            }
            ,
            this.removeToolbarStyle = function() {
                i.remove(n.frame.toolbarDoc.getElementById(r.ID.WIZ_EIDTOR_TOOlBAR_STYLE))
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51
    }],
    35: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = function() {
            var e = this
              , t = null 
              , n = null 
              , o = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                o = t.require.domUtils
            }
            ;
            var i = void 0
              , a = {
                onAdjustContainerSize: function() {
                    return !n.options.container || n.options.noFrame ? void (n.options.container && n.options.noFrame && n.options.editor.minHeight && (n.body.style.minHeight = n.options.editor.minHeight + "px")) : (clearTimeout(i),
                    void (i = setTimeout(function() {
                        for (var e = n.body.lastChild; e && (1 !== e.nodeType || o.isTag(e, r.TAG.TMP_TAG) || "none" === n.win.getComputedStyle(e).display || 0 === e.clientHeight); )
                            e = e.previousSibling;
                        var t = Math.max(e ? e.offsetTop + e.offsetHeight + 25 : 0, n.options.editor.minHeight);
                        n.frame.bodyContainer.style.height = t + "px",
                        n.body.style.height = t + "px"
                    }, 50)))
                }
            }
              , l = {
                bind: function() {
                    l.unbind(),
                    n.readonly && n.options.container && !n.options.noFrame && n.doc.addEventListener("DOMSubtreeModified", e.onAdjustContainerSize),
                    n.options.container && !n.options.noFrame && n.doc.addEventListener("resize", e.onAdjustContainerSize)
                },
                unbind: function() {
                    n.doc.removeEventListener("DOMSubtreeModified", e.onAdjustContainerSize),
                    n.doc.removeEventListener("resize", e.onAdjustContainerSize)
                }
            };
            this.init = function() {}
            ,
            this.off = function() {
                l.unbind()
            }
            ,
            this.on = function() {
                l.bind()
            }
            ,
            this.onAdjustContainerSize = a.onAdjustContainerSize
        }
        ;
        t.exports = o
    }
    , {
        "../../config/const": 51
    }],
    36: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = e("../../common/MarkdownRender")
          , a = {
            active: "active",
            button: "editor-button",
            disabled: "disabled",
            icon: "editor-icon",
            selected: "selected",
            subMenu: "editor-submenu",
            subMenuLabel: "editor-submenu-label",
            subMenuTable: "editor-submenu-table",
            toolbarSplit: "toolbar-split",
            imgName: "editor-img-name",
            progressTxt: "editor-progress-txt",
            progressLine: "editor-progress-line"
        }
          , l = {
            tmpImg: "wiz-upload-img",
            bold: "wiz-toolbar-bold",
            code: "wiz-toolbar-code",
            help: "wiz-toolbar-help",
            image: "wiz-toolbar-image",
            italic: "wiz-toolbar-italic",
            link: "wiz-toolbar-link",
            listOl: "wiz-toolbar-list-ol",
            listUl: "wiz-toolbar-list-ul",
            preview: "wiz-toolbar-preview",
            quotes: "wiz-toolbar-quotes",
            redo: "wiz-toolbar-redo",
            split: "wiz-toolbar-split",
            table: "wiz-toolbar-table",
            undo: "wiz-toolbar-undo"
        }
          , s = function() {
            var e = null 
              , t = null 
              , n = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null 
              , f = null 
              , g = null 
              , m = null 
              , p = null 
              , h = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.lang,
                s = e.require.codeUtils,
                d = e.require.domUtils,
                c = e.require.editorEvent,
                u = e.require.frameViewStyle,
                f = e.require.historyUtils,
                g = e.require.imgUtils,
                m = e.require.rangeUtils,
                p = e.require.tableCore,
                h = e.require.tableMenu
            }
            ;
            var v = null 
              , b = {}
              , C = [{
                id: l.bold,
                icon: "bold"
            }, {
                id: l.italic,
                icon: "italic"
            }, {
                id: l.link,
                icon: "link"
            }, {
                id: l.split
            }, {
                id: l.quotes,
                icon: "quotes"
            }, {
                id: l.listOl,
                icon: "list_ol"
            }, {
                id: l.listUl,
                icon: "list_ul"
            }, {
                id: l.split
            }, {
                id: l.image,
                icon: "image"
            }, {
                id: l.table,
                icon: "table"
            }, {
                id: l.code,
                icon: "code"
            }, {
                id: l.split
            }, {
                id: l.undo,
                icon: "undo"
            }, {
                id: l.redo,
                icon: "redo"
            }]
              , E = [{
                id: l.preview,
                icon: "eye"
            }, {
                id: l.help,
                icon: "question"
            }]
              , T = null 
              , S = ""
              , y = {
                bind: function() {
                    y.unbind(),
                    c.addListener(c.TYPE.SelectionChange, y.handler.onSelectionChange),
                    f.addCallback(y.handler.onHistoryUndo),
                    t.frame.toolbarContainer.addEventListener("click", y.handler.onClickButton)
                },
                bindSubMenu: function() {
                    y.unbindSubMenu(),
                    t.doc.addEventListener("mousedown", y.handler.onClickDoc);
                    var e = T.querySelector("." + a.subMenuTable);
                    e && (e.addEventListener("mouseover", y.handler.onMouseOverTable),
                    e.addEventListener("click", y.handler.onSelectTable))
                },
                unbindSubMenu: function() {
                    t.doc.removeEventListener("mousedown", y.handler.onClickDoc);
                    var e = T.querySelector("." + a.subMenuTable);
                    e && (e.removeEventListener("mouseover", y.handler.onMouseOverTable),
                    e.removeEventListener("click", y.handler.onSelectTable))
                },
                unbind: function() {
                    c.removeListener(c.TYPE.SelectionChange, y.handler.onSelectionChange),
                    f.removeCallback(y.handler.onHistoryUndo),
                    t.frame.toolbarContainer && t.frame.toolbarContainer.removeEventListener("click", y.handler.onClickButton)
                },
                handler: {
                    onClickButton: function(e) {
                        var r = e.target;
                        if (d.hasClass(r, a.icon) && !d.hasClass(r, a.disabled)) {
                            var o = r.parentNode
                              , i = r.id
                              , s = void 0
                              , c = void 0;
                            switch (i) {
                            case l.bold:
                                t.isShowPreview || (f.saveSnap(!1),
                                s = A.insertText("****"),
                                m.setRange(s, 2));
                                break;
                            case l.italic:
                                t.isShowPreview || (f.saveSnap(!1),
                                s = A.insertText("**"),
                                m.setRange(s, 1));
                                break;
                            case l.link:
                                t.isShowPreview || (f.saveSnap(!1),
                                s = A.insertText("[" + n.Toolbar.LinkTopic + "](http://)"),
                                m.setRange(s, 3));
                                break;
                            case l.quotes:
                                t.isShowPreview || A.insertQuotes();
                                break;
                            case l.listOl:
                                t.isShowPreview || A.insertListOl();
                                break;
                            case l.listUl:
                                t.isShowPreview || A.insertListUl();
                                break;
                            case l.image:
                                if (!o.getAttribute("for")) {
                                    var u = t.options.editor.callback.onClickToolbarInsertImg;
                                    "function" == typeof u && u()
                                }
                                break;
                            case l.code:
                                t.isShowPreview || (f.saveSnap(!1),
                                A.insertText("\n"),
                                A.insertText("```"),
                                s = A.insertText("\n"),
                                A.insertText("```"),
                                A.insertText("\n"),
                                m.setRange(s, 0));
                                break;
                            case l.table:
                                if (!t.isShowPreview) {
                                    if (A.isActive(o)) {
                                        A.setActive(o, !1);
                                        break
                                    }
                                    c = A.createSubMenu(o),
                                    A.createTableSubMenu(c),
                                    A.setActive(o, !0)
                                }
                                break;
                            case l.undo:
                                t.isShowPreview || f.undo();
                                break;
                            case l.redo:
                                t.isShowPreview || f.redo();
                                break;
                            case l.preview:
                                A.preview();
                                break;
                            case l.help:
                                var g = t.options.editor.callback.onClickToolbarHelp;
                                "function" == typeof g && g()
                            }
                            setTimeout(function() {
                                t.body.focus()
                            }, 50)
                        }
                    },
                    onClickDoc: function(e) {
                        var t = e.target
                          , n = d.getParentByClass(t, a.button);
                        n && n === T || A.setActive(T, !1)
                    },
                    onHistoryUndo: function(e) {
                        var t = b[l.undo]
                          , n = b[l.redo];
                        0 === e.undoIndex ? d.addClass(t, a.disabled) : d.removeClass(t, a.disabled),
                        e.undoIndex >= e.undoCount - 1 ? d.addClass(n, a.disabled) : d.removeClass(n, a.disabled)
                    },
                    onMouseOverTable: function(e) {
                        var t = e.target
                          , n = void 0
                          , r = 0
                          , o = 0;
                        1 === t.nodeType && /^td$/i.test(t.tagName) && (n = t.getAttribute("data-index").split("-"),
                        o = parseInt(n[0], 10),
                        r = parseInt(n[1], 10));
                        var i = d.getParentByClass(t, a.subMenu)
                          , l = d.getParentByClass(t, a.subMenuTable)
                          , s = i.querySelector("." + a.subMenuLabel);
                        if (r && o) {
                            s.innerHTML = o + " x " + r,
                            l.selectRow = o,
                            l.selectCol = r;
                            for (var c = 0; c < 10; c++)
                                for (var u = 0; u < 10; u++)
                                    l.rows[c].cells[u].className = c < o && u < r ? a.selected : ""
                        }
                    },
                    onSelectTable: function(e) {
                        var t = e.target
                          , n = d.getParentByClass(t, a.button)
                          , r = d.getParentByClass(t, a.subMenuTable, !0);
                        r && r.selectRow && r.selectCol && (p.insertTable(r.selectCol, r.selectRow),
                        A.setActive(n, !1))
                    },
                    onSelectionChange: function(e) {
                        var t = b[l.bold]
                          , n = b[l.italic]
                          , r = b[l.link]
                          , o = b[l.quotes]
                          , i = b[l.listOl]
                          , s = b[l.listUl]
                          , c = b[l.code]
                          , u = b[l.image]
                          , g = b[l.table]
                          , m = b[l.undo]
                          , p = b[l.redo];
                        return e ? (c && "1" === e.isInCode || g && "1" === e.isInTable ? d.addClass([t, n, r, o, i, s, c, u, g], a.disabled) : d.removeClass([t, n, r, o, i, s, c, u, g], a.disabled),
                        void y.handler.onHistoryUndo(f.getUndoState())) : void d.addClass([t, n, r, o, i, s, c, u, g, m, p], a.disabled)
                    }
                }
            }
              , A = {
                checkBlock: function(e) {
                    return !!e && !(d.getParentByClass(e, r.CLASS.CODE_CONTAINER, !0) || d.getParentByClass(e, r.CLASS.TABLE_CONTAINER, !0))
                },
                checkDomInList: function(e, t) {
                    for (var n = 0; n < t.length; n++)
                        if (t[n] === e)
                            return !0;
                    return !1
                },
                clearImgUploadingTmp: function(e) {
                    var t = A.getImgUploadingTmp(e);
                    t && d.remove(t)
                },
                createSubMenu: function(e) {
                    var n = e.querySelector("." + a.subMenu);
                    return n ? n : (n = t.doc.createElement("div"),
                    d.addClass(n, a.subMenu),
                    e.appendChild(n),
                    n)
                },
                createTableSubMenu: function(e) {
                    var n = e.querySelector("." + a.subMenuTable)
                      , r = void 0
                      , o = void 0
                      , i = void 0;
                    if (n) {
                        i = n.querySelectorAll("." + a.selected);
                        for (var l = i.length - 1; l >= 0; l--)
                            d.removeClass(i[l], a.selected);
                        var s = e.querySelector("." + a.subMenuLabel);
                        return s.innerHTML = "0 x 0",
                        n
                    }
                    r = t.doc.createElement("div"),
                    d.addClass(r, a.subMenuLabel),
                    r.innerHTML = "0 x 0",
                    n = t.doc.createElement("table"),
                    o = t.doc.createElement("tbody");
                    for (var c = 1; c < 11; c++) {
                        for (var u = t.doc.createElement("tr"), f = 1; f < 11; f++) {
                            var g = t.doc.createElement("td");
                            g.setAttribute("data-index", c + "-" + f),
                            g.setAttribute("unselectable", "on"),
                            g.setAttribute("onmousedown", "return false;"),
                            u.appendChild(g)
                        }
                        o.appendChild(u)
                    }
                    return d.addClass(n, a.subMenuTable),
                    n.appendChild(o),
                    e.appendChild(r),
                    e.appendChild(n),
                    e
                },
                createToolbar: function() {
                    if (!(t.frame.toolbarContainer.children.length > 0)) {
                        var e = t.doc.createElement("div");
                        d.addClass(e, r.CLASS.WIZ_EIDTOR_TOOlBAR_MAIN);
                        var n = t.doc.createElement("div");
                        d.addClass(n, r.CLASS.WIZ_EIDTOR_TOOlBAR_SIDE),
                        t.frame.toolbarContainer.appendChild(e),
                        t.frame.toolbarContainer.appendChild(n);
                        var i = C
                          , a = E;
                        o.forEach(i, function(t) {
                            e.appendChild(A.createToolIcon(t))
                        }),
                        o.forEach(a, function(e) {
                            n.appendChild(A.createToolIcon(e))
                        })
                    }
                },
                createToolIcon: function(e) {
                    var n = t.doc.createElement("div")
                      , r = t.doc.createElement("i")
                      , o = void 0;
                    if (e.id === l.split ? d.addClass(r, a.toolbarSplit) : (e.id !== l.undo && e.id !== l.redo || d.addClass(r, a.disabled),
                    d.addClass(r, a.icon),
                    d.addClass(r, "icon-" + e.icon),
                    r.setAttribute("unselectable", "on"),
                    r.setAttribute("onmousedown", "return false;"),
                    o = e.id,
                    r.id = o,
                    b[o] = r),
                    d.addClass(n, a.button),
                    e.id === l.image) {
                        var i = t.doc.createElement("label");
                        i.setAttribute("for", S),
                        i.appendChild(r),
                        n.appendChild(i)
                    } else
                        n.appendChild(r);
                    return n
                },
                getImgUploadingTmp: function(e) {
                    return t.body.querySelector("#" + A.getImgUploadingTmpId(e))
                },
                getImgUploadingTmpId: function(e) {
                    return l.tmpImg + "_" + e
                },
                getLineStartList: function() {
                    var e = m.getRange()
                      , n = []
                      , r = []
                      , o = void 0
                      , i = void 0;
                    if (!e)
                        return n;
                    var a = m.getRangeDetail(e.startContainer, e.startOffset)
                      , l = d.getPrevBlock(!e.collapsed && a.isEnd ? d.getNextNode(a.container) : a.container)
                      , s = void 0
                      , c = void 0;
                    if (e.collapsed)
                        A.checkBlock(l) && r.push(l);
                    else
                        for (s = m.getRangeDetail(e.endContainer, e.endOffset),
                        c = d.getPrevBlock(0 === s.offset ? d.getPreviousNode(s.container) : s.container),
                        A.checkBlock(c) && r.push(c),
                        o = d.getPrevBlock(d.getPreviousNode(c)); c !== t.body && c !== l && o && o !== t.body && (A.checkBlock(o) && r.splice(0, 0, o),
                        o !== l); )
                            o = d.getPrevBlock(d.getPreviousNode(o));
                    for (var u = 0; u < r.length; u++)
                        o = r[u],
                        d.isTag(o, "br") ? (i = o.nextSibling,
                        !i && d.isEmptyDom(o.parentNode) && (i = o)) : i = d.getFirstDeepChild(o),
                        A.checkDomInList(i, n) || n.push(i);
                    return n
                },
                hide: function() {
                    t.frame.toolbarContainer && (t.frame.toolbarContainer.style.display = "none")
                },
                insertImgUploadingTmp: function(e, n) {
                    var o = m.getRange();
                    if (o) {
                        o.deleteContents(),
                        A.clearImgUploadingTmp(e);
                        var i = t.doc.createElement("br");
                        o.insertNode(i);
                        var l = "markdown" === t.options.editor.type
                          , s = t.doc.createElement(r.TAG.TMP_TAG);
                        l ? s.innerHTML = n.markdownSrc.replace("uploading", '<span class="progress_txt">0%</span>)') : s.innerHTML = '<div style="border:1px solid #BDBDBD;color:#BDBDBD;width:200px;text-align:center;"><div class="' + a.imgName + '" style="padding:8px;font-size:14px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">' + n.name + '</div><div class="progress_txt" style="padding-bottom:8px;font-size:12px;">0%</div><div class="progress_line" style="width:0%;height:2px;background:#66BB6A;"></div></div>',
                        s.style.color = "#BDBDBD",
                        s.id = A.getImgUploadingTmpId(e),
                        s.setAttribute("contenteditable", "false"),
                        o.insertNode(s),
                        o.insertNode(t.doc.createElement("br"));
                        var c = d.getIndex(i);
                        m.setRange(i.parentNode, c + 1)
                    }
                },
                insertListOl: function() {
                    A.insertTextAtLineStart("1." + String.fromCharCode(160), A.getLineStartList())
                },
                insertListUl: function() {
                    A.insertTextAtLineStart("*" + String.fromCharCode(160), A.getLineStartList())
                },
                insertQuotes: function() {
                    A.insertTextAtLineStart(">" + String.fromCharCode(160), A.getLineStartList())
                },
                insertText: function(e) {
                    var n = m.getRange()
                      , r = void 0
                      , o = void 0;
                    return "\n" === e ? (r = t.doc.createElement("div"),
                    r.appendChild(t.doc.createElement("br"))) : r = t.doc.createTextNode(e),
                    n ? (n.deleteContents(),
                    m.insertNode(r),
                    m.setRange(r, d.getEndOffset(r))) : 3 === r.nodeType ? (o = t.doc.createElement("div"),
                    o.appendChild(r),
                    t.body.appendChild(o)) : t.body.appendChild(r),
                    r
                },
                insertTextAtLineStart: function(e, n) {
                    var r = void 0
                      , o = void 0;
                    if (0 === n.length)
                        return o = m.getRange(),
                        void (o || (r = A.insertText(e),
                        m.setRange(r, r.nodeValue.length)));
                    for (var i = 0; i < n.length; i++) {
                        var a = n[i];
                        r = t.doc.createTextNode(e),
                        d.isTag(a, "br") && d.isEmptyDom(a.parentNode) ? (d.before(r, a),
                        d.remove(a)) : d.before(r, a)
                    }
                },
                isActive: function(e) {
                    return d.hasClass(e, a.active)
                },
                preview: function() {
                    var e = t.body.querySelector("." + r.CLASS.WIZ_EIDTOR_PREVIEW_CONTAINER);
                    if (e ? (s.clearCodeMirror(e.querySelectorAll("." + r.CLASS.CODE_CONTAINER)),
                    e.innerHTML = "") : (e = t.doc.createElement(r.TAG.TMP_TAG),
                    d.addClass(e, r.CLASS.WIZ_EIDTOR_PREVIEW_CONTAINER),
                    d.addClass(e, r.CLASS.READONLY),
                    t.body.appendChild(e)),
                    h.hide(),
                    t.isShowPreview)
                        return t.isShowPreview = !1,
                        t.body.setAttribute("contenteditable", "true"),
                        d.removeClass(e, r.CLASS.EDITOR_PREVIEW_SHOW),
                        void t.event.call(r.EVENT.ON_SELECTION_CHANGE);
                    t.isShowPreview = !0,
                    y.handler.onSelectionChange(),
                    t.body.setAttribute("contenteditable", "false"),
                    d.addClass(e, r.CLASS.EDITOR_PREVIEW_SHOW),
                    e.innerHTML = "";
                    var n = t.doc.createElement("div");
                    n.innerHTML = t.body.innerHTML;
                    for (var o = n.querySelectorAll(r.TAG.TMP_TAG), i = o.length - 1; i >= 0; i--)
                        d.remove(o[i]);
                    for (; n.firstChild; )
                        e.appendChild(n.firstChild);
                    v.do({
                        container: e
                    }, function() {})
                },
                setActive: function(e, t) {
                    return t ? void (T !== e && (d.removeClass(T, a.active),
                    T = e,
                    d.addClass(e, a.active),
                    y.bindSubMenu())) : (d.removeClass(e, a.active),
                    void (T === e && (y.unbindSubMenu(),
                    T = null )))
                },
                show: function() {
                    A.createToolbar(),
                    t.frame.toolbarContainer.style.display = "flex"
                }
            };
            this.off = function() {
                t.isShowPreview = !1,
                y.unbind(),
                A.hide()
            }
            ,
            this.on = function() {
                t.readonly || (u.insertToolbarStyle(),
                u.insertPreviewStyle()),
                v || (v = new i({
                    win: t.win,
                    doc: t.doc,
                    callback: function() {}
                }),
                v.initCore(e)),
                A.show(),
                y.bind()
            }
            ,
            this.setImgUploaderId = function(e) {
                S = e;
                var n = void 0;
                if (!t.readonly && t.frame.toolbarContainer) {
                    if (n = t.frame.toolbarContainer.querySelector("#" + l.image),
                    !n)
                        return;
                    n.parentNode.setAttribute("for", S)
                }
            }
            ,
            this.onImgUploadBegin = function(e, t) {
                A.insertImgUploadingTmp(e, t)
            }
            ,
            this.onImgUploadComplete = function(e, n) {
                var o = A.getImgUploadingTmp(e);
                if (o) {
                    var i = void 0;
                    i = t.options.editor.type === r.NOTE_EDITOR_TYPE.MARKDOWN ? t.doc.createTextNode(n.markdownSrc) : g.makeDomByPath(n.url),
                    d.before(i, o),
                    d.remove(o)
                }
            }
            ,
            this.onImgUploadError = function(e) {
                A.clearImgUploadingTmp(e)
            }
            ,
            this.onImgUploadProgress = function(e, t) {
                var n = A.getImgUploadingTmp(e);
                if (n) {
                    var r = n.querySelector(".progress_txt")
                      , o = n.querySelector(".progress_line");
                    r && (r.firstChild.nodeValue = t.progress + "%"),
                    o && (o.style.width = t.progress + "%")
                }
            }
        }
        ;
        t.exports = s
    }
    , {
        "../../common/MarkdownRender": 12,
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    37: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = null 
              , t = null 
              , n = null 
              , i = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.domUtils,
                i = e.require.imgUtils
            }
            ;
            var a = function(e) {
                var o = new RegExp("(" + r.CLASS.IMG_NOT_DRAG + ")|(" + r.CLASS.IMG_ATTACHMENT + ")","i")
                  , i = !(!e || !n.isTag(e, "img") || o.test(e.className) || !e.src);
                if (!i)
                    return i;
                var a = void 0;
                return t.readonly ? (a = n.getParentByFilter(e, function(e) {
                    return e && n.isTag(e, "a") && /^(http|https|wiz|wiznote|wiznotecmd):/.test(e.getAttribute("href"))
                }, !0),
                !a) : (a = n.getParentByFilter(e, function(e) {
                    return e && n.isTag(e, "a") && /^(wiz|wiznote|wiznotecmd):open_attachment/.test(e.getAttribute("href"))
                }, !0),
                !a)
            }
              , l = function(e) {
                var n = e.target;
                if (a(n))
                    return t.client.sendCmdToWiznote(r.CLIENT_EVENT.WizReaderClickImg, {
                        src: n.src,
                        imgList: t.client.type.isIOS ? null  : i.getAll(!0)
                    }),
                    o.stopEvent(e),
                    !1
            }
              , s = function(e) {
                var o = e.target;
                if (a(o)) {
                    var i = t.body.querySelectorAll("img[" + r.ATTR.IMG_EDITING + "]")
                      , l = {};
                    l[r.ATTR.IMG_EDITING] = "";
                    for (var s = i.length - 1; s >= 0; s--)
                        n.attr(i[s], l);
                    l[r.ATTR.IMG_EDITING] = 1,
                    n.attr(o, l),
                    t.client.sendCmdToWiznote(r.CLIENT_EVENT.WizEditorClickImg, {
                        src: o.src
                    })
                }
            }
              , d = function() {}
              , c = {
                bind: function() {
                    c.unbind(),
                    t.client.type.isIOS || t.client.type.isAndroid ? t.event.add(r.EVENT.ON_CLICK, c.handler.onClick) : t.readonly && (t.client.type.isWin || t.client.type.isMac || t.client.type.isLinux) && t.event.add(r.EVENT.ON_DBLCLICK, c.handler.onClick)
                },
                unbind: function() {
                    t.event.remove(r.EVENT.ON_CLICK, c.handler.onClick)
                },
                handler: {
                    onClick: function(e) {
                        t.readonly ? l(e) : t.client.type.isAndroid && s(e)
                    }
                }
            };
            this.init = d,
            this.bind = c.bind,
            this.unbind = c.unbind
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    38: [function(e, t, n) {
        "use strict";
        var r = function() {
            var e = null 
              , t = null 
              , n = null 
              , r = null ;
            this.initCore = function(o) {
                e = o,
                t = e.env,
                n = e.require.imgClick,
                r = e.require.imgResize
            }
            ,
            this.on = function() {
                t.readonly || t.client.type.isPhone || t.client.type.isPad || (r.init(),
                r.bind()),
                n.init(),
                n.bind()
            }
            ,
            this.off = function() {
                r.unbind(),
                n.unbind()
            }
            ,
            this.setImgFullPath = function() {
                for (var e = t.body.querySelectorAll("img"), n = new RegExp("^(\\.\\/)?" + t.options.indexFilesPath.escapeRegex() + "\\/","i"), r = e.length - 1; r >= 0; r--) {
                    var o = e[r]
                      , i = o.getAttribute("src");
                    n.test(i) && o.setAttribute("src", i.replace(n, t.options.indexFilesFullPath))
                }
            }
        }
        ;
        t.exports = r
    }
    , {}],
    39: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = "wiz_style"
          , a = ["lt", "rt", "rb", "lb"]
          , l = function() {
            var e = null 
              , t = null 
              , n = null 
              , l = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.domUtils,
                l = e.require.rangeUtils
            }
            ;
            var s = ""
              , d = void 0
              , c = void 0
              , u = void 0
              , f = void 0
              , g = void 0
              , m = void 0
              , p = !1
              , h = null 
              , v = void 0
              , b = void 0
              , C = void 0
              , E = function(e) {
                if (!e)
                    return !1;
                var t = e.getAttribute("class");
                return !t || -1 === t.indexOf(r.CLASS.IMG_NOT_DRAG)
            }
              , T = function() {
                D(),
                O(),
                v = null ,
                t.body.style.cursor = b
            }
              , S = function() {
                var e = y();
                if (e)
                    return e;
                e = t.doc.createElement(r.TAG.TMP_TAG),
                n.addClass(e, r.CLASS.IMG_RESIZE_CONTAINER),
                e.setAttribute("contenteditable", "false"),
                e.setAttribute(i, "unsave");
                for (var o = 0; o < a.length; o++) {
                    var l = t.doc.createElement("div");
                    n.addClass(l, r.CLASS.IMG_RESIZE_HANDLE),
                    n.addClass(l, a[o]),
                    n.attr(l, {
                        "data-type": a[o]
                    }),
                    e.appendChild(l)
                }
                return t.body.appendChild(e),
                e
            }
              , y = function() {
                var e = t.body.querySelector("." + r.CLASS.IMG_RESIZE_CONTAINER);
                return !e || e.length < 1 ? null  : e
            }
              , A = function() {
                b = t.body.style.cursor || "",
                t.win.WizImgResizeOnGetHTML = function() {}
            }
              , N = function(e) {
                if (e) {
                    D(),
                    n.addClass(e, r.CLASS.IMG_RESIZE_ACTIVE),
                    e.attributes[r.ATTR.IMG_RATE] = e.width / e.height,
                    v = e;
                    var t = n.getIndex(e);
                    l.setRange(e.parentNode, t, e.parentNode, t + 1)
                }
            }
              , _ = function(e) {
                if (e && e.tagName && "img" === e.tagName.toLowerCase() && E(e)) {
                    var t = S();
                    t && (L(e),
                    N(e),
                    R.bindContainer(t))
                }
            }
              , O = function() {
                var e = y();
                e && (R.unbindContainer(e),
                n.remove(e))
            }
              , D = function() {
                var e = t.body.querySelectorAll("." + r.CLASS.IMG_RESIZE_ACTIVE);
                if (e && 0 !== e.length)
                    for (var o = e.length - 1; o >= 0; o--)
                        n.removeClass(e[o], r.CLASS.IMG_RESIZE_ACTIVE)
            }
              , L = function(e) {
                if (e) {
                    var o = y();
                    if (o)
                        for (var i = o.querySelectorAll("." + r.CLASS.IMG_RESIZE_HANDLE), a = {
                            offset: n.getOffset(e),
                            width: e.width,
                            height: e.height
                        }, l = n.getOffset(t.body), s = 0; s < i.length; s++) {
                            var d = i[s];
                            I(d, a, l),
                            d.style.visibility = "inherit"
                        }
                }
            }
              , w = function(e, t, n, r) {
                if (r) {
                    var o = n * e
                      , i = t / e;
                    o < t ? o = t : i = n,
                    r.width = o,
                    r.height = i
                }
            }
              , I = function(e, t, r) {
                if (t && e) {
                    var o = t.offset
                      , i = o.left - r.left
                      , a = o.top - r.top
                      , l = t.width
                      , s = t.height
                      , d = e.getAttribute("data-type")
                      , c = 0
                      , u = 0;
                    switch (d) {
                    case "lt":
                        c = i - 7,
                        u = a - 7;
                        break;
                    case "tm":
                        c = i + (l - 7) / 2,
                        u = a - 7;
                        break;
                    case "rt":
                        c = i + l,
                        u = a - 7;
                        break;
                    case "rm":
                        c = i + l,
                        u = a + (s - 7) / 2;
                        break;
                    case "rb":
                        c = i + l,
                        u = a + s;
                        break;
                    case "bm":
                        c = i + (l - 7) / 2,
                        u = a + s;
                        break;
                    case "lb":
                        c = i - 7,
                        u = a + s;
                        break;
                    case "lm":
                        c = i - 7,
                        u = a + (s - 7) / 2
                    }
                    n.css(e, {
                        left: c + "px",
                        top: u + "px"
                    })
                }
            }
              , x = function(e) {
                var t = y();
                t && (t.style.display = e ? "block" : "none",
                e || T())
            }
              , R = {
                bind: function() {
                    R.unbind(),
                    t.event.add(r.EVENT.BEFORE_GET_DOCHTML, R.handler.beforeGetDocHtml),
                    t.event.add(r.EVENT.ON_CUT, R.handler.onCut),
                    t.event.add(r.EVENT.ON_KEY_DOWN, R.handler.onKeyDown),
                    t.event.add(r.EVENT.ON_MOUSE_DOWN, R.handler.onMouseDown),
                    t.event.add(r.EVENT.ON_MOUSE_MOVE, R.handler.onMouseMove),
                    t.event.add(r.EVENT.ON_MOUSE_UP, R.handler.onMouseUp)
                },
                bindContainer: function(e) {
                    R.unbindContainer(e),
                    e.addEventListener("mousedown", R.handler.onContainerMouseDown)
                },
                unbind: function() {
                    t.event.remove(r.EVENT.BEFORE_GET_DOCHTML, R.handler.beforeGetDocHtml),
                    t.event.remove(r.EVENT.ON_CUT, R.handler.onCut),
                    t.event.remove(r.EVENT.ON_KEY_DOWN, R.handler.onKeyDown),
                    t.event.remove(r.EVENT.ON_MOUSE_DOWN, R.handler.onMouseDown),
                    t.event.remove(r.EVENT.ON_MOUSE_MOVE, R.handler.onMouseMove),
                    t.event.remove(r.EVENT.ON_MOUSE_UP, R.handler.onMouseUp)
                },
                unbindContainer: function(e) {
                    e.removeEventListener("mousedown", R.handler.onContainerMouseDown)
                },
                handler: {
                    beforeGetDocHtml: function() {
                        T()
                    },
                    onContainerMouseDown: function(e) {
                        var i = e.target || e.srcElement;
                        s = i.getAttribute("data-type");
                        var a = t.body.querySelector("." + r.CLASS.IMG_RESIZE_ACTIVE)
                          , l = void 0
                          , u = void 0
                          , f = void 0;
                        if (a) {
                            switch (l = e.pageX,
                            u = e.pageY,
                            f = n.getOffset(a),
                            s) {
                            case "lt":
                                d = f.left - l,
                                c = f.top - u,
                                g = f.left + a.width,
                                m = f.top + a.height,
                                C = "nw-resize";
                                break;
                            case "tm":
                                d = void 0,
                                c = f.top - u,
                                C = "n-resize";
                                break;
                            case "rt":
                                d = l - a.width - f.left,
                                c = f.top - u,
                                g = f.left,
                                m = f.top + a.height,
                                C = "ne-resize";
                                break;
                            case "rm":
                                d = l - a.width - f.left,
                                c = void 0,
                                C = "e-resize";
                                break;
                            case "rb":
                                d = l - a.width - f.left,
                                c = u - a.height - f.top,
                                C = "se-resize";
                                break;
                            case "bm":
                                d = void 0,
                                c = u - a.height - f.top,
                                g = f.left / 2,
                                m = f.top,
                                C = "s-resize";
                                break;
                            case "lb":
                                d = f.left - l,
                                c = u - a.height - f.top,
                                g = f.left + a.width,
                                m = f.top,
                                C = "sw-resize";
                                break;
                            case "lm":
                                d = f.left - l,
                                c = void 0,
                                C = "w-resize"
                            }
                            o.stopEvent(e)
                        }
                    },
                    onCut: function(e) {
                        x(!1)
                    },
                    onDrop: function(e) {
                        t.doc.removeEventListener("drop", R.handler.onDrop),
                        v === h && T(),
                        p = !1,
                        h = null 
                    },
                    onKeyDown: function(e) {
                        var t = e.keyCode || e.which
                          , r = void 0
                          , o = void 0;
                        !v || 8 !== t && 46 !== t || (r = v.parentNode,
                        r && (o = n.getIndex(v),
                        l.setRange(r, o, r, o + 1))),
                        x(!1)
                    },
                    onMouseDown: function(e) {
                        var r = e.target || e.srcElement;
                        n.isTag(r, "img") ? (p = !0,
                        h = r,
                        t.doc.addEventListener("drop", R.handler.onDrop)) : (p = !1,
                        h = null ),
                        e.target !== v && (x(!1),
                        D())
                    },
                    onMouseMove: function(e) {
                        var o = void 0
                          , i = void 0
                          , a = void 0
                          , p = void 0
                          , v = void 0
                          , b = e.target || e.srcElement;
                        if (b && b === h && (p = n.getIndex(e.target),
                        v = b,
                        l.setRange(v.parentNode, p, v.parentNode, p + 1)),
                        v = t.body.querySelector("." + r.CLASS.IMG_RESIZE_ACTIVE),
                        v && (o = n.getOffset(v),
                        s)) {
                            i = e.pageX,
                            a = e.pageY,
                            t.body.style.cursor = C;
                            var E = void 0
                              , T = void 0
                              , S = void 0
                              , y = void 0
                              , A = void 0;
                            switch (u && f || (u = i,
                            f = a),
                            s) {
                            case "tm":
                                v.width = v.width,
                                a < o.top ? v.height += f - a : (A = v.height - (a - f) - c,
                                v.height = A < 0 ? 0 : A);
                                break;
                            case "rm":
                                y = i - o.left - d,
                                v.width = y < 0 ? 0 : y,
                                v.height = v.height,
                                v.attributes[r.ATTR.IMG_RATE] = v.width / v.height;
                                break;
                            case "bm":
                                v.width = v.width,
                                v.height = A < 0 ? 0 : A,
                                v.attributes[r.ATTR.IMG_RATE] = v.width / v.height;
                                break;
                            case "lm":
                                v.height = v.height,
                                i < o.left ? v.width += u - i : (y = v.width - (i - u) - d,
                                v.width = y < 0 ? 0 : y);
                                break;
                            case "lt":
                                E = Number(v.attributes[r.ATTR.IMG_RATE]),
                                T = g - i,
                                S = m - a,
                                T -= d,
                                S -= c,
                                T = T < 0 ? 0 : T,
                                S = S < 0 ? 0 : S,
                                w(E, T, S, v);
                                break;
                            case "rt":
                                E = Number(v.attributes[r.ATTR.IMG_RATE]),
                                T = i - g,
                                S = m - a,
                                T -= d,
                                S -= c,
                                T = T < 0 ? 0 : T,
                                S = S < 0 ? 0 : S,
                                w(E, T, S, v);
                                break;
                            case "lb":
                                E = Number(v.attributes[r.ATTR.IMG_RATE]),
                                T = g - i,
                                S = a - m,
                                T -= d,
                                S -= c,
                                T = T < 0 ? 0 : T,
                                S = S < 0 ? 0 : S,
                                w(E, T, S, v);
                                break;
                            case "rb":
                                E = Number(v.attributes[r.ATTR.IMG_RATE]),
                                T = i - o.left,
                                S = a - o.top,
                                T -= d,
                                S -= c,
                                T = T < 0 ? 0 : T,
                                S = S < 0 ? 0 : S,
                                w(E, T, S, v)
                            }
                            if (v.style.cssText) {
                                var N = v.style.cssText;
                                N = N.replace(/width:\s*\d+.?\d+px;?/gi, "width: " + v.width + "px").replace(/height:\s*\d+.?\d+px;?/gi, "height: " + v.height + "px"),
                                v.style.cssText = N
                            }
                            u = i,
                            f = a,
                            L(v),
                            t.event.call(r.EVENT.UPDATE_RENDER, null )
                        }
                    },
                    onMouseUp: function(e) {
                        t.doc.removeEventListener("drop", R.handler.onDrop),
                        p = !1,
                        h = null ;
                        var r = e.target || e.srcElement;
                        n.isTag(r, "img") && _(r),
                        s = "",
                        u = void 0,
                        f = void 0,
                        g = void 0,
                        m = void 0,
                        d = void 0,
                        c = void 0,
                        t.body.style.cursor = b
                    }
                }
            };
            this.init = A,
            this.bind = R.bind,
            this.unbind = R.unbind
        }
        ;
        t.exports = l
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    40: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = function() {
            var e = this
              , t = null 
              , n = null 
              , o = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                o = t.require.domUtils
            }
            ;
            var i = function(e, t) {
                if (!e || e.className && e.className.indexOf("wiz-todo") > -1)
                    return !1;
                var n = e.src;
                if (!n)
                    return !1;
                var r = /^(http|https|ftp):/
                  , o = /^(data):/
                  , i = void 0;
                return i = !o.test(n),
                i && t ? !r.test(n) : i
            }
            ;
            this.getAll = function(e) {
                var t = n.doc.images
                  , r = []
                  , o = {};
                for (var a in t)
                    if (t.hasOwnProperty(a)) {
                        var l = decodeURIComponent(t[a].src);
                        i(t[a], e) && !o[l] && (r.push(l),
                        o[l] = !0)
                    }
                return r
            }
            ,
            this.getImageData = function(t) {
                var r = e.getImageSize(t.src)
                  , o = n.doc.createElement("canvas");
                o.width = r.width,
                o.height = r.height;
                var i = o.getContext("2d");
                i.drawImage(t, 0, 0);
                var a = o.toDataURL("image/png");
                return a.replace(/^data:image\/(png|jpg);base64,/, "")
            }
            ,
            this.getImageSize = function(e) {
                var t = new Image;
                t.src = e;
                var n = t.height
                  , r = t.width;
                return {
                    width: r,
                    height: n
                }
            }
            ,
            this.makeAttachmentDom = function(e, t) {
                var i = []
                  , a = void 0
                  , l = void 0
                  , s = void 0;
                return a = n.doc.createElement("div"),
                a.style.margin = "10px auto",
                l = n.doc.createElement("a"),
                l.href = "wiz://open_attachment?guid=" + e,
                s = n.doc.createElement("img"),
                s.src = t,
                s.style.verticalAlign = "bottom",
                s.style.maxWidth = "280px",
                o.addClass(s, r.CLASS.IMG_ATTACHMENT),
                l.appendChild(s),
                a.appendChild(l),
                i.push(a),
                a = n.doc.createElement("div"),
                a.appendChild(n.doc.createElement("br")),
                i.push(a),
                i
            }
            ,
            this.makeDomByPath = function(e) {
                var t = []
                  , r = [];
                e.indexOf("*") ? r = e.split("*") : r.push(e);
                for (var o = 0, i = r.length; o < i; o++) {
                    var a = n.doc.createElement("div");
                    t.push(a);
                    var l = n.doc.createElement("img");
                    l.src = r[o],
                    l.style.verticalAlign = "bottom",
                    l.style.maxWidth = "100%",
                    a.insertBefore(l, null ),
                    a = n.doc.createElement("div"),
                    a.insertBefore(n.doc.createElement("br"), null ),
                    t.push(a)
                }
                return t
            }
            ,
            this.remove = function(e) {
                for (var t = n.body.querySelectorAll(e), r = t.length - 1; r >= 0; r--) {
                    var o = t[r];
                    o.parentElement.removeChild(o)
                }
            }
            ,
            this.replaceSrc = function(e, t) {
                var i = n.body.querySelectorAll(e)
                  , a = {};
                a[r.ATTR.IMG_EDITING] = "";
                for (var l = i.length - 1; l >= 0; l--) {
                    var s = i[l];
                    s.src = t,
                    o.attr(s, a)
                }
            }
        }
        ;
        t.exports = o
    }
    , {
        "../../config/const": 51
    }],
    41: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = function() {
            var e = null 
              , t = null 
              , n = null 
              , o = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null 
              , f = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.blockCore,
                o = e.require.codeCore,
                i = e.require.domUtils,
                a = e.require.frameViewCore,
                l = e.require.highlightUtils,
                s = e.require.imgCore,
                d = e.require.readerEvent,
                c = e.require.tableCore,
                u = e.require.todoCore,
                f = e.require.wizStyle
            }
            ;
            var g = ""
              , m = function(e, n) {
                for (var r = t.body.getElementsByTagName(e), o = 0; o < r.length; o++) {
                    var i = r[o];
                    i.readOnly = n
                }
            }
            ;
            this.afterRender = function(e) {
                var a = function() {
                    s.setImgFullPath(),
                    m("input", !0),
                    m("textarea", !0),
                    "function" == typeof e && e()
                }
                ;
                i.fixOrderList(),
                d.on(),
                s.on(),
                c.on(),
                u.on(),
                n.on(),
                t.options.reader.type === r.NOTE_READER_TYPE.MARKDOWN ? a() : o.on({}, a)
            }
            ,
            this.off = function(e) {
                e = e || {},
                l.off(),
                i.removeClass(t.body, r.CLASS.READONLY),
                i.addClass(t.body, r.CLASS.EDITING),
                t.options.container && (i.removeClass(t.options.container, r.CLASS.READONLY),
                i.addClass(t.options.container, r.CLASS.EDITING)),
                d.off(),
                n.off(),
                u.off(),
                o.off(),
                c.off(),
                s.off(),
                a.off(),
                "string" == typeof e.noteSrc && (g = e.noteSrc),
                g && (t.options.reader.type === r.NOTE_READER_TYPE.COMMON ? (i.removeByTag(r.TAG.TMP_TAG),
                m("input", !1),
                m("textarea", !1)) : t.options.container && t.options.noFrame ? (t.body.innerHTML = g,
                i.removeClass(t.body, r.CLASS.MARKDOWN_BODY)) : (t.doc.open("text/html", "replace"),
                t.doc.write(g),
                t.doc.close(),
                t.body = t.doc.body))
            }
            ,
            this.on = function() {
                t.readonly = !0,
                i.removeClass(t.body, r.CLASS.EDITING),
                i.addClass(t.body, r.CLASS.READONLY),
                t.options.container && (i.removeClass(t.options.container, r.CLASS.EDITING),
                i.addClass(t.options.container, r.CLASS.READONLY)),
                a.on(),
                g = i.getContentHtml({
                    isSaveTemp: !0
                });
                var e = /(<body [^>]*)opacity:[ ]*0;?/gi;
                g = g.replace(e, "$1"),
                f.insertTmpReaderStyle()
            }
        }
        ;
        t.exports = o
    }
    , {
        "../../config/const": 51
    }],
    42: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.codeUtils,
                a = t.require.domUtils,
                l = t.require.rangeUtils
            }
            ;
            var s = function(e) {
                var t = l.getRange()
                  , s = void 0
                  , d = !1
                  , c = void 0
                  , u = void 0
                  , f = void 0;
                if (t && !t.collapsed)
                    if (u = i.getContainerFromChild(t.startContainer),
                    f = i.getContainerFromChild(t.endContainer),
                    u && u === f) {
                        if (!n.client.type.isPhone && !n.client.type.isPad)
                            return;
                        d = !0
                    } else
                        c = t.cloneContents(),
                        d = !!c.querySelector("." + r.CLASS.CODE_CONTAINER);
                if (t && !t.collapsed && d) {
                    if (s = l.getFragmentForCopy()) {
                        var g = s.innerText
                          , m = s.innerHTML;
                        if (s.innerHTML = "",
                        n.body.removeChild(s),
                        s = null ,
                        e.clipboardData.clearData(),
                        e.clipboardData.setData("text/plain", g),
                        e.clipboardData.setData("text/html", m),
                        e.clipboardData.getData("text"))
                            return void o.stopEvent(e);
                        var p = n.doc.createElement(r.TAG.TMP_TAG)
                          , h = n.doc.createElement("textarea");
                        h.value = g,
                        h.setAttribute("readonly", ""),
                        a.css(h, {
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "1000px"
                        }),
                        a.css(p, {
                            position: "absolute",
                            top: "-99999px",
                            left: "-99999px",
                            overflow: "hidden"
                        }),
                        p.appendChild(h),
                        n.body.appendChild(p),
                        h.focus(),
                        h.selectionStart = 0,
                        h.selectionEnd = h.value.length,
                        setTimeout(function() {
                            n.body.removeChild(p),
                            h = null ,
                            p = null 
                        }, 50)
                    }
                    s = null 
                }
            }
              , d = {
                onDblclick: function(e) {
                    n.event.call(r.EVENT.ON_DBLCLICK, e)
                },
                onClick: function(e) {
                    n.event.call(r.EVENT.ON_CLICK, e)
                },
                onCopy: function(e) {
                    s(e)
                },
                onMousemove: function(e) {
                    n.event.call(r.EVENT.ON_MOUSE_MOVE, e)
                },
                onScroll: function(e) {
                    n.event.call(r.EVENT.ON_SCROLL, e)
                },
                onTouchEnd: function(e) {
                    n.event.call(r.EVENT.ON_TOUCH_END, e)
                },
                onTouchStart: function(e) {
                    n.event.call(r.EVENT.ON_TOUCH_START, e)
                }
            };
            this.on = function() {
                e.bind()
            }
            ,
            this.off = function() {
                e.unbind()
            }
            ,
            this.bind = function() {
                e.unbind(),
                n.body.addEventListener("dblclick", d.onDblclick),
                n.body.addEventListener("click", d.onClick),
                n.body.addEventListener("copy", d.onCopy),
                n.body.addEventListener("cut", d.onCopy),
                n.body.addEventListener("mousemove", d.onMousemove),
                (n.client.type.isIOS || n.client.type.isAndroid) && (n.body.addEventListener("touchend", d.onTouchEnd),
                n.body.addEventListener("touchstart", d.onTouchStart)),
                n.doc.addEventListener("scroll", d.onScroll)
            }
            ,
            this.unbind = function() {
                n.body.removeEventListener("dblclick", d.onDblclick),
                n.body.removeEventListener("click", d.onClick),
                n.body.removeEventListener("copy", d.onCopy),
                n.body.removeEventListener("cut", d.onCopy),
                n.body.removeEventListener("mousemove", d.onMousemove),
                n.body.removeEventListener("touchend", d.onTouchEnd),
                n.body.removeEventListener("touchstart", d.onTouchStart),
                n.doc.removeEventListener("scroll", d.onScroll)
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    43: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null 
              , f = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.blockUtils,
                a = t.require.codeUtils,
                l = t.require.domUtils,
                s = t.require.historyUtils,
                d = t.require.rangeUtils,
                c = t.require.tableMenu,
                u = t.require.tableUtils,
                f = t.require.tableZone
            }
            ;
            var g = {
                bind: function() {
                    g.unbind(),
                    n.event.add(r.EVENT.ON_DRAG_START, g.handler.onDragStart),
                    n.event.add(r.EVENT.ON_KEY_UP, g.handler.onKeyUp),
                    n.client.type.isPhone || n.client.type.isPad ? (n.event.add(r.EVENT.ON_TOUCH_START, g.handler.onMouseDown),
                    n.event.add(r.EVENT.ON_TOUCH_END, g.handler.onMouseUp)) : (n.event.add(r.EVENT.ON_MOUSE_DOWN, g.handler.onMouseDown),
                    n.event.add(r.EVENT.ON_MOUSE_OVER, g.handler.onMouseOver),
                    n.event.add(r.EVENT.ON_MOUSE_UP, g.handler.onMouseUp)),
                    n.event.add(r.EVENT.ON_SELECTION_CHANGE, g.handler.onSelectionChange),
                    n.event.add(r.EVENT.AFTER_RESTORE_HISTORY, g.handler.afterRestoreHistory)
                },
                unbind: function() {
                    n.event.remove(r.EVENT.ON_DRAG_START, g.handler.onDragStart),
                    n.event.remove(r.EVENT.ON_KEY_UP, g.handler.onKeyUp),
                    n.event.remove(r.EVENT.ON_MOUSE_DOWN, g.handler.onMouseDown),
                    n.event.remove(r.EVENT.ON_MOUSE_OVER, g.handler.onMouseOver),
                    n.event.remove(r.EVENT.ON_MOUSE_UP, g.handler.onMouseUp),
                    n.event.remove(r.EVENT.ON_TOUCH_START, g.handler.onMouseDown),
                    n.event.remove(r.EVENT.ON_TOUCH_END, g.handler.onMouseUp),
                    n.event.remove(r.EVENT.ON_SELECTION_CHANGE, g.handler.onSelectionChange),
                    n.event.remove(r.EVENT.AFTER_RESTORE_HISTORY, g.handler.afterRestoreHistory)
                },
                handler: {
                    afterRestoreHistory: function() {
                        var e = void 0
                          , t = [];
                        if (e = n.doc.getElementsByClassName(r.CLASS.SELECTED_CELL),
                        0 === e.length)
                            return void f.clear();
                        for (var o = 0, i = e.length; o < i; o++)
                            t.push(e[o]);
                        var a = l.getParentByTagName(t[0], "table", !0, null );
                        if (!a)
                            return void f.clear();
                        f.setStart(t[0]);
                        for (var s = f.getZone(), d = t[t.length - 1], g = u.getRangeByCellData(u.getCellData(s.grid, d)), m = void 0, p = 1; p < t.length - 1; p++) {
                            var h = t[p];
                            1 !== h.rowSpan && (m = u.getRangeByCellData(u.getCellData(s.grid, h)),
                            (m.maxY > g.maxY || (m.maxY = g.maxY && m.maxX > g.maxX)) && (d = h,
                            g = m))
                        }
                        f.setEnd(d),
                        c.show()
                    },
                    onDragStart: function(e) {
                        var t = l.getParentByTagName(e.target, "table", !0, null );
                        t && o.stopEvent(e)
                    },
                    onKeyDown: function(e) {
                        var t = n.doc.getSelection()
                          , r = f.getZone();
                        if (!r.range)
                            return !0;
                        var i = e.shiftKey ? "extend" : "move"
                          , s = e.keyCode || e.which
                          , g = void 0
                          , m = !1
                          , p = t.focusNode
                          , h = void 0
                          , v = void 0;
                        switch (s) {
                        case 37:
                            e.ctrlKey || e.metaKey || !p || (m = !0,
                            t.modify(i, "backward", "character")),
                            g = {
                                x: -1,
                                y: 0
                            };
                            break;
                        case 38:
                            e.ctrlKey || e.metaKey || !p || (m = !0,
                            t.modify("move", "backward", "line")),
                            g = {
                                x: 0,
                                y: -1
                            };
                            break;
                        case 9:
                            e.shiftKey || (g = {
                                x: 1,
                                y: 0,
                                canChangeRow: !0
                            });
                            break;
                        case 39:
                            e.ctrlKey || e.metaKey || !p || (m = !0,
                            t.modify(i, "forward", "character")),
                            g = {
                                x: 1,
                                y: 0
                            };
                            break;
                        case 13:
                            if (!e.ctrlKey && !e.metaKey)
                                break;
                        case 40:
                            e.ctrlKey || e.metaKey || !p || (m = !0,
                            t.modify("move", "forward", "line")),
                            g = {
                                x: 0,
                                y: 1
                            }
                        }
                        var b = void 0
                          , C = void 0
                          , E = void 0
                          , T = void 0;
                        if (m) {
                            if (h = t.focusNode,
                            p = l.getParentByTagName(p, ["td", "th"], !0, null ),
                            h = l.getParentByTagName(h, ["td", "th"], !0, null ),
                            h && h !== p && (38 === s || 40 === s || 13 === s ? m = !1 : f.setStart(h).setEnd(h)),
                            m)
                                return E = u.checkCaretInTableContainer(e),
                                h || E.tableContainer ? E.before && (d.setRange(r.start.cell, 0),
                                f.setStart(r.start.cell).setEnd(r.start.cell)) : (f.clear(),
                                c.show()),
                                o.stopEvent(e),
                                !1;
                            if (38 === s && r.start.cell === r.end.cell && 0 === r.start.y_src) {
                                for (v = r.start.x,
                                h = l.getPreviousNode(u.getContainer(p)); h && !l.isTag(h, "br") && l.isEmptyDom(h); )
                                    h = l.getPreviousNode(h);
                                return h ? (f.clear(),
                                c.show(),
                                T = a.getContainerFromChild(h),
                                T ? a.focusToLast(T.codeMirror) : (d.setRange(h, l.getEndOffset(h)),
                                0 !== v || l.getParentByTagName(h, ["table"], !0, null ) || t.modify("move", "backward", "lineboundary"),
                                d.fixScroll())) : (d.setRange(r.start.cell, 0),
                                f.setStart(r.start.cell).setEnd(r.start.cell)),
                                o.stopEvent(e),
                                !1
                            }
                            if (40 === s && r.start.cell === r.end.cell && r.start.y_src + r.start.cell.rowSpan >= r.grid.length) {
                                for (v = r.start.x,
                                h = l.getNextNode(u.getContainer(p)); h && !l.isTag(h, "br") && l.isEmptyDom(h); )
                                    h = l.getNextNode(h);
                                return h ? (f.clear(),
                                c.show(),
                                T = a.getContainerFromChild(h),
                                T ? a.focusToFirst(T.codeMirror) : (d.setRange(h, l.getEndOffset(h)),
                                0 !== v || l.getParentByTagName(h, ["table"], !0, null ) || t.modify("move", "backward", "lineboundary"),
                                d.fixScroll())) : f.setStart(r.start.cell).setEnd(r.start.cell),
                                o.stopEvent(e),
                                !1
                            }
                        }
                        if (g) {
                            if (b = e.shiftKey ? r.end || r.start : r.start,
                            C = f.switchCell(b, g),
                            C === b)
                                return o.stopEvent(e),
                                !1;
                            if (C)
                                return e.shiftKey ? f.setEnd(C.cell, !0) : f.setStart(C.cell, C.x, C.y).setEnd(C.cell),
                                d.fixScroll(),
                                o.stopEvent(e),
                                !1
                        }
                        return !0
                    },
                    onKeyUp: function(e) {
                        var t = f.getZone()
                          , n = d.getRange()
                          , r = void 0;
                        !t.range && n && n.collapsed && (r = l.getParentByTagName(n.startContainer, ["td", "th"], !0, null ),
                        r && (f.setStart(r).setEnd(r),
                        c.show())),
                        u.fixSelection(e)
                    },
                    onMouseDown: function(e) {
                        var t = "mousedown" !== e.type || 0 === e.button || 1 === e.button;
                        if (!t)
                            return void c.hide();
                        var r = u.isMenu(e.target);
                        if (!r) {
                            var i = l.getParentByTagName(e.target, ["th", "td"], !0, null )
                              , a = i ? l.getParentByTagName(i, "table", !1, null ) : null 
                              , s = u.getMousePosition(e, a)
                              , d = f.isZoneBorder(e);
                            if (d.isBodyBorder || d.isContainer)
                                return void (n.client.type.isPhone || n.client.type.isPad || o.stopEvent(e));
                            if (!n.client.type.isPhone && !n.client.type.isPad) {
                                if (d.isRight)
                                    return void f.startDragColLine(e.target, s.x);
                                if (d.isBottom)
                                    return void f.startDragRowLine(e.target, s.y);
                                if (d.isDot)
                                    return
                            }
                            d.isBorder || d.isScroll || (f.setStart(i),
                            c.show())
                        }
                    },
                    onMouseOver: function(e) {
                        var t = l.getParentByTagName(e.target, ["td", "th"], !0, null );
                        f.modify(t)
                    },
                    onMouseUp: function(e) {
                        u.fixSelection(e);
                        var t = "mouseup" !== e.type || 0 === e.button || 1 === e.button;
                        if (t) {
                            var n = void 0
                              , r = void 0
                              , o = f.getZone();
                            if (!o.active) {
                                if (n = u.isMenu(e.target))
                                    return;
                                if (r = f.isZoneBorder(e),
                                r.isRight && !f.isRangeActiving())
                                    return;
                                if (r.isBottom && !f.isRangeActiving())
                                    return;
                                if (r.isDot)
                                    return;
                                if (r.isBorder || r.isScroll)
                                    return
                            }
                            var i = l.getParentByTagName(e.target, ["td", "th"], !0, null );
                            f.setEnd(i),
                            c.show()
                        }
                    },
                    onSelectionChange: function(e) {
                        var t = u.checkCaretInTableContainer(e)
                          , n = void 0
                          , r = d.getRange()
                          , o = void 0;
                        r && !r.collapsed && (o = u.getContainer(r.startContainer),
                        o && l.moveOutFromTableContainer(o),
                        o = u.getContainer(r.endContainer),
                        o && l.moveOutFromTableContainer(o));
                        var i = f.getZone();
                        t.tableContainer && i.table && !i.table.parentNode ? (c.hide(),
                        f.clear()) : t.tableContainer && !i.range && (n = t.tableContainer.querySelectorAll("td"),
                        n = t.tableMenu || t.after ? n[n.length - 1] : t.before ? n[0] : null ,
                        n && (f.setStart(n).setEnd(n),
                        c.show()))
                    }
                }
            };
            this.on = function() {
                n.readonly || g.bind(),
                u.initTableContainer(null ),
                f.clear()
            }
            ,
            this.off = function() {
                f.clear()
            }
            ,
            this.canCreateTable = function() {
                return u.canCreateTable(f.getZone())
            }
            ,
            this.clearCellValue = function() {
                var e = f.getZone();
                e.range && (s.saveSnap(!1),
                u.clearCellValue(e.grid, e.range))
            }
            ,
            this.deleteCols = function() {
                var t = f.getZone();
                if (t.range) {
                    if (0 === t.range.minX && t.range.maxX === t.grid[0].length - 1)
                        return void e.deleteTable();
                    s.saveSnap(!1);
                    for (var n = t.range.maxX; n >= t.range.minX; n--)
                        u.deleteCols(t.grid, n);
                    f.clear()
                }
            }
            ,
            this.deleteRows = function() {
                var t = f.getZone();
                if (t.range) {
                    if (0 === t.range.minY && t.range.maxY === t.grid.length - 1)
                        return void e.deleteTable();
                    s.saveSnap(!1);
                    for (var n = t.range.maxY; n >= t.range.minY; n--)
                        u.deleteRows(t.grid, n);
                    f.clear()
                }
            }
            ,
            this.deleteTable = function() {
                var e = f.getZone();
                if (e.table) {
                    s.saveSnap(!1);
                    var t = e.table.parentNode;
                    t && t.removeChild(e.table),
                    c.remove(),
                    f.remove(),
                    t = l.getParentByFilter(t, function(e) {
                        return l.hasClass(e, r.CLASS.TABLE_CONTAINER)
                    }, !0);
                    var o = void 0;
                    t && (o = n.doc.createElement("br"),
                    t.parentNode.insertBefore(o, t),
                    l.remove(t),
                    d.setRange(o, 0))
                }
            }
            ,
            this.distributeCols = function() {
                var e = f.getZone();
                e.range && (s.saveSnap(!1),
                u.distributeCols(e.table, e.grid),
                f.updateGrid())
            }
            ,
            this.insertCol = function(e) {
                var t = f.getZone();
                t.range && (s.saveSnap(!1),
                u.insertCol(t.grid, e ? t.range.minX : t.range.maxX + 1),
                f.updateGrid())
            }
            ,
            this.insertRow = function(e) {
                var t = f.getZone();
                t.range && (s.saveSnap(!1),
                u.insertRow(t.grid, e ? t.range.minY : t.range.maxY + 1),
                f.updateGrid())
            }
            ,
            this.insertTable = function(t, o) {
                s.saveSnap(!1);
                var a = d.getRange()
                  , c = void 0;
                if (e.canCreateTable()) {
                    var g = void 0
                      , m = void 0
                      , p = void 0;
                    a && (a.deleteContents(),
                    g = d.getRangeDetail(a.startContainer, a.startOffset),
                    g = l.getBlockParent(g.container, !0),
                    g && g !== n.body && l.isEmptyDom(g) && l.isTag(g, "div") && (m = g,
                    g.innerHTML = "")),
                    p = u.createTable(t, o),
                    m = m ? m : n.doc.createElement("div"),
                    m.appendChild(p),
                    m.parentNode || (m = i.insertBlock(p)),
                    u.initTableContainer(p),
                    c = p.querySelector("td"),
                    f.setStart(c).setEnd(c),
                    n.event.call(r.EVENT.UPDATE_RENDER)
                }
            }
            ,
            this.merge = function() {
                var e = f.getZone();
                if (e.range) {
                    s.saveSnap(!1);
                    var t = u.mergeCell(e.grid, e.range);
                    t && (f.updateGrid(),
                    f.setStart(t).setEnd(t))
                }
            }
            ,
            this.modifySelectionDom = function(e, t) {
                var n = d.getRange()
                  , r = f.getZone();
                return !(n && !n.collapsed || !r.range) && (u.modifySelectionDom(r, e, t),
                !0)
            }
            ,
            this.onKeyDown = g.handler.onKeyDown,
            this.setCellAlign = function(e, t) {
                var n = f.getZone();
                n.range && (s.saveSnap(!1),
                u.setCellAlign(n.grid, n.range, {
                    align: e,
                    valign: t
                }),
                f.setStartRange())
            }
            ,
            this.setCellBg = function(e) {
                var t = f.getZone();
                t.range && (s.saveSnap(!1),
                u.setCellBg(t.grid, t.range, e),
                f.setStartRange())
            }
            ,
            this.split = function() {
                var e = f.getZone()
                  , t = u.splitCell(e.table, e.grid, e.range);
                t && (s.saveSnap(!1),
                f.updateGrid(),
                e = f.getZone(),
                f.setStart(e.grid[t.minY][t.minX].cell).setEnd(e.grid[t.maxY][t.maxX].cell))
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    44: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = {
            col: "wiz-menu-col",
            align: "wiz-menu-align",
            bg: "wiz-menu-bg",
            bgDemo: "wiz-menu-bg-demo",
            cells: "wiz-menu-cells",
            more: "wiz-menu-more"
        }
          , i = {
            active: "active",
            disabled: "disabled",
            clickItem: "click-item",
            colorPadItem: "wiz-table-color-pad-item",
            alignItem: "wiz-table-cell-align-item"
        }
          , a = {
            list: 1,
            custom: 2
        }
          , l = function() {
            var e = this
              , t = null 
              , n = null 
              , l = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                l = t.lang,
                s = t.require.domUtils,
                d = t.require.tableCore,
                c = t.require.tableUtils,
                u = t.require.tableZone
            }
            ;
            var f = void 0
              , g = void 0
              , m = function() {
                var e = n.body.querySelector("." + r.CLASS.TABLE_TOOLS);
                if (e)
                    return e;
                var t = [{
                    id: o.col,
                    exClass: "icon-insert editor-icon",
                    subMenu: {
                        type: a.list,
                        data: [{
                            type: r.TYPE.TABLE.INSERT_ROW_UP,
                            name: l.Table.InsertRowUp,
                            isSplit: !1
                        }, {
                            type: r.TYPE.TABLE.INSERT_ROW_DOWN,
                            name: l.Table.InsertRowDown,
                            isSplit: !1
                        }, {
                            type: r.TYPE.TABLE.INSERT_COL_LEFT,
                            name: l.Table.InsertColLeft,
                            isSplit: !1
                        }, {
                            type: r.TYPE.TABLE.INSERT_COL_RIGHT,
                            name: l.Table.InsertColRight,
                            isSplit: !1
                        }, {
                            type: r.TYPE.TABLE.DELETE_ROW,
                            name: l.Table.DeleteRow,
                            isSplit: !0
                        }, {
                            type: r.TYPE.TABLE.DELETE_COL,
                            name: l.Table.DeleteCol,
                            isSplit: !1
                        }]
                    }
                }, {
                    id: o.align,
                    exClass: "icon-align editor-icon",
                    subMenu: {
                        type: a.custom,
                        make: function() {
                            for (var e = [["top", "middle", "bottom"], ["left", "center", "right"]], t = '<div class="wiz-table-menu-sub wiz-table-cell-align">', n = 0; n < e.length; n++) {
                                t += "<div>";
                                for (var o = 0; o < e[n].length; o++) {
                                    var a = 0 === n ? "valign" : "align";
                                    t += '<div class="' + i.alignItem + " " + i.clickItem + '" data-type="' + r.TYPE.TABLE.SET_CELL_ALIGN + '" data-align-type="' + a + '" data-align-value="' + e[n][o] + '">',
                                    0 === n ? (t += '<i class="editor-icon icon-box"></i>',
                                    t += '<i class="editor-icon valign icon-valign_' + e[n][o] + '"></i>') : t += '<i class="editor-icon align icon-align_' + e[n][o] + '"></i>',
                                    t += "</div>"
                                }
                                t += "</div>"
                            }
                            return t += "</div>"
                        }
                    }
                }, {
                    id: o.bg,
                    exClass: "icon-box editor-icon",
                    subMenu: {
                        type: a.custom,
                        make: function() {
                            for (var e = [["", "#f7b6ff", "#fecf9c"], ["#acf3fe", "#b2ffa1", "#b6caff"], ["#ffc7c8", "#eeeeee", "#fef49c"]], t = '<div class="wiz-table-menu-sub wiz-table-color-pad">', n = 0; n < e.length; n++) {
                                t += "<div>";
                                for (var o = 0; o < e[n].length; o++)
                                    t += '<div class="' + i.colorPadItem + " " + i.clickItem + '" data-color="' + e[n][o] + '" data-type="' + r.TYPE.TABLE.SET_CELL_BG + '">',
                                    t += '<i class="editor-icon icon-box"></i>',
                                    t += 0 === n && 0 === o ? '<i class="pad-demo editor-icon icon-oblique_line"></i>' : '<i class="pad-demo editor-icon icon-inner_box" style="color:' + e[n][o] + ';"></i>',
                                    t += "</div>";
                                t += "</div>"
                            }
                            return t += "</div>"
                        }
                    }
                }, {
                    id: o.cells,
                    exClass: "icon-merge editor-icon",
                    subMenu: {
                        type: a.list,
                        data: [{
                            type: r.TYPE.TABLE.MERGE_CELL,
                            name: l.Table.MergeCell,
                            isSplit: !1
                        }, {
                            type: r.TYPE.TABLE.SPLIT_CELL,
                            name: l.Table.SplitCell,
                            isSplit: !1
                        }, {
                            type: r.TYPE.TABLE.CLEAR_CELL,
                            name: l.Table.ClearCell,
                            isSplit: !1
                        }]
                    }
                }, {
                    id: o.more,
                    exClass: "icon-more editor-icon",
                    subMenu: {
                        type: a.list,
                        data: [{
                            type: r.TYPE.TABLE.DISTRIBUTE_COLS,
                            name: l.Table.DistributeCols,
                            exClass: "",
                            isSplit: !1
                        }, {
                            type: r.TYPE.TABLE.DELETE_TABLE,
                            name: l.Table.DeleteTable,
                            exClass: "",
                            isSplit: !0
                        }]
                    }
                }];
                e = n.doc.createElement(r.TAG.TMP_TAG),
                s.addClass(e, r.CLASS.TABLE_TOOLS);
                for (var d = "<ul>", c = 0; c < t.length; c++) {
                    var u = t[c];
                    d += '<li id="' + u.id + '" class="' + r.CLASS.TABLE_MENU_ITEM + '"><div class="' + r.CLASS.TABLE_MENU_BUTTON + '"><i class="' + u.exClass + '"></i>',
                    u.id === o.bg && (d += '<i id="' + o.bgDemo + '" class="editor-icon icon-inner_box"></i>'),
                    d += "</div>",
                    d += u.subMenu.type === a.list ? p(u.subMenu.data) : u.subMenu.make(),
                    d += "</li>"
                }
                return d += "</ul>",
                e.innerHTML = d,
                f = e.querySelector("#" + o.bgDemo),
                f && (f.style.color = "#fff"),
                e
            }
              , p = function(e) {
                for (var t = '<ul class="wiz-table-menu-sub">', n = 0; n < e.length; n++) {
                    var r = e[n];
                    t += '<li class="wiz-table-menu-sub-item ' + i.clickItem,
                    r.isSplit && (t += " split"),
                    t += '" data-type="' + r.type + '">' + r.name,
                    t += "</li>"
                }
                return t += "</ul>"
            }
              , h = function() {
                var e = void 0
                  , t = g.parentNode.querySelector("." + r.CLASS.TABLE_BODY)
                  , n = t ? t.offsetTop : 0;
                return e = n - g.offsetHeight - 3,
                e + "px"
            }
              , v = function() {
                var e = g.parentNode
                  , t = s.getOffset(e)
                  , n = s.getPageScroll().top;
                n > t.top - 30 && n < e.offsetHeight + t.top - 2.5 * g.offsetHeight ? s.css(g, {
                    position: "fixed",
                    top: "0",
                    left: t.left + "px"
                }) : s.css(g, {
                    position: "",
                    top: h(),
                    left: ""
                })
            }
              , b = {
                bind: function() {
                    b.unbind(),
                    g && (g.addEventListener("click", b.handler.onClick),
                    g.addEventListener("mouseover", b.handler.onMouseOver)),
                    n.event.add(r.EVENT.BEFORE_SAVESNAP, b.handler.onBeforeSaveSnap),
                    n.event.add(r.EVENT.ON_SCROLL, b.handler.onScroll)
                },
                unbind: function() {
                    g && (g.removeEventListener("click", b.handler.onClick),
                    g.removeEventListener("mouseover", b.handler.onMouseOver)),
                    n.event.remove(r.EVENT.BEFORE_SAVESNAP, b.handler.onBeforeSaveSnap),
                    n.event.remove(r.EVENT.ON_SCROLL, b.handler.onScroll)
                },
                handler: {
                    onBeforeSaveSnap: function() {},
                    onClick: function(t) {
                        var n = s.getParentByFilter(t.target, function(e) {
                            return s.hasClass(e, r.CLASS.TABLE_MENU_BUTTON)
                        }, !0);
                        if (n)
                            return void e.showSub(n.parentNode);
                        var o = void 0;
                        if (n = s.getParentByFilter(t.target, function(e) {
                            return s.hasClass(e, i.clickItem)
                        }, !0),
                        n && !s.hasClass(n, i.disabled)) {
                            var a = n.getAttribute("data-type")
                              , l = !0;
                            switch (a) {
                            case r.TYPE.TABLE.CLEAR_CELL:
                                d.clearCellValue();
                                break;
                            case r.TYPE.TABLE.MERGE_CELL:
                                d.merge();
                                break;
                            case r.TYPE.TABLE.SPLIT_CELL:
                                d.split();
                                break;
                            case r.TYPE.TABLE.INSERT_ROW_UP:
                                d.insertRow(!0);
                                break;
                            case r.TYPE.TABLE.INSERT_ROW_DOWN:
                                d.insertRow();
                                break;
                            case r.TYPE.TABLE.INSERT_COL_LEFT:
                                d.insertCol(!0);
                                break;
                            case r.TYPE.TABLE.INSERT_COL_RIGHT:
                                d.insertCol();
                                break;
                            case r.TYPE.TABLE.DELETE_ROW:
                                d.deleteRows();
                                break;
                            case r.TYPE.TABLE.DELETE_COL:
                                d.deleteCols();
                                break;
                            case r.TYPE.TABLE.SET_CELL_BG:
                                var c = n.getAttribute("data-color");
                                d.setCellBg(c),
                                o = s.getParentByFilter(n, function(e) {
                                    return s.hasClass(e, "wiz-table-color-pad")
                                }, !1),
                                s.removeClass(o.querySelectorAll(".wiz-table-color-pad ." + i.colorPadItem + "." + i.active), i.active),
                                s.addClass(n, i.active),
                                f.setAttribute("data-last-color", c);
                                break;
                            case r.TYPE.TABLE.SET_CELL_ALIGN:
                                var u = null 
                                  , g = null ;
                                "align" === n.getAttribute("data-align-type") ? u = n.getAttribute("data-align-value") : g = n.getAttribute("data-align-value"),
                                d.setCellAlign(u, g),
                                o = n.parentNode,
                                s.removeClass(o.querySelectorAll("." + i.active), i.active),
                                s.addClass(n, i.active),
                                l = !1;
                                break;
                            case r.TYPE.TABLE.DELETE_TABLE:
                                d.deleteTable();
                                break;
                            case r.TYPE.TABLE.DISTRIBUTE_COLS:
                                d.distributeCols();
                                break;
                            default:
                                l = !1
                            }
                            l && e.hideSub()
                        }
                    },
                    onMouseOver: function(e) {
                        var t = s.getParentByFilter(e.target, function(e) {
                            return s.hasClass(e, i.colorPadItem)
                        }, !0);
                        t && f && (f.style.color = t.getAttribute("data-color") || "#fff")
                    },
                    onScroll: function() {
                        g && "none" !== g.style.display && v()
                    }
                }
            };
            this.hide = function() {
                g && (g.style.display = "none"),
                b.unbind()
            }
            ,
            this.hideSub = function() {
                if (g) {
                    var e = g.querySelectorAll("." + r.CLASS.TABLE_MENU_ITEM + "." + i.active);
                    s.removeClass(e, i.active),
                    f && (f.style.color = f.getAttribute("data-last-color") || "#fff")
                }
            }
            ,
            this.remove = function() {
                g && (s.remove(g),
                g = null )
            }
            ,
            this.show = function() {
                if (!n.client.type.isPhone && !n.client.type.isPad) {
                    var t = u.getZone();
                    if (!t.grid || !t.range)
                        return void e.hide();
                    var o = s.getParentByFilter(t.table, function(e) {
                        return s.hasClass(e, r.CLASS.TABLE_CONTAINER)
                    }, !1);
                    g = m(),
                    s.attr(g, {
                        contenteditable: "false"
                    }),
                    e.hideSub(),
                    o.appendChild(g),
                    s.css(g, {
                        top: h()
                    }),
                    g.style.display = "block",
                    v(),
                    b.bind()
                }
            }
            ,
            this.showSub = function(t) {
                if (s.hasClass(t, i.active))
                    return void s.removeClass(t, i.active);
                var n = void 0
                  , a = void 0
                  , l = void 0
                  , d = void 0
                  , f = u.getZone();
                t.id === o.cells ? (n = c.canMerge(f.grid, f.range),
                a = c.canSplit(f.grid, f.range),
                d = t.querySelector("[data-type=" + r.TYPE.TABLE.MERGE_CELL + "]"),
                d && n ? s.removeClass(d, i.disabled) : d && s.addClass(d, i.disabled),
                d = t.querySelector("[data-type=" + r.TYPE.TABLE.SPLIT_CELL + "]"),
                d && a ? s.removeClass(d, i.disabled) : d && s.addClass(d, i.disabled)) : t.id === o.align && (l = c.getAlign(f.grid, f.range),
                d = t.querySelector("." + i.alignItem + "." + i.active + "[data-align-type=align]"),
                !d || l.align && d.getAttribute("data-align-value").toLowerCase() === l.align || (s.removeClass(d, i.active),
                d = null ),
                !d && l.align && (d = t.querySelector("[data-align-value=" + l.align + "]"),
                s.addClass(d, i.active)),
                d = t.querySelector("." + i.alignItem + "." + i.active + "[data-align-type=valign]"),
                !d || l.valign && d.getAttribute("data-align-value").toLowerCase() === l.valign || (s.removeClass(d, i.active),
                d = null ),
                !d && l.valign && (d = t.querySelector("[data-align-value=" + l.valign + "]"),
                s.addClass(d, i.active))),
                e.hideSub(),
                s.addClass(t, i.active)
            }
        }
        ;
        t.exports = l
    }
    , {
        "../../config/const": 51
    }],
    45: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.domUtils,
                a = t.require.rangeUtils
            }
            ,
            this.canCreateTable = function(e) {
                var t = a.getRange()
                  , n = void 0;
                if (t) {
                    if (n = i.getParentByTagName(t.startContainer, ["table"], !0, null ) || i.getParentByTagName(t.endContainer, ["table"], !0, null ))
                        return !1;
                    if (i.getParentByClass(t.startContainer, r.CLASS.CODE_CONTAINER, !0))
                        return !1
                }
                return !e.range
            }
            ,
            this.canMerge = function(e, t) {
                return e && t && e[t.minY][t.minX].cell !== e[t.maxY][t.maxX].cell
            }
            ,
            this.canSplit = function(t, n) {
                if (!t || !n)
                    return !1;
                var r = {}
                  , o = !1;
                return e.eachRange(t, n, function(e) {
                    var n = e.x_src + "_" + e.y_src;
                    e.fake && !r[n] && (r[n] = t[e.y_src][e.x_src],
                    o = !0)
                }),
                !!o && r
            }
            ,
            this.checkCaretInTableContainer = function(t) {
                var n = /^(mouse|touch)/i
                  , r = {
                    tableContainer: null ,
                    tableMenu: !1,
                    before: !1,
                    after: !1
                }
                  , o = void 0
                  , l = void 0
                  , s = void 0
                  , d = void 0
                  , c = void 0;
                if (t && n.test(t.type))
                    s = t.target;
                else {
                    if (o = a.getRange(),
                    !o || !o.collapsed)
                        return r;
                    c = a.getRangeDetail(o.startContainer, o.startOffset),
                    s = c.container,
                    d = c.offset
                }
                return i.isTag(s, "table") && e.initTableContainer(s),
                e.isMenu(s) ? (r.tableContainer = e.getContainerExcludeTable(s),
                r.tableMenu = !0,
                r) : (l = e.getContainerExcludeTable(s),
                l && (r.tableContainer = l,
                t && n.test(t.type) || (d > 0 ? r.after = !0 : r.before = !0)),
                r)
            }
            ,
            this.clearCellValue = function(t, n) {
                t && n && e.eachRange(t, n, function(e) {
                    e.fake || (e.cell.innerHTML = "<br/>")
                })
            }
            ,
            this.cloneCell = function(e, t) {
                var r = n.doc.createElement(e.tagName);
                return r.style.cssText = e.style.cssText,
                t ? r.innerHTML = "<br/>" : (r.colSpan = e.colSpan,
                r.rowSpan = e.rowSpan,
                r.innerHTML = e.innerHTML),
                r
            }
            ,
            this.createCell = function(e) {
                var t = n.doc.createElement("td");
                return t.setAttribute("align", "left"),
                t.setAttribute("valign", "middle"),
                e && t.setAttribute("style", "width:" + e + "px"),
                t.appendChild(n.doc.createElement("br")),
                t
            }
            ,
            this.createTable = function(t, r) {
                if (t && r) {
                    for (var o = n.doc.createElement("table"), i = n.doc.createElement("tbody"), a = 0; a < r; a++) {
                        for (var l = n.doc.createElement("tr"), s = 0; s < t; s++)
                            l.appendChild(e.createCell(n.options.table.colWidth));
                        i.appendChild(l)
                    }
                    return o.appendChild(i),
                    o.style.width = n.options.table.colWidth * t + "px",
                    o
                }
            }
            ,
            this.deleteCols = function(t, r) {
                if (t && 0 !== t.length && !(r > t[0].length)) {
                    for (var o = i.getParentByTagName(t[0][0].cell, "table", !1, null ), a = [], l = n.options.table.colWidth, s = 0; s < t.length; s++) {
                        var d = t[s][r];
                        d.y_src === s && d.cell.colSpan > 1 ? (d.cell.colSpan--,
                        a.push(d.cell)) : d.y_src === s && (l = e.getCellWidth(d.cell),
                        d.cell.parentElement.removeChild(d.cell)),
                        t[s].splice(r, 1)
                    }
                    for (var c = 0; c < a.length; c++) {
                        var u = a[c];
                        u.style.width = e.getCellWidth(u) - l + "px"
                    }
                    o.getElementsByTagName("td").length || o.getElementsByTagName("th").length ? e.fixTableWidth(o) : o.parentElement.removeChild(o)
                }
            }
            ,
            this.deleteRows = function(t, n) {
                if (t && 0 !== t.length && !(n > t.length)) {
                    for (var r = i.getParentByTagName(t[0][0].cell, "table", !1, null ), o = r.rows, a = t[n].length - 1; a >= 0; a--) {
                        var l = t[n][a];
                        if (l.x_src === a && l.y_src < l.y)
                            l.cell.rowSpan--;
                        else if (l.x_src === a && l.y_src === l.y && l.cell.rowSpan > 1 && n + 1 < t.length) {
                            l.cell.rowSpan--;
                            var s = e.getNextCellDataInRow(t[n + 1], a);
                            s = s ? s.cell : null ,
                            o[n + 1].insertBefore(l.cell, s)
                        }
                    }
                    t.splice(n, 1),
                    o[n].parentElement.removeChild(o[n]),
                    r.getElementsByTagName("tr").length ? e.fixTableWidth(r) : r.parentElement.removeChild(r)
                }
            }
            ,
            this.distributeCols = function(e, t) {
                if (e && t) {
                    var n = t[0].length;
                    if (0 !== n) {
                        for (var r = e.rows, o = e.offsetWidth / n, i = r.length - 1; i >= 0; i--)
                            for (var a = r[i].cells.length - 1; a >= 0; a--) {
                                var l = r[i].cells[a];
                                l.style.width = o * l.colSpan + "px"
                            }
                        e.style.width = e.offsetWidth + "px"
                    }
                }
            }
            ,
            this.eachRange = function(e, t, n) {
                if (e && t && n && "function" == typeof n)
                    for (var r = !0, o = t.minY; r !== !1 && o < e.length && o <= t.maxY; o++)
                        for (var i = t.minX; r !== !1 && i < e[o].length && i <= t.maxX; i++)
                            r = n(e[o][i])
            }
            ,
            this.fixColTimer = -1,
            this.fixColWidth = function(t, o, i, a, l) {
                l >= 0 || (e.fixColTimer && clearTimeout(e.fixColTimer),
                e.fixColTimer = setTimeout(function() {
                    var s = l;
                    t.style.width = o + "px";
                    for (var d = 0, c = i.length; d < c; d++) {
                        var u = i[d]
                          , f = u.cell.offsetWidth - a[e.getKeyForColWidth(u)] + l;
                        s = 0 === d ? f : Math.max(s, f)
                    }
                    if (s > l) {
                        t.style.width = o - l + s + "px";
                        for (var g = 0, m = i.length; g < m; g++) {
                            var p = i[g];
                            p.cell.style.width = a[e.getKeyForColWidth(p)] - l + s + "px"
                        }
                        n.event.call(r.EVENT.UPDATE_RENDER)
                    }
                }, 0))
            }
            ,
            this.fixSelection = function() {
                var t = a.getRange();
                if (t && !t.collapsed) {
                    var n = t.startContainer
                      , r = t.startOffset
                      , o = t.endContainer
                      , l = t.endOffset
                      , s = e.getContainer(n)
                      , d = e.getContainer(o);
                    if (!(!s && !d || s && d)) {
                        for (var c = void 0, u = s ? s : d; c = e.getContainer(u); )
                            u = s ? i.getNextNode(c, !1, o) : i.getPreviousNode(c, !1, n);
                        s ? (n = u ? u : o,
                        r = 0) : (o = u ? u : n,
                        l = i.getEndOffset(o)),
                        s ? a.setRange(o, l, n, r) : a.setRange(n, r, o, l)
                    }
                }
            }
            ,
            this.fixTableWidth = function(t) {
                if (t) {
                    for (var n = t.rows, r = 0, o = 0; o < n[0].cells.length; o++) {
                        var i = n[0].cells[o];
                        r += e.getCellWidth(i)
                    }
                    t.style.width = r + "px"
                }
            }
            ,
            this.getAlign = function(t, n) {
                if (!t || !n)
                    return !1;
                var r = void 0
                  , o = void 0
                  , i = void 0
                  , a = {
                    align: "",
                    valign: ""
                };
                return e.eachRange(t, n, function(e) {
                    return i = e.cell,
                    e.fake || (r = i.align.toLowerCase(),
                    o = i.vAlign.toLowerCase()),
                    "" === a.align && (a.align = r,
                    a.valign = o),
                    null  !== a.align && (a.align = a.align === r ? r : null ),
                    null  !== a.valign && (a.valign = a.valign === o ? o : null ),
                    null  !== a.align || null  !== a.valign
                }),
                a
            }
            ,
            this.getCellWidth = function(e) {
                return parseInt(e.style.width || e.offsetWidth, 10)
            }
            ,
            this.getCellData = function(e, t) {
                if (!e || !t)
                    return null ;
                for (var n = 0; n < e.length; n++)
                    for (var r = 0; r < e[n].length; r++) {
                        var o = e[n][r];
                        if (o.cell === t)
                            return o
                    }
                return null 
            }
            ,
            this.getCellsByRange = function(t, n) {
                var r = [];
                return t && n ? (e.eachRange(t, n, function(e) {
                    e.fake || r.push(e.cell)
                }),
                r) : r
            }
            ,
            this.getContainer = function(e) {
                return i.getParentByClass(e, r.CLASS.TABLE_CONTAINER, !0)
            }
            ,
            this.getTableBody = function(e) {
                return i.getParentByFilter(e, function(e) {
                    return i.hasClass(e, r.CLASS.TABLE_BODY)
                }, !0)
            }
            ,
            this.getContainerExcludeTable = function(t) {
                var n = i.getParentByTagName(t, ["th", "td"], !0, null );
                return n ? null  : e.getContainer(t)
            }
            ,
            this.getDomsByCellList = function(e) {
                var t = [];
                if (!e)
                    return t;
                for (var n = 0, r = e.length; n < r; n++) {
                    var o = e[n]
                      , a = i.getListA2B({
                        startDom: o.firstChild,
                        startOffset: 0,
                        endDom: o.lastChild,
                        endOffset: 1,
                        noSplit: !0
                    });
                    t = t.concat(a.list)
                }
                return t
            }
            ,
            this.getKeyForColWidth = function(e) {
                return e.x_src + "_" + e.y_src
            }
            ,
            this.getNextCellInTable = function(e) {
                var t = e.nextElementSibling;
                if (t)
                    return t;
                for (var n = e.parentNode.nextElementSibling; n; ) {
                    if (n.cells.length > 0)
                        return n.cells[0];
                    n = n.nextElementSibling
                }
                return null 
            }
            ,
            this.getNextCellDataInRow = function(e, t) {
                if (!e)
                    return null ;
                for (var n = t; n < e.length; n++)
                    if (!e[n].fake)
                        return e[n];
                return null 
            }
            ,
            this.getMousePosition = function(t, n) {
                var r = o.getEventClientPos(t)
                  , a = e.getTableBody(n || t.target)
                  , l = i.getPageScroll()
                  , s = r.x + l.left + (a ? a.scrollLeft : 0)
                  , d = r.y + l.top + (a ? a.scrollTop : 0);
                return {
                    x: s,
                    y: d
                }
            }
            ,
            this.getRangeByCellData = function(e) {
                return e ? {
                    minX: e.x_src,
                    minY: e.y_src,
                    maxX: e.x_src + e.cell.colSpan - 1,
                    maxY: e.y_src + e.cell.rowSpan - 1
                } : {
                    minX: 0,
                    minY: 0,
                    maxX: 0,
                    maxY: 0
                }
            }
            ,
            this.getRangeByCellsData = function(t, n, r) {
                if (!t || !n || !r)
                    return null ;
                var o = e.getRangeByCellData(n);
                if (n.cell === r.cell)
                    return o;
                for (var i = e.getRangeByCellData(r), a = Math.min(o.minX, i.minX), l = Math.min(o.minY, i.minY), s = Math.max(o.maxX, i.maxX), d = Math.max(o.maxY, i.maxY), c = {}, u = !0; u; ) {
                    u = !1;
                    for (var f = a, g = l, m = s, p = d, h = l; h <= d; h++) {
                        for (var v = a; v <= s; v++)
                            if (h > l && h < d && v < s - 1)
                                v = s - 1;
                            else {
                                var b = t[h][v]
                                  , C = b.x_src + "_" + b.y_src;
                                if (!c[C]) {
                                    var E = e.getRangeByCellData(b);
                                    if (a = Math.min(a, E.minX),
                                    l = Math.min(l, E.minY),
                                    s = Math.max(s, E.maxX),
                                    d = Math.max(d, E.maxY),
                                    a !== f || l !== g || s !== m || d !== p) {
                                        u = !0;
                                        break
                                    }
                                }
                            }
                        if (u)
                            break
                    }
                }
                return {
                    minX: a,
                    minY: l,
                    maxX: s,
                    maxY: d
                }
            }
            ,
            this.getTableGrid = function(e) {
                if (!e || !i.isTag(e, "table"))
                    return null ;
                for (var t = function(e, t) {
                    for (; n[t][e]; )
                        e++;
                    return e
                }
                , n = [], r = e.rows, o = void 0, a = void 0, l = void 0, s = 0; s < r.length; s++) {
                    var d = r[s]
                      , c = d.cells;
                    n[s] || (n[s] = []);
                    for (var u = 0; u < c.length; u++) {
                        var f = c[u]
                          , g = f.colSpan
                          , m = f.rowSpan;
                        f.firstChild || (f.innerHTML = "<br>"),
                        l = t(u, s);
                        for (var p = 0; p < m; p++) {
                            n[s + p] || (n[s + p] = []);
                            for (var h = 0; h < g; h++) {
                                var v = s + p
                                  , b = t(l + h, v);
                                0 === p && 0 === h && (o = b,
                                a = v),
                                n[v][b] = {
                                    cell: f,
                                    x: b,
                                    y: v,
                                    x_src: o,
                                    y_src: a,
                                    fake: p > 0 || h > 0
                                }
                            }
                        }
                    }
                }
                return n
            }
            ,
            this.getTemplateByHtmlForPaste = function(e) {
                var t = void 0
                  , r = !1
                  , o = void 0
                  , a = n.doc.createElement("div");
                if (a.innerHTML = e,
                i.childNodesFilter(a),
                t = a.querySelectorAll("table"),
                1 === t.length) {
                    var l = t[0];
                    i.remove(l),
                    i.isEmptyDom(a) ? (r = !0,
                    o = l) : a.innerHTML = e
                }
                if (!r) {
                    t = a.querySelectorAll("table");
                    for (var s = t.length - 1; s >= 0; s--) {
                        var d = t[s];
                        i.before(n.doc.createTextNode(d.innerText), d),
                        i.remove(d)
                    }
                    for (var c = a.childNodes.length - 1; c >= 0; c--) {
                        var u = a.childNodes[c];
                        1 !== u.nodeType && 3 !== u.nodeType && i.isEmptyDom(u) && a.removeChild(u)
                    }
                    o = a
                }
                return {
                    isTable: r,
                    pasteDom: o
                }
            }
            ,
            this.getTemplateByTxtForPaste = function(t) {
                t = (t || "").trim();
                var r = t.split(/\r?\n/)
                  , o = n.doc.createElement("table")
                  , i = n.doc.createElement("tbody")
                  , a = 0;
                o.appendChild(i);
                for (var l = 0; l < r.length; l++) {
                    for (var s = r[l].split("\t"), d = n.doc.createElement("tr"), c = 0; c < s.length; c++) {
                        var u = e.createCell();
                        s[c] && (u.innerHTML = "",
                        u.appendChild(n.doc.createTextNode(s[c]))),
                        d.appendChild(u)
                    }
                    a = Math.max(a, d.cells.length),
                    i.appendChild(d)
                }
                r = o.rows;
                for (var f = 0; f < r.length; f++)
                    for (var g = r[f], m = g.cells, p = m.length; p < a; p++)
                        g.appendChild(e.createCell());
                return {
                    isTable: !0,
                    pasteDom: o
                }
            }
            ,
            this.initTable = function(e) {
                for (var t = e.rows.length - 1; t >= 0; t--)
                    for (var n = e.rows[t].cells.length - 1; n >= 0; n--) {
                        var r = e.rows[t].cells[n];
                        r.style.width = r.offsetWidth + "px"
                    }
                e.style.width = e.offsetWidth + "px"
            }
            ,
            this.initTableContainer = function(e) {
                for (var t = e ? [e] : n.body.querySelectorAll("." + r.CLASS.WIZ_BODY + " table"), o = function(e, t) {
                    var r = e.parentNode;
                    if (t(r)) {
                        if (i.isTag(r, "blockquote")) {
                            var o = r;
                            r = n.doc.createElement("div"),
                            i.before(r, o),
                            r.appendChild(e),
                            i.remove(o)
                        }
                    } else
                        r = n.doc.createElement("div"),
                        i.before(r, e),
                        r.appendChild(e);
                    return r
                }
                , a = 0, l = t.length; a < l; a++) {
                    var s = t[a]
                      , d = o(s, function(e) {
                        return e !== n.body && !i.hasClass(e, r.CLASS.TEMPLATE_EDITABLE) && (1 === e.childNodes.length ? (i.addClass(e, r.CLASS.TABLE_BODY),
                        !0) : i.hasClass(e, r.CLASS.TABLE_BODY))
                    })
                      , c = o(d, function(e) {
                        return e !== n.body && !i.hasClass(e, r.CLASS.TEMPLATE_EDITABLE) && (1 === e.childNodes.length ? (i.addClass(e, r.CLASS.TABLE_CONTAINER),
                        !0) : i.hasClass(e, r.CLASS.TABLE_CONTAINER))
                    });
                    i.addClass(c, r.CLASS.TABLE_CONTAINER),
                    i.css(c, {
                        position: "relative",
                        padding: "0"
                    }),
                    i.addClass(d, r.CLASS.TABLE_BODY),
                    i.removeClass(d, r.CLASS.TABLE_MOVING)
                }
            }
            ,
            this.insertCol = function(t, r) {
                if (t) {
                    r = r || 0;
                    for (var o = void 0, a = void 0, l = void 0, s = void 0, d = i.getParentByTagName(t[0][0].cell, "table", !1, null ), c = d.rows, u = null , f = 0; f < t.length; f++) {
                        var g = t[f];
                        g.length > r ? (o = t[f][r],
                        a = o.cell) : (o = null ,
                        a = null ),
                        a && a !== u && o.x_src < r ? (o.cell.colSpan++,
                        o.cell.style.width = e.getCellWidth(o.cell) + n.options.table.colWidth + "px") : (!a || a && o.x_src === r) && (l = e.createCell(n.options.table.colWidth),
                        a && o.y_src < o.y ? (s = e.getNextCellDataInRow(t[f], r),
                        c[f].insertBefore(l, s ? s.cell : null )) : c[f].insertBefore(l, a)),
                        u = o ? o.cell : null 
                    }
                    e.fixTableWidth(d)
                }
            }
            ,
            this.insertRow = function(t, r) {
                if (t) {
                    r = r || 0;
                    for (var o = void 0, i = n.doc.createElement("tr"), a = t[t.length > r ? r : t.length - 1], l = 0; l < a.length; l++) {
                        var s = a[l];
                        t.length > r && s.y_src < s.y && s.x_src === s.x ? s.cell.rowSpan++ : (t.length <= r || s.y_src === s.y) && (o = e.cloneCell(s.cell, !0),
                        s.cell.colSpan > 1 && (o.style.width = s.cell.offsetWidth / s.cell.colSpan + "px"),
                        i.appendChild(o))
                    }
                    var d = a[0].cell.parentElement
                      , c = d.parentElement;
                    t.length <= r && (d = null ),
                    c.insertBefore(i, d)
                }
            }
            ,
            this.isMenu = function(e) {
                return !!e && !!i.getParentByFilter(e, function(e) {
                    return i.hasClass(e, r.CLASS.TABLE_TOOLS)
                }, !0)
            }
            ,
            this.mergeCell = function(t, r) {
                if (!e.canMerge(t, r))
                    return null ;
                var o = r.maxY - r.minY + 1
                  , a = r.maxX - r.minX + 1
                  , l = t[r.minY][r.minX].cell
                  , s = n.doc.createElement("div");
                for (e.eachRange(t, r, function(e) {
                    if (!e.fake && e.cell !== l) {
                        if (!i.isEmptyDom(e.cell))
                            for (s.lastChild && s.appendChild(n.doc.createElement("br")); e.cell.firstChild; )
                                s.appendChild(e.cell.firstChild);
                        i.remove(e.cell)
                    }
                }); s.firstChild; )
                    l.appendChild(s.firstChild);
                return l.rowSpan = o,
                l.colSpan = a,
                l
            }
            ,
            this.modifySelectionDom = function(t, n, r) {
                var o = n["text-align"] || null 
                  , a = n["text-valign"] || null ;
                delete n["text-align"],
                delete n["text-valign"],
                e.eachRange(t.grid, t.range, function(e) {
                    e.fake || i.modifyNodesStyleAndClear(e.cell.childNodes, n, r, [])
                }),
                (o || a) && e.setCellAlign(t.grid, t.range, {
                    align: o,
                    valign: a
                })
            }
            ,
            this.setCellAlign = function(t, n, r) {
                if (t && n) {
                    var o = {};
                    null  != r.align && (o.align = r.align || "left"),
                    null  != r.valign && (o.valign = r.valign || "middle"),
                    e.eachRange(t, n, function(e) {
                        e.fake || (o.align && i.css(e.cell, {
                            "text-align": ""
                        }),
                        o.valign && i.css(e.cell, {
                            "text-valign": ""
                        }),
                        i.attr(e.cell, o))
                    })
                }
            }
            ,
            this.setCellBg = function(t, n, r) {
                t && n && (r = r || "",
                "transparent" === r.toLowerCase() && (r = ""),
                e.eachRange(t, n, function(e) {
                    e.fake || i.css(e.cell, {
                        "background-color": r
                    })
                }))
            }
            ,
            this.setColWidth = function(t, r, o, i) {
                var a = function() {
                    for (var e = void 0, t = i, a = 0; a < r.length; a++) {
                        var l = r[a][o]
                          , s = n.options.table.colWidthMin - l.cell.offsetWidth;
                        if (1 === l.cell.colSpan) {
                            t = s,
                            e = l.cell;
                            break
                        }
                        t < s && (t = s,
                        e = l.cell)
                    }
                    return i < t ? t : i
                }
                ;
                i = a();
                for (var l = t.offsetWidth + i, s = [], d = {}, c = 0, u = r.length; c < u; c++) {
                    var f = r[c][o]
                      , g = e.getKeyForColWidth(f);
                    d[g] || (d[g] = f.cell.offsetWidth + i,
                    s.push(f))
                }
                t.style.width = l + "px";
                for (var m = 0, p = s.length; m < p; m++) {
                    var h = s[m];
                    h.cell.style.width = d[e.getKeyForColWidth(h)] + "px"
                }
                e.fixColWidth(t, l, s, d, i)
            }
            ,
            this.setRowHeight = function(e, t, r, o) {
                for (var i = void 0, a = void 0, l = o, s = 0; s < t[r].length; s++) {
                    i = t[r][s];
                    var d = n.options.table.rowHeightMin - i.cell.offsetHeight;
                    if (1 === i.cell.rowSpan) {
                        l = d,
                        a = i.cell;
                        break
                    }
                    l < d && (l = d,
                    a = i.cell)
                }
                a && (o < l ? a.parentNode.style.height = n.options.table.rowHeightMin + "px" : a.parentNode.style.height = i.cell.offsetHeight + o + "px")
            }
            ,
            this.splitCell = function(t, n, r) {
                var o = e.canSplit(n, r);
                if (!o)
                    return null ;
                for (var i in o)
                    if (o.hasOwnProperty(i))
                        for (var a = o[i], l = a.cell.rowSpan, s = a.cell.colSpan, d = a.y_src; d < a.y_src + l; d++)
                            for (var c = a.x_src; c < a.x_src + s; c++) {
                                var u = n[d][c];
                                if (u.fake) {
                                    var f = e.getNextCellDataInRow(n[d], c);
                                    f = f ? f.cell : null ;
                                    var g = e.cloneCell(u.cell, !0);
                                    t.rows[d].insertBefore(g, f),
                                    u.fake = !1,
                                    u.cell = g,
                                    u.y_src = d,
                                    u.x_src = c
                                } else
                                    u.cell.rowSpan = 1,
                                    u.cell.colSpan = 1;
                                u.cell.style.width = ""
                            }
                return r
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    46: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = this
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                i = t.require.domUtils,
                a = t.require.historyUtils,
                l = t.require.rangeUtils,
                s = t.require.tableUtils
            }
            ;
            var d = {
                active: !1,
                table: null ,
                start: null ,
                end: null ,
                range: null ,
                grid: null 
            }
              , c = void 0
              , u = void 0
              , f = void 0
              , g = function() {
                if (d.table)
                    for (var e = d.table.getElementsByClassName(r.CLASS.SELECTED_CELL), t = e.length - 1; t >= 0; t--)
                        i.removeClass(e[t], [r.CLASS.SELECTED_CELL, r.CLASS.SELECTED_CELL_MULTI])
            }
              , m = function(e) {
                if (d.table) {
                    var t = v()
                      , n = t.colLine.minLeft;
                    e < n && (e = n),
                    i.css(t.colLine, {
                        top: d.table.offsetTop + "px",
                        left: e + "px",
                        height: d.table.offsetHeight + "px",
                        display: "block"
                    }),
                    t.container.style.display = "block"
                }
            }
              , p = function() {
                if (!d.grid || !d.range)
                    return null ;
                var e = [];
                return s.eachRange(d.grid, d.range, function(t) {
                    t.fake || e.push(t)
                }),
                e
            }
              , h = function(e, t, r) {
                var o = e.querySelector("#" + t);
                return o || (o = n.doc.createElement(r),
                o.id = t,
                e.appendChild(o)),
                o
            }
              , v = function() {
                var e = {
                    container: null ,
                    rowLine: null ,
                    colLine: null ,
                    start: {
                        dom: null ,
                        top: null ,
                        right: null ,
                        bottom: null ,
                        left: null ,
                        dot: null 
                    },
                    range: {
                        dom: null ,
                        top: null ,
                        right: null ,
                        bottom: null ,
                        left: null ,
                        dot: null 
                    }
                };
                return e.container = h(n.body, r.ID.TABLE_RANGE_BORDER, r.TAG.TMP_TAG),
                i.attr(e.container, {
                    contenteditable: "false"
                }),
                e.colLine = h(e.container, r.ID.TABLE_COL_LINE, "div"),
                e.rowLine = h(e.container, r.ID.TABLE_ROW_LINE, "div"),
                e.start.dom = h(e.container, r.ID.TABLE_RANGE_BORDER + "_start", "div"),
                e.start.top = h(e.start.dom, r.ID.TABLE_RANGE_BORDER + "_start_top", "div"),
                e.start.right = h(e.start.dom, r.ID.TABLE_RANGE_BORDER + "_start_right", "div"),
                e.start.bottom = h(e.start.dom, r.ID.TABLE_RANGE_BORDER + "_start_bottom", "div"),
                e.start.left = h(e.start.dom, r.ID.TABLE_RANGE_BORDER + "_start_left", "div"),
                e.start.dot = h(e.start.dom, r.ID.TABLE_RANGE_BORDER + "_start_dot", "div"),
                e.range.dom = h(e.container, r.ID.TABLE_RANGE_BORDER + "_range", "div"),
                e.range.top = h(e.range.dom, r.ID.TABLE_RANGE_BORDER + "_range_top", "div"),
                e.range.right = h(e.range.dom, r.ID.TABLE_RANGE_BORDER + "_range_right", "div"),
                e.range.bottom = h(e.range.dom, r.ID.TABLE_RANGE_BORDER + "_range_bottom", "div"),
                e.range.left = h(e.range.dom, r.ID.TABLE_RANGE_BORDER + "_range_left", "div"),
                e.range.dot = h(e.range.dom, r.ID.TABLE_RANGE_BORDER + "_range_dot", "div"),
                e
            }
              , b = function(e) {
                s.initTableContainer(d.table);
                var t = d.table.parentNode;
                t.appendChild(e.container)
            }
              , C = function(e) {
                d.table = e,
                d.grid = s.getTableGrid(d.table)
            }
              , E = function() {
                if (!d.grid || !d.range)
                    return !1;
                var e = d.grid[d.range.minY][d.range.minX]
                  , t = d.grid[d.range.maxY][d.range.maxX]
                  , n = d.start;
                return e.cell === t.cell && t.cell === n.cell
            }
              , T = function() {
                var e = l.getRange();
                if (!e)
                    return n.client.type.isPhone || n.client.type.isPad || !E();
                var t = void 0
                  , r = void 0
                  , o = void 0;
                return d.grid && d.start && (t = i.getParentByTagName(e.startContainer, ["th", "td"], !0, null ),
                r = e.collapsed ? t : i.getParentByTagName(e.endContainer, ["th", "td"], !0, null )),
                !d.start || d.start.cell === t && t === r || !e.collapsed && d.start.cell === t && t !== r && 0 === e.endOffset && r === s.getNextCellInTable(t) && (r = t.lastChild,
                o = i.getEndOffset(r),
                setTimeout(function() {
                    l.setRange(e.startContainer, e.startOffset, r, o)
                }, 200),
                !0)
            }
              , S = function() {
                g(),
                A(p());
                var e = v();
                if (!d.start || !d.range)
                    return e.container.style.display = "none",
                    e.start.dom.style.display = "none",
                    void (e.range.dom.style.display = "none");
                b(e);
                var t = n.doc.body.clientTop
                  , r = n.doc.body.clientLeft
                  , o = void 0
                  , a = void 0
                  , l = void 0
                  , s = void 0
                  , c = void 0
                  , u = void 0
                  , f = void 0
                  , m = void 0
                  , h = d.start ? d.start.cell : null 
                  , C = d.grid[d.range.minY][d.range.minX]
                  , T = d.grid[d.range.maxY][d.range.maxX];
                C && T && (C = C.cell,
                T = T.cell,
                h && (a = t + h.offsetTop,
                o = r + h.offsetLeft,
                l = h.offsetWidth,
                s = h.offsetHeight),
                u = t + C.offsetTop,
                c = r + C.offsetLeft,
                C === T ? (f = C.offsetWidth,
                m = C.offsetHeight) : (f = T.offsetLeft + T.offsetWidth - c,
                m = T.offsetTop + T.offsetHeight - u),
                i.css(e.start.dom, {
                    top: a + "px",
                    left: o + "px"
                }),
                i.css(e.start.top, {
                    width: l + "px"
                }),
                i.css(e.start.left, {
                    height: s + "px"
                }),
                i.css(e.start.bottom, {
                    top: s - 1 + "px",
                    width: l + "px"
                }),
                i.css(e.start.right, {
                    left: l - 1 + "px",
                    height: s + "px"
                }),
                i.css(e.start.dot, {
                    top: s - 1 - 4 + "px",
                    left: l - 1 - 4 + "px"
                }),
                i.css(e.range.dom, {
                    top: u + "px",
                    left: c + "px"
                }),
                i.css(e.range.top, {
                    width: f + "px"
                }),
                i.css(e.range.left, {
                    height: m + "px"
                }),
                i.css(e.range.bottom, {
                    top: m + "px",
                    width: f + "px"
                }),
                i.css(e.range.right, {
                    left: f + "px",
                    height: m + "px"
                }),
                i.css(e.range.dot, {
                    top: m - 4 + "px",
                    left: f - 4 + "px"
                }),
                e.start.dom.style.display = "block",
                E() ? (e.start.dot.style.display = "block",
                e.range.dom.style.display = "none") : (e.start.dot.style.display = "none",
                e.range.dom.style.display = "block"),
                e.container.style.display = "block",
                e.start.dot.style.display = "none",
                e.range.dot.style.display = "none",
                N())
            }
              , y = function(e) {
                if (d.table) {
                    var t = v()
                      , n = t.rowLine.minTop;
                    e < n && (e = n),
                    i.css(t.rowLine, {
                        left: d.table.offsetLeft + "px",
                        top: e + "px",
                        width: d.table.offsetWidth + "px",
                        display: "block"
                    }),
                    t.container.style.display = "block"
                }
            }
              , A = function(e) {
                if (e)
                    for (var t = 0, n = e.length; t < n; t++)
                        i.addClass(e[t].cell, r.CLASS.SELECTED_CELL + (n > 1 ? " " + r.CLASS.SELECTED_CELL_MULTI : ""))
            }
              , N = function() {
                var e = void 0;
                return d.grid && d.range && !E() ? (e = n.doc.getSelection(),
                void e.empty()) : void (T() || l.setRange(d.start.cell, d.start.cell.childNodes.length))
            }
              , _ = {
                bind: function() {
                    _.unbind(),
                    n.event.add(r.EVENT.ON_SELECTION_CHANGE, _.handler.onSelectionChange),
                    n.event.add(r.EVENT.UPDATE_RENDER, _.handler.updateRender),
                    d.table && (d.table.addEventListener("DOMSubtreeModified", _.handler.onDomModified),
                    n.win.addEventListener("resize", _.handler.onDomModified))
                },
                unbind: function() {
                    var t = e.getZone();
                    n.event.remove(r.EVENT.ON_SELECTION_CHANGE, _.handler.onSelectionChange),
                    n.event.remove(r.EVENT.UPDATE_RENDER, _.handler.updateRender),
                    t.table && (t.table.removeEventListener("DOMSubtreeModified", _.handler.onDomModified),
                    n.win.removeEventListener("resize", _.handler.onDomModified))
                },
                bindStopSelectStart: function() {
                    _.unbindStopSelectStart(),
                    n.event.add(r.EVENT.ON_SELECT_START, _.handler.onStopSelectStart)
                },
                unbindStopSelectStart: function() {
                    n.event.remove(r.EVENT.ON_SELECT_START, _.handler.onStopSelectStart)
                },
                bindDragLine: function() {
                    _.unbindDragLine(),
                    _.bindStopSelectStart(),
                    n.event.add(r.EVENT.ON_MOUSE_MOVE, _.handler.onDragLineMove),
                    n.event.add(r.EVENT.ON_MOUSE_UP, _.handler.onDragLineEnd)
                },
                unbindDragLine: function() {
                    _.unbindStopSelectStart(),
                    n.event.remove(r.EVENT.ON_MOUSE_MOVE, _.handler.onDragLineMove),
                    n.event.remove(r.EVENT.ON_MOUSE_UP, _.handler.onDragLineEnd)
                },
                handler: {
                    onDragLineMove: function(e) {
                        var t = v()
                          , n = s.getMousePosition(e, d.table);
                        "block" === t.colLine.style.display ? m(n.x - t.colLine.startMouse + t.colLine.startLine) : y(n.y - t.rowLine.startMouse + t.rowLine.startLine)
                    },
                    onDragLineEnd: function(e) {
                        _.unbindDragLine();
                        var t = v()
                          , o = s.getMousePosition(e, d.table)
                          , i = void 0
                          , l = "block" === t.colLine.style.display
                          , c = "block" === t.rowLine.style.display;
                        t.colLine.style.display = "none",
                        t.rowLine.style.display = "none",
                        a.saveSnap(!1),
                        l && t.colLine.startMouse !== o.x ? (i = t.colLine.cellData,
                        i && (s.initTable(d.table),
                        s.setColWidth(d.table, d.grid, i.x, o.x - t.colLine.startMouse))) : c && t.rowLine.startMouse !== o.y && (i = t.rowLine.cellData,
                        i && (s.initTable(d.table),
                        s.setRowHeight(d.table, d.grid, i.y, o.y - t.rowLine.startMouse))),
                        t.colLine.cellData = null ,
                        t.colLine.minLeft = null ,
                        t.colLine.startLine = null ,
                        t.colLine.startMouse = null ,
                        t.rowLine.cellData = null ,
                        t.rowLine.minTop = null ,
                        t.rowLine.startLine = null ,
                        t.rowLine.startMouse = null ,
                        n.event.call(r.EVENT.UPDATE_RENDER)
                    },
                    onSelectionChange: function(e) {
                        var t = n.doc.getSelection();
                        T() || (t.empty(),
                        o.stopEvent(e))
                    },
                    onDomModified: function(e) {
                        var t = e && "DOMSubtreeModified" === e.type && 1 === e.target.nodeType && e.target.querySelector("img");
                        f && clearTimeout(f),
                        f = setTimeout(function() {
                            n.event.call(r.EVENT.UPDATE_RENDER, e, t)
                        }, 100)
                    },
                    onStopSelectStart: function(e) {
                        return o.stopEvent(e),
                        !1
                    },
                    updateRender: function(e, t) {
                        var n = function e(t) {
                            S(),
                            t && u < 60 && (c && clearTimeout(c),
                            c = setTimeout(function() {
                                u++,
                                e(t)
                            }, 500))
                        }
                        ;
                        u = 0,
                        n(t)
                    }
                }
            };
            this.clear = function() {
                d.active = !1,
                d.start = null ,
                d.end = null ,
                d.range = null ,
                d.grid = null ,
                S();
                var t = v();
                return t.colLine.style.display = "none",
                t.rowLine.style.display = "none",
                d.table = null ,
                _.unbind(),
                e
            }
            ,
            this.getFragmentForCopy = function() {
                var e = null ;
                if (!d.range)
                    return e;
                var t = n.doc.createElement("table")
                  , r = n.doc.createElement("tbody");
                t.appendChild(r);
                for (var o = d.range.minY; o <= d.range.maxY; o++) {
                    for (var i = n.doc.createElement("tr"), a = d.range.minX; a <= d.range.maxX; a++) {
                        var l = d.grid[o][a];
                        if (!l.fake) {
                            var c = s.cloneCell(l.cell, !1);
                            i.children.length > 0 && i.appendChild(n.doc.createTextNode("\t")),
                            i.appendChild(c)
                        }
                    }
                    i.appendChild(n.doc.createTextNode("\n")),
                    r.appendChild(i)
                }
                return e = n.doc.createElement("div"),
                e.appendChild(t),
                e
            }
            ,
            this.getSelectedCells = function() {
                return s.getCellsByRange(d.grid, d.range)
            }
            ,
            this.getZone = function() {
                return {
                    active: d.active,
                    table: d.table,
                    start: d.start,
                    end: d.end,
                    range: d.range,
                    grid: d.grid
                }
            }
            ,
            this.isRangeActiving = function() {
                return d.start && d.active
            }
            ,
            this.isSingleCell = E,
            this.isZoneBorder = function(e) {
                var t = e.target
                  , a = e.offsetX
                  , l = e.offsetY
                  , d = o.getEventClientPos(e)
                  , c = void 0
                  , u = !1
                  , f = !1
                  , g = !1
                  , m = !1
                  , p = !1
                  , h = !!i.getParentByFilter(t, function(e) {
                    return e && 1 === e.nodeType && (e.id === r.ID.TABLE_RANGE_BORDER + "_start_dot" || e.id === r.ID.TABLE_RANGE_BORDER + "_range_dot")
                }, !0);
                h || (g = !!i.getParentByFilter(t, function(e) {
                    if (e && 1 === e.nodeType && (e.id === r.ID.TABLE_RANGE_BORDER + "_start_right" || e.id === r.ID.TABLE_RANGE_BORDER + "_range_right"))
                        return !0;
                    var t = void 0
                      , n = void 0;
                    return !(!e || 1 !== e.nodeType || !i.isTag(e, ["td", "th"])) && (t = e.offsetWidth - 4,
                    n = e.offsetWidth + 4,
                    a >= t && a <= n)
                }, !0)),
                h || g || (m = !!i.getParentByFilter(t, function(e) {
                    if (e && 1 === e.nodeType && (e.id === r.ID.TABLE_RANGE_BORDER + "_start_bottom" || e.id === r.ID.TABLE_RANGE_BORDER + "_range_bottom"))
                        return !0;
                    var t = void 0
                      , n = void 0;
                    return !(!e || 1 !== e.nodeType || !i.isTag(e, ["td", "th"])) && (t = e.offsetHeight - 4,
                    n = e.offsetHeight + 4,
                    l >= t && l <= n)
                }, !0)),
                m || h || g || (f = !!i.getParentByFilter(t, function(e) {
                    return e && 1 === e.nodeType && e.id === r.ID.TABLE_RANGE_BORDER
                }, !0));
                var v = void 0
                  , b = void 0
                  , C = void 0;
                if (!(m || h || g || f || (p = !!s.getContainerExcludeTable(t),
                p || t !== n.body))) {
                    v = n.win.getComputedStyle(t);
                    var E = i.getOffset(n.body);
                    b = parseInt(v.paddingLeft),
                    C = parseInt(v.paddingRight),
                    u = d.x - E.x <= b || d.x - E.x >= n.body.offsetWidth - C
                }
                return c = (e.target.clientWidth > 0 && e.target.clientWidth < e.offsetX || e.target.clientHeight > 0 && e.target.clientHeight < e.offsetY) && (e.target.offsetWidth >= e.offsetX || e.target.offsetHeight >= e.offsetY),
                {
                    isBodyBorder: u,
                    isBorder: f,
                    isBottom: m,
                    isContainer: p,
                    isDot: h,
                    isRight: g,
                    isScroll: c
                }
            }
            ,
            this.modify = function(t) {
                if (!d.active || !t)
                    return e;
                var n = i.getParentByTagName(t, ["table"], !0, null );
                if (!n || n !== d.table)
                    return e;
                var o = s.getCellData(d.grid, t);
                d.range = s.getRangeByCellsData(d.grid, d.start, o),
                d.end = o,
                S();
                var a = i.getParentByFilter(d.table, function(e) {
                    return i.hasClass(e, r.CLASS.TABLE_BODY)
                }, !1);
                return i.addClass(a, r.CLASS.TABLE_MOVING),
                e
            }
            ,
            this.remove = function() {
                e.clear();
                var t = v()
                  , n = void 0;
                t && (n = t.container.parentNode,
                n && n.removeChild(t.container))
            }
            ,
            this.setEnd = function(t, o) {
                o && (d.active = !0),
                e.modify(t),
                d.active = !1,
                N(),
                n.event.call(r.EVENT.ON_SELECTION_CHANGE, null );
                var a = i.getParentByFilter(d.table, function(e) {
                    return i.hasClass(e, r.CLASS.TABLE_BODY)
                }, !1);
                return i.removeClass(a, r.CLASS.TABLE_MOVING),
                e
            }
            ,
            this.setStart = function(t, n, r) {
                if (!t)
                    return e.clear(),
                    e;
                var o = i.getParentByTagName(t, ["table"], !0, null );
                if (!o)
                    return e.clear(),
                    e;
                if (o !== d.table && (e.clear(),
                C(o)),
                d.active = !0,
                d.end = null ,
                d.start = s.getCellData(d.grid, t),
                "undefined" != typeof n && "undefined" != typeof r)
                    try {
                        var a = d.grid[r][n];
                        a && a.cell === d.start.cell && (d.start = a)
                    } catch (e) {}
                return d.range = s.getRangeByCellsData(d.grid, d.start, d.start),
                S(),
                d.start.cell.scrollIntoViewIfNeeded && d.start.cell.scrollIntoViewIfNeeded(),
                _.bind(),
                e
            }
            ,
            this.setStartRange = N,
            this.startDragColLine = function(t, o) {
                var a = void 0
                  , l = void 0;
                if (t && 1 === t.nodeType && t.id === r.ID.TABLE_RANGE_BORDER + "_start_right")
                    l = d.start,
                    t = d.start.cell,
                    a = d.table;
                else if (t && 1 === t.nodeType && t.id === r.ID.TABLE_RANGE_BORDER + "_range_right")
                    l = d.grid[d.range.maxY][d.range.maxX],
                    t = l.cell,
                    a = d.table;
                else {
                    if (t = i.getParentByTagName(t, ["th", "td"], !0, null ),
                    !t)
                        return;
                    if (a = i.getParentByTagName(t, ["table"], !0, null ),
                    !a)
                        return;
                    a !== d.table && (g(),
                    e.clear()),
                    d.grid || C(a),
                    l = s.getCellData(d.grid, t)
                }
                for (var c = l.x, u = void 0; c + 1 < d.grid[l.y].length && (c++,
                u = d.grid[l.y][c],
                u.cell === t); )
                    l = u;
                var f = t.offsetLeft + t.offsetWidth
                  , p = v();
                b(p),
                p.colLine.minLeft = a.offsetLeft,
                p.colLine.startLine = f,
                p.colLine.startMouse = o,
                p.colLine.cellData = l,
                m(f);
                var h = n.doc.getSelection();
                h.empty(),
                _.bindDragLine()
            }
            ,
            this.startDragRowLine = function(t, o) {
                var a = void 0
                  , l = void 0;
                if (t && 1 === t.nodeType && t.id === r.ID.TABLE_RANGE_BORDER + "_start_bottom")
                    l = d.start,
                    t = d.start.cell,
                    a = d.table;
                else if (t && 1 === t.nodeType && t.id === r.ID.TABLE_RANGE_BORDER + "_range_bottom")
                    l = d.grid[d.range.maxY][d.range.maxX],
                    t = l.cell,
                    a = d.table;
                else {
                    if (t = i.getParentByTagName(t, ["th", "td"], !0, null ),
                    !t)
                        return;
                    if (a = i.getParentByTagName(t, ["table"], !0, null ),
                    !a)
                        return;
                    a !== d.table && (g(),
                    e.clear()),
                    d.grid || C(a),
                    l = s.getCellData(d.grid, t)
                }
                for (var c = l.y, u = void 0; c + 1 < d.grid.length && (c++,
                u = d.grid[c][l.x],
                u.cell === t); )
                    l = u;
                var f = t.offsetTop + t.offsetHeight
                  , m = v();
                b(m),
                m.rowLine.minTop = a.offsetTop,
                m.rowLine.startLine = f,
                m.rowLine.startMouse = o,
                m.rowLine.cellData = l,
                y(f);
                var p = n.doc.getSelection();
                p.empty(),
                _.bindDragLine()
            }
            ,
            this.switchCell = function(e, t) {
                if (!t || !d.start)
                    return null ;
                var n = function() {
                    t.canChangeRow && o >= 0 && o < d.grid.length && (r < 0 ? (r = d.grid[o].length - 1,
                    o -= 1) : r >= d.grid[o].length && (r = 0,
                    o += 1))
                }
                ;
                t.x = t.x ? t.x > 0 ? 1 : -1 : 0,
                t.y = t.y ? t.y > 0 ? 1 : -1 : 0;
                var r = e.x + t.x
                  , o = e.y + t.y;
                n();
                for (var i = e; o >= 0 && o < d.grid.length && r >= 0 && r < d.grid[o].length && i.cell === e.cell; )
                    i = d.grid[o][r],
                    r += t.x,
                    o += t.y,
                    n();
                return i
            }
            ,
            this.updateGrid = function() {
                var t = void 0
                  , o = void 0;
                return d.table && (d.grid && (t = d.grid[d.range.minY][d.range.minX],
                o = d.grid[d.range.maxY][d.range.maxX]),
                C(d.table),
                t = s.getCellData(d.grid, t.cell),
                o = s.getCellData(d.grid, o.cell),
                d.range = s.getRangeByCellsData(d.grid, t, o),
                d.start = s.getCellData(d.grid, d.start.cell),
                d.end && (d.end = s.getCellData(d.grid, d.end.cell))),
                n.event.call(r.EVENT.UPDATE_RENDER),
                e
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    47: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/utils")
          , i = function() {
            var e = null 
              , t = null 
              , n = null 
              , i = null 
              , a = null 
              , l = null 
              , s = null 
              , d = null ;
            this.initCore = function(r) {
                e = r,
                t = e.env,
                n = e.require.domUtils,
                i = e.require.historyUtils,
                a = e.require.rangeUtils,
                l = e.require.todoRouteForClient,
                s = e.require.todoStyle,
                d = e.require.todoUtils
            }
            ;
            var c = null 
              , u = null 
              , f = function(e, n) {
                var r = d.checkTodo(e, c);
                r && (t.readonly && m.addModifiedId(r),
                n && o.stopEvent(n))
            }
              , g = function(e) {
                if (!c.hasPermission())
                    return null ;
                var o = e.target;
                if (!n.hasClass(o, r.CLASS.TODO_CHECKBOX))
                    return null ;
                var i = d.getContainerFromChild(o)
                  , l = d.getContainerFromChild(i.parentNode);
                return l ? d.fixNewTodo(l) : d.fixNewTodo(i),
                t.readonly && m.curCheckbox ? null  : (!t.readonly || m.docLockChecked ? f(o, e) : (m.curCheckbox = o,
                c.checkDocLock("onCheckDocLock")),
                void a.setRange(i, i.children.length))
            }
              , m = {
                curCheckbox: null ,
                docLockChecked: !1,
                modifiedIdList: {},
                htmlToSave: "",
                init: function() {
                    if (t.readonly) {
                        m.modifiedIdList = {};
                        for (var e = t.body.querySelectorAll("." + r.CLASS.TODO_CHECKBOX), n = 0; n < e.length; n++) {
                            var o = e[n];
                            o.wizTodoIndex = n
                        }
                    }
                },
                addModifiedId: function(e) {
                    if (t.readonly) {
                        var n = e.checkbox
                          , r = e.checked
                          , o = m.modifiedIdList[n.wizTodoIndex];
                        "boolean" == typeof o && o !== r ? delete m.modifiedIdList[n.wizTodoIndex] : m.modifiedIdList[n.wizTodoIndex] = r
                    }
                },
                getModifiedIdList: function() {
                    var e = [];
                    for (var t in m.modifiedIdList)
                        m.modifiedIdList.hasOwnProperty(t) && e.push({
                            id: t,
                            checked: m.modifiedIdList[t]
                        });
                    return e
                },
                modifyDoc: function() {
                    var e = ""
                      , o = m.getModifiedIdList();
                    if (0 === o.length)
                        return e;
                    e = c.getOriginalDoc();
                    var i = t.doc.getElementById(r.ID.IFRAME_FOR_SAVE);
                    i || (i = t.doc.createElement("iframe"),
                    i.id = r.ID.IFRAME_FOR_SAVE,
                    t.body.appendChild(i)),
                    i.style.display = "none";
                    var a = t.doc
                      , l = t.win
                      , s = t.body
                      , u = i.contentDocument
                      , f = c.isPersonalDocument()
                      , g = void 0;
                    u.open("text/html", "replace"),
                    u.write(e),
                    u.close(),
                    t.doc = u,
                    t.win = i.contentWindow,
                    t.body = u.body,
                    d.oldPatch.fixOldTodo(),
                    d.fixNewTodo(),
                    g = t.body.querySelectorAll("." + r.CLASS.TODO_CHECKBOX);
                    for (var p = o.length - 1; p >= 0; p--) {
                        var h = o[p].id
                          , v = o[p].checked
                          , b = g[h];
                        if (b) {
                            var C = d.getMainFromChild(b);
                            d.check(C, v),
                            f || d.addUserInfo(C, v, b.id, c)
                        }
                    }
                    return d.checkTodoStyle(!0),
                    e = n.getContentHtml(),
                    t.body = s,
                    t.doc = a,
                    t.win = l,
                    t.body.removeChild(i),
                    e
                }
            }
              , p = {
                bind: function() {
                    p.unbind(),
                    t.event.add(r.EVENT.ON_SELECTION_CHANGE, p.handler.onSelectionChange),
                    t.event.add(r.EVENT.AFTER_RESTORE_HISTORY, p.handler.afterRestoreHistory),
                    t.event.add(r.EVENT.ON_EXEC_COMMAND, p.handler.onExecCommand),
                    t.event.add(r.EVENT.ON_PASTE, p.handler.onPaste),
                    t.event.add(r.EVENT.AFTER_INSERT_DOM, p.handler.afterInsertDom),
                    t.client.type.isIOS || t.client.type.isAndroid ? (t.event.add(r.EVENT.ON_TOUCH_END, p.handler.onTouchEnd),
                    t.event.add(r.EVENT.ON_TOUCH_START, p.handler.onTouchStart)) : t.event.add(r.EVENT.ON_CLICK, p.handler.onClick)
                },
                unbind: function() {
                    t.event.remove(r.EVENT.ON_CLICK, p.handler.onClick),
                    t.event.remove(r.EVENT.ON_SELECTION_CHANGE, p.handler.onSelectionChange),
                    t.event.remove(r.EVENT.ON_TOUCH_END, p.handler.onTouchEnd),
                    t.event.remove(r.EVENT.ON_TOUCH_START, p.handler.onTouchStart),
                    t.event.remove(r.EVENT.AFTER_RESTORE_HISTORY, p.handler.afterRestoreHistory)
                },
                handler: {
                    afterInsertDom: function() {
                        d.fixNewTodo(),
                        d.checkTodoStyle(!1)
                    },
                    afterRestoreHistory: function() {
                        d.checkTodoStyle(!1),
                        d.fixNewTodo(),
                        s.restoreUserAvatarStyle()
                    },
                    onCheckDocLock: function(e, t) {
                        m.docLockChecked = !t,
                        e || f(m.curCheckbox),
                        m.curCheckbox = null 
                    },
                    onClick: function(e) {
                        g(e)
                    },
                    onExecCommand: function() {
                        var e = a.getRange()
                          , t = void 0
                          , o = void 0;
                        if (e && (t = e.collapsed ? e.startContainer : n.getParentRoot([e.startContainer, e.endContainer]),
                        t = n.getBlockParent(t, !0))) {
                            o = t.querySelectorAll("." + r.CLASS.TODO_CHECKBOX);
                            for (var i = 0, l = o.length; i < l; i++)
                                d.fixCheckbox(o[i], !1)
                        }
                    },
                    onKeyDown: function(e) {
                        if (!c.hasPermission())
                            return !0;
                        var l = a.getRange();
                        if (!l)
                            return !0;
                        var s = e.keyCode || e.which
                          , u = void 0
                          , f = void 0
                          , g = void 0
                          , m = void 0
                          , p = void 0
                          , h = void 0
                          , v = void 0
                          , b = void 0
                          , C = void 0
                          , E = void 0
                          , T = void 0
                          , S = void 0
                          , y = void 0
                          , A = void 0
                          , N = void 0
                          , _ = void 0
                          , O = void 0;
                        if (!l.collapsed) {
                            if (8 !== s && 46 !== s && o.checkNonTxtKey(e))
                                return !0;
                            if (O = a.getRangeDomList({
                                noSplit: !0
                            }),
                            O && O.list.length > 0) {
                                i.saveSnap(!1),
                                g = l.endContainer,
                                m = l.endOffset,
                                3 !== g.nodeType && (l.endOffset === g.childNodes.length ? (g = n.getLastDeepChild(g),
                                m = n.getEndOffset(g)) : (g = g.childNodes[l.endOffset],
                                m = 0)),
                                E = d.getContainerFromChild(g);
                                for (var D = O.list.length - 1; D >= 0; D--)
                                    _ = O.list[D],
                                    d.isCheckbox(_) && (C = d.getContainerFromChild(_),
                                    b = d.getMainFromChild(_),
                                    b && (v = b.parentNode,
                                    d.cancelTodo(v, !0)),
                                    E && C === E && (g.parentNode || (g = v,
                                    m = n.getEndOffset(g)),
                                    a.setRange(l.startContainer, l.startOffset, g, m)));
                                return !0
                            }
                            l.collapse(!0)
                        }
                        if (p = d.isCaretAfterCheckbox(),
                        h = d.getMainByCaret(),
                        v = h ? n.getBlockParent(h, !1) : d.getContainerFromChild(l.startContainer),
                        T = n.getEndOffset(l.endContainer) === l.endOffset,
                        !v || h || d.getCheckbox(v) || (n.removeClass(v, r.CLASS.TODO_LAYER),
                        v = null ),
                        !v && !T && 13 !== s)
                            return !0;
                        if (8 === s && p)
                            return i.saveSnap(!1),
                            d.cancelTodo(v),
                            o.stopEvent(e),
                            !1;
                        if (46 === s && (i.saveSnap(!1),
                        u = l.startContainer,
                        f = l.startOffset,
                        a.selectCharIncludeFillChar(),
                        l = a.getRange(),
                        g = l.endContainer,
                        b = d.getMainFromChild(g) || d.getMainInDom(g),
                        a.setRange(u, f),
                        b && b !== h))
                            return d.cancelTodo(b.parentNode, !0),
                            !1;
                        if (37 === s && p && (_ = n.getPreviousNode(v)))
                            return a.setRange(_, n.getEndOffset(_)),
                            o.stopEvent(e),
                            !1;
                        if (!v || 13 !== s || e.shiftKey)
                            return !0;
                        if (i.saveSnap(!1),
                        d.isEmptyContainer(v))
                            return n.getParentByTagName(v, ["blockquote", "ul", "ol"]) ? t.event.call(r.EVENT.EXEC_COMMEND, "outdent", !1) : (v.innerHTML = "<br>",
                            n.removeClass(v, r.CLASS.TODO_LAYER),
                            a.setRange(v, 1)),
                            o.stopEvent(e),
                            !1;
                        l.deleteContents(),
                        d.fixNewTodo(v);
                        var L = !1
                          , w = d.getUserInfoInDom(v)
                          , I = void 0;
                        w ? (I = n.getPreviousNode(w, !1, v),
                        l.startContainer === w && l.startOffset !== n.getEndOffset(w) ? L = !0 : d.getUserInfoFromChild(l.startContainer) && (L = !0)) : I = v,
                        l.setEndAfter(L ? v : I);
                        var x = l.cloneContents()
                          , R = t.doc.createElement("div");
                        for (x.appendChild(R); x.childNodes.length > 1; )
                            R.appendChild(x.firstChild);
                        S = n.isEmptyDom(R);
                        var M = void 0;
                        if (S)
                            A = d.cloneTodo(v),
                            n.after(A, v),
                            d.setTodo(A, c),
                            h = d.getMainInDom(A),
                            _ = n.getLastDeepChild(A),
                            3 === _.nodeType ? _.nodeValue = r.FILL_CHAR + r.FILL_CHAR : (_.appendChild(t.doc.createTextNode(r.FILL_CHAR + r.FILL_CHAR)),
                            _ = _.childNodes[0]),
                            a.setRange(_, 1);
                        else {
                            M = l.extractContents(),
                            N = [];
                            for (var k = 0; k < M.childNodes.length; k++)
                                N.push(M.childNodes[k]);
                            y = v !== t.body && n.isBlock(v) ? v.tagName : "div",
                            A = t.doc.createElement(y),
                            n.after(A, v),
                            h = d.setTodo(A, c),
                            d.insertToMain(N, h);
                            for (var P = 0; P < N.length; P++)
                                d.clearBlock(N[P]);
                            a.setRange(h, 1)
                        }
                        o.stopEvent(e);
                        var B = n.getPageScroll();
                        if (h.getBoundingClientRect().top + h.clientHeight > t.doc.documentElement.clientHeight || h.getBoundingClientRect().top + h.clientHeight < 0) {
                            var U = h.getBoundingClientRect().left + B.left
                              , z = B.top + h.clientHeight;
                            window.scrollTo(U, z)
                        }
                    },
                    onPaste: function() {
                        setTimeout(function() {
                            p.handler.afterInsertDom()
                        }, 300)
                    },
                    onSelectionChange: function() {
                        var e = a.getRange();
                        if (e) {
                            var t = void 0
                              , r = void 0
                              , o = void 0;
                            e.collapsed || (r = e.endContainer,
                            o = e.endOffset);
                            var i = d.isCaretBeforeCheckbox();
                            i.enable && (t = i.checkbox,
                            t && t.nextSibling ? (r = t.nextSibling,
                            o = 0) : t && (r = t.parentNode,
                            o = n.getIndex(t) + 1),
                            e.collapsed ? a.setRange(r, o) : a.setRange(e.startContainer, e.startOffset, r, o))
                        }
                    },
                    onTouchEnd: function(e) {
                        e.target === u && (u = null ,
                        g(e))
                    },
                    onTouchStart: function(e) {
                        u = e.target
                    }
                }
            };
            this.init = function() {}
            ,
            this.on = function() {
                d.oldPatch.fixOldTodo(),
                d.fixNewTodo(),
                m.init(),
                p.bind(),
                c || (c = l.getRoute()),
                d.checkTodoStyle(!0)
            }
            ,
            this.off = function() {
                p.unbind()
            }
            ,
            this.checkTodoStyle = function() {
                d.checkTodoStyle(!1)
            }
            ,
            this.closeDocument = function() {
                var e = void 0;
                return c || (c = l.getRoute()),
                e = t.client.type.isWin && t.options.pc.pluginModified ? n.getContentHtml() : m.modifyDoc(),
                !e || t.client.type.isIOS || t.client.type.isMac || c.saveDoc(e, ""),
                c.beforeCloseDoc && c.beforeCloseDoc(),
                m.init(),
                e
            }
            ,
            this.onCheckDocLock = p.handler.onCheckDocLock,
            this.onKeyDown = p.handler.onKeyDown,
            this.setTodo = function() {
                i.saveSnap(!1),
                d.setTodo(null , c)
            }
            ,
            this.setTodoInfo = function(e) {
                c.setTodoInfo && c.setTodoInfo(e)
            }
        }
        ;
        t.exports = i
    }
    , {
        "../../config/const": 51,
        "../../libs/utils": 59
    }],
    48: [function(e, t, n) {
        "use strict";
        var r = e("../../libs/base64")
          , o = function() {
            var e = null 
              , t = null ;
            this.initCore = function(n) {
                e = n,
                t = e.env
            }
            ;
            var n = void 0
              , o = void 0
              , i = void 0
              , a = function() {
                n = t.win.external;
                var e = function() {
                    try {
                        return n.UserAlias
                    } catch (e) {
                        return console.error(e),
                        ""
                    }
                }
                  , r = function(e) {
                    try {
                        return n.GetUserAvatarFileName(e)
                    } catch (e) {
                        return console.error(e),
                        ""
                    }
                }
                  , o = function() {
                    try {
                        return n.GetUserGUID()
                    } catch (e) {
                        return console.error(e),
                        ""
                    }
                }
                  , i = function() {
                    try {
                        return !t.readonly || n.WizDocument.CanEdit
                    } catch (e) {
                        return console.error(e),
                        !1
                    }
                }
                  , a = function() {
                    try {
                        return n.WizDocument.IsPersonalDocument()
                    } catch (e) {
                        return console.error(e),
                        !1
                    }
                }
                  , l = function(e) {
                    n.WizDocument && (n.WizDocument.Type = e)
                }
                  , s = function(e) {
                    if (a())
                        return void WizReader.todo[e](!1, !1);
                    try {
                        n.ExecuteCommand("OnClickingChecklist", "WizReader.todo." + e + "({cancel}, {needCallAgain});", "readingnote")
                    } catch (e) {
                        console.error(e)
                    }
                }
                  , d = function() {
                    try {
                        return n.WizDocument.GetHtml()
                    } catch (e) {
                        return console.error(e),
                        ""
                    }
                }
                  , c = function(e, t) {
                    try {
                        n.WizDocument.SetHtml2(e, t)
                    } catch (e) {
                        console.error(e)
                    }
                }
                ;
                this.getUserAlias = e,
                this.getUserGuid = o,
                this.getUserAvatarFileName = r,
                this.hasPermission = i,
                this.isPersonalDocument = a,
                this.setDocumentType = l,
                this.checkDocLock = s,
                this.getOriginalDoc = d,
                this.saveDoc = c
            }
              , l = function() {
                var e = function() {
                    return "zzz"
                }
                  , n = function() {
                    return "/wizas/a/users/avatar/63272832-e387-4d31-85c6-7549555f2231?default=true"
                }
                  , r = function() {
                    return "63272832-e387-4d31-85c6-7549555f2231"
                }
                  , o = function() {
                    return !0
                }
                  , i = function() {
                    return !1
                }
                  , a = function(e) {}
                  , l = function(e) {
                    setTimeout(function() {
                        WizReader.todo.onCheckDocLock(!1, !1)
                    }, 500)
                }
                  , s = function() {
                    return t.body.outerHTML
                }
                  , d = function(e, t) {
                    console.log("saveDoc")
                }
                ;
                this.getUserAlias = e,
                this.getUserAvatarFileName = n,
                this.getUserGuid = r,
                this.hasPermission = o,
                this.isPersonalDocument = i,
                this.setDocumentType = a,
                this.checkDocLock = l,
                this.getOriginalDoc = s,
                this.saveDoc = d
            }
              , s = function() {
                o = t.win.WizQtEditor;
                var e = function() {
                    return o.userAlias
                }
                  , n = function(e) {
                    return o.userAvatarFilePath
                }
                  , r = function() {
                    return o.userGuid
                }
                  , i = function() {
                    return !t.readonly || o.hasEditPermissionOnCurrentNote
                }
                  , a = function() {
                    return o.isPersonalDocument
                }
                  , l = function(e) {
                    o.changeCurrentDocumentType(e)
                }
                  , s = function(e, t) {}
                  , d = function(e) {
                    return o.clickingTodoCallBack.connect(WizReader.todo[e]),
                    o.checkListClickable()
                }
                  , c = function() {
                    return o.currentNoteHtml
                }
                ;
                this.getUserAlias = e,
                this.getUserAvatarFileName = n,
                this.getUserGuid = r,
                this.hasPermission = i,
                this.isPersonalDocument = a,
                this.setDocumentType = l,
                this.checkDocLock = d,
                this.getOriginalDoc = c,
                this.saveDoc = s
            }
              , d = function() {
                i = t.win.WizNote;
                var e = function() {
                    return i.getUserAlias()
                }
                  , n = function(e) {
                    return i.getUserAvatarFileName(e)
                }
                  , r = function() {
                    return i.getUserGuid()
                }
                  , o = function() {
                    return !t.readonly || i.hasPermission()
                }
                  , a = function() {
                    return i.isPersonalDocument()
                }
                  , l = function(e) {
                    i.setDocumentType(e)
                }
                  , s = function() {
                    i.onWizTodoReadCheckedClose()
                }
                  , d = function(e) {
                    i.checkDocLock()
                }
                  , c = function() {
                    return i.getDocHtml()
                }
                  , u = function(e, t) {
                    i.setDocHtml(e, t)
                }
                ;
                this.getUserAlias = e,
                this.getUserAvatarFileName = n,
                this.getUserGuid = r,
                this.hasPermission = o,
                this.isPersonalDocument = a,
                this.setDocumentType = l,
                this.beforeCloseDoc = s,
                this.checkDocLock = d,
                this.getOriginalDoc = c,
                this.saveDoc = u
            }
              , c = function() {
                var e = this
                  , n = function() {
                    return e.userAlias
                }
                  , o = function(t) {
                    return e.avatarFileName
                }
                  , i = function() {
                    return e.userGuid
                }
                  , a = function() {
                    return !t.readonly || e._hasPermission
                }
                  , l = function() {
                    return e.personalDocument
                }
                  , s = function(e) {
                    t.win.location.href = "wiztodolist://setDocumentType/?type=" + e
                }
                  , d = function(t) {
                    e.userAlias = t.alias,
                    e.userGuid = t.userGuid,
                    e.avatarFileName = t.avatar,
                    e.personalDocument = "true" === t.isPersonal,
                    e._hasPermission = "true" === t.hasPermission,
                    e.originalHtml = r.decode(t.docHtml)
                }
                  , c = function(e) {
                    t.win.location.href = "wiztodolist://tryLockDocument/?callback=" + e
                }
                  , u = function() {
                    return e.originalHtml
                }
                ;
                this.getUserAlias = n,
                this.getUserAvatarFileName = o,
                this.getUserGuid = i,
                this.hasPermission = a,
                this.isPersonalDocument = l,
                this.setDocumentType = s,
                this.setTodoInfo = d,
                this.checkDocLock = c,
                this.getOriginalDoc = u,
                this.userAlias = "",
                this.userGuid = "",
                this.avatarFileName = "",
                this.personalDocument = !1,
                this._hasPermission = !1,
                this.originalHtml = ""
            }
            ;
            this.getRoute = function() {
                var e = null ;
                return e = t.client.type.isWin ? new a : t.client.type.isMac ? new s : t.client.type.isIOS ? new c : t.client.type.isAndroid ? new d : new l
            }
            ,
            this.setQtEditor = function() {
                o = t.win.WizQtEditor
            }
        }
        ;
        t.exports = o
    }
    , {
        "../../libs/base64": 56
    }],
    49: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = {
            todoChecked: "data:text/xml;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUYxRkNCNDRFNUYzMTFFN0I3MjU4OUZFNDhFRjQzMjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUYxRkNCNDVFNUYzMTFFN0I3MjU4OUZFNDhFRjQzMjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RjFGQ0I0MkU1RjMxMUU3QjcyNTg5RkU0OEVGNDMyNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RjFGQ0I0M0U1RjMxMUU3QjcyNTg5RkU0OEVGNDMyNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoB3J04AAAJhSURBVHja7JjLK0RRHMdnhFiM55RsFJGFrcSOGguDaHZCSRY2Q7PwiAUlj1gMCkvF2FDKZpLXSh7xB1jMf6AmY5RSGt9Tv6vjdO5j7twzzcKvPt07v+ae873n/B5nxp1KpVy5ZHmuHLOcE5QvOqLR6O99KNmZLR2rYFYqiKwBrIU9lz5cSzKYiAXoCF7swGCHdsC47grBGsEDKHPgzUMGYgrAPhjkfBsyQSsk5gtMgQgGjTu8RUXgGPRyviMwIxPko+s0hGwriBcPOAMdnO8GjLItlgnSYuZQgZhKljeghfM9gwDtiG5QM3N6m6rBJWjifDHgBwmjoFZhteAK1HG+V9BF17QL4wII2yykbEVuBTEfFNAx08KoI2aR7mvAEPi0KKYZnFPsaMZipQ882m0dVdw9C75r4LXwXDtlT6VQKEfJb7uXBYUB2sAdqDd4poeyySP456jeZNRcv2llYkJruQetku8PgFNQLPjXWTviHWhNbrvdPkEZkeB8Xlq5AOdjPSlCbcElVOFZybjhTI4fMZr8m/OxVTgBk6zsg13JmL9VWFidZXou7SwTBw/SxPxLbep8/4mvwpJ4cuSAtkdYWdFuYZuVnRiDRqmrV4VVCpJlnmZJvSqs+kwtyzwWK/16VTgbh3w+80yrsK1Dvg3TMq/UrApnS5DLYtZZMrf4yxU/gzSHW/EZ6c88fr/fNIYqFIqpSCeo3+k6rFDQGHdQMxV0xXXnCVDuoJByGnOJPl9YETQP3kAh2KLDfsoh4jRmIc0xb0XQC51zTqnqOm1JGruV5jLOsv+/Y/4FpWk/AgwACweeMaBPu0MAAAAASUVORK5CYII=",
            todoUnChecked: "data:text/xml;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjlFNzg2NjRFNUYzMTFFN0IyNkY5NzZGNEEyNTU3NEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjlFNzg2NjVFNUYzMTFFN0IyNkY5NzZGNEEyNTU3NEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCOUU3ODY2MkU1RjMxMUU3QjI2Rjk3NkY0QTI1NTc0RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCOUU3ODY2M0U1RjMxMUU3QjI2Rjk3NkY0QTI1NTc0RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PohRJcgAAAEHSURBVHja7JgxCsJAEEWNSEAQ0XgG8QrWIhYp7e2stRMhpRDETltLe8sU4gE8guIdokQrm/UHvoUWZsVdEJmBx5AUMy87m5DEUUrlfinyuR8LEcqKwuuJKIrSVAdT0AZlwz0TsAVjcPR9/70QogF2oGJpEdIL7IIWaIJD1shCytzAENSAYwiPNW/sEWaOjGNKYwQWhlfnxJpFbomOzqZ+7JmVxb27ZC59cpfFFoVieQ6JkAiJkAiJkAiJkAj9gZBnsa/3iVDC3LMo1Ge+6ghtmWdgAKoGRaqsOeHxRkcoAGfggjlfyJUhYtZ02SPQEdrzi3INLhbGdWHtJns9hSP/h0Toy7gLMABy5T6ChFra5QAAAABJRU5ErkJggg=="
        }
          , i = {
            common: "." + r.CLASS.TODO_MAIN + " {padding-left: 12px;line-height:30px;}li > ." + r.CLASS.TODO_MAIN + " {padding-left: 0}." + r.CLASS.TODO_CHECKED + " {color: #666;}." + r.CLASS.TODO_UNCHECKED + " {text-decoration: initial;}." + r.CLASS.TODO_CHECKED + " ." + r.CLASS.TODO_CHECKBOX + " {background-image:url(" + o.todoChecked + ")}." + r.CLASS.TODO_UNCHECKED + " ." + r.CLASS.TODO_CHECKBOX + " {background-image:url(" + o.todoUnChecked + ")}." + r.CLASS.TODO_CHECKBOX + " {border-radius:0;position:relative;top:-1px;vertical-align:middle;border:0;background-color:transparent;outline:none;width:18px !important; height:18px !important; cursor:default; padding:0px 10px 0px 5px;-webkit-user-select: none;background-size:18px;background-repeat:no-repeat;background-position:5px;box-sizing:initial;}." + r.CLASS.TODO_AVATAR + " {border:0;background-color:transparent;outline:none;width:20px !important; height: 20px !important; vertical-align: -20%; padding:0; margin:0 10px 0 0; border-radius:100%;background-size:20px;background-repeat:no-repeat;}." + r.CLASS.TODO_USER_INFO + " {padding-left: 20px;}input." + r.CLASS.TODO_AVATAR + " {position:relative;top:-4px;}." + r.CLASS.TODO_ACCOUNT + ", ." + r.CLASS.TODO_DATE + " { color: #666; }"
        }
          , a = function() {
            var e = this
              , t = null 
              , n = null 
              , a = null 
              , l = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                a = t.require.domUtils,
                l = t.require.wizStyle
            }
            ;
            var s = {}
              , d = function(e) {
                var t = new RegExp("^" + r.ID.TODO_AVATAR_STYLE + "(.*)$","i");
                return e.replace(t, "$1")
            }
            ;
            this.insertTodoStyle = function(t) {
                e.removeTodoOldStyle();
                var s = n.doc.getElementById(r.ID.TODO_STYLE);
                !t && s || l.replaceStyleById(r.ID.TODO_STYLE, i.common, !1),
                e.removeUnUsedTodoStyle();
                var d = "wiz_todo_checkbox_img_preview";
                if (n.client.type.isIOS && !n.body.querySelector("#" + d)) {
                    var c = n.doc.createElement(r.TAG.TMP_TAG)
                      , u = n.doc.createElement("img")
                      , f = n.doc.createElement("img");
                    u.src = o.todoChecked,
                    f.src = o.todoUnChecked,
                    c.setAttribute("contenteditable", "false"),
                    a.css(c, {
                        width: 0,
                        height: 0,
                        opacity: 0,
                        overflow: "hidden",
                        display: "inline-block"
                    }),
                    c.id = d,
                    c.appendChild(u),
                    c.appendChild(f),
                    n.doc.body.appendChild(c)
                }
            }
            ,
            this.removeTodoOldStyle = function() {
                l.removeStyleById(r.ID.TODO_STYLE_OLD)
            }
            ,
            this.removeTodoStyle = function() {
                e.removeTodoOldStyle();
                var t = n.doc.getElementById(r.ID.TODO_STYLE);
                a.remove(t);
                for (var o = n.doc.querySelectorAll("style"), i = o.length - 1; i >= 0; i--)
                    if (t = o[i],
                    t.id && 0 === t.id.indexOf(r.ID.TODO_AVATAR_STYLE)) {
                        var l = d(t.id);
                        s[l] = t.innerHTML,
                        a.remove(t)
                    }
            }
            ,
            this.removeUnUsedTodoStyle = function(e) {
                var t = n.doc.querySelectorAll("style")
                  , o = void 0
                  , i = void 0
                  , l = void 0
                  , c = void 0;
                if (e)
                    return i = r.ID.TODO_AVATAR_STYLE + e,
                    l = r.CLASS.TODO_USER_AVATAR + e,
                    c = n.doc.querySelector("." + l),
                    o = n.doc.getElementById(i),
                    void (o && !c && (s[e] = o.innerHTML,
                    a.remove(o)));
                for (var u = t.length - 1; u >= 0; u--)
                    o = t[u],
                    i = o.id,
                    i && 0 === i.indexOf(r.ID.TODO_AVATAR_STYLE) && (e = d(i),
                    n.body.querySelector("." + r.CLASS.TODO_USER_AVATAR + e) || (s[e] = o.innerHTML,
                    a.remove(o)))
            }
            ,
            this.restoreUserAvatarStyle = function() {
                for (var e in s)
                    if (s.hasOwnProperty(e)) {
                        var t = r.ID.TODO_AVATAR_STYLE + e;
                        !n.doc.querySelector("#" + t) && n.body.querySelector("." + r.CLASS.TODO_USER_AVATAR + e) && l.replaceStyleById(t, s[e], !1)
                    }
            }
        }
        ;
        t.exports = a
    }
    , {
        "../../config/const": 51
    }],
    50: [function(e, t, n) {
        "use strict";
        var r = e("../../config/const")
          , o = e("../../libs/base64")
          , i = e("../../libs/utils")
          , a = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          , l = function() {
            var e = this
              , t = null 
              , n = null 
              , l = null 
              , s = null 
              , d = null 
              , c = null 
              , u = null 
              , f = null ;
            this.initCore = function(e) {
                t = e,
                n = t.env,
                l = t.lang,
                s = t.require.domUtils,
                d = t.require.historyUtils,
                c = t.require.rangeUtils,
                u = t.require.todoStyle,
                f = t.require.wizStyle
            }
            ,
            this.addUserInfo = function(t, o, i, a) {
                if (t) {
                    var l = void 0
                      , d = void 0
                      , f = void 0
                      , g = void 0
                      , m = void 0
                      , p = void 0
                      , h = void 0;
                    if (l = e.deleteUserInfo(t.parentNode),
                    !o)
                        return void u.removeUnUsedTodoStyle(l);
                    l = a.getUserGuid(),
                    d = a.getUserAlias(),
                    f = a.getUserAvatarFileName(r.CSS.TODO_LIST.IMG_WIDTH),
                    g = e.getTime(),
                    e.setUserAvatarStyle(l, f),
                    m = e.getUserInfoHtml(l, d, g),
                    p = n.doc.createElement("span"),
                    s.addClass(p, r.CLASS.TODO_USER_INFO),
                    p.innerHTML = m,
                    p.setAttribute(r.ATTR.TODO_ID, i);
                    for (var v = t.childNodes.length - 1; v >= 0; v--) {
                        var b = t.childNodes[v];
                        s.isTag(b, "br") && t.removeChild(b)
                    }
                    for (h = t.nextElementSibling; h; ) {
                        if (e.isMain(h)) {
                            t.parentElement.insertBefore(p, h);
                            break
                        }
                        if (s.isTag(h, "br")) {
                            t.parentElement.insertBefore(p, h);
                            break
                        }
                        h = h.nextElementSibling
                    }
                    h || t.parentElement.appendChild(p),
                    p.hasChildNodes() || p.appendChild(n.doc.createElement("br")),
                    c.setRange(p, p.childNodes.length)
                }
            }
            ,
            this.canBeContainer = function(e) {
                return !s.isTag(e, ["body", "blockquote", "td", "th"]) && s.isBlock(e)
            }
            ,
            this.canCreateTodo = function() {
                var e = c.getRange();
                if (!e)
                    return !1;
                if (s.getParentByClass(e.startContainer, r.CLASS.CODE_CONTAINER, !0))
                    return !1;
                var t = c.getRangeDomList({
                    noSplit: !0
                })
                  , o = s.getBlockParent(t.startDom, !0) || n.body
                  , i = null ;
                if (e.collapsed || t.endDom === t.startDom)
                    e.collapsed && o === n.body && (o = n.body.childNodes[0]);
                else if (i = s.getBlockParent(t.endDom, !0) || n.body,
                i !== o)
                    return !1;
                return {
                    rangeList: t,
                    start: o,
                    end: i
                }
            }
            ,
            this.cancelTodo = function(t, o) {
                if (t) {
                    var i = c.getRange()
                      , a = void 0
                      , l = void 0
                      , d = void 0
                      , f = void 0
                      , g = void 0;
                    a = i ? i.startContainer : null ,
                    l = i ? i.startOffset : 0,
                    d = e.getMainInDom(t),
                    g = e.deleteUserInfo(t),
                    u.removeUnUsedTodoStyle(g),
                    f = e.deleteMain(d),
                    f = f ? f.start : null ,
                    s.removeClass(t, r.CLASS.TODO_LAYER),
                    s.removeClass(t, r.CLASS.TODO_CHECKED),
                    s.removeClass(t, r.CLASS.TODO_UNCHECKED),
                    f && !s.isEmptyDom(t) || t.querySelector("br") || (f = n.doc.createElement("br"),
                    t.appendChild(f)),
                    o || (a && a.parentNode || (a = f,
                    l = 0),
                    c.setRange(a, l)),
                    e.checkTodoStyle(!1)
                }
            }
            ,
            this.check = function(t, n) {
                var o = e.getContainerFromChild(t);
                n ? (s.removeClass(o, r.CLASS.TODO_UNCHECKED),
                s.addClass(o, r.CLASS.TODO_CHECKED)) : (s.removeClass(o, r.CLASS.TODO_CHECKED),
                s.addClass(o, r.CLASS.TODO_UNCHECKED));
                var i = e.getCheckbox(t)
                  , a = n ? "checked" : "unchecked";
                i.setAttribute(r.ATTR.TODO_CHECK, a)
            }
            ,
            this.checkTodo = function(t, n) {
                var o = {
                    checkbox: null ,
                    checked: !1
                };
                d.saveSnap(!1);
                var i = e.getMainFromChild(t)
                  , a = void 0;
                return i && i.children[0] === t || e.fixCheckbox(t, !1),
                a = "checked" !== t.getAttribute(r.ATTR.TODO_CHECK),
                e.check(i, a),
                o.checkbox = t,
                o.checked = a,
                n.isPersonalDocument() || e.addUserInfo(i, a, t.id, n),
                o
            }
            ,
            this.checkTodoStyle = function(e) {
                var t = n.doc.querySelector("." + r.CLASS.TODO_CHECKBOX);
                t ? u.insertTodoStyle(e) : u.removeTodoStyle()
            }
            ,
            this.clearBlock = function(t) {
                if (!t || 1 !== t.nodeType && 3 !== t.nodeType && 11 !== t.nodeType)
                    return !1;
                for (var n = 0; n < t.childNodes.length; n++) {
                    var r = t.childNodes[n];
                    e.clearBlock(r) && r !== t.childNodes[n] && n--
                }
                var o = 11 === t.nodeType
                  , i = !o && e.isTodoTag(t)
                  , a = !o && s.isBlock(t);
                if (a && s.isEmptyDom(t)) {
                    if (!(t.children.length > 0))
                        return s.remove(t),
                        !0;
                    s.peelDom(t)
                } else
                    (a || i) && s.peelDom(t);
                return !1
            }
            ,
            this.clearTodoClass = function(e) {
                e && s.removeClass(e, [r.CLASS.TODO_ACCOUNT, r.CLASS.TODO_AVATAR, r.CLASS.TODO_DATE, r.CLASS.TODO_LAYER, r.CLASS.TODO_MAIN, r.CLASS.TODO_CHECKED, r.CLASS.TODO_UNCHECKED, r.CLASS.TODO_USER_INFO])
            }
            ,
            this.cloneTodo = function(t) {
                if (!t)
                    return null ;
                var o = void 0
                  , i = void 0
                  , a = void 0
                  , l = void 0;
                if (o = s.clone(t, !0),
                a = e.getMainInDom(t),
                !a)
                    return null ;
                s.removeClass(o, r.CLASS.TODO_CHECKED),
                s.addClass(o, r.CLASS.TODO_UNCHECKED);
                for (var d = t, c = o; d && d.childNodes && d.childNodes.length; ) {
                    for (l = d.childNodes[d.childNodes.length - 1]; l && (3 === l.nodeType && 0 === l.nodeValue.replace(r.FILL_CHAR_REG, "").length || s.isBlock(l) || s.isSelfClosingTag(l)); )
                        l = l.previousSibling;
                    !l || e.isCheckbox(l) ? (i = n.doc.createTextNode(""),
                    l = null ) : i = s.clone(l, !0),
                    c.appendChild(i),
                    c = i,
                    d = l
                }
                return o
            }
            ,
            this.deleteMain = function(t) {
                return s.peelDom(t, function(t) {
                    return !e.isMain(t) && !e.isCheckbox(t)
                })
            }
            ,
            this.deleteUserInfo = function(t) {
                var n = ""
                  , o = e.getMainInDom(t)
                  , i = t.querySelector("." + r.CLASS.TODO_AVATAR)
                  , a = i ? i.className : ""
                  , l = new RegExp("^(.*" + r.CLASS.TODO_USER_AVATAR + ")([^ ]*)(.*)$","i");
                a.indexOf(r.CLASS.TODO_USER_AVATAR) > -1 && (n = a.replace(l, "$2"));
                for (var s = o ? o.nextElementSibling : t.firstChild; s && !e.isMain(s); )
                    if (e.isUserInfo(s)) {
                        var d = s;
                        s = s.nextElementSibling,
                        t.removeChild(d)
                    } else
                        s = s.nextElementSibling;
                return n
            }
            ,
            this.fixCheckbox = function(t, o) {
                if (t) {
                    if (t.id || (t.id = e.getCheckId()),
                    s.attr(t, {
                        style: null 
                    }),
                    s.isTag(t, "input")) {
                        var i = n.doc.createElement("img");
                        i.id = t.id,
                        i.className = t.className,
                        i.src = a,
                        i.setAttribute(r.ATTR.TODO_CHECK, t.getAttribute(r.ATTR.TODO_CHECK)),
                        s.before(i, t),
                        s.remove(t),
                        t = i
                    }
                    if (o || !e.getMainFromChild(t)) {
                        var l = s.getBlockParent(t)
                          , d = e.canBeContainer(l)
                          , c = n.doc.createElement("span")
                          , u = void 0
                          , f = void 0
                          , g = void 0
                          , m = !1
                          , p = void 0;
                        for (c.className = (o ? r.CLASS.TODO_LABEL_OLD : r.CLASS.TODO_MAIN) + " " + r.CLASS.TODO_UNCHECKED,
                        u = n.doc.createElement(d ? l.tagName : "div"),
                        d ? s.after(u, l) : s.before(u, t),
                        u.appendChild(c),
                        f = t; f; ) {
                            if (g = f.nextSibling,
                            s.isBlock(f)) {
                                if (!d)
                                    break;
                                m = !0,
                                p = u.nextSibling
                            }
                            m ? s.before(f, p) : e.isUserInfo(f) ? s.after(f, c) : c.appendChild(f),
                            f = g
                        }
                        s.addClass(u, r.CLASS.TODO_LAYER);
                        var h = e.getContainerFromChild(u.parentNode);
                        h && s.removeClass(h, r.CLASS.TODO_LAYER),
                        d && s.isEmptyDom(l) && s.remove(l)
                    }
                }
            }
            ,
            this.fixMain = function(t) {
                if (t) {
                    var n = s.getLastDeepChild(t)
                      , o = e.getCheckbox(t)
                      , i = void 0
                      , a = void 0;
                    if (o || s.removeClass(t, r.CLASS.TODO_MAIN),
                    s.attr(t, {
                        style: null 
                    }),
                    i = e.getContainerFromChild(t),
                    i && i !== t && i !== t.parentNode)
                        try {
                            i.appendChild(t)
                        } catch (e) {
                            console.error(e)
                        }
                    s.hasClass(t, r.CLASS.TODO_CHECKED) ? (s.addClass(i, r.CLASS.TODO_CHECKED),
                    s.removeClass(t, r.CLASS.TODO_CHECKED)) : s.hasClass(t, r.CLASS.TODO_UNCHECKED) && (s.addClass(i, r.CLASS.TODO_UNCHECKED),
                    s.removeClass(t, r.CLASS.TODO_UNCHECKED));
                    var l = t.querySelectorAll("." + r.CLASS.TODO_MAIN);
                    for (a = l.length - 1; a >= 0; a--)
                        s.after(l[a], t);
                    if (s.isEmptyDom(t) && t.parentNode && s.remove(t),
                    n !== o && (1 !== n.nodeType && 3 !== n.nodeType || 1 === n.nodeType && s.isTag(n, "br"))) {
                        for (i = n.parentNode; i !== t && 1 === i.childNodes.length; )
                            n = i,
                            i = i.parentNode;
                        s.remove(n),
                        e.fixMain(t)
                    }
                }
            }
            ,
            this.fixNewTodo = function(t) {
                var o = void 0
                  , i = void 0
                  , a = void 0
                  , l = void 0
                  , d = void 0
                  , c = void 0
                  , u = void 0
                  , f = void 0
                  , g = void 0
                  , m = void 0
                  , p = void 0
                  , h = void 0;
                o = t ? t : n.doc;
                var v = function(t) {
                    return s.isEmptyDom(t) ? void s.remove(t) : (f = e.getCheckbox(t),
                    void (f || s.removeClass(a, r.CLASS.TODO_LAYER)))
                }
                ;
                i = o.querySelectorAll("." + r.CLASS.TODO_LAYER);
                for (var b = 0; b < i.length; b++) {
                    var C = i[b];
                    if (s.attr(C, {
                        style: null 
                    }),
                    v(C),
                    l = C.querySelectorAll("." + r.CLASS.TODO_LAYER),
                    0 !== l.length && (d = l[0],
                    c = d.parentNode,
                    m = e.isTodoTag(c) || e.isLayer(c) ? d : c,
                    p = C,
                    p !== m)) {
                        for (; h = m.nextSibling; )
                            s.after(h, p),
                            p = h;
                        s.after(m, C),
                        v(C)
                    }
                }
                g = o.querySelectorAll("." + r.CLASS.TODO_MAIN);
                for (var E = 0; E < g.length; E++) {
                    var T = g[E];
                    e.fixMain(T)
                }
                u = o.querySelectorAll("." + r.CLASS.TODO_CHECKBOX);
                for (var S = 0; S < u.length; S++)
                    f = u[S],
                    e.fixCheckbox(f, !1);
                if (t) {
                    var y = s.getLastDeepChild(o);
                    s.isTag(y, "br") && s.remove(y)
                }
            }
            ,
            this.getCheckbox = function(e) {
                return e ? e.querySelector("." + r.CLASS.TODO_CHECKBOX) : null 
            }
            ,
            this.getCheckId = function() {
                return "wiz_todo_" + Date.now() + "_" + Math.floor(1e6 * Math.random() + 1)
            }
            ,
            this.getContainerFromChild = function(t) {
                return t ? s.getParentByFilter(t, function(t) {
                    return e.isLayer(t)
                }, !0) : null 
            }
            ,
            this.getMainByCaret = function() {
                var t = c.getRange();
                if (!t)
                    return null ;
                var n = c.getRangeDetail(t.startContainer, t.startOffset);
                return e.getMainFromChild(n.container)
            }
            ,
            this.getMainFromChild = function(e) {
                return e ? s.getParentByClass(e, r.CLASS.TODO_MAIN, !0) : null 
            }
            ,
            this.getMainHtml = function() {
                var t = '<span class="' + r.CLASS.TODO_MAIN + '"><img src="' + a + '" id="%1" class="' + r.CLASS.TODO_CHECKBOX + " " + r.CLASS.IMG_NOT_DRAG + '" ' + r.ATTR.TODO_CHECK + '="unchecked" /></span>';
                return t = t.replace("%1", e.getCheckId())
            }
            ,
            this.getMainInDom = function(t) {
                return t && t.hasChildNodes() ? e.isMain(t) ? t : e.isLayer(t) ? t.querySelector("." + r.CLASS.TODO_MAIN) : null  : null 
            }
            ,
            this.getUserInfoFromChild = function(e) {
                return e ? s.getParentByClass(e, r.CLASS.TODO_USER_INFO, !0) : null 
            }
            ,
            this.getUserInfoInDom = function(e) {
                return e.querySelector("." + r.CLASS.TODO_USER_INFO)
            }
            ,
            this.getUserInfoHtml = function(e, t, n) {
                var i = '<span class="' + r.CLASS.TODO_ACCOUNT + '"><input disabled readonly class="%1" />%2, </span><span class="' + r.CLASS.TODO_DATE + '">%3.</span>'
                  , a = r.CLASS.TODO_USER_AVATAR + o.encode(e);
                return i.replace("%1", r.CLASS.IMG_NOT_DRAG + " " + r.CLASS.TODO_AVATAR + " " + a).replace("%2", t).replace("%3", n)
            }
            ,
            this.getTime = function() {
                var e = function(e) {
                    return (e < 10 ? "0" : "") + e
                }
                  , t = new Date
                  , n = void 0
                  , r = void 0;
                return r = e(t.getHours()) + ":" + e(t.getMinutes()),
                n = "en" === l.version ? l.Month[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear() + " at " + r : t.getFullYear() + l.Date.Year + (t.getMonth() + 1) + l.Date.Month + t.getDate() + l.Date.Day + " " + r
            }
            ,
            this.insertToMain = function(t, n) {
                if (t && n)
                    for (var r = null , o = t.length - 1; o >= 0; o--) {
                        var i = t[o];
                        e.clearTodoClass(i),
                        n.insertBefore(i, r),
                        r = i
                    }
            }
            ,
            this.isCaretAfterCheckbox = function() {
                var t = c.getRange();
                if (!t)
                    return !1;
                var n = void 0
                  , r = void 0
                  , o = void 0
                  , a = void 0;
                return o = e.getMainByCaret(),
                !!o && (!!t.collapsed && (n = c.getRangeDetail(t.startContainer, t.startOffset),
                !(3 === n.container.nodeType && n.offset > 0 && (a = n.container.nodeValue.substr(0, n.offset),
                !i.isEmpty(a))) && (r = n.isEnd ? n.container : s.getPreviousNode(n.container, !1, o),
                e.isCheckbox(r))))
            }
            ,
            this.isCaretBeforeCheckbox = function() {
                var t = {
                    enable: !1,
                    checkbox: null 
                }
                  , n = c.getRange();
                if (!n)
                    return t;
                var r = n.endContainer;
                return 1 === r.nodeType ? r = r.childNodes[n.endOffset] : 3 === r.nodeType && s.isEmptyDom(r) && n.endOffset === r.nodeValue.length && !e.getContainerFromChild(r) && (r = s.getNextNode(r, !1),
                r && (r = s.getParentByFilter(r, function(t) {
                    return e.isLayer(t)
                }, !0))),
                e.isLayer(r) || e.isMain(r) ? (t.enable = !0,
                t.checkbox = e.getCheckbox(r)) : e.isCheckbox(r) && (t.enable = !0,
                t.checkbox = r),
                t.checkbox || (t.enable = !1),
                t
            }
            ,
            this.isCheckbox = function(e) {
                return s.hasClass(e, r.CLASS.TODO_CHECKBOX)
            }
            ,
            this.isEmptyContainer = function(t) {
                if (!t)
                    return !0;
                for (var n = t.childNodes, r = 0; r < n.length; r++) {
                    var o = n[r];
                    if (e.isMain(o)) {
                        if (!e.isEmptyMain(o))
                            return !1
                    } else if (!s.isEmptyDom(o))
                        return !1
                }
                return !0
            }
            ,
            this.isEmptyMain = function(t) {
                if (!t)
                    return !0;
                for (var n = t.childNodes, r = 0; r < n.length; r++) {
                    var o = n[r];
                    if (!e.isCheckbox(o) && !s.isEmptyDom(o))
                        return !1
                }
                return !0
            }
            ,
            this.isLayer = function(e) {
                return s.hasClass(e, r.CLASS.TODO_LAYER)
            }
            ,
            this.isMain = function(e) {
                return s.hasClass(e, r.CLASS.TODO_MAIN)
            }
            ,
            this.isTodoTag = function(t) {
                return !!t && (e.isMain(t) || e.isUserInfo(t) || s.hasClass(t, r.CLASS.TODO_ACCOUNT) || s.hasClass(t, r.CLASS.TODO_DATE))
            }
            ,
            this.isUserInfo = function(e) {
                return s.hasClass(e, r.CLASS.TODO_USER_INFO)
            }
            ,
            this.setTodo = function(t, o) {
                var i = void 0
                  , a = void 0
                  , l = void 0
                  , d = void 0
                  , u = void 0
                  , f = void 0
                  , g = [];
                if (t)
                    i = t;
                else {
                    var m = e.canCreateTodo();
                    if (m === !1)
                        return null ;
                    if (i = m.start,
                    i = s.packageByDiv(i),
                    i !== n.body) {
                        var p = s.getPrevBlock(i)
                          , h = s.getNextBlock(i);
                        h && h !== i && (s.splitDomBeforeSub(i, h),
                        s.isTag(h, "br") && s.remove(h)),
                        p && p !== h && p !== i && (i = s.splitDomBeforeSub(i, p),
                        s.isTag(p, "br") ? s.remove(p) : s.before(p, i))
                    }
                }
                for (var v = 0, b = i.childNodes.length; v < b; v++) {
                    var C = i.childNodes[v];
                    if (s.isBlock(C)) {
                        s.splitDomBeforeSub(i, C);
                        break
                    }
                    g.push(C)
                }
                d = e.getMainInDom(i),
                u = e.getUserInfoInDom(i);
                var E = !!e.getCheckbox(d);
                if ((d || u) && e.cancelTodo(i),
                E)
                    return null ;
                for (l = e.getMainHtml(),
                f = n.doc.createElement("div"),
                s.addClass(f, r.CLASS.TODO_LAYER),
                e.canBeContainer(i) ? (s.addClass(i, r.CLASS.TODO_LAYER),
                s.addClass(i, r.CLASS.TODO_UNCHECKED)) : l = '<div class="' + r.CLASS.TODO_LAYER + " " + r.CLASS.TODO_UNCHECKED + '">' + l + "</div>",
                f.innerHTML = l,
                d = e.getMainInDom(f),
                e.insertToMain(g, d); f.lastChild; )
                    i.insertBefore(f.lastChild, i.firstChild);
                if (a = s.getLastDeepChild(i),
                s.isTag(a, "br") && (s.remove(a),
                a = s.getLastDeepChild(i)),
                s.isSelfClosingTag(a))
                    c.setRange(a.parentNode, s.getIndex(a) + 1);
                else {
                    var T = s.getEndOffset(a);
                    if (T > 0)
                        c.setRange(a, T);
                    else {
                        var S = n.doc.createTextNode(r.FILL_CHAR);
                        3 === a.nodeType ? a.nodeValue = S : a.appendChild(S),
                        c.setRange(S, 0, S, 1)
                    }
                }
                return o.setDocumentType(r.TYPE.TODO),
                e.checkTodoStyle(!1),
                d
            }
            ,
            this.setUserAvatarStyle = function(e, t) {
                var i = o.encode(e)
                  , a = r.ID.TODO_AVATAR_STYLE + i
                  , l = r.CLASS.TODO_USER_AVATAR + i
                  , d = n.doc.getElementById(a);
                if (!d)
                    return (d = n.win.parent.document.getElementById(a)) ? void f.insertStyle({
                        id: a
                    }, d.innerHTML) : void s.convertImageToBase64(t, 50, 50, function(e) {
                        var t = n.doc.getElementById(a);
                        t || f.insertStyle({
                            id: a
                        }, "." + l + "{background-image:url(" + e + ");}")
                    })
            }
            ,
            this.oldPatch = {
                fixImg: function(e) {
                    if (e) {
                        var t = n.doc.createElement("img");
                        t.className = e.className,
                        t.src = a,
                        s.removeClass(t, r.CLASS.TODO_CHECK_IMG_OLD),
                        s.addClass(t, r.CLASS.TODO_CHECKBOX),
                        e.id && (t.id = e.id),
                        e.getAttribute("state") && t.setAttribute(r.ATTR.TODO_CHECK, e.getAttribute("state"));
                        var o = e.parentNode;
                        o.insertBefore(t, e),
                        o.removeChild(e)
                    }
                },
                fixLabel: function(e) {
                    if (e && (s.removeClass(e, r.CLASS.TODO_LABEL_OLD),
                    s.addClass(e, r.CLASS.TODO_MAIN),
                    s.hasClass(e, r.CLASS.TODO_CHECKED_OLD) ? (s.removeClass(e, r.CLASS.TODO_CHECKED_OLD),
                    s.addClass(e, r.CLASS.TODO_CHECKED)) : s.hasClass(e, r.CLASS.TODO_UNCHECKED_OLD) && (s.removeClass(e, r.CLASS.TODO_UNCHECKED_OLD),
                    s.addClass(e, r.CLASS.TODO_UNCHECKED))),
                    e && !s.isTag(e, "span")) {
                        var t = e.parentNode;
                        if (t) {
                            var o = n.doc.createElement("span");
                            for (o.className = e.className; e.firstChild; )
                                o.appendChild(e.firstChild);
                            t.insertBefore(o, e),
                            t.removeChild(e)
                        }
                    }
                },
                fixOldTodo: function() {
                    var t = void 0
                      , o = void 0
                      , i = void 0
                      , a = void 0
                      , l = void 0
                      , d = void 0;
                    a = n.body.querySelectorAll("." + r.CLASS.TODO_CHECK_IMG_OLD);
                    for (var c = a.length - 1; c >= 0; c--) {
                        var u = a[c]
                          , f = e.oldPatch.getLabelFromChild(u);
                        f && f.children[0] === u || e.fixCheckbox(u, !0),
                        e.oldPatch.fixImg(u)
                    }
                    l = n.body.querySelectorAll("." + r.CLASS.TODO_LABEL_OLD);
                    for (var g = 0; g < l.length; g++) {
                        var m = l[g]
                          , p = e.oldPatch.packageTodo(m);
                        s.addClass(p, r.CLASS.TODO_LAYER),
                        t = p.querySelectorAll("." + r.CLASS.TODO_LABEL_OLD);
                        for (var h = t.length - 1; h > 0; h--)
                            o = t[h],
                            i = e.oldPatch.packageTodo(o),
                            s.after(i, p);
                        e.oldPatch.fixUserInfo(m)
                    }
                    l = n.body.querySelectorAll("." + r.CLASS.TODO_LABEL_OLD);
                    for (var v = l.length - 1; v >= 0; v--)
                        e.oldPatch.fixLabel(l[v]);
                    d = n.body.querySelectorAll("." + r.CLASS.TODO_TAIL_OLD);
                    for (var b = d.length - 1; b >= 0; b--) {
                        var C = d[b];
                        s.isEmptyDom(C) ? s.remove(C) : s.removeClass(r.CLASS.TODO_TAIL_OLD)
                    }
                },
                fixUserInfo: function(t) {
                    for (var n = t.parentNode, o = e.oldPatch.getCheckImg(t), i = o ? o.id : "", a = n.childNodes, l = !1, d = 0; d < a.length; d++) {
                        var c = a[d];
                        s.hasClass(c, r.CLASS.TODO_USER_INFO) && (l ? (n.removeChild(c),
                        d--) : (l = !0,
                        c.setAttribute(r.ATTR.TODO_ID, i)))
                    }
                },
                getCheckImg: function(e) {
                    return e ? e.querySelector("." + r.CLASS.TODO_CHECK_IMG_OLD) : null 
                },
                getLabelFromChild: function(e) {
                    return e ? s.getParentByFilter(e, function(e) {
                        return s.hasClass(e, r.CLASS.TODO_LABEL_OLD)
                    }, !0) : null 
                },
                isFirstLabel: function(e) {
                    if (!e)
                        return !1;
                    for (var t = e.parentNode, n = t.childNodes, r = 0; r < n.length; r++) {
                        var o = n[r];
                        if (o === e)
                            return !0;
                        if (!s.isEmptyDom(o))
                            return !1
                    }
                    return !1
                },
                packageTodo: function(t) {
                    if (!t)
                        return null ;
                    var o = t.parentNode;
                    if (o !== n.body && e.oldPatch.isFirstLabel(t))
                        return o;
                    var i = e.oldPatch.getCheckImg(t)
                      , a = i ? i.id : ""
                      , l = a ? o.querySelector("span[" + r.ATTR.TODO_ID + "=" + a + "]") : null 
                      , s = t.nextSibling
                      , d = void 0
                      , c = n.doc.createElement("div");
                    for (c.appendChild(t); s; )
                        d = s.nextSibling,
                        c.appendChild(s),
                        s = s === l ? null  : d;
                    return o.insertBefore(c, d),
                    c
                }
            }
        }
        ;
        t.exports = l
    }
    , {
        "../../config/const": 51,
        "../../libs/base64": 56,
        "../../libs/utils": 59
    }],
    51: [function(e, t, n) {
        "use strict";
        var r = "​"
          , o = {
            AMEND_TIME_SPACE: 18e4,
            AMEND_BATCH_TIME_SPACE: 3e4,
            FILL_CHAR: r,
            FILL_CHAR_REG: new RegExp(r,"ig"),
            WIZ_TABLE_IN_MARKDOWN_SRC_REG: "<div [^>]*wiz-table-container[^>]*>(.|\\n)*?</table></div></div>",
            AMEND: {
                INFO_SPACE: 0,
                INFO_TIMER: 300
            },
            ATTR: {
                IMG: "data-wiz-img",
                IMG_MASK: "data-wiz-img-mask",
                IMG_RATE: "data-wiz-img-rate",
                IMG_EDITING: "data-wiz-img-editing",
                SPAN: "data-wiz-span",
                SPAN_USERID: "data-wiz-user-id",
                SPAN_INSERT: "data-wiz-insert",
                SPAN_DELETE: "data-wiz-delete",
                SPAN_PASTE: "data-wiz-paste",
                SPAN_PASTE_TYPE: "data-wiz-paste-type",
                SPAN_PASTE_ID: "data-wiz-paste-id",
                SPAN_TIMESTAMP: "data-wiz-amend-time",
                TODO_ID: "wiz_todo_id",
                TODO_CHECK: "data-wiz-check"
            },
            CLASS: {
                BLOCK_SCROLL: "wiz-block-scroll",
                CODE_CONTAINER: "wiz-code-container",
                CODE_CONTAINER_PASTE: "wiz-code-container-paste",
                CODE_CONTAINER_OLD: "prettyprint",
                CODE_MIRROR: "CodeMirror",
                CODE_MIRROR_LINE: "CodeMirror-line",
                CODE_MIRROR_MEASURE: "CodeMirror-measure",
                CODE_MIRROR_GUTTER: "CodeMirror-gutter-wrapper",
                CODE_MIRROR_HSCROLL: "CodeMirror-scroll",
                CODE_TOOLS: "wiz-code-tools",
                CODE_TOOLS_MODE: "wiz-code-tools-mode",
                CODE_TOOLS_THEME: "wiz-code-tools-theme",
                EDITOR_CONTAINER: "wiz-editor-container",
                EDITOR_PREVIEW_SHOW: "wiz-editor-preview-show",
                IMG_ATTACHMENT: "wiz-img-attachment",
                IMG_NOT_DRAG: "wiz-img-cannot-drag",
                IMG_RESIZE_ACTIVE: "wiz-img-resize-active",
                IMG_RESIZE_CONTAINER: "wiz-img-resize-container",
                IMG_RESIZE_HANDLE: "wiz-img-resize-handle",
                MARKDOWN_BODY: "markdown-body",
                ORDER_LIST_LEVEL: ["wiz-list-level3", "wiz-list-level1", "wiz-list-level2"],
                READONLY: "wiz-readonly",
                EDITING: "wiz-editing",
                SELECTED_CELL: "wiz-selected-cell",
                SELECTED_CELL_MULTI: "wiz-selected-cell-multi",
                SELECT_PLUGIN_CONTAINER: "wiz-select-plugin-container",
                SELECT_PLUGIN_HEADER: "wiz-select-plugin-header",
                SELECT_PLUGIN_HEADER_TEXT: "wiz-select-plugin-header-text",
                SELECT_PLUGIN_OPTIONS: "wiz-select-plugin-options",
                SELECT_PLUGIN_OPTIONS_ITEM: "wiz-select-plugin-options-item",
                TEMPLATE_EDITABLE: "wiz-template-editable",
                TABLE_CONTAINER: "wiz-table-container",
                TABLE_TOOLS: "wiz-table-tools",
                TABLE_BODY: "wiz-table-body",
                TABLE_MENU_BUTTON: "wiz-table-menu-button",
                TABLE_MENU_ITEM: "wiz-table-menu-item",
                TABLE_MENU_SUB: "wiz-table-menu-sub",
                TABLE_MOVING: "wiz-table-moving",
                TODO_ACCOUNT: "wiz-todo-account",
                TODO_AVATAR: "wiz-todo-avatar",
                TODO_CHECKBOX: "wiz-todo-checkbox",
                TODO_CHECK_IMG_OLD: "wiz-todo-img",
                TODO_DATE: "wiz-todo-dt",
                TODO_LAYER: "wiz-todo-layer",
                TODO_MAIN: "wiz-todo-main",
                TODO_LABEL_OLD: "wiz-todo-label",
                TODO_CHECKED: "wiz-todo-checked",
                TODO_UNCHECKED: "wiz-todo-unchecked",
                TODO_CHECKED_OLD: "wiz-todo-label-checked",
                TODO_UNCHECKED_OLD: "wiz-todo-label-unchecked",
                TODO_TAIL_OLD: "wiz-todo-tail",
                TODO_USER_AVATAR: "wiz-todo-avatar-",
                TODO_USER_INFO: "wiz-todo-completed-info",
                WIZ_BODY: "wiz-editor-body",
                WIZ_EIDTOR_BODY_CONTAINER: "wiz-editor-body-container",
                WIZ_EIDTOR_IFRAME: "wiz-editor-iframe",
                WIZ_EIDTOR_PREVIEW_CONTAINER: "wiz-editor-preview-container",
                WIZ_EIDTOR_TOOlBAR_CONTAINER: "wiz-editor-toolbar-container",
                WIZ_EIDTOR_TOOlBAR_MAIN: "wiz-editor-toolbar-main",
                WIZ_EIDTOR_TOOlBAR_SIDE: "wiz-editor-toolbar-side"
            },
            CLIENT_EVENT: {
                WizEditorPaste: "wizEditorPaste",
                WizEditorClickImg: "wizEditorClickImg",
                WizReaderClickImg: "wizReaderClickImg",
                WizMarkdownRender: "wizMarkdownRender",
                WizEditorTrackEvent: "wizEditorTrackEvent"
            },
            COLOR: ["#CB3C3C", "#0C9460", "#FF3399", "#FF6005", "#8058BD", "#009999", "#8AA725", "#339900", "#CC6600", "#3BBABA", "#D4CA1A", "#2389B0", "#006699", "#FF8300", "#2C6ED5", "#FF0000", "#B07CFF", "#CC3399", "#EB4847", "#3917E6"],
            CSS: {
                DEFAULT_FONT: 'Helvetica, "Hiragino Sans GB", "微软雅黑", "Microsoft YaHei UI", SimSun, SimHei, arial, sans-serif',
                IMG: {
                    SPAN: {
                        position: "relative",
                        display: "inline-block"
                    },
                    MASK: {
                        position: "absolute",
                        width: "100% !important",
                        height: "100% !important",
                        top: "0",
                        left: "0",
                        opacity: ".5",
                        filter: "alpha(opacity=50)",
                        border: "2px solid",
                        "box-sizing": "border-box",
                        "-webkit-box-sizing": "border-box",
                        "-moz-box-sizing": "border-box"
                    }
                },
                IMG_DELETED: {
                    background: "#fdc6c6 url(data:image/gif;base64,R0lGODlhDwAPAIABAIcUFP///yH5BAEKAAEALAAAAAAPAA8AAAIajI8IybadHjxyhjox1I0zH1mU6JCXCSpmUAAAOw==)",
                    "border-color": "#E47070"
                },
                IMG_INSERT: {
                    background: "#ccffcc",
                    "border-color": "#00AA00"
                },
                TODO_LIST: {
                    IMG_WIDTH: 40
                },
                Z_INDEX: {
                    amendInfo: 150,
                    tableBorder: 105,
                    tableColRowLine: 120,
                    tableRangeDot: 110,
                    tableTDBefore: 100,
                    tableTools: 130,
                    tableToolsArrow: 10
                }
            },
            EVENT: {
                BEFORE_GET_DOCHTML: "BEFORE_GET_DOCHTML",
                BEFORE_SAVESNAP: "BEFORE_SAVESNAP",
                AFTER_INSERT_DOM: "AFTER_INSERT_DOM",
                AFTER_RESTORE_HISTORY: "AFTER_RESTORE_HISTORY",
                EXEC_COMMEND: "EXEC_COMMEND",
                ON_DBLCLICK: "ON_DBLCLICK",
                ON_CLICK: "ON_CLICK",
                ON_COMPOSITION_START: "ON_COMPOSITION_START",
                ON_COMPOSITION_END: "ON_COMPOSITION_END",
                ON_COPY: "ON_COPY",
                ON_CUT: "ON_CUT",
                ON_DOM_SUBTREE_MODIFIED: "ON_DOM_SUBTREE_MODIFIED",
                ON_DRAG_START: "ON_DRAG_START",
                ON_DRAG_ENTER: "ON_DRAG_ENTER",
                ON_DROP: "ON_DROP",
                ON_EXEC_COMMAND: "ON_EXEC_COMMAND",
                ON_KEY_DOWN: "ON_KEY_DOWN",
                ON_KEY_UP: "ON_KEY_UP",
                ON_MOUSE_DOWN: "ON_MOUSE_DOWN",
                ON_MOUSE_MOVE: "ON_MOUSE_MOVE",
                ON_MOUSE_OVER: "ON_MOUSE_OVER",
                ON_MOUSE_UP: "ON_MOUSE_UP",
                ON_ORIENTATION_CHANGE: "ON_ORIENTATION_CHANGE",
                ON_PASTE: "ON_PASTE",
                ON_SCROLL: "ON_SCROLL",
                ON_SELECT_PLUGIN_CHANGE: "ON_SELECT_PLUGIN_CHANGE",
                ON_SELECTION_CHANGE: "ON_SELECTION_CHANGE",
                ON_SELECT_START: "ON_SELECT_START",
                ON_TOUCH_START: "ON_TOUCH_START",
                ON_TOUCH_END: "ON_TOUCH_END",
                UPDATE_RENDER: "UPDATE_RENDER"
            },
            HISTORY: {
                TYPE: {
                    CODE_MIRROR: "CODE_MIRROR",
                    COMMON: "COMMON"
                }
            },
            ID: {
                AMEND_INFO: "wiz-amend-info",
                AMEND_INFO_SINGLE: "wiz-amend-info-single",
                AMEND_INFO_MULTI: "wiz-amend-info-multi",
                AMEND_INFO_NAME: "wiz-amend-info-name",
                AMEND_INFO_IMG: "wiz-amend-info-image",
                AMEND_INFO_CONTENT: "wiz-amend-info-content",
                AMEND_INFO_TIME: "wiz-amend-info-time",
                AMEND_INFO_TOOLS: "wiz-amend-info-tools",
                AMEND_INFO_ACCEPT: "wiz-amend-info-accept",
                AMEND_INFO_REFUSE: "wiz-amend-info-refuse",
                AMEND_USER_INFO: "wiz-amend-user",
                CODE_STYLE: "wiz_code_style",
                FORMAT_PAINTER_STYLE: "wiz_format_painter_style",
                IFRAME_FOR_SAVE: "wiz-iframe-for-save",
                TABLE_RANGE_BORDER: "wiz-table-range-border",
                TABLE_ROW_LINE: "wiz-table-row-line",
                TABLE_COL_LINE: "wiz-table-col-line",
                TODO_STYLE: "wiz_todo_style",
                TODO_STYLE_OLD: "wiz_todo_style_id",
                TODO_AVATAR_STYLE: "wiz_todo_style_avatar_",
                TMP_STYLE_PRE: "wiz_tmp_style_",
                WIZ_DEFAULT_STYLE: "wiz_custom_css",
                WIZ_EIDTOR_FRAME_STYLE: "wiz-editor-frame-style",
                WIZ_EIDTOR_PREVIEW_STYLE: "wiz-editor-preview-style",
                WIZ_EIDTOR_TOOlBAR_STYLE: "wiz-editor-toolbar-style"
            },
            NAME: {
                CODE_STYLE: "wiz_code_style",
                TMP_STYLE: "wiz_tmp_editor_style",
                UNSAVE_STYLE: "wiz_unsave_style"
            },
            NOTE_READER_TYPE: {
                COMMON: "common",
                MARKDOWN: "markdown",
                MATHJAX: "mathjax"
            },
            NOTE_EDITOR_TYPE: {
                COMMON: "common",
                MARKDOWN: "markdown"
            },
            TAG: {
                CODE_MIRROR: "wiz_code_mirror",
                TMP_TAG: "wiz_tmp_tag",
                TMP_PLUGIN_TAG: "wiz_tmp_plugin_tag",
                TMP_HIGHLIGHT_TAG: "wiz_tmp_highlight_tag"
            },
            TYPE: {
                IMG_DELETE: "delete",
                IMG_INSERT: "insert",
                PASTE: {
                    START: "start",
                    END: "end",
                    CONTENT: "content"
                },
                POS: {
                    upLeft: "up-left",
                    downLeft: "down-left",
                    leftUp: "left-up",
                    rightUp: "right-up",
                    upRight: "up-right",
                    downRight: "down-right",
                    leftDown: "left-down",
                    rightDown: "right-down"
                },
                TABLE: {
                    COPY: "copy",
                    PASTE: "paste",
                    CLEAR_CELL: "clearCell",
                    MERGE_CELL: "mergeCell",
                    SPLIT_CELL: "splitCell",
                    INSERT_ROW_UP: "insertRowUp",
                    INSERT_ROW_DOWN: "insertRowDown",
                    INSERT_COL_LEFT: "insertColLeft",
                    INSERT_COL_RIGHT: "insertColRight",
                    DELETE_ROW: "deleteRow",
                    DELETE_COL: "deleteCol",
                    SET_CELL_BG: "setCellBg",
                    SET_CELL_ALIGN: "setCellAlign",
                    DISTRIBUTE_COLS: "distributeCols",
                    DELETE_TABLE: "deleteTable"
                },
                TODO: "tasklist"
            }
        };
        t.exports = o
    }
    , {}],
    52: [function(e, t, n) {
        "use strict";
        function r(e, t) {
            if (t) {
                var n = void 0;
                for (n in e)
                    e.hasOwnProperty(n) && "undefined" != typeof t[n] && (/^(editor|reader|callback|timeout|markdownPlugIn|ios|pc|table)$/.test(n) ? r(e[n], t[n]) : e[n] = t[n])
            }
        }
        function o(e, t) {
            if (e) {
                if (e = e.toLowerCase(),
                e.indexOf("windows") > -1)
                    t.client.type.isWin = !0,
                    t.client.sendCmdToWiznote = function(e, n) {
                        e === a.CLIENT_EVENT.WizReaderClickImg && t.win.external.OnClickedImage(n.src, JSON.stringify(n.imgList))
                    }
                    ;
                else if (e.indexOf("ios") > -1)
                    t.client.type.isIOS = !0,
                    t.client.sendCmdToWiznote = function(e, n) {
                        var r = void 0;
                        e === a.CLIENT_EVENT.WizReaderClickImg && delete n.imgList,
                        r = s + e;
                        var o = void 0
                          , i = [];
                        if (n) {
                            for (o in n)
                                n.hasOwnProperty(o) && i.push(o + "=" + encodeURIComponent(n[o]));
                            r += "?" + i.join("&")
                        }
                        var l = t.doc.createElement(a.TAG.TMP_TAG)
                          , d = t.doc.createElement("iframe");
                        d.setAttribute("src", r),
                        l.style.display = "none",
                        l.appendChild(d),
                        t.body.appendChild(l),
                        l.parentNode.removeChild(l),
                        d = null ,
                        l = null 
                    }
                    ;
                else if (e.indexOf("android") > -1)
                    t.client.type.isAndroid = !0,
                    t.client.sendCmdToWiznote = function(e, n) {
                        e === a.CLIENT_EVENT.WizReaderClickImg ? t.win.WizNote.onClickImg(n.src, n.imgList.join(",")) : e === a.CLIENT_EVENT.WizEditorClickImg && t.win.WizNote.onEditorClickImage(n.src)
                    }
                    ;
                else if (e.indexOf("mac") > -1) {
                    var n = t.win.navigator.userAgent;
                    /Mac/i.test(n) || (t.client.type.isLinux = !0),
                    t.client.type.isMac = !0,
                    t.client.sendCmdToWiznote = function(e, n) {
                        e === a.CLIENT_EVENT.WizReaderClickImg && t.win.WizExplorerApp.onClickedImage(n.src, JSON.stringify(n.imgList))
                    }
                }
                (t.client.type.isIOS || t.client.type.isAndroid) && (e.indexOf("pad") > -1 ? t.client.type.isPad = !0 : t.client.type.isPhone = !0)
            }
        }
        function i(e, t) {
            var n = {};
            return {
                options: {
                    document: null ,
                    container: null ,
                    noFrame: !0,
                    lang: "en",
                    clientType: "",
                    userInfo: null ,
                    usersData: [],
                    userNameEncoder: "",
                    dependencyUrl: "",
                    indexFilesPath: "",
                    indexFilesFullPath: "",
                    editor: {
                        type: a.NOTE_EDITOR_TYPE.COMMON,
                        autoFocus: !0,
                        minHeight: 300,
                        maxRedo: 100,
                        callback: {
                            redo: null ,
                            onPasteFile: null ,
                            onDropFile: null ,
                            onClickToolbarInsertImg: null ,
                            onClickToolbarHelp: null 
                        }
                    },
                    reader: {
                        type: a.NOTE_READER_TYPE.COMMON,
                        codeNoIDE: !1,
                        noAmend: !1,
                        markdownPlugIn: {
                            imgSrcFilter: null ,
                            customBlockGamut: null 
                        },
                        callback: {
                            markdown: null ,
                            mathJax: null 
                        },
                        timeout: {
                            markdown: 3e4,
                            mathJax: 3e4
                        }
                    },
                    pc: {
                        pluginModified: !1
                    },
                    table: {
                        colWidth: 120,
                        colWidthMin: 30,
                        rowHeightMin: 33
                    }
                },
                locale: {},
                win: null ,
                doc: null ,
                body: null ,
                readonly: null ,
                isShowPreview: !1,
                isSetBodyFontSize: !1,
                compositionStart: !1,
                frame: {
                    toolbarDoc: null ,
                    toolbarContainer: null ,
                    bodyContainer: null 
                },
                dependency: {
                    files: {
                        css: {
                            fonts: e + "/fonts.css?v=" + t,
                            github2: e + "/github2.css?v=" + t,
                            wizToc: e + "/wizToc.css?v=" + t
                        },
                        cursor: {
                            formatPainter: e + "/format-painter-wiz.cur?v=" + t
                        },
                        js: {
                            codemirror: e + "/codemirror/codemirror.js?v=" + t,
                            cmActiveLine: e + "/codemirror/addon/selection/active-line.js?v=" + t,
                            cmMatchBrackets: e + "/codemirror/addon/edit/matchbrackets.js?v=" + t,
                            cmMode: e + "/codemirror/mode/mode.js?v=" + t,
                            flowchart: e + "/flowchart.js?v=" + t,
                            jquery: e + "/jquery-1.11.3.js?v=" + t,
                            mathJax: e + "/mathjax/MathJax.js?config=TeX-AMS-MML_SVG&v=" + t,
                            prettify: e + "/prettify.js?v=" + t,
                            raphael: e + "/raphael.js?v=" + t,
                            sequence: e + "/sequence-diagram.js?v=" + t,
                            underscore: e + "/underscore.js?v=" + t
                        }
                    },
                    css: {
                        fonts: ["fonts"],
                        markdown: ["github2", "wizToc"]
                    },
                    js: {
                        codeMirror: [["codemirror"], ["cmActiveLine", "cmMatchBrackets", "cmMode"]],
                        markdown: [["jquery"], ["prettify", "raphael", "underscore"], ["flowchart", "sequence"]],
                        mathJax: [["jquery"], ["mathJax"]]
                    }
                },
                client: {
                    type: {
                        isWeb: function() {
                            return location && 0 === location.protocol.indexOf("http")
                        }(),
                        isWin: !1,
                        isMac: !1,
                        isLinux: !1,
                        isIOS: !1,
                        isAndroid: !1,
                        isPad: !1,
                        isPhone: !1
                    },
                    sendCmdToWiznote: function() {}
                },
                event: {
                    add: function(e, t) {
                        function r(e, t) {
                            if (!e || !t)
                                return !1;
                            var r = void 0
                              , o = void 0
                              , i = n[e];
                            if (!i || 0 === i.length)
                                return !1;
                            for (r = 0,
                            o = i.length; r < o; r++)
                                if (i[r] === t)
                                    return !0;
                            return !1
                        }
                        if (e && t && !r(e, t)) {
                            var o = n[e];
                            o || (o = []),
                            o.push(t),
                            n[e] = o
                        }
                    },
                    call: function(e) {
                        var t = void 0
                          , r = void 0
                          , o = []
                          , i = n[e];
                        if (i && 0 !== i.length) {
                            for (t = 1,
                            r = arguments.length; t < r; t++)
                                o.push(arguments[t]);
                            var a = [];
                            for (t = 0,
                            r = i.length; t < r; t++)
                                a.push(i[t]);
                            for (t = 0,
                            r = a.length; t < r; t++)
                                a[t].apply(this, o)
                        }
                    },
                    remove: function(e, t) {
                        if (e && t) {
                            var r = void 0
                              , o = void 0
                              , i = n[e];
                            if (i && 0 !== i.length)
                                for (r = 0,
                                o = i.length; r < o; r++)
                                    i[r] === t && i.splice(r, 1)
                        }
                    }
                }
            }
        }
        var a = e("./const")
          , l = e("../libs/base64")
          , s = "wiznotecmd://"
          , d = function(e, t) {
            var n = e.dependencyUrl.replace(/\\/g, "/")
              , a = i(n, t);
            r(a.options, e),
            a.readonly = null ;
            var s = a.options.document || window.document
              , d = void 0;
            a.doc = s,
            a.win = a.doc.defaultView,
            a.body = s.body,
            a.frame.toolbarDoc = a.doc,
            a.options.container === a.doc || a.options.container === a.body ? (a.options.container = null ,
            a.options.noFrame = !0) : a.options.container || (a.frame.toolbarContainer = null ,
            a.frame.bodyContainer = null ),
            o(a.options.clientType, a);
            var c = decodeURIComponent(location.pathname)
              , u = c.lastIndexOf("/") + 1
              , f = c.lastIndexOf(".");
            if (a.options.indexFilesPath = c.substring(u, f) + "_files",
            a.options.indexFilesFullPath = location.protocol + "//" + location.host + c.substr(0, u) + a.options.indexFilesPath + "/",
            "base64" === a.options.userNameEncoder && (d = a.options.userInfo,
            d && d.user_name && (d.user_name = l.decode(d.user_name)),
            a.options.userData))
                for (var g = 0; g < a.options.usersData.length; g++)
                    d = a.options.usersData[g],
                    d.user_name = l.decode(d.user_name);
            return a
        }
        ;
        t.exports = d
    }
    , {
        "../libs/base64": 56,
        "./const": 51
    }],
    53: [function(e, t, n) {
        "use strict";
        var r = function() {
            var e = this
              , t = [];
            this.loading = !1,
            this.addCallback = function(e) {
                t.push(e)
            }
            ,
            this.callback = function() {
                if (!e.loading) {
                    for (var n = t.length - 1; n >= 0; n--) {
                        var r = t.splice(n, 1)[0];
                        r()
                    }
                    t = []
                }
            }
        }
        ;
        t.exports = r
    }
    , {}],
    54: [function(e, t, n) {
        "use strict";
        var r, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
         : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        r = "object" === ("undefined" == typeof n ? "undefined" : o(n)) && "function" == typeof e ? n : {},
        function() {
            function e(e) {
                return e
            }
            function t(e) {
                return !1
            }
            function n() {}
            function o() {}
            n.prototype = {
                chain: function(t, n) {
                    var r = this[t];
                    if (!r)
                        throw new Error("unknown hook " + t);
                    r === e ? this[t] = n : this[t] = function(e) {
                        var t = Array.prototype.slice.call(arguments, 0);
                        return t[0] = r.apply(null , t),
                        n.apply(null , t)
                    }
                },
                set: function(e, t) {
                    if (!this[e])
                        throw new Error("unknown hook " + e);
                    this[e] = t
                },
                addNoop: function(t) {
                    this[t] = e
                },
                addFalse: function(e) {
                    this[e] = t
                }
            },
            r.HookCollection = n,
            o.prototype = {
                set: function(e, t) {
                    this["s_" + e] = t
                },
                get: function(e) {
                    return this["s_" + e]
                }
            },
            r.Converter = function(t) {
                function r(e) {
                    return e = e.replace(/^[ ]{0,3}\[([^\[\]]+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?(?=\s|$)[ \t]*\n?[ \t]*((\n*)["(](.+?)[")][ \t]*)?(\n+)/gm, function(e, t, n, r, o, i, a) {
                        return t = t.toLowerCase(),
                        U.set(t, O(n)),
                        o ? r + a : (i && z.set(t, i.replace(/"/g, "&quot;")),
                        "")
                    })
                }
                function i(e) {
                    return e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n*<\/\2>[ \t]*(?=\n+))/gm, l),
                    e = e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm, l),
                    e = e.replace(/\n[ ]{0,3}((<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, l),
                    e = e.replace(/\n\n[ ]{0,3}(<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>[ \t]*(?=\n{2,}))/g, l),
                    e = e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, l)
                }
                function a(e) {
                    return e = e.replace(/(^\n+|\n+$)/g, ""),
                    "\n\n~K" + (F.push(e) - 1) + "K\n\n"
                }
                function l(e, t) {
                    return a(t)
                }
                function s(e, n, r) {
                    e = B.preBlockGamut(e, q),
                    e = h(e);
                    var o = "<hr />\n";
                    return e = e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm, o),
                    e = e.replace(/^[ ]{0,2}([ ]?-[ ]?){3,}[ \t]*$/gm, o),
                    e = e.replace(/^[ ]{0,2}([ ]?_[ ]?){3,}[ \t]*$/gm, o),
                    e = v(e),
                    e = E(e),
                    e = N(e),
                    e = B.postBlockGamut(e, q),
                    t.customBlockGamut && (e = t.customBlockGamut(e)),
                    e = i(e),
                    e = _(e, n, r)
                }
                function d(e) {
                    return e = B.preSpanGamut(e),
                    e = T(e),
                    e = c(e),
                    e = D(e),
                    e = g(e),
                    e = u(e),
                    e = w(e),
                    e = e.replace(/~P/g, "://"),
                    e = O(e),
                    e = G(e),
                    e = e.replace(/  +\n/g, " <br>\n"),
                    e = B.postSpanGamut(e)
                }
                function c(e) {
                    var t = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--(?:|(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>)/gi;
                    return e = e.replace(t, function(e) {
                        var t = e.replace(/(.)<\/?code>(?=.)/g, "$1`");
                        return t = k(t, "!" == e.charAt(1) ? "\\`*_/" : "\\`*_")
                    })
                }
                function u(e) {
                    return e.indexOf("[") === -1 ? e : (e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, f),
                    e = e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?((?:\([^)]*\)|[^()\s])*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, f),
                    e = e.replace(/(\[([^\[\]]+)\])()()()()()/g, f))
                }
                function f(e, t, n, r, o, i, a, l) {
                    void 0 == l && (l = "");
                    var s = t
                      , d = n.replace(/:\/\//g, "~P")
                      , c = r.toLowerCase()
                      , u = o
                      , f = l;
                    if ("" == u)
                        if ("" == c && (c = d.toLowerCase().replace(/ ?\n/g, " ")),
                        u = "#" + c,
                        void 0 != U.get(c))
                            u = U.get(c),
                            void 0 != z.get(c) && (f = z.get(c));
                        else {
                            if (!(s.search(/\(\s*\)$/m) > -1))
                                return s;
                            u = ""
                        }
                    u = M(u);
                    var g = '<a href="' + u + '"';
                    return "" != f && (f = m(f),
                    f = k(f, "*_"),
                    g += ' title="' + f + '"'),
                    g += ">" + d + "</a>"
                }
                function g(e) {
                    return e.indexOf("![") === -1 ? e : (e = e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g, p),
                    e = e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g, p))
                }
                function m(e) {
                    return e.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
                }
                function p(e, n, r, o, i, a, l, s) {
                    var d = n
                      , c = r
                      , u = o.toLowerCase()
                      , f = i
                      , g = s;
                    if (g || (g = ""),
                    "" == f) {
                        if ("" == u && (u = c.toLowerCase().replace(/ ?\n/g, " ")),
                        f = "#" + u,
                        void 0 == U.get(u))
                            return d;
                        f = U.get(u),
                        void 0 != z.get(u) && (g = z.get(u))
                    } else
                        t.imgSrcFilter && (f = t.imgSrcFilter(f));
                    c = k(m(c), "*_[]()"),
                    f = k(f, "*_");
                    var p = '<img src="' + f + '" alt="' + c + '"';
                    return g = m(g),
                    g = k(g, "*_"),
                    p += ' title="' + g + '"',
                    p += " />"
                }
                function h(e) {
                    return e = e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm, function(e, t) {
                        return "<h1>" + d(t) + "</h1>\n\n"
                    }),
                    e = e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm, function(e, t) {
                        return "<h2>" + d(t) + "</h2>\n\n"
                    }),
                    e = e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm, function(e, t, n) {
                        var r = t.length;
                        return "<h" + r + ">" + d(n) + "</h" + r + ">\n\n"
                    })
                }
                function v(e, t) {
                    e = e.replace(/<br\/?>/g, " \n"),
                    e += "~0";
                    var n, r = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]*?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;
                    return H ? e = e.replace(r, function(e, r, o) {
                        var i = r;
                        n = b(o);
                        var a = C(i, n, t)
                          , l = a.list_str.replace(/\s+$/, "")
                          , s = "<" + n;
                        return l = s + ">" + l + "</" + a.list_type + ">\n\n",
                        n = a.list_type,
                        l
                    }) : (r = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm,
                    e = e.replace(r, function(e, t, r, o) {
                        var i = t
                          , a = r;
                        n = b(o);
                        var l = C(a, n)
                          , s = "<" + n
                          , d = i + s + ">\n" + l.list_str + "</" + l.list_type + ">\n\n";
                        return n = l.list_type,
                        d
                    })),
                    e = e.replace(/~0/, "")
                }
                function b(e) {
                    return e.search(/[*+-]/g) > -1 ? "ul" : "ol"
                }
                function C(e, t, n) {
                    H++,
                    e = e.replace(/\n{2,}$/, "\n"),
                    e += "~0";
                    var r = new RegExp("(^[ \\t]*)([*+-]|\\d+[.])[ \\t]+([^\\r]*?(\\n+))(?=(~0|\\1([*+-]|\\d+[.])[ \\t]+))","gm")
                      , o = !1;
                    return e = e.replace(r, function(e, n, r, i) {
                        var a = i
                          , l = b(r)
                          , d = /\n\n$/.test(a)
                          , c = d || a.search(/\n{2,}/) > -1
                          , u = /^\[( |x)\]/.test(a)
                          , f = c || o;
                        a = s(x(a), !0, !f);
                        var g = "";
                        return l != t && (g = "</" + t + ">\n<" + l + ">\n",
                        t = l),
                        g += u ? "<li class='wiz-md-todo-list-item'>" : "<li>",
                        g += a + "</li>\n",
                        o = d,
                        g
                    }),
                    e = e.replace(/~0/g, ""),
                    H--,
                    {
                        list_str: e,
                        list_type: t
                    }
                }
                function E(e) {
                    return e += "~0",
                    e = e.replace(/(?:\n\n|^\n?)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g, function(e, t, n) {
                        var r = t
                          , o = n;
                        return r = S(x(r)),
                        r = R(r),
                        r = r.replace(/^\n+/g, ""),
                        r = r.replace(/\n+$/g, ""),
                        r = "<pre><code>" + r + "\n</code></pre>",
                        "\n\n" + r + "\n\n" + o
                    }),
                    e = e.replace(/~0/, "")
                }
                function T(e) {
                    return e = e.replace(/(^|[^\\`])(`+)(?!`)([^\r]*?[^`])\2(?!`)/gm, function(e, t, n, r, o) {
                        var i = r;
                        return i = i.replace(/^([ \t]*)/g, ""),
                        i = i.replace(/[ \t]*$/g, ""),
                        i = S(i),
                        i = i.replace(/:\/\//g, "~P"),
                        t + "<code>" + i + "</code>"
                    })
                }
                function S(e) {
                    return e = e.replace(/&/g, "&amp;"),
                    e = e.replace(/</g, "&lt;"),
                    e = e.replace(/>/g, "&gt;"),
                    e = k(e, "*_{}[]\\", !1)
                }
                function y(e) {
                    return e.indexOf("*") === -1 && e.indexOf("_") === -1 ? e : (e = Y(e),
                    e = e.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)\2(?=\S)([^\r]*?\S)\2\2(?!\2)(?=[\W_]|$)/g, "$1<strong>$3</strong>"),
                    e = e.replace(/(^|[\W_])(?:(?!\1)|(?=^))(\*|_)(?=\S)((?:(?!\2)[^\r])*?\S)\2(?!\2)(?=[\W_]|$)/g, "$1<em>$3</em>"),
                    W(e))
                }
                function A(e) {
                    return e.indexOf("*") === -1 && e.indexOf("_") === -1 ? e : (e = Y(e),
                    e = e.replace(/(?=[^\r][*_]|[*_])(^|(?=\W__|(?!\*)[\w\W_]\*\*|\w\*\*\w)[^\r])(\*\*|__)(?!\2)(?=\S)((?:|[^\r]*?(?!\2)[^\r])(?=\S_|\w|.\*\*(?:[\w\W_]|$)).)(?=__(?:\W|$)|\*\*(?:[^*]|$))\2/g, "$1<strong>$3</strong>"),
                    e = e.replace(/(?=[^\r][*_]|[*_])(^|(?=\W_|(?!\*)(?:[\w\W_]\*|\D\*(?=\w)\D))[^\r])(\*|_)(?!\2\2\2)(?=\S)((?:(?!\2)[^\r])*?(?=[^\s_]_|(?=[\w\W])\D\*\D|[^\s*]\*(?:[\w\W_]|$)).)(?=_(?:\W|$)|\*(?:[^*]|$))\2/g, "$1<em>$3</em>"),
                    W(e))
                }
                function N(e) {
                    return e = e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm, function(e, t) {
                        var n = t;
                        return n = n.replace(/^[ \t]*>[ \t]?/gm, "~0"),
                        n = n.replace(/~0/g, ""),
                        n = n.replace(/^[ \t]+$/gm, ""),
                        n = s(n),
                        n = n.replace(/(^|\n)/g, "$1  "),
                        n = n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(e, t) {
                            var n = t;
                            return n = n.replace(/^  /gm, "~0"),
                            n = n.replace(/~0/g, "")
                        }),
                        a("<blockquote>\n" + n + "\n</blockquote>")
                    })
                }
                function _(e, t, n) {
                    e = e.replace(/^\n+/g, ""),
                    e = e.replace(/\n+$/g, "");
                    for (var r = e.split(/\n{2,}/g), o = [], i = /~K(\d+)K/, a = r.length, l = 0; l < a; l++) {
                        var s = r[l];
                        i.test(s) ? o.push(s) : /\S/.test(s) && (s = d(s),
                        s = s.replace(/^([ \t]*)/g, n ? "" : "<p>"),
                        n || (s += "</p>"),
                        o.push(s))
                    }
                    if (!t) {
                        a = o.length;
                        for (var l = 0; l < a; l++)
                            for (var c = !0; c; )
                                c = !1,
                                o[l] = o[l].replace(/~K(\d+)K/g, function(e, t) {
                                    return c = !0,
                                    F[t]
                                })
                    }
                    return o.join("\n\n")
                }
                function O(e) {
                    return e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"),
                    e = e.replace(/<(?!([a-z\/?!][^<>]*>)|~D)/gi, "&lt;")
                }
                function D(e) {
                    return e = e.replace(/\\(\\)/g, P),
                    e = e.replace(/\\([`*_{}\[\]()>#+-.!])/g, P)
                }
                function L(e, t, n, r, o, i) {
                    if (/^<[^<>]*(https?|ftp)/.test(i))
                        return e;
                    if (t)
                        return e;
                    if (")" !== r.charAt(r.length - 1))
                        return "<" + n + r + ">";
                    for (var a = r.match(/[()]/g), l = 0, s = 0; s < a.length; s++)
                        "(" === a[s] ? l <= 0 ? l = 1 : l++ : l--;
                    var d = "";
                    if (l < 0) {
                        var c = new RegExp("\\){1," + -l + "}$");
                        r = r.replace(c, function(e) {
                            return d = e,
                            ""
                        })
                    }
                    if (d) {
                        var u = r.charAt(r.length - 1);
                        j.test(u) || (d = u + d,
                        r = r.substr(0, r.length - 1))
                    }
                    return "<" + n + r + ">" + d
                }
                function w(e) {
                    e = e.replace(K, L);
                    var t = function(e, t) {
                        var n = M(t);
                        return '<a href="' + n + '">' + B.plainLinkText(t) + "</a>"
                    }
                    ;
                    return e = e.replace(/<((https?|ftp):[^'">\s]+)>/gi, t)
                }
                function I(e) {
                    return e = e.replace(/~E(\d+)E/g, function(e, t) {
                        var n = parseInt(t);
                        return String.fromCharCode(n)
                    })
                }
                function x(e) {
                    return e = e.replace(/^(\t|[ ]{1,4})/gm, "~0"),
                    e = e.replace(/~0/g, "")
                }
                function R(e) {
                    if (!/\t/.test(e))
                        return e;
                    var t, n = ["    ", "   ", "  ", " "], r = 0;
                    return e.replace(/[\n\t]/g, function(e, o) {
                        return "\n" === e ? (r = o + 1,
                        e) : (t = (o - r) % 4,
                        r = o + 1,
                        n[t])
                    })
                }
                function M(e) {
                    return e = m(e),
                    e = k(e, "*_:()[]")
                }
                function k(e, t, n) {
                    var r = "([" + t.replace(/([\[\]\\])/g, "\\$1") + "])";
                    n && (r = "\\\\" + r);
                    var o = new RegExp(r,"g");
                    return e = e.replace(o, P)
                }
                function P(e, t) {
                    var n = t.charCodeAt(0);
                    return "~E" + n + "E"
                }
                var B = this.hooks = new n;
                B.addNoop("plainLinkText"),
                B.addNoop("preConversion"),
                B.addNoop("postNormalization"),
                B.addNoop("preBlockGamut"),
                B.addNoop("postBlockGamut"),
                B.addNoop("preSpanGamut"),
                B.addNoop("postSpanGamut"),
                B.addNoop("postConversion");
                var U, z, F, H;
                t = t || {};
                var Y = e
                  , W = e;
                t.nonAsciiLetters && !function() {
                    var e = /[Q\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376-\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0523\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0621-\u064a\u0660-\u0669\u066e-\u066f\u0671-\u06d3\u06d5\u06e5-\u06e6\u06ee-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07c0-\u07ea\u07f4-\u07f5\u07fa\u0904-\u0939\u093d\u0950\u0958-\u0961\u0966-\u096f\u0971-\u0972\u097b-\u097f\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc-\u09dd\u09df-\u09e1\u09e6-\u09f1\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a66-\u0a6f\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0-\u0ae1\u0ae6-\u0aef\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b35-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b66-\u0b6f\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0be6-\u0bef\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58-\u0c59\u0c60-\u0c61\u0c66-\u0c6f\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0-\u0ce1\u0ce6-\u0cef\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d3d\u0d60-\u0d61\u0d66-\u0d6f\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32-\u0e33\u0e40-\u0e46\u0e50-\u0e59\u0e81-\u0e82\u0e84\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa-\u0eab\u0ead-\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0ed0-\u0ed9\u0edc-\u0edd\u0f00\u0f20-\u0f29\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8b\u1000-\u102a\u103f-\u1049\u1050-\u1055\u105a-\u105d\u1061\u1065-\u1066\u106e-\u1070\u1075-\u1081\u108e\u1090-\u1099\u10a0-\u10c5\u10d0-\u10fa\u10fc\u1100-\u1159\u115f-\u11a2\u11a8-\u11f9\u1200-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u1676\u1681-\u169a\u16a0-\u16ea\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u17e0-\u17e9\u1810-\u1819\u1820-\u1877\u1880-\u18a8\u18aa\u1900-\u191c\u1946-\u196d\u1970-\u1974\u1980-\u19a9\u19c1-\u19c7\u19d0-\u19d9\u1a00-\u1a16\u1b05-\u1b33\u1b45-\u1b4b\u1b50-\u1b59\u1b83-\u1ba0\u1bae-\u1bb9\u1c00-\u1c23\u1c40-\u1c49\u1c4d-\u1c7d\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u203f-\u2040\u2054\u2071\u207f\u2090-\u2094\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2183-\u2184\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2c6f\u2c71-\u2c7d\u2c80-\u2ce4\u2d00-\u2d25\u2d30-\u2d65\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3006\u3031-\u3035\u303b-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31b7\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fc3\ua000-\ua48c\ua500-\ua60c\ua610-\ua62b\ua640-\ua65f\ua662-\ua66e\ua67f-\ua697\ua717-\ua71f\ua722-\ua788\ua78b-\ua78c\ua7fb-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8d0-\ua8d9\ua900-\ua925\ua930-\ua946\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa50-\uaa59\uac00-\ud7a3\uf900-\ufa2d\ufa30-\ufa6a\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe33-\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]/g
                      , t = "Q".charCodeAt(0)
                      , n = "A".charCodeAt(0)
                      , r = "Z".charCodeAt(0)
                      , o = "a".charCodeAt(0) - r - 1;
                    Y = function(i) {
                        return i.replace(e, function(e) {
                            for (var i, a = e.charCodeAt(0), l = ""; a > 0; )
                                i = a % 51 + n,
                                i >= t && i++,
                                i > r && (i += o),
                                l = String.fromCharCode(i) + l,
                                a = a / 51 | 0;
                            return "Q" + l + "Q"
                        })
                    }
                    ,
                    W = function(e) {
                        return e.replace(/Q([A-PR-Za-z]{1,3})Q/g, function(e, i) {
                            for (var a, l = 0, s = 0; s < i.length; s++)
                                a = i.charCodeAt(s),
                                a > r && (a -= o),
                                a > t && a--,
                                a -= n,
                                l = 51 * l + a;
                            return String.fromCharCode(l)
                        })
                    }
                }();
                var G = t.asteriskIntraWordEmphasis ? A : y;
                this.makeHtml = function(e) {
                    if (U)
                        throw new Error("Recursive call to converter.makeHtml");
                    return U = new o,
                    z = new o,
                    F = [],
                    H = 0,
                    e = B.preConversion(e),
                    e = e.replace(/~/g, "~T"),
                    e = e.replace(/\$/g, "~D"),
                    e = e.replace(/\r\n/g, "\n"),
                    e = e.replace(/\r/g, "\n"),
                    e = "\n\n" + e + "\n\n",
                    e = R(e),
                    e = e.replace(/^[ \t]+$/gm, ""),
                    e = B.postNormalization(e),
                    e = i(e),
                    e = r(e),
                    e = s(e),
                    e = I(e),
                    e = e.replace(/~D/g, "$$"),
                    e = e.replace(/~T/g, "~"),
                    e = B.postConversion(e),
                    F = z = U = null ,
                    e
                }
                ;
                var q = function(e) {
                    return s(e)
                }
                  , V = "[-A-Z0-9+&@#/%?=~_|[\\]()!:,.;]"
                  , Z = "[-A-Z0-9+&@#/%=~_|[\\])]"
                  , K = new RegExp('(="|<)?\\b(https?|ftp)(://' + V + "*" + Z + ")(?=$|\\W)","gi")
                  , j = new RegExp(Z,"i")
            }
        }(),
        t.exports = r
    }
    , {}],
    55: [function(e, t, n) {
        "use strict";
        var r = {};
        !function() {
            function e(e) {
                return e.replace(/^\s+|\s+$/g, "")
            }
            function t(e) {
                return e.replace(/\s+$/g, "")
            }
            function n(e) {
                return e.replace(new RegExp("^(\\t|[ ]{1,4})","gm"), "")
            }
            function o(e, t) {
                return e.indexOf(t) != -1
            }
            function i(e, t) {
                return e.replace(/<[^>]*>?/gi, function(e) {
                    return e.match(t) ? e : ""
                })
            }
            function a(e, t) {
                for (var n = {}, r = 0; r < e.length; r++)
                    n[e[r]] = e[r];
                for (r = 0; r < t.length; r++)
                    n[t[r]] = t[r];
                var o = [];
                for (var i in n)
                    n.hasOwnProperty(i) && o.push(n[i]);
                return o
            }
            function l(e) {
                return "" != e.charAt(0) && (e = "" + e),
                "" != e.charAt(e.length - 1) && (e += ""),
                e
            }
            function s(e) {
                return "" == e.charAt(0) && (e = e.substr(1)),
                "" == e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)),
                e
            }
            function d(e, t) {
                return i(c(e, t), h)
            }
            function c(e, t) {
                var n = t.blockGamutHookCallback(e);
                return n = g(n),
                n = n.replace(/~D/g, "$$").replace(/~T/g, "~"),
                n = t.previousPostConversion(n)
            }
            function u(e) {
                return e.replace(/\\\|/g, "~I").replace(/\\:/g, "~i")
            }
            function f(e) {
                return e.replace(/~I/g, "|").replace(/~i/g, ":")
            }
            function g(e) {
                return e = e.replace(/~E(\d+)E/g, function(e, t) {
                    var n = parseInt(t);
                    return String.fromCharCode(n)
                })
            }
            function m(e) {
                return e.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            }
            function p(e, t) {
                var n = t;
                return n = n.replace(/&\#8220;/g, '"'),
                n = n.replace(/&\#8221;/g, '"'),
                n = n.replace(/&\#8216;/g, "'"),
                n = n.replace(/&\#8217;/g, "'"),
                n = n.replace(/&\#8212;/g, "---"),
                n = n.replace(/&\#8211;/g, "--"),
                n = n.replace(/&\#8230;/g, "...")
            }
            var h = new RegExp(["^(<\\/?(a|abbr|acronym|applet|area|b|basefont|", "bdo|big|button|cite|code|del|dfn|em|figcaption|", "font|i|iframe|img|input|ins|kbd|label|map|", "mark|meter|object|param|progress|q|ruby|rp|rt|s|", "samp|script|select|small|span|strike|strong|", "sub|sup|textarea|time|tt|u|var|wbr|ul|ol|li)[^>]*>|", "<(br)\\s?\\/?>)$"].join(""),"i");
            Array.indexOf || (Array.prototype.indexOf = function(e) {
                for (var t = 0; t < this.length; t++)
                    if (this[t] == e)
                        return t;
                return -1
            }
            ),
            r.Extra = function() {
                this.converter = null ,
                this.hashBlocks = [],
                this.footnotes = {},
                this.usedFootnotes = [],
                this.attributeBlocks = !1,
                this.googleCodePrettify = !1,
                this.highlightJs = !1,
                this.codeMirror = !1,
                this.tableClass = "",
                this.tabWidth = 4
            }
            ,
            r.Extra.init = function(e, t) {
                var n = new r.Extra
                  , i = []
                  , a = []
                  , l = []
                  , s = ["unHashExtraBlocks"];
                return t = t || {},
                t.extensions = t.extensions || ["all"],
                o(t.extensions, "all") && (t.extensions = ["tables", "fenced_code_gfm", "def_list", "attr_list", "footnotes", "smartypants", "todo_list", "strikethrough", "newlines"]),
                a.push("wrapHeaders"),
                o(t.extensions, "todo_list") && a.push("todo_list"),
                o(t.extensions, "attr_list") && (i.push("hashFcbAttributeBlocks"),
                a.push("hashHeaderAttributeBlocks"),
                s.push("applyAttributeBlocks"),
                n.attributeBlocks = !0),
                o(t.extensions, "fenced_code_gfm") && (a.push("fencedCodeBlocks"),
                i.push("fencedCodeBlocks")),
                o(t.extensions, "tables") && a.push("tables"),
                o(t.extensions, "def_list") && a.push("definitionLists"),
                o(t.extensions, "footnotes") && (i.push("stripFootnoteDefinitions"),
                a.push("doFootnotes"),
                s.push("printFootnotes")),
                o(t.extensions, "smartypants") && s.push("runSmartyPants"),
                o(t.extensions, "strikethrough") && l.push("strikethrough"),
                o(t.extensions, "newlines") && l.push("newlines"),
                e.hooks.chain("postNormalization", function(e) {
                    return n.doTransform(i, e) + "\n"
                }),
                e.hooks.chain("preBlockGamut", function(e, t) {
                    return n.blockGamutHookCallback = t,
                    e = u(e),
                    e = n.doTransform(a, e) + "\n",
                    e = f(e)
                }),
                e.hooks.chain("postSpanGamut", function(e) {
                    return n.doTransform(l, e)
                }),
                n.previousPostConversion = e.hooks.postConversion,
                e.hooks.chain("postConversion", function(e) {
                    return e = n.doTransform(s, e),
                    n.hashBlocks = [],
                    n.footnotes = {},
                    n.usedFootnotes = [],
                    e
                }),
                "highlighter" in t && (n.googleCodePrettify = "prettify" === t.highlighter,
                n.highlightJs = "highlight" === t.highlighter,
                n.codeMirror = "codeMirror" === t.highlighter),
                "table_class" in t && (n.tableClass = t.table_class),
                n.converter = e,
                n
            }
            ,
            r.Extra.prototype.doTransform = function(e, t) {
                for (var n = 0; n < e.length; n++)
                    t = this[e[n]](t);
                return t
            }
            ,
            r.Extra.prototype.hashExtraBlock = function(e) {
                return "\n<p>~X" + (this.hashBlocks.push(e) - 1) + "X</p>\n"
            }
            ,
            r.Extra.prototype.hashExtraInline = function(e) {
                return "~X" + (this.hashBlocks.push(e) - 1) + "X"
            }
            ,
            r.Extra.prototype.unHashExtraBlocks = function(e) {
                function t() {
                    var r = !1;
                    e = e.replace(/(?:<p>)?~X(\d+)X(?:<\/p>)?/g, function(e, t) {
                        r = !0;
                        var o = parseInt(t, 10);
                        return n.hashBlocks[o]
                    }),
                    r === !0 && t()
                }
                var n = this;
                return t(),
                e
            }
            ,
            r.Extra.prototype.wrapHeaders = function(e) {
                function t(e) {
                    return "\n" + e + "\n"
                }
                return e = e.replace(/^.+[ \t]*\n=+[ \t]*\n+/gm, t),
                e = e.replace(/^.+[ \t]*\n-+[ \t]*\n+/gm, t),
                e = e.replace(/^\#{1,6}[ \t]*.+?[ \t]*\#*\n+/gm, t)
            }
            ;
            var v = "\\{[ \\t]*((?:[#.][-_:a-zA-Z0-9]+[ \\t]*)+)\\}"
              , b = new RegExp("^(#{1,6}.*#{0,6})[ \\t]+" + v + "[ \\t]*(?:\\n|0x03)","gm")
              , C = new RegExp("^(.*)[ \\t]+" + v + "[ \\t]*\\n(?=[\\-|=]+\\s*(?:\\n|0x03))","gm")
              , E = new RegExp("^(```[ \\t]*[^{\\s]*)[ \\t]+" + v + "[ \\t]*\\n(?=([\\s\\S]*?)\\n```[ \\t]*(\\n|0x03))","gm");
            r.Extra.prototype.hashHeaderAttributeBlocks = function(e) {
                function t(e, t, r) {
                    return "<p>~XX" + (n.hashBlocks.push(r) - 1) + "XX</p>\n" + t + "\n"
                }
                var n = this;
                return e = e.replace(b, t),
                e = e.replace(C, t)
            }
            ,
            r.Extra.prototype.hashFcbAttributeBlocks = function(e) {
                function t(e, t, r) {
                    return "<p>~XX" + (n.hashBlocks.push(r) - 1) + "XX</p>\n" + t + "\n"
                }
                var n = this;
                return e.replace(E, t)
            }
            ,
            r.Extra.prototype.applyAttributeBlocks = function(e) {
                var t = this
                  , n = new RegExp('<p>~XX(\\d+)XX</p>[\\s]*(?:<(h[1-6]|pre)(?: +class="(\\S+)")?(>[\\s\\S]*?</\\2>))',"gm");
                return e = e.replace(n, function(e, n, r, o, i) {
                    if (!r)
                        return "";
                    for (var l = parseInt(n, 10), s = t.hashBlocks[l], d = s.match(/#[^\s#.]+/g) || [], c = d[0] ? ' id="' + d[0].substr(1, d[0].length - 1) + '"' : "", u = s.match(/\.[^\s#.]+/g) || [], f = 0; f < u.length; f++)
                        u[f] = u[f].substr(1, u[f].length - 1);
                    var g = "";
                    return o && (u = a(u, [o])),
                    u.length > 0 && (g = ' class="' + u.join(" ") + '"'),
                    "<" + r + c + g + i
                })
            }
            ,
            r.Extra.prototype.tables = function(t) {
                function n(t, n, o, i, a, l) {
                    n = n.replace(/^ *[|]/m, ""),
                    o = o.replace(/^ *[|]/m, ""),
                    i = i.replace(/^ *[|]/gm, ""),
                    n = n.replace(/[|] *$/m, ""),
                    o = o.replace(/[|] *$/m, ""),
                    i = i.replace(/[|] *$/gm, "");
                    for (var s = o.split(/ *[|] */), c = [], u = 0; u < s.length; u++) {
                        var f = s[u];
                        f.match(/^ *-+: *$/m) ? c[u] = ' align="right"' : f.match(/^ *:-+: *$/m) ? c[u] = ' align="center"' : f.match(/^ *:-+ *$/m) ? c[u] = ' align="left"' : c[u] = ""
                    }
                    var g = n.split(/ *[|] */)
                      , m = g.length
                      , p = r.tableClass ? ' class="' + r.tableClass + '"' : ""
                      , h = ["<table", p, ">\n", "<thead>\n", "<tr>\n"].join("");
                    for (u = 0; u < m; u++) {
                        var v = d(e(g[u]), r);
                        h += ["  <th", c[u], ">", v, "</th>\n"].join("")
                    }
                    h += "</tr>\n</thead>\n";
                    var b = i.split("\n");
                    for (u = 0; u < b.length; u++)
                        if (!b[u].match(/^\s*$/)) {
                            for (var C = b[u].split(/ *[|] */), E = m - C.length, T = 0; T < E; T++)
                                C.push("");
                            for (h += "<tr>\n",
                            T = 0; T < m; T++) {
                                var S = d(e(C[T]), r);
                                h += ["  <td", c[T], ">", S, "</td>\n"].join("")
                            }
                            h += "</tr>\n"
                        }
                    return h += "</table>\n",
                    r.hashExtraBlock(h)
                }
                var r = this
                  , o = new RegExp(["^", "[ ]{0,3}", "[|]", "(.+)\\n", "[ ]{0,3}", "[|]([ ]*[-:]+[-| :]*)\\n", "(", "(?:[ ]*[|].*\\n?)*", ")", "(?:\\n|$)"].join(""),"gm")
                  , i = new RegExp(["^", "[ ]{0,3}", "(\\S.*[|].*)\\n", "[ ]{0,3}", "([-:]+[ ]*[|][-| :]*)\\n", "(", "(?:.*[|].*\\n?)*", ")", "(?:\\n|$)"].join(""),"gm");
                return t = t.replace(o, n),
                t = t.replace(i, n)
            }
            ,
            r.Extra.prototype.stripFootnoteDefinitions = function(e) {
                var t = this;
                return e = e.replace(/\n[ ]{0,3}\[\^(.+?)\]\:[ \t]*\n?([\s\S]*?)\n{1,2}((?=\n[ ]{0,3}\S)|$)/g, function(e, n, r) {
                    return n = m(n),
                    r += "\n",
                    r = r.replace(/^[ ]{0,3}/g, ""),
                    t.footnotes[n] = r,
                    "\n"
                })
            }
            ,
            r.Extra.prototype.doFootnotes = function(e) {
                var t = this;
                if (t.isConvertingFootnote === !0)
                    return e;
                var n = 0;
                return e = e.replace(/\[\^(.+?)\]/g, function(e, r) {
                    var o = m(r)
                      , i = t.footnotes[o];
                    if (void 0 === i)
                        return e;
                    n++,
                    t.usedFootnotes.push(o);
                    var a = '<a href="#fn_' + o + '" id="fnref_' + o + '" title="See footnote" class="footnote">' + n + "</a>";
                    return t.hashExtraInline(a)
                })
            }
            ,
            r.Extra.prototype.printFootnotes = function(e) {
                var t = this;
                if (0 === t.usedFootnotes.length)
                    return e;
                e += '\n\n<div class="footnotes">\n<hr>\n<ol>\n\n';
                for (var n = 0; n < t.usedFootnotes.length; n++) {
                    var r = t.usedFootnotes[n]
                      , o = t.footnotes[r];
                    t.isConvertingFootnote = !0;
                    var i = d(o, t);
                    delete t.isConvertingFootnote,
                    e += '<li id="fn_' + r + '">' + i + ' <a href="#fnref_' + r + '" title="Return to article" class="reversefootnote">&#8617;</a></li>\n\n'
                }
                return e += "</ol>\n</div>"
            }
            ,
            r.Extra.prototype.fencedCodeBlocks = function(e) {
                function t(e) {
                    return e = e.replace(/&/g, "&amp;"),
                    e = e.replace(/</g, "&lt;"),
                    e = e.replace(/>/g, "&gt;"),
                    e = e.replace(/~D/g, "$$"),
                    e = e.replace(/~T/g, "~")
                }
                var n = this;
                return e = e.replace(/(?:^|\n)```[ \t]*(\S*)[ \t]*\n([\s\S]*?)\n```[ \t]*(?=\n)/g, function(e, r, o) {
                    var i, a = r.replace(";", ",").split(","), l = o, s = a[0].trim();
                    a.length > 1 && (i = a[1].trim());
                    var d, c, u;
                    return "flow" === s || "seq" === s || "sequence" === s ? (c = ' class="language-' + s + '"',
                    u = ['<pre><textarea readonly style="display:none;"', c, ">", t(l), "</textarea></pre>"].join("")) : n.codeMirror ? u = ['<div class="wiz-code-container" contenteditable="false"', ' data-mode="', s, '" data-theme="', i, '"><textarea readonly style="display:none;">', t(l), "</textarea></div>"].join("") : (d = n.googleCodePrettify ? ' class="prettyprint linenums"' : "",
                    c = "",
                    s && (c = n.codeMirror || n.googleCodePrettify || n.highlightJs ? ' class="language-' + s + '"' : ' class="' + s + '"'),
                    u = ["<pre", d, "><code", c, ">", t(l), "</code></pre>"].join("")),
                    n.hashExtraBlock(u)
                })
            }
            ,
            r.Extra.prototype.educatePants = function(e) {
                var t = this
                  , n = ""
                  , r = 0;
                e.replace(/(?:<!--[\s\S]*?-->)|(<)([a-zA-Z1-6]+)([^\n]*?>)([\s\S]*?)(<\/\2>)/g, function(o, i, a, l, s, d, c) {
                    var u = e.substring(r, c);
                    return n += t.applyPants(u),
                    t.smartyPantsLastChar = n.substring(n.length - 1),
                    r = c + o.length,
                    i ? (/code|kbd|pre|script|noscript|iframe|math|ins|del|pre/i.test(a) ? t.smartyPantsLastChar = s.substring(s.length - 1) : s = t.educatePants(s),
                    void (n += i + a + l + s + d)) : void (n += o)
                });
                var o = e.substring(r);
                return n += t.applyPants(o),
                t.smartyPantsLastChar = n.substring(n.length - 1),
                n
            }
            ,
            r.Extra.prototype.applyPants = function(e) {
                return e
            }
            ,
            r.Extra.prototype.runSmartyPants = function(e) {
                return this.smartyPantsLastChar = "",
                e = this.educatePants(e),
                e = e.replace(/(<([a-zA-Z1-6]+)\b([^\n>]*?)(\/)?>)/g, p)
            }
            ,
            r.Extra.prototype.definitionLists = function(t) {
                var n = new RegExp(["(\\x02\\n?|\\n\\n)", "(?:", "(", "(", "[ ]{0,3}", "((?:[ \\t]*\\S.*\\n)+)", "\\n?", "[ ]{0,3}:[ ]+", ")", "([\\s\\S]+?)", "(", "(?=\\0x03)", "|", "(?=", "\\n{2,}", "(?=\\S)", "(?!", "[ ]{0,3}", "(?:\\S.*\\n)+?", "\\n?", "[ ]{0,3}:[ ]+", ")", "(?!", "[ ]{0,3}:[ ]+", ")", ")", ")", ")", ")"].join(""),"gm")
                  , r = this;
                return t = l(t),
                t = t.replace(n, function(t, n, o) {
                    var i = e(r.processDefListItems(o));
                    return i = "<dl>\n" + i + "\n</dl>",
                    n + r.hashExtraBlock(i) + "\n\n"
                }),
                s(t)
            }
            ,
            r.Extra.prototype.processDefListItems = function(r) {
                var o = this
                  , i = new RegExp(["(\\x02\\n?|\\n\\n+)", "(", "[ ]{0,3}", "(?![:][ ]|[ ])", "(?:\\S.*\\n)+?", ")", "(?=\\n?[ ]{0,3}:[ ])"].join(""),"gm")
                  , a = new RegExp(["\\n(\\n+)?", "(", "[ ]{0,3}", "[:][ ]+", ")", "([\\s\\S]+?)", "(?=\\n*", "(?:", "\\n[ ]{0,3}[:][ ]|", "<dt>|\\x03", ")", ")"].join(""),"gm");
                return r = l(r),
                r = r.replace(/\n{2,}(?=\\x03)/, "\n"),
                r = r.replace(i, function(t, n, r) {
                    for (var i = e(r).split("\n"), a = "", l = 0; l < i.length; l++) {
                        var s = i[l];
                        s = d(e(s), o),
                        a += "\n<dt>" + s + "</dt>"
                    }
                    return a + "\n"
                }),
                r = r.replace(a, function(e, r, i, a) {
                    return r || a.match(/\n{2,}/) ? (a = Array(i.length + 1).join(" ") + a,
                    a = n(a) + "\n\n",
                    a = "\n" + c(a, o) + "\n") : (a = t(a),
                    a = d(n(a), o)),
                    "\n<dd>" + a + "</dd>\n"
                }),
                s(r)
            }
            ,
            r.Extra.prototype.todo_list = function(e) {
                return e.replace(/^([ ]*)\[ \]/g, "$1<input type='checkbox' disabled class='wiz-md-todo-checkbox'>").replace(/^([ ]*)\[x\]/g, "$1<input type='checkbox' disabled checked class='wiz-md-todo-checkbox'>")
            }
            ,
            r.Extra.prototype.strikethrough = function(e) {
                return e.replace(/~T~T(?=\S)([^\r]*?\S[\*_]*)~T~T/g, "<del>$1</del>")
            }
            ,
            r.Extra.prototype.newlines = function(e) {
                return e.replace(/(<(?:br|\/li)>)?\n/g, function(e, t) {
                    return t ? e : " <br>\n"
                })
            }
        }(),
        t.exports = r.Extra
    }
    , {}],
    56: [function(e, t, n) {
        "use strict";
        var r, o = {}, i = o.Base64, a = "2.1.8";
        "undefined" != typeof t && t.exports && (r = e("buffer").Buffer);
        var l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , s = function(e) {
            for (var t = {}, n = 0, r = e.length; n < r; n++)
                t[e.charAt(n)] = n;
            return t
        }(l)
          , d = String.fromCharCode
          , c = function(e) {
            if (e.length < 2) {
                var t = e.charCodeAt(0);
                return t < 128 ? e : t < 2048 ? d(192 | t >>> 6) + d(128 | 63 & t) : d(224 | t >>> 12 & 15) + d(128 | t >>> 6 & 63) + d(128 | 63 & t)
            }
            var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
            return d(240 | t >>> 18 & 7) + d(128 | t >>> 12 & 63) + d(128 | t >>> 6 & 63) + d(128 | 63 & t)
        }
          , u = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
          , f = function(e) {
            return e.replace(u, c)
        }
          , g = function(e) {
            var t = [0, 2, 1][e.length % 3]
              , n = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0)
              , r = [l.charAt(n >>> 18), l.charAt(n >>> 12 & 63), t >= 2 ? "=" : l.charAt(n >>> 6 & 63), t >= 1 ? "=" : l.charAt(63 & n)];
            return r.join("")
        }
          , m = o.btoa ? function(e) {
            return o.btoa(e)
        }
         : function(e) {
            return e.replace(/[\s\S]{1,3}/g, g)
        }
          , p = r ? function(e) {
            return (e.constructor === r.constructor ? e : new r(e)).toString("base64")
        }
         : function(e) {
            return m(f(e))
        }
          , h = function(e, t) {
            return t ? p(String(e)).replace(/[+\/]/g, function(e) {
                return "+" == e ? "-" : "_"
            }).replace(/=/g, "") : p(String(e))
        }
          , v = function(e) {
            return h(e, !0)
        }
          , b = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"),"g")
          , C = function(e) {
            switch (e.length) {
            case 4:
                var t = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)
                  , n = t - 65536;
                return d((n >>> 10) + 55296) + d((1023 & n) + 56320);
            case 3:
                return d((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
            default:
                return d((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
            }
        }
          , E = function(e) {
            return e.replace(b, C)
        }
          , T = function(e) {
            var t = e.length
              , n = t % 4
              , r = (t > 0 ? s[e.charAt(0)] << 18 : 0) | (t > 1 ? s[e.charAt(1)] << 12 : 0) | (t > 2 ? s[e.charAt(2)] << 6 : 0) | (t > 3 ? s[e.charAt(3)] : 0)
              , o = [d(r >>> 16), d(r >>> 8 & 255), d(255 & r)];
            return o.length -= [0, 0, 2, 1][n],
            o.join("")
        }
          , S = o.atob ? function(e) {
            return o.atob(e)
        }
         : function(e) {
            return e.replace(/[\s\S]{1,4}/g, T)
        }
          , y = r ? function(e) {
            return (e.constructor === r.constructor ? e : new r(e,"base64")).toString()
        }
         : function(e) {
            return E(S(e))
        }
          , A = function(e) {
            return y(String(e).replace(/[-_]/g, function(e) {
                return "-" == e ? "+" : "/"
            }).replace(/[^A-Za-z0-9\+\/]/g, ""))
        }
          , N = function() {
            var e = o.Base64;
            return o.Base64 = i,
            e
        }
        ;
        if (o.Base64 = {
            VERSION: a,
            atob: S,
            btoa: m,
            fromBase64: A,
            toBase64: h,
            utob: f,
            encode: h,
            encodeURI: v,
            btou: E,
            decode: A,
            noConflict: N
        },
        "function" == typeof Object.defineProperty) {
            var _ = function(e) {
                return {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }
            ;
            o.Base64.extendString = function() {
                Object.defineProperty(String.prototype, "fromBase64", _(function() {
                    return A(this)
                })),
                Object.defineProperty(String.prototype, "toBase64", _(function(e) {
                    return h(this, e)
                })),
                Object.defineProperty(String.prototype, "toBase64URI", _(function() {
                    return h(this, !0)
                }))
            }
        }
        t.exports = o.Base64
    }
    , {
        buffer: 2
    }],
    57: [function(e, t, n) {
        "use strict";
        function r(e, t, n) {
            l.load(e, t, n)
        }
        function o(e, t, n) {
            var o = 0
              , i = t.length
              , a = function a() {
                o < i ? r(e, t[o++], a) : n && n()
            }
            ;
            return a
        }
        function i(e, t) {
            var n = "wiz_" + t;
            if (e.getElementById(n))
                return !0;
            var r = e.createElement("link");
            return r.rel = "stylesheet",
            r.setAttribute("charset", "utf-8"),
            r.setAttribute("name", a.NAME.TMP_STYLE),
            r.href = t.replace(/\\/g, "/"),
            r.id = n,
            e.getElementsByTagName("head")[0].insertBefore(r, null ),
            r
        }
        var a = e("../config/const")
          , l = e("./scriptLoader")
          , s = {
            getDependencyFiles: function(e, t, n) {
                var r = void 0
                  , o = void 0
                  , i = void 0
                  , a = void 0
                  , l = void 0
                  , s = void 0
                  , d = void 0
                  , c = [];
                for (r = 0,
                o = e[t][n].length; r < o; r++)
                    if (i = e[t][n][r],
                    "css" === t)
                        c.push(e.files[t][i]);
                    else {
                        for (d = [],
                        a = 0,
                        l = i.length; a < l; a++)
                            s = i[a],
                            d.push(e.files[t][s]);
                        c.push(d)
                    }
                return c
            },
            loadJs: function(e, t, n) {
                var r = o(e, t, n);
                r()
            },
            loadCss: function(e, t) {
                var n = void 0
                  , r = void 0;
                for (n = 0,
                r = t.length; n < r; n++)
                    i(e, t[n])
            }
        };
        t.exports = s
    }
    , {
        "../config/const": 51,
        "./scriptLoader": 58
    }],
    58: [function(e, t, n) {
        "use strict";
        function r(e, t) {
            return l[e] || (l[e] = 0),
            l[e]++,
            function() {
                l[e]--,
                0 === l[e] && (l[e] = null ,
                t && t())
            }
        }
        function o(e) {
            return "wiz_js_" + e
        }
        function i(e) {
            if (e) {
                var t = {
                    version: e.version,
                    jsStr: e.jsStr
                };
                localStorage.setItem(e.id, JSON.stringify(t))
            }
        }
        var a = {
            appendJsCode: function(e, t, n) {
                var r = e.createElement("script");
                r.type = n,
                r.text = t,
                e.getElementsByTagName("head")[0].appendChild(r)
            },
            load: function(e, t, n) {
                if (e && t) {
                    var l = void 0
                      , s = void 0
                      , d = void 0
                      , c = void 0
                      , u = (new Date).valueOf()
                      , f = !0;
                    for (l = 0,
                    s = t.length; l < s; l++)
                        if ("string" == typeof t[l])
                            d = this.loadSingleJs(e, t[l]),
                            d !== !0 && (d.onload = r(u, n),
                            f = !1);
                        else {
                            var g = t[l].link
                              , m = o(t[l].id)
                              , p = t[l].version;
                            if (window.localStorage) {
                                var h = JSON.parse(localStorage.getItem(m));
                                h && h.version === p ? (d = this.inject(e, h.jsStr, m),
                                d !== !0 && (c = r(u, n),
                                setTimeout(function() {
                                    c()
                                }, 10),
                                f = !1)) : (f = !1,
                                c = r(u, n),
                                $.ajax({
                                    url: g,
                                    context: {
                                        id: m,
                                        version: p
                                    },
                                    success: function(t) {
                                        i({
                                            id: this.id,
                                            version: this.version,
                                            jsStr: t
                                        }),
                                        d = a.inject(e, t, this.id),
                                        d !== !0 && setTimeout(function() {
                                            c()
                                        }, 10)
                                    },
                                    error: function() {
                                        c()
                                    }
                                }))
                            } else
                                d = this.loadSingleJs(e, t[l].link),
                                d !== !0 && (d.onload = r(u, n),
                                f = !1)
                        }
                    f && n()
                }
            },
            loadSingleJs: function(e, t) {
                var n = "wiz_" + t;
                if (e.getElementById(n))
                    return !0;
                var r = e.createElement("script");
                return r.type = "text/javascript",
                r.setAttribute("charset", "utf-8"),
                r.src = t.replace(/\\/g, "/"),
                r.id = n,
                e.getElementsByTagName("head")[0].insertBefore(r, null ),
                r
            },
            inject: function(e, t, n) {
                if (!e || e.getElementById(n))
                    return !0;
                var r = e.createElement("script");
                return r.type = "text/javascript",
                r.id = n,
                r.text = t,
                e.getElementsByTagName("head")[0].insertBefore(r, null ),
                r
            }
        }
          , l = {};
        t.exports = a
    }
    , {}],
    59: [function(e, t, n) {
        "use strict";
        var r = e("../config/const");
        try {
            "abc".localeCompare("abcd")
        } catch (e) {
            String.prototype.localeCompare = function(e) {
                return this.toString() === e ? 0 : this.toString() > e ? 1 : -1
            }
        }
        var o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        "wiz".trim || (String.prototype.trim = function() {
            return this.replace(o, "")
        }
        );
        var i = /[\-\[\]{}()*+?.,\\^$|#\s]/g;
        try {
            "abc".escapeRegex("abcd")
        } catch (e) {
            String.prototype.escapeRegex = function() {
                return this.toString().replace(i, "\\$&")
            }
        }
        Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++)
                if (this[t] === e)
                    return t;
            return -1
        }
        );
        var a = {
            checkNonTxtKey: function(e) {
                var t = e.keyCode || e.which;
                return !(!e.ctrlKey && !e.metaKey) || !(t >= 48 && t <= 57 || t >= 65 && t <= 90 || t >= 96 && t <= 107 || t >= 109 && t <= 111 || t >= 186 && t <= 192 || t >= 219 && t <= 222 || 229 === t || 0 === t || 13 === t || 32 === t)
            },
            isArray: function(e) {
                return "[object Array]" === Object.prototype.toString.apply(e)
            },
            isEmpty: function(e) {
                if (!e)
                    return !0;
                var t = /\r?\n/gi
                  , n = new RegExp("[\r\n" + r.FILL_CHAR + "]","ig")
                  , o = t.test(e)
                  , i = e.replace(n, "")
                  , a = 0 === e.replace(n, "").trim().length;
                return 0 === i.length || o && a
            },
            isSameAmendTime: function(e, t) {
                if (!e || !t)
                    return !1;
                var n = a.getDateForTimeStr(e)
                  , o = a.getDateForTimeStr(t);
                return Math.abs(n - o) <= r.AMEND_BATCH_TIME_SPACE
            },
            checkChar: function(e, t) {
                var n = void 0
                  , r = void 0
                  , o = void 0
                  , i = void 0;
                for (n = 0,
                r = t.length; n < r; n++) {
                    if (o = t[n][0],
                    i = t[n].length > 1 ? t[n][1] : null ,
                    null  === i && e === o)
                        return !0;
                    if (null  !== i && e >= o && e <= i)
                        return !0
                }
                return !1
            },
            compareVersion: function(e, t) {
                e = e.split("."),
                t = t.split(".");
                var n = void 0
                  , r = void 0
                  , o = void 0
                  , i = void 0;
                for (n = 0,
                r = e.length; n < r; n++) {
                    if (o = parseInt(e[n], 10),
                    i = t[n] ? parseInt(t[n], 10) : -1,
                    o < i)
                        return -1;
                    if (o > i)
                        return 1
                }
                return e.length < t.length ? -1 : 0
            },
            isCJK: function(e) {
                var t = [[12352, 12687], [13056, 13183], [13312, 15661], [19968, 40959], [63744, 64255], [44032, 55215]];
                return a.checkChar(e, t)
            },
            isSpace: function(e) {
                var t = [[9, 13], [32], [160]];
                return a.checkChar(e, t)
            },
            isAlpha: function(e) {
                var t = [[48, 57], [65, 90], [97, 122], [192, 214], [216, 246], [248, 256]];
                return a.checkChar(e, t)
            },
            forEach: function(e, t) {
                if (e && t)
                    for (var n = 0; n < e.length; n++)
                        t(e[n], n)
            },
            getWordCount: function(e) {
                var t = {
                    nWords: 0,
                    nChars: 0,
                    nCharsWithSpace: 0,
                    nNonAsianWords: 0,
                    nAsianChars: 0
                };
                if (!e)
                    return t;
                var n = void 0
                  , r = void 0
                  , o = void 0
                  , i = !1
                  , l = !1;
                for (t.nCharsWithSpace = e.length,
                t.nChars = t.nCharsWithSpace,
                n = 0,
                r = e.length; n < r; n++)
                    o = e.charCodeAt(n),
                    i = !1,
                    a.isCJK(o) ? t.nAsianChars++ : a.isSpace(o) ? t.nChars-- : a.isAlpha(o) && (i = !0),
                    i && !l ? l = !0 : i || (l && t.nNonAsianWords++,
                    l = !1);
                return i && l && t.nNonAsianWords++,
                t.nWords = t.nNonAsianWords + t.nAsianChars,
                t
            },
            getEventClientPos: function(e) {
                return {
                    x: e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                    y: e.changedTouches ? e.changedTouches[0].clientY : e.clientY
                }
            },
            getFileNameByUrl: function(e) {
                var t = ""
                  , n = e.lastIndexOf("/");
                return t = n < 0 ? e : e.substr(n + 1)
            },
            getHash: function(e) {
                var t = 1315423911
                  , n = void 0
                  , r = void 0;
                for (n = e.length - 1; n >= 0; n--)
                    r = e.charCodeAt(n),
                    t ^= (t << 5) + r + (t >> 2);
                return 2147483647 & t
            },
            getTime: function() {
                function e(e) {
                    var t = e.toString();
                    return 1 === t.length ? "0" + t : t
                }
                var t = new Date;
                return t.getFullYear() + "-" + e(t.getMonth() + 1) + "-" + e(t.getDate()) + " " + e(t.getHours()) + ":" + e(t.getMinutes()) + ":" + e(t.getSeconds())
            },
            getDateForTimeStr: function(e) {
                return new Date(Date.parse(e.replace(/-/g, "/")))
            },
            listToMap: function(e) {
                if (!e)
                    return {};
                e = a.isArray(e) ? e : e.split(",");
                var t = void 0
                  , n = void 0
                  , r = void 0
                  , o = {};
                for (t = 0,
                n = e.length; t < n; t++)
                    r = e[t],
                    o[r.toUpperCase()] = o[r] = 1;
                return o
            },
            rgb2Hex: function(e) {
                function t(e, t) {
                    return e + Math.floor((255 - e) * (1 - t))
                }
                function n(e) {
                    var t = parseInt(e).toString(16);
                    return 1 === t.length ? "0" + t : t
                }
                if (!e)
                    return "";
                var r = e.replace(/.*\((.*)\)/gi, "$1").split(",");
                if (r.length < 3)
                    return "";
                var o = parseInt(r[0], 10)
                  , i = parseInt(r[1], 10)
                  , a = parseInt(r[2], 10)
                  , l = 4 === r.length ? parseFloat(r[3]) : 1;
                return 0 === l ? "" : "#" + n(t(o, l)) + n(t(i, l)) + n(t(a, l))
            },
            removeDup: function(e) {
                var t = []
                  , n = void 0
                  , r = void 0
                  , o = void 0;
                for (n = 0,
                r = e.length; n < r; n++)
                    o = e[n],
                    t.indexOf(o) < 0 && t.push(o);
                return t
            },
            replaceSpecialChar: function(e) {
                return e = e.replace(new RegExp(String.fromCharCode(160),"g"), " ").replace(String.fromCharCode(65279), "")
            },
            stopEvent: function(e) {
                e && (e.stopPropagation(),
                e.preventDefault())
            },
            txt2HTML: function(e, t) {
                t = t || {};
                var n = !!t.wizTableSaveDom
                  , o = /	/g
                  , i = /  /g
                  , a = /^ /gm;
                e = (e || "").replace(o, "    ").replace(i, "  ").replace(i, "  ").replace(a, " ");
                for (var l = [], s = e.split(/\r?\n/), d = void 0, c = void 0, u = new RegExp(r.WIZ_TABLE_IN_MARKDOWN_SRC_REG), f = /^```/, g = !1, m = 0; m < s.length; m++) {
                    if (d = s[m],
                    n && !g && f.test(d) ? g = !0 : n && g && f.test(d) && (g = !1),
                    n && !g && u.test(d))
                        c = d;
                    else if (d)
                        if (n)
                            c = "<div>" + d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</div>";
                        else {
                            var p = 0 === m ? "span" : "div";
                            c = "<" + p + ">" + d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</" + p + ">"
                        }
                    else
                        c = "<br/>";
                    l.push(c)
                }
                return l.join("")
            }
        };
        t.exports = a
    }
    , {
        "../config/const": 51
    }],
    60: [function(e, t, n) {
        "use strict";
        !function e(t, n, r) {
            function o(a, l) {
                if (!n[a]) {
                    if (!t[a]) {
                        var s = "function" == typeof _require && _require;
                        if (!l && s)
                            return s(a, !0);
                        if (i)
                            return i(a, !0);
                        var d = new Error("Cannot find module '" + a + "'");
                        throw d.code = "MODULE_NOT_FOUND",
                        d
                    }
                    var c = n[a] = {
                        exports: {}
                    };
                    t[a][0].call(c.exports, function(e) {
                        var n = t[a][1][e];
                        return o(n ? n : e)
                    }, c, c.exports, e, t, n, r)
                }
                return n[a].exports
            }
            for (var i = "function" == typeof _require && _require, a = 0; a < r.length; a++)
                o(r[a]);
            return o
        }({
            1: [function(e, t, n) {
                function r() {
                    return {
                        a: ["target", "href", "title"],
                        abbr: ["title"],
                        address: [],
                        area: ["shape", "coords", "href", "alt"],
                        article: [],
                        aside: [],
                        audio: ["autoplay", "controls", "loop", "preload", "src"],
                        b: [],
                        bdi: ["dir"],
                        bdo: ["dir"],
                        big: [],
                        blockquote: ["cite"],
                        br: [],
                        caption: [],
                        center: [],
                        cite: [],
                        code: [],
                        col: ["align", "valign", "span", "width"],
                        colgroup: ["align", "valign", "span", "width"],
                        dd: [],
                        del: ["datetime"],
                        details: ["open"],
                        div: [],
                        dl: [],
                        dt: [],
                        em: [],
                        font: ["color", "size", "face"],
                        footer: [],
                        h1: [],
                        h2: [],
                        h3: [],
                        h4: [],
                        h5: [],
                        h6: [],
                        header: [],
                        hr: [],
                        i: [],
                        img: ["src", "alt", "title", "width", "height"],
                        ins: ["datetime"],
                        li: [],
                        mark: [],
                        nav: [],
                        ol: [],
                        p: [],
                        pre: [],
                        s: [],
                        section: [],
                        small: [],
                        span: [],
                        sub: [],
                        sup: [],
                        strong: [],
                        table: ["width", "border", "align", "valign"],
                        tbody: ["align", "valign"],
                        td: ["width", "rowspan", "colspan", "align", "valign"],
                        tfoot: ["align", "valign"],
                        th: ["width", "rowspan", "colspan", "align", "valign"],
                        thead: ["align", "valign"],
                        tr: ["rowspan", "align", "valign"],
                        tt: [],
                        u: [],
                        ul: [],
                        video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]
                    }
                }
                function o(e, t, n) {}
                function i(e, t, n) {}
                function a(e, t, n) {}
                function l(e, t, n) {}
                function s(e) {
                    return e.replace(N, "&lt;").replace(_, "&gt;")
                }
                function d(e, t, n, r) {
                    if (n = p(n),
                    "href" === t || "src" === t) {
                        if (n = y.trim(n),
                        "#" === n)
                            return "#";
                        if ("http://" !== n.substr(0, 7) && "https://" !== n.substr(0, 8) && "mailto:" !== n.substr(0, 7) && "#" !== n[0] && "/" !== n[0])
                            return ""
                    } else if ("background" === t) {
                        if (x.lastIndex = 0,
                        x.test(n))
                            return ""
                    } else if ("style" === t) {
                        if (R.lastIndex = 0,
                        R.test(n))
                            return "";
                        if (M.lastIndex = 0,
                        M.test(n) && (x.lastIndex = 0,
                        x.test(n)))
                            return "";
                        r !== !1 && (r = r || A,
                        n = r.process(n))
                    }
                    return n = h(n)
                }
                function c(e) {
                    return e.replace(O, "&quot;")
                }
                function u(e) {
                    return e.replace(D, '"')
                }
                function f(e) {
                    return e.replace(L, function(e, t) {
                        return "x" === t[0] || "X" === t[0] ? String.fromCharCode(parseInt(t.substr(1), 16)) : String.fromCharCode(parseInt(t, 10))
                    })
                }
                function g(e) {
                    return e.replace(w, ":").replace(I, " ")
                }
                function m(e) {
                    for (var t = "", n = 0, r = e.length; n < r; n++)
                        t += e.charCodeAt(n) < 32 ? " " : e.charAt(n);
                    return y.trim(t)
                }
                function p(e) {
                    return e = u(e),
                    e = f(e),
                    e = g(e),
                    e = m(e)
                }
                function h(e) {
                    return e = c(e),
                    e = s(e)
                }
                function v() {
                    return ""
                }
                function b(e, t) {
                    function n(t) {
                        return !!r || y.indexOf(e, t) !== -1
                    }
                    "function" != typeof t && (t = function() {}
                    );
                    var r = !Array.isArray(e)
                      , o = []
                      , i = !1;
                    return {
                        onIgnoreTag: function(e, r, a) {
                            if (n(e)) {
                                if (a.isClosing) {
                                    var l = "[/removed]"
                                      , s = a.position + l.length;
                                    return o.push([i !== !1 ? i : a.position, s]),
                                    i = !1,
                                    l
                                }
                                return i || (i = a.position),
                                "[removed]"
                            }
                            return t(e, r, a)
                        },
                        remove: function(e) {
                            var t = ""
                              , n = 0;
                            return y.forEach(o, function(r) {
                                t += e.slice(n, r[0]),
                                n = r[1]
                            }),
                            t += e.slice(n)
                        }
                    }
                }
                function C(e) {
                    return e.replace(k, "")
                }
                function E(e) {
                    var t = e.split("");
                    return t = t.filter(function(e) {
                        var t = e.charCodeAt(0);
                        return 127 !== t && (!(t <= 31) || (10 === t || 13 === t))
                    }),
                    t.join("")
                }
                var T = e("cssfilter").FilterCSS
                  , S = e("cssfilter").getDefaultWhiteList
                  , y = e("./util")
                  , A = new T
                  , N = /</g
                  , _ = />/g
                  , O = /"/g
                  , D = /&quot;/g
                  , L = /&#([a-zA-Z0-9]*);?/gim
                  , w = /&colon;?/gim
                  , I = /&newline;?/gim
                  , x = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi
                  , R = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi
                  , M = /u\s*r\s*l\s*\(.*/gi
                  , k = /<!--[\s\S]*?-->/g;
                n.whiteList = r(),
                n.getDefaultWhiteList = r,
                n.onTag = o,
                n.onIgnoreTag = i,
                n.onTagAttr = a,
                n.onIgnoreTagAttr = l,
                n.safeAttrValue = d,
                n.escapeHtml = s,
                n.escapeQuote = c,
                n.unescapeQuote = u,
                n.escapeHtmlEntities = f,
                n.escapeDangerHtml5Entities = g,
                n.clearNonPrintableCharacter = m,
                n.friendlyAttrValue = p,
                n.escapeAttrValue = h,
                n.onIgnoreTagStripAll = v,
                n.StripTagBody = b,
                n.stripCommentTag = C,
                n.stripBlankChar = E,
                n.cssFilter = A,
                n.getDefaultCSSWhiteList = S
            }
            , {
                "./util": 4,
                cssfilter: 8
            }],
            2: [function(e, t, n) {
                function r(e, t) {
                    var n = new a(t);
                    return n.process(e)
                }
                var o = e("./default")
                  , i = e("./parser")
                  , a = e("./xss");
                n = t.exports = r,
                n.FilterXSS = a;
                for (var l in o)
                    n[l] = o[l];
                for (var l in i)
                    n[l] = i[l];
                "undefined" != typeof window && (window.filterXSS = t.exports)
            }
            , {
                "./default": 1,
                "./parser": 3,
                "./xss": 5
            }],
            3: [function(e, t, n) {
                function r(e) {
                    var t = e.indexOf(" ");
                    if (t === -1)
                        var n = e.slice(1, -1);
                    else
                        var n = e.slice(1, t + 1);
                    return n = u.trim(n).toLowerCase(),
                    "/" === n.slice(0, 1) && (n = n.slice(1)),
                    "/" === n.slice(-1) && (n = n.slice(0, -1)),
                    n
                }
                function o(e) {
                    return "</" === e.slice(0, 2)
                }
                function i(e, t, n) {
                    "user strict";
                    var i = ""
                      , a = 0
                      , l = !1
                      , s = !1
                      , d = 0
                      , c = e.length
                      , u = ""
                      , f = "";
                    for (d = 0; d < c; d++) {
                        var g = e.charAt(d);
                        if (l === !1) {
                            if ("<" === g) {
                                l = d;
                                continue
                            }
                        } else if (s === !1) {
                            if ("<" === g) {
                                i += n(e.slice(a, d)),
                                l = d,
                                a = d;
                                continue
                            }
                            if (">" === g) {
                                i += n(e.slice(a, l)),
                                u = e.slice(l, d + 1),
                                f = r(u),
                                i += t(l, i.length, f, u, o(u)),
                                a = d + 1,
                                l = !1;
                                continue
                            }
                            if (('"' === g || "'" === g) && "=" === e.charAt(d - 1)) {
                                s = g;
                                continue
                            }
                        } else if (g === s) {
                            s = !1;
                            continue
                        }
                    }
                    return a < e.length && (i += n(e.substr(a))),
                    i
                }
                function a(e, t) {
                    "user strict";
                    function n(e, n) {
                        if (e = u.trim(e),
                        e = e.replace(f, "").toLowerCase(),
                        !(e.length < 1)) {
                            var r = t(e, n || "");
                            r && o.push(r)
                        }
                    }
                    for (var r = 0, o = [], i = !1, a = e.length, d = 0; d < a; d++) {
                        var g, m, p = e.charAt(d);
                        if (i !== !1 || "=" !== p)
                            if (i === !1 || d !== r || '"' !== p && "'" !== p || "=" !== e.charAt(d - 1))
                                if (/\s|\n|\t/.test(p)) {
                                    if (i === !1) {
                                        if (m = l(e, d),
                                        m === -1) {
                                            g = u.trim(e.slice(r, d)),
                                            n(g),
                                            i = !1,
                                            r = d + 1;
                                            continue
                                        }
                                        d = m - 1;
                                        continue
                                    }
                                    if (m = s(e, d - 1),
                                    m === -1) {
                                        g = u.trim(e.slice(r, d)),
                                        g = c(g),
                                        n(i, g),
                                        i = !1,
                                        r = d + 1;
                                        continue
                                    }
                                } else
                                    ;
                            else {
                                if (m = e.indexOf(p, d + 1),
                                m === -1)
                                    break;
                                g = u.trim(e.slice(r + 1, m)),
                                n(i, g),
                                i = !1,
                                d = m,
                                r = d + 1
                            }
                        else
                            i = e.slice(r, d),
                            r = d + 1
                    }
                    return r < e.length && (i === !1 ? n(e.slice(r)) : n(i, c(u.trim(e.slice(r))))),
                    u.trim(o.join(" "))
                }
                function l(e, t) {
                    for (; t < e.length; t++) {
                        var n = e[t];
                        if (" " !== n)
                            return "=" === n ? t : -1
                    }
                }
                function s(e, t) {
                    for (; t > 0; t--) {
                        var n = e[t];
                        if (" " !== n)
                            return "=" === n ? t : -1
                    }
                }
                function d(e) {
                    return '"' === e[0] && '"' === e[e.length - 1] || "'" === e[0] && "'" === e[e.length - 1]
                }
                function c(e) {
                    return d(e) ? e.substr(1, e.length - 2) : e
                }
                var u = e("./util")
                  , f = /[^a-zA-Z0-9_:\.\-]/gim;
                n.parseTag = i,
                n.parseAttr = a
            }
            , {
                "./util": 4
            }],
            4: [function(e, t, n) {
                t.exports = {
                    indexOf: function(e, t) {
                        var n, r;
                        if (Array.prototype.indexOf)
                            return e.indexOf(t);
                        for (n = 0,
                        r = e.length; n < r; n++)
                            if (e[n] === t)
                                return n;
                        return -1
                    },
                    forEach: function(e, t, n) {
                        var r, o;
                        if (Array.prototype.forEach)
                            return e.forEach(t, n);
                        for (r = 0,
                        o = e.length; r < o; r++)
                            t.call(n, e[r], r, e)
                    },
                    trim: function(e) {
                        return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "")
                    }
                }
            }
            , {}],
            5: [function(e, t, n) {
                function r(e) {
                    return void 0 === e || null  === e
                }
                function o(e) {
                    var t = e.indexOf(" ");
                    if (t === -1)
                        return {
                            html: "",
                            closing: "/" === e[e.length - 2]
                        };
                    e = f.trim(e.slice(t + 1, -1));
                    var n = "/" === e[e.length - 1];
                    return n && (e = f.trim(e.slice(0, -1))),
                    {
                        html: e,
                        closing: n
                    }
                }
                function i(e) {
                    var t = {};
                    for (var n in e)
                        t[n] = e[n];
                    return t
                }
                function a(e) {
                    e = i(e || {}),
                    e.stripIgnoreTag && (e.onIgnoreTag && console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'),
                    e.onIgnoreTag = s.onIgnoreTagStripAll),
                    e.whiteList = e.whiteList || s.whiteList,
                    e.onTag = e.onTag || s.onTag,
                    e.onTagAttr = e.onTagAttr || s.onTagAttr,
                    e.onIgnoreTag = e.onIgnoreTag || s.onIgnoreTag,
                    e.onIgnoreTagAttr = e.onIgnoreTagAttr || s.onIgnoreTagAttr,
                    e.safeAttrValue = e.safeAttrValue || s.safeAttrValue,
                    e.escapeHtml = e.escapeHtml || s.escapeHtml,
                    this.options = e,
                    e.css === !1 ? this.cssFilter = !1 : (e.css = e.css || {},
                    this.cssFilter = new l(e.css))
                }
                var l = e("cssfilter").FilterCSS
                  , s = e("./default")
                  , d = e("./parser")
                  , c = d.parseTag
                  , u = d.parseAttr
                  , f = e("./util");
                a.prototype.process = function(e) {
                    if (e = e || "",
                    e = e.toString(),
                    !e)
                        return "";
                    var t = this
                      , n = t.options
                      , i = n.whiteList
                      , a = n.onTag
                      , l = n.onIgnoreTag
                      , d = n.onTagAttr
                      , g = n.onIgnoreTagAttr
                      , m = n.safeAttrValue
                      , p = n.escapeHtml
                      , h = t.cssFilter;
                    n.stripBlankChar && (e = s.stripBlankChar(e)),
                    n.allowCommentTag || (e = s.stripCommentTag(e));
                    var v = !1;
                    if (n.stripIgnoreTagBody) {
                        var v = s.StripTagBody(n.stripIgnoreTagBody, l);
                        l = v.onIgnoreTag
                    }
                    var b = c(e, function(e, t, n, s, c) {
                        var v = {
                            sourcePosition: e,
                            position: t,
                            isClosing: c,
                            isWhite: n in i
                        }
                          , b = a(n, s, v);
                        if (!r(b))
                            return b;
                        if (v.isWhite) {
                            if (v.isClosing)
                                return "</" + n + ">";
                            var C = o(s)
                              , E = i[n]
                              , T = u(C.html, function(e, t) {
                                var o = f.indexOf(E, e) !== -1
                                  , i = d(n, e, t, o);
                                if (!r(i))
                                    return i;
                                if (o)
                                    return t = m(n, e, t, h),
                                    t ? e + '="' + t + '"' : e;
                                var i = g(n, e, t, o);
                                return r(i) ? void 0 : i
                            })
                              , s = "<" + n;
                            return T && (s += " " + T),
                            C.closing && (s += " /"),
                            s += ">"
                        }
                        var b = l(n, s, v);
                        return r(b) ? p(s) : b
                    }, p);
                    return v && (b = v.remove(b)),
                    b
                }
                ,
                t.exports = a
            }
            , {
                "./default": 1,
                "./parser": 3,
                "./util": 4,
                cssfilter: 8
            }],
            6: [function(e, t, n) {
                function r(e) {
                    return void 0 === e || null  === e
                }
                function o(e) {
                    var t = {};
                    for (var n in e)
                        t[n] = e[n];
                    return t
                }
                function i(e) {
                    e = o(e || {}),
                    e.whiteList = e.whiteList || a.whiteList,
                    e.onAttr = e.onAttr || a.onAttr,
                    e.onIgnoreAttr = e.onIgnoreAttr || a.onIgnoreAttr,
                    this.options = e
                }
                var a = e("./default")
                  , l = e("./parser");
                e("./util");
                i.prototype.process = function(e) {
                    if (e = e || "",
                    e = e.toString(),
                    !e)
                        return "";
                    var t = this
                      , n = t.options
                      , o = n.whiteList
                      , i = n.onAttr
                      , a = n.onIgnoreAttr
                      , s = l(e, function(e, t, n, l, s) {
                        var d = o[n]
                          , c = !1;
                        d === !0 ? c = d : "function" == typeof d ? c = d(l) : d instanceof RegExp && (c = d.test(l)),
                        c !== !0 && (c = !1);
                        var u = {
                            position: t,
                            sourcePosition: e,
                            source: s,
                            isWhite: c
                        };
                        if (c) {
                            var f = i(n, l, u);
                            return r(f) ? n + ":" + l : f
                        }
                        var f = a(n, l, u);
                        if (!r(f))
                            return f
                    });
                    return s
                }
                ,
                t.exports = i
            }
            , {
                "./default": 7,
                "./parser": 9,
                "./util": 10
            }],
            7: [function(e, t, n) {
                function r() {
                    var e = {};
                    return e["align-content"] = !1,
                    e["align-items"] = !1,
                    e["align-self"] = !1,
                    e["alignment-adjust"] = !1,
                    e["alignment-baseline"] = !1,
                    e.all = !1,
                    e["anchor-point"] = !1,
                    e.animation = !1,
                    e["animation-delay"] = !1,
                    e["animation-direction"] = !1,
                    e["animation-duration"] = !1,
                    e["animation-fill-mode"] = !1,
                    e["animation-iteration-count"] = !1,
                    e["animation-name"] = !1,
                    e["animation-play-state"] = !1,
                    e["animation-timing-function"] = !1,
                    e.azimuth = !1,
                    e["backface-visibility"] = !1,
                    e.background = !0,
                    e["background-attachment"] = !0,
                    e["background-clip"] = !0,
                    e["background-color"] = !0,
                    e["background-image"] = !0,
                    e["background-origin"] = !0,
                    e["background-position"] = !0,
                    e["background-repeat"] = !0,
                    e["background-size"] = !0,
                    e["baseline-shift"] = !1,
                    e.binding = !1,
                    e.bleed = !1,
                    e["bookmark-label"] = !1,
                    e["bookmark-level"] = !1,
                    e["bookmark-state"] = !1,
                    e.border = !0,
                    e["border-bottom"] = !0,
                    e["border-bottom-color"] = !0,
                    e["border-bottom-left-radius"] = !0,
                    e["border-bottom-right-radius"] = !0,
                    e["border-bottom-style"] = !0,
                    e["border-bottom-width"] = !0,
                    e["border-collapse"] = !0,
                    e["border-color"] = !0,
                    e["border-image"] = !0,
                    e["border-image-outset"] = !0,
                    e["border-image-repeat"] = !0,
                    e["border-image-slice"] = !0,
                    e["border-image-source"] = !0,
                    e["border-image-width"] = !0,
                    e["border-left"] = !0,
                    e["border-left-color"] = !0,
                    e["border-left-style"] = !0,
                    e["border-left-width"] = !0,
                    e["border-radius"] = !0,
                    e["border-right"] = !0,
                    e["border-right-color"] = !0,
                    e["border-right-style"] = !0,
                    e["border-right-width"] = !0,
                    e["border-spacing"] = !0,
                    e["border-style"] = !0,
                    e["border-top"] = !0,
                    e["border-top-color"] = !0,
                    e["border-top-left-radius"] = !0,
                    e["border-top-right-radius"] = !0,
                    e["border-top-style"] = !0,
                    e["border-top-width"] = !0,
                    e["border-width"] = !0,
                    e.bottom = !1,
                    e["box-decoration-break"] = !0,
                    e["box-shadow"] = !0,
                    e["box-sizing"] = !0,
                    e["box-snap"] = !0,
                    e["box-suppress"] = !0,
                    e["break-after"] = !0,
                    e["break-before"] = !0,
                    e["break-inside"] = !0,
                    e["caption-side"] = !1,
                    e.chains = !1,
                    e.clear = !0,
                    e.clip = !1,
                    e["clip-path"] = !1,
                    e["clip-rule"] = !1,
                    e.color = !0,
                    e["color-interpolation-filters"] = !0,
                    e["column-count"] = !1,
                    e["column-fill"] = !1,
                    e["column-gap"] = !1,
                    e["column-rule"] = !1,
                    e["column-rule-color"] = !1,
                    e["column-rule-style"] = !1,
                    e["column-rule-width"] = !1,
                    e["column-span"] = !1,
                    e["column-width"] = !1,
                    e.columns = !1,
                    e.contain = !1,
                    e.content = !1,
                    e["counter-increment"] = !1,
                    e["counter-reset"] = !1,
                    e["counter-set"] = !1,
                    e.crop = !1,
                    e.cue = !1,
                    e["cue-after"] = !1,
                    e["cue-before"] = !1,
                    e.cursor = !1,
                    e.direction = !1,
                    e.display = !0,
                    e["display-inside"] = !0,
                    e["display-list"] = !0,
                    e["display-outside"] = !0,
                    e["dominant-baseline"] = !1,
                    e.elevation = !1,
                    e["empty-cells"] = !1,
                    e.filter = !1,
                    e.flex = !1,
                    e["flex-basis"] = !1,
                    e["flex-direction"] = !1,
                    e["flex-flow"] = !1,
                    e["flex-grow"] = !1,
                    e["flex-shrink"] = !1,
                    e["flex-wrap"] = !1,
                    e.float = !1,
                    e["float-offset"] = !1,
                    e["flood-color"] = !1,
                    e["flood-opacity"] = !1,
                    e["flow-from"] = !1,
                    e["flow-into"] = !1,
                    e.font = !0,
                    e["font-family"] = !0,
                    e["font-feature-settings"] = !0,
                    e["font-kerning"] = !0,
                    e["font-language-override"] = !0,
                    e["font-size"] = !0,
                    e["font-size-adjust"] = !0,
                    e["font-stretch"] = !0,
                    e["font-style"] = !0,
                    e["font-synthesis"] = !0,
                    e["font-variant"] = !0,
                    e["font-variant-alternates"] = !0,
                    e["font-variant-caps"] = !0,
                    e["font-variant-east-asian"] = !0,
                    e["font-variant-ligatures"] = !0,
                    e["font-variant-numeric"] = !0,
                    e["font-variant-position"] = !0,
                    e["font-weight"] = !0,
                    e.grid = !1,
                    e["grid-area"] = !1,
                    e["grid-auto-columns"] = !1,
                    e["grid-auto-flow"] = !1,
                    e["grid-auto-rows"] = !1,
                    e["grid-column"] = !1,
                    e["grid-column-end"] = !1,
                    e["grid-column-start"] = !1,
                    e["grid-row"] = !1,
                    e["grid-row-end"] = !1,
                    e["grid-row-start"] = !1,
                    e["grid-template"] = !1,
                    e["grid-template-areas"] = !1,
                    e["grid-template-columns"] = !1,
                    e["grid-template-rows"] = !1,
                    e["hanging-punctuation"] = !1,
                    e.height = !0,
                    e.hyphens = !1,
                    e.icon = !1,
                    e["image-orientation"] = !1,
                    e["image-resolution"] = !1,
                    e["ime-mode"] = !1,
                    e["initial-letters"] = !1,
                    e["inline-box-align"] = !1,
                    e["justify-content"] = !1,
                    e["justify-items"] = !1,
                    e["justify-self"] = !1,
                    e.left = !1,
                    e["letter-spacing"] = !0,
                    e["lighting-color"] = !0,
                    e["line-box-contain"] = !1,
                    e["line-break"] = !1,
                    e["line-grid"] = !1,
                    e["line-height"] = !1,
                    e["line-snap"] = !1,
                    e["line-stacking"] = !1,
                    e["line-stacking-ruby"] = !1,
                    e["line-stacking-shift"] = !1,
                    e["line-stacking-strategy"] = !1,
                    e["list-style"] = !0,
                    e["list-style-image"] = !0,
                    e["list-style-position"] = !0,
                    e["list-style-type"] = !0,
                    e.margin = !0,
                    e["margin-bottom"] = !0,
                    e["margin-left"] = !0,
                    e["margin-right"] = !0,
                    e["margin-top"] = !0,
                    e["marker-offset"] = !1,
                    e["marker-side"] = !1,
                    e.marks = !1,
                    e.mask = !1,
                    e["mask-box"] = !1,
                    e["mask-box-outset"] = !1,
                    e["mask-box-repeat"] = !1,
                    e["mask-box-slice"] = !1,
                    e["mask-box-source"] = !1,
                    e["mask-box-width"] = !1,
                    e["mask-clip"] = !1,
                    e["mask-image"] = !1,
                    e["mask-origin"] = !1,
                    e["mask-position"] = !1,
                    e["mask-repeat"] = !1,
                    e["mask-size"] = !1,
                    e["mask-source-type"] = !1,
                    e["mask-type"] = !1,
                    e["max-height"] = !0,
                    e["max-lines"] = !1,
                    e["max-width"] = !0,
                    e["min-height"] = !0,
                    e["min-width"] = !0,
                    e["move-to"] = !1,
                    e["nav-down"] = !1,
                    e["nav-index"] = !1,
                    e["nav-left"] = !1,
                    e["nav-right"] = !1,
                    e["nav-up"] = !1,
                    e["object-fit"] = !1,
                    e["object-position"] = !1,
                    e.opacity = !1,
                    e.order = !1,
                    e.orphans = !1,
                    e.outline = !1,
                    e["outline-color"] = !1,
                    e["outline-offset"] = !1,
                    e["outline-style"] = !1,
                    e["outline-width"] = !1,
                    e.overflow = !1,
                    e["overflow-wrap"] = !1,
                    e["overflow-x"] = !1,
                    e["overflow-y"] = !1,
                    e.padding = !0,
                    e["padding-bottom"] = !0,
                    e["padding-left"] = !0,
                    e["padding-right"] = !0,
                    e["padding-top"] = !0,
                    e.page = !1,
                    e["page-break-after"] = !1,
                    e["page-break-before"] = !1,
                    e["page-break-inside"] = !1,
                    e["page-policy"] = !1,
                    e.pause = !1,
                    e["pause-after"] = !1,
                    e["pause-before"] = !1,
                    e.perspective = !1,
                    e["perspective-origin"] = !1,
                    e.pitch = !1,
                    e["pitch-range"] = !1,
                    e["play-during"] = !1,
                    e.position = !1,
                    e["presentation-level"] = !1,
                    e.quotes = !1,
                    e["region-fragment"] = !1,
                    e.resize = !1,
                    e.rest = !1,
                    e["rest-after"] = !1,
                    e["rest-before"] = !1,
                    e.richness = !1,
                    e.right = !1,
                    e.rotation = !1,
                    e["rotation-point"] = !1,
                    e["ruby-align"] = !1,
                    e["ruby-merge"] = !1,
                    e["ruby-position"] = !1,
                    e["shape-image-threshold"] = !1,
                    e["shape-outside"] = !1,
                    e["shape-margin"] = !1,
                    e.size = !1,
                    e.speak = !1,
                    e["speak-as"] = !1,
                    e["speak-header"] = !1,
                    e["speak-numeral"] = !1,
                    e["speak-punctuation"] = !1,
                    e["speech-rate"] = !1,
                    e.stress = !1,
                    e["string-set"] = !1,
                    e["tab-size"] = !1,
                    e["table-layout"] = !1,
                    e["text-align"] = !0,
                    e["text-align-last"] = !0,
                    e["text-combine-upright"] = !0,
                    e["text-decoration"] = !0,
                    e["text-decoration-color"] = !0,
                    e["text-decoration-line"] = !0,
                    e["text-decoration-skip"] = !0,
                    e["text-decoration-style"] = !0,
                    e["text-emphasis"] = !0,
                    e["text-emphasis-color"] = !0,
                    e["text-emphasis-position"] = !0,
                    e["text-emphasis-style"] = !0,
                    e["text-height"] = !0,
                    e["text-indent"] = !0,
                    e["text-justify"] = !0,
                    e["text-orientation"] = !0,
                    e["text-overflow"] = !0,
                    e["text-shadow"] = !0,
                    e["text-space-collapse"] = !0,
                    e["text-transform"] = !0,
                    e["text-underline-position"] = !0,
                    e["text-wrap"] = !0,
                    e.top = !1,
                    e.transform = !1,
                    e["transform-origin"] = !1,
                    e["transform-style"] = !1,
                    e.transition = !1,
                    e["transition-delay"] = !1,
                    e["transition-duration"] = !1,
                    e["transition-property"] = !1,
                    e["transition-timing-function"] = !1,
                    e["unicode-bidi"] = !1,
                    e["vertical-align"] = !1,
                    e.visibility = !1,
                    e["voice-balance"] = !1,
                    e["voice-duration"] = !1,
                    e["voice-family"] = !1,
                    e["voice-pitch"] = !1,
                    e["voice-range"] = !1,
                    e["voice-rate"] = !1,
                    e["voice-stress"] = !1,
                    e["voice-volume"] = !1,
                    e.volume = !1,
                    e["white-space"] = !1,
                    e.widows = !1,
                    e.width = !0,
                    e["will-change"] = !1,
                    e["word-break"] = !0,
                    e["word-spacing"] = !0,
                    e["word-wrap"] = !0,
                    e["wrap-flow"] = !1,
                    e["wrap-through"] = !1,
                    e["writing-mode"] = !1,
                    e["z-index"] = !1,
                    e
                }
                function o(e, t, n) {}
                function i(e, t, n) {}
                n.whiteList = r(),
                n.getDefaultWhiteList = r,
                n.onAttr = o,
                n.onIgnoreAttr = i
            }
            , {}],
            8: [function(e, t, n) {
                function r(e, t) {
                    var n = new i(t);
                    return n.process(e)
                }
                var o = e("./default")
                  , i = e("./css");
                n = t.exports = r,
                n.FilterCSS = i;
                for (var a in o)
                    n[a] = o[a];
                "undefined" != typeof window && (window.filterCSS = t.exports)
            }
            , {
                "./css": 6,
                "./default": 7
            }],
            9: [function(e, t, n) {
                function r(e, t) {
                    function n() {
                        if (!i) {
                            var n = o.trim(e.slice(a, l))
                              , r = n.indexOf(":");
                            if (r !== -1) {
                                var d = o.trim(n.slice(0, r))
                                  , c = o.trim(n.slice(r + 1));
                                if (d) {
                                    var u = t(a, s.length, d, c, n);
                                    u && (s += u + "; ")
                                }
                            }
                        }
                        a = l + 1
                    }
                    e = o.trimRight(e),
                    ";" !== e[e.length - 1] && (e += ";");
                    for (var r = e.length, i = !1, a = 0, l = 0, s = ""; l < r; l++) {
                        var d = e[l];
                        if ("/" === d && "*" === e[l + 1]) {
                            var c = e.indexOf("*/", l + 2);
                            if (c === -1)
                                break;
                            l = c + 1,
                            a = l + 1,
                            i = !1
                        } else
                            "(" === d ? i = !0 : ")" === d ? i = !1 : ";" === d ? i || n() : "\n" === d && n()
                    }
                    return o.trim(s)
                }
                var o = e("./util");
                t.exports = r
            }
            , {
                "./util": 10
            }],
            10: [function(e, t, n) {
                t.exports = {
                    indexOf: function(e, t) {
                        var n, r;
                        if (Array.prototype.indexOf)
                            return e.indexOf(t);
                        for (n = 0,
                        r = e.length; n < r; n++)
                            if (e[n] === t)
                                return n;
                        return -1
                    },
                    forEach: function(e, t, n) {
                        var r, o;
                        if (Array.prototype.forEach)
                            return e.forEach(t, n);
                        for (r = 0,
                        o = e.length; r < o; r++)
                            t.call(n, e[r], r, e)
                    },
                    trim: function(e) {
                        return String.prototype.trim ? e.trim() : e.replace(/(^\s*)|(\s*$)/g, "")
                    },
                    trimRight: function(e) {
                        return String.prototype.trimRight ? e.trimRight() : e.replace(/(\s*$)/g, "")
                    }
                }
            }
            , {}]
        }, {}, [2]),
        t.exports = filterXSS
    }
    , {}],
    61: [function(e, t, n) {
        "use strict";
        var r = e("./xss")
          , o = {
            xssFilter: function() {
                if ("undefined" == typeof r)
                    return null ;
                var e = decodeURIComponent(location.pathname)
                  , t = e.lastIndexOf("/") + 1
                  , n = e.lastIndexOf(".");
                e = n > 0 ? e.substring(t, n) + "_files" : "";
                var o = /^((file|wiz(note)?):\/\/)|(index_files\/)|(data:image\/(?!svg))/
                  , i = "#"
                  , a = new RegExp("^(" + i.escapeRegex() + (e ? "|" + e.escapeRegex() : "") + ")","i")
                  , l = /^(id|class|name|style|data|width|height)/i
                  , s = new r.FilterXSS({
                    onIgnoreTag: function(e, t, n) {
                        if (/script/gi.test(e))
                            return r.escapeAttrValue(t);
                        if (n.isClosing)
                            return "</" + e + ">";
                        var o = r.parseAttr(t, function(t, n) {
                            return n = s.options.safeAttrValue(e, t, n, s),
                            /^on/i.test(t) ? "" : n ? t + '="' + n + '"' : t
                        });
                        return o = /^<!/i.test(t) ? "<!" + o : "<" + o,
                        "/" === t[t.length - 2] && (o += "/"),
                        o += ">"
                    },
                    onIgnoreTagAttr: function(e, t, n) {
                        return !/^object$/i.test(e) && n && l.test(t) ? t + '="' + n + '"' : ""
                    },
                    safeAttrValue: function(e, t, n) {
                        return /^meta$/i.test(e) && /^http-equiv$/i.test(t) && /refresh/i.test(n) ? "" : "href" !== t && "src" !== t || !o.test(n) && !a.test(n) ? r.safeAttrValue(e, t, n) : r.escapeAttrValue(n)
                    }
                });
                return s.options.whiteList.iframe = ["src", "scrolling"],
                s.options.whiteList.button = ["title", "type", "value"],
                s.options.whiteList.object = [],
                function(e) {
                    return s.process(e)
                }
            }()
        };
        t.exports = o
    }
    , {
        "./xss": 60
    }],
    62: [function(e, t, n) {
        "use strict";
        var r = {};
        r.en = {
            version: "en",
            Month: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Agu.", "Sep.", "Oct.", "Nov.", "Dec."],
            Amend: {
                Edit: "Inserted contents",
                Delete: "Deleted contents",
                BtnAccept: "Accept",
                BtnRefuse: "Reject",
                Accept: "Accept all changes? Or partially select the changes which need to be accepted.",
                Refuse: "Reject all changes? Or partially select the changes which need to be rejected.",
                MultiInfo: "Multiple changes are selected",
                UserNameDefault: "someone"
            },
            Toolbar: {
                LinkTopic: "Topic"
            },
            Table: {
                Copy: "Copy",
                Paste: "Paste",
                ClearCell: "Clear",
                MergeCell: "Merge Cells",
                SplitCell: "Unmerge Cells",
                InsertRowUp: "Add Row Above",
                InsertRowDown: "Add Row Below",
                InsertColLeft: "Add Column Before",
                InsertColRight: "Add Column After",
                DeleteRow: "Delete Row",
                DeleteCol: "Delete Column",
                SetCellBg: "Color Fill",
                CellAlign: "Arrange",
                DeleteTable: "Delete Table",
                DistributeCols: "Average Column Width"
            },
            Err: {
                Copy_Null: "Copy of deleted changes not allowed",
                Cut_Null: "Cut of deleted changes not allowed"
            }
        },
        r["zh-cn"] = {
            version: "zh-cn",
            Date: {
                Year: "年",
                Month: "月",
                Day: "日"
            },
            Amend: {
                Edit: "插入了内容",
                Delete: "删除了内容",
                BtnAccept: "接受修订",
                BtnRefuse: "拒绝修订",
                Accept: "是否确认接受全部修订内容？ 如需接受部分内容请使用鼠标进行选择",
                Refuse: "是否确认拒绝全部修订内容？ 如需拒绝部分内容请使用鼠标进行选择",
                MultiInfo: "您选中了多处修订",
                UserNameDefault: "有人"
            },
            Toolbar: {
                LinkTopic: "标题"
            },
            Table: {
                Copy: "复制",
                Paste: "粘贴",
                ClearCell: "清空单元格",
                MergeCell: "合并单元格",
                SplitCell: "拆分单元格",
                InsertRowUp: "上插入行",
                InsertRowDown: "下插入行",
                InsertColLeft: "左插入列",
                InsertColRight: "右插入列",
                DeleteRow: "删除当前行",
                DeleteCol: "删除当前列",
                SetCellBg: "单元格底色",
                CellAlign: "单元格对齐方式",
                DeleteTable: "删除表格",
                DistributeCols: "平均分配各列"
            },
            Err: {
                Copy_Null: "无法复制已删除的内容",
                Cut_Null: "无法剪切已删除的内容"
            }
        },
        r["zh-tw"] = {
            version: "zh-tw",
            Date: {
                Year: "年",
                Month: "月",
                Day: "日"
            },
            Amend: {
                Edit: "插入了內容",
                Delete: "刪除了內容",
                BtnAccept: "接受修訂",
                BtnRefuse: "拒絕修訂",
                Accept: "是否確認接受全部修訂內容？ 如需接受部分內容請使用滑鼠進行選擇",
                Refuse: "是否確認拒絕全部修訂內容？ 如需拒絕部分內容請使用滑鼠進行選擇",
                MultiInfo: "您選中了多處修訂",
                UserNameDefault: "有人"
            },
            Toolbar: {
                LinkTopic: "標題"
            },
            Table: {
                Copy: "複製",
                Paste: "粘貼",
                ClearCell: "清空儲存格",
                MergeCell: "合併儲存格",
                SplitCell: "拆分儲存格",
                InsertRowUp: "上插入行",
                InsertRowDown: "下插入行",
                InsertColLeft: "左插入列",
                InsertColRight: "右插入列",
                DeleteRow: "刪除當前行",
                DeleteCol: "刪除當前列",
                SetCellBg: "儲存格底色",
                CellAlign: "儲存格對齊方式",
                DeleteTable: "刪除表格",
                DistributeCols: "平均分配各列"
            },
            Err: {
                Copy_Null: "無法複製已刪除的內容",
                Cut_Null: "無法剪切已刪除的內容"
            }
        };
        var o = function(e, t) {
            var n = "en"
              , o = {};
            if (!e) {
                var i = t.win || window;
                e = i.navigator.language.replace("_", "-").toLowerCase(),
                e = /^zh-/.test(e) ? /(hant)|(tw)|(hk)/.test(e) ? "zh-tw" : "zh-cn" : /^zh/.test(e) ? "zh-cn" : "en"
            }
            e = e.toLowerCase().replace("_", "-"),
            r[e] ? n = e : e = "en";
            for (var a in r[e])
                r[e].hasOwnProperty(a) && (o[a] = r[e][a]);
            return o
        }
        ;
        t.exports = o
    }
    , {}],
    63: [function(e, t, n) {
        "use strict";
        var r = e("./WizDocument")
          , o = void 0
          , i = void 0
          , a = void 0
          , l = {
            init: function(e) {
                return e = e || {},
                e.editor || (e.editor = {}),
                e.reader || (e.reader = {}),
                void 0 !== e.autoFocus && (e.editor.autoFocus = e.autoFocus,
                delete e.autoFocus),
                void 0 !== e.maxRedo && (e.editor.maxRedo = e.maxRedo,
                delete e.maxRedo),
                void 0 !== e.noteType && (e.reader.type = e.noteType,
                delete e.noteType),
                void 0 !== e.noAmend && (e.reader.noAmend = e.noAmend,
                delete e.noAmend),
                void 0 !== e.codeNoIDE && (e.reader.codeNoIDE = e.codeNoIDE,
                delete e.codeNoIDE),
                void 0 !== e.markdownPlugIn && (e.reader.markdownPlugIn = e.markdownPlugIn,
                delete e.markdownPlugIn),
                void 0 !== e.timeout && (e.reader.timeout = e.timeout,
                delete e.timeout),
                void 0 !== e.callback && (e.editor.callback = {
                    redo: e.callback.redo
                },
                e.reader.callback = {
                    markdown: e.callback.markdown,
                    mathJax: e.callback.mathJax
                },
                delete e.callback),
                o = new r(e,function(e) {
                    i = e,
                    a && a(e)
                }
                ),
                l.version = o.version,
                l.on = function(e, t) {
                    return o.editor.on(e, t),
                    l
                }
                ,
                l.off = function(e, t) {
                    return o.reader.on(e, t),
                    l
                }
                ,
                l.backupCaret = o.editor.caretBackup,
                l.execCommand = o.editor.execCommand,
                l.find = o.editor.find,
                l.focus = function() {
                    return o.editor.focus(),
                    l
                }
                ,
                l.getBodyText = o.editor.getBodyText,
                l.getContentHtml = o.editor.getContentHtml,
                l.getMarkdownSrc = o.editor.getMarkdownSrc,
                l.insertB64Html = o.editor.insertB64Html,
                l.insertHtml = o.editor.insertHtml,
                l.isModified = o.editor.isModified,
                l.modifySelectionDom = o.editor.modifySelectionDom,
                l.paste = o.editor.paste,
                l.pasteB64 = o.editor.pasteB64,
                l.redo = function() {
                    return o.editor.redo(),
                    l
                }
                ,
                l.removeFormat = function(e, t, n) {
                    return o.editor.removeFormat(e, t, n),
                    l
                }
                ,
                l.removeStyleById = function(e) {
                    return o.removeStyleById(e),
                    l
                }
                ,
                l.replace = o.editor.replace,
                l.replaceAll = o.editor.replaceAll,
                l.restoreCaret = o.editor.caretRestore,
                l.saveSnap = o.editor.saveSnap,
                l.setUnModified = o.editor.setUnModified,
                l.undo = function() {
                    return o.editor.undo(),
                    l
                }
                ,
                l.ListenerType = o.editor.ListenerType,
                l.addListener = function(e, t) {
                    return o.editor.addListener(e, t),
                    l
                }
                ,
                l.removeListener = function(e, t) {
                    return o.editor.removeListener(e, t),
                    l
                }
                ,
                l.triggerListener = function(e, t) {
                    return o.editor.triggerListener(e, t),
                    l
                }
                ,
                l.startTrackEvent = o.editor.startTrackEvent,
                l.stopTrackEvent = o.editor.stopTrackEvent,
                l.amend.on = function() {
                    return o.editor.amend.on(),
                    l
                }
                ,
                l.amend.off = function() {
                    return o.editor.amend.off(),
                    l
                }
                ,
                l.amend.changeCurUser = o.editor.amend.changeCurUser,
                l.amend.isEdited = o.editor.amend.isEdited,
                l.amend.isEditing = o.editor.amend.isEditing,
                l.amend.hasAmendSpanByCursor = o.editor.amend.hasAmendSpanByCursor,
                l.amend.accept = o.editor.amend.accept,
                l.amend.refuse = o.editor.amend.refuse,
                l.code.insertCode = o.editor.code.insertCode,
                l.formatPainter.on = o.editor.formatPainter.on,
                l.formatPainter.off = o.editor.formatPainter.off,
                l.img.getAll = o.editor.img.getAll,
                l.img.insertAsAttachment = o.editor.img.insertAsAttachment,
                l.img.insertByPath = o.editor.img.insertByPath,
                l.img.removeCur = o.editor.img.removeCur,
                l.img.replaceCur = o.editor.img.replaceCur,
                l.link.on = o.editor.link.on,
                l.link.off = o.editor.link.off,
                l.link.getCurrentLink = o.editor.link.getCurrentLink,
                l.link.removeSelectedLink = o.editor.link.removeSelectedLink,
                l.link.setCurrentLink = o.editor.link.setCurrentLink,
                l.range.moveToPoint = o.editor.range.moveToPoint,
                l.table.canCreateTable = o.editor.table.canCreateTable,
                l.table.clearCellValue = o.editor.table.clearCellValue,
                l.table.deleteCols = o.editor.table.deleteCols,
                l.table.deleteRows = o.editor.table.deleteRows,
                l.table.deleteTable = o.editor.table.deleteTable,
                l.table.distributeCols = o.editor.table.distributeCols,
                l.table.insertCol = o.editor.table.insertCol,
                l.table.insertRow = o.editor.table.insertRow,
                l.table.insertTable = o.editor.table.insertTable,
                l.table.merge = o.editor.table.merge,
                l.table.setCellAlign = o.editor.table.setCellAlign,
                l.table.setCellBg = o.editor.table.setCellBg,
                l.table.split = o.editor.table.split,
                l.todo.setTodo = o.editor.todo.setTodo,
                l.todo.setTodoInfo = o.editor.todo.setTodoInfo,
                l.nightMode.on = o.editor.nightMode.on,
                l.nightMode.off = o.editor.nightMode.off,
                l.utils.clearStyleFromHtml = o.editor.utils.clearStyleFromHtml,
                l.toolbar.setImgUploaderId = o.editor.toolbar.setImgUploaderId,
                l.toolbar.onImgUploadBegin = o.editor.toolbar.onImgUploadBegin,
                l.toolbar.onImgUploadProgress = o.editor.toolbar.onImgUploadProgress,
                l.toolbar.onImgUploadComplete = o.editor.toolbar.onImgUploadComplete,
                l.toolbar.onImgUploadError = o.editor.toolbar.onImgUploadError,
                l.insertCustomStyle = function(e, t, n) {
                    return o.insertCustomStyle(e, t, n),
                    l
                }
                ,
                l.insertDefaultStyle = function(e, t) {
                    return o.insertDefaultStyle(e, t),
                    l
                }
                ,
                s.on = function(e, t) {
                    return o.reader.on(e, t),
                    s
                }
                ,
                s.off = function(e, t) {
                    return o.editor.on(e, t),
                    s
                }
                ,
                s.closeDocument = o.reader.closeDocument,
                s.getRenderDocument = o.reader.getRenderDocument,
                s.getWordCount = o.reader.getWordCount,
                s.insertCustomStyle = function(e, t, n) {
                    return o.insertCustomStyle(e, t, n),
                    s
                }
                ,
                s.insertDefaultStyle = function(e, t) {
                    return o.insertDefaultStyle(e, t),
                    s
                }
                ,
                s.removeStyleById = function(e) {
                    return o.removeStyleById(e),
                    s
                }
                ,
                s.setPluginModify = o.reader.setPluginModify,
                s.amendInfo.on = function() {
                    return o.reader.amend.on(),
                    s
                }
                ,
                s.amendInfo.off = function() {
                    return o.reader.amend.off(),
                    s
                }
                ,
                s.highlight.next = o.reader.highlight.next,
                s.highlight.on = o.reader.highlight.on,
                s.highlight.off = o.reader.highlight.off,
                s.highlight.previous = o.reader.highlight.previous,
                s.img.getAll = o.editor.img.getAll,
                s.todo.setTodoInfo = o.reader.todo.setTodoInfo,
                s.todo.onCheckDocLock = o.reader.todo.onCheckDocLock,
                s.nightMode.on = o.reader.nightMode.on,
                s.nightMode.off = o.reader.nightMode.off,
                l
            },
            amend: {},
            code: {},
            formatPainter: {},
            img: {},
            link: {},
            range: {},
            table: {},
            todo: {},
            nightMode: {},
            utils: {},
            toolbar: {}
        }
          , s = {
            init: l.init,
            amendInfo: {},
            highlight: {},
            img: {},
            nightMode: {},
            todo: {}
        }
          , d = function(e) {
            a = e
        }
        ;
        window.WizEditor = l,
        window.WizReader = s,
        t.exports = {
            wizEditor: l,
            wizReader: s,
            setCoreCallback: d
        }
    }
    , {
        "./WizDocument": 5
    }],
    64: [function(e, t, n) {
        "use strict";
        var r = e("./wizEditor")
          , o = r.wizEditor
          , i = r.setCoreCallback
          , a = function(e) {
            var t = e.env
              , n = e.require.domUtils
              , i = e.require.historyUtils
              , a = e.require.imgUtils
              , l = e.require.rangeUtils
              , s = e.require.tableZone
              , d = function() {
                var e = null ;
                try {
                    e = t.win.external
                } catch (e) {
                    alert(e)
                }
                return e
            }
              , c = function(e) {
                var t = e.documentElement.outerHTML
                  , r = n.getDocType(e);
                return r + t
            }
            ;
            o.getAllFramesData = function() {
                var e = ""
                  , n = t.doc.getElementsByTagName("iframe");
                if (!n)
                    return null ;
                for (var r = 0; r < n.length; r++) {
                    var o = n[r]
                      , i = o.getAttribute("src")
                      , a = o.getAttribute("id")
                      , l = o.getAttribute("name")
                      , s = c(o.contentDocument);
                    s && (i || (i = ""),
                    a || (a = ""),
                    l || (l = ""),
                    e = e + "<!--WizFrameURLStart-->" + i + "<!--WizFrameURLEnd--><!--WizFrameIdStart-->" + a + "<!--WizFrameIdEnd--><!--WizFrameNameStart-->" + l + "<!--WizFrameNameEnd--><!--WizFrameHtmlStart-->" + s + "<!--WizFrameHtmlEnd-->")
                }
                return e
            }
            ,
            o.getFontSizeAtCaret = function() {
                var e = t.doc.getSelection().focusNode;
                if (!e)
                    return 0;
                for (; e && 3 === e.nodeType; )
                    e = e.parentNode;
                if (!e)
                    return 0;
                var n = t.win.getComputedStyle(e);
                return n ? n.fontSize : 0
            }
            ,
            o.getFrameSource = function(e) {
                var n = t.doc.getElementById(e);
                if (!n) {
                    var r = t.doc.getElementsByName(e);
                    if (!r)
                        return null ;
                    if (1 !== r.length)
                        return null ;
                    if (n = r[0],
                    !n)
                        return null 
                }
                return c(n.contentDocument)
            }
            ,
            o.queryDocState = function() {
                var e = i.getUndoState()
                  , t = l.getRange()
                  , n = s.getZone
                  , o = r.amend.hasAmendSpanByCursor();
                return {
                    undo: 0 === e.undoCount || 0 === e.undoIndex ? "0" : "1",
                    redo: e.undoCount - 1 <= e.undoIndex ? "0" : "1",
                    canPaste: t || n.range ? "1" : "0",
                    hasAmend: o ? "1" : "0"
                }
            }
            ,
            o.img.saveRemote = function(e) {
                var n = d();
                if (n)
                    for (var r = t.doc.images, o = 0; o < r.length; o++) {
                        var i = r[o]
                          , l = i.src;
                        if (0 !== l.indexOf("data:") && (0 === l.indexOf("http") || !n.PathFileExists(l)))
                            try {
                                var s = a.getImageData(i);
                                if (s.length <= 0)
                                    continue;var c = e + Math.random() + ".png";
                                n.SaveBase64DataToFile(c, s),
                                i.src = "file:///" + c
                            } catch (e) {
                                console.error(e)
                            }
                    }
            }
            ,
            o.img.saveRemoteToCache = function() {
                var e = d();
                if (e)
                    for (var t = doc.images, n = 0; n < t.length; n++) {
                        var r = t[n]
                          , o = r.src;
                        if (0 !== o.indexOf("data:") && 0 === o.indexOf("http"))
                            try {
                                var i = a.getImageData(r);
                                e.SetImageData(o, i)
                            } catch (e) {}
                    }
            }
        }
        ;
        i(a)
    }
    , {
        "./wizEditor": 63
    }]
}, {}, [64]);
