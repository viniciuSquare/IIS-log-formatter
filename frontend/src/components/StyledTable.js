import styled from 'styled-components'

export const TableBody = styled.div`
  
  height: 800px;
  max-height: 800px;

  display: flex;
  justify-content: space-evenly;
  
  .table{
    position: relative;
    max-width: 650px;
    overflow:  auto;
  }
  
  thead {
    background-color: #F6F6F6;
    height: 2.5rem;
  }

  tbody {
    background-color: #F6F6F6;
  }


  td, th{
    padding: 0 10px;
    text-align: center;
  }

  .clients_list ul {
    padding: 0;
  }
`

export const AvgListItem = styled.tr`
  td {
    text-align: left;
  }
`