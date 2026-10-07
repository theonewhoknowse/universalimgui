// UniversalImgui plugin: global Unity audio mute
var setter=null;
try {
    var A=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.AudioListener");
    setter=A.method("set_pause",1);
} catch(e){log("Audio Mute: "+e);}
var p=props([{type:"bool",key:"muted",label:"Mute All Audio",default:false}]);
onFrame(function(){if(!setter)return;try{setter.invoke(!!p.muted);}catch(e){}});
tab(function(ui){ui.text("Toggle Unity AudioListener.pause.");});
onDisable(function(){if(setter)try{setter.invoke(false);}catch(e){}});
