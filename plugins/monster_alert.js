plugin.category("Horror");
var GO=unityClass("UnityEngine.GameObject"),next=0,last="";
var p=props([{type:"bool",key:"enabled",label:"Alert",default:true},{type:"float",key:"interval",label:"Check Interval",min:.2,max:5,default:1,decimals:1}]);
onFrame(function(){if(!p.enabled||Date.now()<next||!GO)return;next=Date.now()+Number(p.interval)*1000;var f=GO.method("Find",1);if(!f)return;var names=["Enemy","Monster","MonsterAI","EnemyAI"];for(var i=0;i<names.length;i++)try{var o=f.invoke(Il2Cpp.string(names[i]));if(o&&!o.isNull()){if(last!==names[i]){last=names[i];notify("MONSTER DETECTED: "+names[i]);}break;}}catch(e){}});
tab(function(ui){ui.text(GO?"Looks for common enemy GameObject names.":"GameObject class unavailable.");});