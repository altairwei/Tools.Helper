
<<<<<<< HEAD
* 解决脚本读取ini文件乱码问题, 更改了按钮布局;
* 恢复了在文档内部查询海词词典的功能, 但在编辑或编辑后保存会丢失词典脚本, 懒得再猜Wiznote的接口了, 问题搁置;
=======
* 解决脚本读取ini文件乱码问题;
* 更改了按钮布局;
* 恢复了在文档阅读状态下查询海词词典的功能, 但在编辑或编辑后保存会丢失词典脚本;
>>>>>>> 5482dec0cbfb34bb2d433e7d508aeefd3ccbc486

---

wizhelper 5.0(2016-12-06)
* 适用于为知笔记4.5以及之后版本

---

wizhelper 4.0.4 (2014-08-11)
* 修复一些导致大纲插件不能正常使用的bug

---

wizhelper 4.0.3 (2014-05-16)
* 修复设置目录的bug
* 重新添加功能助手+

wizhelper 4.0.2 (2014-01-26)
* 修改批注与高亮冲突的问题。

---

wizhelper 4.0.1 (2014-01-21)
* 修改批注功能

---

wizhelper 2.5.0 (2012-4-28)
1. 标签输入支持自动补全（按 tab、分号 或 回车确定。推荐使用分号，可连续输入！），支持删除标签（点标签右侧的 X）。
2. 添加一个 最近浏览文件 及 浏览最多文件 的清单，主菜单按钮【最近文件】。

---

wizhelper 2.4.5 (2012-4-23) 
1. 提供样式(a)(b)的切换，请自行修改 plugin.ini 文件如下：

```
;如果是1，则（语法高亮、Wiz助手、须按下Alt、海词翻译）按钮出现在文件主菜单，否则出现在 Wiz助手菜单
KMButtonsInMainMenu=0
```

2. wiz助手菜单可以直接打开附件。

---

wizhelper 2.4.4 (2012-4-22)
1. 基本上整合了 wiz2.1 版那个 i 按钮的功能，老魏还是把那个鸡肋的按钮去掉，把原来的标签工具栏弄回来吧，还是自动完成好用呀！（我自己尝试把 i 按钮换成 wiz助手了，但是菜单大小不可改，好像有些函数的响应不同，不想弄了。我把文件发上来，有兴趣的朋友继续弄吧，或者魏总帮忙改一下。用法：解压缩到 C:\Program Files\Wiz\files\ 下覆盖同名文件，重启后 i 按钮弹出菜单即替换为 wiz助手菜单，效果如 fig.2 所示。）
2. 支持掉转到文件夹（修复了 wiz2.1 那个不能高亮当前文件的bug）。
3. 支持打开原文件网址（修复了 wiz2.1 那个在ie中打开的bug）。
4. 支持直接修改 tags，（比 wiz2.1 增强，可以删除，添加，回车直接更新tags信息）。
    * fig.1  wiz助手增强：
    * fig.2  替换 i 按钮：

---

wizhelper 2.4.3 (2012-4-21)
1. 修复 Dict.cn 定位错误，改为光标跟随（非修改文件类型）。
2. 应该没 bug 了吧，真的不想再升级了，小问题请将就用一下吧。 

---

wizhelper 2.4.2 (2012-4-209)
1. 整合 Dict.cn 的功能（请大家卸载海词插件）。
2. 工具栏新增切换按钮。
3. 个人倾向样式(a)，不喜的朋友请强烈反对，计划今后取消样式(b)。
    * 样式(a), wiz助手菜单的切换按钮删除。
    * 样式(b), wiz助手菜单的切换按钮暂时保留给怀旧的朋友。

---

wizhelper 2.4.1 (2012-4-19)
1. 添上 2.4.0 打包时漏掉的样式表文件，请大家重新下载。 

---

wizhelper 2.4.0 (2012-4-17)
1. 稳定版本发布。
2. 修复标注功能。

---

wizhelper 2.3.3 (2012-4-16)
1. 弹窗位置改为鼠标跟随，修复段末定位错误的bug。
2. 文件结构重新调整，去除冗余文件。

---

wizhelper 2.3.2 (2012-4-16)
1. 优化弹窗显示，当选中文本在文档边界时，调整弹窗位置使之显示在窗口范围内。
2. 根据坛友 mad_kao bug汇报，修复使用带 image border 的自定义模板时，弹窗图标显示边框的bug。
3. 根据坛友 abc163 bug汇报，修复使用带 background 的自定义模板时，弹窗非透明显示的bug。

---
 
