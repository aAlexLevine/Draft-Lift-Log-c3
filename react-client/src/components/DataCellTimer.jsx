import React from 'react';
const prettyMs = require('pretty-ms');
const parseMS = require('parse-ms');

class DataCellTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedTime: '0s',
      toggleStopTimer: false,
      px : 0,
      elapsedTime: 0,
      savedTime: 0,
      clockColor: 'black'
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTmer = this.stopTmer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.formatDispay = this.formatDispay.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  formatDispay(timeStarted) {
    const timeDiff = (Date.now() - timeStarted) + this.state.savedTime
    this.setState({
      formattedTime: prettyMs(timeDiff),
      elapsedTime: timeDiff
    })
    if (timeDiff > 7200000) {
      this.stopTmer()
    }
    
    // -Format timer display to 00 : 00 : 00
    // const parsedObj = parseMS(timeDiff)
    // let { hours, minutes, seconds, milliseconds } = parsedObj
    // seconds < 10 ? seconds = `0${seconds}` : null
    // minutes < 10 ? minutes = `0${minutes}` : null
    // hours < 10 ? hours = `0${hours}` : null

    // this.setState({formattedTime: `${hours} : ${minutes} : ${seconds}`})
    // if (hours === 2) {
    //   this.stopTmer()
    // }
  }

  startTimer(event) {
    const timeStarted = Date.now()
    this.setState({toggleStopTimer: !this.state.toggleStopTimer, clockColor: 'red'})
    this.timerInterval = setInterval(() => this.formatDispay(timeStarted), 1000)   
  }

  stopTmer(lastTimeDiff){
    this.setState({
      toggleStopTimer: !this.state.toggleStopTimer,
      savedTime: this.state.elapsedTime,
      clockColor: 'black'
    })
    clearInterval(this.timerInterval)
  }
  resetTimer() {

  }

  handleMouseDown() {
    this.setState({px: 4})
  }
  handleMouseUp() {
    this.setState({px: 0})
  }

  componentWillUnmount() {
    this.stopTmer()
  }

  render() {
    const clockPressed = {
      fontSize:'25px',
      cursor: 'pointer',
      transform: `translateY(${this.state.px}px)`,
      color: `${this.state.clockColor}`,
      margin: 'auto auto',
      padding: '8px'
    }
//this.state.clockPressed ? clockPressed : clock
    return (
      <td style={timerCell}>
      <div style={timerContainer}>
          <i style={clockPressed} 
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              onClick={this.state.toggleStopTimer ? this.stopTmer : this.startTimer} 
              className="fas fa-clock"></i>
          <div style={formattedTime}>
            {this.state.formattedTime}
          </div>
        </div>
      </td>
    )
  }
}

export default DataCellTimer;

//TODO:
//use prettyMS lib, display inside a timer icon thats clickable, animate to depress on click
//green circle to start, turns red - to stop, three line menu to edit manually
//add func to update the datacell state object

const clock = {
  fontSize:'25px',
  cursor: 'pointer'
}

const formattedTime = {
  margin: 'auto auto',
  padding: '8px'
}

const timerCell = {              
  padding: '8px',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
}

const timerContainer = {
  display: 'flex'
}