
var objApp = WizExplorerApp;
var objWindow = objApp.Window;
var objDB = objApp.Database;
var objCommon = objApp.CreateWizObject("WizKMControls.WizCommonUI");

////////////////////////////////////////////////////////////////////////////////////////////
// 读取为知助手全局设置
function KMSettings(strKey) {
    var objDatabase = objApp.Database;
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var settingFileName = pluginPath + "plugin.ini";
    // 通过objCommon接口读取
    strValue = objCommon.GetValueFromIni(settingFileName, "Common", strKey);
    //
    return strValue;
}

////=================================================================================
////添加知识管理按钮并且相应该按钮消息，显示一个下拉框，该下拉框内容是一个html文件
//

// 注册为知助手按钮
function RegKMButton() {
    var objDatabase = objApp.Database;
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";

    // 字符串本地化
    var buttonWizhelper = objApp.LoadStringFromFile(languageFileName, "buttonWizhelper"); //WIZ_HELPER
    var buttonNoteplus = objApp.LoadStringFromFile(languageFileName, "buttonNoteplus");
    var buttonRecentDocs = objApp.LoadStringFromFile(languageFileName, "buttonRecentDocs");
    var buttonTagsCloud = objApp.LoadStringFromFile(languageFileName, "buttonTagsCloud");

    // 初始化所有选项为0
    if ( objDatabase.GetMeta("wizhelp_parm","KEYWORD_FLAG") != "1" ) { objDatabase.SetMeta("wizhelp_parm","KEYWORD_FLAG", "0"); }
    if ( objDatabase.GetMeta("wizhelp_parm","SMARTTAG_FLAG") != "1" ) { objDatabase.SetMeta("wizhelp_parm","SMARTTAG_FLAG", "0"); }
    if ( objDatabase.GetMeta("wizhelp_parm","ALTKEY_FLAG") != "1" ) { objDatabase.SetMeta("wizhelp_parm","ALTKEY_FLAG", "0"); }
    if ( objDatabase.GetMeta("wizhelp_parm","DICTCN_FLAG") != "1" ) { objDatabase.SetMeta("wizhelp_parm","DICTCN_FLAG", "0"); }

    // 设置状态本地化
    /* 功能鸡肋弃用
    var buttonSyntax = objApp.LoadStringFromFile(languageFileName, "buttonSyntax")+":"+objDatabase.Meta("wizhelp_parm","KEYWORD_FLAG");
    var buttonHelper = objApp.LoadStringFromFile(languageFileName, "buttonHelper")+":"+objDatabase.Meta("wizhelp_parm","SMARTTAG_FLAG");
    var buttonAltkey = objApp.LoadStringFromFile(languageFileName, "buttonAltkey")+":"+objDatabase.Meta("wizhelp_parm","ALTKEY_FLAG");
    var buttonDictcn = objApp.LoadStringFromFile(languageFileName, "buttonDictcn")+":"+objDatabase.Meta("wizhelp_parm","DICTCN_FLAG");
    */

    //
    // 判断用户自定义设置
    if ( KMSettings("KMButtonsInMainMenu") == "1" ) {
        /* 注册到主工具栏
		 * --------------------------------------------*/
        // 注册标签云按钮
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
    } else {
        /* 注册到文档工具栏
		 * --------------------------------------------*/
        // 注册为知助手按钮
        objWindow.AddToolButton("document", "KMHelperButton", buttonWizhelper, "", "OnKMHelperButtonClicked");
        // 注册笔记+按钮
        objWindow.AddToolButton("document", "KMNoteplusButton", buttonNoteplus, "", "OnNotetakingButtonClicked");
    }
    
}

// 为知助手文档工具栏按钮句柄
function OnKMHelperButtonClicked() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var helperFileName = pluginPath + "KMHelperEx.htm";
    var rect = objWindow.GetToolButtonRect("document", "KMHelperButton");
    var arr = rect.split(',');
    // left,top,right,bottom
    objWindow.ShowSelectorWindow(helperFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 400, 300, "");
}

// 笔记+文档工具栏按钮句柄
function OnNotetakingButtonClicked() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var noteFileName = pluginPath + "KMNoteplus.htm";
    //
    var rect = objWindow.GetToolButtonRect("document", "KMNoteplusButton");
    var arr = rect.split(',');
    objWindow.ShowSelectorWindow(noteFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 300, 500, "");
}

