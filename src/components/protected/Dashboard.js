import React, { Component } from 'react'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'
import CreateMatch from './createMatch'
import ChatRoom from './ChatRoom'
//import DatePicker from 'react-bootstrap-date-picker'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { ref, firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import matchFeed from './matchFeed'
import 'react-datepicker/dist/react-datepicker.css';
import * as firebase from "firebase"

export default class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      matchKey: '',
      newProfile: {
        sports : null,
        startDate: moment(),
        formatDate: null,
        User: null
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  sportsChanged(newSports) {
    this.setState({
      sports: newSports
    });
  }

  onChange(value) {
    this.setState({
      age: value
    });
    }

  handleChange(date){

    //console.log(formatDate)
     this.setState({startDate: date,
                    formatDate: date.format("MM/DD/YYYY")
     });
  }



  handleSubmit = (e) => {
    //e.preventDefault()

    var sport = this.sport.value;
    console.log(sport)
    //var matchDay = this.formatDate.value;
    var formatDate = this.state.formatDate
    console.log(formatDate)
    var skill = this.skill.value;
    console.log(skill)

  firebaseAuth().onAuthStateChanged(function(user) {
if (user) {
  console.log(sport)
  console.log(formatDate)
  console.log(skill)


// User is signed in.
//   var user_pers_info = firebase.database().ref(`users/${user.uid}/personal-info`)
// console.log('user_pers_info')
// console.log(user_pers_info)
// .push({
//   creator: user.uid,
//   players: user.uid,
//   sport: sport,
//   gameDate: formatDate,
//   skill: skill
// })
//
// ref.child(`users/${user.uid}/personal-info`).once('value', function(snapshot) {
//   snapshot.forEach(function(childSnapshot) {
//     var childKey = childSnapshot.key;
//     var childData = childSnapshot.val();
//     var first_name = childData.FirstName
//     var last_name = childData.LastName
//     this.setState({first_name: first_name})
//     this.setState({last_name: last_name})
//
//     // ...
//   });
// });

// const user = firebaseAuth().currentUser
// console.log(user.uid)
//  console.log(user.FirstName)
//  var user_pers_info = firebase.database().ref(`users/${user.uid}/personal-info`)

firebase.database().ref(`users/${user.uid}/personal-info`).on('value', (snapshot)=> {

  var profile = snapshot.val()
  console.log(profile)
  //var childKey = snapshot.key

  const f_name = profile.FirstName
  const l_name = profile.LastName
  console.log(f_name)
  console.log(l_name)

  var newMatchKey = firebase.database().ref('matches').push().key;
  console.log(newMatchKey)
  //console.log(this.state.matchKey)
  //this.setState({matchKey: newMatchKey})
  //this.setState({first_name: f_name})
  //this.setState({last_name: l_name})
  //console.log(this.state.matchKey)

  ref.child(`/matches/` + newMatchKey)
  .update({
    creator_first_name: f_name,
    creator_last_name: l_name,
    sport: sport,
    gameDate: formatDate,
    skill: skill,
    players: [user.uid],
    creator: user.uid
  })

      ref.child(`users/${user.uid}/account-info`)
      .set({
      joinedGames: newMatchKey
      })

  })
  //
  // ref.child(`/matches/` + this.state.matchKey)
  // .update({
  //
  // })
//
// firebase.database().ref(`users/${user.uid}/personal-info`).once('value', function(snapshot) {
// snapshot.forEach(function(childSnapshot) {
// var childKey = childSnapshot.key;
// var childData = childSnapshot.val();
// console.log(childKey)
// console.log(childData)
// if (childKey === 'FirstName'){
//   console.log(childData)
//   console.log(this.state.first_name)
//   const f_name = childData
//   this.setState({first_name: f_name})
// }
// if (childKey === 'LastName'){
//   this.setState({last_name: childData})
// }
// // ...
// });
// //var first_name = childData.FirstName
// //console.log(first_name)
// //var last_name = childData.LastName
// ///this.setState({first_name: first_name})
// //this.setState({last_name: last_name})
//
// });

//console.log('First Name')
//console.log(this.state.first_name)


//console.log('First Name')
//console.log(this.state.first_name)

} else {
// No user is signed in.
}
});
}

  render () {

    return (
      <div>
      <div>
      <h1> Welcome!</h1>
      <h2> Please fill in your profile so we can instantly
        match you with games near you! </h2>

              <CheckboxGroup
                 name="favoriteSports"
                 value={this.state.sports}
                 onChange={this.sportsChanged.bind(this)}>
                     <label><Checkbox value="tennis"/> Tennis</label>
                     <label><Checkbox value="badminton"/> Badminton</label>
                     <label><Checkbox value="basketball"/> Basketball</label>
                     <label><Checkbox value="soccer"/> Soccer</label>
                     <label><Checkbox value="softball"/> Softball</label>
                   </CheckboxGroup>
                   <input type="submit" value="Update Profile" />
                   </div>
      <br />
      <br />
      <matchFeed  />
      <li><NavLink to="/protected/matchFeed">Match Feed</NavLink></li>
            <Route path="/protected/matchFeed" component={matchFeed}/>
      <h3> Basic Messenger </h3>
      <div>
      <CreateMatch />
      </div>


      <Router>
      <div>
     <li><NavLink to="/protected/createMatch">Create Match</NavLink></li>
           <Route path="/protected/createMatch" component={CreateMatch}/>
           <ol id='matchlist'>

           </ol>
           </div>
           </Router>

                <h2> Create a Match: </h2>
           <form onSubmit={this.handleSubmit}>
           <label>Sport</label>
           <div className="form-group">
           <select id="sport" ref={(sport) => this.sport = sport}>
           <option disabled value>Sport</option>
           <option value="Tennis">Tennis</option>
           <option value="Badminton">Badminton</option>
           <option value="Basketball">Basketball</option>
           <option value="Soccer">Soccer</option>
           <option value="Softball">Softball</option>
           </select>

           </div>
           <label>Date</label>
           <div className="date">
           <DatePicker
           selected={this.state.startDate}
           onChange={this.handleChange}
           minDate={moment()}
           maxDate={moment().add(65, "days")}
           placeholderText="Choose a Day" />
           </div>

           <label>Skill Level</label>
           <div className="form-group">
           <select id="skill" ref={(skill) => this.skill = skill}>
           <option disabled value>Skill</option>
           <option value="Beginner">Beginner</option>
           <option value="Intermediate">Intermediate</option>
           <option value="Advanced">Advanced</option>
           </select>
           <br />
           <br />
           <button type="submit" className="btn btn-primary">Create</button>
           <br />
           </div>
         </form>

      </div>
    )
  }
}
