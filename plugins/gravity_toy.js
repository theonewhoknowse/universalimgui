// UniversalImgui plugin: gravity direction toy
plugin.category("Physics");
var setter=null;
try{var P=Il2Cpp.domain.assembly("UnityEngine.PhysicsModule").image.class("UnityEngine.Physics");setter=P.method("set_gravity",1);}catch(e){log("Gravity Toy: "+e);}
var p=props([{type:"float",key:"x",label:"X",min:-1,max:1,default:0,decimals:2},{type:"float",key:"y",label:"Y",min:-1,max:1,default:-1,decimals:2},{type:"float",key:"z",label:"Z",min:-1,max:1,default:0,decimals:2},{type:"float",key:"strength",label:"Strength",min:0,max:20,default:9.81,decimals:2},{type:"button",label:"Normal Gravity",onClick:function(){p.x=0;p.y=-1;p.z=0;p.strength=9.81;}}]);
onFrame(function(){if(!setter)return;var m=Math.sqrt(p.x*p.x+p.y*p.y+p.z*p.z)||1;try{setter.invoke(v3(p.x/m*p.strength,p.y/m*p.strength,p.z/m*p.strength));}catch(e){log("Gravity apply failed: "+e);}});
tab(function(ui){ui.text("Point Unity gravity in any direction.");});
