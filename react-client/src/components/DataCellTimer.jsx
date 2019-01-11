import React from 'react';
const prettyMs = require('pretty-ms');
const parseMS = require('parse-ms');

class DataCellTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: '',
      displayTime: 0,
      formattedTime: '00 : 00 : 00'
    }
    this.startTimer = this.startTimer.bind(this)
    this.stopTmer = this.stopTmer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.formatDispay = this.formatDispay.bind(this)

  }

  formatDispay(timeStarted) {
    const timeDiff = Date.now() - timeStarted
    const parsedObj = parseMS(timeDiff)
    let { hours, minutes, seconds, milliseconds } = parsedObj
    seconds < 10 ? seconds = `0${seconds}` : null
    minutes < 10 ? minutes = `0${minutes}` : null
    hours < 10 ? hours = `0${hours}` : null

    this.setState({formattedTime: `${hours} : ${minutes} : ${seconds}`})
    if (hours === 2) {
      this.stopTmer()
    }
  }

  startTimer() {
    let timeStarted = Date.now()
    this.timerInterval = setInterval(() => this.formatDispay(timeStarted), 1000)   
  }

  stopTmer(){
    clearInterval(this.timerInterval)
  }
  resetTimer() {

  }

  render() {

    //hit start button - get time in millis save to state at that moment 
    //run a set interval every second that gets the time in millis 
      //and subtracts the start time and updates the display time
    //stop button - to clear interval
    //reset button - changes display to 0  
    //display the millis time converted w/ library to format

    // let x = new Date()
    // // console.log(x)
    
    // console.log(x.toLocaleTimeString())
// console.log(Date.now())

// let x = prettyMs(this.state.displayTime)
// console.log(parseMS(this.state.displayTime))

    return (
      <td style={border}>
        {this.state.formattedTime}
        {/* {prettyMs(this.state.displayTime, {msDecimalDigits: 2})} */}
        <div>
          <button onClick={this.startTimer}>start</button>
          <button onClick={this.stopTmer}>stop</button>
        </div>
      </td>
    )
  }
}

export default DataCellTimer;

const border = {
  borderBottom: '1px solid black',
  padding: '8px',
  whiteSpace: 'nowrap',
  overflow: 'hidden'

}