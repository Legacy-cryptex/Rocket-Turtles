import React from "react";
//import ReactDOM from "react-dom";
import axios from "axios";
import moment from "moment";
import Welcome from "./components/Welcome.jsx";
import Login from "./components/Login/Login.jsx";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import BlobWindow from "./components/Blob/BlobWindow.jsx";
import Friends from "./components/Friends.jsx";
import "../css/style.css";
import Auth from "./auth.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      localName: undefined,
      condition: "FeedMe",
      view: "login",
      globalTimeOfDay: "morning",

      // list of all users in the db:
      users: [],
      // current user's state:
      user: {
        id: "",
        name: "",
        age: "",
        weight: "",
        height: ""
      },

      friends: [],
      viewUserOrFriends: "user",
      friendToAdd: "",

      //calories state:
      totalCalories: 0,

      //sleep states:
      sleepWeek: [
        {
          endHour: "00:00:00",
          hourCount: 0,
          id: 0,
          nightSlept: "0000-00-00T00:00:00.000Z",
          startHour: "00:00:00",
          user: 0
        }
      ],
      weeklyAverage: 0,
      sleepTime: "",
      wakeTime: ""
    };
    this.eat = this.eat.bind(this);
    this.handleBlobConditionChange = this.handleBlobConditionChange.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.getWakeTime = this.getWakeTime.bind(this);
    this.getSleepData = this.getSleepData.bind(this);
    this.getSleepTime = this.getSleepTime.bind(this);
    this.postSleepEntry = this.postSleepEntry.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleViewUserOrFriendsChange = this.handleViewUserOrFriendsChange.bind(
      this
    );
    this.handleFriendToAddChange = this.handleFriendToAddChange.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.updateBlob = this.updateBlob.bind(this);
  }

  handleFriendToAddChange(event) {
    //change which friend we are gonna add
    this.state.friendToAdd = this.state.users[
      event.currentTarget.selectedIndex - 1
    ];
  }

  handleAddFriend() {
    // add the friend and update the database
    // FIX does not check if friend already exists in friends list
    this.state.friends.push(this.state.friendToAdd);
    this.setState({
      friends: this.state.friends.slice()
    });

    // save friend to DB
    console.log("this.state.friendToAdd.id=", this.state.friendToAdd.id);
    axios
      .post("/api/friend", {
        user_id: this.state.user.id,
        friend_id: this.state.friendToAdd.id
      })
      .then(() => {
        console.log("post friend response received");
      })
      .catch(err => {
        console.log("ERROR sending post request to /api/friend", err);
      });
  }

  // global methods
  componentDidMount() {
    console.log("Components mounted.");
    //Auth before all
    const auth = new Auth();
    // auth.logout();
    if (auth.isAuthenticated() === false) {
      console.log("Not prior authed");
      auth.handleAuthentication(() => {
        console.log("My name is now:", localStorage.name);
        this.setState({ localName: localStorage.name });
      });
    } else {
      console.log("Already authenticated");
      this.setState({ localName: localStorage.name });
    }
    this.getUserData();
    this.setGlobalTime();
  }
  handleBlobConditionChange() {
    this.setState({ condition: "OpenMouth" });
  }
  eat() {
    this.setState({ condition: "MonchCronch" });
  }
  handleViewChange(option) {
    if (option === "nutrition") {
      this.setState({
        view: "nutrition"
      });
    } else if (option === "sleep") {
      this.setState({
        view: "sleep"
      });
      this.getSleepData();
    } else if (option === "login") {
      this.setState({
        view: "login",
        user: {
          id: "",
          name: "",
          age: "",
          weight: "",
          height: ""
        }
      });
    }
  }

  handleViewUserOrFriendsChange(option) {
    if (option === "user") {
      this.setState({
        viewUserOrFriends: "user"
      });
    } else if (option === "friends") {
      this.setState({
        viewUserOrFriends: "friends"
      });
    }
  }

  setGlobalTime() {
    const afternoon = 12;
    const evening = 17;
    const night = 20;
    const currentHour = moment().format("HH");

    if (currentHour >= afternoon && currentHour <= evening) {
      this.setState({
        globalTimeOfDay: "afternoon"
      });
    } else if (currentHour >= evening && currentHour <= night) {
      this.setState({
        globalTimeOfDay: "evening"
      });
    } else if (currentHour >= night) {
      this.setState({
        globalTimeOfDay: "night"
      });
    } else {
      this.setState({
        globalTimeOfDay: "morning"
      });
    }
  }

  // my hacky way of setting a user in the login screen
  handleUserChange(profile) {
    this.setState(
      {
        user: {
          id: profile.id,
          name: profile.name,
          age: profile.age,
          weight: profile.weight,
          height: profile.height
        },
        view: "nutrition"
      },
      () => {
        console.log("PROFILE LODADED?");
        console.log("USER is:", {
          id: profile.id,
          name: profile.name,
          age: profile.age,
          weight: profile.weight,
          height: profile.height
        });
        axios
          .post("/api/getCalories", { user: this.state.user.id })
          .then(cal => {
            this.setState({ totalCalories: JSON.parse(cal.data) });
          })
          .catch(err => {
            console.log("ERROR sending post request to /api/getCalories/", err);
          })
          .then(() => {
            this.getSleepData();
          })
          .catch(err => {
            console.error("ERROR on getting sleepData", err);
          })
          .then(() => {
            this.getFriendsForUser(this.state.user.id);
          });
      }
    );
  }

  //get user data
  getUserData() {
    axios
      .get("/api/user")
      .then(userData => {
        this.setState({
          users: userData.data
        });
        return userData;
      })
      .catch(err => {
        console.log("ERROR sending get request to /api/user/", err);
      });
  }

  // get friends of this user
  getFriendsForUser(userId) {
    var self = this;
    axios
      .get("/api/friends/?user_id=" + userId)
      .then(friendsData => {
        console.log("Get friendsData=", friendsData);
        //Need to get the actual users data for each friend
        // For each friend, put the 'user' data of each friend ID into friends array
        let friends = [];
        for (let i of friendsData.data) {
          friends.push(self.state.users[i.friend_id - 1]);
        }
        this.setState({
          friends: friends
        });
        return friendsData;
      })
      .catch(err => {
        console.log("ERROR sending get request to /api/friends/", err);
      });
  }

  //sleep methods:
  //gets sleep data
  //  sends axios request based on current user Id
  //  receives an up to 7 length array of objects each with information on a night of sleep data
  getSleepData() {
    axios
      .get(`/api/sleep/${this.state.user.id}`)
      .then(sleepData => {
        this.setState({
          sleepWeek: sleepData.data
        });
      })
      .then(() => {
        this.getAverage(this.state.sleepWeek);
      })
      .catch(err => {
        console.log("ERROR sending get request to /api/sleep/:id", err);
      });
  }

  //calculates average hours from most recent 7 nights of sleep
  getAverage() {
    const reducer = (acc, cur) => acc + cur.hourCount;
    let average = this.state.sleepWeek.length
      ? (
          this.state.sleepWeek.reduce(reducer, 0) / this.state.sleepWeek.length
        ).toFixed(2)
      : 0;
    this.setState({
      weeklyAverage: average
    });
  }

  //gets date and time data when selecting when you went to sleep
  getSleepTime(date) {
    this.setState({
      sleepTime: date.toDate()
    });
  }

  //gets date and time data when selecting when you woke up
  getWakeTime(date) {
    this.setState({
      wakeTime: date.toDate()
    });
  }
  updateBlob(val) {
    this.setState({
      condition: val
    });
  }

  //posts new sleep entry
  postSleepEntry() {
    //calculates the difference in time between waking up and going to bed
    let duration = moment.duration(
      moment(this.state.wakeTime).diff(moment(this.state.sleepTime))
    );
    let hourCount = duration.asHours();
    //these format the moment object into what the db is expecting
    let nightSlept = moment(this.state.sleepTime).format("YYYY-MM-DD");
    let start = moment(this.state.sleepTime).format("hh:mm A");
    let end = moment(this.state.wakeTime).format("hh:mm A");
    //formats all the above data into an object that can be inserted into the db
    let sleepObj = {
      user: this.state.user.id,
      hourCount: hourCount,
      startHour: start,
      endHour: end,
      nightSlept: nightSlept
    };
    axios
      .post("/api/sleep", sleepObj)
      .then(() => {
        console.log("post response received");
        // honestly i've put a bunch of these getSleepDatas trying to track down a bug. at this point im not sure what's being used and what isn't
        this.getSleepData();
      })
      .catch(err => {
        console.log("ERROR sending post request to /api/sleep/post", err);
      });
  }

  // relays total calories to parent when there is an update from calories component
  getCalTotal(totalCalories) {
    this.setState({ totalCalories });
  }

  renderView() {
    if (this.state.user.id !== "") {
      return (
        <div className="main">
          {this.state.viewUserOrFriends === "friends" ? (
            <div className="blobWindow">
              <Friends
                user={this.state.user}
                users={this.state.users}
                handleFriendToAddChange={this.handleFriendToAddChange}
                handleAddFriend={this.handleAddFriend}
                friends={this.state.friends}
              />
            </div>
          ) : (
            <div className="blobWindow">
              <BlobWindow
                user={this.state.user}
                blobCondition={this.state.condition}
                globalTimeOfDay={this.state.globalTimeOfDay}
                weeklyAverage={this.state.weeklyAverage}
                totalCalories={this.state.totalCalories}
                cb={this.updateBlob}
              />
            </div>
          )}

          <div className="sidebar">
            <Sidebar
              eat={this.eat}
              handleBlobConditionChange={this.handleBlobConditionChange}
              view={this.state.view}
              user={this.state.user} // used also in calories component
              globalTimeOfDay={this.state.globalTimeOfDay}
              //sleep
              getSleepData={this.getSleepData}
              sleepWeek={this.state.sleepWeek}
              weeklyAverage={this.state.weeklyAverage}
              getSleepTime={this.getSleepTime}
              getWakeTime={this.getWakeTime}
              postSleepEntry={this.postSleepEntry}
              // for calories component calories
              totalCalories={this.state.totalCalories}
              getCalTotal={this.getCalTotal.bind(this)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="main">
          <Login
            getUserData={this.getUserData}
            handleUserChange={this.handleUserChange}
            users={this.state.users}
            handleViewChange={this.handleViewChange} // somewhere in this area, +/- 20 lines from here, add a diclaimer that renders the landing page
            getSleepData={this.getSleepData}
          />
        </div>
      );
    }
  }

  render() {
    //if user is not set then sends to login screen
    return this.state.localName ? (
      <div>
        <Welcome
          handleViewChange={this.handleViewChange}
          handleViewUserOrFriendsChange={this.handleViewUserOrFriendsChange}
          view={this.state}
        />

        {this.renderView()}
        <div className="footer">
          <div className="footerReg">® Rocket Turtle</div>
        </div>
      </div>
    ) : (
      <div>LOADING THE GOODS</div>
    );
  }
}

export default App;
