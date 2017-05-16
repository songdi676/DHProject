// window.onload=function(){
//     ;
// }
function showAnimate() {
    addHeight();//onload时加载动画
    setTimeout("subHeight()", 5000);//延迟5秒，执行高度减少的动画=====>即广告内容停留一段时间
}
var height = 0;
function addHeight() {
    var content = document.getElementsByClassName("content")[0];
    if (height < 200) {
        height += 5;
        content.style.height = height + "px";
    }
    else {
        return;//结束函数
    }
    setTimeout("addHeight()", 50);//每延迟0.05秒调用一次函数，来实现元素高度增加的动画效果
}
function subHeight() {
    var content = document.getElementsByClassName("content")[0];
    if (height > 0) {
        height -= 5;
        content.style.height = height + "px";
    }
    else {
        content.style.display = "none";
        return;//结束函数
    }
    setTimeout("subHeight()", 50);
}
function showMore() {
    var showBtn = document.getElementById("showBtn");
    var btnText = showBtn.getElementsByTagName("p")[0].innerHTML;
    var more = document.getElementsByClassName("more")[0];
    if (btnText == "查看更多↓") {
        showBtn.getElementsByTagName("p")[0].innerHTML ="收起↑";
        more.classList.add("showmore");
    }
    else {
        showBtn.getElementsByTagName("p")[0].innerHTML ="查看更多↓";
        more.classList.remove("showmore");        
    }
}

function showArticle(ele){
    var showbtn=ele.getElementsByTagName("a")[0];
    var pre=ele.previousSibling.previousSibling;
    if(showbtn.innerText=="显示全文"){
        pre.classList.add("contentH");
        showbtn.innerText="收起";
    }
    else{
        pre.classList.remove("contentH");
        showbtn.innerText="显示全文";
    }
}
