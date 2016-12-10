const React = require("react");
const { Grid, Row, Col, Image, Button, FormGroup, InputGroup, FormControl, ControlLabel } = require("react-bootstrap");
const { connect } = require("react-redux");
const axios = require("axios");
const serializeQuery = require("../utils/serializeQuery");
const actions = require("../actions/profile-actions");
const Poll = require("./PollCard");
const MEDIA = require("../utils/media");

function submitEditSave(url, poll, cb) {
  var polldata = {
    title: poll.title,
    options: poll.options
  };

  if(poll.isNewPoll) {

    axios.post(url, { polldata: polldata })
      .then((res) => { cb(null, res.data, "add"); })
      .catch((err) => { cb(err); });
  }
  else {
    polldata.id = poll.id;

    axios.put(url, { polldata: polldata })
      .then((res) => { cb(null, res.data, "update"); })
      .catch((err) => { cb(err); });
  }
}

function deletePoll(url, poll, cb) {
  axios.delete(url + serializeQuery({ id: poll.id }))
    .then((res) => { cb(null, res.data); })
    .catch((err) => { cb(err); });
}

const PollEditor = React.createClass({
  propTypes: {
    content: React.PropTypes.object,
    showEditor: React.PropTypes.bool.isRequired,
    updatePollInput: React.PropTypes.func.isRequired,
    saveEdit: React.PropTypes.func.isRequired,
    cancelEdit: React.PropTypes.func.isRequired,
    removeOption: React.PropTypes.func.isRequired,
    addOption: React.PropTypes.func.isRequired,
    isSaving: React.PropTypes.bool.isRequired,
    err: React.PropTypes.object
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
            <FormGroup>
              <ControlLabel>Poll Title</ControlLabel>
              <FormControl type="text" id="editPollTitle" value={this.props.content.title} onChange={this.handleChange}/>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Add Option</ControlLabel>
              <InputGroup>
                <FormControl
                  type="text"
                  id="editPollOption"
                  value={this.props.content.newOption}
                  onChange={this.handleChange}
                  onKeyPress={(e) => { e.which === 13 ? this.addOption() : false; }}
                />
                <InputGroup.Button>
                  <Button onClick={this.addOption}>Add</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>

            <ul className="poll-editor-ul">
              {this.props.content.options.map((opt, i) => {
                return (
                  <li className="poll-editor-li" key={i + opt.option + opt.votes}>
                    {opt.option}
                    <Button onClick={this.props.removeOption.bind(this, opt)}>
                      <i className="fa fa-close"></i>
                    </Button>
                  </li>
                );
              })}
            </ul>

            <FormGroup>
              <Button className="editor-btn" onClick={this.props.saveEdit.bind(this, this.props.content)}>Save</Button>
              <Button className="editor-btn" onClick={this.props.cancelEdit}>Cancel</Button>
              {this.props.isSaving ? <i className="fa fa-spinner fa-spin"></i> :
              (this.props.err ? <span className="error-msg">{this.props.err.message}</span> : null)}
            </FormGroup>
        </div>
      </Col>
    );
  }
});

const User = React.createClass({
  propTypes: {
    user: React.PropTypes.object,
    params: React.PropTypes.object,
    editDisabled: React.PropTypes.bool.isRequired,
    deleteDisabled: React.PropTypes.bool.isRequired,
    createDisabled: React.PropTypes.bool.isRequired,
    createPoll: React.PropTypes.func.isRequired,
    editPoll: React.PropTypes.func.isRequired,
    deletePoll: React.PropTypes.func.isRequired,
    editorContent: React.PropTypes.object.isRequired,
    editorOpen: React.PropTypes.bool.isRequired,
    updatePollInput: React.PropTypes.func.isRequired,
    saveEdit: React.PropTypes.func.isRequired,
    cancelEdit: React.PropTypes.func.isRequired,
    removeOption: React.PropTypes.func.isRequired,
    addOption: React.PropTypes.func.isRequired,
    isSaving: React.PropTypes.bool.isRequired,
    err: React.PropTypes.object,
    isDeleting: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.object]).isRequired,
    deleteErr: React.PropTypes.object
  },
  renderPolls: function() {
    if(this.props.user.ownPolls.length === 0) {
      return (
        <Col xs={12}>
          <p>You dont have any polls</p>
        </Col>
      );
    }
    var isDel = this.props.isDeleting;
    var delErr = this.props.deleteErr;

    return this.props.user.ownPolls.map((poll, i) => {
      return (
        <Col xs={12} key={i} className="user-poll-cards">
          <Poll data={poll}/>
          <Button
            className="pollcard-btn"
            onClick={this.props.editPoll.bind(this, poll)}
            disabled={this.props.editDisabled}>
            Edit
          </Button>
          <Button
            className="pollcard-btn"
            bsStyle="danger"
            onClick={this.props.deletePoll.bind(this, poll)}
            disabled={this.props.deleteDisabled}>
            Delete
          </Button>
          {isDel && isDel.id === poll.id ? <i className="fa fa-spinner fa-spin"></i> : null}
          {delErr && delErr.for === poll.id ? <span className="error-msg">{delErr.data.message}</span> : null}
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
                <h2 className="text-center">{"Profile of: " + this.props.params.username}</h2>
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
                <Button
                  className="create-poll-btn"
                  onClick={this.props.createPoll}
                  disabled={this.props.createDisabled}>
                  Create Poll
                </Button>
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
                isSaving={this.props.isSaving}
                err={this.props.err}
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
    user: state.user,
    editorContent: state.profile.editorContent,
    editorOpen: state.profile.editorOpen,
    editDisabled: state.profile.editDisabled,
    deleteDisabled: state.profile.deleteDisabled,
    createDisabled: state.profile.createDisabled,
    isSaving: state.profile.isSaving,
    err: state.profile.err,
    isDeleting: state.profile.isDeleting,
    deleteErr: state.profile.deleteErr
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    updatePollInput: function(field, input) {
      dispatch(actions.updatePollInput(field, input));
    },
    createPoll: function() {
      dispatch(actions.createPoll());
    },
    editPoll: function(poll) {
      dispatch(actions.editPoll(poll));
    },
    deletePoll: function(poll) {
      dispatch(actions.deletePoll(poll.id));
      deletePoll("/api/polleditor", poll, function(err, res) {
        if(err || res.error) {
          dispatch(actions.deleteError(err || res.error, poll.id));
          return;
        }
        dispatch(actions.deleteSuccess());
        dispatch(actions.updateUserData(res));
        dispatch(actions.updateSearchCache(poll, "remove"));
      });
    },
    saveEdit: function(poll) {
      if(poll.options.length > 0) {
        dispatch(actions.saveEdit());
        submitEditSave("/api/polleditor", poll, function(err, res, type) {
          if(err || res.error) {
            dispatch(actions.saveError(err || res.error));
            return;
          }
          dispatch(actions.saveSuccess());
          dispatch(actions.updateUserData(res));

          if(type === "update") {
            var updated = res.ownPolls.find((p) => {
              return p.id === poll.id;
            });
            dispatch(actions.updateSearchCache(updated, "update"));
          }
        });
      }
      else {
        dispatch(actions.saveError({ message: "You have to add at least 1 option" }));
      }
    },
    cancelEdit: function() {
      dispatch(actions.cancelEdit());
    },
    removeOption: function(opt) {
      dispatch(actions.removeOption(opt));
    },
    addOption: function(option) {
      if(option.trim() !== "") {
        dispatch(actions.addOption({ option: option, votes: 0 }));
      }
    }
  };
};

const UserContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(User);

module.exports = UserContainer;
