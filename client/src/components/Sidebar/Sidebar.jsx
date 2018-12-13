import React from "react";
import Sleep from "./Sleep.jsx";
import UserProfile from "./UserProfile.jsx";
import Calories from "./Calories.jsx";
import { Component } from "react";
//renders the sidebar on the right. user info is static and sleep or nutrition renders depending on view state.

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const renderView = viewOption => {
      if (viewOption === "nutrition") {
        return (
          <Calories
            eat={this.props.eat}
            handleBlobConditionChange={this.props.handleBlobConditionChange}
            totalCalories={this.props.totalCalories}
            id={this.props.user.id}
            getCalTotal={this.props.getCalTotal}
          />
        );
      } else {
        return (
          <Sleep
            user={this.props.user}
            sleepWeek={this.props.sleepWeek}
            weeklyAverage={this.props.weeklyAverage}
            getSleepTime={this.props.getSleepTime}
            getWakeTime={this.props.getWakeTime}
            postSleepEntry={this.props.postSleepEntry}
          />
        );
      }
    };

    return (
      <div className="sidebox1">
        <UserProfile
          user={this.props.user}
          globalTimeOfDay={this.props.globalTimeOfDay}
        />
        {renderView(this.props.view)}
      </div>
    );
  }
}
