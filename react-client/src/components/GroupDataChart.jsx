import React from 'react';
import axios from 'axios';
import c3 from 'c3';
import 'c3/c3.css';

class GroupDataChart extends React.Component {
  constructor() {
    super();
    this.state = {
      formattedData: [],
      datesAxis: [],
      exercisesToChart: {}
    }
    this.myRef = React.createRef();

    this.getSetsRestData = this.getSetsRestData.bind(this)
    this.organizeSetsRestData = this.organizeSetsRestData.bind(this)
    this.formatDataForCharts = this.formatDataForCharts.bind(this)
    this.calculateMaxLift = this.calculateMaxLift.bind(this)
    this.getLogsCorrespondingSetsData = this.getLogsCorrespondingSetsData.bind(this)
  }

  componentDidMount() {
    this.getLogsCorrespondingSetsData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.logs !== this.props.logs) {
      this.getLogsCorrespondingSetsData()
    }
  }

  getLogsCorrespondingSetsData() {
    Promise.all(this.props.logs.map((log) => this.getSetsRestData(log.id)))//.catch
      .then(logSets => this.formatDataForCharts(logSets))
  }

  getSetsRestData(logID) {
    return axios.get('/getSetsRestByLogid', {
      params: {
        logID: logID
      }
    })
    .then(log => this.organizeSetsRestData(log.data))
  }

  organizeSetsRestData(records) {
    let reducedRecords = records.reduce((acc, curr) => {
      if(!this.state.exercisesToChart[curr.exercise]) {
        this.setState({exercisesToChart: {...this.state.exercisesToChart, [curr.exercise]: true}})
      }
      if (!acc[curr.exercise]) {
        acc[curr.exercise] = { sets: [] }
      }
      if (!acc.date) {
        acc.date = curr.dateCreated
      }
      acc[curr.exercise].sets.push( {setNum: curr.setNum, reps: curr.reps, weight: curr.weight, rest: curr.rest } )
      return acc
    }, {})
    return reducedRecords
  }

  formatDataForCharts(logs) {
    const exercises = {...this.state.exercisesToChart}
    for (let ex in exercises) {
      exercises[ex] = [ex]
    }
    const dates = []
  
    logs.forEach(log => {
      const date = new Date(log.date)
      const day = date.getDate()
      const month = date.getMonth()
      // let year = date.getFullYear().toString()
        // year = year.slice(year.length  - 2)
      const dateFormat = `${day}-${month + 1}` 
      dates.push(dateFormat)
      for (let ex in exercises) {
        if (log[ex]) {
          exercises[ex].push(this.calculateMaxLift(log[ex].sets))
        } else {
          exercises[ex].push(null)
        }
      }
    })
    
    const formattedData = [...Object.values(exercises)]
    this.setState({
      formattedData: formattedData,
      datesAxis: dates,
      exercisesToChart: {}
    })
  }

  calculateMaxLift(arrOfSetObjs) {
    const max =  Math.max(...arrOfSetObjs.map( set => set.weight))
    return max > 0 ? max : null
  }


  render() {
    const chart = c3.generate({
      bindto: this.myRef.current,
      legend: {
        position: 'right'
      },
      data: {
        columns: this.state.formattedData
      },
      axis: {
        x: {
            type: 'category',
            categories: this.state.datesAxis
        }
    },
      subchart: {
        show: true
      }
    });

    return (
      <div style={chartContainer}>
        <div style={groupTitle}>{this.props.groupTitle}</div>
        <div style={chart} ref={this.myRef}></div>  
      </div>
    )
  }
}

export default GroupDataChart;

const chartContainer = {
  width: '100%',
  marginBottom: '100px'
}

const chart = {
  width: '100%'
}

const groupTitle = {
  fontSize: '30px',
  fontFamily: 'Montserrat',
}