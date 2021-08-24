const fs = require("fs")
const { logFormatter } = require('./tools/logFormatter')

//LOG FILE PATH
const dirPath = "/Users/square/development/JS/IIS-log-formatter/backend/src/data"
const files = fs.readdirSync(dirPath)
// const files = [ '24-10.txt' ] 

if(files.indexOf('.DS_Store') != -1)
    files.shift()

let conteudo = logFormatter(fs.readFileSync(`${dirPath}/${files[1]}`, 'utf-8'))

console.log(files)

exports.logData = conteudo;