function splitter(content, pattern){
    splitted = content.split(pattern)

    return splitted
}

const originaHeader = splitter(`date time s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs(User-Agent) cs(Referer) sc-status sc-substatus sc-win32-status time-taken`, " ")

const header = splitter(`s-ip cs-uri-query c-ip sc-status time-taken`, " ")
exports.header = header 

function logToObject(log){
    let aux = new Object
    
    originaHeader.forEach((head, i)=>{
        switch(head){
            case 's-ip':
            case 'c-ip':
            case 'cs-uri-stem':
            case 'sc-status':
            case 'time-taken':
                aux[head] = log[i]
                break;
        }
    })
    
    return aux
}

function logFormatter(logFile){
    let logsBruto = splitter(logFile, "\n")
    const logs = []

    logsBruto.forEach(log =>{
        log = splitter(log, " ")

        //jumping the headers
        if(log[0][0] !== "#")
            logs.push(logToObject(log))
    })

    logs.pop()

    const filterByMethod = (e) => e['cs-uri-stem']
    let methods = logs.map(filterByMethod)
    
    //Remove repeated methods
    methods = Array.from(new Set(methods))
    
    const methodsTimes = []
    
    const sum = (accumulator, currentValue) => accumulator + currentValue;
    
    methods.forEach(method => {
        let times = []
        methodsTimes[method] = [times]
    })
    
    //calc the avarage time to each method    
    logs.forEach(log => {
        methodsTimes[log['cs-uri-stem']] ? 
            methodsTimes[log['cs-uri-stem']][0].push(+log['time-taken']) 
            : 
            methodsTimes[log['cs-uri-stem']].times = []
            
            const avarage = Number.parseFloat(methodsTimes[log['cs-uri-stem']][0]
                .reduce(sum)/methodsTimes[log['cs-uri-stem']][0].length)
                .toFixed(2);

            methodsTimes[log['cs-uri-stem']].avarage = +avarage
    })

    // avarage by method
    const avarageByMethod = {}
    methods.forEach(method => 
        avarageByMethod[method] = methodsTimes[method].avarage)

    // Clients connected to the API
    const filterByClient = (e) => e['c-ip']
    let clients = logs.map(filterByClient)

    //Remove repeated clients
    clients = Array.from(new Set(clients))

    return { logsBruto, logs, methods, methodsTimes, avarageByMethod, clients}

}

exports.logFormatter = logFormatter;