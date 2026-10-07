plugin.category("Horror");
var AS=null,Resources=null;try{var c=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;AS=c.class("UnityEngine.AudioSource");Resources=c.class("UnityEngine.Resources");}catch(e){}
var p=props([{type:"button",label:"Blood Rain",onClick:function(){rain();}},{type:"int",key:"bursts",label:"Audio Bursts",min:1,max:10,default:3}]);
function rain(){try{var a=Resources.method("FindObjectsOfTypeAll",1).inflate(AS).invoke();if(!a||!a.length)return;for(var i=0;i<Number(p.bursts);i++){var o=a.get(Math.floor(Math.random()*a.length));var clip=bind(o.method("get_clip",0),o).invoke();if(clip)bind(o.method("PlayOneShot",1),o).invoke(clip);}notify("Blood rain");}catch(e){log("Blood Rain failed: "+e);}}
tab(function(ui){ui.text("A silly horror button using loaded audio.");});