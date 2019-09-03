window.onload=function(){
    new Vue({
        el:"#app",
        data:{
            pageNo:0,//请求起始页数
            pageSize:5,//一页N条数据
            data:[],
            url:'http://47.96.117.121:7001/news/page/',
            endOfScreen:false  //监听属性,判断是否到达屏幕底部
        },
        watch:{
            endOfScreen(newValue,oldValue){
                if(newValue){
                    this.pageNo++;
                    this.loadData(this.pageNo,this.pageSize)
                }
            }
        },
        created(){ //hooks
            this.loadData();
            window.onscroll = ()=>{
                this.endOfScreen = this.scrollCheck();
            }
        },
        methods:{
            scrollCheck(){
              var newsH = window.scrollY + window.innerHeight;
              return newsH === document.documentElement.offsetHeight;
            },
            loadData(pageNo = this.pageNo,pageSize = this.pageSize){
               setTimeout(()=>{
                   //ajax promise axios
                   fetch(this.url + this.pageNo + "/" + this.pageSize)
                   .then(res=>{
                       console.log(res);
                       return res.json();
                   })
                   .then(res=>{
                       console.log(res);
                       for(let i in res.data){
                           if(res.data[i].img){
                               var reg = new RegExp('127.0.0.1','g');
                               res.data[i].img = res.data[i].img.replace(reg,'47.96.117.121')
                           }
                           this.data.push(res.data[i])
                       }
                   })
               },500)
            }
        }
    })
};
