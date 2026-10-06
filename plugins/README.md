# UniversalImgui PC Plugins

Put your UniversalImgui plugin `.js` files in this folder.

## How it works

`cmds.bat` scans this folder when you launch UniversalImgui and creates a temporary `plugin_bundle.js`. The Frida bridge loads that bundle before the menu, so the plugins are available inside the Quest game without manually copying files into the Quest's Android storage.

### Workflow

1. Put a plugin `.js` file in this folder.
2. Run `cmds.bat`.
3. Open the **Plugins** tab in UniversalImgui.
4. Your PC plugins will appear there.

The PC plugin bundle is created at launch. If you edit or add a plugin while Frida is already running, restart `cmds.bat` to send the new version.

Do not edit `plugin_bundle.js` manually. It is generated automatically.

Plugins use the normal UniversalImgui plugin API: `props`, `tab`, `onFrame`, `onDisable`, `notify`, `log`, `Il2Cpp`, and the other APIs exposed by the menu.
