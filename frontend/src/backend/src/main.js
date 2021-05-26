const fs = require("fs")
const { logFormatter } = require('./logFormatter')

//LOG FILE PATH
const path = "/Users/square/development/JS/IIS-log-formatter/frontend/src/backend/src/data/data3.txt"
const conteudo = fs.readFileSync(path, 'utf-8')

// destruct variables returned by the function
const logData = logFormatter(conteudo)

// Exporting data
    // fs.writeFileSync('./text.txt', JSON.stringify(logsBruto, null, 2))

exports.logData = logData;