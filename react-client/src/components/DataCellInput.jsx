import React from 'react';
import axios from 'axios';

class DataCellInput extends React.Component { 
  constructor(props){
    super(props);
    this.state = {
      weight: '',
      defaultReps:'',
      reps: '',
      toggleRepsEdit: false
      
    }
    this.handleWeightChange = this.handleWeightChange.bind(this)
    this.handleRepsChange = this.handleRepsChange.bind(this)
    // this.editReps = this.editReps.bind(this)
  }

  // componentDidMount () {
  //   this.setState({reps: this.props.exercise.numOfReps})
  // }

  handleWeightChange(e) {
    this.setState({
      weight: e.target.value,
      reps: this.props.exercise.numOfReps
    }, () => {
  
      this.props.updateWeightPropertyForDataCell(this.props.exercise.name, this.props.setNum, this.state.weight, this.state.reps)

    })
    // if (e.target.value) {

    // }updateWeightPropertyForDataCell
    // this.props.updateWeightPropertyForDataCell(this.props.exercise.name, this.props.setNum, e.target.value, this.state.reps)
  }

  handleRepsChange (e) {
    this.setState({reps: e.target.value})
    // console.log(this.state.reps)
    this.props.updateRepsPropertyForDataCell(this.props.exercise.name, this.props.setNum, e.target.value)
  }
  
  // editReps() {
  //   this.setState({toggleRepsEdit: !this.state.toggleRepsEdit})
  // }

  render() {
  
    return (
      <td style={cell}>
      
      <input style={input} type="text" defaultValue={this.props.exercise.numOfReps} onChange={this.handleRepsChange}/> 
  
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
  margin: 'auto auto'
  // height: '70px'
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