plugin.category("Horror");
var Light=unityClass("UnityEngine.Light"),state=true,next=0;
var p=props([{type:"bool",key:"enabled",label:"Flicker",default:true},{type:"float",key:"interval",label:"Interval",min:.05,max:2,default:.2,decimals:2}]);
onFrame(function(){if(!p.enabled||!Light||Date.now()<next)return;next=Date.now()+Number(p.interval)*1000;state=!state;var a=findObjects(Light);for(var i=0;i<a.length;i++)try{bind(a[i].method("set_enabled",1),a[i]).invoke(state);}catch(e){}});
tab(function(ui){ui.text(Light?"Rapidly flicker loaded Unity lights.":"Unity Light class unavailable.");});
onDisable(function(){if(!Light)return;var a=findObjects(Light);for(var i=0;i<a.length;i++)try{bind(a[i].method("set_enabled",1),a[i]).invoke(true);}catch(e){}});