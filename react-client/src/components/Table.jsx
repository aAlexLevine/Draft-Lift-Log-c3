import React from 'react';
import TableRow from './TableRow.jsx';
import Headers from './Headers.jsx';

class Table extends React.Component {
  constructor(props) {
    super(props) 
      this.state = {
        headersCount: 5,
        rowHeaders: ['Set 1', 'Set 2', 'Set 3 ', 'Set 4', 'Set 5'],
        addedHeaders: [],
        exerciseName:['Overhead Press', 'Front Squat/Clean', 'Bent-over Row', 'Dead Lift', 'Pull-up']
      }
      // this.onChange = this.onChange.bind(this)
      this.handleSelect = this.handleSelect.bind(this)
      // this.setNumberIncrementor = this.setNumberIncrementor.bind(this)
  }

  //**TODO: container component that inserts blank data into logs table in DB for todays date
  //headers will be based on the amount blank cells pulled down from DB 
  componentDidMount() {
      //select all from logs where date equals todays date to load exercises
  }

  addExerciseName(name) {
    //set state add exercise 
    this.setState({exerciseName: [...this.state.exerciseName, name]})
  }
  submit() {

  }
  //remove and edit 
  handleSelect(event) {
    // console.log(event.)
    this.setState({exerciseName: [...this.state.exerciseName, event.target.value]})
  }

  render () {
    console.log('props table', this.props)
    return (
      <div style={tableContainer}>
        <table style={table}>
          <thead>
          <tr>
            <th style={border}> Exercise</th>

            {this.state.rowHeaders.map((header, idx) => (
            <Headers numOfHeaders={this.state.rowHeaders.length} idx={idx}/>
            ))}     
          
          </tr>
          </thead>
          
          {/* map through state of exercises and create a row for each new exercise */}
          {/* add exercise table data cell as a component  */}
          <tbody>
     
            {this.state.exerciseName.map((exercise, i) => (<TableRow key={i} exercise={exercise} rowHeaders={this.state.rowHeaders}/>))}
          </tbody>

        </table>
      </div>
    )
  }

}

export default Table;

const tableContainer = {
  overflowX: 'auto',
  // width: '100%',
  // margin: 'auto'
}

const table = {
  fontFamily: 'Montserrat',
  // fontStyle: 'bold',
  borderCollapse: 'collapse',
  margin: 'auto'

}

const border = {  
  borderBottom: '1px solid black',
  padding: '8px',
  position: 'sticky',
  left: '0',
  backgroundColor: 'white'

}
