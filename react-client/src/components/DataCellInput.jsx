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
      <td>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
      </td>
    )
  }
}

export default DataCellInput;