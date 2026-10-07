plugin.category("VR");
var p=props([{type:"float",key:"range",label:"Reach Multiplier",min:1,max:20,default:5,decimals:1}]);
function pose(){var h=rightHand();if(!h)return null;try{return{p:vec3(bind(h.method("get_position",0),h).invoke()),f:vec3(bind(h.method("get_forward",0),h).invoke())};}catch(e){return null;}}
onFrame(function(){});tab(function(ui){var q=pose();ui.text("Right-hand ray reach is "+Number(p.range).toFixed(1)+"x.");ui.text("Use this as the shared reach setting for future interaction plugins.");});