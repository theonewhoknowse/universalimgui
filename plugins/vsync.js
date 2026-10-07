// UniversalImgui plugin: Unity QualitySettings.vSyncCount
var setter=null;
try {
    var Q=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.QualitySettings");
    setter=Q.method("set_vSyncCount",1);
} catch(e){log("VSync: "+e);}
var p=props([
 {type:"select",key:"mode",label:"VSync",options:["Off","Every VBlank","Every 2 VBlanks"],default:"Off"},
 {type:"button",label:"Disable VSync",onClick:function(){p.mode="Off";if(setter)try{setter.invoke(0);}catch(e){}}}
]);
onFrame(function(){if(!setter)return;var v=p.mode==="Every VBlank"?1:p.mode==="Every 2 VBlanks"?2:0;try{setter.invoke(v);}catch(e){}});
tab(function(ui){ui.text("Unity QualitySettings.vSyncCount.");});
onDisable(function(){if(setter)try{setter.invoke(0);}catch(e){}});
