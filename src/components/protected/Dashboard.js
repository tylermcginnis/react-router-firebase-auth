import React, { Component } from 'react'

export default class Dashboard extends Component {
  render () {
    return (
      <div>
        Dashboard. This is a protected route. You can only see this if you're authed.
      </div>
    )
  }
}