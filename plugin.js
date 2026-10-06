// UniversalImgui game-independent plugin smoke test

var state = {
    enabled: true,
    counter: 0,
    clicks: 0,
    mode: "Normal"
};

var p = props([
    {
        type: "bool",
        key: "enabled",
        label: "Enabled",
        default: true,
        desc: "Toggle the plugin's runtime test."
    },
    {
        type: "select",
        key: "mode",
        label: "Mode",
        options: ["Normal", "Fast", "Insane"],
        default: "Normal"
    },
    {
        type: "button",
        label: "Test Notification",
        onClick: function () {
            state.clicks++;
            notify("Universal test works! Clicks: " + state.clicks);
        }
    },
    {
        type: "button",
        label: "Reset Counter",
        onClick: function () {
            state.counter = 0;
            state.clicks = 0;
            notify("Test counters reset.");
        }
    }
]);

onFrame(function () {
    if (!p.enabled) return;

    var step = p.mode === "Insane" ? 3 : (p.mode === "Fast" ? 2 : 1);
    state.counter += step;
});

tab(function (ui) {
    ui.text("UniversalImgui Plugin Test");
    ui.text("Loaded successfully.");
    ui.text("Frame counter: " + state.counter);
    ui.text("Button clicks: " + state.clicks);
    ui.text("Mode: " + p.mode);
});

onDisable(function () {
    state.enabled = false;
    log("Universal test plugin disabled. Cleanup callback ran.");
});

log("Universal test plugin loaded.");
