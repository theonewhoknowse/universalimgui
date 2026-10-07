// UniversalImgui plugin: global Unity audio volume
var setter=null;
try {
    var A=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.AudioListener");
    setter=A.method("set_volume",1);
} catch(e){log("Audio Volume: "+e);}
var p=props([
 {type:"float",key:"volume",label:"Volume",min:0,max:1,default:1,decimals:2},
 {type:"button",label:"100%",onClick:function(){p.volume=1;}}
]);
onFrame(function(){if(!setter)return;var v=Math.max(0,Math.min(1,Number(p.volume)));p.volume=v;try{setter.invoke(v);}catch(e){}});
tab(function(ui){ui.text("Global AudioListener volume.");ui.text("0 = silent, 1 = full volume.");});
onDisable(function(){if(setter)try{setter.invoke(1);}catch(e){}});
