export default function LogItem({log}){
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