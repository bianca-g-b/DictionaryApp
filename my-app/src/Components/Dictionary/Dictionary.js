import React from 'react';
import { v4 as uuidv4 } from "uuid";

function Dictionary(props) {
    return (
        <div className= "meaning-area">
            {props.typeDefs.length > 0 &&
      props.typeDefs[0].type.map((type, index) => (
        <div className="all-defs" key={uuidv4()}>
          <h3 className= "type">{type}</h3>
          <h4 className = "definitions">Definitions</h4>
          <ul className= "definitions-list">
            {props.typeDefs[0].defs[index].map((def, i) => (
              <li className="definition-item" key={uuidv4()}>{def}</li>
            ))}
          </ul>
        </div>
      ))}
            </div>
       
      );


}

export default Dictionary;