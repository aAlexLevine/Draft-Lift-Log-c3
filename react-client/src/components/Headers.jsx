import React from 'react';

const Headers = (props) => (
      <React.Fragment>
        <th>
          Set {props.idx + 1}
        </th>
        {props.idx + 1 < props.numOfHeaders ? <th>Rest</th> : null }
      </React.Fragment>      
)   

export default Headers;