import React, { Component } from 'react'
//import { ref } from '../src/config/constants'
//import { auth } from '../helpers/auth'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'
import createMatch from './createMatch'
//import DatePicker from 'react-bootstrap-date-picker'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import dateFormat from 'dateformat'
import { ref, firebaseAuth } from '../config/constants'

import 'react-datepicker/dist/react-datepicker.css';

export default class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      newProfile: {
        sports : null,
        age: null,
        startDate: moment()
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
     this.setState({startDate: date
     });
  }

  handleSubmit = (e) => {
    e.preventDefault()
  firebaseAuth().onAuthStateChanged(function(user) {
if (user) {
// User is signed in.
ref.child(`users/${user.uid}/matches`)
.push({
  Sport: this.sport,
  gameDate: this.startDate,
  Skill: this.skill
})
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

      <h2> Create a Match: </h2>
      <Router>
      <div>
     <li><NavLink to="/protected/createMatch">Create Match</NavLink></li>
           <Route path="/protected/createMatch" component={createMatch}/>
           </div>
           </Router>
           <form onSubmit={this.handleSubmit}>
           <label>Sport</label>
           <div className="form-group">
           <select id="sport" ref={(sport) => this.sport = sport}>
           <option disabled value>Sport</option>
           <option value="1">Tennis</option>
           <option value="2">Badminton</option>
           <option value="3">Basketball</option>
           <option value="4">Soccer</option>
           <option value="5">Softball</option>
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
           <option value="1">Beginner</option>
           <option value="2">Intermediate</option>
           <option value="3">Advanced</option>
           </select>

           <button type="submit" className="btn btn-primary">Create</button>

           </div>
         </form>
      </div>
    )
  }
}
