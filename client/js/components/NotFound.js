const React = require("react");
const { Grid, Row, Col, Image } = require("react-bootstrap");
const MEDIA = require("../utils/media");

const NotFound = React.createClass({
  render: function() {
    return (
      <Grid className="container-aug" fluid>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Image src={MEDIA + "/404-message.jpg"} responsive className="center-block"/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = NotFound;
