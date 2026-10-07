plugin.category("VR");
var GO=unityClass("UnityEngine.GameObject"),R=unityClass("UnityEngine.Rigidbody");
var p=props([{type:"float",key:"force",label:"Jump Force",min:1,max:100,default:20,decimals:0},{type:"button",label:"Jump",onClick:function(){jump();}}]);
function jump(){if(!GO||!R){notify("Rigidbody API unavailable");return;}var names=["Player","GorillaPlayer","GorillaLocomotion"];for(var i=0;i<names.length;i++)try{var o=GO.method("Find",1).invoke(Il2Cpp.string(names[i]));if(o&&!o.isNull()){var rb=getComponent(o,R);if(rb){bind(rb.method("AddForce",2),rb).invoke(v3(0,Number(p.force),0),1);notify("SUPER JUMP");return;}}}catch(e){}notify("Player Rigidbody not found");}
tab(function(ui){ui.text("Launch a common Player Rigidbody upward.");});