var React = require('react');
var firebaseUtils = require('../../utils/firebaseUtils');
var Router = require('react-router');

var Register = React.createClass({
  mixins: [ Router.Navigation ],
  handleSubmit: function(e){
    e.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pw = this.refs.pw.getDOMNode().value;
    firebaseUtils.createUser({email: email, password: pw}, function(result){
      if(result){
        this.replaceWith('dashboard');
      }
    }.bind(this));
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref="email" type="text" />
        <input ref="pw" type="text" />
        <button type="submit"> Submit </button>
      </form>
    )
  }
});

module.exports = Register;