var fs = require('fs')
var dir = fs.readFileSync('./Hard/dir.txt','utf8')
var file = fs.readFileSync('./Hard/file.txt', 'utf8')
module.exports={
    
    verbose : true,
    "reporters": [
        "default",
        ["./node_modules/jest-allresult-csv-reporter",{"outputDir":dir,"outputFile":file}]
      ]
}