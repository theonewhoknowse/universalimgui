// UniversalImgui plugin: pause Unity physics simulation
plugin.category("Physics");
var setter=null;
try{var P=Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image.class("UnityEngine.Physics");setter=P.method("set_autoSimulation",1);}catch(e){log("Physics Pause: "+e);}
var p=props([{type:"bool",key:"paused",label:"Pause Physics",default:false}]);
onFrame(function(){if(setter)try{setter.invoke(!p.paused);}catch(e){}});
tab(function(ui){ui.text("Toggle Physics.autoSimulation.");ui.text("Does not pause scripts or Unity time.");});
onDisable(function(){if(setter)try{setter.invoke(true);}catch(e){}});
