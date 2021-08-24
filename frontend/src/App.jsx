import { useCallback, useEffect, useState } from 'react';

import { api } from './backend/api'

import { TableBody } from './components/StyledTable'

import AvarageTable from './components/AvarageTable';

import { Spinner } from 'react-bootstrap'
import LogsTable from './components/LogsTable';

function App() {
  const [data, setData] = useState({});
  const [logData, setLogData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  const defaultFilter = { state : false, applied : "all" }
  const [filter, setFilter] = useState(defaultFilter);

  const fetchMyAPI = useCallback(async () => {
    let response = await api.get();

    setData(response.data.logData)
    
    setIsLoading(false)
    
  }, [])

  let { 
    logs, 
    byTime, 
    methods, 
    methodsTimes, 
    avarageByMethod, 
    clients,
    operationsByClient,
    server
  } = data;

  useEffect(()=> {
    fetchMyAPI()

    setLogData(logs)
    setFilter(defaultFilter)
    
  }, [fetchMyAPI])

  useEffect(() => {
    const {logs} = data
    console.log(logs)

    setLogData(logs);
  }, [data])

  function filterLogsByIp(ip) {
    let filteredValue = {}
    
    if( filter.state ){
      if(filter.applied == ip) {
        // TURN OFF THE FILTER
        setFilter({state : false,
          applied : "all"
        })
        
        setLogData(logs);
        
      } else {
        filteredValue = logs.filter( log => log["c-ip"] == ip  )
        setFilter({ state: true,
          applied : ip
        })
        
        setLogData(filteredValue);
      }
    } else {

      filteredValue = logs.filter( log => log["c-ip"] == ip  )
      setFilter({ state: true,
        applied : ip
      })
      
      setLogData(filteredValue);
    }
  }

  const Body = () => {
    return(
      <div className="App">
        <header 
          style={{height:"6rem", display:"flex", alignItems:"center" }} 
          className="App-header container justify-content-between"
        >
          <h1>SERVER: {server}</h1>
          {
            filter.state ? 
              <p>filtered by <strong>{filter.applied}</strong></p>
            : null
          }

        </header>
        
        <TableBody className="container">
          {/* LOGS */}
          <div className="table">
            <LogsTable dataLogs={ logData }/>            
          </div>
          
          {/* DATA PANEL */}
          <div className="clients_list ">
            <div className="list">
              <h2>Clients</h2>
              <ul>
                { 
                  clients?.map(( client, idx) => {
                    return( 
                      <div className="client-list-item d-flex" >
                        <li 
                          className="mx-4"
                          key={idx}
                        > {client} </li>
                        <button
                          onClick={() => filterLogsByIp(client)}
                        > filter </button>
                      </div>
                    )
                  })
                }
              </ul>
            </div>
            <div >
              <h3>Total clients {clients?.length}</h3>
            </div>
            
            <AvarageTable avarageByMethod={avarageByMethod} />  
          </div>
        </TableBody>
      </div>
    )
  }
  
  return (
    isLoading ? (
      <Spinner 
        animation="border" role="status"
      >
        <span className="sr-only"></span>
      </Spinner>
    ) : (
      <Body/>
    )
  )
}

export default App;
