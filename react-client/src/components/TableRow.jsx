import React from 'react';
import DataCellInput from './DataCellInput.jsx';
import DataCellTimer from './DataCellTimer.jsx';
import Transition from 'react-transition-group/Transition';


class TableRow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      togglePreviousWorkouts: false
    }
    this.togglePreviousWorkouts = this.togglePreviousWorkouts.bind(this)
  }

  togglePreviousWorkouts() {
    this.setState({togglePreviousWorkouts: !this.state.togglePreviousWorkouts})
  }

//if set length greater that current total update table headers
  render() {
    return (
      <React.Fragment>
        <tr style={row}>
          <td style={firstColumn}>
            {/* button to toggle previous workouts under current exercise row */}
            {this.props.exercise.name}
            <button onClick={this.togglePreviousWorkouts}>toggle history</button>
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

      {/* TODO: sort each array, turn into separate component */}
      {this.state.togglePreviousWorkouts ? 
        this.props.previousWorkouts.map((workout, i) =>  (
          <Transition in={this.state.togglePreviousWorkouts} timeout={1000} appear key={'workout' + i}>
            {(state) => (

            
            <tr style={
              {
                ...defaultStyle,
                ...transitionStyles[state]
              }
            } 
                >
                {console.log('trans state', state)}
              <td>{new Date(workout.date).toDateString()}</td>
              {workout[this.props.exercise.name].sets.map((set, i) => (
                <React.Fragment key={'setRest' + i}>
                <td>{set.reps}x{set.weight}</td>
                <td>{set.rest}</td>
                </React.Fragment>
              ))} 
            </tr>
          )}
          </Transition>
        )) : null}
     
      </React.Fragment>
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

const duration = 300;

const defaultStyle = {
  transition: `maxHeight 300ms ease-in-out`,
  borderBottom: '1px solid black',
  display:'none',
  maxHeight:'0px'
}

const transitionStyles = {
  entering: { display:'', maxHeight:'0px'},
  entered:  { display:'', maxHeight:'21px'},
};