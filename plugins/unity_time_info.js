// UniversalImgui plugin: Unity time diagnostics
var Time=null,getScale=null,getTime=null,getDelta=null;
try{Time=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Time");getScale=Time.method("get_timeScale",0);getTime=Time.method("get_time",0);getDelta=Time.method("get_deltaTime",0);}catch(e){log("Unity Time Info: "+e);}
tab(function(ui){if(!Time){ui.text("Unity Time class not found.");return;}try{ui.text("timeScale: "+Number(getScale.invoke()).toFixed(2));}catch(e){}try{ui.text("time: "+Number(getTime.invoke()).toFixed(2)+"s");}catch(e){}try{ui.text("deltaTime: "+Number(getDelta.invoke()).toFixed(4)+"s");}catch(e){}});