wizhelper 2.3.1 (2012-4-16)
1. 从本版开始借用了坛友 abc163 制作的图标，谢谢坛友 abc163 的创意及辛勤劳动，该图标具有透明立体效果（需升级到 ie7 以上） 。怀旧的朋友可继续下载旧版图标自行覆盖！[attach]4089[/attach]
2. 修复使用自定义模板时，弹窗定位错误的bug 。
3. 应坛友 mad_kao 要求添加对【Alt +`】删除高亮的支持（原【Alt + 0】依旧保留）。

---
wizhelper 2.3.0 (2012-4-14)
1. 修复每次打开文档设置param导致重新同步数据的bug。
2. 【已读(xx)】按钮弹出菜单改为同 wiz助手 弹出菜单。
3. 当有文字选中时，按 Alt 键直接触发 wizhelper 弹出菜单，不再需要按住 Alt 键的同时选中文字，易用性大大提高。 

---

wizhelper 2.2.9 (2012-4-12)
1. 开关在【wiz助手】菜单：
2. 选中时（默认不选中），必须按下 Alt 选择文字才会触发 wizhelper 弹出菜单。 

---

wizhelper 2.2.8 (2012-4-2)
1. 按下 Alt 选中文字触发 wizhelper 弹出菜单。
2. 调换荧光笔红紫次序，为红色荧光笔增加快捷键 Alt+7 。 

---

wizhelper 2.2.6 (2012-2-3)

屏幕取词添加对【有道在线翻译】以及【Dict.cn海词真人语音】的支持。
（原freedictionary暂时取消，需要的同学请别升级）。
祝大家新年快乐，步步高升！

1. 取词界面优化，【有道在线】的查询结果优先显示（包括基本词典、网络释义和在线翻译），本地词库后显示。
2. 保存为笔记时，【有道在线-基本词典】的结果优先保存，有道查询失败才会保存本地词库的查询结果。
3. 支持句子和段落的翻译，采用【有道翻译】的结果。
4. 支持单词真人语音，采用【Dict.cn海词】的在线真人语音，离线将不可用。（后续版本会支持本地真人语音，会采用RealPeopleTTS这样的语音包，单词为单个wav文件）。
5. 支持将真人语音一起保存到笔记，打开【笔记+】点击单词旁边的喇叭图标即可真人发音。（黄色喇叭与蓝色喇叭区别为朗读单词并关闭笔记+）。
6. 【笔记+】导出为 HTML文件 以后，真人语音继续可用（请使用黄色喇叭图标）。

fig.1 有道优先显示，支持真人语音：
fig.2 笔记+显示优化，支持真人语音：
fig.3 笔记导出后，真人语音继续可用。

---

wizhelper 2.2.5 (2012-1-31)

屏幕取词添加对有道在线翻译的支持（原freedictionary暂时取消，需要的同学请别升级）。

Fig.1 段落或句子在线翻译： 
Fig.2 单词在线取词和翻译：

---

wizhelper 2.2.3 (2011-11-26)

修复对部分网页添加【回到页面顶端】以后，关闭网页以后该链接丢失的bug。

注：重新添加一次即可修复。

---

wizhelper 2.2.2 (2011-11-15)

修复添加固定在窗口底部的【返回页面顶端】按钮后，大纲无法跳转的bug。

注：重新添加一次即可修复。

---

wizhelper 2.2.1 (2011-11-14)

功能增强：应大家要求，增加固定在窗口底部的【返回页面顶端】按钮：

Fig.1 点击【添加链接“回到页面顶端”】按钮以后，在页面右下角出现一个不随滚动条移动的按钮【^】，点击可跳转到页面顶端。

---

wizhelper 2.2.0  (2011-11-10)

修复[^]前自动换行的bug。

---

wizhelper 2.1.9  (2011-11-09)

修复书签中特殊字符引起的bug（请同时更新outline）。
http://bbs.wiz.cn/forum.php?mod=viewthread&tid=8795&page=3#pid33705

---

wizhelper 2.1.8 (2011-11-09)

小幅更新：

目录项名称改为所选文字，方便采用内置编辑功能建立链接时识别。

---

目录功能完善：
1. 取消设为目录项以后的自动换行。
2. 修复一个编辑文档以后导致无法“回到页面顶部”的bug（请同时更新outline）。

---
======
wizhelper 2.1.6 (2011-11-05)

目录功能完善：
1. 大纲级别增加至5级（嫌多的朋友可自行注释掉或删除 KMHelper.js 文件 第2512~2513行）：

```
    //  KMAddFlashMenuItem2(doc, div, "strSelAsContent4", KMFlashSelAsContent4);
    //  KMAddFlashMenuItem2(doc, div, "strSelAsContent5", KMFlashSelAsContent5);
