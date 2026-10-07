plugin.category("Horror");
var AS=unityClass("UnityEngine.AudioSource"),next=0;
var p=props([{type:"bool",key:"enabled",label:"Footsteps",default:false},{type:"float",key:"interval",label:"Interval",min:.2,max:5,default:1,decimals:1}]);
function play(){if(!AS)return;var a=findObjects(AS);for(var i=0;i<a.length;i++)try{var s=bind(a[i].method("get_name",0),a[i]).invoke();var n=String(s?s.content:"").toLowerCase();if(n.indexOf("step")>=0||n.indexOf("foot")>=0){bind(a[i].method("Play",0),a[i]).invoke();return;}}catch(e){}}
onFrame(function(){if(!p.enabled||Date.now()<next)return;next=Date.now()+Number(p.interval)*1000;play();});
tab(function(ui){ui.text(AS?"Periodically play a loaded footstep AudioSource.":"AudioSource class unavailable.");});