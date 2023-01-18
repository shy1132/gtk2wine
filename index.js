//requires
const fs = require('fs')

//code
var gtk3Theme = fs.readFileSync('~/.config/gtk-3.0/colors.css')

console.log(gtk3Theme)