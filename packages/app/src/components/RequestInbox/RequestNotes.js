import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css';
import * as actions from '../../actions/actions';

class RequestNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            currentNote: ''
        };

        this.handleCurrentNoteChange = this.handleCurrentNoteChange.bind(this);
        this.handleSubmitNote = this.handleSubmitNote.bind(this);
    }

    getNotes = () => {
        const notes = this.state.item.notes.map((note, i) => (
            <li key={i}>
                <b>
                    {note.submittedBy.name.first} {note.submittedBy.name.last}:{' '}
                </b>
                {note.body}
            </li>
        ));

        return notes;
    };

    handleCurrentNoteChange(event) {
        this.setState({ currentNote: event.target.value });
    }

    handleSubmitNote(event) {
        console.log(this.state.currentNote);
        var id = this.props.item._id;

        var noteData = {
            itemId: id,
            requestBody: {
                // TODO get current user id
                submittedBy: this.props.contextUser || '5bc50dabf5aa6ae120b49005',
                body: this.state.currentNote
            }
        };
        const baseUrl = 'http://localhost:3000';
        fetch(`${baseUrl}/api/items/${noteData.itemId}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData.requestBody)
        })
            .then(function(response) {
                console.log(response);
                if (response.ok && response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject({ message: 'err' });
                }
            })
            .then(function(data) {
                if (data.success) {
                    M.toast({ html: 'Note posted' });
                } else {
                    M.toast({ html: 'Error sending note' });
                }
                console.log(data);
            })
            .catch(function(err) {
                console.log(err);
            });

        // Once note is posted, reset text input
        this.setState({ currentNote: '' });
        // how to add to list of notes upon posting??
        this.state.item.notes.append(noteData);
        // location.reload();
    }

    render() {
        return (
            <div>
                <h6>Notes</h6>
                <ul>{this.getNotes()}</ul>
                <input
                    placeholder="Add a note"
                    id=""
                    type="text"
                    value={this.state.currentNote}
                    onChange={this.handleCurrentNoteChange}
                />
                {/* <input type="submit" value="Submit note" /> */}
                <button
                    className="btn waves-effect waves-light"
                    type="submit"
                    onClick={this.handleSubmitNote}
                >
                    Post Note
                </button>
            </div>
        );
    }
}

RequestNotes.propTypes = {
    postNoteToItem: PropTypes.func,
    contextUser: PropTypes.object
};

const mapStateToProps = state => {
    return {
        isAuth: state.isAuth,
        contextUser: state.contextUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        postNoteToItem: noteData => dispatch(actions.postNoteToItem(noteData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestNotes);
