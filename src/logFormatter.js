function splitter(content, pattern){
    splitted = content.split(pattern)

    return splitted
}

const originaHeader = splitter(`date time s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs(User-Agent) cs(Referer) sc-status sc-substatus sc-win32-status time-taken`, " ")
const formatTime = time => {
    time = splitter(time, ':')
    if(time[0] == '02')
        time[0] = '23'
    else if( time[0] == '01' )
        time[0] = '22'
    else if( time[0] == '00' )
        time[0] = '21'
    else
        time[0] = time[0]-3 
    return time.join(':')
}

function logToObject(log){
    let aux = new Object
    
    originaHeader.forEach((head, i)=>{
        switch(head){
            case 'time':
                aux[head] = formatTime(log[i])
                break;
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

// const header = splitter(`s-ip cs-uri-query c-ip sc-status time-taken`, " ")

// Filter rules and operations  
const filterByMethod = (e) => e['cs-uri-stem']
const filterClients = (e) => e['c-ip']

const sum = (accumulator, currentValue) => accumulator + currentValue;
const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});

function logFormatter(logFile){
    let logsBruto = splitter(logFile, "\n")
    const logs = []

    logsBruto.forEach(log =>{
        log = splitter(log, " ")

        //jumping the headers
        switch(log[0][0]){
            case("#"):
                break;
            
            default:
                logs.push(logToObject(log))
                break;

        }
    })
    logs.pop()

// Filter methods
    let methods = logs.map(filterByMethod)
    
    //Remove repeated methods
    methods = Array.from(new Set(methods))
    
    const methodsTimes = []   
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

// Clients
    // Connected to the API
    let clients = logs.map(filterClients)

    //Remove repeated clients
    clients = Array.from(new Set(clients))

    // Methods / client
    const operationsClient = groupBy('c-ip')(logs)

    // ['172.168.3.46'].map(ops => ops['cs-uri-stem'] == '/v1/finalizarVenda'))

    //times

    console.log(logs)
    const header = Object.keys(logs[0])
    return { logsBruto, logs, methods, methodsTimes, avarageByMethod, clients, header}

}
exports.logFormatter = logFormatter;