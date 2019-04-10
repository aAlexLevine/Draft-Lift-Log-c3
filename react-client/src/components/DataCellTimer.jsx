import React from 'react';
import TimerInterface from './TimerInterface.jsx'
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
      clockColor: 'black',
      toggleInterface: false,
      bottomCSS: -69
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTmer = this.stopTmer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.formatDispay = this.formatDispay.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.toggleInterface = this.toggleInterface.bind(this)
    this.updateBottomCSS = this.updateBottomCSS.bind(this)
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
    this.props.updateRestTime(this.props.exercise.name, this.props.setNum, this.state.elapsedTime)
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

  toggleInterface(event, fromEllipsisClick=null) {
    event.stopPropagation()
    this.setState({toggleInterface: !this.state.toggleInterface, bottomCSS: -69})
  }

  updateBottomCSS(event, outsideclick=null) {
    event.stopPropagation()
    console.log('update fired')
    let bottomCSS
    this.state.bottomCSS === -69 && !outsideclick ? bottomCSS = -165 : bottomCSS = -69
    this.setState({bottomCSS: bottomCSS})
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval)
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

    return (
      <td style={timerCell}>
        <div style={clockContainer}>
            <i style={clockPressed} 
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onClick={this.state.toggleStopTimer ? this.stopTmer : this.startTimer} 
                className="fas fa-clock">
            </i>

            <div style={formattedTime}>
              <div style={display}>{this.state.formattedTime}</div>
              <div style={ellipsisContainer}>
                <i style={ellipsis} className="fas fa-ellipsis-h" onClick={(event)=>this.toggleInterface(event, true)}></i>
                {this.state.toggleInterface ? <TimerInterface toggleInterface={this.toggleInterface} bottomCSS={this.state.bottomCSS} updateBottomCSS={this.updateBottomCSS}/> : null}
              </div>
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

const intCont = {
  position: 'relative'
}

const ellipsisContainer = {
  // position: 'relative'
}

const ellipsis = {
  // margin: 'auto auto',
  padding: '8px',
  position: 'absolute',
  bottom: -17,
  right:0
}

const clock = {
  fontSize:'25px',
  cursor: 'pointer'
}

const formattedTime = {
  margin: 'auto auto',
  padding: '8px',
  fontSize:'20px',
  // marginTop:'50%',
  position: 'relative',
  overflow: 'visible',
  width: '90px',
  // borderBottom:'1px solid black',
  textAlign: 'center'
}
const display ={
    borderBottom:'1px solid black',
}

const timerCell = {              
  padding: '8px',
  whiteSpace: 'nowrap',
  // backgroundColor: '#f4f6f7'
  // borderRight: '1px solid black',
  // overflow: 'hidden'
  // borderLeft: '1px solid black'
}

const clockContainer = {
  display: 'flex'
}