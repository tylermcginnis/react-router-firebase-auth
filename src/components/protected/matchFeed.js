
import React, { Component } from 'react'
import * as firebase from "firebase"
import { ref, firebaseAuth } from 'C:/Users/Duwan_000/Documents/GitHub/react-router-firebase-auth/src/config/constants'
import MatchRender from "./matchRender"


export default class matchFeed extends Component {

  constructor(props){
    super(props)
    this.state = {
        allMatches: []
    }
  }
// getMatches(){
//   let data = {}
//   //refresh
//   data.matches = []
//
//   //data.matches = firebase //get posts
//
//   return data
// }


componentDidMount(){
  console.log('Did Mount')
  const user = firebaseAuth().currentUser
  console.log(user.uid)
  firebase.database().ref(`matches`).on('value', (snapshot)=> {

  //  var matchesInfo = []
    var allMatches = snapshot.val()
    console.log(allMatches)

    var keys = []
    var keys = Object.keys(allMatches)
        console.log(keys)

        for (var i =0; i < keys.length; i++) {
          var k = keys[i];
        //  var match = matches[k];
          var skill = allMatches[k].Skill;
          var sport = allMatches[k].Sport;
          var date = allMatches[k].gameDate;
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
      players: [user.uid],
      creator: user.uid
    }
    console.log('nextMatch')
    console.log(nextMatch)

    var matchList = this.state.allMatches.slice()
    console.log('allList')
    console.log(matchList)

    matchList.push(nextMatch)
    this.setState({ matchList: matchList })
    console.log(matchList)
    console.log('pushed')
}

})
}




renderjoin(e){
  e.preventDefault()

  // push user id to player field if match not made by user
  // remove button if made by user
  // make some 'joined' button if joined another users game




}

  render(){
    var posts = this.allMatches.map(function(record){
      return <MatchRender key={record.id} match={record}/>

    })

    return(

      // <div className="col-sm-9">
      //                          <Statusform/>
      //                          {posts}
      //                          <button onClick={this.addMore}
      //                                  className="btn btn-lg">More</button>13
      //                      </div>
      //

        //switch logic:

      // if match.creator === user.uid
      //     render "your match"
      // defult null

      // if match.players.exists???(user.uid)
            //  render button that says " Joined! "
      //
      //   if not in joined players and players.length < max length for sport:
      //   render "Join match" button

      // if reached max player capacity:
      // Render "Match Full" or remove from list.

      {posts}
      // <div className="col-sm-12">
      //   <div className="panel panel-white post panel-shadow">
      //     <div className="post-heading">
      //       <div className="pull-left image">
      //         <img className="img-circle avatar" src="http://placehold.it/48x48" alt=""/>
      //         Avatar
      //       </div>
      //       <div className="pull-left meta">
      //         <div className="title h5">
      //         <b> {user.FirstName} {user.LastName} </b>
      //         made a match
      //         </div>
      //         <h6 className="text-muted time">An hour ago</h6>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="col-md-12 post-description">
      //       <h3> {this.props.sport} !</h3>
      //       <br/>
      //       <h3> {this.props.skill} !</h3>
      //       <br/>
      //       <h3> {this.props.date} !</h3>
      //       <br/>
      //       <h3> {this.props.JoinedGames.length} !</h3>
      //       <br/>
      //       </div>
      //       <div className="actions">
      //         <a href="#" className="btn btn-default stat-item"></a>
      //
      //         <a onClick={this.handleChange}  href="#" className="btn btn-default stat-item">
      //                          <i className="fa fa-thumbs-up icon"></i>
      //                      </a>
      //                      &nbsp;{this.joinRender(       )}
      //   </div>
      // </div>


)
}
}
