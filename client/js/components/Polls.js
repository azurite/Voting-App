const React = require("react");
const { Grid, Row, Col, Button ,Form, FormGroup, FormControl, InputGroup } = require("react-bootstrap");

const Poll = require("./PollCard");
const Loading = require("./LoadingIcon.js");

function pretendFetch(path, cb) {
  const polls = require("../dev/samplePolls");
  setTimeout(cb, 1000, null, polls);
}

const SearchBar = React.createClass({
  propTypes: {
    onSearch: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      search: ""
    };
  },
  handleChange: function(e) {
    this.setState({
      search: e.target.value
    });
  },
  search: function(e) {
    e.preventDefault();
    this.props.onSearch(e, this.state.search);
  },
  render: function() {
    return (
      <Row>
        <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
          <Form onSubmit={this.search}>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>
                  <i className="fa fa-search"></i>
                </InputGroup.Addon>
                <FormControl type="text" placeholder="Seach Polls" value={this.state.search} onChange={this.handleChange}/>
                <InputGroup.Button>
                  <Button type="submit">Go!</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
});

const Polls = React.createClass({
  getInitialState: function() {
    return {
      isFetching: false,
      polls: []
    };
  },
  fetchPolls: function(e, searchKeys) {
    console.log("searched for: " + searchKeys);
    this.setState({
      isFetching: true
    });
    pretendFetch("../dev/samplePolls", (err, polls) => {
      if(err) {
        console.error("error fetching polls");
        return;
      }
      this.setState({
        isFetching: false,
        polls: polls
      });
    });
  },
  renderPolls: function() {
    const Polls = this.state.polls.map((poll, index) => {
      return (<Poll key={index} data={poll}/>);
    });
    return (<Row>{Polls}</Row>);
  },
  render: function() {
    return (
      <Grid fluid>
        <SearchBar onSearch={this.fetchPolls}/>
        {this.state.isFetching ? <Loading size="fa-3x"/> : this.renderPolls()}
      </Grid>
    );
  }
});

module.exports = Polls;
