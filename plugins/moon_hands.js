plugin.category("VR");
var Physics=unityClass("UnityEngine.Physics");
var p=props([{type:"bool",key:"enabled",label:"Moon Hands",default:false},{type:"float",key:"range",label:"Range",min:1,max:10,default:4,decimals:1},{type:"float",key:"lift",label:"Lift",min:1,max:50,default:8,decimals:0}]);
function pose(){var h=rightHand();if(!h)return null;try{return vec3(bind(h.method("get_position",0),h).invoke());}catch(e){return null;}}
onFrame(function(){if(!p.enabled||!Physics)return;var q=pose();if(!q)return;try{var a=Physics.method("OverlapSphere",3).invoke(v3(q[0],q[1],q[2]),Number(p.range),-1,1);if(!a)return;for(var i=0;i<a.length;i++)try{var rb=a.get(i).method("get_attachedRigidbody",0).invoke();if(rb&&!rb.isNull())bind(rb.method("AddForce",2),rb).invoke(v3(0,Number(p.lift),0),5);}catch(e){}}catch(e){}});
tab(function(ui){ui.text("Give nearby physics objects a little zero-gravity lift.");});