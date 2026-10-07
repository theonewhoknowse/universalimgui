plugin.category("Horror");
var AS=unityClass("UnityEngine.AudioSource");
var p=props([{type:"button",label:"Blood Rain",onClick:function(){rain();}},{type:"int",key:"bursts",label:"Audio Bursts",min:1,max:10,default:3}]);
function rain(){if(!AS){notify("AudioSource unavailable");return;}var a=findObjects(AS),count=0;for(var i=0;i<Number(p.bursts)&&a.length;i++){var o=a[Math.floor(Math.random()*a.length)];try{var clip=bind(o.method("get_clip",0),o).invoke();if(clip){bind(o.method("PlayOneShot",1),o).invoke(clip);count++;}}catch(e){}}notify(count?"Blood rain":"No usable audio clips found");}
tab(function(ui){ui.text(AS?"Audio burst horror effect using loaded clips.":"AudioSource class unavailable.");});