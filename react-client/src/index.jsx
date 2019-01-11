import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Table from './components/Table.jsx'
import Menu from './components/Menu.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    this.setState({items:[1,2,3]})
    // $.ajax({
    //   url: '/items', 
    //   success: (data) => {
    //     this.setState({
    //       items: [data]
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  render () {
    return (<div style={mainWrapper}>
      <h1>Item List</h1>
      {/* <List items={this.state.items}/> */}
      <Menu />
      {/* <Table /> */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

const mainWrapper = {
  marginLeft:'auto',
  marginRight:'auto',
  width:'960px'
}