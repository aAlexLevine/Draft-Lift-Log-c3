import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Table from './components/Table.jsx'
import Menu from './components/Menu.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import Home from './components/Home.jsx'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import NewWorkOutContainer from './components/NewWorkOutContainer.jsx';
import Charts from './components/Charts.jsx';


const App = () => (
  <div>
    <NavigationBar />

    <Router>
      <div style={mainWrapper}>
        <div><Link to='/newWorkout'>Create New Workout</Link></div>
        <div><Link to='/charts'>Progress Charts</Link></div>

        <Route path='/' component={Home} />
        <Route path='/newWorkout' render={ (props)=> (
          <NewWorkOutContainer {...props} />)}/>
        <Route path='/charts' component={Charts}/>
      </div>
    </Router>
  </div>
)

ReactDOM.render( <App />, document.getElementById('app'));


const mainWrapper = {
  // marginLeft:'auto',
  // marginRight:'auto',
  // width:'960px'
}