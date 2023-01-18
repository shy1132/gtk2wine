//requires
const fs = require('fs')
const os = require('os')

//variables
var homeDir = os.homedir()
var gtkRegMappings = {
    
}

//code
var gtk3ThemeCss = fs.readFileSync(`${homeDir}/.config/gtk-3.0/colors.css`).toString()
var gtk3ThemeSplit = gtk3ThemeCss.split('\n')
var gtk3ThemeParsed = {}
for (let i = 0; i < gtk3ThemeSplit.length; i++) {
    
}

console.log(gtk3ThemeParsed)