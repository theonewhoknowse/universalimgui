// UniversalImgui plugin: shadow distance
plugin.category("Visual Toys");
var setter=null;
try{var Q=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.QualitySettings");setter=Q.method("set_shadowDistance",1);}catch(e){log("Shadow Distance: "+e);}
var p=props([{type:"float",key:"distance",label:"Shadow Distance",min:0,max:500,default:100,decimals:0}]);
onFrame(function(){if(setter)try{setter.invoke(Number(p.distance));}catch(e){}});
tab(function(ui){ui.text("Change Unity shadow draw distance.");});
