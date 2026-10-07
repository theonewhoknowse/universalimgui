plugin.category("Horror");
var AS=null,Resources=null;try{var c=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;AS=c.class("UnityEngine.AudioSource");Resources=c.class("UnityEngine.Resources");}catch(e){}
var p=props([{type:"button",label:"JUMPSCARE",onClick:function(){scare();}},{type:"float",key:"volume",label:"Volume",min:0,max:2,default:1,decimals:1}]);
function scare(){try{var a=Resources.method("FindObjectsOfTypeAll",1).inflate(AS).invoke();if(!a||!a.length)return;var o=a.get(Math.floor(Math.random()*a.length));bind(o.method("set_volume",1),o).invoke(Number(p.volume));bind(o.method("Play",0),o).invoke();notify("JUMPSCARE");}catch(e){log("Jumpscare failed: "+e);}}
tab(function(ui){ui.text("Play a random loaded AudioSource.");});