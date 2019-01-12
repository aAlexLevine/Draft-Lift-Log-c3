import React from 'react';


class NavigationBar extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      data: []
    }
  }

  render() {
    return (
      <div>
        <div style={title}>
          <p>Lift Log</p>
        </div>
      </div>
    )
  }
}

export default NavigationBar;

const title = {
  fontFamily: 'Montserrat',
  margin: 'auto',
  borderBottom: '1px solid',
  fontSize: '20px'
  // textAlign: ''

}