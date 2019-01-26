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


const App = () => (
  <div>
    <NavigationBar />
    <Router>
      <div style={mainWrapper}>
        <Link to='/newWorkout'>menu</Link>
        <Route path='/' component={Home} />
        <Route path='/newWorkout' render={ (props)=> (
          <NewWorkOutContainer {...props} />)}/>
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