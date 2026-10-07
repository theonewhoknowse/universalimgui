// UniversalImgui plugin: harmless global chaos toy
plugin.category("Sandbox");
var timeSetter=null,fogSetter=null,shadowSetter=null;
try{var T=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Time");timeSetter=T.method("set_timeScale",1);}catch(e){}
try{var R=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.RenderSettings");fogSetter=R.method("set_fog",1);}catch(e){}
try{var Q=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.QualitySettings");shadowSetter=Q.method("set_shadowDistance",1);}catch(e){}
var p=props([{type:"bool",key:"enabled",label:"Chaos",default:false},{type:"float",key:"interval",label:"Interval",min:0.2,max:5,default:1,decimals:1}]);
var next=0;
onFrame(function(){if(!p.enabled){return;}var now=Date.now();if(now<next)return;next=now+p.interval*1000;try{if(timeSetter)timeSetter.invoke(0.5+Math.random()*2.5);}catch(e){}try{if(fogSetter)fogSetter.invoke(Math.random()>0.5);}catch(e){}try{if(shadowSetter)shadowSetter.invoke(Math.random()*300);}catch(e){}});
onDisable(function(){if(timeSetter)try{timeSetter.invoke(1);}catch(e){}});
tab(function(ui){ui.text("Randomizes a few global Unity settings.");ui.text("Disable it to stop the chaos.");});
