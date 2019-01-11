import React from 'react';

class DataCellInput extends React.Component { 
  constructor(props){
    super();
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  render() {
  
    return (
      <td style={border}>
        <input style={input} type="text" value={this.state.value} onChange={this.handleChange}/>
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