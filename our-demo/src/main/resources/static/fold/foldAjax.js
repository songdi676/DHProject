$(function () {
    readData();
})
function readData() {
    var box = $(".contentBox");
    $.ajax({
        url: 'article.json',
        dataType: 'json',
        type: 'GET',
        success: function (data) {
            $.each(box, function (i, ele) {//i=0
                //console.log(box[i]);            
                $.each(data.atc0, function (key, value) {
                    html = '<p>' + value + '</p>';
                    $(box[i]).append(html);
                })
                //遗留问题：如何实现json数据一一对应写入div？
            })
        }
    })
    var $btn=$(".showbtn");
    $btn.attr("onclick","showArticle(this)");
}