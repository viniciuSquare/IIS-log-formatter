import { useCallback, useEffect, useState } from 'react';
import { LogItem, AvarageItem } from './components/Table';

import { api } from './backend/api'

import { TableBody } from './components/StyledTable'

import 'bootstrap/dist/css/bootstrap.min.css';
import AvarageTable from './components/AvarageTable';

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyAPI = useCallback(async () => {
    let response = await api.get();
    response = await response
    
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
  } = data

  useEffect(()=> {
    fetchMyAPI()
    console.log(logs)

  }, [fetchMyAPI])
  
  return (
    <div className="App">
      {/* { console.log(avarageByMethod) } */}
      <header style={{height:"6rem", display:"flex", alignItems:"center" }} className="App-header container justify-content-between">
        <h1>SERVER: {server}</h1>
      </header>
      
      <TableBody>
        <div className="table">
          
          {/* LOGS */}
          <table>
            <thead>
              <th>Clock</th>
              <th>Method</th>
              <th>Client</th>
              <th>Response</th>
              <th>Res. time</th>
            </thead>
            <tbody>
              { !isLoading ? data.logs.map( (log, idx) => <LogItem log={log} key={idx} />) : null}
            </tbody>            
          </table>
        </div>
        
        {/* DATA PANEL */}
        <div className="clients_list">
          <div className="list">
            <h2>Clients</h2>
            <ul>
              { clients?.map(( client, idx) => <li key={idx}> {client} </li>)  }
            </ul>
          </div>
          <div >
            <h3>Total clients {clients?.length}</h3>
          </div>
        </div>
        {/* <div className="methods_avg"> */}
          {
            !isLoading 
              && <AvarageTable avarageByMethod={avarageByMethod} />
          }
        {/* </div> */}
      </TableBody>

    </div>
  );
}

export default App;
