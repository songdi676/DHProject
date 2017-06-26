var $ = function (id) {
    return document.getElementById(id);
}
window.onscroll = function () {
    scrollRight();
}
function scrollRight() {
    var osH=$("right").offsetHeight;
    var clientH=document.documentElement.clientHeight||document.body.clientHeight;
    var scT=document.body.scrollTop||document.documentElement.scrollTop;
    if(scT+clientH>osH){
        //设置top值时，为什么不是直接设置scT？
        //原因是scT是个变值。而right需要的top值是页面滚动到right底部时的scrollTop.
        $("right").style.cssText="position:fixed;right:0px;top:"+(-(osH-clientH-100))+"px;";
    }
    else{
        $("right").style.cssText="position:absolute";
    }
}