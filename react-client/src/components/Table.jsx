import React from 'react';
import TableRow from './TableRow.jsx';
import Headers from './Headers.jsx';
import axios from 'axios';
import update from 'immutability-helper';

class Table extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        logID: '',
        setCount: '',
        dataCellInputs: {},
        exercises: ['Overhead Press', 'Front Squa`t/Clean', 'Bent-over Row', 'Dead Lift', 'Pull-up'],
        previousWorkouts: []
      }
      this.buildStateObjForAllDataCells = this.buildStateObjForAllDataCells.bind(this)
      this.submitSets = this.submitSets.bind(this)
      // this.onChange = this.onChange.bind(this)
      this.handleSelect = this.handleSelect.bind(this)
      // this.setNumberIncrementor = this.setNumberIncrementor.bind(this)
      this.updateWeightPropertyForDataCell = this.updateWeightPropertyForDataCell.bind(this)
      this.submitSets = this.submitSets.bind(this)
      this.getDate = this.getDate.bind(this)
      this.updateRepsPropertyForDataCell = this.updateRepsPropertyForDataCell.bind(this)
      this.updateRestTimePropertyForDataCell = this.updateRestTimePropertyForDataCell.bind(this)
      this.getLastThreeLogIds = this.getLastThreeLogIds.bind(this)
      this.organizeSetsRestData = this.organizeSetsRestData.bind(this)
    }


  componentDidMount() {
    this.getDate()

    const { group } = this.props
    axios.get('/getExercisesByGroup', {
        params: {
          groupID: group.id
        }
      })
      .then(res => this.setState({
          exercises: res.data,
          setCount: group.setCount
        }, this.buildStateObjForAllDataCells
      ))
      .then(this.getLastThreeLogIds)
      .catch(err => console.log(err))
    
  }

  getLastThreeLogIds() {
    const prevWorkouts = []
    axios.get('/getLastThreeLogIds', {
      params: {
        userID: this.props.userID,
        planID: this.props.plan.id,
        group: this.props.group.title
      }
    })
    .then(results => {
      console.log('last three logs', results)
      for (let log of results.data) {
        axios.get('/getSetsRestByLogid', {
          params: {
            logID: log.id
          }
        })
        .then((setsRest)=>{
          console.log('setsRest', setsRest)
          if (setsRest.data.length > 0) {
            prevWorkouts.push(this.organizeSetsRestData(setsRest.data))
          this.setState({previousWorkouts: prevWorkouts})
          }      
        })
      }
    })
    .catch(err => console.log(err))
  }

  organizeSetsRestData(records) {
    let reducedRecords = records.reduce((acc, curr) => {
      if (!acc[curr.exercise]) {
        acc[curr.exercise] = { sets: [] }
      }
      if (!acc.date) {
        acc.date = curr.dateCreated
      }
      acc[curr.exercise].sets.push( {setNum: curr.setNum, reps: curr.reps, weight: curr.weight, rest: curr.rest } )
      return acc
    }, {})
    console.log('---reducedRecords----',reducedRecords)
    return reducedRecords
  }

  buildStateObjForAllDataCells() {
    const allDataCells = {}
    for (let exercise of this.state.exercises) {
      let name = exercise.name
        allDataCells[name] = {}
        for (let i = 1; i <= this.state.setCount; i++) {
          allDataCells[name]['set' + i] = {exercise: name, setNum: i, weight: null, reps: null, rest: null}
        }
    }
    this.setState({dataCellInputs: allDataCells}) 
  }

  updateWeightPropertyForDataCell(exercise, setNum, weight, reps) {
    if (weight === '') { reps = null } 
    let copyDataCells = update(this.state.dataCellInputs, {
      [exercise]: {['set' + setNum]: {weight: {$set: weight}}},
    })
    this.setState({dataCellInputs: copyDataCells}, () => {
    this.updateRepsPropertyForDataCell(exercise, setNum, reps)
      console.log('weight changed', this.state.dataCellInputs)
    })
  }

  updateRepsPropertyForDataCell(exercise, setNum, reps) {
    const copyDataCells = update(this.state.dataCellInputs, {
      [exercise]: {['set' + setNum]: {reps: {$set: reps}}}
    })
    this.setState({dataCellInputs: copyDataCells}, () => 
      console.log('reps changed', this.state.dataCellInputs))
  }

  updateRestTimePropertyForDataCell(exercise, setNum, time) {  
    console.log('time', time)
    const copyDataCells = update(this.state.dataCellInputs, {
      [exercise]: {['set' + setNum]: {rest: {$set: time}}}
    })
      this.setState({dataCellInputs: copyDataCells}, () => 
      console.log('rest changed', this.state.dataCellInputs))
  }

  submitSets() {
    const exerciseRows = this.state.dataCellInputs
    let postObj
    for (let row in exerciseRows) {
      for (let set in exerciseRows[row]) {
        postObj = {
          logID: this.props.logID,
          data: exerciseRows[row][set]
        }
        axios.post('/insertSets', postObj)
        .then()
        .catch(err => console.log(err))
      }
    }
    console.log('submitted')
  }

  addExercise(name) {
    //set state add exercise 
    this.setState({exercises: [...this.state.exercises, name]})
  }

  //remove and edit 
  handleSelect(event) {
    this.setState({exercises: [...this.state.exercises, event.target.value]})
  }

  getDate() {
    const date = new Date()
    const dateStr = date.toDateString()
    this.setState({date: dateStr})
  }

  render () {
    return (
      <div style={tableContainer}>
      <div style={date}>{this.state.date}</div>
      <button onClick={this.submitSets}>submit</button>
        <table style={table}>
          <thead>
          <tr>
            <th style={border}> Exercise</th>
            {[... new Array(this.state.setCount)].map((header, idx) => (
              <Headers key={idx} numOfHeaders={this.state.setCount} idx={idx}/>
            ))}     
          </tr>
          </thead>
          
          <tbody>
            {this.state.exercises.map((exercise, i) => (
              <TableRow key={i} 
                        exercise={exercise} 
                        defaultReps={exercise.numOfReps}
                        setCount={this.state.setCount}  
                        updateWeightPropertyForDataCell={this.updateWeightPropertyForDataCell}
                        updateRepsPropertyForDataCell={this.updateRepsPropertyForDataCell}
                        updateRestTimePropertyForDataCell={this.updateRestTimePropertyForDataCell}
                        previousWorkouts={this.state.previousWorkouts}
                        />))}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Table;

const date = {
  fontFamily: 'Montserrat',
  textAlign: 'center',
  fontSize: '40px'
}

const tableContainer = {
  overflowX: 'auto',
  width: '100%',
  marginTop: '5%',
  marginBottom: '10%'
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
