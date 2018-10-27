import React from 'react';
import Sleep from './Sleep.jsx';
import UserProfile from './UserProfile.jsx';
import Calories from './Calories.jsx';
//import Login from './Login.jsx'

import '../../css/style.css'



const Sidebar = (props) => {

  const renderView = (viewOption) => {
    if (viewOption === 'nutrition') {
      //props.getSleepData()
      return (<Calories 
        handleChange={props.handleChange} 
        handleClick={props.handleClick} 
        food={props.food}
        calDisplay={props.calDisplay}
        nutrients={props.nutrients}
        totalCalories={props.totalCalories}

      />
      )
    } else {
      return (<Sleep 
        user={props.user}
        sleepWeek={props.sleepWeek}
        weeklyAverage={props.weeklyAverage}
        getSleepTime={props.getSleepTime}
        getWakeTime={props.getWakeTime}
        postSleepEntry={props.postSleepEntry}
      />)
    }
  }

  return (
    <div>
      <UserProfile 
        user={props.user}
        globalTimeOfDay={props.globalTimeOfDay}
      />
    {renderView(props.view)}  
      
    </div>
  )
}

export default Sidebar;