(function() {

    //簡單區分 device
    var device="";
    if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i)){
      device="mobile";
    }else{
      device="desktop";
    }
    //目前 sever 代表字
    var server=window.location.href.match(/http[s]*:\/\/([^\.]*)/ig).toString().replace(/http[s]*:\/\//,"");

    this.GAETracker = function(){
        //初始化 , 預設值
        var defaults = {
                "scrollList" : [20,40,60,80,100],
        };
        //合併初始值
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extend(defaults, arguments[0]);
        }else{
            this.options = defaults;
        }

        //檢查GA code是否載入
        if(typeof this.options.googleID!="undefined"){
            if(typeof window.ga=="undefined"){
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            }
            ga('create', this.options.googleID, 'auto');
        }
        //檢查是否有名稱
        if(typeof this.options.siteName=="undefined"){
            this.options.siteName = window.location.href.match(/http[s]?:\/\/([^\/]*)/i)[1];
        }
        //預先建立的名稱
        this.options.site = server+":"+this.options.siteName;
        return this;
    }

    //開始記錄

    //客製化儲存GA 事件紀錄
    GAETracker.prototype.sendEvent = function(params){

        if(typeof params=="undefined"){
            console.log("sendEvent need params");
            return false;
        }
        if(typeof params.action == "undefined"){
            params.action = "";
            console.log("sendEvent need action name");
            return false;
        }
        if(typeof params.value == "undefined"){
            params.value = "";
            console.log("sendEvent need value");
            return false;
        }
        if(typeof params.actionParams == "undefined"){
            params.actionParams = "";
        }
        if(typeof params.stage == "undefined"){
            params.stage = "";
        }
        sendEvent(this.options,params.action,params.value,params.actionParams,params.stage);
    }
    //綁定動作
        

    //儲存GA紀錄
    //action : 執行動作, value : 動作內容, actionParams : 動作補充參數, stage : 動作內容補充參數
    function sendEvent(options,action,value,actionParams,stage){
      if(typeof actionParams=="undefined") actionParams="";
      if(typeof value=="undefined") value="";
      if(typeof action=="undefined") action="";
      value=value+"@@"+window.location.href
      ga('send', {
         hitType: 'event',
         eventCategory: options.site,
         eventAction: device+"_"+action+actionParams,
         eventLabel: stage+value
       });
    }
    //合併options
    function extend(defaults,options){
        var property;
        for(property in options){
            defaults[property] = options[property];
        }
        return defaults;
    }


}());

//載入後啟動

if(typeof window.gtOptions=="undefined"){
    window.gtOptions = {};
}
var GAETracker = new GAETracker(window.gtOptions);
