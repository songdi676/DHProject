$(window).on('load', function () {//$(function(){})如果使用这个，会导致遍历box时，图片还没加载，获取到的outerHeight只是box的基础高度55px
    waterfall();
    $(window).on('scroll', function () {
        //checkScroll();
        if (checkScroll) {
            var dataInt = {
                "image": [
                    { "src": "0.jpg" },
                    { "src": "2.jpg" },
                    { "src": "4.jpg" },
                    { "src": "5.jpg" },
                    { "src": "6.jpg" },
                    { "src": "8.jpg" },
                    { "src": "10.jpg" },
                    { "src": "11.jpg" }
                ]
            }
            $.each(dataInt.image,function(key,value){
                var box=$("<div>").addClass("box").appendTo($("#main"));
                var pic=$("<div>").addClass("pic").appendTo(box);
                $("<img>").appendTo(pic).attr('src','images/'+$(value).attr('src'));  
                //console.log($(value).attr('src')); 
            })
            waterfall();
        }
    })
})
function waterfall() {
    var $boxs = $("#main>div");
    var hArr = [];
    var boxW = $boxs.eq(0).outerWidth();
    var pageW = $(window).width();
    var col = Math.floor(pageW / boxW);
    $("#main").width(boxW * col).css("margin", "0 auto");
    $boxs.each(function (key, value) {
        var boxH = $boxs.eq(key).outerHeight();
        if (key < col) {
            hArr.push(boxH);
        } else {//寻找第一行中高度最小值和对应的索引值,第二行图片排在高度最小的图片下方
            var minH = Math.min.apply(null, hArr);
            var index = $.inArray(minH, hArr);
            $(value).css(
                {
                    'position': 'absolute',
                    'top': minH + 'px',
                    'left': index * boxW + 'px'
                })
            hArr[index] = hArr[index] + boxH;//每一列的最小值都在改变
        }
    })

}
function checkScroll() {
    var lastBox = $("#main>div").last();
    var lastBoxH = lastBox.offset().top + Math.floor(lastBox.outerHeight() / 2);
    var scroll = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxH < scroll + documentH) ? true : false;
}
$.ajax({
    type: 'GET',
    dataType: 'json',
    url: "waterfall.json",
    success: function (data) {
        $.each(data.image, function (i, ele) {
            html = "<div class='box'>"
                + "<div class='pic'>"
                + "<img src=images/" + ele.src + "/>" + "</div>" + "</div>";
            $("#main").append(html);
        })

    }
})