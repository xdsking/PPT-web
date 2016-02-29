/**
 * Created by xuds on 2016/1/18.
 */

var global = {
    curPage: 1, /*ppt页码从1开始*/
    landscape: 35, /*横屏阈值*/
    portrait: 175, /*竖屏阈值*/
    pageLength: 5/*ppt页数*/
};
//PC端移动端判断
function IsPC() {
    var flag = true;
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
/**
 * @summary 初始化“工具栏”事件
 */
function initToolBarAction() {
    var centerToolBarPane = $(".cstm-left-action,.cstm-right-action"), bottomToolBarPane = $("#toolbarPane"), bodyHeight = document.body.clientHeight, liminalValue = global.portrait;
    if (window.orientation && window.orientation == 90 || window.orientation == -90) {
        liminalValue = global.landscape;
    }
    centerToolBarPane.css("height", (bodyHeight - liminalValue) + "px");
    if (IsPC()) {
        centerToolBarPane.mouseenter(function () {
            $(this).children().fadeIn();
        });
        centerToolBarPane.mouseleave(function () {
            $(this).children().fadeOut();
        });
        bottomToolBarPane.mouseenter(function () {
            $(this).children().fadeIn();
        });
        bottomToolBarPane.mouseleave(function () {
            $(this).children().fadeOut();
        });
        window.setTimeout(function () {
            centerToolBarPane.children().fadeOut();
            bottomToolBarPane.children().fadeOut();
        }, 2000);
    }
    $(window).resize(function () {
        var bodyHeight = document.body.clientHeight;
        centerToolBarPane.css("height", (bodyHeight - liminalValue) + "px");
    });
}
/**
 * @summary 初始化Iframe大小及resize事件.
 */
function initFrameSize() {
    var h5frm = $("#h5frm"), bodyHeight = document.body.clientHeight, liminalValue = global.portrait;
    if (window.orientation && window.orientation == 90 || window.orientation == -90) {
        liminalValue = global.landscape;
    }
    h5frm.css("height", (bodyHeight - liminalValue) + "px");
    $(window).resize(function () {
        var bodyHeight = document.body.clientHeight;
        h5frm.css("height", (bodyHeight - liminalValue) + "px");
    });
}
/**
 *@summary 注册移动端屏幕翻转.
 */
function registerViewEvt() {
    var supportsOrientationChange = "onorientationchange" in window,
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    if (window.orientation == 0 || window.orientation == 180) {
        landscapeView();
    }
    else if (window.orientation == 90 || window.orientation == -90) {
        portraitView();
    }
    window.addEventListener(orientationEvent, function () {
        if (window.orientation == 0 || window.orientation == 180) {
            landscapeView();
        }
        else if (window.orientation == 90 || window.orientation == -90) {
            portraitView();
        }
        initFrameSize();
    }, false);
}
/**
 * @summary 横屏
 */
function landscapeView() {
    /* $("#toolbarPane").addClass("cstm-toolbar-landscape-pane").removeClass("cstm-toolbar-portrait-pane");
     $("#toolbarGroup").addClass("btn-group").removeClass("btn-group-vertical");
     $("#pageIndexMenu").addClass("cstm-dropdown-menu-landscape").removeClass("cstm-dropdown-menu-portrait");
     */
    $(".cstm-big-bang").removeClass("cstm-big-bang-landscape");
}
/**
 * @summary 竖屏
 */
function portraitView() {
    /*$("#toolbarPane").addClass("cstm-toolbar-portrait-pane").removeClass("cstm-toolbar-landscape-pane");
     $("#toolbarGroup").removeClass("btn-group").addClass("btn-group-vertical");
     $("#pageIndexMenu").addClass("cstm-dropdown-menu-portrait").removeClass("cstm-dropdown-menu-landscape");
     */
    $(".cstm-big-bang").addClass("cstm-big-bang-landscape");
}
/**
 * summary 设置当前页
 * @param value<int>
 */
function setCurrentPage(value) {
    $("#currentPage b").html(value + "/" + global.pageLength);
    global.curPage = value;
    //TODO
}
function activateAnim(type, $node) {
    $node.addClass(type + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass(type + ' animated');
    });
}
$(function () {
    //向下滚动,导航隐藏
    /*$(document.body).on("mousewheel", function () {
     $(".navbar-fixed-top").autoHidingNavbar({
     showOnUpscroll: false
     });
     });*/
    initFrameSize();
    initToolBarAction();
    registerViewEvt();
    setCurrentPage(global.curPage);
    activateAnim("fadeInRight", $(".title-pane"));//fadeInRight//flipInX
    //同步
    $("#syncView").click(function () {
        $(this).toggleClass("btn-success btn-default");
        //TODO
    });
    //全屏
    $("#fullscreen").click(function () {
        $(this).toggleClass("btn-success btn-default");
        //TODO
    });
    //上一页
    $("#prevPage").click(function () {
        var value = global.curPage <= 1 ? 1 : global.curPage - 1;
        setCurrentPage(value);
        //TODO
    });
    //下一页
    $("#nextPage").click(function () {
        var value = global.curPage >= global.pageLength ? global.pageLength : global.curPage + 1;
        setCurrentPage(value);
        //TODO
    });
    $("#pageIndexMenu li").click(function () {
        setCurrentPage(this.value);
    });
});