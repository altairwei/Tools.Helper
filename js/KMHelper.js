
var objApp = WizExplorerApp;
var objWindow = objApp.Window;
var objDB = objApp.Database;
var objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");
////////////////////////////////////////////////////////////////////////////////////////////
// 读取为知助手全局设置
function KMSettings(strKey) {
    var objDatabase = objApp.Database;
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    // 通过ActiveXObject方式读取
    /* 读出文件是乱码，弃用
    var fso, filehandle, strValue;
    fso = objApp.CreateActiveXObject("Scripting.FileSystemObject");
    filehandle = fso.OpenTextFile(languageFileName, 1, false, 0);
    regErr = /^([^\s]+)\s*[=]\s*(.*)/;
    while (!filehandle.AtEndOfStream) {
        var ss = filehandle.ReadLine();
        if (regErr.test(ss) && strKey == RegExp.$1) {
            strValue = RegExp.$2;
            break;
        }
    }
    filehandle.Close();
    fso = null;
    */
    // 通过objCommon接口读取
    strValue = objCommon.GetValueFromIni(languageFileName, "Common", strKey);
    //
    return strValue;
}

////=================================================================================
////添加知识管理按钮并且相应该按钮消息，显示一个下拉框，该下拉框内容是一个html文件
//
function RegKMButton() {
    var objDatabase = objApp.Database;
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    var buttonWizhelper = objApp.LoadStringFromFile(languageFileName, "buttonWizhelper"); //WIZ_HELPER
    var buttonNoteplus = objApp.LoadStringFromFile(languageFileName, "buttonNoteplus");
    var buttonRecentDocs = objApp.LoadStringFromFile(languageFileName, "buttonRecentDocs");
    var buttonTagsCloud = objApp.LoadStringFromFile(languageFileName, "buttonTagsCloud");

    //
    if (objDatabase.GetMeta("wizhelp_parm","KEYWORD_FLAG") != "1") {objDatabase.SetMeta("wizhelp_parm","KEYWORD_FLAG", "0");}
    if (objDatabase.GetMeta("wizhelp_parm","SMARTTAG_FLAG") != "1") {objDatabase.SetMeta("wizhelp_parm","SMARTTAG_FLAG", "0");}
    if (objDatabase.GetMeta("wizhelp_parm","ALTKEY_FLAG") != "1") {objDatabase.SetMeta("wizhelp_parm","ALTKEY_FLAG", "0");}
    if (objDatabase.GetMeta("wizhelp_parm","DICTCN_FLAG") != "1") {objDatabase.SetMeta("wizhelp_parm","DICTCN_FLAG", "0");}

    var buttonSyntax = objApp.LoadStringFromFile(languageFileName, "buttonSyntax")+":"+objDatabase.Meta("wizhelp_parm","KEYWORD_FLAG");
    var buttonHelper = objApp.LoadStringFromFile(languageFileName, "buttonHelper")+":"+objDatabase.Meta("wizhelp_parm","SMARTTAG_FLAG");
    var buttonAltkey = objApp.LoadStringFromFile(languageFileName, "buttonAltkey")+":"+objDatabase.Meta("wizhelp_parm","ALTKEY_FLAG");
    var buttonDictcn = objApp.LoadStringFromFile(languageFileName, "buttonDictcn")+":"+objDatabase.Meta("wizhelp_parm","DICTCN_FLAG");
    //
    // 判断用户自定义设置
    if (KMSettings("KMButtonsInMainMenu") == "1") {
        // 标签云按钮
        objWindow.AddToolButton("main", "KMTagsCloudButton", buttonTagsCloud, "", "OnKMTagsCloudButtonClicked");
        // 最近文档按钮
        objWindow.AddToolButton("main", "KMRecentDocsButton", buttonRecentDocs, "", "OnKMRecentDocsButtonClicked");
        // 为知助手按钮
        objWindow.AddToolButton("main", "KMHelperExButton", "【Status】", "", "OnKMHelperExButtonClicked");
        /* 这个功能太鸡肋，弃用
        objWindow.AddToolButton("main", "KMSyntaxButton", buttonSyntax, "", "OnKMSyntaxStatusButtonClicked");
        objWindow.AddToolButton("main", "KMHelperButton", buttonHelper, "", "OnKMHelperStatusButtonClicked");
        objWindow.AddToolButton("main", "KMAltkeyButton", buttonAltkey, "", "OnKMAltkeyStatusButtonClicked");
        objWindow.AddToolButton("main", "KMDictcnButton", buttonDictcn, "", "OnKMDictcnStatusButtonClicked");
        */
    }
    else {
        // 为知助手按钮
        objWindow.AddToolButton("document", "KMHelperButton", buttonWizhelper, "", "OnKMHelperButtonClicked");
        // 笔记+按钮
        objWindow.AddToolButton("document", "KMNoteplusButton", buttonNoteplus, "", "OnNotetakingButtonClicked");
    }
    
}
// 为知助手按钮响应
function OnKMHelperButtonClicked() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var helperFileName = pluginPath + "KMHelperEx.htm";
    var rect = objWindow.GetToolButtonRect("document", "KMHelperButton");
    var arr = rect.split(',');
    // left,top,right,bottom
    objWindow.ShowSelectorWindow(helperFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 400, 500, "");
}
// 笔记+响应
function OnNotetakingButtonClicked() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var noteFileName = pluginPath + "KMNoteplus.htm";
    //
    var rect = objWindow.GetToolButtonRect("document", "KMNoteplusButton");
    var arr = rect.split(',');
    objWindow.ShowSelectorWindow(noteFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 300, 500, "");
}
// 主工具栏上的为知助手按钮响应
function OnKMHelperExButtonClicked() {
    // 增加文档打开状态判断
    if (objWindow.CurrentDocument != null) {
        var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
        var helperFileName = pluginPath + "KMHelperEx.htm";
        var rect = objWindow.GetToolButtonRect("main", "KMHelperExButton");
        var arr = rect.split(',');
        // left,top,right,bottom
        objWindow.ShowSelectorWindow(helperFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 400, 500, "");
    }
}
// 最近文档按钮响应
function OnKMRecentDocsButtonClicked() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var recentFileName = pluginPath + "KMRecentDocs.htm";
    //
    var rect = objWindow.GetToolButtonRect("main", "KMRecentDocsButton");
    var arr = rect.split(',');
    objWindow.ShowSelectorWindow(recentFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 350, 510, "");
}
// 标签云按钮响应
function OnKMTagsCloudButtonClicked() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var cloudFileName = pluginPath + "KMTagsCloud.htm";
    //
    var rect = objWindow.GetToolButtonRect("main", "KMTagsCloudButton");
    var arr = rect.split(',');
    objWindow.ShowSelectorWindow(cloudFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 620, 650, "");
}
// 更改数据库Meta设置
function OnKMSyntaxStatusButtonClicked() { OnKMStatusButtonClicked("KEYWORD_FLAG"); }
function OnKMHelperStatusButtonClicked() { OnKMStatusButtonClicked("SMARTTAG_FLAG"); }
function OnKMAltkeyStatusButtonClicked() { OnKMStatusButtonClicked("ALTKEY_FLAG"); }
function OnKMDictcnStatusButtonClicked() { OnKMStatusButtonClicked("DICTCN_FLAG"); KMCheckDictcn(); }
function OnKMStatusButtonClicked(strFLAG) {
    var objDatabase = objApp.Database;
    if (objDatabase.Meta("wizhelp_parm",strFLAG) == "1") {
        objDatabase.SetMeta("wizhelp_parm",strFLAG, "0");
    }
    else {
        objDatabase.SetMeta("wizhelp_parm",strFLAG, "1");
    }
    UpdateButtonStatus();
}
// 更新主工具栏按钮状态
function UpdateButtonStatus() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    //
    if (KMSettings("KMButtonsInMainMenu") == "1") {
        var strRead = objApp.LoadStringFromFile(languageFileName, "strRead");
        var objDoc = objApp.Window.CurrentDocument;
        var readCount = objDoc.ReadCount - 1;
        if (0 > readCount) {
            readCount = 0;
        }
        var pNote_title = strRead + "(" + (readCount) + ")";
        //
        switch (objDoc.ParamValue("Rate")) {
        case "1":
            pNote_title = pNote_title + "|★☆☆☆☆";
            break;
        case "2":
            pNote_title = pNote_title + "|★★☆☆☆";
            break;
        case "3":
            pNote_title = pNote_title + "|★★★☆☆";
            break;
        case "4":
            pNote_title = pNote_title + "|★★★★☆";
            break;
        case "5":
            pNote_title = pNote_title + "|★★★★★";
            break;
        default:
            break;
        }
        objDB.SetMeta("TEST","MSG_500", pNote_title);
        objWindow.RemoveToolButton("main", "KMHelperExButton");
        objWindow.AddToolButton("main", "KMHelperExButton", "【" + pNote_title + "】", "", "OnKMHelperExButtonClicked");

        /* 鸡肋，弃用
        var buttonSyntax = objApp.LoadStringFromFile(languageFileName, "buttonSyntax") + ":" + objDB.Meta("wizhelp_parm","KEYWORD_FLAG");
        objWindow.RemoveToolButton("main", "KMSyntaxButton");
        objWindow.AddToolButton("main", "KMSyntaxButton", buttonSyntax, "", "OnKMSyntaxStatusButtonClicked");
        //
        var buttonHelper = objApp.LoadStringFromFile(languageFileName, "buttonHelper") + ":" + objDB.Meta("wizhelp_parm","SMARTTAG_FLAG");
        objWindow.RemoveToolButton("main", "KMHelperButton");
        objWindow.AddToolButton("main", "KMHelperButton", buttonHelper, "", "OnKMHelperStatusButtonClicked");
        //
        var buttonAltkey = objApp.LoadStringFromFile(languageFileName, "buttonAltkey") + ":" + objDB.Meta("wizhelp_parm","ALTKEY_FLAG");
        objWindow.RemoveToolButton("main", "KMAltkeyButton");
        objWindow.AddToolButton("main", "KMAltkeyButton", buttonAltkey, "", "OnKMAltkeyStatusButtonClicked");
        //
        var buttonDictcn = objApp.LoadStringFromFile(languageFileName, "buttonDictcn") + ":" + objDB.Meta("wizhelp_parm","DICTCN_FLAG");
        objWindow.RemoveToolButton("main", "KMDictcnButton");
        objWindow.AddToolButton("main", "KMDictcnButton", buttonDictcn, "", "OnKMDictcnStatusButtonClicked");
        */
    }
    else {
        return false;
    }
}


