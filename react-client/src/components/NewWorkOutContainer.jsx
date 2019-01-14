import React from 'react';
import Table from './Table.jsx'
import Menu from './Menu.jsx'
import { Route } from 'react-router-dom'

class NewWorkOutContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPlan: '',
      selectedPlanGroup: ''
    }

  this.setPlanAndGroup = this.setPlanAndGroup.bind(this)
  }

  setPlanAndGroup(plan, group) {
    this.setState({
      selectedPlan: plan,
      selectedPlanGroup: group
    })      
  }

  render() {
    return (
      <div>
        <Route exact path={`/newWorkout/`} render={(props) => (<Menu {...props} setPlanAndGroup={this.setPlanAndGroup} />)}/> 
        <Route path={`/newWorkout/:table`} render={(props) => (<Table {...props} plan={this.state.selectedPlan} group={this.state.selectedPlanGroup}/>)}/> 
      </div>
    )
  }
}
export default NewWorkOutContainer