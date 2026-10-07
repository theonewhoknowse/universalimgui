// UniversalImgui plugin: Moon Gravity
plugin.category("Physics");
var setter=null,original=null;
try{var P=Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image.class("UnityEngine.Physics");var getter=P.method("get_gravity",0);setter=P.method("set_gravity",1);original=getter.invoke();}catch(e){log("Moon Gravity: "+e);}
var p=props([{type:"bool",key:"enabled",label:"Moon Gravity",default:false},{type:"float",key:"strength",label:"Strength",min:0.1,max:1,default:0.27,decimals:2},{type:"button",label:"Reset Gravity",onClick:function(){if(setter&&original)try{setter.invoke(original);}catch(e){log("Reset failed: "+e);}}}]);
onFrame(function(){if(!setter||!original)return;try{setter.invoke(p.enabled?v3(0,-9.81*p.strength,0):original);}catch(e){log("Gravity apply failed: "+e);}});
tab(function(ui){ui.text("Reduce Unity physics gravity.");ui.text("0.27x is approximately Moon gravity.");});
onDisable(function(){if(setter&&original)try{setter.invoke(original);}catch(e){}});
