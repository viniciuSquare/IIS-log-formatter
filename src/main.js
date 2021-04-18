const fs = require("fs")
const { logFormatter } = require('./logFormatter')

//log file path
const path = "./data/data.txt"
const conteudo = fs.readFileSync(path, 'utf-8')

//destruct variables returned by the function
const {logs, methods, methodsTimes, avarageByMethod, clients} = logFormatter(conteudo)

// console.log(logs)
// console.log(avarageByMethod)

exports.logs = logs
exports.methods = avarageByMethod