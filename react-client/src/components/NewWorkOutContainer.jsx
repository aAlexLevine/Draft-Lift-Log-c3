import React from 'react';
import Table from './Table.jsx'
import Menu from './Menu.jsx'
import axios from 'axios'
import { Route } from 'react-router-dom'

class NewWorkOutContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: 1,
      logID: '',
      selectedPlan: {},
      selectedPlanGroup: {}
    }

  this.setPlanAndGroup = this.setPlanAndGroup.bind(this)
  this.createNewWorkOut = this.createNewWorkOut.bind(this)

  }

  setPlanAndGroup(plan, group) {
    this.setState({
        selectedPlan: plan,
        selectedPlanGroup: group
      }, 
        this.createNewWorkOut
        // console.log('container', this.state.selectedPlan, this.state.selectedPlanGroup)
    )
  }

  createNewWorkOut() {
    const logData = {
      userID: this.state.userID,
      plan: this.state.selectedPlan.id,
      planGroup: this.state.selectedPlanGroup.title
    }
    // console.log('log data obj',logData)
    axios.post('/createNewWorkOut', logData)
      .then(results => {
        console.log('Created new workout log.', results.data.insertId)
        this.setState({
          logID: results.data.insertId
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Route exact path={`/newWorkout/`} render={(props) => (<Menu {...props} userID={this.state.userID} setPlanAndGroup={this.setPlanAndGroup} createNewWorkOut={this.createNewWorkOut}/>)}/> 
        <Route path={`/newWorkout/:table`} render={(props) => (<Table {...props} userID={this.state.userID} logID={this.state.logID} plan={this.state.selectedPlan} group={this.state.selectedPlanGroup}/>)}/> 
      </div>
    )
  }
}
export default NewWorkOutContainer