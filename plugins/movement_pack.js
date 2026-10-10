plugin.category("VR");

var RB = unityClass("UnityEngine.Rigidbody");
var Physics = unityClass("UnityEngine.Physics");
var p = props([
    {type:"bool",key:"flight",label:"Hand Flight",default:false},
    {type:"float",key:"flightForce",label:"Flight Force",min:1,max:80,default:18,decimals:0},
    {type:"float",key:"dashForce",label:"Dash Force",min:1,max:80,default:22,decimals:0},
    {type:"float",key:"jumpForce",label:"Jump Force",min:1,max:80,default:16,decimals:0},
    {type:"button",label:"Dash Forward",onClick:function(){dash();}},
    {type:"button",label:"Jump",onClick:function(){jump();}}
]);

function getPlayerRb() {
    if (!RB) return null;
    // Prefer the known Gorilla-style hierarchy: right hand -> parent -> Rigidbody.
    try {
        var h = rightHand();
        if (h) {
            var parent = bind(h.method("get_parent",0),h).invoke();
            if (parent && !parent.isNull()) {
                var rb = getComponent(parent,RB);
                if (rb && !rb.isNull()) return rb;
                var go = bind(parent.method("get_gameObject",0),parent).invoke();
                rb = getComponent(go,RB);
                if (rb && !rb.isNull()) return rb;
            }
        }
    } catch(e) {}

    var GO = unityClass("UnityEngine.GameObject");
    if (!GO) return null;
    for (var name of ["Player","GorillaPlayer","GorillaLocomotion"]) {
        try {
            var obj = GO.method("Find",1).invoke(Il2Cpp.string(name));
            if (obj && !obj.isNull()) {
                var found = getComponent(obj,RB);
                if (found && !found.isNull()) return found;
            }
        } catch(e) {}
    }
    return null;
}

function handForward() {
    try {
        var h = rightHand();
        if (!h) return null;
        return vec3(bind(h.method("get_forward",0),h).invoke());
    } catch(e) { return null; }
}

function applyForce(x,y,z,mode) {
    var rb = getPlayerRb();
    if (!rb) { notify("Player Rigidbody not found"); return false; }
    try {
        bind(rb.method("AddForce",2),rb).invoke(v3(x,y,z),mode === undefined ? 2 : mode);
        return true;
    } catch(e) {
        log("Movement Pack: "+e);
        return false;
    }
}

function dash() {
    var f = handForward();
    if (!f) { notify("Right hand pose unavailable"); return; }
    if (applyForce(f[0]*Number(p.dashForce),f[1]*Number(p.dashForce),f[2]*Number(p.dashForce),2)) {
        notify("DASH!");
    }
}

function jump() {
    if (applyForce(0,Number(p.jumpForce),0,2)) notify("JUMP!");
}

onFrame(function() {
    if (!p.flight) return;
    var f = handForward();
    if (!f) return;
    applyForce(-f[0]*Number(p.flightForce),-f[1]*Number(p.flightForce),-f[2]*Number(p.flightForce),5);
});

tab(function(ui) {
    ui.text("Extra movement controls for VR games.");
    ui.text("Hand Flight pushes the player opposite your right palm.");
    ui.text("Point your palm where you want to move, then enable flight.");
    ui.text("Dash and Jump apply one-shot Rigidbody impulses.");
});

onDisable(function() {});
