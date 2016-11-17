const React = require("react");
const { Grid, Row, Col, Image } = require("react-bootstrap");

const MEDIA = (function(env) {
  if(env === "production") {
    return "/media";
  }
  return "/client/media";
}(process.env.NODE_ENV));

const Home = React.createClass({
  render: function() {
    return (
      <Grid fluid>

        <Row>
          <Col md={8} mdOffset={2}>
            <Image className="image-center-squared" src={MEDIA + "/v-logo.gif"} responsive circle/>
            <h1 className="text-primary text-center title">Voting App</h1>
            <div className="line"/>
          </Col>
        </Row>

        <Row>
          <Col md={2} mdOffset={3}>
            <h3 className="text-center">Create Polls</h3>
          </Col>
          <Col md={2}>
            <h3 className="text-center">Share Polls</h3>
          </Col>
          <Col md={2}>
            <h3 className="text-center">Manage Polls</h3>
          </Col>
        </Row>

        <Row className="row-space row-dark">
          <Col md={4}>
            <div className="info-box">
              <h4 className="text-center">create</h4>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="info-box">
              <h4 className="text-center">share</h4>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="info-box">
              <h4 className="text-center">manage</h4>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={8} mdOffset={2}>
            <h4 className="tech-stack text-center">Created with the MERN stack</h4>
            <div className="line"/>
          </Col>
        </Row>

        <Row className="tech">
          <Col md={2} sm={6} mdOffset={2} className="tech-row first">
            <a href="https://expressjs.com/" target="_blank">
              <Image className="tech-stack-img express-img" src={MEDIA + "/express-logo.png"} responsive/>
            </a>
          </Col>
          <Col md={2} sm={6} className="tech-row">
            <a href="https://nodejs.org/en/" target="_blank">
              <Image className="tech-stack-img node-img" src={MEDIA + "/nodejs-logo.png"} responsive/>
            </a>
          </Col>
          <Col md={2} sm={6} className="tech-row">
            <a href="https://www.mongodb.com/" target="_blank">
              <Image className="tech-stack-img mongo-img" src={MEDIA + "/mongodb-logo.png"} responsive/>
            </a>
          </Col>
          <Col md={2} sm={6} className="tech-row">
            <a href="https://facebook.github.io/react/" target="_blank">
              <Image className="tech-stack-img react-img" src={MEDIA + "/react-hexagon-logo.png"} responsive/>
            </a>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Home;
