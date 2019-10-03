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
        var id = this.props.item._id;

        var noteData = {
            itemId: id,
            requestBody: {
                // TODO get current user id
                submittedBy: this.props.contextUser || '5bc50dabf5aa6ae120b49005',
                body: this.state.currentNote
            }
        };

        this.props.postNoteToItem(noteData);

        // Once note is posted, reset text input
        this.setState({ currentNote: '' });

        // TODO: add to list of notes without requiring refresh
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