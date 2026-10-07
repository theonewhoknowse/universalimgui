plugin.category("Horror");
var Light=null,Resources=null,on=true,next=0;try{var c=Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;Light=c.class("UnityEngine.Light");Resources=c.class("UnityEngine.Resources");}catch(e){}
var p=props([{type:"bool",key:"enabled",label:"Flicker",default:true},{type:"float",key:"interval",label:"Interval",min:.05,max:2,default:.2,decimals:2}]);
function getAll(){try{return Resources.method("FindObjectsOfTypeAll",1).inflate(Light).invoke();}catch(e){return null;}}
onFrame(function(){if(!p.enabled||Date.now()<next)return;next=Date.now()+Number(p.interval)*1000;on=!on;var a=getAll();if(a)for(var i=0;i<a.length;i++)try{bind(a.get(i).method("set_enabled",1),a.get(i)).invoke(on);}catch(e){}});
tab(function(ui){ui.text("Rapidly flicker loaded Unity lights.");});