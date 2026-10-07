plugin.category("VR");
var p=props([{type:"float",key:"reach",label:"Ghost Reach",min:1,max:50,default:20,decimals:0},{type:"button",label:"Notify Reach",onClick:function(){notify("Ghost hand reach: "+Number(p.reach).toFixed(0)+"m");}}]);
tab(function(ui){ui.text("Extended right-hand reach setting for interaction experiments.");ui.text("Current reach: "+Number(p.reach).toFixed(0)+"m");});