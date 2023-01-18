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
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

var gtk3ThemeCss = fs.readFileSync(`${homeDir}/.config/gtk-3.0/colors.css`).toString().trim().split('\n')
var gtk3ThemeJSON = {}
var regFile = `Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\\Control Panel\\Colors]`

for (let i = 0; i < gtk3ThemeCss.length; i++) {
    gtk3ThemeCss[i] = gtk3ThemeCss[i].split('@define-color ')[1]

    var attribute = gtk3ThemeCss[i].slice(0, gtk3ThemeCss[i].lastIndexOf('_'))
    var value = gtk3ThemeCss[i].split(' ')[1].slice(1, -1)

    gtk3ThemeJSON[attribute] = value
}

var regMappingsArr = Object.keys(gtkRegMappings)

for (let i = 0; i < regMappingsArr.length; i++) {
    var winAttribute = regMappingsArr[i]
    var gtkAttribute = gtkRegMappings[winAttribute]
    var gtkAttributeValue = hexToRgb(gtk3ThemeJSON[gtkAttribute])

    regFile += `\n"${winAttribute}":"${gtkAttributeValue}"`
}

fs.writeFileSync('./output.reg', regFile)
console.log('saved to output.reg')