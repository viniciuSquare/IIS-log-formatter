function splitter(content, pattern){
  return content.split(pattern)
}

const getHeader = (log) => {
  let header
  while(!header)  {
    if(log.indexOf("Fields") != (-1) ){
      header = log.substr(9)
    }
  }
  return header
}

const logToObject = (logLine, header) => {
  let log = splitter(logLine, ' ');
  let aux = new Object
  
  header.forEach((head, i)=>{
      switch(head){
          case 'time':
              log[i] ? aux[head] = formatTime(log[i]) : ''
              break;
          // case 's-ip':
          case 'c-ip':
            aux.client = log[i]
            break;

          case 'cs-uri-stem':
            aux.method = log[i]
            break;

          case 'sc-status':
            aux.status = log[i]
            break;

          case 'time-taken':          
            aux.timeTaken = log[i]
            break;
      }
  })
  
  return aux
}

const setOf = (data, key) => {
  const filterData = e => e[key]
  
  let filteredArray = data.map(filterData)

  let setOfFilteredArray = Array.from(new Set(filteredArray))
  
  return setOfFilteredArray;
}

// TODO
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

const sumReducer = (accumulator, currentValue) => accumulator + currentValue;

class LogFormatter {
  constructor(originalLogsData) {
    this.bruto = splitter(originalLogsData, "\n");
    this.logs = []
    this.clients = []
    this.methods = []
    this.methodsTimes = {}

    this.logLinesIntoObjects()
  }
  
  logLinesIntoObjects() {
    this.bruto.forEach( logLine => {

      if(logLine[0] != "#") {
        let log = logToObject(logLine, this.header);
        this.logs.push(log)
        
        // CONNECTED SERVER'S IP
        if(!this.server) { 
          let serverIndex = this.header.indexOf("s-ip");
          this.server = logLine.split(' ')[serverIndex]
        }

        // CLIENTS 
        if(this.clients.indexOf(log.client) == (-1)){
          this.clients.push(log.client)
        }

        // METHODS
        if(this.methods.indexOf(log.method) == (-1)){
          this.methods.push(log.method)
          this.methodsTimes[log.method] = {}
          this.methodsTimes[log.method] = []
          this.methodsTimes[log.method].push(+log.timeTaken)

        } else {
          this.methodsTimes[log.method].push(+log.timeTaken)

        }

      } else if (logLine.indexOf("Fields") != (-1) )        
        // LOG FILE HEADER
        this.header = splitter(logLine.substr(9), " ");

    })
    this.avarageTime();
  }

  avarageTime = ( ) => {
    this.methodsAvarageTime = {}
    this.methods.forEach( method => {
      this.methodsAvarageTime[method] = this.methodsTimes[method].reduce(sumReducer)/this.methodsTimes[method].length;
    })
  }
}

let completeLogsData = `#Software: Microsoft Internet Information Services 8.5
#Version: 1.0
#Date: 2021-07-24 00:08:52
#Fields: date time s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs(User-Agent) cs(Referer) sc-status sc-substatus sc-win32-status time-taken
2021-07-24 00:08:52 172.168.1.10 POST /v1/ConsultarPedido - 1586 - 172.168.3.50 Mozilla/5.0+(Linux;+Android+11;+moto+g(9)+Build/RPX31.Q2-58-16;+wv)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Version/4.0+Chrome/91.0.4472.120+Mobile+Safari/537.36 - 200 0 0 312
2021-07-24 00:08:52 172.168.1.10 GET /v2/ProdutoCategoriaProduto codigoBarrasCartao=3183729862&pdv=3036 1586 - 172.168.3.50 Mozilla/5.0+(Linux;+Android+11;+moto+g(9)+Build/RPX31.Q2-58-16;+wv)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Version/4.0+Chrome/91.0.4472.120+Mobile+Safari/537.36 - 200 0 0 171
2021-07-24 00:08:59 172.168.1.10 POST /v1/GetMesaCodigo - 1586 - 172.168.3.50 Mozilla/5.0+(Linux;+Android+11;+moto+g(9)+Build/RPX31.Q2-58-16;+wv)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Version/4.0+Chrome/91.0.4472.120+Mobile+Safari/537.36 - 200 0 0 78
2021-07-24 00:08:59 172.168.1.10 POST /v1/GetMesaCodigo - 1586 - 172.168.3.50 Mozilla/5.0+(Linux;+Android+11;+moto+g(9)+Build/RPX31.Q2-58-16;+wv)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Version/4.0+Chrome/91.0.4472.120+Mobile+Safari/537.36 - 200 0 0 93
2021-07-24 00:09:00 172.168.1.10 POST /v1/finalizarVenda - 1586 - 172.168.3.50 Mozilla/5.0+(Linux;+Android+11;+moto+g(9)+Build/RPX31.Q2-58-16;+wv)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Version/4.0+Chrome/91.0.4472.120+Mobile+Safari/537.36 - 201 0 0 546
2021-07-24 00:09:02 172.168.1.10 HEAD /v1/ValidarToken - 1586 - 172.168.3.50 Mozilla/5.0+(Linux;+Android+11;+moto+g(9)+Build/RPX31.Q2-58-16;+wv)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Version/4.0+Chrome/91.0.4472.120+Mobile+Safari/537.36 - 200 0 0 140
2021-07-24 00:09:56 172.168.1.10 POST /v1/ConsultarPedido - 1586 - 172.168.3.50 Mozilla/5.0+(Linux;+Android+11;+moto+g(9)+Build/RPX31.Q2-58-16;+wv)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Version/4.0+Chrome/91.0.4472.120+Mobile+Safari/537.36 - 200 0 0 265`

const logs = new LogFormatter(completeLogsData)
// console.log(logs)

