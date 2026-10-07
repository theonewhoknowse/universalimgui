// UniversalImgui plugin: Application.runInBackground
plugin.category("Sandbox");
var setter=null;
try{var A=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Application");setter=A.method("set_runInBackground",1);}catch(e){log("Run Background: "+e);}
var p=props([{type:"bool",key:"enabled",label:"Run In Background",default:true}]);
onFrame(function(){if(setter)try{setter.invoke(!!p.enabled);}catch(e){}});
tab(function(ui){ui.text("Allow the Unity application to keep running in background where supported.");});
