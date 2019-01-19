import React from 'react';
import Table from './Table.jsx';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      lastWorkOut: 'Wed Jan 9 2019, Plan: 5x5, Workout: A',
      userID: this.props.userID,
      selectedPlan: '',
      selectedPlanGroup: '-',
      planData: ['5x5', 'IceCream', 'Thrall'],
      planGroupData: [],
      startButtonHovered: false,
      planDisplay:'-',
      groupDisplay:'-'
    }
    // this.createNewWorkOut = this.createNewWorkOut.bind(this)
    this.getDate = this.getDate.bind(this)
    this.handleSelectPlans = this.handleSelectPlans.bind(this)
    this.handleSelectGroups = this.handleSelectGroups.bind(this)
    this.handleHover = this.handleHover.bind(this)
    this.getGroupsFromSelectedPlan = this.getGroupsFromSelectedPlan.bind(this)
  }

  componentDidMount() {
    this.getDate()
    axios.get('/getPlans', {
      params: {
        user: this.state.userID
      }
    })
      .then( plans => this.setState({planData: plans.data}) )
      .catch( err => console.log(err))
  }

  getDate() {
    const date = new Date()
    const dateStr = date.toDateString()
    this.setState({date: dateStr})
  }

  handleSelectPlans(event) {
    if (event.target.value !== '-') {
      this.setState({
        [event.target.name]: event.target.value,
        planDisplay: this.state.planData[event.target.value].planName,
        groupDisplay: '-',
        planGroupData: []
      })  
      this.getGroupsFromSelectedPlan(event.target.value)
    } else {
      this.setState({
        planDisplay: event.target.value, 
        groupDisplay: '-',
        planGroupData: []
      })
    }
  }

  handleSelectGroups(event) {
    if (event.target.value !== '-') {
      this.setState({
        [event.target.name]: event.target.value,
        groupDisplay: this.state.planGroupData[event.target.value].title
      })
    } else {
      this.setState({groupDisplay: event.target.value})
    }
  }

  getGroupsFromSelectedPlan(planIndex) {
    const planID = this.state.planData[planIndex].id
    axios.get('/getGroups', {
      params: {
        id: planID
      }
    })
      .then( groups => {
        this.setState({planGroupData: groups.data})
        console.log('groupsData', groups.data)
      })
      .catch( err => console.log(err))
  }

  handleHover() {
    this.setState({startButtonHovered: !this.state.startButtonHovered})
  }
  
  render() {
    return (
      <div >
        
        <p style={lastRecorded}>Your last recorded workout was</p>
        <p style={lastRecorded}>{this.state.lastWorkOut}</p>
        <div style ={textToday}>Today is </div>
        <div style={date}>{this.state.date}</div>
        

        <div>
          <div style={selectBarsContainer}>
            
            <div style={selectBar}>
            <p style={selectedPlan}>{this.state.planDisplay}</p>
              <p style={selectTitles}>Pick your plan</p>
              <select style ={selectElement} name="selectedPlan" onChange={this.handleSelectPlans}>
                <option value='-' default></option>
                {this.state.planData.map((plan, i) => ( 
                  <option value={i} key={i}>{plan.planName}</option>  
                 ))}
              </select>
            </div>

            <div style={selectBar}>
            <p style={selectedPlan}>{this.state.groupDisplay}</p>
              <p style={selectTitles}>Pick your workout</p>
              <select style={selectElement} name="selectedPlanGroup" onChange={this.handleSelectGroups}>
                <option value='-' default></option>
                {this.state.planGroupData.map((group, i) => (
                  <option value={i} key={i}>{group.title}</option>
                ))}
              </select>
            </div>
          
          </div>

          <Link style={link} to='/newWorkout/table'>
            <div style={this.state.startButtonHovered ? startButtonHovered : startButton} 
                 onMouseEnter={this.handleHover} 
                 onMouseLeave={this.handleHover}
                 onClick = {() => {this.props.setPlanAndGroup(this.state.planData[this.state.selectedPlan], this.state.planGroupData[this.state.selectedPlanGroup])}}
                >
                Start
            </div>
          </Link>

        </div>
        
     
      </div>
    )
  }
}
export default Menu;

const textToday = {
  fontFamily: 'Montserrat',
  textAlign: 'center',
  fontSize: '25px'
}
const date = {
  fontFamily: 'Montserrat',
  textAlign: 'center',
  fontSize: '40px'
}

const lastRecorded = {
  fontFamily: 'Montserrat',
  textAlign: 'center',
  fontSize: '18px'
}

const selectBarsContainer = {
  display: 'grid',
  gridTemplateColumns: 'auto auto',
  margin: 'auto',
  width: '50%',
  marginBottom: '40px'
  // textAlign: 'center'
  // alignItems: 'center',
  // justifyContent: 'center',
  // height: '100%'
}

const selectBar = {
  borderStyle: 'solid',
  padding: '25px',
  display: 'table',
  borderCollapse: 'collapse'
}

const selectTitles = {
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: '20px'
}

const selectedPlan = {
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: '40px'
}

const selectElement = {
  margin: 'auto',
  width: '100%'
}

const startButton = {
  margin: 'auto',
  width: '50%',
  // height: '30px',
  paddingTop: '18px',
  paddingBottom: '18px',
  backgroundColor: '#555555',
  textAlign: 'center',
  fontFamily: 'Montserrat',
  fontSize: '16px',
  color: 'white',
  // borderStyle: 'solid',
  borderColor:'#555555',
  cursor: 'pointer',
  borderRadius: '4px'  
}

const startButtonHovered = Object.assign({}, startButton)
startButtonHovered.backgroundColor = 'rgb(62, 62, 124)'

const link = {
  textDecoration: 'none'
}
// const selectBarsContainer = {
//   margin: 'auto',
//   width: '100%'
// }