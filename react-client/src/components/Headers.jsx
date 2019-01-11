import React from 'react';

const Headers = (props) => (
      <React.Fragment>
        <th style={border}>
          Set {props.idx + 1}
        </th>
        {props.idx + 1 < props.numOfHeaders ? <th style={border}>Rest</th> : null }
        {console.log('idx', props.idx, 'numOfHeaders', props.numOfHeaders)}
      </React.Fragment>      
)   

export default Headers;

const border = { 
  borderBottom: '1px solid black',
  padding: '8px'

}