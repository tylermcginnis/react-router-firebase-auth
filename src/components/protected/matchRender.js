import React, { Component } from 'react'

export default class MatchRender extends Component {


  render(){

    return(



      <div className="col-sm-12">
        <div className="panel panel-white post panel-shadow">
          <div className="post-heading">
            <div className="pull-left image">
              <img className="img-circle avatar" src="http://placehold.it/48x48" alt=""/>
              Avatar
            </div>
            <div className="pull-left meta">
              <div className="title h5">
              <b> {user.FirstName} {user.LastName} </b>
              made a match
              </div>
              <h6 className="text-muted time">An hour ago</h6>
              </div>
            </div>
          </div>
          <div className="col-md-12 post-description">
            <h3> {this.props.sport} !</h3>
            <br/>
            <h3> {this.props.skill} !</h3>
            <br/>
            <h3> {this.props.date} !</h3>
            <br/>
            <h3> {this.props.JoinedGames.length} !</h3>
            <br/>
            </div>
            <div className="actions">
              <a href="#" className="btn btn-default stat-item"></a>

              <a onClick={this.handleChange}  href="#" className="btn btn-default stat-item">
                               <i className="fa fa-thumbs-up icon"></i>
                           </a>
                           &nbsp;{this.joinRender(       )}
        </div>
      </div>




    )

  }
}
