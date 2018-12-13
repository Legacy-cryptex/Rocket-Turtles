import React from "react";
import Background from "./Background.jsx";
import Blob from "./BlobBuddy.jsx";

export default class BlobWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="componentbox1">
        <Background globalTimeOfDay={this.props.globalTimeOfDay} />
        <Blob
          user={this.props.user}
          blobCondition={this.props.blobCondition}
          weeklyAverage={this.props.weeklyAverage}
          totalCalories={this.props.totalCalories}
          globalTimeOfDay={this.props.globalTimeOfDay}
          cb={this.props.cb}
        />
      </div>
    );
  }
}
