// UniversalImgui plugin: Moon Gravity
plugin.category("Physics");
var g=null,original=null;
try{var P=Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image.class("UnityEngine.Physics");g=P.method("get_gravity",0);var S=P.method("set_gravity",1);original=g.invoke();}catch(e){log("Moon Gravity: "+e);}
var setter=S;
var p=props([{type:"bool",key:"enabled",label:"Moon Gravity",default:false},{type:"float",key:"strength",label:"Strength",min:0.1,max:1,default:0.27,decimals:2},{type:"button",label:"Reset Gravity",onClick:function(){if(setter&&original)try{setter.invoke(original);}catch(e){}}}]);
onFrame(function(){if(!setter)return;try{setter.invoke(p.enabled?{x:0,y:-9.81*p.strength,z:0}:original);}catch(e){}});
tab(function(ui){ui.text("Reduce Unity physics gravity.");ui.text("0.27x is approximately Moon gravity.");});
onDisable(function(){if(setter&&original)try{setter.invoke(original);}catch(e){}});
