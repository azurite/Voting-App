const React = require("react");
const { Grid, Row, Col } = require("react-bootstrap");

const Footer = React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      className: "row-dark copy"
    };
  },
  render: function() {
    return (
      <Grid fluid>
        <Row className={this.props.className}>
          <Col lg={12} md={12} sm={12} xs={12}>
            <a href="https://github.com/MarkoN95" target="_blank">&#169; MarkoN95</a>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Footer;
