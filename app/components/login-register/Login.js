import React, { Component } from 'react';
import * as firebase from 'firebase';

var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function(){
        return {
            error: false
        }
    },
    handleSubmit: function(e){
        e.preventDefault();
        var email = this.refs.email.value;
        var pw    = this.refs.pw.value;
        var self  = this;

        firebase.auth().signInWithEmailAndPassword(email, pw).then(function(result) {
            var location = self.props.location
            if (location.state && location.state.nextPathname) {
                self.context.router.replace(location.state.nextPathname)
            } else {
                self.context.router.replace('/dashboard')
            }
            // User signed in!
            console.log('User signed in!');
            // var uid = result.user.uid;
        }).catch(function(error) {
            this.setState({error: error});
        });
    },
    render: function(){
        var errors = this.state.error ? <p> {this.state.error} </p> : '';
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <h1> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label> Email </label>
                        <input className="form-control" ref="email" placeholder="Email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input ref="pw" type="password" className="form-control" placeholder="Password" />
                    </div>
                    {errors}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
});

module.exports = Login;
