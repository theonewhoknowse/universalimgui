plugin.category("Horror");
var AS=unityClass("UnityEngine.AudioSource"),next=0;
var p=props([{type:"bool",key:"enabled",label:"Random Scares",default:false},{type:"float",key:"min",label:"Min Seconds",min:1,max:120,default:10,decimals:0},{type:"float",key:"max",label:"Max Seconds",min:1,max:120,default:30,decimals:0}]);
function scare(){if(!AS)return;var a=findObjects(AS);if(!a.length)return;var o=a[Math.floor(Math.random()*a.length)];try{bind(o.method("Play",0),o).invoke();notify("Something moved behind you...");}catch(e){}}
onFrame(function(){if(!p.enabled)return;if(Date.now()>next){scare();var lo=Number(p.min),hi=Math.max(lo,Number(p.max));next=Date.now()+(lo+Math.random()*(hi-lo))*1000;}});
tab(function(ui){ui.text(AS?"Randomly play a loaded AudioSource.":"AudioSource class unavailable.");});