//
/*
获取当前浏览器对象
*/
function KMGetCurrentBrowserObject() {
    return objWindow.CurrentDocumentBrowserObject;
}

//////////////////////////////////////////////////////////////////////////////////////

function KMSleep(milliseconds) {
    for (var t = Date.now() ; Date.now() - t <= milliseconds;);
}

// 当文档加载完成事件触发时执行
function KMOnHtmlDocumentComplete(objBrowser) {
    if (!objBrowser) return false;
    //
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var contentScriptPath = pluginPath + "js/KMContent.js";
    //
    objBrowser.ExecuteScriptFile(contentScriptPath, function (ret) {
        //
        objBrowser.ExecuteFunction2("KMInit", objApp, WizChromeBrowser, function (ret) {
            if (objWindow.CurrentDocument != null) {
                UpdateButtonStatus();
            }
            KMCheckDictcn();
        });
    });
}
//
function KMOnDocumentBeforeEdit(objBrowser, objWizDocument) {
    if (!objBrowser)
        return;
    //
    objBrowser.ExecuteFunction0("KMRemoveHighlight", null);
}
//
function KMOnDocumentAfterEdit(objBrowser, objWizDocument) {
    if (!objBrowser)
        return;
    //
    objBrowser.ExecuteFunction0("KMHightlight", null);
}
//
function KMOnDocumentBeforeClose(objBrowser, objWizDocument) {
    //if (!objBrowser)
    //    return;
    ////
    //objBrowser.ExecuteFunction2("KMSaveDocument", objBrowser, objWizDocument, null);
}
//
function KMOnDocumentBeforeChange(objBrowser, objWizDocumentOld, objWizDocumentNew) {
    //if (!objBrowser)
    //    return;
    ////
    //objBrowser.ExecuteFunction2("KMSaveDocument", objBrowser, objWizDocument, null);
}
//
//当鼠标移开时自动隐藏标题窗口
function KMAutoCloseSearchWordWindowTimer() {
    var objBrowser = KMGetCurrentBrowserObject();
    if (!objBrowser)
        return;
    //
    objBrowser.ExecuteFunction0("KMAutoCloseSearchWordWindow", null);
}
//
//当鼠标移开时自动隐藏取消链接窗口
function KMAutoCloseEditLinkWindowTimer() {
    var objBrowser = KMGetCurrentBrowserObject();
    if (!objBrowser)
        return;
    //
    objBrowser.ExecuteFunction0("KMAutoCloseEditLinkWindow", null);
}
//
//当鼠标移开时自动隐藏标题窗口
function KMAutoCloseContentWindowTimer() {
    var objBrowser = KMGetCurrentBrowserObject();
    if (!objBrowser)
        return;
    //
    objBrowser.ExecuteFunction0("KMAutoCloseContentWindow", null);
}
//
//当鼠标移开时自动隐藏评论窗口
function KMAutoCloseCommentWindowTimer() {
    var objBrowser = KMGetCurrentBrowserObject();
    if (!objBrowser)
        return;
    //
    objBrowser.ExecuteFunction0("KMAutoCloseCommentWindow", null);
}

