var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var firebaseUtils = require('../utils/firebaseUtils');

var Main = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: firebaseUtils.isLoggedIn()
    }
  },
  handleLogout: function(loggedIn){
    this.setState({
      loggedIn: loggedIn
    });
  },
  componentWillMount: function(){
    firebaseUtils.onChange = this.handleLogout;
  },
  render: function(){
    var loginOrOut;
    var register;
    if(this.state.loggedIn){
      loginOrOut = <Link to="logout">Logout</Link>;
      register = ''
    } else {
      loginOrOut = <Link to="login">Login</Link>;
      register = <Link to="register"> Register </Link>
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-5 pull-right">
            {register}
            {loginOrOut}
            <Link to="noauth"> Non Authenticated Page </Link>
            <Link to="dashboard"> Dashboard </Link>
          </div>
        </div>
        <div className="row">
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Main;