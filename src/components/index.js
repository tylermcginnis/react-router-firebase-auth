import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Match, BrowserRouter, Link, Miss, Redirect } from 'react-router'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import { logout } from '../helpers/auth'
import { firebaseAuth } from '../config/constants'

function MatchWhenAuthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function MatchWhenUnauthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        {({router}) => (
          <div>
            <nav className="navbar navbar-default navbar-static-top">
              <div className="container">
                <div className="navbar-header">
                  <Link to="/" className="navbar-brand">React Router + Firebase Auth</Link>
                </div>
                <ul className="nav navbar-nav pull-right">
                  <li>
                    <Link to="/" className="navbar-brand">Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                  </li>
                  <li>
                    {this.state.authed
                      ? <button
                          style={{border: 'none', background: 'transparent'}}
                          onClick={() => {
                            logout()
                            this.setState({authed: false})
                            router.transitionTo('/')
                          }}
                          className="navbar-brand">Logout</button>
                      : <span>
                          <Link to="/login" className="navbar-brand">Login</Link>
                          <Link to="/register" className="navbar-brand">Register</Link>
                        </span>}
                  </li>
                </ul>
              </div>
            </nav>
            <div className="container">
              <div className="row">
                <Match pattern='/' exactly component={Home} />
                <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={Login} />
                <MatchWhenUnauthed authed={this.state.authed} pattern='/register' component={Register} />
                <MatchWhenAuthed authed={this.state.authed} pattern='/dashboard' component={Dashboard} />
                <Miss render={() => <h3>No Match</h3>} />
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    );
  }
}