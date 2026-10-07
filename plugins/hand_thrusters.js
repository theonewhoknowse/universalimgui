plugin.category("VR");
var R=unityClass("UnityEngine.Rigidbody"),lastWarn=0;
var p=props([{type:"bool",key:"enabled",label:"Thrusters",default:false},{type:"float",key:"force",label:"Force",min:1,max:100,default:15,decimals:0}]);
function pose(){var h=rightHand();if(!h)return null;try{return vec3(bind(h.method("get_forward",0),h).invoke());}catch(e){return null;}}
function player(){var GO=unityClass("UnityEngine.GameObject");if(!GO||!R)return null;for(var n of ["Player","GorillaPlayer","GorillaLocomotion"])try{var o=GO.method("Find",1).invoke(Il2Cpp.string(n));if(o&&!o.isNull()){var rb=getComponent(o,R);if(rb)return rb;}}catch(e){}return null;}
onFrame(function(){if(!p.enabled)return;var f=pose(),rb=player();if(!f||!rb)return;try{bind(rb.method("AddForce",2),rb).invoke(v3(-f[0]*Number(p.force),-f[1]*Number(p.force),-f[2]*Number(p.force)),5);}catch(e){if(Date.now()>lastWarn){lastWarn=Date.now()+3000;log("Thrusters: "+e);}}});
tab(function(ui){ui.text("Push the player opposite your right palm.");});