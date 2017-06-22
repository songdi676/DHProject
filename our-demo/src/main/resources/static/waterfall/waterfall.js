/**
 * Created by cWX280216 on 2017/3/24.
 */
$(function(){
    $.ajax({
        type:'GET',
        dataType:'json',
        url:"waterfall.json",
        success:function(data){
            $.each(data.image,function(i,ele){
                html="<div class='box'>"
                +"<div class='pic'>"
                +"<img src=images/"+ele.src+"/>"+"</div>"+"</div>";
                $("#main").append(html);
            })

        }
    })
})
window.onload= function () {
    waterfall('main','box');
    //requestImg("waterfall.json");
    window.onscroll= function () {
        var dataInt={
            "image":[
                {"src":"0.jpg"},
                {"src":"2.jpg"},
                {"src":"4.jpg"},
                {"src":"5.jpg"},
                {"src":"6.jpg"},
                {"src":"8.jpg"},
                {"src":"10.jpg"},
                {"src":"11.jpg"}
            ]
        }
        if(checkScrollSlide){
            var parent=document.getElementById('main');
            for(var i=0;i<dataInt.image.length;i++){
                var box=document.createElement("div");
                box.setAttribute("class","box");
                parent.appendChild(box);
                var pic=document.createElement("div");
                pic.setAttribute("class","pic");
                box.appendChild(pic);
                var img=document.createElement("img");
                img.src="images/"+dataInt.image[i].src;
                pic.appendChild(img);
            }
            waterfall('main','box');
        }
        //console.log(checkScrollSlide());
    }

}
function waterfall(parent,box){
    //main下所有class为box的元素取出来
    var oParent=document.getElementById(parent);
    var oBoxs=getByClass(oParent,box);//所有class为box的盒子
    //计算列数，页面宽度/oBox[0]的宽度
    var oBoxW=oBoxs[0].offsetWidth;//offsetWidth获取元素宽度
    var oParentW=oParent.clientWidth;
    var colNum=Math.floor(oParentW/oBoxW);//一行8列
    //设置main宽度=列数*一个box宽度
    oParent.style.cssText='width:'+oBoxW*colNum+'px;margin:0 auto;';

    var hArr=new Array();//存放每一列图片高度的数组
    for(var i=0;i<oBoxs.length;i++){
        //console.log(oBoxs[i].offsetHeight);
        if(i<colNum){//第一行中图片下标
            hArr.push(oBoxs[i].offsetHeight);
        }
        else{//处理第二行图片的摆放位置，位于第一行中height值最小的下方
            var minH=Math.min.apply(null,hArr);//第一行图片数组中图片高度最小值
            var index=getMinHeightIndex(hArr,minH);//最小值的索引值 6
            oBoxs[i].style.position="absolute";
            oBoxs[i].style.top=minH+"px";
            //oBoxs[i].style.left=oBoxW*index+"px";
            oBoxs[i].style.left=oBoxs[index].offsetLeft+"px";
            hArr[index]+=oBoxs[i].offsetHeight;//改写数组，数组中最小高度的图片height值=原来的值+新加入下方图片的高度值
        }
    }
    console.log(hArr);
}
function getByClass(parent,clsName){
    var boxArr=new Array();//用来存储所有class为box的元素
    var oElements=parent.getElementsByTagName("*");
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
function getMinHeightIndex(Arr,val){
    for(var i in Arr){
        if(Arr[i]==val){
            return i;
        }
    }
}
//检测滚动条是否具备加载数据块的条件
function checkScrollSlide(){
    var oParent=document.getElementById("main");
    var oBoxs=getByClass(oParent,'box');
    //var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);//最后一个盒子距离页面顶部的高度+自身高度的一半
    // var scollTop=document.body.scrollTop || document.documentElement.scrollTop;//获取滚动条滚走距离==页面向上移动距离
    // var height=document.body.clientHeight||document.documentElement.clientHeight;//浏览器可视高度
    //console.log(height);
    var lastBoxH=oBoxs.getBoundingClientRect().top;
    var clients=document.body.clientHeight || document.documentElement.clientHeight;
    alert(lastBoxH)
    return (lastBoxH<clients)?true:false;//如果最后一个盒子距离页面的高度小于滚动条移动高度+浏览器可视高度=====》即最后一块的一半已经冒出在浏览器底部
}
function requestImg(url){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open('GET',url,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function(data){
        if(xmlhttp.readyState==4&&xmlhttp.status==200){
            //document.getElementById("main").innerHTML=xmlhttp.responseText;
            var parent=document.getElementById('main');
            for(var i=0;i<data.image.length;i++){
                var box=document.createElement("div");
                box.setAttribute("class","box");
                parent.appendChild(box);
                var pic=document.createElement("div");
                pic.setAttribute("class","pic");
                box.appendChild(pic);
                var img=document.createElement("img");
                img.src="images/"+data.image[i].src;
                pic.appendChild(img);
            }
        }
    }
}
