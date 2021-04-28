const fs = require("fs")
const { logFormatter } = require('./logFormatter')

//log file path
const path = "./data/data.txt"
const conteudo = fs.readFileSync(path, 'utf-8')

//destruct variables returned by the function
const {logs, methods, methodsTimes, byTime, avarageByMethod, clients} = logFormatter(conteudo)

// Exporting data
    // fs.writeFileSync('./text.txt', JSON.stringify(byTime, null, 2))
    console.log(methodsTimes)

exports.logs = logs
exports.methods = avarageByMethod