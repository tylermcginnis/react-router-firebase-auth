var React = require('react');
var Router = require('react-router');
var firebaseUtils = require('../../utils/firebaseUtils');
var Login = React.createClass({
  mixins: [Router.Navigation],
  statics: {
    attemptedTransition: null
  },
  getInitialState: function(){
    return {
      error: false
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pw = this.refs.pw.getDOMNode().value;
    firebaseUtils.loginWithPW({email: email, password: pw}, function(){
      if(Login.attemptedTransition){
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith('dashboard');
      }
    }.bind(this));
  },
  render: function(){
    var errors = this.state.error ? <p> Error on Login </p> : '';
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
        <label><input ref="pw" placeholder="password"/></label> (hint: password1)<br/>
        <button type="submit">login</button>
        {errors}
      </form>
    );
  }
});

module.exports = Login;