// 主工具栏上的为知助手按钮句柄
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
// 主工具栏上最近文档按钮句柄
function OnKMRecentDocsButtonClicked() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var recentFileName = pluginPath + "KMRecentDocs.htm";
    //
    var rect = objWindow.GetToolButtonRect("main", "KMRecentDocsButton");
    var arr = rect.split(',');
    objWindow.ShowSelectorWindow(recentFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 350, 510, "");
}
// 主工具栏上标签云按钮响应
function OnKMTagsCloudButtonClicked() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var cloudFileName = pluginPath + "KMTagsCloud.htm";
    //
    var rect = objWindow.GetToolButtonRect("main", "KMTagsCloudButton");
    var arr = rect.split(',');
    objWindow.ShowSelectorWindow(cloudFileName, (parseInt(arr[0]) + parseInt(arr[2])) / 2, arr[3], 620, 650, "");
}

// 主工具栏更改数据库Meta设置
/* 鸡肋，已弃用
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
*/

// 更新主工具栏按钮状态
function UpdateButtonStatus() {
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var languageFileName = pluginPath + "plugin.ini";
    //
    if ( KMSettings("KMButtonsInMainMenu") == "1" ) {
        /* 当按钮处于主工具栏时
		 * --------------------------------------------*/
        var strRead = objApp.LoadStringFromFile(languageFileName, "strRead");
        var objDoc = objApp.Window.CurrentDocument;
        var readCount = objDoc.ReadCount - 1;
        if ( 0 > readCount ) {
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
        objDB.SetMeta("TEST","MSG_500", pNote_title); // 这个有用？
        // 可用 objWindow.UpdateToolButton("main", "KMHelperExButton", "【" + pNote_title + "】, ""); 代替
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

////=================================================================================
//// Wiznote 事件句柄及脚本注入
//

//获取当前浏览器对象
function KMGetCurrentBrowserObject() {
    return objWindow.CurrentDocumentBrowserObject;
}

/* 似乎已经没有作用了
function KMSleep(milliseconds) {
    for (var t = Date.now() ; Date.now() - t <= milliseconds;);
}
*/

// 文档加载完成事件句柄
function KMOnHtmlDocumentComplete(objBrowser) {
    if (!objBrowser) return false;
    //
    var pluginPath = objApp.GetPluginPathByScriptFileName("KMHelper.js");
    var contentScriptPath = pluginPath + "js/KMContent.js";
    // 注入 KMContent.js
    objBrowser.ExecuteScriptFile(contentScriptPath, function (ret) {
        //
        objBrowser.ExecuteFunction2("KMInit", objApp, WizChromeBrowser, function (ret) {
            if (objWindow.CurrentDocument != null) {
                // 更新主工具栏按钮状态
                UpdateButtonStatus();
            }
            // 检查是否开启海词词典以决定是否注入 KMDictcn.js
            // 放弃注入海词词典
            //KMCheckDictcn();
        });
    });
}

// 文档编辑前事件句柄，该事件在Wiz 4.5.8以及之后版本中失效
function KMOnDocumentBeforeEdit(objBrowser, objWizDocument) {
    if (!objBrowser)
        return;
    // 移除语法高亮
    objBrowser.ExecuteFunction0("KMRemoveHighlight", null);
}

// 文档编辑后事件句柄，该事件在Wiz 4.5.8以及之后版本中失效
function KMOnDocumentAfterEdit(objBrowser, objWizDocument) {
    if (!objBrowser)
        return;
    // 开启语法高亮
    objBrowser.ExecuteFunction0("KMHightlight", null);
}

/*
// 该事件已失效
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
*/

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

/* 已经失效
function update_version() {
    if (objDB.Meta("keyword_HL","keyword_flag").value != null || 
        objDB.Meta("keyword_HL","keyword_flag").value != "" ) {
        objDB.SetMeta("wizhelp_parm","keyword_flag", objDB.Meta("keyword_HL","keyword_flag"));
        //objDB.Meta("keyword_HL","keyword_flag").delete;
    }
}
*/

// 初始化设置
function initParam() {
    if (objDB.Meta("wizhelp_parm","keyword_flag")=="" || objDB.Meta("wizhelp_parm","keyword_flag") == null ) {
        objDB.SetMeta("wizhelp_parm","keyword_flag", "1");
    }
    if (objDB.Meta("wizhelp_parm","smarttag_flag")=="" || objDB.Meta("wizhelp_parm","smarttag_flag") == null ) {
        objDB.SetMeta("wizhelp_parm","smarttag_flag", "1");
    }
}

// 注册 Wiznote 事件
function initEvents() {
    eventsHtmlDocumentComplete.add(KMOnHtmlDocumentComplete);
    eventsDocumentBeforeEdit.add(KMOnDocumentBeforeEdit); // 已失效
    eventsDocumentAfterEdit.add(KMOnDocumentAfterEdit); // 已失效
    //eventsTabClose.add(KMOnDocumentBeforeClose);
   // eventsClose.add(KMOnDocumentBeforeClose);
    //eventsDocumentBeforeChange.add(KMOnDocumentBeforeChange);
}

//
function Main() {
    // update_version();
    initParam();
    initEvents();
    //
    RegKMButton();
}
Main();

/*
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
*/