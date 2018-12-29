import React from 'react';
import Table from './Table.jsx';
import axios from 'axios'

class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      userID: 0,
      selectedPlan: '',
      selectedPlanGroup: '',
      planData: [],
      planGroupData: []
    }
    this.createNewWorkOut = this.createNewWorkOut.bind(this)
  }

  componentDidMount() {
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
  
 
  render() {
    return (
      <div>
        <h1>Menu</h1>
      
          <div style ={selectBars}>
            
            <div>
              <h3>Pick a plan</h3>
              <select>
                <option>
                </option>
              </select>
            </div>

            <div>
              <h3>Pick a plan</h3>
              <select>
                <option>
                </option>
              </select>
            </div>

            <div>
              <h3>Pick a plan</h3>
              <select>
                <option>
                </option>
              </select>
            </div>

            

            
      
          </div>   

        {/* multiple select drops down to pick plan from users plans  */}
        <Table/>
      </div>
    )
  }
}
export default Menu;

const selectBars = {
  display: 'flex'
}