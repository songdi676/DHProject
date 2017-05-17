
function scrollUp() {//连续滚动
    var area = document.getElementById("area");
    var con1 = document.getElementById('con1');
    var con2 = document.getElementById('con2');
    var areaConOffsetH = con1.offsetHeight;
    if (area.scrollTop >= con1.offsetHeight - area.clientHeight) {//area.scrollTop是个不停改变的值，与定值做比较
        //当con1滚动至area区域底部时，克隆con1内容给con2。
        con2.innerHTML = con1.innerHTML;
    }
    if (area.scrollTop >= areaConOffsetH) {
        //当con1底部滚动至area顶部时，重置area区域滚走的高度为0；即con1重新归位
        area.scrollTop = 0;
    }
    else {
        area.scrollTop++;
    }
}
function setInterScroll() {
    var scrollup = setInterval("scrollUp()", 30);
    area.onmouseover = function () {
        clearInterval(scrollup);
    }
    area.onmouseout = function () {
        scrollup = setInterval("scrollUp()", 30);
    }
    // var scrollintervalup=

}
function start() {//不断向上滚走的函数
    area2.scrollTop++;
    var time = setInterval("scrollIntervalUp()", 30);
    return time;
}

function scrollIntervalUp() {//间隔滚动
    var area2 = document.getElementById("area2");
    var areaUl = area2.getElementsByTagName("ul")[0];
    var con3 = document.getElementById('con3');
    var con4 = document.getElementById('con4');
    var areaLi = areaUl.getElementsByTagName("li");
    var areaLiH = areaLi[0].offsetHeight;//一个li的高度
    // console.log(areaLiH);
    if (area2.scrollTop >= areaUl.offsetHeight - area2.clientHeight) {
        con4.innerHTML = con3.innerHTML;
    }
    if (area2.scrollTop % areaLiH == 0) {
        clearInterval(start());
        setTimeout("start()", 3000);//延迟3秒执行滚动
    }
    else {
        area2.scrollTop++;
        if (area2.scrollTop >= con3.offsetHeight) {
            area2.scrollTop = 0;
        }
    }
}
//setTimeout("start()",2000);
//轮播图
function showBanner() {
    var main = document.getElementById("container");
    var list = document.getElementById("list");
    var arrow = document.getElementById("arrow");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var offWidth = list.getElementsByClassName("jumbotron")[0].offsetWidth;
    var buttons = document.getElementsByClassName("arrow")[0].getElementsByTagName('span');
    var index = 1;//第一张图片
    var animated=false;
    function animate(width) {
        animated=true;
        var newLeft = parseInt(list.style.left) + width;//目标值
        var time = 300;//位移总时间
        var interval = 10;//位移间隔时间
        var speed = width / (time / interval);//每次位移量
        function go() {
            if ((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {//当前位移处于前一张图片，还没有达到目标值
                list.style.left = parseInt(list.style.left) + speed + "px";//通过逐步增加位移量来改变当前图片的left值
                setTimeout(go, interval);
            }
            else {
                animated=false;
                list.style.left = newLeft + "px";
                //实现无线滚动效果
                if (newLeft > -1920) {//到达辅助图归位
                    //如果走到了布局中的第一张图片（实际是第五张图片内容），设置list位移为真正第五张的位置
                    list.style.left = -9600 + "px";
                }
                if (newLeft < -9600) {//到达辅助图归位
                    //如果走到了布局中的最后一张图片（实际是第一张图片内容），设置list位移为真正第一张的位置
                    list.style.left = -1920 + "px";
                }
            }
        }
        go();
    }
    function showBtn() {//清除已有的高亮，实现当前图片对应的圆圈高亮
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';//对应第一个圆圈按钮亮起
    }
    next.onclick = function () {
        if (index == 5) {//如果到了第五张图片，设置为第一张图片
            index = 1;
        }
        else {
            index++;//否则自增到5
        }
        showBtn();
        if(!animated){
            animate(-offWidth);
        }
    }
    prev.onclick = function () {        
        if (index == 1) {//如果到了第一张图片，为下次点击设置为第五张图片
            index = 5;
        }
        else {
            index--;//否则自减到1
        }
        showBtn();
        if(!animated){
            animate(offWidth);
        }
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (this.className == "on") {
                return;
            }
            var myIndex = parseInt(this.getAttribute("index"));
            var newOffSet = (myIndex - index) * (-offWidth);//设置任意点击圆点时的列表偏移量，找规律得出计算等式
            animate(newOffSet);
            index = myIndex;
            showBtn();
        }
    }
    function play(){
        timer=setInterval(function(){
            next.onclick();
        },3000)
    }
    function stop(){
        clearInterval(timer);
    }
    main.onmouseover=function(){
        stop();
    }
    main.onmouseout=function(){
        play();
    }
}