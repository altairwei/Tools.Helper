var WizAnnotator = (function() {
    //Selection's type == 'Caret' will make <span>&#8203</span>
    var SPACE_CHAR = String.fromCharCode(8203);
    var WIZ_SPAN_ATTR_ANNO = 'anno-wiz-span';
    var WIZ_SPAN_ATTR = 'data-wiz-span';
    var WIZ_TOOLHELPER_COMMENT = 'WizKMComment_';


    var utils = {
        fillChar: '\u200B',
        isFillChar: function(node, isInStart) {
            return node.nodeType == 3 && !node.nodeValue.replace(new RegExp((isInStart ? '^' : '') + utils.fillChar), '').length
        },
        isBody: function(node) {
            return node && node.nodeType == 1 && node.tagName.toLowerCase() == 'body';
        },
        isArray: function(arr) {
            return Object.prototype.toString.apply(arr) === "[object Array]";
        },
        listToMap: function(list) {
            if (!list) return {};
            list = utils.isArray(list) ? list : list.split(',');
            for (var i = 0, ci, obj = {}; ci = list[i++]; ) {
                obj[ci.toUpperCase()] = obj[ci] = 1;
            }
            return obj;
        },
        findParent: function(node, filterFn, includeSelf) {
            if (node && !utils.isBody(node)) {
                node = includeSelf ? node : node.parentNode;
                while (node) {
                    if (!filterFn || filterFn(node))
                        return node;
                    if (utils.isBody(node))
                        return null;
                    node = node.parentNode;
                }
            }
            return null;
        },
        findParentByTagName: function(node, tagNames, includeSelf, excludeFn) {
            tagNames = utils.listToMap(utils.isArray(tagNames) ? tagNames : [tagNames]);
            return utils.findParent(node, function(node) {
                return tagNames[node.tagName] && !(excludeFn && excludeFn(node));
            }, includeSelf);
        },
        appendStyle: function (styleStr, styleObj) {
            if (!styleStr) {
                return;
            }
            var styleList = styleStr.split(';'), i, j, t;
            for (i = 0, j = styleList.length; i < j; i++) {
                if (styleList[i].indexOf(':') > 0) {
                    t = styleList[i].split(':');
                    styleObj[utils.trim(t[0])] = utils.trim(t[1]);
                }
            }
        },
        trim: function(str) {
            return (!str) ? str : str.replace(/^[ ]*|[ ]*$/ig, '');
        },
        setRange: function(doc, start, end) {
            if (!start && !end) {
                return;
            }
            var sel = doc.getSelection();
            sel.removeAllRanges();
            var range = doc.createRange();
            if (start) {
                range.setStartBefore(start);
            }
            if (end) {
                range.setEndAfter(end);
            }
            sel.addRange(range);
        },
        getRandomInt: function() {
            var d = new Date();
            return d.getTime();
        }
    };
    var modifyStyle = {
        /**
         * modify style which in RangeList Array
         * @param doc
         * @param domList
         * @param style
         */
        list: function(doc, domList, title) {
            if (domList.length == 0) {
                return;
            }
            var i, j, item;
            for (i = 0, j = domList.length; i < j; i++) {
                item = domList[i];
                if (domChecker.isUsableText(item)) {
                    domList[i] = domMaker.modifyTextNode(doc, item);
                    modifyStyle.apply(doc, domList[i], title);
                } else if (item.nodeType == 1) {
                    modifyStyle.child(doc, item, title);
                }
            }
        },
        /**
         * modify all child nodes's style
         * @param doc
         * @param dom
         * @param style
         */
        child: function(doc, dom, title) {
            if (!dom) {
                return;
            }
            var ns = dom.childNodes, done = false, i, j, item;
            for (i = 0, j = ns.length; i < j; i++) {
                item = ns[i];
                if (!done && domChecker.isUsableText(item)) {
                    done = true;
                    modifyStyle.apply(doc, dom, title);
                } else if (item.nodeType == 1) {
                    modifyStyle.child(doc, item, title);
                }
            }
        },
        /**
         * modify single dom's style
         * @param doc
         * @param dom
         * @param style
         */
        apply: function(doc, dom, title) {
            if (dom.tagName.toLowerCase() == 'br') {
                return;
            }
            var d = dom;
            if (dom.tagName.toLowerCase() !== 'span' ||  dom.getAttribute(WIZ_SPAN_ATTR_ANNO) !== WIZ_SPAN_ATTR_ANNO) {
                if (!title)
                    return;
                //
                d = domMaker.createSpan(doc);
                dom.insertBefore(d, null);
                while (dom.childNodes.length > 1) {
                    d.insertBefore(dom.childNodes[0], null);
                }
            }
            //
            d.title = title;
            //
            if (!title) {
                modifyStyle.clearStyle(doc, d, 'border-bottom-width');
                modifyStyle.clearStyle(doc, d, 'border-bottom-color');
                modifyStyle.clearStyle(doc, d, 'border-bottom-style');
            }
            else {
                d.style.borderBottomWidth = '2px';
                d.style.borderBottomColor = '#ff0000';
                d.style.borderBottomStyle = 'dashed';
            }
        },
        clearStyle: function(doc, dom, styleKey) {
            var parent,nParent;
            while(dom.getAttribute(WIZ_SPAN_ATTR_ANNO) === WIZ_SPAN_ATTR_ANNO) {
                dom.style[styleKey] = '';

                parent = dom.parentNode;
                nParent = parent.parentNode;
                if (parent.getAttribute(WIZ_SPAN_ATTR_ANNO) !== WIZ_SPAN_ATTR_ANNO) {
                    break;
                }
                if (!dom.previousSibling && !dom.nextSibling) {
                    dom = parent;
                } else if (!dom.previousSibling) {
                    nParent.insertBefore(dom, parent);
                } else if (!dom.nextSibling) {
                    nParent.insertBefore(dom, parent.nextSibling);
                } else {
                    var nSpan = domMaker.createSpan(doc);
                    nSpan.setAttribute('style', nParent.getAttribute('style'));
                    while(dom.nextSibling) {
                        nSpan.insertBefore(dom.nextSibling);
                    }
                    nParent.insertBefore(dom, parent.nextSibling);
                    nParent.insertBefore(nSpan, dom.nextSibling);
                    var style = clearTools.mergeStyleAToB(parent, dom);
                    dom.setAttribute('style', style);
                    style = clearTools.mergeStyleAToB(parent, nSpan);
                    nSpan.setAttribute('style', style);
                }
            }
        }        
    };

    var clearTools = {
        /**
         * merge objA's style to objB's style
         * @param objA
         * @param objB
         * @returns {*}
         */
        mergeStyleAToB: function(objA,objB) {
            var sA = objA.getAttribute('style'),
                sB = objB.getAttribute('style');
            if (!sA || !sB) {
                return sA || sB || '';
            }
            var styleObj = {};
            utils.appendStyle(sA, styleObj);
            utils.appendStyle(sB, styleObj);

            var result = [];
            for (var k in styleObj) {
                if (styleObj.hasOwnProperty(k)) {
                    result.push(k + ':' + styleObj[k]);
                }
            }
            return result.join(';');
        },
        /**
         * merge the same span with the same level
         * @param parentDom
         * @param excludeList
         */
        mergeSiblingSpan: function(parentDom, excludeList) {
            var n = parentDom.childNodes[0], m, tmp;
            if (!n) {
                return;
            }
            while (n) {
                m = n.nextSibling;
                if (excludeList.indexOf(m) < 0 && excludeList.indexOf(n) < 0 && domChecker.isSameSpan(n, m)) {
                    while (m.childNodes.length) {
                        tmp = m.childNodes[0];
                        if (tmp && (tmp.innerHTML || (tmp.nodeValue && tmp.nodeValue != SPACE_CHAR))) {
                            n.appendChild(tmp);
                        } else {
                            m.removeChild(tmp);
                        }
                    }
                    m.parentNode.removeChild(m);
                } else {
                    n = m;
                }
            }
        },
        /**
         * merge the same span with parent and child nodes.
         * @param dom
         * @param excludeList
         */
        mergeChildSpan: function(dom, excludeList) {
            if (!dom || dom.nodeType !== 1) {
                return;
            }
            var i, j;
            for (i = 0, j = dom.children.length; i < j; i++) {
                clearTools.mergeChildSpan(dom.children[i], excludeList);
            }
            clearTools.mergeSiblingSpan(dom, excludeList);

            var n = dom.children[0], tmp;
            if (!!n && excludeList.indexOf(n) < 0 && dom.childNodes.length == 1
                && dom.getAttribute(WIZ_SPAN_ATTR_ANNO) == WIZ_SPAN_ATTR_ANNO
                && n.getAttribute(WIZ_SPAN_ATTR_ANNO) == WIZ_SPAN_ATTR_ANNO) {
                clearTools.mergeChildToParent(dom, n);
            } else {
                while (!!n) {
                    if (excludeList.indexOf(n) < 0 && excludeList.indexOf(dom) < 0 && domChecker.isSameSpan(dom, n)) {
                        tmp = n.previousElementSibling;
                        clearTools.mergeChildToParent(dom, n);
                        n = tmp ? tmp.nextElementSibling : dom.children[0];
                    } else {
                        n = n.nextElementSibling;
                    }
                }
            }
        },
        /**
         * merge child to parent and copy the child's style to parent
         * @param parent
         * @param child
         */
        mergeChildToParent: function(parent, child) {
            if (!parent || !child || child.parentNode !== parent) {
                return;
            }
            while (child.childNodes.length > 0) {
                parent.insertBefore(child.childNodes[0], child);
            }
            var style = clearTools.mergeStyleAToB(parent, child);
            parent.setAttribute('style', style);
            parent.removeChild(child);
            //
            parent.title = child.title;
        },
        /**
         * clear empty span & textNode;  merge same span
         * @param dom
         * @param excludeList
         */
        clearChild: function(dom, excludeList) {
            if (!dom) {
                return;
            }
            if (excludeList.indexOf(dom) < 0 && dom.nodeType == 3 && dom.nodeValue == '') {
                dom.parentNode.removeChild(dom);
                return;
            } else if (dom.nodeType == 3) {
                return;
            } else if (dom.nodeType == 1) {
                clearTools.mergeChildSpan(dom, excludeList);
            }
            var ns = dom.childNodes, i, item;
            for (i = ns.length - 1; i >= 0; i--) {
                item = ns[i];
                clearTools.clearChild(item, excludeList);
            }
            if (excludeList.indexOf(dom) < 0 && dom.childNodes.length == 0 && dom.nodeType == 1 && dom.tagName.toLowerCase() == 'span') {
                dom.parentNode.removeChild(dom);
            }
        }
    };

    var domChecker = {
        /**
         * check textNode is usable
         * @param node
         * @returns {boolean}
         */
        isUsableText: function(node) {
            return node.nodeType == 3 && node.nodeValue.replace(/[\r\n  ]/ig, '').length > 0
        },
        /**
         * check same span
         * @param n
         * @param m
         * @returns {boolean}
         */
        isSameSpan: function(n, m) {
            return !!n && !!m && n.nodeType == 1 && m.nodeType == 1
                && n.tagName.toLowerCase() == 'span' && n.tagName == m.tagName
                && n.getAttribute(WIZ_SPAN_ATTR_ANNO) == WIZ_SPAN_ATTR_ANNO
                && domChecker.isSameAnnotation(n, m)
        },        
        /**
         * check same style
         * @param n
         * @param m
         */
        isSameAnnotation: function(n, m) {
            if (n.title == m.title)
                return true;
            //
            return false;
        },
        /**
         * check the tag
         * @param dom
         * @param tagName
         * @returns {boolean}
         */
        isTag: function(dom, tagName) {
            return (!!dom && dom.nodeType === 1 && dom.tagName.toLowerCase() === tagName.toLowerCase());
        }

    };

    var domMaker = {
        /**
         * create span
         * @param doc
         */
        createSpan: function(doc) {
            var s = doc.createElement('span');
            s.setAttribute(WIZ_SPAN_ATTR_ANNO, WIZ_SPAN_ATTR_ANNO);
            s.setAttribute(WIZ_SPAN_ATTR, WIZ_SPAN_ATTR);
            s.setAttribute('style', 'border-bottom: 2px #ff0000 dashed');
            s.id = WIZ_TOOLHELPER_COMMENT + utils.getRandomInt();
            return s;
        },
        /**
         * split textNode to span by selection's range
         * @param doc
         * @param node
         * @param start
         * @param end
         * @returns {*}
         */
        modifyTextNode: function(doc, node, start, end) {
            if (!domChecker.isUsableText(node)) {
                return node;
            }
            var p, s, t, v = node.nodeValue;
            p = node.parentNode;
            s = domMaker.createSpan(doc);

            if (!start && !end || (start === 0 && end === node.nodeValue.length)) {
                //the range is all text in this node
                if (p.childNodes.length > 1) {
                    p.insertBefore(s, node);
                    s.appendChild(node);
                } else {
                    //if textNode is the only child node, return its parent node.
                    s = p;
                }
            } else if (start === 0) {
                //the range is [0, n] (n<length)
                p.insertBefore(s, node);
                s.innerText = v.substring(start, end);
                node.nodeValue = v.substring(end);
            } else if (!end || end === node.nodeValue.length) {
                //the range is [m, length] (m > 0)
                p.insertBefore(s, node.nextSibling);
                s.innerText = v.substring(start);
                node.nodeValue = v.substring(0, start);
            } else {
                //the range is [m, n] (m>0 && n<length)
                p.insertBefore(s, node.nextSibling);
                s.innerText = v.substring(start, end);
                node.nodeValue = v.substring(0, start);
                t = doc.createTextNode(v.substring(end));
                p.insertBefore(t, s.nextSibling);
            }
            return s;
        }
    };
    var domFinder = {
        /**
         * make the RangeList(dom's Array) from selection's range
         * @param doc
         * @returns {Array}
         */
        getRangeDomList: function(doc, create) {
            if (create == undefined)
                create = true;
            //
            var sel = doc.getSelection(),
                range = sel.getRangeAt(0),
                startDom = range.startContainer, startOffset = range.startOffset,
                endDom = range.endContainer, endOffset = range.endOffset;
            // get dom which is start and end
            if (startDom == endDom) {
                if (startDom.nodeType == 3) {
                    startDom = create ? domMaker.modifyTextNode(doc, startDom, startOffset, endOffset) : startDom;    
                }
                //
                endDom = startDom;
            } else {
                if (startDom.nodeType == 3) {
                    startDom = create ? domMaker.modifyTextNode(doc, startDom, startOffset) : startDom;
                }
                else {
                    startDom = startDom.childNodes[startOffset];
                }
                //
                if (endOffset === 0) {
                    endDom = domFinder.getPreviousNode(doc, endDom, startDom);
                }
                else {
                    if (endDom.nodeType == 3) {
                        endDom = create  ? domMaker.modifyTextNode(doc, endDom, 0, endOffset) : endDom;
                    }
                    else {
                        endDom.childNodes[endOffset - 1];
                    }
                }
                
            }
            //make the array
            var curDom = startDom, result = [];
            while (curDom) {
                if (curDom == endDom || curDom == endDom.parentNode) {
                    result.push(endDom);
                    break;
                } else if (curDom == doc.body) {
                    result.push(curDom);
                    break;
                } else {
                    result.push(curDom);
                }

                curDom = domFinder.getNextNode(doc, curDom, endDom);

            }
            return result;
        },
        /**
         * get previous node until startDom
         * @param doc
         * @param dom
         * @param startDom
         * @returns {*}
         */
        getPreviousNode: function(doc, dom, startDom) {
            if (dom == startDom) {
                return null;
            }
            if (!dom.previousSibling) {
                //if hasn't previousSibling,so find its parent's previousSibling
                while (dom.parentNode) {
                    dom = dom.parentNode;
                    if (dom == startDom) {
                        break;
                    }
                    if (dom == doc.body) {
                        dom = null;
                        break;
                    }
                    if (dom.previousSibling) {
                        dom = dom.previousSibling;
                        break;
                    }
                }
            } else {
                dom = dom.previousSibling;
            }

            if (dom == startDom) {
                return dom;
            }

            //if previous node has child nodes, so find the last child node.
            if (!!dom && dom.lastChild) {
                while (dom.lastChild) {
                    dom = dom.lastChild;
                    if (dom == startDom) {
                        break;
                    }
                }

                //if the last node is TextNode, and it's the only child node, so return its parent node.
                if (dom.nodeType == 3 && dom.parentNode.childNodes.length == 1) {
                    dom = dom.parentNode;
                }

            }
            return dom;
        },
        /**
         * get the next node until endDom
         * @param doc
         * @param dom
         * @param endDom
         * @returns {*}
         */
        getNextNode: function(doc, dom, endDom) {
            if (dom == endDom) {
                return null;
            }
            if (!dom.nextSibling) {
                //if hasn't nextSibling,so find its parent's nextSibling
                while (dom.parentNode) {
                    dom = dom.parentNode;
                    if (dom == endDom) {
                        break;
                    }
                    if (dom == doc.body) {
                        dom = null;
                        break;
                    }
                    if (dom.nextSibling) {
                        dom = dom.nextSibling;
                        break;
                    }
                }
            } else {
                dom = dom.nextSibling;
            }

            if (dom == endDom) {
                return dom;
            }

            //if next node has child nodes, so find the first child node.
            if (!!dom && dom.firstChild) {
                while (dom.firstChild) {
                    dom = dom.firstChild;
                    if (dom == endDom) {
                        break;
                    }
                }

                //if the first node is TextNode, and it's the only child node, so return its parent node.
                if (dom.nodeType == 3 && dom.parentNode.childNodes.length == 1) {
                    dom = dom.parentNode;
                }

            }
            return dom;
        },
        /**
         * get the td from dom(which is td's child nodes)
         * @param doc
         * @param tagName
         * @param dom
         */
        getTag: function(doc, dom, tagName) {
            while (!!dom && !domChecker.isTag(dom, tagName)) {
                if (dom == doc.body) {
                    dom = null;
                    break;
                }
                dom = dom.parentNode;
            }
            return dom;
        },
        /**
         * get the td's position(x,y)
         * @param dom
         */
        getTdIndex: function(td) {
            return { x: td.cellIndex, y: td.parentNode.rowIndex, maxX: td.parentNode.cells.length, maxY: td.parentNode.parentNode.rows.length };
        }
    };

    /**
     * modify the style when selection's type == 'Range'
     * @param doc
     * @param style
     */
    function modifySelAnnotation(doc, annotation) {
        var rangeList, rangeLength;
        //get the RangeList
        rangeList = domFinder.getRangeDomList(doc);
        rangeLength = rangeList.length;
        if (rangeLength == 0) {
            return;
        }
        //modify style
        modifyStyle.list(doc, rangeList, annotation);

        var startRange = rangeList[0], endRange = rangeList[rangeLength - 1];
        if (startRange.nodeType == 1 && startRange.firstChild) {
            startRange = startRange.firstChild;
        }
        if (endRange.nodeType == 1) {
            endRange = endRange.lastChild;
        }

        //clear redundant span & TextNode
        var ps = [], i, j, t;
        for (i = 0, j = rangeLength; i < j; i++) {
            t = rangeList[i].parentNode;
            if (!t) {
                continue;
            }
            if (ps.indexOf(t) < 0) {
                ps.push(t);
                clearTools.clearChild(t, []);
            }
        }
        //
        if (!annotation) {
            var p = startRange.parentElement;
            while (p && p.children.length <= 1) { 
                if (p.nodeType == 1 && p.getAttribute('anno-wiz-span') == 'anno-wiz-span')
                    break;
                //
                p = p.parentElement;
            }
            //
            if (p && p.nodeType == 1 && p.children.length <= 1 && p.getAttribute('anno-wiz-span') == 'anno-wiz-span') {
                p.title = '';
                modifyStyle.clearStyle(doc, p, 'border-bottom-width');
                modifyStyle.clearStyle(doc, p, 'border-bottom-color');
                modifyStyle.clearStyle(doc, p, 'border-bottom-style');
            }
        }
        //
        //reset the selection's range
        utils.setRange(doc, startRange, endRange);
    }

    return {
        /**
         * This interface is to modify the style of the selection's range.
         * @param doc   (document)
         * @param style (example:{'font-size':'16px', 'color':'red'})
         */
        annotateSelection: function(doc, annotation, selection) {
            //
            var sel = selection ? selection : doc.getSelection();
            //
            if (sel.type == 'Caret')
                return;
            else if (sel.type == 'Range') {
                modifySelAnnotation(doc, annotation);
            }
        },
        domFinder: domFinder
    }

})();
