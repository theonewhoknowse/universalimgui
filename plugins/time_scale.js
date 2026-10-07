// UniversalImgui plugin: game Time.timeScale control

var timeScale = null;
try {
    var Time = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image.class("UnityEngine.Time");
    timeScale = Time.method("set_timeScale", 1);
} catch (e) {
    log("Time Scale plugin: could not find UnityEngine.Time.set_timeScale: " + e);
}

var p = props([
    {
        type: "float",
        key: "scale",
        label: "Game Speed",
        min: 0.1,
        max: 3.0,
        default: 1.0,
        decimals: 1,
        desc: "Changes Unity Time.timeScale. 1.0 is normal speed."
    },
    {
        type: "button",
        label: "Reset to 1.0x",
        onClick: function () {
            p.scale = 1.0;
            if (timeScale) {
                try { timeScale.invoke(1.0); } catch (e) { log("Time Scale reset failed: " + e); }
            }
            notify("Game speed reset to 1.0x");
        }
    }
]);

onFrame(function () {
    if (!timeScale) return;

    var v = Math.round(Number(p.scale) * 10) / 10;
    if (v < 0.1) v = 0.1;
    if (v > 3.0) v = 3.0;
    p.scale = v;

    try {
        timeScale.invoke(v);
    } catch (e) {
        log("Time Scale apply failed: " + e);
    }
});

tab(function (ui) {
    ui.text("Change Unity Time.timeScale.");
    ui.text("1.0x = normal speed");
    ui.text("0.1x = slowest");
    ui.text("3.0x = fastest");
});

onDisable(function () {
    if (timeScale) {
        try { timeScale.invoke(1.0); } catch (e) {}
    }
    log("Time Scale plugin disabled. Restored 1.0x.");
});

log("Time Scale plugin loaded.");
