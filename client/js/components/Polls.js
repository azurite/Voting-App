const React = require("react");
const { Grid, Row, Col, Button ,Form, FormGroup, FormControl, InputGroup } = require("react-bootstrap");
const { connect } = require("react-redux");
const axios = require("axios");
const serializeQuery = require("../utils/serializeQuery");

const Poll = require("./PollCard");
const Loading = require("./LoadingIcon.js");
const actions = require("../actions/polls-actions");

function searchPolls(url, query, cb) {
  axios.get(url + serializeQuery(query))
    .then((res) => { cb(null, res.data); })
    .catch((err) => { cb(err, null); });
}

const SearchBar = React.createClass({
  propTypes: {
    submitSearch: React.PropTypes.func.isRequired,
    searchValue: React.PropTypes.string.isRequired,
    handleChange: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <Row>
        <Col md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
          <Form onSubmit={this.props.submitSearch.bind(this, this.props.searchValue)}>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>
                  <i className="fa fa-search"></i>
                </InputGroup.Addon>
                <FormControl type="text" placeholder="Seach Polls" value={this.props.searchValue} onChange={this.props.handleChange}/>
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
  propTypes: {
    searchValue: React.PropTypes.string.isRequired,
    pollData: React.PropTypes.object.isRequired,
    fetchPolls: React.PropTypes.func.isRequired,
    updateSearch: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  },
  renderPolls: function(polls) {
    if(polls.isFetching) {
      return (<Loading size="fa-3x"/>);
    }
    if(polls.fetchSuccess) {
      const Polls = polls.polldata.map((poll, index) => {
        return (
          <Col key={index} md={6} mdOffset={3} sm={8} smOffset={2} xs={10} xsOffset={1}>
            <Poll data={poll}/>
          </Col>
        );
      });
      return Polls.length === 0 ? (<Row><p className="text-center">no results</p></Row>) : (<Row>{Polls}</Row>);
    }
    if(polls.fetchError) {
      return (<p className="text-center">Whoops this shouldn't have happend. Please try again</p>);
    }
  },
  render: function() {
    return (
      <Grid fluid className="container-aug">
        <SearchBar
          submitSearch={this.props.fetchPolls}
          searchValue={this.props.searchValue}
          handleChange={this.props.updateSearch}
        />
        {this.renderPolls(this.props.pollData)}
      </Grid>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    searchValue: state.polls.searchBar.search,
    pollData: state.polls.polls
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    fetchPolls: function(query, e) {
      e.preventDefault();
      dispatch(actions.fetchPolls());

      searchPolls("/api/search", { q: query }, function(err, polls) {
        if(err || polls.error) {
          dispatch(actions.fetchError(err || polls.error));
          return;
        }
        dispatch(actions.fetchSuccess(polls));
      });
    },
    updateSearch: function(e) {
      dispatch(actions.updateSearch(e.target.value));
    }
  };
};

const PollsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Polls);

module.exports = PollsContainer;
