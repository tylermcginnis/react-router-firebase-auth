import React, { Component } from 'react'
import { firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import * as firebase from "firebase"

export default class CreateMatch extends Component {

   constructor(props, context){
    super(props, context)
      this.changeList = this.changeList.bind(this)
    this.state = {
        matchList: []
       }
      }

  componentDidMount(){
    console.log('Did Mount')
    const user = firebaseAuth().currentUser
    console.log(user.uid)
  //  firebase.database().ref(`users/${user.uid}/matches`).on('value', (snapshot)=> {
   firebase.database().ref(`matches/`).on('value', (snapshot)=> {

    //  var matchesInfo = []
      var matchesInfo = snapshot.val()
      console.log(matchesInfo)

      var keys = []
      var keys = Object.keys(matchesInfo)
          console.log(keys)

          for (var i =0; i < keys.length; i++) {
            var k = keys[i];
          //  var match = matches[k];
            var skill = matchesInfo[k].skill;
            var sport = matchesInfo[k].sport;
            var date = matchesInfo[k].gameDate;
            //var li = document.createElement('li', 'Sport: ' + sport + '   Skill Level: ' + skill
            //   + '   Match Date: ' + date);

      console.log(skill)
      console.log(sport)
      console.log(date)

      var nextMatch = {
        id: k,
        skill: 'Skill: ' + skill,
        sport: '      Sport: ' + sport,
        date: '       Date: ' + date
      }
      console.log('nextMatch')
      console.log(nextMatch)

      var matchList = this.state.matchList.slice()
      console.log('matchList')
      console.log(matchList)

      matchList.push(nextMatch)
      this.setState({ matchList: matchList })
      console.log(matchList)
      console.log('pushed')
}

  })
}

changeList(event){
  console.log(event)
  this.setState({
    newMatch: event.target.value
  });
}

  render () {

  const currentMatches = this.state.matchList.map((match, i) => {

  return (
    <li key={match.id}>{match.skill}
    {match.sport}
    {match.date}
    </li>
  )
  })

    return (
      <div>
      <h3> Your Scheduled Matches: </h3>

      <ul>
                { currentMatches }
      </ul>

      </div>
    )
  }
}
