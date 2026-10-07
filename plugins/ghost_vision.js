plugin.category("Horror");
var Rend=unityClass("UnityEngine.Renderer"),next=0;
var p=props([{type:"bool",key:"enabled",label:"Ghost Vision",default:false},{type:"float",key:"scan",label:"Scan Seconds",min:.5,max:10,default:2,decimals:1}]);
function scan(){if(!Rend)return;var a=findObjects(Rend);for(var i=0;i<a.length;i++)try{bind(a[i].method("set_enabled",1),a[i]).invoke(true);}catch(e){}}
onFrame(function(){if(p.enabled&&Date.now()>next){next=Date.now()+Number(p.scan)*1000;scan();}});
tab(function(ui){ui.text(Rend?"Keeps loaded renderers visible.":"Renderer class unavailable.");});