```

2. 大纲标题项后面添加回到顶部的链接，方便插入目录后的跳转。（可选择是否要添加该链接）：
3. 添加后点击大纲标题项后面的 [^] 回到页面顶部：

---

wizhelper 2.1.5 (2011-11-05)

目录功能完善：
0. 按功能分组，重排了 wizhelper 的图标。
1. 将设置为目录项直接做成按钮，减少鼠标点击：
2. 取消了鼠标悬浮的删除目录项弹出菜单，要对目录项进行编辑可再次选中目录项内部分文字（不需全部选中）并重新点击第二排第二个图标，在弹出菜单中【重新选择目录级别】或点击【取消目录项】即可。

---

wizhelper 2.1.3 (2011-11-02)

功能增强，增加设置目录的功能：

1. 点击第一排最后一个图标将所选文字设置为目录标题，支持多级目录：
2. 支持删除不想要的目录：
3. 配合最新版的大纲，可以将多级目录插入到文档前面：
下载最新版大纲：http://bbs.wiz.cn/thread-8795-1-1.html

---

wizhelper 2.1.2（2011-11-01）：

修复一个wiz助手菜单月份显示错误的bug，图标显示如下，请喜欢自定义图标的朋友备份自己的图标，以免遭覆盖。

icons.zip (3.71 KB, 下载次数: 129) 
上传几个图标，效果如下，请喜欢的朋友自行使用：

由于 msdn_lib最近比较忙，我先整合一下，出一个所有功能可用的版本。

wizhelper 2.1.1（2011-10-20）：

修复一个本地取词失败导致无法在线取词的bug。

使用之前请卸载原来版本。

关于音标的正确显示：本地取词需要金山词霸的字体文件 Ksphonet.TTF ，在线取词需要 abc163 提供的数个字体文件，均可在如下压缩包找到：
 音标字体.zip (103.1 KB, 下载次数: 215) （感谢 abc163 提供）

---

2011-10-18 更新，增强如下功能：

目前wiz在给文字添加链接的时候能链接到网址、书签、文档和附件，但是相信很多人像我一样希望能在文档中直接添加链接到特定文件夹、标签、样式，甚至链接到在文件列表中的自由选中的数个文件。如果你确实有这种需要，那么下面这个 wizhelper 的增强完全满足了你的要求：

1. 选中一段文字，在弹出的 wizhelper 菜单中点击 第一排新添加的最后一个图标会弹出【链接到...】子菜单。可以选择链接到文件夹（不可多选）以及标签（标签可多选，取交集）：
2. 也可以选择链接到样式（不可多选）：
3. 甚至在文件列表中选中的数个文件（可多选）：
4. 完成后，在以后的阅读中，鼠标浮停在链接文字上会出现【删除链接】的提示，点击链接文字会自动选中所选的文件夹、标签、样式或文件：（如果当初设置链接的文件夹被删除将会自动重新建立一个）
5. 点击【删除链接】按钮可以删除链接：
6. 如上所有操作均需当前有选中，否则不会出现相应菜单。


---


D20110415
----------------------------------------------------------- 
1) 新功能
在顶级菜单上增加一个按钮,用来显示当前文章阅读次数和显示星级评级信息
点击按钮后,显示详细的文档相关信息
* 可设置关键字
* 可设置作者
* 可对文档做星级评价
增加显示的相关信息有:
* 文章标题
* 作  者      
* 关键词     
* 评价
* 地址
* 分类
* 标签
* 创建者
* 创建时间
* 修改时间
* 阅读次数
* 样式
2) 在smarttag菜单中增加一个选中文字在google中搜索功能(点图标实现)
3) 增加快捷键
        alt+s: 保存当前荧光编辑
        alt+t: 选中的文字添加为标签(tag)
4) 增加配置开关
        可以关闭smarttag动态菜单
5) 分类了部分页面的样式表(稍后持续更新这个部分)


D20110316
----------------------------------------------------------- 
1) 增加快捷键(alt+1~6)对应smarttag上的顺序,Alt+0是擦除功能
2) 解决了几个原有的小问题

D20110307
----------------------------------------------------------- 
1. 修正了第一版删除了标签云的问题(不好意思我用的原版wiz help一直没有更新,现在merge了最新版,标签云的功能加上了 :P )
2. 修正了 wiki关键字开关显示反了的问题
3. 修正了 笔记+ 抓取的内文笔记,显示不换行问题
4. 解决覆盖原来的outline(或者outline+)的问题.
5. 关闭了一段调试代码

D20110303
----------------------------------------------------------- 
增强版1.0完成

D20161028
-----------------------------------------------------------
1. 修改适应cef3,多render进程逻辑
2. 更换皮肤
