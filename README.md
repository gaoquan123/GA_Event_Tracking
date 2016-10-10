# GA_Event_Tracking

追蹤網站行為並存到 Google Analytics 事件中作分析
不相依任何 JS Framework
如何使用

<script>
    gtOptions = {'googleID':'your GA ID','siteName' : '你的網站名稱'};
</script>
<script src="GAETracker.js"></script>

客製化回存事件

params = {'action' : 'your action name','value' : 'your action value'};

GAETracker.sendEvent(params);
