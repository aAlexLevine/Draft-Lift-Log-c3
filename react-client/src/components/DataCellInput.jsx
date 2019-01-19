import React from 'react';
import axios from 'axios';

class DataCellInput extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      weight: '',
      reps: this.props.exercise.numOfReps,
      
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({weight: e.target.value})
    this.props.addSetPropertyToDataCellObj(this.props.exercise.name, this.props.setNum, e.target.value, this.state.reps)
  }

  render() {
  
    return (
      <td style={border}>
        {/* <div>5</div> */}
        <input style={input} type="text" value={this.state.weight} onChange={this.handleChange}/>
      </td>
    )
  }
}

export default DataCellInput;

const border = {
  borderBottom: '1px solid black',
  padding: '8px'
}

const input = {
  border: 'none',
  outline: 'none',
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: '20px',
  width: '100px',
  height: '70px'
}