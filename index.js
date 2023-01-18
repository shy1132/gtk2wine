//requires
const fs = require('fs')
const os = require('os')

//variables
var homeDir = os.homedir()
var gtkRegMappings = {
    //"ActiveBorder": "49 54 58",
    //"ActiveTitle": "49 54 58",
    //"AppWorkSpace": "60 64 72",
    "Background": "theme_base_color",
    //"ButtonAlternativeFace": "200 0 0",
    //"ButtonDkShadow": "154 154 154",
    //"ButtonFace": "49 54 58",
    //"ButtonHilight": "119 126 140",
    //"ButtonLight": "60 64 72",
    //"ButtonShadow": "60 64 72",
    //"ButtonText": "219 220 222",
    //"GradientActiveTitle": "49 54 58",
    //"GradientInactiveTitle": "49 54 58",
    //"GrayText": "155 155 155",
    "Hilight": "theme_selected_bg_color",
    "HilightText": "theme_selected_fg_color",
    //"InactiveBorder": "49 54 58",
    //"InactiveTitle": "49 54 58",
    //"InactiveTitleText": "219 220 222",
    //"InfoText": "159 167 180",
    //"InfoWindow": "49 54 58",
    //"Menu": "49 54 58",
    //"MenuBar": "49 54 58",
    //"MenuHilight": "119 126 140",
    //"MenuText": "219 220 222",
    //"Scrollbar": "73 78 88",
    "TitleText": "theme_titlebar_foreground",
    "Window": "theme_bg_color",
    //"WindowFrame": "49 54 58",
    "WindowText": "theme_text_color"
}

//code
var gtk3ThemeCss = fs.readFileSync(`${homeDir}/.config/gtk-3.0/colors.css`).toString()
var gtk3ThemeSplit = gtk3ThemeCss.split('\n')
var gtk3ThemeJSON = {}

for (let i = 0; i < gtk3ThemeSplit.length; i++) {
    gtk3ThemeSplit[i] = gtk3ThemeSplit[i].split('@define-color ')[1]

    var attribute = gtk3ThemeSplit[i].slice(0, gtk3ThemeSplit[i].lastIndexOf('_'))
    var value = gtk3ThemeSplit[i].split(' ')[1].slice(-1)

    gtk3ThemeJSON[attribute] = value
}

console.log(gtk3ThemeJSON)