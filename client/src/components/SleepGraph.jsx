import React from 'react';
import moment from 'moment';
import {HorizontalBar} from 'react-chartjs-2';

import '../../css/style.css'

const sleepWeekEntryExample = {
  endHour: "07:03:00",
  hourCount: 8.05,
  id: 51,
  nightSlept: "2018-10-03T05:00:00.000Z",
  startHour: "23:00:00",
  user: 18
}

const SleepGraph = (props) => {

  const data = {
    labels: props.sleepWeek.map(night => {
      return moment(night.nightSlept).format('ddd MMM Do')
    }),
    datasets: [
      { 
        label: ['Hours Slept'],
        backgroundColor: [
          "rgba(26, 188, 156, 0.2)",  
          "rgba(46, 204, 113, 0.2)",
          "rgba(52, 152, 219, 0.2)", 
          "rgba(155, 89, 182, 0.2)",
          "rgba(231, 76,  60, 0.2)",
          "rgba(230, 126, 34, 0.2)",
          "rgba(241, 196, 15, 0.2)"
        ],
        borderColor: [
          "rgba(26, 188, 156, 0.8)",  
          "rgba(46, 204, 113, 0.8)",
          "rgba(52, 152, 219, 0.8)", 
          "rgba(155, 89, 182, 0.8)",
          "rgba(231, 76,  60, 0.8)",
          "rgba(230, 126, 34, 0.8)",
          "rgba(241, 196, 15, 0.8)"
        ],
        hoverBackgroundColor: [
          "rgba(26, 188, 156, 0.6)",  
          "rgba(46, 204, 113, 0.6)",
          "rgba(52, 152, 219, 0.6)", 
          "rgba(155, 89, 182, 0.6)",
          "rgba(231, 76,  60, 0.6)",
          "rgba(230, 126, 34, 0.6)",
          "rgba(241, 196, 15, 0.6)"
        ],
        hoverBorderColor: [
          "rgba(26, 188, 156, 1.0)",  
          "rgba(46, 204, 113, 1.0)",
          "rgba(52, 152, 219, 1.0)", 
          "rgba(155, 89, 182, 1.0)",
          "rgba(231, 76,  60, 1.0)",
          "rgba(230, 126, 34, 1.0)",
          "rgba(241, 196, 15, 1.0)"
        ],
        borderWidth: 1,
        data: props.sleepWeek.map(night => {
          return night.hourCount
        })
      }
    ]
  }
  const options = {
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
  }

  return (

    <div className='sleepGraph'> 
      <HorizontalBar 
        sleepWeek={props.sleepWeek}
        height={220}
        data={data}
        options={options}
        redraw
      />
    </div>
  )
}

export default SleepGraph;