import React from 'react';
import axios from 'axios';
import GroupDataChart from './GroupDataChart.jsx'

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planID: 1,
      userID: 1,
      groups: [],
      groupedLogs: [],
      plans: [],
      selectedPlan: '',
    }
    this.getAllWorkoutLogsByGroup = this.getAllWorkoutLogsByGroup.bind(this)
    this.handleSelectPlan = this.handleSelectPlan.bind(this)
    this.getGroups = this.getGroups.bind(this)
  }
  
  componentDidMount() {
    axios.get('/getPlans', {
      params: {
        user: this.state.userID
      }
    })
    .then(results => this.setState({plans: results.data}))
    .catch(err => console.log(err))
  }

  handleSelectPlan(e) {
    this.setState({selectedPlan: e.target.value}, ()=> this.getGroups(this.state.selectedPlan))
  }

  getGroups(planID) {
    axios.get('/getGroups', {
      params: {
        id: planID
      }
    })
    .then(results => this.setState({groups: results.data}, this.getAllWorkoutLogsByGroup))
    .catch(err => console.log(err))
  }

  getAllWorkoutLogsByGroup() {
    const fetchLogs = (user, plan, group) => {
      return axios.get('/getAllWorkoutLogsByGroup', {
        params: {
          userID: user,
          planID: plan,
          group: group
        }
      })
      .then(logs => logs.data)
    }
    const logRequests = this.state.groups.map(group => fetchLogs(this.state.userID, this.state.selectedPlan, group.title))
    Promise.all(logRequests)
      .then(groupedLogsArr => this.setState({groupedLogs: groupedLogsArr}))
      .catch(err=>console.log(err))
  }

  render() {
    return (
      <div>
        See progress from all exercises within 
        <select name="selectedPlan" onChange={this.handleSelectPlan}>
          <option> </option>
          {this.state.plans.map((plan, i) => (  
            <option key={plan.id} value={plan.id}>{plan.planName}</option>
          ))}
        </select>
          {this.state.groupedLogs.map((logs, i) => (
            <GroupDataChart logs={logs} key= {i} groupTitle={this.state.groups[i] && this.state.groups[i].title}/>
          ))}
      </div>
    )
  }
}

export default Charts;
