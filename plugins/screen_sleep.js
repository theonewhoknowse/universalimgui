// UniversalImgui plugin: Unity Screen.sleepTimeout
var setter=null, neverSleep=-1, systemSleep=0;
try {
    var S=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Screen");
    setter=S.method("set_sleepTimeout",1);
    neverSleep=-1;
} catch(e){log("Screen Sleep: "+e);}
var p=props([{type:"bool",key:"prevent",label:"Prevent Screen Sleep",default:false}]);
onFrame(function(){if(!setter)return;try{setter.invoke(p.prevent?neverSleep:systemSleep);}catch(e){}});
tab(function(ui){ui.text("Prevent the device display from sleeping.");ui.text("Useful while testing a game.");});
onDisable(function(){if(setter)try{setter.invoke(systemSleep);}catch(e){}});
