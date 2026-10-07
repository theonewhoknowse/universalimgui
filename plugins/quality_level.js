// UniversalImgui plugin: Unity quality level
var setter=null;
try{var Q=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.QualitySettings");setter=Q.method("SetQualityLevel",2);}catch(e){log("Quality Level: "+e);}
var p=props([{type:"int",key:"level",label:"Quality Level",min:0,max:10,default:0},{type:"bool",key:"applyExpensive",label:"Apply Expensive Changes",default:true}]);
onFrame(function(){if(!setter)return;var v=Math.max(0,Math.min(10,Math.round(Number(p.level))));p.level=v;try{setter.invoke(v,!!p.applyExpensive);}catch(e){}});
tab(function(ui){ui.text("Set Unity QualitySettings quality index.");ui.text("Available levels vary by game.");});
