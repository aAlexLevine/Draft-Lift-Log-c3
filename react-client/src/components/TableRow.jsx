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
      <tr style={row}>
        <td style={firstColumn}>
          {this.props.exercise.name}
        </td>
        {[... new Array(this.props.setCount)].map((header, i) => (
        <React.Fragment key={'frag' + i}>
          <DataCellInput setNum={i + 1} 
                         exercise={this.props.exercise} 
                         updateWeightPropertyForDataCell={this.props.updateWeightPropertyForDataCell} 
                         updateRepsPropertyForDataCell={this.props.updateRepsPropertyForDataCell}
                         />
          {i + 1 < this.props.setCount ? <DataCellTimer /> : null}  
          </React.Fragment>
        ))} 
      </tr>
    )
  }
}

export default TableRow;

const firstColumn = {  
//  borderBottom: '1px solid black',
 padding: '8px',
 position: 'sticky',
 left: '0',
 backgroundColor: 'white'
}

const row = {
  borderBottom: '1px solid black'
}
