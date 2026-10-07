// UniversalImgui plugin: VR physics hand
plugin.category("Physics");

var Physics = null;
var raycastAll = null;
var Rigidbody = null;
var addForce = null;
var held = null;
var heldDistance = 0;
var lastTrigger = false;

try {
    var physAsm = Il2Cpp.domain.assembly("UnityEngine.PhysicsModule");
    Physics = physAsm.image.class("UnityEngine.Physics");
    Rigidbody = physAsm.image.class("UnityEngine.Rigidbody");
    // Vector3 origin/direction overload: origin, direction, maxDistance, layerMask, queryTriggerInteraction.
    raycastAll = Physics.method("RaycastAll", 5);
} catch (e) {
    log("Physics Hand: could not load Unity physics: " + e);
}

var p = props([
    { type: "float", key: "range", label: "Range", min: 2, max: 30, default: 15, decimals: 1 },
    { type: "float", key: "force", label: "Pull Force", min: 5, max: 200, default: 60, decimals: 0 },
    { type: "float", key: "damping", label: "Damping", min: 0, max: 30, default: 8, decimals: 1 },
    { type: "float", key: "distance", label: "Hold Distance", min: 0.5, max: 12, default: 4, decimals: 1 },
    { type: "float", key: "throw", label: "Throw Boost", min: 0, max: 5, default: 1, decimals: 1 },
    { type: "button", label: "Release Object", onClick: function () {
        held = null;
        notify("Physics Hand released");
    } }
]);

function getHandPose() {
    var hand = rightHand();
    if (!hand) return null;

    try {
        var pm = bind(hand.method("get_position", 0), hand);
        var fm = bind(hand.method("get_forward", 0), hand);
        if (!pm || !fm) return null;

        var pos = pm.invoke();
        var forward = fm.invoke();
        var p3 = vec3(pos);
        var f3 = vec3(forward);
        if (!p3 || !f3) return null;

        return { hand: hand, pos: p3, forward: f3 };
    } catch (e) {
        return null;
    }
}

function findRigidBody() {
    if (!raycastAll) return null;

    var pose = getHandPose();
    if (!pose) return null;

    try {
        var hits = raycastAll.invoke(
            v3(pose.pos[0], pose.pos[1], pose.pos[2]),
            v3(pose.forward[0], pose.forward[1], pose.forward[2]),
            Number(p.range),
            -1,
            1
        );

        if (!hits) return null;

        var best = null;
        var bestDistance = 999999;

        for (var i = 0; i < hits.length; i++) {
            try {
                var hit = hits.get(i);
                var collider = hit.method("get_collider", 0).invoke();
                if (!collider || collider.isNull()) continue;

                var rbMethod = collider.method("get_attachedRigidbody", 0);
                var rb = rbMethod.invoke();
                if (!rb || rb.isNull()) continue;

                var kin = bind(rb.method("get_isKinematic", 0), rb);
                if (kin && !!kin.invoke()) continue;

                var dist = 0;
                try { dist = Number(hit.method("get_distance", 0).invoke()); } catch (e) {}
                if (dist < bestDistance) {
                    bestDistance = dist;
                    best = rb;
                }
            } catch (e) {}
        }

        if (best) {
            heldDistance = Math.max(0.5, Math.min(Number(p.range), Number(p.distance)));
            return best;
        }
    } catch (e) {
        log("Physics Hand raycast failed: " + e);
    }

    return null;
}

function applyPhysicsGun(rb) {
    var pose = getHandPose();
    if (!pose || !rb) return false;

    try {
        var targetDistance = Math.max(0.5, Math.min(Number(p.range), Number(p.distance)));
        var target = [
            pose.pos[0] + pose.forward[0] * targetDistance,
            pose.pos[1] + pose.forward[1] * targetDistance,
            pose.pos[2] + pose.forward[2] * targetDistance
        ];

        var pm = bind(rb.method("get_position", 0), rb);
        var vm = bind(rb.method("get_velocity", 0), rb);
        var forceMethod = bind(rb.method("AddForce", 2), rb);
        if (!pm || !forceMethod) return false;

        var pos = vec3(pm.invoke());
        if (!pos) return false;

        var vx = 0, vy = 0, vz = 0;
        if (vm) {
            var vel = vec3(vm.invoke());
            if (vel) {
                vx = vel[0];
                vy = vel[1];
                vz = vel[2];
            }
        }

        var fx = (target[0] - pos[0]) * Number(p.force) - vx * Number(p.damping);
        var fy = (target[1] - pos[1]) * Number(p.force) - vy * Number(p.damping);
        var fz = (target[2] - pos[2]) * Number(p.force) - vz * Number(p.damping);

        // ForceMode.Acceleration = 5, so mass does not make the gun feel weak.
        forceMethod.invoke(v3(fx, fy, fz), 5);
        return true;
    } catch (e) {
        log("Physics Hand force failed: " + e);
        held = null;
        return false;
    }
}

onFrame(function () {
    var pressed = !!trigger();

    if (pressed && !lastTrigger && !held) {
        held = findRigidBody();
        if (held) notify("Physics Hand grabbed object");
    }

    if (!pressed && lastTrigger) {
        held = null;
    }

    lastTrigger = pressed;

    if (held) {
        if (!applyPhysicsGun(held)) held = null;
    }
});

tab(function (ui) {
    ui.text("Right-hand VR physics gun.");
    ui.text("Point at a Rigidbody and hold trigger to pull it.");
    ui.text("Release trigger to let it fly.");
});

onDisable(function () {
    held = null;
    lastTrigger = false;
});

log("Physics Hand loaded.");
