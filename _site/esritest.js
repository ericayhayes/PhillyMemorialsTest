/* esri-leaflet-webmap - v0.4.0 - Thu Sep 08 2016 19:47:01 GMT+0900 (東京 (標準時))
 * Copyright (c) 2016 Yusuke Nunokawa <ynunokawa.dev@gmail.com>
 * MIT */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("leaflet"), require("leaflet-omnivore")) : "function" == typeof define && define.amd ? define(["exports", "leaflet", "leaflet-omnivore"], t) : t((e.L = e.L || {}, e.L.esri = e.L.esri || {}), e.L, e.omnivore)
}(this, function(e, t, i) {
    "use strict";

    function o(e, t) {
        for (var i = 0; i < e.length; i++)
            if (e[i] !== t[i]) return !1;
        return !0
    }

    function n(e) {
        return o(e[0], e[e.length - 1]) || e.push(e[0]), e
    }

    function r(e) {
        var t, i = 0,
            o = 0,
            n = e.length,
            r = e[o];
        for (o; o < n - 1; o++) t = e[o + 1], i += (t[0] - r[0]) * (t[1] + r[1]), r = t;
        return i >= 0
    }

    function s(e, t, i, o) {
        var n = (o[0] - i[0]) * (e[1] - i[1]) - (o[1] - i[1]) * (e[0] - i[0]),
            r = (t[0] - e[0]) * (e[1] - i[1]) - (t[1] - e[1]) * (e[0] - i[0]),
            s = (o[1] - i[1]) * (t[0] - e[0]) - (o[0] - i[0]) * (t[1] - e[1]);
        if (0 !== s) {
            var a = n / s,
                l = r / s;
            if (a >= 0 && a <= 1 && l >= 0 && l <= 1) return !0
        }
        return !1
    }

    function a(e, t) {
        for (var i = 0; i < e.length - 1; i++)
            for (var o = 0; o < t.length - 1; o++)
                if (s(e[i], e[i + 1], t[o], t[o + 1])) return !0;
        return !1
    }

    function l(e, t) {
        for (var i = !1, o = -1, n = e.length, r = n - 1; ++o < n; r = o)(e[o][1] <= t[1] && t[1] < e[r][1] || e[r][1] <= t[1] && t[1] < e[o][1]) && t[0] < (e[r][0] - e[o][0]) * (t[1] - e[o][1]) / (e[r][1] - e[o][1]) + e[o][0] && (i = !i);
        return i
    }

    function u(e, t) {
        var i = a(e, t),
            o = l(e, t[0]);
        return !(i || !o)
    }

    function p(e) {
        for (var t, i, o, s = [], l = [], p = 0; p < e.length; p++) {
            var f = n(e[p].slice(0));
            if (!(f.length < 4))
                if (r(f)) {
                    var y = [f];
                    s.push(y)
                } else l.push(f)
        }
        for (var h = []; l.length;) {
            o = l.pop();
            var c = !1;
            for (t = s.length - 1; t >= 0; t--)
                if (i = s[t][0], u(i, o)) {
                    s[t].push(o), c = !0;
                    break
                }
            c || h.push(o)
        }
        for (; h.length;) {
            o = h.pop();
            var d = !1;
            for (t = s.length - 1; t >= 0; t--)
                if (i = s[t][0], a(i, o)) {
                    s[t].push(o), d = !0;
                    break
                }
            d || s.push([o.reverse()])
        }
        return 1 === s.length ? {
            type: "Polygon",
            coordinates: s[0]
        } : {
            type: "MultiPolygon",
            coordinates: s
        }
    }

    function f(e) {
        var t = {};
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t
    }

    function y(e, t) {
        var i = {};
        return "number" == typeof e.x && "number" == typeof e.y && (i.type = "Point", i.coordinates = [e.x, e.y]), e.points && (i.type = "MultiPoint", i.coordinates = e.points.slice(0)), e.paths && (1 === e.paths.length ? (i.type = "LineString", i.coordinates = e.paths[0].slice(0)) : (i.type = "MultiLineString", i.coordinates = e.paths.slice(0))), e.rings && (i = p(e.rings.slice(0))), (e.geometry || e.attributes) && (i.type = "Feature", i.geometry = e.geometry ? y(e.geometry) : null, i.properties = e.attributes ? f(e.attributes) : null, e.attributes && (i.id = e.attributes[t] || e.attributes.OBJECTID || e.attributes.FID)), i
    }

    function h(e, t) {
        return new W(e, t)
    }

    function c(e, t) {
        return new R(e, t)
    }

    function d(e, t) {
        return new Y(e, t)
    }

    function g(e, t) {
        return new X(e, t)
    }

    function _(e, t) {
        return new H(e, t)
    }

    function m(e, t) {
        return new $(e, t)
    }

    function v(e, t) {
        var i, o = e.drawingInfo.renderer,
            n = {};
        switch (t.options.pane && (n.pane = t.options.pane), e.drawingInfo.transparency && (n.layerTransparency = e.drawingInfo.transparency), t.options.style && (n.userDefinedStyle = t.options.style), o.type) {
            case "classBreaks":
                if (b(e.geometryType, o, t), t._hasProportionalSymbols) {
                    t._createPointLayer();
                    var r = g(o, n);
                    r.attachStylesToLayer(t._pointLayer), n.proportionalPolygon = !0
                }
                i = g(o, n);
                break;
            case "uniqueValue":
                console.log(o, n), i = _(o, n);
                break;
            default:
                i = m(o, n)
        }
        i.attachStylesToLayer(t)
    }

    function b(e, t, i) {
        if (i._hasProportionalSymbols = !1, "esriGeometryPolygon" === e && (t.backgroundFillSymbol && (i._hasProportionalSymbols = !0), t.classBreakInfos && t.classBreakInfos.length)) {
            var o = t.classBreakInfos[0].symbol;
            !o || "esriSMS" !== o.type && "esriPMS" !== o.type || (i._hasProportionalSymbols = !0)
        }
    }

    function S(e, t) {
        return new Q(e, t)
    }

    function x(e, t) {
        return new Z(e, t)
    }

    function I(e, t) {
        return new ee(e, t)
    }

    function L(e) {
        return new te(e)
    }

    function w(e, t) {
        return new ie(e, t)
    }

    function M(e) {
        var t = {
            position: [],
            offset: []
        };
        return t.position = e.reverse(), t.offset = [20, 20], t
    }

    function D(e) {
        var t, i = {
            position: [],
            offset: []
        };
        return t = Math.round(e.length / 2), i.position = e[t].reverse(), i.offset = [0, 0], i
    }

    function k(e, t) {
        var i = {
            position: [],
            offset: []
        };
        return i.position = e.getBounds().getCenter(), i.offset = [0, 0], i
    }

    function z(e, t) {
        var i = /\{([^\]]*)\}/g,
            o = "",
            n = "";
        if (void 0 !== e.title && (o = e.title), o = o.replace(i, function(e) {
                var o = i.exec(e);
                return t[o[1]]
            }), n = '<div class="leaflet-popup-content-title"><h4>' + o + '</h4></div><div class="leaflet-popup-content-description" style="max-height:200px;overflow:auto;">', void 0 !== e.fieldInfos) {
            for (var r = 0; r < e.fieldInfos.length; r++) e.fieldInfos[r].visible === !0 && (n += '<div style="font-weight:bold;color:#999;margin-top:5px;word-break:break-all;">' + e.fieldInfos[r].label + '</div><p style="margin-top:0;margin-bottom:5px;word-break:break-all;">' + t[e.fieldInfos[r].fieldName] + "</p>");
            n += "</div>"
        } else if (void 0 !== e.description) {
            var s = e.description.replace(i, function(e) {
                var o = i.exec(e);
                return t[o[1]]
            });
            n += s + "</div>"
        }
        return n
    }

    function P(e, t, i, o) {
        return T(e, t, i, o)
    }

    function T(e, i, o, n) {
        console.log("generateEsriLayer: ", e.title, e);
        var r, s, a, l, u = [],
            p = n + "-label";
        if ("Feature Collection" === e.type || void 0 !== e.featureCollection) {
            console.log("create FeatureCollection"), o.createPane(p);
            var f, y;
            if (void 0 === e.itemId)
                for (a = 0, l = e.featureCollection.layers.length; a < l; a++) e.featureCollection.layers[a].featureSet.features.length > 0 && (void 0 !== e.featureCollection.layers[a].popupInfo && null !== e.featureCollection.layers[a].popupInfo && (f = e.featureCollection.layers[a].popupInfo), void 0 !== e.featureCollection.layers[a].layerDefinition.drawingInfo.labelingInfo && null !== e.featureCollection.layers[a].layerDefinition.drawingInfo.labelingInfo && (y = e.featureCollection.layers[a].layerDefinition.drawingInfo.labelingInfo));
            s = t.featureGroup(u);
            var h = S(null, {
                data: e.itemId || e.featureCollection,
                opacity: e.opacity,
                pane: n,
                onEachFeature: function(e, t) {
                    if (void 0 !== h && (f = h.popupInfo, y = h.labelingInfo), void 0 !== f && null !== f) {
                        var i = z(f, e.properties);
                        t.bindPopup(i)
                    }
                    if (void 0 !== y && null !== y) {
                        var o, n = t.feature.geometry.coordinates;
                        o = "Point" === t.feature.geometry.type ? M(n) : "LineString" === t.feature.geometry.type ? D(n) : "MultiLineString" === t.feature.geometry.type ? D(n[Math.round(n.length / 2)]) : k(t);
                        var r = w(o.position, {
                            zIndexOffset: 1,
                            properties: e.properties,
                            labelingInfo: y,
                            offset: o.offset,
                            pane: p
                        });
                        s.addLayer(r)
                    }
                }
            });
            return r = t.layerGroup([h, s]), i.push({
                type: "FC",
                title: e.title || "",
                layer: r
            }), r
        }
        if ("ArcGISFeatureLayer" === e.layerType && void 0 !== e.layerDefinition) {
            var c = "1=1";
            if (void 0 !== e.layerDefinition.drawingInfo) {
                if ("heatmap" === e.layerDefinition.drawingInfo.renderer.type) {
                    console.log("create HeatmapLayer");
                    var d = {};
                    return e.layerDefinition.drawingInfo.renderer.colorStops.map(function(e) {
                        d[(Math.round(100 * e.ratio) / 100 + 6) / 7] = "rgb(" + e.color[0] + "," + e.color[1] + "," + e.color[2] + ")"
                    }), r = t.esri.Heat.heatmapFeatureLayer({
                        url: e.url,
                        minOpacity: .5,
                        max: e.layerDefinition.drawingInfo.renderer.maxPixelIntensity,
                        blur: e.layerDefinition.drawingInfo.renderer.blurRadius,
                        radius: 1.3 * e.layerDefinition.drawingInfo.renderer.blurRadius,
                        gradient: d,
                        pane: n
                    }), i.push({
                        type: "HL",
                        title: e.title || "",
                        layer: r
                    }), r
                }
                console.log("create ArcGISFeatureLayer (with layerDefinition.drawingInfo)");
                var g = e.layerDefinition.drawingInfo;
                return g.transparency = 100 - 100 * e.opacity, console.log(g.transparency), void 0 !== e.layerDefinition.definitionExpression && (c = e.layerDefinition.definitionExpression), o.createPane(p), s = t.featureGroup(u), r = t.esri.featureLayer({
                    url: e.url,
                    where: c,
                    drawingInfo: g,
                    pane: n,
                    onEachFeature: function(t, i) {
                        if (void 0 !== e.popupInfo) {
                            var o = z(e.popupInfo, t.properties);
                            i.bindPopup(o)
                        }
                        if (void 0 !== e.layerDefinition.drawingInfo.labelingInfo && null !== e.layerDefinition.drawingInfo.labelingInfo) {
                            var n, r = e.layerDefinition.drawingInfo.labelingInfo,
                                a = i.feature.geometry.coordinates;
                            n = "Point" === i.feature.geometry.type ? M(a) : "LineString" === i.feature.geometry.type ? D(a) : "MultiLineString" === i.feature.geometry.type ? D(a[Math.round(a.length / 2)]) : k(i);
                            var l = w(n.position, {
                                zIndexOffset: 1,
                                properties: t.properties,
                                labelingInfo: r,
                                offset: n.offset,
                                pane: p
                            });
                            s.addLayer(l)
                        }
                    }
                }), r = t.layerGroup([r, s]), i.push({
                    type: "FL",
                    title: e.title || "",
                    layer: r
                }), r
            }
            return console.log("create ArcGISFeatureLayer (without layerDefinition.drawingInfo)"), void 0 !== e.layerDefinition.definitionExpression && (c = e.layerDefinition.definitionExpression), r = t.esri.featureLayer({
                url: e.url,
                where: c,
                pane: n,
                onEachFeature: function(t, i) {
                    if (void 0 !== e.popupInfo) {
                        var o = z(e.popupInfo, t.properties);
                        i.bindPopup(o)
                    }
                }
            }), i.push({
                type: "FL",
                title: e.title || "",
                layer: r
            }), r
        }
        if ("ArcGISFeatureLayer" === e.layerType) return console.log("create ArcGISFeatureLayer"), r = t.esri.featureLayer({
            url: e.url,
            pane: n,
            onEachFeature: function(t, i) {
                if (void 0 !== e.popupInfo) {
                    var o = z(e.popupInfo, t.properties);
                    i.bindPopup(o)
                }
            }
        }), i.push({
            type: "FL",
            title: e.title || "",
            layer: r
        }), r;
        if ("CSV" === e.layerType) return s = t.featureGroup(u), r = x(null, {
            url: e.url,
            layerDefinition: e.layerDefinition,
            locationInfo: e.locationInfo,
            opacity: e.opacity,
            pane: n,
            onEachFeature: function(t, i) {
                if (void 0 !== e.popupInfo) {
                    var o = z(e.popupInfo, t.properties);
                    i.bindPopup(o)
                }
                if (void 0 !== e.layerDefinition.drawingInfo.labelingInfo && null !== e.layerDefinition.drawingInfo.labelingInfo) {
                    var n, r = e.layerDefinition.drawingInfo.labelingInfo,
                        a = i.feature.geometry.coordinates;
                    n = "Point" === i.feature.geometry.type ? M(a) : "LineString" === i.feature.geometry.type ? D(a) : "MultiLineString" === i.feature.geometry.type ? D(a[Math.round(a.length / 2)]) : k(i);
                    var l = w(n.position, {
                        zIndexOffset: 1,
                        properties: t.properties,
                        labelingInfo: r,
                        offset: n.offset,
                        pane: p
                    });
                    s.addLayer(l)
                }
            }
        }), r = t.layerGroup([r, s]), i.push({
            type: "CSV",
            title: e.title || "",
            layer: r
        }), r;
        if ("KML" === e.layerType) {
            s = t.featureGroup(u);
            var _ = I(null, {
                url: e.url,
                opacity: e.opacity,
                pane: n,
                onEachFeature: function(e, t) {
                    if (void 0 !== _.popupInfo && null !== _.popupInfo) {
                        console.log(_.popupInfo);
                        var i = z(_.popupInfo, e.properties);
                        t.bindPopup(i)
                    }
                    if (void 0 !== _.labelingInfo && null !== _.labelingInfo) {
                        var o, n = _.labelingInfo,
                            r = t.feature.geometry.coordinates;
                        o = "Point" === t.feature.geometry.type ? M(r) : "LineString" === t.feature.geometry.type ? D(r) : "MultiLineString" === t.feature.geometry.type ? D(r[Math.round(r.length / 2)]) : k(t);
                        var a = w(o.position, {
                            zIndexOffset: 1,
                            properties: e.properties,
                            labelingInfo: n,
                            offset: o.offset,
                            pane: p
                        });
                        s.addLayer(a)
                    }
                }
            });
            return r = t.layerGroup([_, s]), i.push({
                type: "KML",
                title: e.title || "",
                layer: r
            }), r
        }
        if ("ArcGISImageServiceLayer" === e.layerType) return console.log("create ArcGISImageServiceLayer"), r = t.esri.imageMapLayer({
            url: e.url,
            pane: n,
            opacity: e.opacity || 1
        }), i.push({
            type: "IML",
            title: e.title || "",
            layer: r
        }), r;
        if ("ArcGISMapServiceLayer" === e.layerType) return r = t.esri.dynamicMapLayer({
            url: e.url,
            pane: n,
            opacity: e.opacity || 1
        }), i.push({
            type: "DML",
            title: e.title || "",
            layer: r
        }), r;
        if ("ArcGISTiledMapServiceLayer" === e.layerType) {
            try {
                r = t.esri.basemapLayer(e.title)
            } catch (m) {
                r = t.esri.tiledMapLayer({
                    url: e.url
                }), t.esri.request(e.url, {}, function(e, t) {
                    if (e) console.log(e);
                    else {
                        var i = o.getSize().x - 55,
                            n = '<span class="esri-attributions" style="line-height:14px; vertical-align: -3px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden; display:inline-block; max-width:' + i + 'px;">' + t.copyrightText + "</span>";
                        o.attributionControl.addAttribution(n)
                    }
                })
            }
            return document.getElementsByClassName("leaflet-tile-pane")[0].style.opacity = e.opacity || 1, i.push({
                type: "TML",
                title: e.title || "",
                layer: r
            }), r
        }
        if ("OpenStreetMap" === e.layerType) return r = t.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }), i.push({
            type: "TL",
            title: e.title || e.id || "",
            layer: r
        }), r;
        if ("WebTiledLayer" === e.layerType) {
            var v = C(e.templateUrl);
            return r = t.tileLayer(v, {
                attribution: e.copyright
            }), document.getElementsByClassName("leaflet-tile-pane")[0].style.opacity = e.opacity || 1, i.push({
                type: "TL",
                title: e.title || e.id || "",
                layer: r
            }), r
        }
        if ("WMS" === e.layerType) {
            var b = "";
            for (a = 0, l = e.visibleLayers.length; a < l; a++) b += e.visibleLayers[a], a < l - 1 && (b += ",");
            return r = t.tileLayer.wms(e.url, {
                layers: String(b),
                format: "image/png",
                transparent: !0,
                attribution: e.copyright
            }), i.push({
                type: "WMS",
                title: e.title || e.id || "",
                layer: r
            }), r
        }
        return r = t.featureGroup([]), console.log("Unsupported Layer: ", e), r
    }

    function C(e) {
        var t = e;
        return t = t.replace(/\{level}/g, "{z}"), t = t.replace(/\{col}/g, "{x}"), t = t.replace(/\{row}/g, "{y}")
    }

    function J(e, t) {
        return new oe(e, t)
    }
    t = "default" in t ? t["default"] : t, i = "default" in i ? i["default"] : i;
    var V = "0.4.0",
        F = t.Class.extend({
            initialize: function(e, t) {
                this._symbolJson = e, this.val = null, this._styles = {}, this._isDefault = !1, this._layerTransparency = 1, t && t.layerTransparency && (this._layerTransparency = 1 - t.layerTransparency / 100)
            },
            pixelValue: function(e) {
                return 1.333 * e
            },
            colorValue: function(e) {
                return "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")"
            },
            alphaValue: function(e) {
                var t = e[3] / 255;
                return t * this._layerTransparency
            },
            getSize: function(e, t) {
                var i = e.properties,
                    o = t.field,
                    n = 0,
                    r = null;
                if (o) {
                    r = i[o];
                    var s, a = t.minSize,
                        l = t.maxSize,
                        u = t.minDataValue,
                        p = t.maxDataValue,
                        f = t.normalizationField,
                        y = i ? parseFloat(i[f]) : void 0;
                    if (null === r || f && (isNaN(y) || 0 === y)) return null;
                    isNaN(y) || (r /= y), null !== a && null !== l && null !== u && null !== p && (r <= u ? n = a : r >= p ? n = l : (s = (r - u) / (p - u), n = a + s * (l - a))), n = isNaN(n) ? 0 : n
                }
                return n
            },
            getColor: function(e, t) {
                if (!(e.properties && t && t.field && t.stops)) return null;
                var i, o, n, r, s = e.properties,
                    a = s[t.field],
                    l = t.normalizationField,
                    u = s ? parseFloat(s[l]) : void 0;
                if (null === a || l && (isNaN(u) || 0 === u)) return null;
                if (isNaN(u) || (a /= u), a <= t.stops[0].value) return t.stops[0].color;
                var p = t.stops[t.stops.length - 1];
                if (a >= p.value) return p.color;
                for (var f = 0; f < t.stops.length; f++) {
                    var y = t.stops[f];
                    if (y.value <= a) i = y.color, n = y.value;
                    else if (y.value > a) {
                        o = y.color, r = y.value;
                        break
                    }
                }
                if (!isNaN(n) && !isNaN(r)) {
                    var h = r - n;
                    if (h > 0) {
                        var c = (a - n) / h;
                        if (c) {
                            var d = (r - a) / h;
                            if (d) {
                                for (var g = [], _ = 0; _ < 4; _++) g[_] = Math.round(i[_] * d + o[_] * c);
                                return g
                            }
                            return o
                        }
                        return i
                    }
                }
                return null
            }
        }),
        N = t.Path.extend({
            initialize: function(e, i, o) {
                t.setOptions(this, o), this._size = i, this._latlng = t.latLng(e), this._svgCanvasIncludes()
            },
            toGeoJSON: function() {
                return t.GeoJSON.getFeature(this, {
                    type: "Point",
                    coordinates: t.GeoJSON.latLngToCoords(this.getLatLng())
                })
            },
            _svgCanvasIncludes: function() {},
            _project: function() {
                this._point = this._map.latLngToLayerPoint(this._latlng)
            },
            _update: function() {
                this._map && this._updatePath()
            },
            _updatePath: function() {},
            setLatLng: function(e) {
                return this._latlng = t.latLng(e), this.redraw(), this.fire("move", {
                    latlng: this._latlng
                })
            },
            getLatLng: function() {
                return this._latlng
            },
            setSize: function(e) {
                return this._size = e, this.redraw()
            },
            getSize: function() {
                return this._size
            }
        }),
        O = N.extend({
            initialize: function(e, t, i) {
                N.prototype.initialize.call(this, e, t, i)
            },
            _updatePath: function() {
                this._renderer._updateCrossMarker(this)
            },
            _svgCanvasIncludes: function() {
                t.Canvas.include({
                    _updateCrossMarker: function(e) {
                        var t = e._point,
                            i = e._size / 2,
                            o = this._ctx;
                        o.beginPath(), o.moveTo(t.x, t.y + i), o.lineTo(t.x, t.y - i), this._fillStroke(o, e), o.moveTo(t.x - i, t.y), o.lineTo(t.x + i, t.y), this._fillStroke(o, e)
                    }
                }), t.SVG.include({
                    _updateCrossMarker: function(e) {
                        var i = e._point,
                            o = e._size / 2;
                        t.Browser.vml && (i._round(), o = Math.round(o));
                        var n = "M" + i.x + "," + (i.y + o) + "L" + i.x + "," + (i.y - o) + "M" + (i.x - o) + "," + i.y + "L" + (i.x + o) + "," + i.y;
                        this._setPath(e, n)
                    }
                })
            }
        }),
        G = function(e, t, i) {
            return new O(e, t, i)
        },
        E = N.extend({
            initialize: function(e, t, i) {
                N.prototype.initialize.call(this, e, t, i)
            },
            _updatePath: function() {
                this._renderer._updateXMarker(this)
            },
            _svgCanvasIncludes: function() {
                t.Canvas.include({
                    _updateXMarker: function(e) {
                        var t = e._point,
                            i = e._size / 2,
                            o = this._ctx;
                        o.beginPath(), o.moveTo(t.x + i, t.y + i), o.lineTo(t.x - i, t.y - i), this._fillStroke(o, e)
                    }
                }), t.SVG.include({
                    _updateXMarker: function(e) {
                        var i = e._point,
                            o = e._size / 2;
                        t.Browser.vml && (i._round(), o = Math.round(o));
                        var n = "M" + (i.x + o) + "," + (i.y + o) + "L" + (i.x - o) + "," + (i.y - o) + "M" + (i.x - o) + "," + (i.y + o) + "L" + (i.x + o) + "," + (i.y - o);
                        this._setPath(e, n)
                    }
                })
            }
        }),
        j = function(e, t, i) {
            return new E(e, t, i)
        },
        B = N.extend({
            options: {
                fill: !0
            },
            initialize: function(e, t, i) {
                N.prototype.initialize.call(this, e, t, i)
            },
            _updatePath: function() {
                this._renderer._updateSquareMarker(this)
            },
            _svgCanvasIncludes: function() {
                t.Canvas.include({
                    _updateSquareMarker: function(e) {
                        var t = e._point,
                            i = e._size / 2,
                            o = this._ctx;
                        o.beginPath(), o.moveTo(t.x + i, t.y + i), o.lineTo(t.x - i, t.y + i), o.lineTo(t.x - i, t.y - i), o.lineTo(t.x + i, t.y - i), o.closePath(), this._fillStroke(o, e)
                    }
                }), t.SVG.include({
                    _updateSquareMarker: function(e) {
                        var i = e._point,
                            o = e._size / 2;
                        t.Browser.vml && (i._round(), o = Math.round(o));
                        var n = "M" + (i.x + o) + "," + (i.y + o) + "L" + (i.x - o) + "," + (i.y + o) + "L" + (i.x - o) + "," + (i.y - o) + "L" + (i.x + o) + "," + (i.y - o);
                        n += t.Browser.svg ? "z" : "x", this._setPath(e, n)
                    }
                })
            }
        }),
        A = function(e, t, i) {
            return new B(e, t, i)
        },
        q = N.extend({
            options: {
                fill: !0
            },
            initialize: function(e, t, i) {
                N.prototype.initialize.call(this, e, t, i)
            },
            _updatePath: function() {
                this._renderer._updateDiamondMarker(this)
            },
            _svgCanvasIncludes: function() {
                t.Canvas.include({
                    _updateDiamondMarker: function(e) {
                        var t = e._point,
                            i = e._size / 2,
                            o = this._ctx;
                        o.beginPath(), o.moveTo(t.x, t.y + i), o.lineTo(t.x - i, t.y), o.lineTo(t.x, t.y - i), o.lineTo(t.x + i, t.y), o.closePath(), this._fillStroke(o, e)
                    }
                }), t.SVG.include({
                    _updateDiamondMarker: function(e) {
                        var i = e._point,
                            o = e._size / 2;
                        t.Browser.vml && (i._round(), o = Math.round(o));
                        var n = "M" + i.x + "," + (i.y + o) + "L" + (i.x - o) + "," + i.y + "L" + i.x + "," + (i.y - o) + "L" + (i.x + o) + "," + i.y;
                        n += t.Browser.svg ? "z" : "x", this._setPath(e, n)
                    }
                })
            }
        }),
        U = function(e, t, i) {
            return new q(e, t, i)
        },
        W = F.extend({
            statics: {
                MARKERTYPES: ["esriSMSCircle", "esriSMSCross", "esriSMSDiamond", "esriSMSSquare", "esriSMSX", "esriPMS"]
            },
            initialize: function(e, t) {
                var i;
                if (F.prototype.initialize.call(this, e, t), t && (this.serviceUrl = t.url), e)
                    if ("esriPMS" === e.type) {
                        var o = this._symbolJson.url;
                        o && "http://" === o.substr(0, 7) || "https://" === o.substr(0, 8) ? (i = this.sanitize(o), this._iconUrl = i) : (i = this.serviceUrl + "images/" + o, this._iconUrl = t && t.token ? i + "?token=" + t.token : i), e.imageData && (this._iconUrl = "data:" + e.contentType + ";base64," + e.imageData), this._icons = {}, this.icon = this._createIcon(this._symbolJson)
                    } else this._fillStyles()
            },
            sanitize: function(e) {
                if (!e) return "";
                var t;
                try {
                    t = e.replace(/<br>/gi, "\n"), t = t.replace(/<p.*>/gi, "\n"), t = t.replace(/<a.*href='(.*?)'.*>(.*?)<\/a>/gi, " $2 ($1) "), t = t.replace(/<(?:.|\s)*?>/g, "")
                } catch (i) {
                    t = null
                }
                return t
            },
            _fillStyles: function() {
                this._symbolJson.outline && this._symbolJson.size > 0 && "esriSLSNull" !== this._symbolJson.outline.style ? (this._styles.stroke = !0, this._styles.weight = this.pixelValue(this._symbolJson.outline.width), this._styles.color = this.colorValue(this._symbolJson.outline.color), this._styles.opacity = this.alphaValue(this._symbolJson.outline.color)) : this._styles.stroke = !1, this._symbolJson.color ? (this._styles.fillColor = this.colorValue(this._symbolJson.color), this._styles.fillOpacity = this.alphaValue(this._symbolJson.color)) : this._styles.fillOpacity = 0, "esriSMSCircle" === this._symbolJson.style && (this._styles.radius = this.pixelValue(this._symbolJson.size) / 2)
            },
            _createIcon: function(e) {
                var i = this.pixelValue(e.width),
                    o = i;
                e.height && (o = this.pixelValue(e.height));
                var n = i / 2,
                    r = o / 2;
                e.xoffset && (n += this.pixelValue(e.xoffset)), e.yoffset && (r += this.pixelValue(e.yoffset));
                var s = t.icon({
                    iconUrl: this._iconUrl,
                    iconSize: [i, o],
                    iconAnchor: [n, r]
                });
                return this._icons[e.width.toString()] = s, s
            },
            _getIcon: function(e) {
                var t = this._icons[e.toString()];
                return t || (t = this._createIcon({
                    width: e
                })), t
            },
            pointToLayer: function(e, i, o, n) {
                var r = this._symbolJson.size || this._symbolJson.width;
                if (!this._isDefault) {
                    if (o.sizeInfo) {
                        var s = this.getSize(e, o.sizeInfo);
                        s && (r = s)
                    }
                    if (o.colorInfo) {
                        var a = this.getColor(e, o.colorInfo);
                        a && (this._styles.fillColor = this.colorValue(a), this._styles.fillOpacity = this.alphaValue(a))
                    }
                }
                if ("esriPMS" === this._symbolJson.type) {
                    var l = t.extend({}, {
                        icon: this._getIcon(r)
                    }, n);
                    return t.marker(i, l)
                }
                switch (r = this.pixelValue(r), this._symbolJson.style) {
                    case "esriSMSSquare":
                        return A(i, r, t.extend({}, this._styles, n));
                    case "esriSMSDiamond":
                        return U(i, r, t.extend({}, this._styles, n));
                    case "esriSMSCross":
                        return G(i, r, t.extend({}, this._styles, n));
                    case "esriSMSX":
                        return j(i, r, t.extend({}, this._styles, n))
                }
                return this._styles.radius = r / 2, t.circleMarker(i, t.extend({}, this._styles, n))
            }
        }),
        R = F.extend({
            statics: {
                LINETYPES: ["esriSLSDash", "esriSLSDot", "esriSLSDashDotDot", "esriSLSDashDot", "esriSLSSolid"]
            },
            initialize: function(e, t) {
                F.prototype.initialize.call(this, e, t), this._fillStyles()
            },
            _fillStyles: function() {
                if (this._styles.lineCap = "butt", this._styles.lineJoin = "miter", this._styles.fill = !1, this._styles.weight = 0, !this._symbolJson) return this._styles;
                if (this._symbolJson.color && (this._styles.color = this.colorValue(this._symbolJson.color), this._styles.opacity = this.alphaValue(this._symbolJson.color)), !isNaN(this._symbolJson.width)) {
                    this._styles.weight = this.pixelValue(this._symbolJson.width);
                    var e = [];
                    switch (this._symbolJson.style) {
                        case "esriSLSDash":
                            e = [4, 3];
                            break;
                        case "esriSLSDot":
                            e = [1, 3];
                            break;
                        case "esriSLSDashDot":
                            e = [8, 3, 1, 3];
                            break;
                        case "esriSLSDashDotDot":
                            e = [8, 3, 1, 3, 1, 3]
                    }
                    if (e.length > 0) {
                        for (var t = 0; t < e.length; t++) e[t] *= this._styles.weight;
                        this._styles.dashArray = e.join(",")
                    }
                }
            },
            style: function(e, t) {
                if (!this._isDefault && t) {
                    if (t.sizeInfo) {
                        var i = this.pixelValue(this.getSize(e, t.sizeInfo));
                        i && (this._styles.weight = i)
                    }
                    if (t.colorInfo) {
                        var o = this.getColor(e, t.colorInfo);
                        o && (this._styles.color = this.colorValue(o), this._styles.opacity = this.alphaValue(o))
                    }
                }
                return this._styles
            }
        }),
        Y = F.extend({
            statics: {
                POLYGONTYPES: ["esriSFSSolid"]
            },
            initialize: function(e, t) {
                F.prototype.initialize.call(this, e, t), e && (e.outline && "esriSLSNull" === e.outline.style ? this._lineStyles = {
                    weight: 0
                } : this._lineStyles = c(e.outline, t).style(), this._fillStyles())
            },
            _fillStyles: function() {
                if (this._lineStyles)
                    if (0 === this._lineStyles.weight) this._styles.stroke = !1;
                    else
                        for (var e in this._lineStyles) this._styles[e] = this._lineStyles[e];
                this._symbolJson && (this._symbolJson.color && Y.POLYGONTYPES.indexOf(this._symbolJson.style >= 0) ? (this._styles.fill = !0, this._styles.fillColor = this.colorValue(this._symbolJson.color), this._styles.fillOpacity = this.alphaValue(this._symbolJson.color)) : (this._styles.fill = !1, this._styles.fillOpacity = 0))
            },
            style: function(e, t) {
                if (!this._isDefault && t && t.colorInfo) {
                    var i = this.getColor(e, t.colorInfo);
                    i && (this._styles.fillColor = this.colorValue(i), this._styles.fillOpacity = this.alphaValue(i))
                }
                return this._styles
            }
        }),
        K = t.Class.extend({
            options: {
                proportionalPolygon: !1,
                clickable: !0
            },
            initialize: function(e, i) {
                this._rendererJson = e, this._pointSymbols = !1, this._symbols = [], this._visualVariables = this._parseVisualVariables(e.visualVariables), t.Util.setOptions(this, i)
            },
            _parseVisualVariables: function(e) {
                var t = {};
                if (e)
                    for (var i = 0; i < e.length; i++) t[e[i].type] = e[i];
                return t
            },
            _createDefaultSymbol: function() {
                this._rendererJson.defaultSymbol && (this._defaultSymbol = this._newSymbol(this._rendererJson.defaultSymbol), this._defaultSymbol._isDefault = !0)
            },
            _newSymbol: function(e) {
                return "esriSMS" === e.type || "esriPMS" === e.type ? (this._pointSymbols = !0, h(e, this.options)) : "esriSLS" === e.type ? c(e, this.options) : "esriSFS" === e.type ? d(e, this.options) : void 0
            },
            _getSymbol: function() {},
            attachStylesToLayer: function(e) {
                this._pointSymbols ? e.options.pointToLayer = t.Util.bind(this.pointToLayer, this) : (e.options.style = t.Util.bind(this.style, this), e._originalStyle = e.options.style)
            },
            pointToLayer: function(e, i) {
                var o = this._getSymbol(e);
                return o && o.pointToLayer ? o.pointToLayer(e, i, this._visualVariables, this.options) : t.circleMarker(i, {
                    radius: 0,
                    opacity: 0
                })
            },
            style: function(e) {
                var t;
                this.options.userDefinedStyle && (t = this.options.userDefinedStyle(e));
                var i = this._getSymbol(e);
                return i ? this.mergeStyles(i.style(e, this._visualVariables), t) : this.mergeStyles({
                    opacity: 0,
                    fillOpacity: 0
                }, t)
            },
            mergeStyles: function(e, t) {
                var i, o = {};
                for (i in e) e.hasOwnProperty(i) && (o[i] = e[i]);
                if (t)
                    for (i in t) t.hasOwnProperty(i) && (o[i] = t[i]);
                return o
            }
        }),
        X = K.extend({
            initialize: function(e, t) {
                K.prototype.initialize.call(this, e, t), this._field = this._rendererJson.field, this._rendererJson.normalizationType && "esriNormalizeByField" === this._rendererJson.normalizationType && (this._normalizationField = this._rendererJson.normalizationField), this._createSymbols()
            },
            _createSymbols: function() {
                var e, t = this._rendererJson.classBreakInfos;
                this._symbols = [];
                for (var i = t.length - 1; i >= 0; i--) e = this.options.proportionalPolygon && this._rendererJson.backgroundFillSymbol ? this._newSymbol(this._rendererJson.backgroundFillSymbol) : this._newSymbol(t[i].symbol), e.val = t[i].classMaxValue, this._symbols.push(e);
                this._symbols.sort(function(e, t) {
                    return e.val > t.val ? 1 : -1
                }), this._createDefaultSymbol(), this._maxValue = this._symbols[this._symbols.length - 1].val
            },
            _getSymbol: function(e) {
                var t = e.properties[this._field];
                if (this._normalizationField) {
                    var i = e.properties[this._normalizationField];
                    if (isNaN(i) || 0 === i) return this._defaultSymbol;
                    t /= i
                }
                if (t > this._maxValue) return this._defaultSymbol;
                for (var o = this._symbols[0], n = this._symbols.length - 1; n >= 0 && !(t > this._symbols[n].val); n--) o = this._symbols[n];
                return o
            }
        }),
        H = K.extend({
            initialize: function(e, t) {
                K.prototype.initialize.call(this, e, t), this._field = this._rendererJson.field1, this._createSymbols()
            },
            _createSymbols: function() {
                for (var e, t = this._rendererJson.uniqueValueInfos, i = t.length - 1; i >= 0; i--) e = this._newSymbol(t[i].symbol), e.val = t[i].value, this._symbols.push(e);
                this._createDefaultSymbol()
            },
            _getSymbol: function(e) {
                var t = e.properties[this._field];
                if (this._rendererJson.fieldDelimiter && this._rendererJson.field2) {
                    var i = e.properties[this._rendererJson.field2];
                    if (i) {
                        t += this._rendererJson.fieldDelimiter + i;
                        var o = e.properties[this._rendererJson.field3];
                        o && (t += this._rendererJson.fieldDelimiter + o)
                    }
                }
                for (var n = this._defaultSymbol, r = this._symbols.length - 1; r >= 0; r--) this._symbols[r].val == t && (n = this._symbols[r]);
                return n
            }
        }),
        $ = K.extend({
            initialize: function(e, t) {
                K.prototype.initialize.call(this, e, t), this._createSymbol()
            },
            _createSymbol: function() {
                this._rendererJson.symbol && this._symbols.push(this._newSymbol(this._rendererJson.symbol))
            },
            _getSymbol: function() {
                return this._symbols[0]
            }
        }),
        Q = t.GeoJSON.extend({
            options: {
                data: {},
                opacity: 1
            },
            initialize: function(e, i) {
                t.setOptions(this, i), this.data = this.options.data, this.opacity = this.options.opacity, this.popupInfo = null, this.labelingInfo = null, this._layers = {};
                var o, n;
                if (e)
                    for (o = 0, n = e.length; o < n; o++) this.addLayer(e[o]);
                "string" == typeof this.data ? this._getFeatureCollection(this.data) : this._parseFeatureCollection(this.data)
            },
            _getFeatureCollection: function(e) {
                var i = "https://www.arcgis.com/sharing/rest/content/items/" + e + "/data";
                t.esri.request(i, {}, function(e, t) {
                    e ? console.log(e) : this._parseFeatureCollection(t)
                }, this)
            },
            _parseFeatureCollection: function(e) {
                var t, i, o = 0;
                for (t = 0, i = e.layers.length; t < i; t++) e.layers[t].featureSet.features.length > 0 && (o = t);
                var n = e.layers[o].featureSet.features,
                    r = e.layers[o].layerDefinition.geometryType,
                    s = e.layers[o].layerDefinition.objectIdField,
                    a = e.layers[o].layerDefinition || null;
                4326 !== e.layers[o].layerDefinition.extent.spatialReference.wkid && (102100 !== e.layers[o].layerDefinition.extent.spatialReference.wkid && console.error("[L.esri.WebMap] this wkid (" + e.layers[o].layerDefinition.extent.spatialReference.wkid + ") is not supported."), n = this._projTo4326(n, r)), void 0 !== e.layers[o].popupInfo && (this.popupInfo = e.layers[o].popupInfo), void 0 !== e.layers[o].layerDefinition.drawingInfo.labelingInfo && (this.labelingInfo = e.layers[o].layerDefinition.drawingInfo.labelingInfo), console.log(e);
                var l = this._featureCollectionToGeoJSON(n, s);
                null !== a && v(a, this), console.log(l), this.addData(l)
            },
            _projTo4326: function(e, i) {
                console.log("_project!");
                var o, n, r = [];
                for (o = 0, n = e.length; o < n; o++) {
                    var s, a, l, u = e[o];
                    if ("esriGeometryPoint" === i) s = t.Projection.SphericalMercator.unproject(t.point(u.geometry.x, u.geometry.y)), u.geometry.x = s.lng, u.geometry.y = s.lat;
                    else if ("esriGeometryMultipoint" === i) {
                        var p;
                        for (a = 0, p = u.geometry.points.length; a < p; a++) s = t.Projection.SphericalMercator.unproject(t.point(u.geometry.points[a][0], u.geometry.points[a][1])), u.geometry.points[a][0] = s.lng, u.geometry.points[a][1] = s.lat
                    } else if ("esriGeometryPolyline" === i) {
                        var f, y;
                        for (a = 0, y = u.geometry.paths.length; a < y; a++)
                            for (l = 0, f = u.geometry.paths[a].length; l < f; l++) s = t.Projection.SphericalMercator.unproject(t.point(u.geometry.paths[a][l][0], u.geometry.paths[a][l][1])), u.geometry.paths[a][l][0] = s.lng, u.geometry.paths[a][l][1] = s.lat
                    } else if ("esriGeometryPolygon" === i) {
                        var h, c;
                        for (a = 0, c = u.geometry.rings.length; a < c; a++)
                            for (l = 0, h = u.geometry.rings[a].length; l < h; l++) s = t.Projection.SphericalMercator.unproject(t.point(u.geometry.rings[a][l][0], u.geometry.rings[a][l][1])), u.geometry.rings[a][l][0] = s.lng, u.geometry.rings[a][l][1] = s.lat
                    }
                    r.push(u)
                }
                return r
            },
            _featureCollectionToGeoJSON: function(e, t) {
                var i, o, n = {
                        type: "FeatureCollection",
                        features: []
                    },
                    r = [];
                for (i = 0, o = e.length; i < o; i++) {
                    var s = y(e[i], t);
                    r.push(s)
                }
                return n.features = r, n
            }
        }),
        Z = t.GeoJSON.extend({
            options: {
                url: "",
                data: {},
                opacity: 1
            },
            initialize: function(e, i) {
                t.setOptions(this, i), this.url = this.options.url, this.layerDefinition = this.options.layerDefinition, this.locationInfo = this.options.locationInfo, this.opacity = this.options.opacity, this._layers = {};
                var o, n;
                if (e)
                    for (o = 0, n = e.length; o < n; o++) this.addLayer(e[o]);
                this._parseCSV(this.url, this.layerDefinition, this.locationInfo)
            },
            _parseCSV: function(e, t, o) {
                i.csv(e, {
                    latfield: o.latitudeFieldName,
                    lonfield: o.longitudeFieldName
                }, this), v(t, this)
            }
        }),
        ee = t.GeoJSON.extend({
            options: {
                opacity: 1,
                url: ""
            },
            initialize: function(e, i) {
                t.setOptions(this, i), this.url = this.options.url, this.opacity = this.options.opacity, this.popupInfo = null, this.labelingInfo = null, this._layers = {};
                var o, n;
                if (e)
                    for (o = 0, n = e.length; o < n; o++) this.addLayer(e[o]);
                this._getKML(this.url)
            },
            _getKML: function(e) {
                var i = "http://utility.arcgis.com/sharing/kml?url=" + e + '&model=simple&folders=&outSR=%7B"wkid"%3A4326%7D';
                t.esri.request(i, {}, function(e, t) {
                    e ? console.log(e) : (console.log(t), this._parseFeatureCollection(t.featureCollection))
                }, this)
            },
            _parseFeatureCollection: function(e) {
                console.log("_parseFeatureCollection");
                var t;
                for (t = 0; t < 3; t++)
                    if (e.layers[t].featureSet.features.length > 0) {
                        console.log(t);
                        var i = e.layers[t].featureSet.features,
                            o = e.layers[t].layerDefinition.objectIdField,
                            n = this._featureCollectionToGeoJSON(i, o);
                        void 0 !== e.layers[t].popupInfo && (this.popupInfo = e.layers[t].popupInfo), void 0 !== e.layers[t].layerDefinition.drawingInfo.labelingInfo && (this.labelingInfo = e.layers[t].layerDefinition.drawingInfo.labelingInfo), v(e.layers[t].layerDefinition, this), console.log(n), this.addData(n)
                    }
            },
            _featureCollectionToGeoJSON: function(e, t) {
                var i, o, n = {
                        type: "FeatureCollection",
                        features: []
                    },
                    r = [];
                for (i = 0, o = e.length; i < o; i++) {
                    var s = y(e[i], t);
                    r.push(s)
                }
                return n.features = r, n
            }
        }),
        te = t.DivIcon.extend({
            options: {
                iconSize: null,
                className: "esri-leaflet-webmap-labels",
                text: ""
            },
            createIcon: function(e) {
                var i = e && "DIV" === e.tagName ? e : document.createElement("div"),
                    o = this.options;
                if (i.innerHTML = '<div style="position: relative; left: -50%; text-shadow: 1px 1px 0px #fff, -1px 1px 0px #fff, 1px -1px 0px #fff, -1px -1px 0px #fff;">' + o.text + "</div>", i.style.fontSize = "1em", i.style.fontWeight = "bold", i.style.textTransform = "uppercase", i.style.textAlign = "center", i.style.whiteSpace = "nowrap", o.bgPos) {
                    var n = t.point(o.bgPos);
                    i.style.backgroundPosition = -n.x + "px " + -n.y + "px"
                }
                return this._setIconStyles(i, "icon"), i
            }
        }),
        ie = t.Marker.extend({
            options: {
                properties: {},
                labelingInfo: {},
                offset: [0, 0]
            },
            initialize: function(e, i) {
                t.setOptions(this, i), this._latlng = t.latLng(e);
                var o = this._createLabelText(this.options.properties, this.options.labelingInfo);
                this._setLabelIcon(o, this.options.offset)
            },
            _createLabelText: function(e, t) {
                var i = /\[([^\]]*)\]/g,
                    o = t[0].labelExpression;
                return o = o.replace(i, function(t) {
                    var o = i.exec(t);
                    return e[o[1]]
                })
            },
            _setLabelIcon: function(e, t) {
                var i = L({
                    text: e,
                    iconAnchor: t
                });
                this.setIcon(i)
            }
        }),
        oe = t.Evented.extend({
            options: {
                map: {},
                token: null,
                server: "www.arcgis.com"
            },
            initialize: function(e, i) {
                t.setOptions(this, i), this._map = this.options.map, this._token = this.options.token, this._server = this.options.server, this._webmapId = e, this._loaded = !1, this._metadataLoaded = !1, this.layers = [], this.title = "", this.bookmarks = [], this.portalItem = {}, this.VERSION = V, this._loadWebMapMetaData(e), this._loadWebMap(e)
            },
            _loadWebMapMetaData: function(e) {
                var i = {},
                    o = this._map,
                    n = this,
                    r = "https://" + this._server + "/sharing/rest/content/items/" + e;
                this._token && this._token.length > 0 && (i.token = this._token), t.esri.request(r, i, function(e, t) {
                    e ? console.log(e) : (console.log("WebMap MetaData: ", t), n.portalItem = t, n.title = t.title, n._metadataLoaded = !0, n.fire("metadataLoad"), o.fitBounds([t.extent[0].reverse(), t.extent[1].reverse()]))
                })
            },
            _loadWebMap: function(e) {
                var i = this._map,
                    o = this.layers,
                    n = {},
                    r = "https://" + this._server + "/sharing/rest/content/items/" + e + "/data";
                this._token && this._token.length > 0 && (n.token = this._token), t.esri.request(r, n, function(e, n) {
                    e ? console.log(e) : (console.log("WebMap: ", n), n.baseMap.baseMapLayers.map(function(e) {
                        var t = P(e, o, i).addTo(i);
                        void 0 !== t && e.visibility === !0 && t.addTo(i)
                    }), n.operationalLayers.map(function(e, t) {
                        var n = "esri-webmap-layer" + t;
                        i.createPane(n);
                        var r = P(e, o, i, n);
                        void 0 !== r && e.visibility === !0 && r.addTo(i)
                    }), void 0 !== n.bookmarks && n.bookmarks.length > 0 && n.bookmarks.map(function(e) {
                        var i = t.Projection.SphericalMercator.unproject(t.point(e.extent.xmax, e.extent.ymax)),
                            o = t.Projection.SphericalMercator.unproject(t.point(e.extent.xmin, e.extent.ymin)),
                            n = t.latLngBounds(o, i);
                        this.bookmarks.push({
                            name: e.name,
                            bounds: n
                        })
                    }.bind(this)), this._loaded = !0, this.fire("load"))
                }.bind(this))
            }
        });
    e.WebMap = oe, e.webMap = J, e.operationalLayer = P, e.FeatureCollection = Q, e.featureCollection = S, e.LabelMarker = ie, e.labelMarker = w, e.LabelIcon = te, e.labelIcon = L, e.createPopupContent = z, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=esri-leaflet-webmap.js.map
