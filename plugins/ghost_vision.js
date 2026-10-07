plugin.category("Horror");
var Rend=null,Resources=null,next=0;try{var c=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;Rend=c.class("UnityEngine.Renderer");Resources=c.class("UnityEngine.Resources");}catch(e){}
var p=props([{type:"bool",key:"enabled",label:"Ghost Vision",default:false},{type:"float",key:"scan",label:"Scan Seconds",min:.5,max:10,default:2,decimals:1}]);
function scan(){try{var a=Resources.method("FindObjectsOfTypeAll",1).inflate(Rend).invoke();if(!a)return;for(var i=0;i<a.length;i++){var o=a.get(i);try{if(p.enabled)bind(o.method("set_enabled",1),o).invoke(true);}catch(e){}}}catch(e){}}
onFrame(function(){if(p.enabled&&Date.now()>next){next=Date.now()+Number(p.scan)*1000;scan();}});tab(function(ui){ui.text("Keeps loaded renderers visible.");});