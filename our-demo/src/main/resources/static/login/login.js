window.onload = function () {
    showLogin();
    setInterScroll();
    showBanner();
}
function showLogin() {
    var signIn = document.getElementById("loginBtn");
    var loginBox = document.getElementById("login");
    var cls = document.getElementById("cls");
    var clientH = document.documentElement.clientHeight || document.body.clientHeight;
    var clientW = document.documentElement.clientWidth || document.body.clientWidth;
    signIn.onclick = function () {//点击sign in 显示登录框和遮罩层
        loginBox.style.display = 'block';
        createMask("mask");
        //需要在loginBox出现后，loginBox.offsetHeight的值才能计算出，否则在loginBox出现之前，loginBox.offsetHeight为0;
        var loginBoxH = (clientH - loginBox.offsetHeight) / 2;
        var loginBoxW = (clientW - loginBox.offsetWidth) / 2;
        loginBox.style.top = loginBoxH + 'px';
        loginBox.style.left = loginBoxW + 'px';
    }
    cls.onclick = function () {//点击登录框关闭按钮
        loginBox.style.display = 'none';//登录框盒子隐藏
        var masked = document.getElementById("mask");
        document.body.removeChild(masked);//并在文档里删除遮罩层
    }
}

function createMask(id) {//创建遮罩层
    var mask = document.createElement("div");
    mask.id = id;
    document.body.appendChild(mask);
    var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
    var scrollW = document.documentElement.scrollWidth || document.body.scrollWidth;
    mask.style.height = scrollH + 'px';
    mask.style.width = scrollW + 'px';
    return mask;
}
$(function () {
    var usernameval = $("#username").val();
    var passwordval = $("#password").val();
    $("#signin").on('click', function () {
        $.ajax({
            type: "POST",
            url: "/login",
            data:{
                username:usernameval,
                password:passwordval
            },
            dataType:"json",            
            success: function (data) {
                $("#div1").html(data.username);
            },
            error:function(jqXHR){
                alert("发生错误"+jqXHR.status);
            }
        })
    })
})
