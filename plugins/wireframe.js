// UniversalImgui plugin: Unity GL wireframe
var setter=null;
try {
    var GL=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.GL");
    setter=GL.method("set_wireframe",1);
} catch(e){log("Wireframe: "+e);}
var p=props([{type:"bool",key:"enabled",label:"Wireframe",default:false}]);
onFrame(function(){if(!setter)return;try{setter.invoke(!!p.enabled);}catch(e){}});
tab(function(ui){ui.text("Render geometry as wireframe when supported by the runtime.");});
onDisable(function(){if(setter)try{setter.invoke(false);}catch(e){}});
