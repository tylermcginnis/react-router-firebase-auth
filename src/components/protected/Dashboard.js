import React, { Component } from 'react'
//import { ref } from '../src/config/constants'
//import { auth } from '../helpers/auth'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'

export default class Dashboard extends Component {

  constructor(){
    super();
    this.state = {
      newProfile: {
        sports : null,
        age: null
      }
    }
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

  handleSubmit(e){
    // ref.child(`users/${this.props.user.uid}/info`)
    //   .set({
    //     sports: this.sports,
    //     age: this.age
    //   })
  }

  render () {
    return (
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
    )
  }
}
