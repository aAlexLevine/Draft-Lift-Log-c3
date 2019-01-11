import React from 'react';
import DataCellInput from './DataCellInput.jsx';
import DataCellTimer from './DataCellTimer.jsx';

class TableRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cellData: '',
      sets:[]
    }

  }

  sendRowDatatoDB() {
    //insert into logs date, userid, plan_id, + this.state
  }

//if set length greater that current total update table headers
  render() {
    return (
      <tr>
        <td style={border}>
          {this.props.exercise}
        </td>
        {this.props.rowHeaders.map((header, i) => (
        <React.Fragment>
          <DataCellInput/>
          {i + 1 < this.props.rowHeaders.length ? <DataCellTimer/> : null}  
          </React.Fragment>
       
      
     ))}
      </tr>
    )
  }
}

export default TableRow;

const border = {  
 borderBottom: '1px solid black',
 padding: '8px',
 position: 'sticky',
 left: '0',
 backgroundColor: 'white'
}
