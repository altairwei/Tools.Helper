var WizHelperEditor = (function() {
	//Selection's type == 'Caret' will make <span>&#8203</span>
	var SPACE_CHAR = String.fromCharCode(8203);
	var WIZ_SPAN_ATTR = 'data-wiz-span';


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
		}
	};
	var modifyStyle = {
		/**
		 * modify style which in RangeList Array
		 * @param doc
		 * @param domList
		 * @param style
		 */
		list: function(doc, domList, style) {
			if (domList.length == 0) {
				return;
			}
			var i, j, item;
			for (i = 0, j = domList.length; i < j; i++) {
				item = domList[i];
				if (domChecker.isUsableText(item)) {
					domList[i] = domMaker.modifyTextNode(doc, item);
					modifyStyle.apply(doc, domList[i], style);
				} else if (item.nodeType == 1) {
					modifyStyle.child(doc, item, style);
				}
			}
		},
		/**
		 * modify all child nodes's style
		 * @param doc
		 * @param dom
		 * @param style
		 */
		child: function(doc, dom, style) {
			if (!dom) {
				return;
			}
			var ns = dom.childNodes, done = false, i, j, item;
			for (i = 0, j = ns.length; i < j; i++) {
				item = ns[i];
				if (!done && domChecker.isUsableText(item)) {
					done = true;
					modifyStyle.apply(doc, dom, style);
				} else if (item.nodeType == 1) {
					modifyStyle.child(doc, item, style);
				}
			}
		},
		/**
		 * modify single dom's style
		 * @param doc
		 * @param dom
		 * @param style
		 */
		apply: function(doc, dom, style) {
			if (dom.tagName.toLowerCase() == 'br') {
				return;
			}
			var d = dom;
			if (dom.tagName.toLowerCase() !== 'span' ||  dom.getAttribute(WIZ_SPAN_ATTR) !== WIZ_SPAN_ATTR) {
				d = domMaker.createSpan(doc);
				dom.insertBefore(d, null);
				while (dom.childNodes.length > 1) {
					d.insertBefore(dom.childNodes[0], null);
				}
			}
			var key, value;
			for (key in style) {
				if (style.hasOwnProperty(key) && typeof key == 'string') {
					value = style[key];
					if (value == '') {
						modifyStyle.clearStyle(doc, d, key);
					} else {
						d.style[key] = value;
					}
				}
			}
		},
		/**
		 * clear Style
		 * @param doc
		 * @param dom
		 * @param styleKey
		 */
		clearStyle: function(doc, dom, styleKey) {
			var parent,nParent;
			while(dom.getAttribute(WIZ_SPAN_ATTR) === WIZ_SPAN_ATTR) {
				dom.style[styleKey] = '';

				parent = dom.parentNode;
				nParent = parent.parentNode;
				if (parent.getAttribute(WIZ_SPAN_ATTR) !== WIZ_SPAN_ATTR) {
					break;
				}
				if (!dom.previousSibling && !dom.nextSibling) {
					dom = parent;
				} else if (!dom.previousSibling) {
					nParent.insertBefore(dom, parent);
					clearTools.mergeAttrAtoB(parent, dom);
					dom.style[styleKey] = '';
				} else if (!dom.nextSibling) {
					nParent.insertBefore(dom, parent.nextSibling);
					clearTools.mergeAttrAtoB(parent, dom);
					dom.style[styleKey] = '';
				} else {
					var nSpan = domMaker.createSpan(doc), tmpDom;
					nSpan.setAttribute('style', parent.getAttribute('style'));
					while(dom.nextSibling) {
						tmpDom = dom.nextSibling;
						nSpan.insertBefore(tmpDom);
						clearTools.mergeAttrAtoB(parent, tmpDom);
					}
					nParent.insertBefore(dom, parent.nextSibling);
					nParent.insertBefore(nSpan, dom.nextSibling);
					clearTools.mergeAttrAtoB(parent, dom);
					clearTools.mergeAttrAtoB(parent, nSpan);
				}
			}
		}
	};

	var clearTools = {
		/**
		 * merge objA's style to objB's style
		 * @param objA
		 * @param objB
		 * @param isOverlay
		 */
		mergeStyleAToB: function(objA,objB, isOverlay) {
			if (objA.nodeType != 1 || objB.nodeType != 1) {
				return;
			}
			var sA = objA.getAttribute('style'),
				sB = objB.getAttribute('style') || '';
			if (!sA) {
				return;
			}
			var styleObj = {};
			if (!!isOverlay) {
				utils.appendStyle(sB, styleObj);
				utils.appendStyle(sA, styleObj);
			} else {
				utils.appendStyle(sA, styleObj);
				utils.appendStyle(sB, styleObj);
			}

			var result = [];
			for (var k in styleObj) {
				if (styleObj.hasOwnProperty(k)) {
					result.push(k + ':' + styleObj[k]);
				}
			}
			objB.setAttribute('style', result.join(';'));
		},
		/**
		 * merge objA's style to objB's style
		 * @param objA
		 * @param objB
		 * @param isOverlay
		 */
		mergeAttrAtoB: function(objA, objB, isOverlay) {
			if (objA.nodeType != 1 || objB.nodeType != 1) {
				return;
			}
			var attrA = objA.attributes,
				attrB = objB.attributes,
				i, j, a;
			clearTools.mergeStyleAToB(objA, objB, isOverlay);
			for (i=0, j=attrA.length; i<j; i++) {
				a = attrA[i];
				if (a.nodeName == 'style') {
					continue;
				}
				if (attrB[a.nodeName] && !isOverlay) {
					continue;
				}
				objB.setAttribute(a.nodeName, a.nodeValue);
			}

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
				if (m && excludeList.indexOf(m) < 0 && excludeList.indexOf(n) < 0 && domChecker.isSameSpan(n, m)) {
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
				&& dom.getAttribute(WIZ_SPAN_ATTR) == WIZ_SPAN_ATTR
				&& n.getAttribute(WIZ_SPAN_ATTR) == WIZ_SPAN_ATTR) {
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
			clearTools.mergeAttrAtoB(parent, child);
			clearTools.mergeAttrAtoB(child, parent, true);
			parent.removeChild(child);
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
				&& n.getAttribute(WIZ_SPAN_ATTR) == WIZ_SPAN_ATTR
				&& domChecker.isSameAttr(n, m)
		},
		/**
		 * check
		 * @param n
		 * @param m
		 * @returns {boolean}
		 */
		isSameAttr: function(n, m) {
			var result = domChecker.isSameStyle(n, m);
			if (!result) {
				return result;
			}
			var attrA = n.attributes,
				attrB = m.attributes;
			if (attrA.length != attrB.length) {
				return false;
			}
			var i, j, a;
			for (i=0, j=attrA.length; i<j; i++) {
				a = attrA[i];
				if (a.nodeName == 'style') {
					continue;
				}
				if (!attrB[a.nodeName] || attrB[a.nodeName].nodeValue != a.nodeValue) {
					return false;
				}
			}
			return true;
		},
		/**
		 * check same style
		 * @param n
		 * @param m
		 */
		isSameStyle: function(n, m) {
			var styleA = {};
			var styleB = {};
			utils.appendStyle(n.getAttribute('style'), styleA);
			utils.appendStyle(m.getAttribute('style'), styleB);
			var k;
			for (k in styleA) {
				if (styleA.hasOwnProperty(k) && styleB[k] !== styleA[k]) {
					return false;
				}
				delete styleA[k];
				delete styleB[k];
			}
			for (k in styleB) {
				if (styleB.hasOwnProperty(k)) {
					return false;
				}
			}
			return true;
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
			s.setAttribute(WIZ_SPAN_ATTR, WIZ_SPAN_ATTR);
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
		getRangeDomList: function(doc) {
			var sel = doc.getSelection(),
				range = sel.getRangeAt(0),
				startDom = range.startContainer, startOffset = range.startOffset,
				endDom = range.endContainer, endOffset = range.endOffset;
			// get dom which is start and end
			if (startDom == endDom) {
				startDom = (startDom.nodeType == 3) ? domMaker.modifyTextNode(doc, startDom, startOffset, endOffset) : startDom;
				endDom = startDom;
			} else {
				startDom = (startDom.nodeType == 3) ? domMaker.modifyTextNode(doc, startDom, startOffset) : startDom.childNodes[startOffset];
				endDom = endOffset === 0 ? domFinder.getPreviousNode(doc, endDom, startDom) : (endDom.nodeType == 3 ? domMaker.modifyTextNode(doc, endDom, 0, endOffset) : endDom.childNodes[endOffset - 1]);
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
	 * make new span when selection's type == 'Caret'
	 * @param doc
	 * @param style
	 */
	function modifyCaretStyle(doc, style) {
		var sel = doc.getSelection();
		var focusNode = sel.focusNode;
		var range, key, value, hasSameStyle = true,
			n;
		//get the focus's element.
		if (focusNode.nodeType == 3) {
			focusNode = focusNode.parentNode;
		}
		//check if the current dom is same as the style which is needed.
		for (key in style) {
			if (style.hasOwnProperty(key) && typeof key == 'string') {
				value = style[key];
				if (focusNode.style[key] !== value) {
					hasSameStyle = false;
				}
			}
		}
		if (hasSameStyle) {
			return;
		}

		//if current dom is empty, so don't create span.
		if (focusNode.tagName.toLowerCase() == 'span' && (focusNode.innerHTML == '' || focusNode.innerHTML == SPACE_CHAR)) {
			modifyStyle.apply(doc, focusNode, style);
			n = focusNode;
		} else {
			range = sel.getRangeAt(0);
			range.deleteContents();
			n = domMaker.createSpan(doc);
			n.innerHTML = SPACE_CHAR;
			range.insertNode(n);
			modifyStyle.apply(doc, n, style);
		}

		//put the cursor's position to the target dom
		range = doc.createRange();
		range.setStart(n.childNodes[0], 1);
		range.setEnd(n.childNodes[0], 1);

		//clear redundant span & TextNode
		var p = focusNode.parentNode ? focusNode.parentNode : focusNode;
		clearTools.clearChild(p, []);

		//reset the selection's range
		sel.removeAllRanges();
		sel.addRange(range);
	}

	/**
	 * modify the style when selection's type == 'Range'
	 * @param doc
	 * @param style
	 */
	function modifyRangeStyle(doc, style) {
		var rangeList, rangeLength;
		//get the RangeList
		rangeList = domFinder.getRangeDomList(doc);
		rangeLength = rangeList.length;
		if (rangeLength == 0) {
			return;
		}
		//modify style
		modifyStyle.list(doc, rangeList, style);

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
		//reset the selection's range
		utils.setRange(doc, startRange, endRange);
	}

	/**
	 * switch the cell(td) in table.
	 * @param doc   (document)
	 * @param direction {x,y}       (example:  next cell of the same row is {x:1, y:0};  next cell of the same col is {x:0, y:1};)
	 * @return object
	 */
	function switchTableCell(doc, cell, direction) {
		if (!cell) {
			return null;
		}

		var curCell = domFinder.getTag(doc, cell, 'td');
		if (!curCell) {
			return null;
		}

		var cellIndex = domFinder.getTdIndex(curCell), target = null;
		var x = cellIndex.x + direction.x,
			y = cellIndex.y + direction.y;

		if (x >= 0 && x < cellIndex.maxX && y >= 0 && y < cellIndex.maxY) {
			target = curCell.parentNode.parentNode.rows[y].cells[x];
		} else if (y >= 0 && y < cellIndex.maxY - 1) {
			target = curCell.parentNode.parentNode.rows[y + 1].cells[0];
		}
		if (target) {
			utils.setRange(doc, target.firstChild ? target.firstChild : target, (target.childNodes.length == 1) ? target.lastChild : null);
		} else if (y >= cellIndex.maxY - 1) {
			utils.setRange(doc, domFinder.getNextNode(doc, domFinder.getTag(doc, curCell, 'table'), null), null);
		}
		return { 'target': target, 'x': x, 'y': y };
	}

	/**
	 * auto add <a> href
	 * @param doc
	 */
	function autoLink(doc) {
		doc.addEventListener('keydown', function(e) {
			var keyCode = e.keyCode || e.which;
			if (keyCode == 32 || keyCode == 13) {
				var sel = doc.getSelection(),
					range = sel.getRangeAt(0).cloneRange(),
					offset,
					charCode;

				var start = range.startContainer;
				while (start.nodeType == 1 && range.startOffset > 0) {
					start = range.startContainer.childNodes[range.startOffset - 1];
					if (!start) {
						break;
					}
					range.setStart(start, start.nodeType == 1 ? start.childNodes.length : start.nodeValue.length);
					range.collapse(true);
					start = range.startContainer;
				}
				do {
					if (range.startOffset == 0) {
						start = range.startContainer.previousSibling;

						while (start && start.nodeType == 1) {
							start = start.lastChild;
						}
						if (!start || utils.isFillChar(start)) {
							break;
						}
						offset = start.nodeValue.length;
					} else {
						start = range.startContainer;
						offset = range.startOffset;
					}
					range.setStart(start, offset - 1);
					charCode = range.toString().charCodeAt(0);
				} while (charCode != 160 && charCode != 32);

				if (range.toString().replace(new RegExp(utils.fillChar, 'g'), '').match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
					while (range.toString().length) {
						if (/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(range.toString())) {
							break;
						}
						try {
							range.setStart(range.startContainer, range.startOffset + 1);
						} catch (e) {
							//trace:2121
							var start = range.startContainer;
							while (!(next = start.nextSibling)) {
								if (utils.isBody(start)) {
									return;
								}
								start = start.parentNode;

							}
							range.setStart(next, 0);

						}

					}
					//if is <a>, then return;
					if (utils.findParentByTagName(range.startContainer, 'a', true)) {
						return;
					}
					var a = doc.createElement('a'), text = doc.createTextNode(' '), href;

					a.appendChild(range.extractContents());
					a.href = a.innerHTML = a.innerHTML.replace(/<[^>]+>/g, '');
					href = a.getAttribute("href").replace(new RegExp(utils.fillChar, 'g'), '');
					href = /^(?:https?:\/\/)/ig.test(href) ? href : "http://" + href;
					a.setAttribute('_src', href);
					a.href = href;

					range.insertNode(a);
					a.parentNode.insertBefore(text, a.nextSibling);
					range.setStart(text, 0);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}
		});
	}



	return {
		/**
		 * This interface is to modify the style of the selection's range.
		 * @param doc   (document)
		 * @param style (example:{'font-size':'16px', 'color':'red'})
		 */
		modifySelectionStyle: function(doc, style) {
		    var sel = doc.getSelection();

			if (sel.type == 'Caret') {
				modifyCaretStyle(doc, style);
			} else if (sel.type == 'Range') {
				modifyRangeStyle(doc, style);
			}
		},
		/**
		 * switch the cell(td) in table.
		 * @param doc   (document)
		 * @return object
		 */
		switchNextCell: function(doc) {
			var sel = doc.getSelection();
			if (sel.type == 'Caret') {
				return switchTableCell(doc, sel.focusNode, { x: 1, y: 0 });
			} else if (sel.type == 'Range') {
				var range = sel.getRangeAt(0),
					endDom = range.endContainer, endOffset = range.endOffset;
				return switchTableCell(doc, endDom, { x: (endOffset === 0 ? 0 : 1), y: 0 });
			}
			return null;
		},
		autoLink: autoLink,
		removeLink: function(doc) {
			function selectElementContents(el) {
				var range = doc.createRange();
				range.selectNodeContents(el);
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			}
			//
			var sel = doc.getSelection();
			var currentNode = sel.focusNode;
			while (currentNode
				&& currentNode.tagName != 'A') {
				currentNode = currentNode.parentNode;
			}
			if (!currentNode)
				return;
			if (currentNode.tagName != 'A')
				return;
			//
			selectElementContents(currentNode);
			//
			doc.execCommand("unlink", false, false);
		},
		getImageSize: function(imgSrc) {
			var newImg = new Image();
			newImg.src = imgSrc;
			var height = newImg.height;
			var width = newImg.width;
			return { width: width, height: height };
		},
		getImageData: function(img) {
			var size = this.getImageSize(img.src);
			// Create an empty canvas element
			var canvas = document.createElement("canvas");
			canvas.width = size.width;
			canvas.height = size.height;

			// Copy the image contents to the canvas
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);

			// Get the data-URL formatted image
			// Firefox supports PNG and JPEG. You could check img.src to
			// guess the original format, but be aware the using "image/jpg"
			// will re-encode the image.
			var dataURL = canvas.toDataURL("image/png");

			return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		},
		getAllImagesData: function(doc) {
			//
			var objCommon = window.external.CreateWizObject("WizKMControls.WizCommonUI");
			//
			var retData = "";
			var images = doc.images;
			for (var i = 0; i < images.length; i++) {
				var img = images[i];
				//
				var src = img.src;
				if (src.indexOf("data:") == 0)
					continue;
				if (0 == src.indexOf("http") || !objCommon.PathFileExists(src)) {
					var data = this.getImageData(img);
					//
					retData = retData + "<!--WizImageURLStart-->" + src + "<!--WizImageURLEnd--><!--WizImageDataStart-->" + data + "<!--WizImageDataEnd-->";
				}
			}
			return retData;
		},
		getAllImagesData2: function(doc) {
			//
			var retData = "";
			var images = doc.images;
			for (var i = 0; i < images.length; i++) {
				var img = images[i];
				//
				var src = img.src;
				if (src.indexOf("data:") == 0)
					continue;
				if (0 == src.indexOf("http")) {
					var data = this.getImageData(img);
					//
					retData = retData + "<!--WizImageURLStart-->" + src + "<!--WizImageURLEnd--><!--WizImageDataStart-->" + data + "<!--WizImageDataEnd-->";
				}
			}
			return retData;
		}
		//      ,modifySelectionStyle2: function (doc, style) {
		//          var sel = doc.getSelection();
		//          var container = doc.createElement("div");
		//          var range, contents;
		//          for (var i = 0; i < sel.rangeCount; i++) {
		//              range = sel.getRangeAt(i);
		//              contents = range.cloneContents();
		//              container.appendChild(domMaker.modifyTextNode(doc, contents));
		//          }
		//          modifyStyle.list(doc, container, style);
		//          //
		//          var html = container.innerHTML;
		//          doc.execCommand("insertHtml", false, html);
		//      }
	}

})();
