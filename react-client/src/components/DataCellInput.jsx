import React from 'react';

class DataCellInput extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      weight: '',
      reps: ''
    }
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleRepsChange = this.handleRepsChange.bind(this)
  }

  handleWeightChange(e) {
    let reps
    this.state.reps === '' ? reps = this.props.defaultReps : reps = this.state.reps
    this.setState({
      weight: e.target.value
    }, () => {
      this.props.updateWeightPropertyForDataCell(this.props.exercise.name, this.props.setNum, this.state.weight, reps)
    })
  }

  handleRepsChange (e) {
    this.setState({reps: e.target.value})
    this.props.updateRepsPropertyForDataCell(this.props.exercise.name, this.props.setNum, e.target.value)
  }

  render() {
    return (
      <td style={cell}>
        <input style={input} type="text" defaultValue={this.props.defaultReps} onChange={this.handleRepsChange}/> 
        <div style={x}>x</div>
        <input style={input} type="text" value={this.state.weight} onChange={this.handleWeightChange}/>
      </td>
    )
  }
}

export default DataCellInput;

const cell = {
  // borderBottom: '1px solid black',
  padding: '8px',
  display: 'flex',
  width: '100px',
  height: '70px'

}

const x = {
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: '16px',
  margin: 'auto auto',
  padding: '8px'
}

const input = {
  border: 'none',
  outline: 'none',
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: '20px',
  width: '100%',
  margin: 'auto auto',
  // height: '70px'
  borderBottom: '1px solid black',
}

const inputWithFocus = {
  border: 'none',
  outline: 'none',
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: '20px',
  // width: '100px',
  // height: '70px'
}