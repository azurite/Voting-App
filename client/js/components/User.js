const React = require("react");
const { Grid, Row, Col, Image, Button, Form, FormGroup, FormControl, ControlLabel } = require("react-bootstrap");
const { connect } = require("react-redux");
const actions = require("../actions/profile-actions");
const Poll = require("./PollCard");
const MEDIA = require("../utils/media");

function pretendSave(path, cb) {
  setTimeout(cb, 1000, null, { success: 1 });
}

const LiWrapper = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    removeOption: React.PropTypes.func.isRequired
  },
  removeOption: function() {
    this.props.removeOption(this.props.data);
  },
  render: function() {
    return (
      <li>
        {this.props.data.option}
        <Button onClick={this.removeOption}>
          <i className="fa fa-close"></i>
        </Button>
      </li>
    );
  }
});

const OptionList = React.createClass({
  propTypes: {
    options: React.PropTypes.array.isRequired,
    removeOption: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <ul>
        {this.props.options.map((opt, i) => {
          return (
            <LiWrapper key={i + opt.option + opt.votes + Date.now() + ""} data={opt} removeOption={this.props.removeOption}/>
          );
        })}
      </ul>
    );
  }
});

const PollEditor = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    showEditor: React.PropTypes.bool.isRequired,
    updatePollInput: React.PropTypes.func.isRequired,
    saveEdit: React.PropTypes.func.isRequired,
    cancelEdit: React.PropTypes.func.isRequired,
    removeOption: React.PropTypes.func.isRequired,
    addOption: React.PropTypes.func.isRequired
  },
  handleChange: function(e) {
    switch(e.target.id) {
      case "editPollTitle":
        this.props.updatePollInput("title", e.target.value);
        break;

      case "editPollOption":
        this.props.updatePollInput("newOption", e.target.value);
        break;
    }
    return false;
  },
  addOption: function() {
    this.props.addOption(this.props.content.newOption);
  },
  render: function() {
    return (
      <Col xs={12}>
        <div className={this.props.showEditor ? "poll-editor show" : "poll-editor"}>
          <Form onSubmit={this.props.saveEdit}>

            <FormGroup>
              <ControlLabel>Poll Title</ControlLabel>
              <FormControl
                type="text"
                id="editPollTitle"
                value={this.props.content.title}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Add Option</ControlLabel>
              <FormControl
                type="text"
                id="editPollOption"
                value={this.props.content.newOption}
                onChange={this.handleChange}
              />
              <Button onClick={this.addOption}>Add</Button>
            </FormGroup>
            <OptionList options={this.props.content.options} removeOption={this.props.removeOption}/>

            <FormGroup>
              <Button type="submit">Save</Button>
              <Button onClick={this.props.cancelEdit}>Cancel</Button>
            </FormGroup>

          </Form>
        </div>
      </Col>
    );
  }
});

const User = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    params: React.PropTypes.object,
    editPoll: React.PropTypes.func.isRequired,
    editorContent: React.PropTypes.object.isRequired,
    editorOpen: React.PropTypes.bool.isRequired,
    updatePollInput: React.PropTypes.func.isRequired,
    saveEdit: React.PropTypes.func.isRequired,
    cancelEdit: React.PropTypes.func.isRequired,
    removeOption: React.PropTypes.func.isRequired,
    addOption: React.PropTypes.func.isRequired
  },
  deletePoll: function() {
    //poll as firts argument
    //make delete ajax request here
  },
  renderPolls: function() {
    if(this.props.user.ownPolls.length === 0) {
      return (
        <Col xs={12}>
          <p>You dont have any polls</p>
        </Col>
      );
    }
    return this.props.user.ownPolls.map((poll, i) => {
      return (
        <Col xs={12} key={i} className="user-poll-cards">
          <Poll data={poll}/>
          <Button className="pollcard-btn" onClick={this.props.editPoll.bind(this, poll)}>Edit</Button>
          <Button className="pollcard-btn" bsStyle="danger" onClick={this.deletePoll.bind(this, poll)}>Delete</Button>
        </Col>
      );
    });
  },
  render: function() {
    return (
      <Grid fluid className="container-aug">
        <Row>

          <Col md={5} mdOffset={1} sm={10} smOffset={1} xs={10} xsOffset={1}>
            <Row>
              <Col xs={12}>
                <h2 className="text-center">{"Profile of: " + this.props.params.userId}</h2>
              </Col>
            </Row>

            <div className="line"/>

            <Row className="vertical-align">
              <Col sm={6} xs={12}>
                <Image className="profile-img" src={MEDIA + "/avatar-default.png"} responsive circle/>
              </Col>
              <Col sm={6} xs={12}>
                <h3>{this.props.user.email}</h3>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Button className="create-poll-btn">Create Poll</Button>
              </Col>
            </Row>

            <Row>
              <PollEditor
                content={this.props.editorContent}
                showEditor={this.props.editorOpen}
                updatePollInput={this.props.updatePollInput}
                saveEdit={this.props.saveEdit}
                cancelEdit={this.props.cancelEdit}
                removeOption={this.props.removeOption}
                addOption={this.props.addOption}
              />
            </Row>
          </Col>

          <Col md={5} mdOffset={0} sm={10} smOffset={1} xs={10} xsOffset={1}>
            <Col xs={12}>
              <h2 className="text-center">My Polls</h2>
              <div className="line"/>
            </Col>
            {this.renderPolls()}
          </Col>

        </Row>
      </Grid>
    );
  }
});

const mapStateToProps = function(state) {
  return {
    user: state.login.user,
    editorContent: state.profile.editorContent,
    editorOpen: state.profile.editorOpen
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    updatePollInput: function(field, input) {
      dispatch(actions.updatePollInput(field, input));
    },
    editPoll: function(poll) {
      dispatch(actions.editPoll(poll));
    },
    saveEdit: function(e) {
      e.preventDefault();
      dispatch(actions.saveEdit());
      pretendSave("/path/to/api/route", function(err, status) {
        if(err) {
          dispatch(actions.saveError(err));
          return;
        }
        if(status.success === 1) {
          dispatch(actions.saveSuccess());
        }
      });
    },
    cancelEdit: function() {
      dispatch(actions.cancelEdit());
    },
    removeOption: function(opt) {
      dispatch(actions.removeOption(opt));
    },
    addOption: function(option) {
      dispatch(actions.addOption({
        option: option,
        votes: 0
      }));
    }
  };
};

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

module.exports = UserContainer;