////////////////////////////////////////////////////////////////////////////////

function update_version() {
    if (objDB.Meta("keyword_HL","keyword_flag").value != null || 
        objDB.Meta("keyword_HL","keyword_flag").value != "" ) {
        objDB.SetMeta("wizhelp_parm","keyword_flag", objDB.Meta("keyword_HL","keyword_flag"));
        //objDB.Meta("keyword_HL","keyword_flag").delete;
    }
}
//
function initParam() {
    if (objDB.Meta("wizhelp_parm","keyword_flag")=="" || objDB.Meta("wizhelp_parm","keyword_flag") == null ) {
        objDB.SetMeta("wizhelp_parm","keyword_flag", "1");
    }
    if (objDB.Meta("wizhelp_parm","smarttag_flag")=="" || objDB.Meta("wizhelp_parm","smarttag_flag") == null ) {
        objDB.SetMeta("wizhelp_parm","smarttag_flag", "1");
    }
}
//
function initEvents() {
/*
向Wiz注册一个事件，响应文档完成的消息。在Wiz内打开一个html文件的时候（例如阅读文档），如果Html文件打开完成，则调用这个方法。
*/
    eventsHtmlDocumentComplete.add(KMOnHtmlDocumentComplete);
    eventsDocumentBeforeEdit.add(KMOnDocumentBeforeEdit);
    eventsDocumentAfterEdit.add(KMOnDocumentAfterEdit);
    //eventsTabClose.add(KMOnDocumentBeforeClose);
   // eventsClose.add(KMOnDocumentBeforeClose);
    //eventsDocumentBeforeChange.add(KMOnDocumentBeforeChange);
}
//
function initPage() {
    initEvents();
}
//
function Main() {
    // update_version();
    initParam();
    initPage();
    //
    RegKMButton();
}
Main();

