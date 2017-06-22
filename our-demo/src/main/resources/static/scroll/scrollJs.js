window.onscroll = function () {
    scrollShow();
}
function scrollShow() {
    //滑动滚动条，当滚走到底部时，第二屏直接显示在顶部，滚动条滚走距离为第一屏的高度，滚动加载内容
    //判断滚动条滚到底部
    var client = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var wholeHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var sumHeight = client + scrollTop;

    var oParent = document.getElementsByClassName('main')[0];
    var oBoxs = oParent.getElementsByTagName('div');
    if (scrollTop == 0) {
        alert("已经到顶部了");
    }
    if (wholeHeight <= sumHeight) {
        //alert("已经到底部了");            
        var two = document.getElementById("two");
        var one = document.getElementById("one");

        for (var i = 0; i < oBoxs.length; i++) {            
                two.style.display = "block";
                one.style.display = "none";
                two.classList.add("animate");                 
            //oBoxs[i].style.display = "block";
            //oBoxs[i].nextSibling.display = 'block';
            console.log(oBoxs.length);
        }
        // one.style.display = "none";
        // two.style.display = "block";
        // oBoxs[i].nextSibling.classList.add("animate");
    }

}