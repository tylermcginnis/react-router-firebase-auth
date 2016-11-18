var React = require("react");

var Home = React.createClass({
  render: function(){
    return <p> This is the Home Page. This route is not protected. </p>
  }
});

module.exports = Home;