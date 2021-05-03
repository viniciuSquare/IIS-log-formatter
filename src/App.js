import { useCallback, useEffect, useState } from 'react';
import './App.css';
import LogItem from './components/Table';

import { api } from './utils/api'

import {TableBody} from './components/StyledTable'

function App() {
  const [data, setData] = useState({});

  const fetchMyAPI = useCallback(async () => {
    let response = await api.get();
    response = await response
    
    setData(response.data.logData)
    
  }, [])

  useEffect(()=> {
    fetchMyAPI()

  }, [fetchMyAPI])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hey there</h1>
        <TableBody>
          <table style={{maxHeight:"500", overflowY:"scroll"}}>
            <tbody>
              { data.logs?.map( (log, idx) => <LogItem log={log} key={idx} />) }
            </tbody>
          </table>
        </TableBody>
      </header>
    </div>
  );
}

export default App;
