plugin.category("VR");
var Physics=unityClass("UnityEngine.Physics"), GO=unityClass("UnityEngine.GameObject"), RB=unityClass("UnityEngine.Rigidbody");
var anchor=null, playerRb=null, wasGrappling=false;

var p=props([
    {type:"float",key:"range",label:"Grapple Range",min:3,max:60,default:25,decimals:0},
    {type:"float",key:"pull",label:"Pull Strength",min:1,max:200,default:35,decimals:0},
    {type:"float",key:"swing",label:"Swing Assist",min:0,max:100,default:12,decimals:0},
    {type:"float",key:"maxDistance",label:"Rope Length",min:2,max:40,default:18,decimals:0},
    {type:"float",key:"reel",label:"Reel Speed",min:0,max:10,default:2,decimals:1}
]);

function pose(){
    var h=rightHand(); if(!h)return null;
    try{
        return {
            p:vec3(bind(h.method("get_position",0),h).invoke()),
            f:vec3(bind(h.method("get_forward",0),h).invoke())
        };
    }catch(e){return null;}
}

function findPlayer(){
    if(!GO||!RB)return null;
    var names=["Player","GorillaPlayer","GorillaLocomotion","GorillaPlayerController"];
    for(var i=0;i<names.length;i++)try{
        var o=GO.method("Find",1).invoke(Il2Cpp.string(names[i]));
        if(o&&!o.isNull()){
            var rb=getComponent(o,RB);
            if(rb&&!rb.isNull())return rb;
        }
    }catch(e){}
    return null;
}

function findAnchor(q){
    if(!Physics)return null;
    try{
        var a=Physics.method("OverlapSphere",3).invoke(
            v3(q.p[0]+q.f[0]*Number(p.range),q.p[1]+q.f[1]*Number(p.range),q.p[2]+q.f[2]*Number(p.range)),
            2,-1,1
        );
        if(!a)return null;
        var best=null,bd=999999;
        for(var i=0;i<a.length;i++)try{
            var c=a.get(i);
            if(!c)continue;
            var rb=getComponent(c,RB);
            var t=c;
            try{t=bind(c.method("get_transform",0),c).invoke();}catch(e){}
            if(!t)continue;
            var pos=vec3(bind(t.method("get_position",0),t).invoke());
            if(!pos)continue;
            var d=Math.hypot(pos[0]-q.p[0],pos[1]-q.p[1],pos[2]-q.p[2]);
            if(d<bd && d<=Number(p.range)) { bd=d; best=pos; }
        }catch(e){}
        return best;
    }catch(e){return null;}
}

function clearGrapple(){
    anchor=null;
    wasGrappling=false;
}

onFrame(function(){
    var q=pose();
    if(!q)return;

    var pressed=!!trigger();

    if(pressed&&!wasGrappling){
        anchor=findAnchor(q);
        playerRb=findPlayer();
        if(anchor&&playerRb)notify("WEB ATTACHED");
        else {anchor=null;playerRb=null;}
    }

    if(!pressed&&wasGrappling){
        clearGrapple();
    }

    wasGrappling=pressed;

    if(!anchor||!playerRb)return;

    try{
        var pp=vec3(bind(playerRb.method("get_position",0),playerRb).invoke());
        var vm=bind(playerRb.method("get_velocity",0),playerRb);
        var vel=vm?vec3(vm.invoke()):[0,0,0];

        var dx=anchor[0]-pp[0],dy=anchor[1]-pp[1],dz=anchor[2]-pp[2];
        var dist=Math.sqrt(dx*dx+dy*dy+dz*dz)||0.001;
        var nx=dx/dist,ny=dy/dist,nz=dz/dist;

        // Spider-Man style: pull toward the web point, but preserve sideways
        // velocity so the player can arc and swing instead of being vacuumed in.
        var radialVel=vel[0]*nx+vel[1]*ny+vel[2]*nz;
        var targetLength=Number(p.maxDistance);

        if(dist>targetLength){
            var stretch=dist-targetLength;
            var strength=Number(p.pull)*stretch;
            bind(playerRb.method("AddForce",2),playerRb).invoke(
                v3(nx*strength,ny*strength,nz*strength),5
            );
        }else{
            var strength=Math.min(Number(p.pull),dist*Number(p.pull)*0.15);
            bind(playerRb.method("AddForce",2),playerRb).invoke(
                v3(nx*strength,ny*strength,nz*strength),5
            );
        }

        // Remove some outward velocity. Tangential velocity stays, creating the swing.
        if(radialVel>0){
            var damp=Math.min(radialVel,Number(p.swing));
            bind(playerRb.method("AddForce",2),playerRb).invoke(
                v3(-nx*damp,-ny*damp,-nz*damp),5
            );
        }

        // Optional reel-in while grappling.
        if(Number(p.reel)>0 && dist>3){
            var reel=Number(p.reel)*10;
            bind(playerRb.method("AddForce",2),playerRb).invoke(
                v3(nx*reel,ny*reel,nz*reel),5
            );
        }
    }catch(e){
        log("Grapple: "+e);
        clearGrapple();
    }
});

tab(function(ui){
    ui.text("Spider-Man style web grapple.");
    ui.text("Hold trigger to attach to a world point and swing toward it.");
    ui.text("Release trigger to let go.");
});

onDisable(function(){
    clearGrapple();
    playerRb=null;
});