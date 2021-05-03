const fs = require("fs")
const { logFormatter } = require('./logFormatter')

//log file path
const path = "./data/data3.txt"
const conteudo = fs.readFileSync(path, 'utf-8')

// destruct variables returned by the function
const logData = logFormatter(conteudo)
console.log(logData.clients.length)

// Exporting data
    // fs.writeFileSync('./text.txt', JSON.stringify(logsBruto, null, 2))

exports.logData = logData;