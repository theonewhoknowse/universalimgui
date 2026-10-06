// Example PC-side UniversalImgui plugin
var p = props([
    { type: "bool", key: "enabled", label: "Enabled", default: true },
    { type: "select", key: "mode", label: "Mode", options: ["Normal", "Fast", "Insane"], default: "Normal" },
    { type: "button", label: "Test Notification", onClick: function () {
        notify("PC plugin works!");
    } }
]);

onFrame(function () {
    if (!p.enabled) return;
});

tab(function (ui) {
    ui.text("PC-side plugin loaded.");
    ui.text("Mode: " + p.mode);
});

onDisable(function () {
    log("Example PC plugin disabled.");
});

log("Example PC plugin loaded.");
