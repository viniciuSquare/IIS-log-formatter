import { LogItem } from "../Table";
import { LogsTableStyled } from "./styled";

export default function LogsTable({ dataLogs }) {
  return(
    <LogsTableStyled>
      <thead>
        <th>Clock</th>
        <th>Method</th>
        <th>Client</th>
        <th>Response</th>
        <th>Res. time</th>
      </thead>
      <tbody>
        { dataLogs
          .map( (log, idx) => <LogItem
              log={log} 
              key={idx} 
              className="w-100"
            />) 
        }
      </tbody> 
    </LogsTableStyled>
  )
}