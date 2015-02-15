var React = require("react");

var NoAuth = React.createClass({
  render: function(){
    return <p> This Route is Not Protected </p>
  }
});

module.exports = NoAuth;