// 添加海词词典脚本
function AddDictcn(objApp) {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var objScript1 = document.createElement('script');
    objScript1.setAttribute('src', pluginPath + 'KMDictcn.js');
    document.body.appendChild(objScript1);
}

function DictcnAdd2Doc() {
    var objBrowser = KMGetCurrentBrowserObject();
    if (!objBrowser) return false;
    //
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var scriptName = pluginPath + 'KMDictcn.js';
    //
    //objBrowser.ExecuteScript(AddDictcn.toString(), function(ret){
    //    objBrowser.ExecuteFunction1("AddDictcn", objApp, null);
    //})
    //
    objBrowser.ExecuteScriptFile(scriptName, null);
    // 兼容模式??
    // WizAlert(objHtmlDocument.compatMode);
    // if (objHtmlDocument.compatMode == 'BackCompat') {
    //     WizAlert('yes');
    //     var htmlAll = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3c.org/TR/1999/REC-html401-19991224/loose.dtd">\n';
    //     if (objHtmlDocument.head) { htmlAll += objHtmlDocument.head.outerHTML; }
    //     htmlAll += objHtmlDocument.body.outerHTML;
    //     objHtmlDocument.write(htmlAll);
    // }
    // WizAlert(objHtmlDocument.compatMode);
    //
    //
    // var objScript2 = objHtmlDocument.createElement('script');
    // objScript2.text = "dictInit();";
    // objHtmlDocument.body.appendChild(objScript2);
}

