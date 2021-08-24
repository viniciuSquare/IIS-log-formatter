import { AvgListItem } from './StyledTable'

export function LogItem({log}){
  return (
    <tr>
      <td>
        {log.time}
      </td>
      <td>
        {log["cs-uri-stem"]}
      </td>
      <td>
        {log["c-ip"]}
      </td>
      <td>
        {log["sc-status"]}
      </td>
      <td>
        {log["time-taken"]}ms
      </td>
    </tr>
  )
}

export function AvarageItem({ method }) {
  return (
    <AvgListItem>
      <td>{method[0]}</td>
      <td>{method[1]} ms</td>
    </AvgListItem>
  )
}