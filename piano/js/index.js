
var ctx;
/**
 * 音频数组，从低音1，到高音7
 */
var reqs = [ 262, 294, 330, 349, 392, 440, 494, 523];


//创建一个音频上下文
function initContext() {
    if (ctx) {
        return;
    }
    ctx = new AudioContext();
}

/**
 * 发出声音
 * @param index 音频数组的下标
 */
function makeSound(index) {
    var osc = ctx.createOscillator(); //得到一个振荡器
    var g = ctx.createGain(); //得到一个音量控制器
    //连接振荡器和音量控制器
    osc.connect(g);
    //设置声波的波形
    osc.type = "sine";
    //设置频率
    osc.frequency.value = reqs[index]; // 单位 hz
    //将音量控制器连接到相应扬声器
    g.connect(ctx.destination);
    g.gain.value = 0; //设置音量为0
    g.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01)
    osc.start(); //立刻播放
    //1.5秒之后音量变化到0，指数变化
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5)
    osc.stop(ctx.currentTime + 1.5); //1.5秒之后停止
}


var lis = document.querySelectorAll(".piano li");

for (var i = 0; i < lis.length; i++) {
    var li = lis[i];
    (function (i) {
        li.onmousedown = function () {
            initContext();
            makeSound(i);
            this.style.background = "#ccc";
        }
        li.onmouseup = function () {
            this.style.background = "#fff";
        }
    }(i));
}


document.documentElement.onkeydown = function (e) {
    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        //li.dataset 自定义属性的对象
        if (li.dataset.key === e.key) {
            initContext();
            makeSound(li.dataset.index);
        }
    }
};