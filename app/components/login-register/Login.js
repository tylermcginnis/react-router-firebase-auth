var React = require('react');
var firebaseUtils = require('../../utils/firebaseUtils');

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
    var pw = this.refs.pw.value;
    firebaseUtils.loginWithPW({email: email, password: pw}, function(){
      var location = this.props.location

      if (location.state && location.state.nextPathname) {
        this.context.router.replace(location.state.nextPathname)
      } else {
        this.context.router.replace('/')
      }
    }.bind(this));
  },
  render: function(){
    var errors = this.state.error ? <p> Error on Login </p> : '';
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
          <button type="submit" className="btn btn-primary">Login</button>
          {errors}
        </form>
      </div>
    );
  }
});

module.exports = Login;