# HOW TO USE!
click download zip, like the shown image
<img width="408" height="370" alt="image" src="https://github.com/user-attachments/assets/91ea7011-197c-4ed3-9697-e875459d244b" />
extract it, connect ur headser via adb, change the cmds.bat by changing the process name in there to yours. (EX: "Game 123") 
run the bat file
you just got the menu


## PC plugins

UniversalImgui loads plugins from the repository `plugins` folder when launched with `cmds.bat`. The launcher bundles every `.js` file in that folder and sends it through the Frida bridge, so you do not need to manually copy plugin files into the Quest. Restart `cmds.bat` after adding or editing a plugin. See `plugins/README.md` for details.
