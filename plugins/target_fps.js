// UniversalImgui plugin: Unity Application.targetFrameRate
var target = null;
try {
    var App = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Application");
    target = App.method("set_targetFrameRate", 1);
} catch (e) { log("Target FPS: could not find Application.set_targetFrameRate: " + e); }
var p = props([
    { type:"int", key:"fps", label:"Target FPS", min:-1, max:240, default:-1, desc:"-1 means platform default." },
    { type:"button", label:"Reset to Default", onClick:function(){ p.fps=-1; if(target) try{target.invoke(-1);}catch(e){} notify("Target FPS reset"); } }
]);
onFrame(function(){ if(!target)return; var v=Math.round(Number(p.fps)); if(v<-1)v=-1;if(v>240)v=240;p.fps=v;try{target.invoke(v);}catch(e){} });
tab(function(ui){ui.text("Set Unity Application.targetFrameRate.");ui.text("-1 = platform default.");});
onDisable(function(){if(target)try{target.invoke(-1);}catch(e){}});
