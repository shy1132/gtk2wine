//requires
const fs = require('fs')
const os = require('os')

//variables
var homeDir = os.homedir()
var gtkRegMappings = {
    "ActiveBorder": "",
    "ActiveTitle": "",
    "AppWorkSpace": "",
    "Background": "theme_base_color",
    "ButtonAlternativeFace": "",
    "ButtonDkShadow": "",
    "ButtonFace": "",
    "ButtonHilight": "",
    "ButtonLight": "",
    "ButtonShadow": "",
    "ButtonText": "",
    "GradientActiveTitle": "",
    "GradientInactiveTitle": "",
    "GrayText": "",
    "Hilight": "theme_selected_bg_color",
    "HilightText": "theme_selected_fg_color",
    "InactiveBorder": "",
    "InactiveTitle": "",
    "InactiveTitleText": "",
    "InfoText": "",
    "InfoWindow": "",
    "Menu": "",
    "MenuBar": "",
    "MenuHilight": "",
    "MenuText": "",
    "Scrollbar": "",
    "TitleText": "theme_titlebar_foreground",
    "Window": "theme_bg_color",
    "WindowFrame": "",
    "WindowText": "theme_text_color"
}

//code
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
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

    regFile += `\r\n"${winAttribute}":"${gtkAttributeValue}"`
}

fs.writeFileSync('./output.reg', regFile)
console.log('saved to output.reg')