// UniversalImgui plugin: random gravity button
plugin.category("Physics");
var setter=null;
try{var P=Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image.class("UnityEngine.Physics");setter=P.method("set_gravity",1);}catch(e){log("Random Gravity: "+e);}
var p=props([{type:"float",key:"strength",label:"Strength",min:0,max:20,default:9.81,decimals:2},{type:"button",label:"Randomize Gravity",onClick:function(){if(!setter)return;var a=Math.random()*Math.PI*2,b=(Math.random()-0.5)*Math.PI;var x=Math.cos(b)*Math.cos(a),y=Math.sin(b),z=Math.cos(b)*Math.sin(a);try{setter.invoke({x:x*p.strength,y:y*p.strength,z:z*p.strength});notify("Gravity randomized");}catch(e){}}},{type:"button",label:"Normal Gravity",onClick:function(){if(setter)try{setter.invoke({x:0,y:-p.strength,z:0});}catch(e){}}}]);
tab(function(ui){ui.text("Press the button to fling gravity in a random direction.");});
