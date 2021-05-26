import { AvarageItem } from "../Table";
import { AvarageTableStyled } from "./styled";

export default function AvarageTable({avarageByMethod}) { 
  return(
    <AvarageTableStyled className="table">
      <thead>
        <th>Method</th>
        <th>Avarage time</th>
      </thead>
        {
          Object.entries(avarageByMethod)
            .map( (method,idx) => 
              <AvarageItem method={method} key={idx} />
            ) 
        }
    </AvarageTableStyled>
  )
}