// UniversalImgui plugin: main camera FOV toy
plugin.category("Sandbox");
var Camera=null,setter=null,getter=null,original=null;
try{Camera=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Camera");setter=Camera.method("set_fieldOfView",1);getter=Camera.method("get_fieldOfView",0);var cam=Camera.method("get_main",0).invoke();if(cam)original=Number(getter.bind(cam).invoke());}catch(e){log("FOV Toy: "+e);}
var p=props([{type:"float",key:"fov",label:"FOV",min:30,max:150,default:original||90,decimals:0},{type:"button",label:"Reset FOV",onClick:function(){if(original)p.fov=original;}}]);
onFrame(function(){if(!Camera||!setter)return;try{var cam=Camera.method("get_main",0).invoke();if(cam)setter.bind(cam).invoke(Number(p.fov));}catch(e){log("FOV apply failed: "+e);}});
tab(function(ui){ui.text("Attempts to change the main Unity camera FOV.");ui.text("VR SDKs may ignore FOV changes.");});
