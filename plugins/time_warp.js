// UniversalImgui plugin: time warp presets
plugin.category("Sandbox");
var setter=null;
try{var T=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Time");setter=T.method("set_timeScale",1);}catch(e){log("Time Warp: "+e);}
var p=props([{type:"select",key:"speed",label:"Speed",options:["0.1x","0.25x","0.5x","1x","2x","4x"],default:"1x"},{type:"button",label:"Normal Speed",onClick:function(){p.speed="1x";}}]);
onFrame(function(){if(!setter)return;var v=parseFloat(p.speed);try{setter.invoke(v);}catch(e){}});
tab(function(ui){ui.text("Quick Time.timeScale presets.");});
onDisable(function(){if(setter)try{setter.invoke(1);}catch(e){}});
