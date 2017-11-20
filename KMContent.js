
var g_KMRange = null;
var g_selection = null;
var g_KMMousePos = { x: 0, y: 0 };


////=================================================================================
////文档关键字高亮代码
////
function HTMLEncode(html){
	var temp = document.createElement("div");
	if(temp.textContent){
		temp.textContent = html;
	}else{
		temp.innerText = html;
	}
	//
	var output = temp.innerHTML;
	temp = null;
	return output;
}
function KMHighlighter(colors) {
    this.colors = colors;
    if (this.colors == null) {
        //默认颜色
        this.colors = ['#ffff00,#000000', '#dae9d1,#000000', '#eabcf4,#000000',
                       '#c8e5ef,#000000', '#f3e3cb, #000000', '#e7cfe0,#000000',
                       '#c5d1f1,#000000', '#deeee4, #000000', '#b55ed2,#000000',
                       '#dcb7a0,#333333', '#7983ab,#000000', '#6894b5, #000000'];
    }
    //
    //
    this.highlight = function (node, keywords, callback) {
        if (!keywords || !node || !node.nodeType || node.nodeType != 1)
            return;

        keywords = this.parsewords(keywords);
        if (keywords == null)
            return;
        //
        var text = node.innerText;
        //
        for (var i = 0; i < keywords.length; i++) {
            if (-1 == text.indexOf(keywords[i].word))
                continue;
            //
            this.colorword(node, keywords[i], callback);
        }
    }
    //
    //
    this.colorword = function (node, keyword, callback) {
        if (node.childNodes == undefined)
            return false;
        //
        if (node.id == "wizKMHighlighterSpan_t_t")
            return false;
        //
        for (var i = 0; i < node.childNodes.length; i++) {
            var childNode = node.childNodes[i];
            if (childNode.nodeType == 3) {
                //childNode is #text
                var re = null;
                try {
                    re = new RegExp(keyword.word, 'i');
                }
                catch (err) {
                    continue;
                }
                if (!re)
                    continue;
                //
                if (childNode.data.search(re) == -1)
                    continue;
                //
                if (!childNode.nodeValue)
                    continue;
                //
                if (!keyword.word)
                    continue;
                //
                re = new RegExp('(' + keyword.word + ')', 'i');
                var forkNode = document.createElement("span");
                forkNode.id = "wizkm_highlight_tmp_span";
				var tmp = HTMLEncode(childNode.data);
				forkNode.innerHTML = tmp.replace(re, '<wiz_tmp_plugin_tag id="wizKMHighlighterSpan_t_t" style="background-color:' + keyword.bgColor + ';color:' + keyword.foreColor + '; cursor:pointer; border-bottom: 1px #00c dashed;">$1</wiz_tmp_plugin_tag>');
				//
                node.replaceChild(forkNode, childNode);
                //
                for (var i = 0; i < forkNode.childNodes.length; i++) {
                    var elem = forkNode.childNodes[i];
                    if (elem.id == "wizKMHighlighterSpan_t_t") {
                        // elem.attachEvent("onclick", callback);
                        elem.addEventListener("click", callback);
                    }
                }
                //
                return true;
            } else if (childNode.nodeType == 1) {
                //childNode is element
                if (this.colorword(childNode, keyword, callback))
                    return true;
            }
        }
        return false;
    }
    //
    //
    this.parsewords = function (keywords) {
        var arrayKeyword = keywords.split(',');
        var results = [];
        for (var i = 0; i < arrayKeyword.length; i++) {
            var keyword = {};
            var color = this.colors[i % this.colors.length].split(',');
            keyword.word = arrayKeyword[i];
            keyword.bgColor = color[0];
            keyword.foreColor = color[1];
            results.push(keyword);
        }
        return results;
    }
    //
    //
    this.sort = function (list) {
        list.sort(function (e1, e2) {
            return e1.length < e2.length;
        });
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
/*
点击关键字，标签，或者作者的时候，显示一个下拉列表窗口，列出相关的文档
*/
function KMShowListWindow(type, e) {
    if (!e)
        return false;
    //
    var elem = e.srcElement;
    if (!elem)
        return false;
    //
    var text = elem.innerText;
    if (text == null || text == "")
        return false;
    //
    var pluginpath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    var url = {
        url: pluginpath + "inlinedoclist.htm?type=" + type + "&text=" + text,
        left: e.screenX,
        top: e.screenY,
        width: 350,
        height: 200
    };
    var urlJson = JSON.stringify(url);
    objKMHelperPluginBrowser.ExecuteFunction1("KMShowListWindow", urlJson, null);
}
/*
标签
*/
function KMTagWordSpanOnClick(e) {
    KMShowListWindow("tag", e);
}

/*
关键字
*/
function KMKeywordSpanOnClick(e) {
    KMShowListWindow("keyword", e);
}

/*
作者
*/
function KMAuthorSpanOnClick(e) {
    KMShowListWindow("author", e);
}
/////////////////////////////////////////////////////////////////////////////////////////////////

function KMIsInlineCommentSpan(elem) {
    if (!elem.id)
        return false;
    if (elem.id.indexOf("WizKMComment_") != 0)
        return false;
    return true;
}

function KMAttachCommentEvents() {
    var arr = document.getElementsByTagName("SPAN");
    for (var i = 0; i < arr.length; i++) {
        var elem = arr[i];
        if (!KMIsInlineCommentSpan(elem))
            continue;
        //
        KMCommentAttachEvents(elem);
    }
}
function KMGetParentInlineComment(elem) {
    while (elem != null) {
        if (KMIsInlineCommentSpan(elem))
            return elem;
        //
        elem = elem.parentElement;
    }
    return null;
}
function KMCloseCommentWindow() {
    var objCommentWindow = KMGetCommentWindow(false);
    if (!objCommentWindow)
        return;
    //
    objCommentWindow.style.display = "none";
}
function KMGetSelection2() {
    var sel = document.getSelection();
    sel.removeAllRanges();
    sel.addRange(g_KMRange);
    //
    return sel;
}
function KMSetDocumentModified() {
    objKMHelperApp.SetNoteModifiedByPlugin();
}
function KMCancelDocumentModified() {
    return;
}
function KMIsDocumentModified() {
    return true;
}
function KMSaveComment() {
    //
    var objCommentWindow = KMGetCommentWindow(false);
    if (!objCommentWindow)
        return;
    var inlineCommentID = objCommentWindow.getAttribute("KMCommentCurrentID");
    if (inlineCommentID == null)
        inlineCommentID = "";
    //
    var objCommentText = document.getElementById("KMCommentText");
    if (!objCommentText)
        return;
    var comment = objCommentText.innerText;
    //
    var sel = KMGetSelection2();
    //
    WizAnnotator.annotateSelection(document, comment, sel);
    //
    KMSetDocumentModified();
    KMCloseCommentWindow();
}
function KMCopyComment() {
    var objCommentText = document.getElementById("KMCommentText");
    if (!objCommentText)
        return;
    var text = objCommentText.innerText;
    //
    document.defaultView.clipboardData.setData('Text', text);
}
function KMDeleteComment() {
    var objCommentWindow = KMGetCommentWindow(false);
    if (!objCommentWindow)
        return;
    //
    var sel = KMGetSelection2();
    //
    WizAnnotator.annotateSelection(document, "", sel);
    //
    KMSetDocumentModified();
    //
    KMCloseCommentWindow();
}
function KMGetRange() {
    try {
        var rgn = document.getSelection().getRangeAt(0);
        return rgn;
    }
    catch (err) {
        console.log(err.toString());
        return null;
    }
}
function KMGetCommentWindow(create) {
    var div = document.getElementById("WizKMCommentWindowDivID");
    if (div != null)
        return div;
    if (!create)
        return null;
    //   
    g_selection = document.getSelection();
    g_KMRange = KMGetRange();
    //
    var pluginPath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    //
    var commentHtml = objKMHelperCommon.LoadTextFromFile(pluginPath + "inlinecomment.htm");
    commentHtml = commentHtml.replace("strOK", objKMHelperApp.LoadStringFromFile(languageFileName, "strOK"));
    commentHtml = commentHtml.replace("strCancel", objKMHelperApp.LoadStringFromFile(languageFileName, "strCancel"));
    commentHtml = commentHtml.replace("strCopy", objKMHelperApp.LoadStringFromFile(languageFileName, "strCopy"));
    commentHtml = commentHtml.replace("strDelete", objKMHelperApp.LoadStringFromFile(languageFileName, "strDelete"));
    commentHtml = commentHtml.replace("strClose", objKMHelperApp.LoadStringFromFile(languageFileName, "strClose"));
    //
    div = document.createElement("wiz_tmp_tag");
    div.style.cssText = "z-index:100000;position:absolute;display:none;background:#e8e8e8;width:360px;height:168px;text-align:left;border:1px solid #c0c0c0;padding:5px 2px 5px 5px;filter: alpha(opacity=90)";
    div.id = "WizKMCommentWindowDivID";
    //
    div.innerHTML = commentHtml;
    //
    var ret = document.body.appendChild(div);
    //
    var imgClose = document.getElementById("KMCommentCloseImage");
    if (imgClose) {
        imgClose.src = pluginPath + "km_close.png";
        // imgClose.attachEvent("onclick", KMCloseCommentWindow);
        imgClose.addEventListener("click", KMCloseCommentWindow);
    }
    //
    var buttonOK = document.getElementById("KMCommentOKButton");
    if (buttonOK) {
        // buttonOK.attachEvent("onclick", KMSaveComment);
        buttonOK.addEventListener("click", KMSaveComment);
    }
    var buttonCancel = document.getElementById("KMCommentCancelButton");
    if (buttonCancel) {
        // buttonCancel.attachEvent("onclick", KMCloseCommentWindow);
        buttonCancel.addEventListener("click", KMCloseCommentWindow);
    }
    var buttonCopy = document.getElementById("KMCommentCopyButton");
    if (buttonCopy) {
        // buttonCopy.attachEvent("onclick", KMCopyComment);
        buttonCopy.addEventListener("click", KMCopyComment);
    }
    var buttonDelete = document.getElementById("KMCommentDeleteButton");
    if (buttonDelete) {
        // buttonDelete.attachEvent("onclick", KMDeleteComment);
        buttonDelete.addEventListener("click", KMDeleteComment);
    }
    //
    return ret;
}
function KMIsInlineLink(elem) {
    if (!elem.id)
        return false;
    if (elem.id.indexOf("WizKMLink_") != 0)
        return false;
    return true;
}
function KMGetParentInlineLink(elem) {
    while (elem != null) {
        if (KMIsInlineLink(elem))
            return elem;
        //
        elem = elem.parentElement;
    }
    return null;
}
//点击链接文字筛选文档
function KMOnLinkToTextClicked(e) {
    if (objKMContentApp.IsEditing())
        return;
    //
    if (!e)
        return;
    //
    var elem = e.srcElement;
    if (!elem)
        return;
    //
    var objInlineLink = KMGetParentInlineLink(elem);
    if (!objInlineLink)
        return;
    //
    if (objInlineLink.getAttribute("folderlocation")) {
        var folderlocation = objInlineLink.getAttribute("folderlocation");
        var objFolder = objKMHelperDatabase.GetFolderByLocation(folderlocation, true);
        if (!objFolder)
            return;
        objKMHelperApp.Window.CategoryCtrl.SelectedFolder = objFolder;
    }
    if (objInlineLink.getAttribute("tagsguid")) {
        var objTags = objKMHelperApp.CreateWizObject("WizKMCore.WizTagCollection");
        var listTagsGUID = objInlineLink.getAttribute("tagsguid").split(";");
        for (var i = 0; i < listTagsGUID.length - 1; i++) {
            var objTag = objKMHelperDatabase.TagFromGUID(listTagsGUID[i]);
            objTags.Add(objTag);
        }
        var objDocs = objKMHelperDatabase.DocumentsFromTags(objTags);
        objKMHelperApp.Window.DocumentsCtrl.SetDocuments(objDocs);
    }
    if (objInlineLink.getAttribute("styleguid")) {
        var styleguid = objInlineLink.getAttribute("styleguid");
        var objStyle = objKMHelperDatabase.StyleFromGUID(styleguid);
        if (!objStyle)
            return;
        objKMHelperApp.Window.CategoryCtrl.SelectedStyle = objStyle;
    }
    if (objInlineLink.getAttribute("docsguid")) {
        var objDocs = objKMHelperApp.CreateWizObject("WizKMCore.WizDocumentCollection");
        var listDocsGUID = objInlineLink.getAttribute("docsguid").split(";");
        for (var i = 0; i < listDocsGUID.length - 1; i++) {
            var objDoc = objKMHelperDatabase.DocumentFromGUID(listDocsGUID[i]);
            objDocs.Add(objDoc);
        }
        objKMHelperApp.Window.DocumentsCtrl.SetDocuments(objDocs);
    }
}
//添加鼠标事件
function KMAttachLinkToEvents() {
    var arr = document.getElementsByTagName("SPAN");
    for (var i = 0; i < arr.length; i++) {
        var elem = arr[i];
        if (!KMIsInlineLink(elem))
            continue;
        //
        KMLinkToAttachEvents(elem);
    }
}
//
// 生成【删除链接】窗口
function KMGetEditLinkWindow(create) {
    var div = document.getElementById("WizKMEditLinkToDivID");
    if (div != null)
        return div;
    if (!create)
        return null;
    //
    div = document.createElement("wiz_tmp_tag");
    div.style.cssText = "display:block; padding:0; margin:0; position:absolute; z-index:100001; width:168px; height: 30px; display:none; background-color:window;border: solid 1px #6100C1;filter: progid:DXImageTransform.Microsoft.Shadow(color=#999999,direction=135,strength=5);";
    div.id = "WizKMEditLinkToDivID";
    //
    return document.body.appendChild(div);
}
//
// 关闭【删除链接】窗口
function KMCloseEditLinkToWindow(menu) {
    if (!menu) {
        menu = KMGetEditLinkWindow(false);
    }
    if (!menu)
        return;
    if (menu.style.display == "none")
        return;
    menu.style.display = "none";
}
function KMGetFlashMenuStyle1() {
    return "cursor:pointer; padding:2; display: block; width: 168px; text-align: left; text-decoration: none; font-family:arial; font-size:9pt; color: #000000; BORDER: none; border: solid 1px #FFFFFF;";
}

function KMGetFlashMenuStyle2() {
    return "cursor:pointer; padding:2; display: block; width: 168px; text-align: left; text-decoration: none; font-family:arial; font-size:9pt; color: #000000; BORDER: none; border: solid 1px #6100C1;background-color:#F0E1FF";
}
//获取当前链接id
function KMGetCurrentInlineLink(objEditLinkWindow) {
    if (!objEditLinkWindow) {
        objEditLinkWindow = KMGetEditLinkWindow(false);
    }
    if (!objEditLinkWindow)
        return null;
    var inlineLinkID = objEditLinkWindow.getAttribute("KMLinkCurrentID");
    if (inlineLinkID == null || inlineLinkID == "")
        return null;
    //
    var objInlineLink = document.getElementById(inlineLinkID);
    if (!objInlineLink)
        return null;
    return objInlineLink;
}
//
//删除链接
function KMDelLink(e) {
    var objEditLinkWindow = KMGetEditLinkWindow(false);
    if (!objEditLinkWindow)
        return;
    //
    var objInlineLink = KMGetCurrentInlineLink(objEditLinkWindow);
    //
    if (objInlineLink) {
        var parentNode = objInlineLink.parentNode;
        var childNodes = objInlineLink.childNodes;
        if (parentNode && 0 < childNodes.length) {
            parentNode.replaceChild(childNodes[0], objInlineLink);
            for (var i = 1; i < childNodes.length; i++) {
                parentNode.appendChild(childNodes[i]);
            }
        }
        KMSetDocumentModified();
    }
    KMCloseEditLinkToWindow(null);
}
function KMFlashMenuItemMouseOver(e) {
    //对于生成事件的 Window 对象、Document 对象或 Element 对象的引用。
    var src = e.srcElement;
    src.style.cssText = KMGetFlashMenuStyle2();
}
function KMFlashMenuItemMouseOut(e) {
    //
    var src = e.srcElement;
    src.style.cssText = KMGetFlashMenuStyle1();
}
function KMAddFlashMenuItem(divParent, text, callback) {
    var item = document.createElement("DIV");
    item.style.cssText = KMGetFlashMenuStyle1();
    item.innerText = text;

    // item.attachEvent("onclick", callback);
    // item.attachEvent("onmouseover", KMFlashMenuItemMouseOver);
    // item.attachEvent("onmouseout", KMFlashMenuItemMouseOut);
    item.addEventListener("click", callback);
    item.addEventListener("mouseover", KMFlashMenuItemMouseOver);
    item.addEventListener("mouseout", KMFlashMenuItemMouseOut);

    divParent.appendChild(item);
}
//
function KMFlashSelectionAs(type) {
    var text = KMSmartTagGetSelectionText();
    if (!text || text == "")
        return;
    //
    text = KMTextToSingleLine(text);
    if (text.length > 200)
        text = text.substr(0, 200);
    //
    var objDoc = objKMHelperApp.WizDocument;
    if (!objDoc)
        return;
    //
    if (type == "title") {
        objDoc.ChangeTitleAndFileName(text);
    } else if (type == "tag") {
        text = objDoc.TagsText + ";" + text;
        objDoc.TagsText = text;
    } else if (type == "keyword") {
        text = objDoc.Keywords + ";" + text;
        objDoc.Keywords = text;
    } else if (type == "author") {
        objDoc.Author = text;
    }
        // @endware
        // D20110228 Add @RIL tag function
    else if (type == "@RIL") {
        text = objDoc.TagsText + ";" + "@RIL";
        objDoc.TagsText = text;
    }

}
function KMFlashSelectionAsTitle() {
    KMFlashSelectionAs("title");
}
function KMFlashSelectionAsTags() {
    KMFlashSelectionAs("tag");
}
function KMFlashSelectionAsRIL() {
    KMFlashSelectionAs("@RIL");
}
function KMFlashSelectionAsKeywords() {
    KMFlashSelectionAs("keyword");
}
function KMFlashSelectionAsAuthor() {
    KMFlashSelectionAs("author");
}
function KMGetFlashMenuWindow(create) {
    var div = document.getElementById("WizKMFlashMenuDivID");
    if (div != null)
        return div;
    if (!create)
        return null;
    //
    div = document.createElement("wiz_tmp_tag");
    div.style.cssText = "padding:0; margin:0; position:absolute; z-index:100001; width:200px; display:none; background-color:window;border: solid 1px #6100C1;filter: progid:DXImageTransform.Microsoft.Shadow(color=#999999,direction=135,strength=5);";
    div.id = "WizKMFlashMenuDivID";
    //
    KMAddFlashMenuItem2(div, "strSelAsTitle", KMFlashSelectionAsTitle);
    KMAddFlashMenuItem2(div, "strSelAsTags", KMFlashSelectionAsTags);
    KMAddFlashMenuItem2(div, "strSelAsKeywords", KMFlashSelectionAsKeywords);
    KMAddFlashMenuItem2(div, "strSelAsAuthor", KMFlashSelectionAsAuthor);
    //KMAddFlashMenuItem2(div, "strSetSkin0", KMFlashSetSkin0);
    //KMAddFlashMenuItem2(div, "strSetSkin1", KMFlashSetSkin1);
    //KMAddFlashMenuItem2(div, "strSetSkin2", KMFlashSetSkin2);
    //KMAddFlashMenuItem2(div, "strSetSkin3", KMFlashSetSkin3);
    //KMAddFlashMenuItem2(div, "strSetSkin4", KMFlashSetSkin4);
    //KMAddFlashMenuItem2(div, "strSetSkin5", KMFlashSetSkin5);
    //KMAddFlashMenuItem2(div, "strSetSkin6", KMFlashSetSkin6);
    //
    return document.body.appendChild(div);
}
//
function KMFlashSetSkin0() { objKMHelperDatabase.SetMeta("wizhelp_parm", "SKIN_ID", "0"); ResetWizHelper(); }
function KMFlashSetSkin1() { objKMHelperDatabase.SetMeta("wizhelp_parm", "SKIN_ID", "1"); ResetWizHelper(); }
function KMFlashSetSkin2() { objKMHelperDatabase.SetMeta("wizhelp_parm", "SKIN_ID", "2"); ResetWizHelper(); }
function KMFlashSetSkin3() { objKMHelperDatabase.SetMeta("wizhelp_parm", "SKIN_ID", "3"); ResetWizHelper(); }
function KMFlashSetSkin4() { objKMHelperDatabase.SetMeta("wizhelp_parm", "SKIN_ID", "4"); ResetWizHelper(); }
function KMFlashSetSkin5() { objKMHelperDatabase.SetMeta("wizhelp_parm", "SKIN_ID", "5"); ResetWizHelper(); }
function KMFlashSetSkin6() { objKMHelperDatabase.SetMeta("wizhelp_parm", "SKIN_ID", "6"); ResetWizHelper(); }
//
function ResetWizHelper() {
    var smarttag = KMGetSmartTagWindow(false);
    if (!smarttag) {
        return;
    }
    else {
        smarttag.parentElement.removeChild(smarttag);
    }
}
function KMCloseSmartTagWindow(smarttag) {
    if (!smarttag) {
        smarttag = KMGetSmartTagWindow(false);
    }
    if (!smarttag)
        return;
    if (smarttag.style.display == "none")
        return;
    smarttag.style.display = "none";
}
function KMBookmarkAdd() {
    if (!g_KMRange) {
        return;
    }
    // KMBookmarkAddText();
    var nameBookmark = g_KMRange.toString();
    nameBookmark = nameBookmark.replace(/\"|'|`/g, "");
    nameBookmark = nameBookmark.trim();
    if (!nameBookmark)
        return;
    var a = document.createElement('a');
    a.name = nameBookmark;
    try {
        g_KMRange.surroundContents(a);
        //
        KMSetDocumentModified();
    }
    catch (e) {
        WizAlert("添加书签失败!");
    }
    //
    KMCloseCommentWindow();
    KMCloseFlashMenu(null);
    KMCloseSearchWordWindow(null);
    KMCloseLinkToWindow(null);
    KMCloseEditLinkToWindow(null);
    KMCloseContentWindow();
    KMCloseSmartTagWindow(null);

}
function KMOnBookmarkClick() {
    KMBookmarkAdd();
}
function KMSearchEngine() {
    var _str = KMSmartTagGetSelectionText();
    if (!_str || _str == "")
        return;
    _str = KMTextToSingleLine(_str);
    //
    url = 'https://www.baidu.com/s?wd=' + _str;
    objKMHelperPluginBrowser.ExecuteFunction2("KMSearchEngine", url, true, null);
}
function KMOnSearchEngineClick() {
    KMSearchEngine("");
}
////=================================================================================
////设置为目录项代码开始
//
function KMOnSetAsContentClick() {
    var objSmartTag = KMGetSmartTagWindow(false);
    if (!objSmartTag) { return; }
    var divContentWindow = KMGetContentWindow(true);
    if (!divContentWindow) { return; }
    //
    KMCloseFlashMenu(null);
    KMCloseSearchWordWindow(null);
    KMCloseCommentWindow();
    KMCloseLinkToWindow(null);
    KMCloseEditLinkToWindow(null);
    //
    divContentWindow.style.left = objSmartTag.offsetLeft + "px";
    divContentWindow.style.top = (objSmartTag.offsetTop + objSmartTag.offsetHeight) + "px";
    divContentWindow.style.display = "";
    //
    var strContentTitle = KMSmartTagGetSelectionText();
    if (!strContentTitle || strContentTitle == "")
        return;
    var metaName = "varKMContents";
    var metasContents = objKMHelperDatabase.MetasByName(metaName);
    var chkBackToTop = document.getElementById("KMContentBackToTopID");
    if (metasContents && objKMHelperDatabase.Meta(metaName, "isAddBackToTop") == "1") {
        chkBackToTop.checked = true;
    }
    else {
        chkBackToTop.checked = false;
        objKMHelperDatabase.SetMeta(metaName, "isAddBackToTop", "0");
    }
    //
    objKMHelperPluginBrowser.ExecuteFunction1("KMAutoCloseContentWindow", true, null);
}

function KMOnSmartTagCommentClick() {
    if (!g_KMRange)
        return;
    //
    var objSmartTag = KMGetSmartTagWindow(false);
    if (!objSmartTag)
        return;
    //
    var objCommentWindow = KMGetCommentWindow(true);
    if (!objCommentWindow)
        return;
    //
    KMCloseFlashMenu(null);
    KMCloseSearchWordWindow(null);
    KMCloseLinkToWindow(null);
    KMCloseContentWindow();
    KMCloseEditLinkToWindow(null);
    //
    objCommentWindow.setAttribute("KMCommentCurrentID", "");
    //
    var x = objSmartTag.offsetLeft;
    var y = objSmartTag.offsetTop + objSmartTag.offsetHeight;
    //
    var widthCommentWindow = parseInt(objCommentWindow.style.width);
    //
    if (x + widthCommentWindow > document.body.clientWidth) {
        x = document.body.clientWidth - widthCommentWindow;
    }
    if (x < 0) {
        x = 0;
    }
    objCommentWindow.style.left = x + "px";
    objCommentWindow.style.top = y + "px";
    objCommentWindow.style.display = "";
    //
    //
    var commentText = document.getElementById("KMCommentText");
    if (commentText) {
        commentText.contentEditable = true;
        //
        commentText.innerText = GetSelectionComment();
    }
    //
    KMSetCommentWindowCaption(g_KMRange.toString());
    //
    objKMHelperPluginBrowser.ExecuteFunction1("KMAutoCloseCommentWindow", true, null);
}
function KMSetCommentWindowCaption(caption) {
    var commentCaption = document.getElementById("KMCommentCaption");
    if (commentCaption) {
        commentCaption.innerText = caption;
    }
}
function isUsableText(node) {
    return node.nodeType == 3 && node.nodeValue.replace(/[\r\n  ]/ig, '').length > 0
}
function GetSelectionComment() {
    var domList = WizAnnotator.domFinder.getRangeDomList(document, false);
    //
    if (domList.length == 0)
        return '';
    //
    var comment = [];
    for (var i = 0, j = domList.length; i < j; i++) {
        var dom = domList[i];
        if (3 == dom.nodeType && isUsableText(dom) && 1 == dom.parentNode.nodeType) {
            comment.push(dom.parentNode.title);
            continue;
        }
        if (1 == dom.nodeType) {
            comment.push(dom.title);
        }
    }
    //
    if (comment.length < 1)
        return '';
    var k = 0;
    for (; k < comment.length; k++) {
        if (comment[k] != comment[0])
            break;
    }
    return k == comment.length ? comment[0] : '';
}
////===========================================================================
////添加链接到【文件夹|标签|样式|文件】代码开始
//点击【链接到...】按钮
function KMOnLinkToClick() {
    var pluginPath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    //
    var objSmartTag = KMGetSmartTagWindow(false);
    if (!objSmartTag)
        return;
    //
    var divLinkToFolderWindow = KMGetLinkToWindow(true);
    if (!divLinkToFolderWindow)
        return;
    //
    KMCloseCommentWindow();
    //
    divLinkToFolderWindow.style.left = objSmartTag.offsetLeft + "px";
    divLinkToFolderWindow.style.top = (objSmartTag.offsetTop + objSmartTag.offsetHeight) + "px";
    divLinkToFolderWindow.innerHTML = "";
    divLinkToFolderWindow.style.display = "";
    //
    var strWord = KMSmartTagGetSelectionText();
    if (!strWord || strWord == "") { return; }
    //
    var objCategoryCtrl = objKMHelperApp.Window.CategoryCtrl;
    var objDocumentsCtrl = objKMHelperApp.Window.DocumentsCtrl;
    //
    if (objCategoryCtrl.SelectedFolder) {
        var btnAddFolder = document.createElement("span");
        btnAddFolder.style.cssText = KMGetFlashMenuStyle1();
        var text = objKMHelperApp.LoadStringFromFile(languageFileName, "strLinkToFolder");
        btnAddFolder.innerText = objKMHelperApp.LoadStringFromFile(languageFileName, "strLinkToFolder");

        btnAddFolder.addEventListener("click", KMLinkToFolder);
        btnAddFolder.addEventListener("mouseover", KMFlashMenuItemMouseOver);
        btnAddFolder.addEventListener("mouseout", KMFlashMenuItemMouseOut);

        divLinkToFolderWindow.appendChild(btnAddFolder);
    }
    if (objCategoryCtrl.SelectedTags.Count > 0) {
        var btnAddFolder = document.createElement("span");
        btnAddFolder.style.cssText = KMGetFlashMenuStyle1();
        btnAddFolder.innerText = objKMHelperApp.LoadStringFromFile(languageFileName, "strLinkToTags");

        btnAddFolder.addEventListener("click", KMLinkToTags);
        btnAddFolder.addEventListener("mouseover", KMFlashMenuItemMouseOver);
        btnAddFolder.addEventListener("mouseout", KMFlashMenuItemMouseOut);

        divLinkToFolderWindow.appendChild(btnAddFolder);
    }
    if (objCategoryCtrl.SelectedStyle) {
        var btnAddFolder = document.createElement("span");
        btnAddFolder.style.cssText = KMGetFlashMenuStyle1();
        btnAddFolder.innerText = objKMHelperApp.LoadStringFromFile(languageFileName, "strLinkToStyle");

        btnAddFolder.addEventListener("click", KMLinkToStyle);
        btnAddFolder.addEventListener("mouseover", KMFlashMenuItemMouseOver);
        btnAddFolder.addEventListener("mouseout", KMFlashMenuItemMouseOut);

        divLinkToFolderWindow.appendChild(btnAddFolder);
    }
    if (objDocumentsCtrl.SelectedDocuments.Count > 0) {
        var btnAddFolder = document.createElement("span");
        btnAddFolder.style.cssText = KMGetFlashMenuStyle1();
        btnAddFolder.innerText = objKMHelperApp.LoadStringFromFile(languageFileName, "strLinkToDocs");

        btnAddFolder.addEventListener("click", KMLinkToDocs);
        btnAddFolder.addEventListener("mouseover", KMFlashMenuItemMouseOver);
        btnAddFolder.addEventListener("mouseout", KMFlashMenuItemMouseOut);

        divLinkToFolderWindow.appendChild(btnAddFolder);
    }
    divLinkToFolderWindow.style.display = "";
    //
}
//【链接到选中标签】
function KMLinkToTags() {
    KMCloseLinkToWindow(null);
    KMSetLinkToSelection("tags");
}
//【链接到选中样式】
function KMLinkToStyle() {
    KMCloseLinkToWindow(null);
    KMSetLinkToSelection("style");
}
//【链接到选中的多个文件】
function KMLinkToDocs() {
    KMCloseLinkToWindow(null);
    KMSetLinkToSelection("docs");
}
//根据当前是否有【文件夹/标签/样式/文件】选中而生成相应按钮
function KMSetLinkToSelection(str) {
    if (!g_KMRange) { return; }
    // var html = g_KMRange.htmlText;
    var html = GetSelectionHTML(g_KMRange);
    //
    var id = "WizKMLink_" + KMGetRandomInt();
    //
    var objCategoryCtrl = objKMHelperApp.Window.CategoryCtrl;
    var objDocumentsCtrl = objKMHelperApp.Window.DocumentsCtrl;
    //
    switch (str) {
        case "folder":
            var strFolderLocation = objCategoryCtrl.SelectedFolder.Location;
            var newHtml = "<span id=\"" + id + "\"; style=\"text-decoration:underline; color:blue;\" folderlocation=\"" + strFolderLocation + "\"; name=\"\">" + html + "</span>";
            break;
        case "tags":
            var objSelectedTags = objCategoryCtrl.SelectedTags;
            var strTagsGUID = "";
            for (var i = 0; i < objSelectedTags.Count; i++) {
                strTagsGUID += objSelectedTags.Item(i).GUID + ";";
            }
            var newHtml = "<span id=\"" + id + "\"; style=\"text-decoration:underline; color:blue;\" tagsguid=\"" + strTagsGUID + "\"; name=\"\">" + html + "</span>";
            break;
        case "style":
            var strStyleGUID = objCategoryCtrl.SelectedStyle.GUID;
            var newHtml = "<span id=\"" + id + "\"; style=\"text-decoration:underline; color:blue;\" styleguid=\"" + strStyleGUID + "\"; name=\"\">" + html + "</span>";
            break;
        case "docs":
            var objSelectedDocs = objDocumentsCtrl.SelectedDocuments;
            var strDocsGUID = "";
            for (var i = 0; i < objSelectedDocs.Count; i++) {
                strDocsGUID += objSelectedDocs.Item(i).GUID + ";";
            }
            var newHtml = "<span id=\"" + id + "\"; style=\"text-decoration:underline; color:blue;\" docsguid=\"" + strDocsGUID + "\"; name=\"\">" + html + "</span>";
            break;
        default:
            { }
    }
    //
    try {
        // g_KMRange.pasteHTML(newHtml);
        PasteSelectionHTML(newHtml);
        var objInlineLink = document.getElementById(id);
        if (objInlineLink) {
            KMLinkToAttachEvents(objInlineLink);
        }
    }
    catch (err) {
    }
    KMSetDocumentModified();
}
function KMLinkToAttachEvents(obj) {
    // obj.attachEvent("onclick", KMOnLinkToTextClicked);
    // obj.attachEvent("onmouseover", KMOnLinkToTextMouseOver);
    obj.addEventListener("click", KMOnLinkToTextClicked);
    obj.addEventListener("mouseover", KMOnLinkToTextMouseOver);
}
//删除链接部分代码开始
//鼠标浮停时显示【删除链接】窗口
function KMOnLinkToTextMouseOver(e) {
    if (objKMContentApp.IsEditing())
        return;
    //
    var objKMHelperDatabase = objKMHelperApp.Database;
    var pluginPath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    //
    if (!e)
        return;
    //
    var elem = e.srcElement;
    if (!elem)
        return;
    //
    var objInlineLink = KMGetParentInlineLink(elem);
    if (!objInlineLink)
        return;
    //
    var objEditLinkWindow = KMGetEditLinkWindow(true);
    if (!objEditLinkWindow)
        return;
    var scrollX = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
    var scrollY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    var x = e.clientX + scrollX;
    var y = e.clientY + scrollY;
    //
    var widthEditLinkWindow = parseInt(objEditLinkWindow.style.width);
    //
    if (x + widthEditLinkWindow > document.body.clientWidth) {
        x = document.body.clientWidth - widthEditLinkWindow;
    }
    if (x < 0) {
        x = 0;
    }
    //
    y += 20;
    //
    objEditLinkWindow.style.left = x + "px";
    objEditLinkWindow.style.top = y + "px";
    objEditLinkWindow.innerHTML = "";
    objEditLinkWindow.setAttribute("KMLinkCurrentID", objInlineLink.id);
    //
    var btnDelLink = document.createElement("span");
    btnDelLink.style.cssText = KMGetFlashMenuStyle1();
    btnDelLink.innerText = objKMHelperApp.LoadStringFromFile(languageFileName, "strDelLink");

    btnDelLink.addEventListener("click", KMDelLink);
    btnDelLink.addEventListener("mouseover", KMFlashMenuItemMouseOver);
    btnDelLink.addEventListener("mouseout", KMFlashMenuItemMouseOut);

    objEditLinkWindow.appendChild(btnDelLink);
    objEditLinkWindow.style.display = "";
    //
    objKMHelperPluginBrowser.ExecuteFunction1("KMAutoCloseEditLinkWindow", true, null);
}

//【链接到选中文件夹】
function KMLinkToFolder() {
    KMCloseLinkToWindow(null);
    KMSetLinkToSelection("folder");
}
function KMOnSmartTagFlashClick() {
    var objSmartTag = KMGetSmartTagWindow(false);
    if (!objSmartTag)
        return;
    //
    var divMenu = KMGetFlashMenuWindow(true);
    if (!divMenu)
        return;
    //
    KMCloseCommentWindow();
    KMCloseLinkToWindow(null);
    KMCloseEditLinkToWindow(null);
    KMCloseContentWindow();
    //
    divMenu.style.left = objSmartTag.offsetLeft + "px";
    divMenu.style.top = (objSmartTag.offsetTop + objSmartTag.offsetHeight) + "px";
    //
    divMenu.style.display = "";
}
function KMGetSmartTagWindow(create) {
    var objSmartTagWindow = document.getElementById("WizKMSmartTagDivID");
    if (objSmartTagWindow != null)
        return objSmartTagWindow;
    if (!create)
        return null;
    //
    var pluginPath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    //var strSkinID = objKMHelperDatabase.Meta("wizhelp_parm", "SKIN_ID");
    //if (strSkinID == null || strSkinID == "") {
    //    strSkinID = "0";
    //}
    var strSkinPath = pluginPath + "Skins\\Skin0\\";
    //
    objSmartTagWindow = document.createElement("wiz_tmp_tag");
    objSmartTagWindow.style.cssText = "padding:0; margin:0; cursor:pointer; position:absolute; z-index:100000; width:200px; height:36px; background-color:transparent; display:none;";
    objSmartTagWindow.id = "WizKMSmartTagDivID";
    // Row 1: Highlighter
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_pink.png", "strMarkPink", "KMSmartTagPinkImg", KMOnSmartTagPinkClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_blue.png", "strMarkBlue", "KMSmartTagBlueImg", KMOnSmartTagBlueClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_yellow.png", "strMarkYellow", "KMSmartTagYellowImg", KMOnSmartTagYellowClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_orange.png", "strMarkOrange", "KMSmartTagOrangeImg", KMOnSmartTagOrangeClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_green.png", "strMarkGreen", "KMSmartTagGreenImg", KMOnSmartTagGreenClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_purple.png", "strMarkPurple", "KMSmartTagPurpleImg", KMOnSmartTagPurpleClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_red.png", "strMarkRed", "KMSmartTagRedImg", KMOnSmartTagRedClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_eraser.png", "strEraser", "KMSmartTagEraserImg", KMOnSmartTagEraserClick);
    //// Row 2: Others
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_bookmark.png", "strBookmark", "KMSmartTagBookmarkImg", KMOnBookmarkClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_contents.png", "strContents", "KMSetAsContent", KMOnSetAsContentClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_baidu.png", "strSeIcon", "KMSmartTagSeIconImg", KMOnSearchEngineClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_dictionary.png", "strSWIcon", "KMSmartTagSeWordImg", KMOnSearchWordClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_comment.png", "strComment", "KMSmartTagCommentImg", KMOnSmartTagCommentClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_linkto.png", "strLinkTo", "KMSmartTagLinkToImg", KMOnLinkToClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_flash.png", "strKM", "KMSmartTagFlashImg", KMOnSmartTagFlashClick);
    KMAddSmartTagButton(strSkinPath, objSmartTagWindow, "tm_readitlater.png", "strReadItLater", "KMSmartTagRILImg", KMFlashSelectionAsRIL);
    //
    return document.body.appendChild(objSmartTagWindow);
}
function KMAddSmartTagButton(SkinPath, objSmartWindow, imgfilename, buttonname, id, callback) {
    var pluginPath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    var img = document.createElement("IMG");
    img.border = 0;
    img.src = SkinPath + imgfilename;
    img.title = objKMHelperApp.LoadStringFromFile(pluginPath + "plugin.ini", buttonname);
    img.id = id;
    img.width = "24";
    img.height = "24";
    img.style.cssText = "float:left; padding:0; margin:0; cursor:pointer; border-style:none;";
    img.addEventListener("click", callback);
    //
    objSmartWindow.appendChild(img);
}
// FF8888 Red
function KMOnSmartTagRedClick() {
    KMChangeSelectionBackColor("#ff8888");
}

//FFAAFF Pink
function KMOnSmartTagPinkClick() {
    KMChangeSelectionBackColor("#ffaaff");
}

//99CCFF Blue
function KMOnSmartTagBlueClick() {
    KMChangeSelectionBackColor("#99ccff");
}

//FFFF66 Yellow
function KMOnSmartTagYellowClick() {
    KMChangeSelectionBackColor("#ffff66");
}

//84E384 Green
function KMOnSmartTagGreenClick() {
    KMChangeSelectionBackColor("#84e384");
}

// FFAD5B Orange
function KMOnSmartTagOrangeClick() {
    KMChangeSelectionBackColor("#ffad5b");
}

// D6ACFF Purple
function KMOnSmartTagPurpleClick() {
    KMChangeSelectionBackColor("#d6acff");
}
function KMOnSmartTagEraserClick() {
    KMChangeSelectionBackColor("");
}
function KMChangeSelectionBackColor(color) {
    if (!g_KMRange)
        return;
    //
    ModifiySelectionColor(color);
    //}
    //
    KMCloseCommentWindow();
    KMCloseFlashMenu(null);
    KMCloseSearchWordWindow(null);
    KMCloseLinkToWindow(null);
    KMCloseEditLinkToWindow(null);
    KMCloseContentWindow();
    KMCloseSmartTagWindow(null);
}
function ModifiySelectionColor(color) {
    var style = {
        "background-color": color
    };
    //
    if (WizHelperEditor && WizHelperEditor.modifySelectionStyle) {
        WizHelperEditor.modifySelectionStyle(document, style);
    }
    KMSetDocumentModified();
}
function KMCloseFlashMenu(menu) {
    if (!menu) {
        menu = KMGetFlashMenuWindow(false);
    }
    if (!menu)
        return;
    if (menu.style.display == "none")
        return;
    menu.style.display = "none";
}
//
// 关闭取词窗口
function KMCloseSearchWordWindow(menu) {
    if (!menu) {
        menu = KMGetSearchWordWindow(false);
    }
    if (!menu)
        return;
    if (menu.style.display == "none")
        return;
    menu.style.display = "none";
}
////===========================================================================
//// 屏幕取词代码开始
//
// 生成取词窗口
function KMGetSearchWordWindow(create) {
    var div = document.getElementById("WizKMSearchWordDivID");
    if (div != null)
        return div;
    if (!create)
        return null;
    //
    div = document.createElement("wiz_tmp_tag");
    div.style.cssText = "padding:0; margin:0; position:absolute; z-index:100001; width:500px; height: 400px; display:none; background-color:window;border: solid 1px #6100C1;filter: progid:DXImageTransform.Microsoft.Shadow(color=#999999,direction=135,strength=5);";
    div.id = "WizKMSearchWordDivID";
    //
    return document.body.appendChild(div);
}
//
// 关闭【链接到...】窗口
function KMCloseLinkToWindow(menu) {
    if (!menu) {
        menu = KMGetLinkToWindow(false);
    }
    if (!menu)
        return;
    if (menu.style.display == "none")
        return;
    menu.style.display = "none";
}
//
// 生成【链接到...】窗口
function KMGetLinkToWindow(create) {
    var div = document.getElementById("WizKMLinkToFolderDivID");
    if (div != null)
        return div;
    if (!create)
        return null;
    //
    div = document.createElement("wiz_tmp_tag");
    div.style.cssText = "padding:0; margin:0; position:absolute; z-index:100001; width:200px; background-color:window;border: solid 1px #6100C1;filter: progid:DXImageTransform.Microsoft.Shadow(color=#999999,direction=135,strength=5);";
    div.id = "WizKMLinkToFolderDivID";
    //
    return document.body.appendChild(div);
}
//
// 关闭【设置为目录项...】窗口
function KMCloseContentWindow() {
    objContentWindow = KMGetContentWindow(false);
    if (!objContentWindow) { return; }
    objContentWindow.style.display = "none";
}
// 保存是否添加【链接到页面顶部】
function KMSetMetaBackToTop(e) {
    var chkBackToTop = document.getElementById("KMContentBackToTopID");
    if (chkBackToTop.checked) { objKMHelperDatabase.SetMeta("varKMContents", "isAddBackToTop", "1"); }
    else { objKMHelperDatabase.SetMeta("varKMContents", "isAddBackToTop", "0"); }
}
//
// 生成【设置为目录项...】窗口
function KMGetContentWindow(create) {
    var pluginPath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    var div = document.getElementById("WizKMContentDivID");
    if (div != null)
        return div;
    if (!create)
        return null;
    //
    div = document.createElement("wiz_tmp_tag");
    div.style.cssText = "padding:0; margin:0; position:absolute; z-index:100001; width:200px; display:none; background-color:window;border: solid 1px #6100C1;filter: progid:DXImageTransform.Microsoft.Shadow(color=#999999,direction=135,strength=5);";
    div.id = "WizKMContentDivID";
    //
    KMAddFlashMenuItem2(div, "strSelAsContent1", KMFlashSelAsContent1);
    KMAddFlashMenuItem2(div, "strSelAsContent2", KMFlashSelAsContent2);
    KMAddFlashMenuItem2(div, "strSelAsContent3", KMFlashSelAsContent3);
    KMAddFlashMenuItem2(div, "strSelAsContent4", KMFlashSelAsContent4);
    KMAddFlashMenuItem2(div, "strSelAsContent5", KMFlashSelAsContent5);
    KMAddFlashMenuItem2(div, "strSelAsContent6", KMFlashSelAsContent6);
    KMAddFlashMenuItem2(div, "strSelUnContent", KMFlashSelUnContent);
    KMAddFlashMenuItem2(div, "strBackToTop", KMAddBackToTopLink);
    //
    var chkBackToTop = document.createElement("input");
    chkBackToTop.type = "checkbox";
    chkBackToTop.id = "KMContentBackToTopID";

    chkBackToTop.addEventListener("click", KMSetMetaBackToTop);

    div.appendChild(chkBackToTop);
    var labelBackToTop = document.createElement("label");
    labelBackToTop.innerText = objKMHelperApp.LoadStringFromFile(languageFileName, "strBackToTop");
    labelBackToTop.style.cssText = "padding:2; text-align: left; text-decoration: none; font-family:arial; font-size:9pt; color: #000000;";
    div.appendChild(labelBackToTop);
    //
    return document.body.appendChild(div);
}
function KMAddFlashMenuItem2(divParent, textName, callback) {
    var pluginPath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    //
    KMAddFlashMenuItem(divParent, objKMHelperApp.LoadStringFromFile(languageFileName, textName), callback);
}
//
// 保存目录项
function KMFlashSelAsContent1() {
    KMFlashSelAsContent(1);
}
function KMFlashSelAsContent2() {
    KMFlashSelAsContent(2);
}
function KMFlashSelAsContent3() {
    KMFlashSelAsContent(3);
}
function KMFlashSelAsContent4() {
    KMFlashSelAsContent(4);
}
function KMFlashSelAsContent5() {
    KMFlashSelAsContent(5);
}
function KMFlashSelAsContent6() {
    KMFlashSelAsContent(6);
}
function KMFlashSelAsContent(intContentClass) {
    if (!g_KMRange) { return; }
    //
   var startNode = g_KMRange.startContainer;
    //
    var objContent = KMGetParentContent(startNode.parentElement);
    if (objContent) {
     	objContent.style.fontSize = (20-2*intContentClass).toString() + "pt";
     	objContent.KMContentClass = intContentClass;
    }
    else {
    	// var  html = g_KMRange.htmlText;
        //
	    var id = "WizKMContent_" + KMGetRandomInt();
		var name = KMContentGetName(g_KMRange.toString());
    	var objspan = document.createElement("span");
        objspan.id = id + "_Span";
        //
	    g_KMRange.surroundContents(objspan);
        //
	    var content = document.createElement('a');
        content.id = id;
        content.style.cssText = "font-weight:bold; font-size:" + (20-2*intContentClass) + "pt";
        content.name = name;
        content.setAttribute('KMContentClass', intContentClass);
        //
        objspan.parentNode.insertBefore(content, objspan.nextSibling);
        content.appendChild(objspan);        
        //
        var chkBackToTop = document.getElementById("KMContentBackToTopID");
	    if (chkBackToTop && chkBackToTop.checked) {
	        var objAPageTop = document.getElementById("KMContentPageTopID");
	    	if (objAPageTop) {
	    	    if (document.body.firstChild.id != "KMContentPageTopID") {
	    			objAPageTop.removeNode(true);
	    			objAPageTop = document.createElement("a");
					objAPageTop.id="KMContentPageTopID";
					objAPageTop.name = "KMContentPageTopID";
					document.body.insertBefore(objAPageTop, document.body.firstChild);
	    		}
	    	}
	    	else {
	    	    objAPageTop = document.createElement("a");
				objAPageTop.id="KMContentPageTopID";
				objAPageTop.name = "KMContentPageTopID";
				document.body.insertBefore(objAPageTop, document.body.firstChild);
	    	}
	    	var objABackToTop = document.createElement("a");
	    	objABackToTop.id =  id + "_Top";
	    	objABackToTop.style.cssText = "cursor:hand; color:grey;";
	    	objABackToTop.href = "#KMContentPageTopID";
	    	objABackToTop.innerText = "[^]";
            //
            content.parentNode.insertBefore(objABackToTop, content.nextSibling);
		}
	}
    //
    KMSetDocumentModified();
    KMCloseContentWindow();
}
//去除 Bookmark name 中的非法字符
function KMContentGetName(str) {
    return str.replace(/\"|'|`/g, "");
}

//
//取消目录项
function KMFlashSelUnContent() {
    if (!g_KMRange) { return; }
    var startNode = g_KMRange.startContainer;
    //
    var objContent = KMGetParentContent(startNode);
    if (!objContent)
        return;
    //
    var TopId = objContent.id;
    if (TopId.lastIndexOf("_Top") == TopId.length - 4)
        return;
    //
    if ("a" == objContent.tagName.toLowerCase()) {
        var contentId = objContent.id;
        var child = objContent.firstChild;
        if (child && child.tagName && child.tagName.toLowerCase() == 'span' && child.id == contentId + "_Span") {
            child = child.firstChild;
        }
        //
        while (child) {
            var next = child.nextSibling;
            //
            objContent.parentElement.insertBefore(child, objContent);
            //
            child = next;
        }
        //
        objContent.parentElement.removeChild(objContent);
        //
        var objLinkTop = document.getElementById(contentId + "_Top");
        if (objLinkTop) {
            objLinkTop.parentElement.removeChild(objLinkTop);
        }
    }
    else {
        var childNodes = objContent.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            var contentTopId = contentId + "_Top";
            if (childNodes[i].id == contentTopId) {
                objContent.removeChild(childNodes[i]);
                continue;
            }
            objContent.parentNode.appendChild(childNodes[i]);
        }
        objContent.parentNode.removeChild(objContent);
    }
    //
    KMSetDocumentModified();
    KMCloseContentWindow();
}
//
//
function KMIsContent(elem) {
    if (!elem || !elem.id || !elem.tagName)
        return false;
    //
    try {
        if (elem.id.indexOf("WizKMContent_") != 0)
            return false;
        if (elem.tagName.toLowerCase() != 'a')
            return false;
    }
    catch (e) {
        return false;
    }
    //
    return true;
}
function KMGetParentContent(elem) {
    while (elem != null) {
        if (KMIsContent(elem))
            return elem;
        elem = elem.parentNode;
    }
    //
    return null;
}
//
// 插入【回到页面顶端】漂浮连接
function KMAddBackToTopLink() {
    var objDivBody = document.getElementById('KMContentBodyDivID');
    if (objDivBody) { document.body.innerHTML = objDivBody.innerHTML; }
    document.body.style.cssText = "height:100%; overflow:auto;";
    //
    var objHTML = document.getElementsByTagName('html')[0];
    objHTML.style.verflow = "hidden";
    //
    var objdivBackToTop = document.getElementById("KMContentPageTopID");
    if (objdivBackToTop) { objdivBackToTop.remove(); }
    var objdivBackToTop = document.createElement("div");
    objdivBackToTop.style.cssText = "position:fixed; right:5px; bottom: 50px;";
    objdivBackToTop.id = "KMContentBackToTopDivID";
    objdivBackToTop.innerHTML = "<a href=\"#KMContentPageTopID\";>^</a>";
    document.body.insertBefore(objdivBackToTop, document.body.firstChild);
    //
    var objAPageTop = document.getElementById("KMContentPageTopID");
    if (objAPageTop) { objAPageTop.remove(); }
    objAPageTop = document.createElement("a");
    objAPageTop.id = "KMContentPageTopID";
    objAPageTop.style.cssText = "position: absolute; top: 0px;";
    document.body.insertBefore(objAPageTop, document.body.firstChild);
    //
    KMSetDocumentModified();
    KMCloseContentWindow();
}
function KMFindChildNodeById(node, id) {
    if (node.attributes && node.attributes['id'] && node.attributes['id'].nodeValue == id) {
        return node;
    } else {
        if (node.hasChildNodes()) {
            var found = null;
            for (var i = 0; i < node.childNodes.length; i++) {
                found = KMFindChildNodeById(node.childNodes[i], id);
                if (found) {
                    return found;
                }
            }
        }
    }
    return null;
}
function KMRemoveNode(node, savetext) {
    if (!node)
        return;
    //
    var parentNode = node.parentNode;
    if (!parentNode)
        return;
    //
    if (!savetext) {
        parentNode.removeChild(node);
    } else {
        while (node.firstChild) {
            parentNode.insertBefore(node.firstChild, node);
        }
        //
        parentNode.removeChild(node);
    }
}
function KMRemoveChildNodeByID(node, id) {
    while ((child = KMFindChildNodeById(node, id)) != null) {
        // child.removeNode(false);
        KMRemoveNode(child, true);
    }
}
function KMRemoveChildNode(parentNode, nodeid) {
    var node = KMFindChildNodeById(parentNode, nodeid);
    if (!node)
        return;
    // node.removeNode(true);
    KMRemoveNode(node, false);
}

function KMSmartTagGetSelectionText() {
    if (!g_KMRange)
        return "";
    try {
        var text = g_KMRange.toString();
        if (!text)
            return "";
        text = KMStringTrim(text);
        return text;
    }
    catch (err) {
        return "";
    }
}
function KMTextToSingleLine(str) {
    str = str.replace(/\r/g, " ");
    str = str.replace(/\n/g, " ");
    str = str.replace(/\t/g, " ");
    return str;
}
//// Youdao 在线取词开始
function KMGetOnlineYoudao(strWord) {
    var strHTML = "";
    var baseURI = "http://fanyi.youdao.com/openapi.do?keyfrom=Wizhelper&key=342921866&type=data&doctype=xml&version=1.1&q=";
    var strSearchWordURL = baseURI + encodeURIComponent(strWord);

    // var xmlhttp_request = false;
    // try { xmlhttp_request = objHelperApp.CreateActiveXObject("Msxml2.XMLHTTP"); }
    // catch(e) {
    // 	try { xmlhttp_request = objHelperApp.CreateActiveXObject("Microsoft.XMLHTTP"); }
    // 	catch(e) { xmlhttp_request = false; }
    // }
    var xmlhttp_request = new XMLHttpRequest();
    //
    if (xmlhttp_request) {
        xmlhttp_request.onload = function () {
            //
            if (xmlhttp_request.readyState == 4) {
                if (xmlhttp_request.status == 200) {
                    //
                    var docXML = xmlhttp_request.responseXML.documentElement;
                    var errorCode = docXML.getElementsByTagName("errorCode")[0].firstChild.data;
                    if (errorCode == 0) {
                        // Youdao Basic
                        var objbasic = docXML.getElementsByTagName("basic")[0];
                        if (objbasic) {
                            strHTML += " <div style = 'font-size:9pt; font-style:italic; margin-top:15px;'> ========== <有道词典-基本词典> ========== </div>";
                            strHTML += " <div id=\"WizKMDictYoudaoBasicDivID\"> ";
                            var elePhonetic = objbasic.getElementsByTagName("phonetic");
                            var strPhonetic;
                            if (elePhonetic && elePhonetic[0]) {
                                strPhonetic = elePhonetic[0].firstChild.data;
                                strHTML += " <b>[ " + strPhonetic + " ]</b> ";
                            }
                            //
                            var objExplains = objbasic.getElementsByTagName("explains")[0].childNodes;
                            for (var j = 0; j < objExplains.length; j++) {
                                if (objExplains[j] && objExplains[j].firstChild) {
                                    var strExplainj = objExplains[j].firstChild.data;
                                    strHTML += " <br> " + strExplainj;
                                }
                            }
                            strHTML += " </div> ";
                        }
                        // Youdao Web
                        var objweb = docXML.getElementsByTagName("web")[0];
                        if (objweb) {
                            strHTML += " <div style = 'font-size:9pt; font-style:italic; margin-top:15px;'> ========== <有道词典-网络释义> ========== </div>";
                            strHTML += " <div id=\"WizKMDictYoudaoWebDivID\"> ";
                            var objExplains = objweb.getElementsByTagName("explain");
                            for (var j = 0; j < objExplains.length; j++) {
                                var eleKey = objExplains[j].getElementsByTagName("key");
                                var strKeyj;
                                if (eleKey && eleKey[0]) {
                                    strKeyj = eleKey[0].firstChild.data;
                                    strHTML += "<b>" + strKeyj + "</b> <br> ";
                                }
                                //
                                var objValuesj = objExplains[j].getElementsByTagName("value")[0].childNodes;
                                for (var k = 0; k < objValuesj.length; k++) {
                                    if (objValuesj[k] && objValuesj[k].firstChild) {
                                        var strValuek = objValuesj[k].firstChild.data;
                                        strHTML += strValuek + "; ";
                                    }
                                }
                                strHTML += " <br> ";
                            }
                            strHTML += " </div> ";
                        }
                        // Youdao Translation
                        var eleTran = docXML.getElementsByTagName("paragraph");
                        var strTranslation;
                        if (eleTran && eleTran[0]) {
                            strTranslation = eleTran[0].firstChild.data;
                        }
                        strHTML += " <div style = 'font-size:9pt; font-style:italic; margin-top:15px;'> ========== <有道在线翻译> ========== </div>";
                        strHTML += " <div id=\"WizKMDictYoudaoTransDivID\"> ";
                        strHTML += strTranslation;
                        strHTML += " </div> ";
                    }
                }
            }
        }
        //
        xmlhttp_request.open("GET", strSearchWordURL, false);
        xmlhttp_request.setRequestHeader("Charset", "GB2312");
        xmlhttp_request.setRequestHeader("Content-Type", "text/xml");
        //
        xmlhttp_request.send();
    }
    //
    return strHTML;
}
function KMDictPlayAudio() {
    var objDictAudio = document.getElementById("KMDictAudioObjID");
    objDictAudio.play();
}
//
// 本地数据库及在线取词
function KMOnSearchWordClick() {
    if (!g_KMRange)
        return;
    //
    var pluginPath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    //
    var objSmartTag = KMGetSmartTagWindow(false);
    if (!objSmartTag)
        return;
    //
    var divSearchWordWindow = KMGetSearchWordWindow(true);
    if (!divSearchWordWindow)
        return;
    //
    KMCloseCommentWindow();
    //
    divSearchWordWindow.style.left = objSmartTag.offsetLeft + "px";
    divSearchWordWindow.style.top = (objSmartTag.offsetTop + objSmartTag.offsetHeight) + "px";
    divSearchWordWindow.innerHTML = "<table><tbody><tr><td id='tdKMSWWbtn0'></td><td id='tdKMSWWbtn1'></td><td id='tdKMSWWbtn2'></td></tr></tbody></table>";
    //
    var strWord = KMSmartTagGetSelectionText();
    if (!strWord || strWord == "") { return; }
    strWord = KMTextToSingleLine(strWord);
    //
    // 在线取词开始
    var htmlOnlineDicts = "";
    //htmlOnlineDicts += KMGetOnlineDictCn(strWord);
    htmlOnlineDicts += KMGetOnlineYoudao(strWord);

    if (htmlOnlineDicts != "") {
        var divKMDictOnline = document.createElement("div");
        divKMDictOnline.id = "WizKMDictOnlineDivID";
        divKMDictOnline.style.margin = "3px";
        divKMDictOnline.innerHTML = htmlOnlineDicts;
        divKMDictOnline.style.display = "";
        //
        divSearchWordWindow.style.overflow = "scroll";
        divSearchWordWindow.appendChild(divKMDictOnline);
        divSearchWordWindow.style.display = "";
    }
    //
    // 本地词库取词开始
    var htmlLocalDict = "";
    // htmlLocalDict += KMGetLocalDict(strWord);

    if (htmlLocalDict != "") {
        var divKMDictLocal = document.createElement("div");
        divKMDictLocal.id = "WizKMDictLocalDivID";
        divKMDictLocal.style.display = "";
        divKMDictLocal.style.margin = "3px";
        divKMDictLocal.innerHTML = htmlLocalDict;
        //
        divSearchWordWindow.appendChild(divKMDictLocal);
        divSearchWordWindow.style.display = "";
    }
    //
    // 生成按钮
    if (htmlOnlineDicts != "" || htmlLocalDict != "") {
        // 生成保存精简取词结果为注释的按钮
        var btnSaveToComment = document.createElement("span");
        btnSaveToComment.style.cssText = KMGetFlashMenuStyle1();
        btnSaveToComment.innerText = "[ " + objKMHelperApp.LoadStringFromFile(languageFileName, "strKMSWasComment1") + " ]";

        btnSaveToComment.addEventListener("click", KMSaveWordToComment);
        btnSaveToComment.addEventListener("mouseover", KMFlashMenuItemMouseOver);
        btnSaveToComment.addEventListener("mouseout", KMFlashMenuItemMouseOut);

        document.getElementById("tdKMSWWbtn1").appendChild(btnSaveToComment);
        // 生成保存所以取词结果为注释的按钮
        var btnSaveToComment2 = document.createElement("span");
        btnSaveToComment2.style.cssText = KMGetFlashMenuStyle1();
        btnSaveToComment2.innerText = "[ " + objKMHelperApp.LoadStringFromFile(languageFileName, "strKMSWasComment2") + " ]";

        btnSaveToComment2.addEventListener("click", KMSaveWordToComment2);
        btnSaveToComment2.addEventListener("mouseover", KMFlashMenuItemMouseOver);
        btnSaveToComment2.addEventListener("mouseout", KMFlashMenuItemMouseOut);

        document.getElementById("tdKMSWWbtn2").appendChild(btnSaveToComment2);
    }
    //
    // 在线取得单词发声开始
    // var urlAudio = KMGetOnlineDictCn(strWord);
    var urlAudio;
    if (urlAudio) {
        //var htmlAudio = "<embed src='" + urlAudio + "' width=\"50%\" height=\"50%\"></embed>"
        //var htmlAudio = "<audio src='" + urlAudio + "' controls autoplay>not supported</audio>";
        //var htmlAudio = "<img dynsrc='" + urlAudio + "' src='"+pluginPath+"km_audio.png' alt='朗读单词' border='0' />";
        var htmlAudio = "<object id='KMDictAudioObjID' style='display:none' classid=\"clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95\">";
        htmlAudio += "<param name=\"AutoStart\" value=\"1\" />";
        htmlAudio += "<param name=\"FileName\" value=\"" + urlAudio + "\" />";
        htmlAudio += "</object>";
        //htmlAudio += "<img src='"+pluginPath+"km_audio.png' alt='朗读单词' border='0' onclick='KMDictPlayAudio()' />";
        document.getElementById("tdKMSWWbtn0").innerHTML = htmlAudio;
        //生成朗读单词的按钮
        var btnSaveToComment0 = document.createElement("span");
        btnSaveToComment0.style.cssText = KMGetFlashMenuStyle1();
        btnSaveToComment0.innerText = "[ " + objKMHelperApp.LoadStringFromFile(languageFileName, "strKMSWasComment0") + " ]";
        //
        btnSaveToComment0.addEventListener("click", KMDictPlayAudio);
        btnSaveToComment0.addEventListener("mouseover", KMFlashMenuItemMouseOver);
        btnSaveToComment0.addEventListener("mouseout", KMFlashMenuItemMouseOut);

        document.getElementById("tdKMSWWbtn0").appendChild(btnSaveToComment0);
    }
    //
    objKMHelperPluginBrowser.ExecuteFunction1("KMAutoCloseSearchWordWindow", true, null);
}
function KMGetRandomInt() {
    var d = new Date();
    return d.getTime();
}
//
// 保存精简取词结果为注释
function KMSaveWordToComment() {
    //
    if (!g_KMRange) { return; }

    // var html = g_KMRange.htmlText;
    var html = GetSelectionHTML(g_KMRange);
    //
    var id = "WizKMComment_" + KMGetRandomInt();
    //
    var newHtml = "<span id=\"" + id + "\" style=\"border-bottom: 2px #ff0000 dashed\" >" + html + "</span>";
    //
    var objDictLocalDiv = document.getElementById("WizKMDictLocalDivID");
    var objDictYoudaoDiv = document.getElementById("WizKMDictYoudaoBasicDivID");
    //
    var objDictAudio = document.getElementById("KMDictAudioObjID");
    var urlAudio = "";
    if (objDictAudio)
        urlAudio += objDictAudio.lastChild.value;

    var strWordToComment = "";
    if (objDictYoudaoDiv) {
        strWordToComment += objDictYoudaoDiv.innerHTML;
    }
    else if (objDictLocalDiv) {
        for (var j = 2; j < 6; j++) {
            strWordToComment += objDictLocalDiv.childNodes[j].outerHTML;
        }
    }
    try {
        // g_KMRange.pasteHTML(newHtml);
        if (strWordToComment != "") {
            PasteSelectionHTML(newHtml);
            //
            var objInlineComment = document.getElementById(id);
            if (objInlineComment) {
                objInlineComment.title = strWordToComment;
                if (urlAudio != "") {
                    objInlineComment.audioURL = urlAudio;
                }
                KMCommentAttachEvents(objInlineComment);
            }
        }
        
    }
    catch (err) {
    }
    KMCloseSearchWordWindow(null);
    KMSetDocumentModified();
}
function GetSelectionHTML(rgn) {
    if (!rgn)
        return null;
    var html = "";
    var sNode = rgn.startContainer;
    var sP = sNode.parentElement;
    //
    var eNode = rgn.endContainer;
    var eP = eNode.parentElement;
    //
    if (sP == eP) {
        html = sP.outerHTML;
        return html;
    }
    //
    var mP = sP;
    while (mP != eP) {
        html += mP.outerHTML;
        //
        mP = mP.nextElementSibling;
    }
    //
    return html;
}
function PasteSelectionHTML(newHTML) {
    //
    var ret = document.execCommand('insertHTML', false, newHTML);
    //
    if (!newHTML)
        return;
    //
    var rgn = g_KMRange;
    if (!rgn) {
        rgn = KMGetRange();
        if (!rgn)
            return;
    }
    objKMHelperApp.WriteToLog('PasteSelectionHTML 1');
    objKMHelperApp.WriteToLog(rgn);
    //
    var startNode = rgn.startContainer;
    var parent = startNode.parentElement;
    parent.outerHTML = newHTML;
}
function RemoveNode(node, bRemoveChildren) {
    if (!node)
        return;
    if (bRemoveChildren) {
        node.remove();
        return;
    }
    else {
        //
        var count = node.childElementCount;
        for (var i = 0; i < count; i++) {
            var child = node.children[0];
            //
            node.parentElement.insertBefore(child, node);
        }
        node.remove();
    }
}
function KMShowComment(e) {
    //
    if (!e)
        return;
    //
    var elem = e.srcElement;
    if (!elem)
        return;
    //
    var objInlineComment = KMGetParentInlineComment(elem);
    if (!objInlineComment)
        return;
    //
    var comment = objInlineComment.title;
    //
    var objCommentWindow = KMGetCommentWindow(true);
    if (!objCommentWindow)
        return;
    //
    objCommentWindow.setAttribute("KMCommentCurrentID", objInlineComment.id);
    //
    var scrollX = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
    var scrollY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    var x = e.clientX + scrollX;
    var y = e.clientY + scrollY;
    //
    var widthCommentWindow = parseInt(objCommentWindow.style.width);
    //
    if (x + widthCommentWindow > document.body.clientWidth) {
        x = document.body.clientWidth - widthCommentWindow;
    }
    if (x < 0) {
        x = 0;
    }
    //
    y += 20;
    //
    objCommentWindow.style.left = x + "px";
    objCommentWindow.style.top = y + "px";
    objCommentWindow.style.display = "";
    //
    var commentText = document.getElementById("KMCommentText");
    if (commentText) {
        commentText.contentEditable = true;
        commentText.innerHTML = "";
        commentText.innerHTML = comment;
    }
    //
    KMSetCommentWindowCaption(objInlineComment.innerText);
    //
    objKMHelperPluginBrowser.ExecuteFunction1("KMAutoCloseCommentWindow", true, null);
}
function KMOnCommentShow(e) {
    if (objKMContentApp.IsEditing())
        return;
    //
    KMShowComment(e);
}

function KMCommentAttachEvents(obj) {
    // obj.attachEvent("onmouseover", KMOnCommentShow);
    //obj.addEventListener("mouseover", KMOnCommentShow);
}

function KMElemInInlineComment(elem) {
    if (null != KMGetParentInlineComment(elem))
        return true;
    return false;
}
function KMElemInCommentWindow(elem) {
    if (KMIsChildNodeOf(elem, "WizKMCommentWindowDivID"))
        return true;
    return false;
}
function KMIsChildNodeOf(node, id) {
    return KMGetParentNodeByID(node, id) != null;
}
function KMGetParentNodeByID(node, id) {
    while (node) {
        if (node.id == id)
            return node;
        node = node.parentElement;
    }
}
function KMGetCurrentInlineComment(objCommentWindow) {
    if (!objCommentWindow) {
        objCommentWindow = KMGetCommentWindow(false);
    }
    if (!objCommentWindow)
        return null;
    var inlineCommentID = objCommentWindow.getAttribute("KMCommentCurrentID");
    if (inlineCommentID == null || inlineCommentID == "")
        return null;
    //
    var objInlineComment = document.getElementById(inlineCommentID);
    if (!objInlineComment)
        return null;
    return objInlineComment;
}
function KMAutoCloseCommentWindow() {
    var objCommentWindow = KMGetCommentWindow(false);
    if (!objCommentWindow)
        return;
    //
    if (objCommentWindow.style.display != "none") {
        var arr = [document.activeElement, document.elementFromPoint(g_KMMousePos.x, g_KMMousePos.y)];
        for (var i = 0; i < arr.length; i++) {
            var elem = arr[i];
            if (!elem)
                continue;
            if (KMElemInInlineComment(elem))
                return;
            if (KMElemInCommentWindow(elem))
                return;
        }
        //
        //
        var objCommentText = document.getElementById("KMCommentText");
        if (!objCommentText)
            return;
        var commentNew = objCommentText.innerHTML;
        var commentOld = "";
        //
        var objInlineComment = KMGetCurrentInlineComment(objCommentWindow);
        if (objInlineComment) {
            commentOld = objInlineComment.title;
        }
        //
        if (commentNew != commentOld) {
            // alert('before KMSaveComment');
            KMSaveComment();
        } else {
            objCommentWindow.style.display = "none";
        }
    }
    // 
    objKMHelperPluginBrowser.ExecuteFunction1("KMAutoCloseCommentWindow", false, null);
}
// 保存全部取词结果为注释
function KMSaveWordToComment2() {
    if (!g_KMRange) { return; }
    // var html = g_KMRange.htmlText;
    var html = GetSelectionHTML(g_KMRange);
    //
    var id = "WizKMComment_" + KMGetRandomInt();
    //
    var newHtml = "<span id=\"" + id + "\" style=\"border-bottom: 2px #ff0000 dashed\" >" + html + "</span>";
    //
    var objDictLocalDiv = document.getElementById("WizKMDictLocalDivID");
    var objDictOnlineDiv = document.getElementById("WizKMDictOnlineDivID");
    try {
        // g_KMRange.pasteHTML(newHtml);
        PasteSelectionHTML(newHtml);
        var objInlineComment = document.getElementById(id);
        if (objInlineComment) {
            objInlineComment.title = "";
            //
            if (objDictOnlineDiv)
                objInlineComment.title = objDictOnlineDiv.innerHTML;
            if (objDictLocalDiv)
                objInlineComment.title += objDictLocalDiv.innerHTML;
            //
            KMCommentAttachEvents(objInlineComment);
        }
    }
    catch (err) {
    }
    KMCloseSearchWordWindow(null);
    KMSetDocumentModified();
}

//////////////////////////////////////////////////////////////////////////////////

function KMOnMouseUp(e) {
    //
    if (objKMContentApp.IsEditing())
        return;
    //
    if (KMIsMarkdownNote() || KMIsMathJaxNote())
        return;
    //
    if (!objKMHelperApp.WizDocument)
        return;
    //
    var src = e.srcElement;
    //
    // logObject(src);
    //
    if (src.id) {
        if (src.id == "WizKMSmartTagDivID")
            return;
    }
    //
    if (src.parentElement) {
        if (src.parentElement.id == "WizKMSmartTagDivID")
            return;
        if (src.parentElement.id == "KMCommentText")
            return;
    }
    //
    var rgn = KMGetRange();
    var isAltDownNeeded = objKMHelperDatabase.Meta("wizhelp_parm", "ALTKEY_FLAG");

    if (KMIsSelected(rgn) && (e.altKey || isAltDownNeeded != "1")) {
        //
        g_KMRange = rgn;
        //
        var scrollX = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
        var scrollY = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        // if (e.button == 1) {
        var x = e.clientX + scrollX;
        var y = e.clientY + scrollY;
        //
        x += 10;
        y += 10;
        // }
        // else {
        //     var markerTextCharEntity = "&#xfeff;";
        //     var markerId = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);
        //     var range = sel.duplicate();
        //     range.collapse(false);
        //     range.pasteHTML('<span id="' + markerId + '"  style="POSITION:absolute;">' + markerTextCharEntity + '</span>');
        //     var markerEl = document.getElementById(markerId);
        //     var x = markerEl.offsetLeft; 
        //     var y = markerEl.offsetTop;
        //     y += 30;
        //     markerEl.parentNode.removeChild(markerEl);
        // }
        if (x > (scrollX + document.body.clientWidth - 200)) {
            x = scrollX + document.body.clientWidth - 200;
        }
        //
        if ((y - scrollY + 48) > document.defaultView.innerHeight) {
            y = scrollY + document.defaultView.innerHeight - 48;
        }
        if (y < 0)
            y = 0;

        var objSmartTag = KMGetSmartTagWindow(true);
        //
        objSmartTag.style.display = "";
        objSmartTag.style.left = x + "px";
        objSmartTag.style.top = y + "px";
    }
    else {
        var objSmartTag = KMGetSmartTagWindow(false);
        if (objSmartTag != null) {
            objSmartTag.style.display = "none";
        }
    }
    //
    KMCloseFlashMenu(null);
}
function KMOnMouseMove(e) {
    //
    if (objKMContentApp.IsEditing())
        return;
    //
    if (KMIsMarkdownNote() || KMIsMathJaxNote())
        return;
    //
    if (!e)
        return;
    //
    g_KMMousePos.x = e.clientX;
    g_KMMousePos.y = e.clientY;
}
function KMIsSelected(rgn) {
    if (!rgn)
        return false;
    var text = rgn.toString();
    if (text.length == 0)
        return false;
    text = KMStringTrim(text);
    if (text.length == 0)
        return false;
    return true;
}
function KMStringTrim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
function KMKeyMon(e) {
    //
    if (objKMContentApp.IsEditing())
        return;
    //
    if (KMIsMarkdownNote() || KMIsMathJaxNote())
        return;
    //
    var src = e.srcElement;
    //
    if (src.id == "WizKMSmartTagDivID")
        return;
    if (src.parentElement.id == "WizKMSmartTagDivID")
        return;
    if (src.parentElement.id == "KMCommentText")
        return;
    //
    var rgn = KMGetRange();
    if (KMIsSelected(rgn)) {
        g_KMRange = rgn;
    }
    //
    if (e.altKey) {
        switch (e.keyCode) {
            case 18: //alt
                // KMOnMouseUp(e);
                break;
            case 49: //alt+1  pink
                ModifiySelectionColor("#ffaaff");
                break;
            case 50: //alt+2  blue
                ModifiySelectionColor("#99ccff");
                break;
            case 51: //alt+3  yellow
                ModifiySelectionColor("#ffff66");
                break;
            case 52: //alt+4  orange
                ModifiySelectionColor("#ffad5b");
                break;
            case 53: //alt+5  green
                ModifiySelectionColor("#84e384");
                break;
            case 54: //alt+6  purple
                ModifiySelectionColor("#d6acff");
                break;
            case 55: //alt+7  red
                ModifiySelectionColor("#ff8888");
                break;
            case 48: case 192: //alt+0, alt+` clean highligth
                ModifiySelectionColor("");
                break;
            case 82: //alt+r show flash menu
                KMFlashSelectionAsRIL();
                break;
            case 83: //alt+s save current changes
                //KMSaveDocument();
                break;
            case 84: //alt+t add tag for selecttion
                KMFlashSelectionAsTags();
                break;
            default:
                break;
        }
    }
}
function KMSaveDocument(objBrowser, objWizDocument) {
    return;
    //
    if (!objWizDocument)
        return;
    if (!objBrowser) {
        objBrowser = KMGetCurrentBrowserObject();
    }
    //
    if (!KMIsDocumentModified())
        return;
    //
    try {
        var progress = objKMHelperApp.CreateWizObject("WizKMControls.WizProgressWindow");
        progress.Title = "Saving document";
        progress.Text = objWizDocument.Title;
        progress.Show();
        progress.Max = 1;
        //
        KMSaveDocumentCore(objBrowser, objWizDocument);
        //
        progress.Hide();
        progress.Destroy();
    }
    catch (err) {
        WizAlert(err.message);
        //
    }
}
function KMGetDocumentFileName(objBrowser) {
    if (!objBrowser) {
        objBrowser = KMGetCurrentBrowserObject();
        if (!objBrowser)
            return;
    }
    //
    var path = objKMHelperApp.GetHtmlDocumentPath(objBrowser);
    var url = document.URL;
    //
    var indexBookmark = url.indexOf("#");
    if (-1 != indexBookmark) {
        url = url.substr(0, indexBookmark);
    }
    //
    //
    url = url.replace(/\\/g, "/");
    var index = url.lastIndexOf("/");
    if (index == -1)
        return "";
    return path + url.substr(index + 1, url.length - index - 1);
}
function KMGetHtmlHeaderFromText(text) {
    var index = text.search(/\<head/i);
    if (-1 == index)
        return "";
    return text.substr(0, index);
}
function KMGetHtmlFooterFromText(text) {
    return "</html>";
}
function KMSaveDocumentCore(objBrowser, objWizDocument) {
    if (!objWizDocument)
        return;
    //
    KMCancelDocumentModified();
    var srcfilename = KMGetDocumentFileName(objBrowser);
    var oldtext = objKMHelperCommon.LoadTextFromFile(srcfilename);
    //
    var header = KMGetHtmlHeaderFromText(oldtext);
    var footer = KMGetHtmlFooterFromText(oldtext);
    //
    var docElem = document.documentElement.cloneNode(true);
    //
    KMRemoveChildNodeByID(docElem, "wizKMHighlighterSpan_t_t");
    KMRemoveChildNodeByID(docElem, "wizkm_highlight");
    KMRemoveChildNode(docElem, "WizKMSmartTagDivID");
    KMRemoveChildNode(docElem, "WizKMCommentWindowDivID");
    KMRemoveChildNode(docElem, "WizKMFlashMenuDivID");
    KMRemoveChildNode(docElem, "WizKMSearchWordDivID");
    KMRemoveChildNode(docElem, "WizKMEditLinkToDivID");
    KMRemoveChildNode(docElem, "WizKMLinkToFolderDivID");
    KMRemoveChildNode(docElem, "WizKMContentDivID");
    //
    var html = header + docElem.outerHTML + footer;
    var template = html.indexOf("<!--WizHtmlContentBegin-->") != -1 && html.indexOf("<!--WizHtmlContentEnd-->") != -1;
    //
    try {
        objKMHelperDatabase.BeginUpdate();  //不要发送更改消息，避免刷新网页
        var flags = 0x20; //不要下载网络文件，加快保存速度
        if (template) {
            flags |= 0x08;
        }
        objWizDocument.UpdateDocument4(html, srcfilename, flags);
    }
    catch (err) {
        WizAlert(err.message);
    }
    objKMHelperDatabase.EndUpdate();
}

function IsPlugin()
{
    try{
        var ret = true;
        var url = document.URL;
        if (url == null) {
            ret = false;
            return ret;
        }
        url = url.toLowerCase();
        if (url.indexOf("plugins") != -1) {
            ret = false;
        }
        return ret;
    } catch (e) {
        console.log(e.toString());
    }
    
}
/////////////////////////////////////////////////////////////////////
function KMAutoCloseSearchWordWindow() {
    var objSearchWordWindow = KMGetSearchWordWindow(false);
    if (!objSearchWordWindow)
        return;
    //
    if (objSearchWordWindow.style.display != "none") {
        var arr = [document.activeElement, document.elementFromPoint(g_KMMousePos.x, g_KMMousePos.y)];
        for (var i = 0; i < arr.length; i++) {
            var elem = arr[i];
            if (!elem)
                continue;
            if (null != KMGetParentSearchWord(elem))
                return;
            if (KMIsChildNodeOf(elem, "WizKMSearchWordDivID"))
                return;
        }

        objSearchWordWindow.style.display = "none";
    }
    //
    objKMHelperPluginBrowser.ExecuteFunction1("KMAutoCloseSearchWordWindow", false, null);
}
function KMIsSearchWord(elem) {
    if (!elem.id)
        return false;
    if (elem.id.indexOf("WizKMComment_") != 0)
        return false;
    return true;
}
function KMGetParentSearchWord(elem) {
    while (elem != null) {
        if (KMIsSearchWord(elem))
            return elem;
        elem = elem.parentElement;
    }
    return null;
}
function KMAutoCloseEditLinkWindow() {
    var objEditLinkWindow = KMGetEditLinkWindow(false);
    if (!objEditLinkWindow)
        return;
    //
    if (objEditLinkWindow.style.display != "none") {
        var arr = [document.activeElement, document.elementFromPoint(g_KMMousePos.x, g_KMMousePos.y)];
        for (var i = 0; i < arr.length; i++) {
            var elem = arr[i];
            if (!elem)
                continue;
            if (null != KMGetParentInlineLink(elem))
                return;
            if (KMIsChildNodeOf(elem, "WizKMEditLinkToDivID"))
                return;
        }
        objEditLinkWindow.style.display = "none";
    }
    //
    objKMHelperPluginBrowser.ExecuteFunction1("KMAutoCloseEditLinkWindow", false, null);
}
function KMAutoCloseContentWindow() {
    var objContentWindow = KMGetContentWindow(false);
    if (!objContentWindow)
        return;
    //
    if (objContentWindow.style.display != "none") {
        var arr = [document.activeElement, document.elementFromPoint(g_KMMousePos.x, g_KMMousePos.y)];
        for (var i = 0; i < arr.length; i++) {
            var elem = arr[i];
            if (!elem)
                continue;
            if (null != KMGetParentContent(elem))
                return;
            if (KMIsChildNodeOf(elem, "WizKMContentDivID"))
                return;
        }
        objContentWindow.style.display = "none";
    }
    //
    objKMHelperPluginBrowser.ExecuteFunction1("KMAutoCloseContentWindow", false, null);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////


function KMGetCurrentBrowserObject() {
    //return objKMHelperApp.Window.CurrentDocumentBrowserObject;
    return objKMContentApp.EditorBrowserObject;
}

/*
获得所有的标签名称数组
*/
function KMGetAllTagsNameArray() {
    var objKMTags = objKMHelperDatabase.Tags;

    var ret = [];
    for (var i = 0; i < objKMTags.Count; i++) {
        ret.push(objKMTags.Item(i).Name);
    }
    //
    var retString = ret.toString();
    return retString;
}
//
/*
获得所有的关键字数组。
首先从数据库查询所有的关键字，然后分割成关键字数组，分隔符为,;，；
*/
function KMGetAllKeywordsArray() {
    var objRowset = objKMHelperDatabase.SQLQuery("select distinct document_keywords from wiz_document where document_keywords <> ''", "");

    //objKMTags
    var objMap = {};
    while (!objRowset.EOF) {
        var text = objRowset.GetFieldValue(0);
        text = text.replace(/;/g, ",");
        text = text.replace(/，/g, ",");
        text = text.replace(/；/g, ",");
        var arr = text.split(',');
        //
        for (var i = 0; i < arr.length; i++) {
            var keyword = arr[i];
            if (keyword == "" || keyword == null)
                continue;
            //
            objMap[keyword] = keyword;
        }
        objRowset.MoveNext();
    }

    var ret = [];
    for (var keyword in objMap) {
        ret.push(keyword);
    }
    //
    var retString = ret.toString();
    return retString;
}
//
/*
获得所有的作者
*/
function KMGetAllAuthorArray() {
    var objRowset = objKMHelperDatabase.SQLQuery("select distinct document_author from wiz_document where document_author <> ''", "");

    //objKMTags
    var objMap = {};
    while (!objRowset.EOF) {
        var text = objRowset.GetFieldValue(0);
        text = text.replace(/;/g, ",");
        text = text.replace(/，/g, ",");
        text = text.replace(/；/g, ",");
        var arr = text.split(',');
        //
        for (var i = 0; i < arr.length; i++) {
            var author = arr[i];
            if (author == "" || author == null)
                continue;
            objMap[author] = author;
        }
        objRowset.MoveNext();
    }

    var ret = [];
    for (var author in objMap) {
        ret.push(author);
    }
    //
    var retString = ret.toString();
    return retString;
}

function KMHightlight()
{
    var highlighter = new KMHighlighter();
    highlighter.highlight(document.body, KMGetAllKeywordsArray(), KMKeywordSpanOnClick);
    highlighter.highlight(document.body, KMGetAllTagsNameArray(), KMTagWordSpanOnClick);
    highlighter.highlight(document.body, KMGetAllAuthorArray(), KMAuthorSpanOnClick);
}
function KMRemoveHighlight()
{
    KMRemoveChildNodeByID(document.documentElement, "wizKMHighlighterSpan_t_t");
    KMRemoveChildNodeByID(document.documentElement, "wizkm_highlight_tmp_span");
    KMRemoveChildNodeByID(document.documentElement, "wizkm_highlight");
}
function KMIsMathJaxNote() {
    try {
        var title = document.title;
        if (!title)
            return false;
        if (-1 != title.indexOf(".mj "))
            return true;
        if (-1 != title.indexOf(".mj@"))
            return true;
        if (title.match(/\.mj$/i))
            return true;
        return false;
    }
    catch (err) {
        return false;
    }
}
function KMIsMarkdownNote() {
    var title = document.title;
    if (!title)
        return false;
    if (-1 != title.indexOf(".md "))
        return true;
    if (-1 != title.indexOf(".md@"))
        return true;
    if (title.match(/\.md$/i))
        return true;
    return false;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

var objKMContentApp = external;

var objKMHelperApp;
var objKMHelperDatabase;
var objKMHelperCommon;
var objKMHelperPluginBrowser;


function KMInit(app, pluginBrowser) {
    if (!app || !pluginBrowser)
        return;
    //
    objKMHelperApp = app;
    objKMHelperDatabase = app.Database;
    objKMHelperCommon = app.CreateWizObject("WizKMControls.WizCommonUI");
    objKMHelperPluginBrowser = pluginBrowser;
    //
    var pluginPath = objKMHelperApp.GetPluginPathByScriptFileName("KMHelper.js");
    var editorScriptPath = pluginPath + "editor.js";
    var annotatorScriptPath = pluginPath + "annotator.js";
    //
    var objBrowser = KMGetCurrentBrowserObject();
    if (!objBrowser)
        return;
    //
    objBrowser.ExecuteScriptFile(editorScriptPath, null);
    objBrowser.ExecuteScriptFile(annotatorScriptPath, null);
    //
    if (!IsPlugin())
        return;
    //
    if (objKMHelperDatabase.Meta("wizhelp_parm", "keyword_flag") == "1") {
        KMHightlight();
    }
    //
    if (objKMHelperDatabase.Meta("wizhelp_parm", "smarttag_flag") == "1") {
        document.addEventListener("mouseup", KMOnMouseUp);
        document.addEventListener("mousemove", KMOnMouseMove);
    }
    document.addEventListener("keydown", KMKeyMon, false);
    //
    KMAttachCommentEvents();
    KMAttachLinkToEvents();
}
