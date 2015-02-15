var React = require('react');
var Authenticated = require('../../utils/authenticated');
var Router = require('react-router');

var Dashboard = React.createClass({
  mixins: [Authenticated],
  render: function(){
    return <p> DASHBOARD </p>
  }
});

module.exports = Dashboard;