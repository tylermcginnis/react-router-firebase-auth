import React, { Component } from 'react'
import { firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import * as firebase from "firebase"

export default class createMatch extends Component {

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
    firebase.database().ref(`users/${user.uid}/matches`).on('value', (snapshot)=> {

      const matchesInfo = snapshot.val()
      console.log(matchesInfo)

      var keys = Object.keys(matchesInfo)
          console.log(keys)

          //var set = [];
          for (var i =0; i < keys.length; i++) {
            var k = keys[i];
          //  var match = matches[k];
            var skill = matchesInfo[k].Skill;
            var sport = matchesInfo[k].Sport;
            var date = matchesInfo[k].gameDate;
            //var li = document.createElement('li', 'Sport: ' + sport + '   Skill Level: ' + skill
            //   + '   Match Date: ' + date);

      console.log(skill)
      console.log(sport)
      console.log(date)

      var nextMatch = {
        id: k,
        skill: skill,
        sport: sport,
        date: date
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

// this.setState({
//     arrayvar: this.state.arrayvar.concat([newelement])
// })
    //  set.push('Sport: ' + sport + '   Skill Level: ' + skill
      //        + '   Match Date: ' + date)

    //   if (matchesInfo != null){
    //     this.setState({
    //       matchList: matchesInfo
    //   })
    // }
  })
}

changeList(event){
  console.log(event)
  this.setState({
    newMatch: event.target.value
  });
}

  render () {
    //console.log(user)

  //   firebaseAuth().onAuthStateChanged(function(user) {
  //   if (user) {
  //   console.log("User is signed in" + user.uid)
  //   var refMatches = firebase.database().ref(`users/${user.uid}/matches`);
  //   refMatches.on('value', gotData, errData);
  //
  //   function gotData(data){
  //     console.log(data.val())
  //     var matches = data.val();
  //     var keys = Object.keys(matches);
  //     console.log(keys);
  //
  //     var set = [];
  //     for (var i =0; i < keys.length; i++) {
  //       var k = keys[i];
  //     //  var match = matches[k];
  //       var skill = matches[k].Skill;
  //       var sport = matches[k].Sport;
  //       var date = matches[k].gameDate;
  //       //console.log(match);
  //       //var li = document.createElement('li', 'Sport: ' + sport + '   Skill Level: ' + skill
  //       //   + '   Match Date: ' + date);
  //       //   console.log(li);
  //       //   console.log(li.value);
  //     //     li.parent('matchlist');
  //      set.push('Sport: ' + sport + '   Skill Level: ' + skill
  //        + '   Match Date: ' + date);
  //        console.log(set);
  //        this.changeList(set);
  //     }
  //     console.log(set);
  //   }
  // //
  //
  //   function errData(err){
  //   console.log("Error!")
  //   console.log(err)}
  //
  //   } else {
  //   // No user is signed in.
  //   }
  //   });

  //  let totalMatches;
    //console.log(this.set)
  //  if(this.set){
    //  totalMatches = set.map(this.set)
  //  }

  const currentMatches = this.state.matchList.map((match, i) => {

  return (
    <li key={match.id}>{match.skill}{match.sport}{match.date}</li>
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
