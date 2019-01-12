import React from 'react';
import Table from './Table.jsx';
import axios from 'axios'

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      lastWorkOut: 'Wed Jan 9 2019, Plan: 5x5, Workout: A',
      data: [],
      userID: 0,
      selectedPlan: '-',
      selectedPlanGroup: '-',
      planData: ['5x5', 'IceCream', 'Thrall'],
      planGroupData: ['A', 'B'],
      startButtonHovered: false
    }
    this.createNewWorkOut = this.createNewWorkOut.bind(this)
    this.getDate = this.getDate.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleHover = this.handleHover.bind(this)
  }

  componentDidMount() {
    this.getDate()
    //select all from plans table in DB
      //set state and grab all plan names, set counts for headers, 
      // and plan group names (e.g. 'a','b', etc) - reduce for unique names
  }

  //insert a new work out log into logs table
    //pass down data for sets_rest
  createNewWorkOut() {
    const logData = {
      userID: this.state.userID,
      plan: this.state.plan,
      planGroup: this.state.planGroup
    }
    
    axios.post('/createNewWorkOut', logData)
      .then( res => console.log('Created new workout log.', res.data) )
      .catch( err => console.log(err) )
  
  }

  getDate() {
    const date = new Date()
    const dateStr = date.toDateString()
    this.setState({date: dateStr})
  }

  handleSelect(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleHover() {
    this.setState({startButtonHovered: !this.state.startButtonHovered})
    console.log('handleHover fired', startButtonHovered)
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
            <p style={selectedPlan}>{this.state.selectedPlan}</p>
              <p style={selectTitles}>Pick your plan</p>
              <select style ={selectElement} name="selectedPlan" value={this.state.selectedPlan} onChange={this.handleSelect}>
                <option default></option>
                {this.state.planData.map((plan, i) => ( 
                  <option value={plan} key={i}>{plan}</option>  
                 ))}
                
              </select>
            </div>

            <div style={selectBar}>
            <p style={selectedPlan}>{this.state.selectedPlanGroup}</p>
              <p style={selectTitles}>Pick your workout</p>
              <select style={selectElement} name="selectedPlanGroup" value={this.state.selectedPlanGroup} onChange={this.handleSelect}>
                <option default></option>
                {this.state.planGroupData.map((group, i) => (
                  <option key={i}>{group}</option>
                ))}
              </select>
            </div>
          
          </div>
          
          <div style={this.state.startButtonHovered ? startButtonHovered : startButton} 
               onMouseEnter={this.handleHover} 
               onMouseLeave={this.handleHover}>
               Start
          </div>   
        </div>
        {/* multiple select drops down to pick plan from users plans  */}
        <Table/>
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
// const selectBarsContainer = {
//   margin: 'auto',
//   width: '100%'
// }