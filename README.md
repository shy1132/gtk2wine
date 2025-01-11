# gtk2wine

simple utility that converts kde gtk theme to a .reg file for use with theming wine to fit in with other applications  
this requires the use of a javascript runtime such as node.js or bun, install either of those two and run `(runtime) index.js`

to apply the output.reg file to wine, you simply run this: `wine regedit output.reg` in the current directory  
you may need to retry that command several times, i'm not sure why
