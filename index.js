//requires
const fs = require('fs')
const os = require('os')

//variables
var homeDir = os.homedir()
var gtkRegMappings = {
    "ActiveBorder": "theme_bg_color",
    "ActiveTitle": "theme_bg_color",
    "AppWorkSpace": "60 64 72",
    "Background": "theme_base_color",
    "ButtonAlternateFace": "theme_button_background_normal",
    "ButtonDkShadow": "borders",
    "ButtonFace": "theme_bg_color",
    "ButtonHilight": "borders",
    "ButtonLight": "theme_button_background_normal",
    "ButtonShadow": "theme_bg_color",
    "ButtonText": "theme_button_foreground_normal",
    "GradientActiveTitle": "theme_bg_color",
    "GradientInactiveTitle": "theme_bg_color",
    "GrayText": "128 128 128",
    "Hilight": "theme_selected_bg_color",
    "HilightText": "theme_selected_fg_color",
    "HotTrackingColor": "0 0 200",
    "InactiveBorder": "theme_bg_color",
    "InactiveTitle": "theme_bg_color",
    "InactiveTitleText": "theme_unfocused_text_color",
    "InfoText": "theme_text_color",
    "InfoWindow": "theme_bg_color",
    "Menu": "theme_bg_color",
    "MenuBar": "theme_bg_color",
    "MenuHilight": "theme_selected_bg_color",
    "MenuText": "theme_text_color",
    "Scrollbar": "73 78 88",
    "TitleText": "theme_titlebar_foreground",
    "Window": "theme_bg_color",
    "WindowFrame": "theme_bg_color",
    "WindowText": "theme_text_color"
}

//code
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
}

var gtk3ThemeCss = fs.readFileSync(`${homeDir}/.config/gtk-3.0/colors.css`).toString().trim().split('\n')
var gtk3ThemeJSON = {}
var regFile = `Windows Registry Editor Version 5.00\r\n\r\n[HKEY_CURRENT_USER\\Control Panel\\Colors]`

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
    var gtkAttributeValue = !gtkAttribute.includes(' ') ? hexToRgb(gtk3ThemeJSON[gtkAttribute]) : gtkAttribute

    regFile += `\r\n"${winAttribute}"="${gtkAttributeValue}"`
}

regFile += '\r\n\r\n'

fs.writeFileSync('./output.reg', '\uFEFF'+regFile, 'utf16le')
console.log('saved to output.reg')