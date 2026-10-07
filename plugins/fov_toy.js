// UniversalImgui plugin: main camera FOV toy
plugin.category("Sandbox");
var setter=null,getter=null,original=null;
try{var C=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Camera");setter=C.method("set_fieldOfView",1);getter=C.method("get_fieldOfView",0);}catch(e){log("FOV Toy: "+e);}
try{if(getter)original=Number(getter.invoke());}catch(e){}
var p=props([{type:"float",key:"fov",label:"FOV",min:30,max:150,default:original||90,decimals:0},{type:"button",label:"Reset FOV",onClick:function(){if(original)p.fov=original;}}]);
onFrame(function(){if(!setter)return;try{var cam=(Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Camera")).method("get_main",0).invoke();if(cam)setter.invoke.call(setter,cam,p.fov);}catch(e){}});
tab(function(ui){ui.text("Attempts to change the main Unity camera FOV.");ui.text("Some XR cameras ignore FOV changes.");});