// 检查是否开启文档查词功能
function KMCheckDictcn() {
    var objDatabase = objApp.Database;
    if (objDatabase.Meta("wizhelp_parm", "Dictcn_FLAG") == "1") {
        DictcnAdd2Doc();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////
function KMShowListWindow(retJson) {
    var json = JSON.parse(retJson);
    var url = json.url;
    var left = json.left;
    var top = json.top;
    var width = json.width;
    var height = json.height;
    //
    if (url) {
        objWindow.ShowSelectorWindow(url, left, top, width, height, "");
    }  
}

function KMAutoCloseContentWindow(isAddAfterRemove) {
    objWindow.RemoveTimer("KMAutoCloseContentWindowTimer");
    if (isAddAfterRemove) {
        objWindow.AddTimer("KMAutoCloseContentWindowTimer", 1000);
    }
}

function KMAutoCloseEditLinkWindow(isAddAfterRemove) {
    objWindow.RemoveTimer("KMAutoCloseEditLinkWindowTimer");
    if (isAddAfterRemove) {
        objWindow.AddTimer("KMAutoCloseEditLinkWindowTimer", 1000);
    }
}

function KMAutoCloseCommentWindow(isAddAfterRemove) {
    objWindow.RemoveTimer("KMAutoCloseCommentWindowTimer");
    if (isAddAfterRemove) {
        objWindow.AddTimer("KMAutoCloseCommentWindowTimer", 1000);
    } 
}

function KMAutoCloseSearchWordWindow(isAddAfterRemove) {
    objWindow.RemoveTimer("KMAutoCloseSearchWordWindowTimer");
    if (isAddAfterRemove) {
        objWindow.AddTimer("KMAutoCloseSearchWordWindowTimer", 2000);
    }   
}

function KMSearchEngine(url, openInNewTab) {
    objWindow.ViewHtml(url, openInNewTab);
}


///////////////////////////////////////////////////////////////////////////////////////
/* unused functions
*/
//////////////////////////////////////////////////////////////////////////////////////

//// Dict.cn 在线取词开始
/*function KMGetOnlineDictCn(strWord) {
    var strHTML = "";
    var strSearchWordURL = "http://dict.cn/ws.php?utf8=true&q=" + encodeURIComponent(strWord);
    // var xmlhttp_request = false;
    // try { xmlhttp_request = objApp.CreateActiveXObject("Msxml2.XMLHTTP"); }
    // catch(e) {
    // 	try { xmlhttp_request = objApp.CreateActiveXObject("Microsoft.XMLHTTP"); }
    // 	catch(e) { xmlhttp_request = false; }
    // }
    var xmlhttp_request = new XMLHttpRequest();
    //
    if (xmlhttp_request) {
        xmlhttp_request.onload = function () {
            //
            if (xmlhttp_request.readyState == 4) {
                if (xmlhttp_request.status == 200) {
                    var xmlText = xmlhttp_request.responseText;


                    // alert(xmlText);
                    var iStart = xmlText.indexOf("<audio>") + 7;
                    var iStop = xmlText.indexOf("</audio>");
                    var strURL = xmlText.substring(iStart, iStop);
                    strHTML += strURL;
                    //var objDocXML = CreateXMLDocument(xmlhttp_request.responseText);
                    //var objDict = objDocXML.getElementsByTagName("dict")[0];
                    //var strKey = objDict.getElementsByTagName("key")[0].firstChild.data;
                    ////WizAlert(strKey);
                    //var strPhonetic = objDict.getElementsByTagName("pron")[0].firstChild.data;
                    //var urlAudio = objDict.getElementsByTagName("audio")[0].firstChild.data;
                    //var strExplain = objDict.getElementsByTagName("def")[0].firstChild.data;
                    //strHTML += " <h5>  --- Dict.cn 海词  --- </h5>";
                    //strHTML += " <b>" + strKey + "</b> ";
                    //strHTML += " <br><b>[ " + strPhonetic + " ]</b> ";
                    //strHTML += " <a href='" + urlAudio + "'><img src='"+pluginPath+"km_audio.png' alt=朗读单词 border='0' /></a> ";;
                    //strHTML += " <br> " + strExplain;
                    ////WizAlert(strKey);
                    //var objSentences = objDict.getElementsByTagName("sent");
                    //if (objSentences){
                    //strHTML += " <br><br> --- 例句 ---";
                    //}
                    //for (var j=0; j<objSentences.length;j++) {
                    //var strSentenceEnj = objSentences[j].getElementsByTagName("orig")[0].firstChild.data;
                    //var strSentenceCnj = objSentences[j].getElementsByTagName("trans")[0].firstChild.data;
                    //strHTML += " <br> " + strSentenceEnj;
                    //strHTML += " <br> " + strSentenceCnj + " <br> ";
                    //}
                    //WizAlert(strHTML);
                }
            }
        };
        xmlhttp_request.open("GET", strSearchWordURL, false);
        xmlhttp_request.setRequestHeader("Charset", "GB2312");
        xmlhttp_request.setRequestHeader("Content-Type", "text/xml");
        xmlhttp_request.send(null);
    }
    // alert(strHTML);
    return strHTML;
}*/

////// 本地取词
/*function KMGetLocalDict(strWord) {
    var divHTML = "";
    var ConnDB = objApp.CreateActiveXObject("ADODB.Connection"); // 使用ADO的Connection对象打开数据库接口
    if (ConnDB) {
        var NameDB = "KMdictionary.mdb "; // Access数据库名
        var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
        var noteFileName = pluginPath + NameDB;
        var dbcon = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source= " + noteFileName; // 操作指定数据库,Js使用相对地址
        ConnDB.Open(dbcon);
        var Rs = objApp.CreateActiveXObject("ADODB.Recordset");
        var strSQL = "select * from dictionary where word=\"" + strWord + "\"";
        //
        Rs.Open(strSQL, ConnDB, 1, 3);
        //
        while (!Rs.EOF) {
            divHTML += "<div style = 'font-size:9pt; font-style:italic; margin-top:15px;'> ========== <创世纪英语 本地词典> ========== </div>";
            divHTML += "<span id='DictLocal_pron' style='font-size:1em; font-weight:bold;'> [<label  style=\"font-family: 'Kingsoft Phonetic Plain'\">" + Rs("pron") + "</label>] </span>";
            divHTML += "<span style='font-size:1em; font-style:italic;'> syl: </span> ";
            divHTML += "<span id='DictLocal_ping' style='font-size:1em; font-weight:bold;'>" + Rs("ping") + "</span><br>";
            divHTML += "<span id='DictLocal_explain' style='font-size:1em;'>" + Rs("explain") + "</span><br>";
            divHTML += "<span id='DictLocal_difficult' style='font-size:0.8em;'>难度：【" + parseFloat(Rs("difficult")).toPrecision(2) + "】</span><br>";
            divHTML += "<span id='DictLocal_class' style='font-size:0.8em;'>类别：" + Rs("class") + "</span>";
            Rs.MoveNext;
        }
        ConnDB.Close(); //关闭数据库连接
    }

    return divHTML;
}*/
/*function KMGetFileSize(filename) {
    var objFSO = KMGetFSOObject();
    //
    try {
        if (!objFSO.FileExists(filename))
            return 0;
        var objFile = objFSO.GetFile(filename);
        return objFile.Size;
    }
    catch (err) {
    }
    return 0;
}*/
/*function KMGetFSOObject() {
    if (!g_KMHelperFSO) {
        g_KMHelperFSO = objApp.CreateActiveXObject("Scripting.FileSystemObject");
    }
    return g_KMHelperFSO;
}*/

/*function KMOnWindowUnload() {
    var arr = [];
    for (var g in g_KMDocumentGUIDFileNameMap) {
        var filename = g_KMDocumentGUIDFileNameMap[g];
        if (!filename)
            continue;
        var guid = g.substr(1);
        guid = guid.replace(/\_/g, "-");
        try {
            var objDocument = objDatabase.DocumentFromGUID(guid);
            arr.push(objDocument);
        }
        catch (err) {
        }
    }
    
    if (arr.length == 0)
        return;
    
    try {
        var progress = objApp.CreateWizObject("WizKMControls.WizProgressWindow");
        progress.Title = "Saving document";
        progress.Text = objDocument.Title;
        progress.Show();
        progress.Max = arr.length;
        
        for (var i = 0; i < arr.length; i++) {
            var objDocument = arr[i];
            var filename = KMGetDocumentModifiedFileName(objDocument);
            if (!filename)
                continue;
            
            KMSaveToDocument(objDocument, filename);
            KMCancelDocumentModified(objDocument);
            
            progress.Pos = i + 1;
        }
        progress.Hide();
        progress.Destroy();
    }
    catch (err) {
        WizAlert(err.message);
        
    }
}*/

/*function KMGetSelection(doc) {
    var doc = KMGetCurrentHTMLDoc();
    //
    try {
        var rgn = doc.getSelection();
        return rgn;
    }
    catch(err) {
        return null;
    }
}*/

/*function KMCloneSelection(doc) {
    var rgn = KMGetRange(doc);
    if (!rgn)
        return null;
    //
    return rgn;
    //return sel.duplicate();
}*/


/*function KMRemoveChildNodeByName(node, nodename) {
    if (node.hasChildNodes()) {
        for (var i = node.childNodes.length - 1; i >= 0; i--) {
            var child = node.childNodes[i];
            if (child.hasChildNodes()) {
                KMRemoveChildNodeByName(child, nodename);
            }
            if (child.name == nodename) {
                child.removeNode(false);
            }
        }
    }
    if (node.name == nodename) {
        node.removeNode(false);
    }
}*/

/*function KMRemoveChildNodeByName(node, tagname, nodename) {
    var coll = node.getElementsByTagName(tagname);
    for (var i = 0; i < coll.length; i++) {
        var child = coll[i];
        if (child.name == nodename) {
            // child.removeNode(false);
            RemoveNode(child, false);
        }
    }
}*/


/*function KMGetDocumentFilePath(doc) {
    if (!doc)
        return "";

    var path = objApp.GetHtmlDocumentPath(doc);
    return path;
}*/


// save document
/*function KMSaveToDocument() {
    var doc = objWindow.CurrentDocumentHtmlDocument;
    if (!doc)
        return;
    //
    var objDocument = objWindow.CurrentDocument;
    if (!objDocument)
        return;
    //
    var filename = KMGetDocumentFileName(doc);
    var oldtext = objCommon.LoadTextFromFile(filename);
    //
    var header = KMGetHtmlHeaderFromText(oldtext);
    var footer = KMGetHtmlFooterFromText(oldtext);
    //
    var docElem = doc.documentElement.cloneNode(true);
    //
    KMRemoveChildNodeByName(docElem, g_KMHighlightSpanId);
    KMRemoveChildNode(docElem, g_KMSmartTagDivID);
    KMRemoveChildNode(docElem, g_KMCommentWindowDivID);
    KMRemoveChildNode(docElem, g_KMFlashMenuDivID);
    //
    var html = header + docElem.outerHTML + footer;
    //
    var template = html.indexOf("<!--WizHtmlContentBegin-->") != -1 && html.indexOf("<!--WizHtmlContentEnd-->") != -1;
    //
    try {
        objDatabase.BeginUpdate();  //不要发送更改消息，避免刷新网页
        var flags = 0x20; //不要下载网络文件，加快保存速度
        if (template) {
            flags |= 0x08;
        }
        objDocument.UpdateDocument4(html, filename, flags);
    }
    catch (err) {
    }
    objDatabase.EndUpdate();
}*/


/*function KMSearchEngine() {
    var _str = KMSmartTagGetSelectionText();
    if (!_str || _str == "")
        return;
    _str = KMTextToSingleLine(_str);
    WizExplorerApp.Window.ViewHtml('http://www.google.com.hk/search?q=' + _str, true);
}*/



/*function fisUsableText(node) {
    return node.nodeType == 3 && node.nodeValue.replace(/[\r\n  ]/ig, '').length > 0
}*/

/*function KMBookmarkAddText() {
    var ForAppending = 8;
    var objDB = objApp.Database;
    var objDoc = objApp.Window.CurrentDocument;
    var dbPath = objDB.DatabasePath;
    var bookmark = dbPath + "bookmark.txt"

    var objFSO = objApp.CreateActiveXObject("Scripting.FileSystemObject");
    //
    try {
        if (!objFSO.FileExists(bookmark))
            var objFile = objFSO.CreateTextFile(bookmark);
        else 
            var objFile = objFSO.GetFile(bookmark);
    }
    catch (err) {
        //
    }
    //
    var bmFile = objFile.OpenAsTextStream(ForAppending, false);
    var today = new Date();
    var nameBookmark = g_KMRange.toString().replace(/\"|'|`/g,"");
    // var nameBookmark = g_KMRange.text.replace(/\"|'|`/g,"");
//    pToday = today.getYear() + "-" + (today.getMonth() +1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    pToday = today.getYear() + "-" + (today.getMonth() +1) + "-" + today.getDate();
    bmFile.WriteLine("");
    bmFile.WriteLine("<Row>");
    bmFile.WriteLine("\t<Cell><Data ss:Type=\"Date\">" + pToday + "</Data></Cell>");
    bmFile.WriteLine("\t<Cell><Data ss:Type=\"String\">" + nameBookmark + "</Data></Cell>");
    bmFile.WriteLine("\t<Cell><Data ss:Type=\"String\">" + objDoc.Title + "</Data></Cell>");
    bmFile.WriteLine("</Row>");
    bmFile.WriteLine("");
    bmFile.Close();
}*/

/*function logObject(obj) {
    if (!obj)
        return;
    //
    objApp.WriteToLog('---------------------------------');
    //
    for (var name in obj) {
        objApp.WriteToLog(name + ': ' + obj[name]);
    }
    //
    objApp.WriteToLog('---------------------------------');
}*/
/*function getElementLeft(elm) {
    if (!elm)
        return;
    var left = elm.offsetLeft;

    var parent = elm.offsetParent;
    while(parent && parent.offsetLeft != 0) {
        left += parent.offsetLeft;
        //
        parent = parent.offsetParent;
    }
    //
    return left;
}*/
/*function getElementTop(elm) {
    if (!elm)
        return;
    //
    var top = elm.offsetTop;
    var parent = elm.offsetParent;
    while(parent && parent.offsetTop != 0) {
        left += parent.offsetTop;
        //
        parent = parent.offsetParent;
    }
    //
    return top;
}*/
/*function getSelectionLeft(sel) {
    if (!sel)
        return;
    var node = sel.anchorNode;
    if (!node || node.nodeType != 3)
        return;
    //
    var left = getElementLeft(node.parentElement);
    if (!left)
        left = 0;
    //
    return parseInt(left + sel.baseOffset);
}*/
/*function getSelectionTop(sel) {
    if (!sel)
        return;
    var node = sel.anchorNode;
    if (!node || node.nodeType != 3)
        return;
    //
    var top = getSelectionTop(node.parentElement);
    if (!top)
        top = 0;
    var style = window.getComputedStyle(node.parentElement);
    //
    return parseInt(top + style.fontSize);
}*/