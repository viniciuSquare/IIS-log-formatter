import {ModalContainer} from './styled'

const Modal = ({serverList, serverSelectionCallback}) => {
  return (
    <ModalContainer >
      { 
        serverList.map( (server, idx) => {
          <button onClick={() => serverSelection(idx)} >
            {server}
          </button>
        })
      }
    </ModalContainer>
  )
}