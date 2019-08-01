function init(){
    createWaterInit(areaDom,imgs,imgWidth)
}
function createWaterInit(areaDom,imgs,imgWidth = 220){
    areaDom.innerHTML = "";
    areaDom.style.position = 'relative';
    var containerWidth; //容器宽度
    var colNumber; //一行几列,显示几张图片
    var gap;//图片之间的间隙
    var imgArray = [];

    //1.添加图片
    addImgs();

    //2,窗口尺寸改变事件
    var timer = null;
    window.addEventListener("resize",function(){
        //函数防抖
        if(timer){
            clearInterval(timer);
        }
        timer = setInterval(()=>{
            setPositions();
        },500)
    });

    function setParameters(){
        containerWidth = parseInt(areaDom.clientWidth);
        colNumber = parseInt(containerWidth/imgWidth);
        gap = (containerWidth - colNumber*imgWidth)/(colNumber+1);
    }

    /**
     * 添加图片
     */
    function addImgs(){
        for (var i=0;i<imgs.length;i++ ){
            var url = imgs[i];
            var img = document.createElement('img');
            img.src = url;
            img.style.width = imgWidth + 'px';
            img.style.position = 'absolute';
            img.addEventListener('load',function(){
                setPositions();
            });
            areaDom.appendChild(img);
            imgArray.push(img);
        }
    }

    /**
     * 设置所有图片的位置
     */
    function setPositions(){
        setParameters();
        var nextYs = new Array(colNumber);
        nextYs.fill(0);
        for(var i = 0;i<imgArray.length;i++){
            var img = imgArray[i];
            var y = Math.min(...nextYs);
            var colIndex = nextYs.indexOf(y);

            img.style.left = (imgWidth + gap) * colIndex + 'px';
            img.style.top = y + 'px';

            //修改数组
            nextYs[colIndex] += parseInt(img.height) + gap;
        }

        //设置容器的高度
        areaDom.style.height = Math.max(...nextYs) + 'px';
    }

}

