// UniversalImgui plugin: simple real-time FPS monitor
var frames = 0, last = Date.now(), fps = 0;
onFrame(function () {
    frames++;
    var now = Date.now();
    if (now - last >= 500) {
        fps = frames * 1000 / (now - last);
        frames = 0;
        last = now;
    }
});
tab(function (ui) {
    ui.text("FPS: " + fps.toFixed(1));
    ui.text("Uses real wall-clock time, so it still updates during slow motion.");
});
