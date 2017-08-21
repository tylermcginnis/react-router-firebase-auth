import React, { Component } from 'react'
import * as firebase from "firebase"
import { ref, firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import MatchRender from './MatchRender'
import ChatRoom from './ChatRoom'

export default class matchFeed extends Component {

  constructor(props){
    super(props)
    this.state = {
        allMatches: [],
        User: ''
    }
  }

componentDidMount(){
  console.log('Did Mount')
  const user = firebaseAuth().currentUser

  this.setState({User: user})

  console.log(this.state.User.uid)
  firebase.database().ref(`matches`).on('value', (snapshot)=> {

  //  var matchesInfo = []
    var matches = snapshot.val()
    console.log('allmatches')
    console.log(matches)

    var keys = []
    var keys = Object.keys(matches)
        console.log(keys)

        for (var i =0; i < keys.length; i++) {
          //var id = matches[k].key
          //console.log(id)
          var k = keys[i];
        //  var match = matches[k];
          var skill = matches[k].skill;
          var sport = matches[k].sport;
          var date = matches[k].gameDate;
          var creator_query = matches[k].creator;
          var players = matches[k].players;
          var creator_first_name = matches[k].creator_first_name;
          var creator_last_name = matches[k].creator_last_name;
        //  var thatUser =
          //var li = document.createElement('li', 'Sport: ' + sport + '   Skill Level: ' + skill
          //   + '   Match Date: ' + date);

    console.log(skill)
    console.log(sport)
    console.log(date)

    var nextMatch = {
      id: k,
      skill: skill,
      sport: sport,
      date:  date,
      players: players,
      creator: creator_query,
      creatorName: creator_first_name + " " + creator_last_name
    }
    console.log('nextMatch')
    console.log(nextMatch)

    var allMatches = this.state.allMatches.slice()
    console.log('allList')
    console.log(allMatches)

    allMatches.push(nextMatch)
    this.setState({ allMatches: allMatches})
    console.log(allMatches)
    console.log('pushed')
}

})
}




  render(){
    console.log('This.state.User')
    console.log(this.state.User)
    console.log('this.state.allMatches')
    console.log(this.state.allMatches)
    var posts = this.state.allMatches.map(function(record){
      return <MatchRender key={record.id} match={record} />

    //  var messages = this.
   })
  console.log('testpost')
  var testpost = this.state.allMatches
  //console.log('testpost')
  console.log(testpost)

    return(

       <div>  Local Matches
       { posts }
       
          </div>

)
}
}
