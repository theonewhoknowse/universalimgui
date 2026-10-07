// UniversalImgui plugin: real-time clock
tab(function (ui) {
    var d = new Date();
    ui.text("Local time: " + d.toLocaleTimeString());
    ui.text("Date: " + d.toLocaleDateString());
    ui.text("This uses your device clock.");
});
