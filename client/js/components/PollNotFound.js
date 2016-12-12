const React = require("react");
const { Link } = require("react-router");
const { Button } = require("react-bootstrap");

const PollNotFound = React.createClass({
  render: function() {
    return (
      <div className="text-center poll-not-found">
        <h1>Whooops!</h1>
        <div className="line padd"/>
        <p>The Poll you are looking for doesn't seem to exist in our database</p>
        <p>The owner of the Poll probably decided to delete it</p>
        <div className="line padd"/>
        <Link to="/polls">
          <Button className="accordion btn-responsive" bsSize="large">Check out some other awesome Polls</Button>
        </Link>
      </div>
    );
  }
});

module.exports = PollNotFound;
