// UniversalImgui plugin: RenderSettings fog
plugin.category("Visual Toys");
var setter=null;
try{var R=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.RenderSettings");setter=R.method("set_fog",1);}catch(e){log("Fog Toy: "+e);}
var p=props([{type:"bool",key:"fog",label:"Fog Enabled",default:true}]);
onFrame(function(){if(setter)try{setter.invoke(!!p.fog);}catch(e){}});
tab(function(ui){ui.text("Toggle Unity RenderSettings fog.");});
