plugin.category("Horror");
var GO=unityClass("UnityEngine.GameObject"),last="";
var p=props([{type:"bool",key:"enabled",label:"Tracker",default:true},{type:"text",key:"keyword",label:"Keyword",default:"enemy"},{type:"float",key:"interval",label:"Interval",min:.2,max:5,default:1,decimals:1}]),next=0;
onFrame(function(){if(!p.enabled||Date.now()<next||!GO)return;next=Date.now()+Number(p.interval)*1000;try{var o=GO.method("Find",1).invoke(Il2Cpp.string(String(p.keyword)));if(o&&!o.isNull()){var s=bind(o.method("get_name",0),o).invoke(),n=String(s?s.content:"");if(n!==last){last=n;notify("Entity found: "+n);}}}catch(e){}});
tab(function(ui){ui.text(GO?"Find a GameObject by exact name.":"GameObject class unavailable.");});