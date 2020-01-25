import React, { useContext, useEffect, useState } from 'react';
import M from 'materialize-css';
import Spinner from '../Common/Spinner';
import TextField from '../Common/TextField';
import AuthContext from '../../context/AuthContext';
import { getItemsForUser, addNoteToItem } from '../../services/items';

const css = {
    listHeader: {
        fontWeight: 'bold',
        display: 'flex',
        padding: '1rem 2rem',
        borderBottom: '2px #999 solid'
    },

    flexItem: {
        flex: '0 0 25%'
    },

    itemHeader: {
        padding: '0 2rem'
    }
};

const initCollapsibleElements = () => {
    const bgClasses = ['teal', 'lighten-5'];
    const onOpenStartCb = el => {
        el.querySelector('.collapsible-header').classList.add(...bgClasses);
    };
    const onCloseEndCb = el => {
        el.querySelector('.collapsible-header').classList.remove(...bgClasses);
    };
    const elems = document.querySelectorAll('.collapsible.expandable');
    M.Collapsible.init(elems, {
        accordion: false,
        onOpenStart: onOpenStartCb,
        onCloseEnd: onCloseEndCb
    });
};

const NoteDetails = ({ note }) => {
    const { first, last } = note.submittedBy.name;
    return (
        <p>
            <span style={{ fontWeight: 'bold' }}>{`${first} ${last}: `}</span> {note.body}
        </p>
    );
};

const AddNoteForm = ({ itemId, onNoteAdd }) => {
    const authContext = useContext(AuthContext);
    const [note, setNote] = useState('');
    const handleSubmit = e => {
        e.preventDefault();
        const noteBody = {
            submittedBy: authContext.contextUser._id,
            body: note
        };
        addNoteToItem(itemId, noteBody).then(res => {
            if (res.success) {
                onNoteAdd(itemId, res.payload.item);
                setNote('');
                M.updateTextFields();
                M.toast({ html: 'Note added to request', classes: 'teal' });
            }
        });
    };

    const handleChange = e => {
        setNote(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Add a Note"
                type="text"
                name={`note${itemId}`}
                value={note}
                handleChange={handleChange}
            />
            <button className="btn waves-effect waves-light" type="submit" onClick={() => {}}>
                Add Note
            </button>
        </form>
    );
};

const ListHeader = () => {
    return (
        <li>
            <div style={css.listHeader}>
                <p style={css.flexItem}>Item</p>
                <p style={css.flexItem}>Quantity</p>
                <p style={css.flexItem}>Client ID</p>
                <p style={css.flexItem}>Request Date</p>
            </div>
        </li>
    );
};

const List = ({ items, filter, isLoading }) => {
    const [displayableItems, setDisplayableItems] = useState([]);

    useEffect(() => {
        initCollapsibleElements();
    }, []);

    useEffect(() => {
        setDisplayableItems(items.filter(item => item.status === filter));
    }, [items, filter]);

    const handleNoteAdd = (itemId, itemData) => {
        setDisplayableItems(
            displayableItems.map(item => {
                if (item._id === itemId) {
                    return {
                        ...item,
                        updatedAt: itemData.updatedAt,
                        notes: [...itemData.notes]
                    };
                }
                return {
                    ...item
                };
            })
        );
    };

    if (isLoading) {
        return (
            <div style={{ margin: '5rem 0', display: 'flex', justifyContent: 'center' }}>
                <Spinner />
            </div>
        );
    }

    return (
        <ul className="collapsible expandable">
            <ListHeader />
            {displayableItems &&
                displayableItems.map(item => {
                    return (
                        <li key={item._id}>
                            <div className="collapsible-header" style={css.itemHeader}>
                                <p style={css.flexItem}>{item.name}</p>
                                <p style={css.flexItem}>{item.numberOfItems}</p>
                                <p style={css.flexItem}>{item.clientId}</p>
                                <p style={css.flexItem}>
                                    {new Date(item.createdAt).toDateString()}
                                </p>
                            </div>
                            <div className="collapsible-body">
                                <p style={{ fontSize: '1.125rem', marginBottom: '.5rem' }}>
                                    Notes:
                                </p>
                                {item.notes.map(note => (
                                    <NoteDetails key={note._id} note={note} />
                                ))}
                                <AddNoteForm itemId={item._id} onNoteAdd={handleNoteAdd} />
                            </div>
                        </li>
                    );
                })}

            {(!displayableItems || displayableItems.length === 0) && (
                <li>
                    <div style={{ padding: '1rem' }}>No items available</div>
                </li>
            )}
        </ul>
    );
};

const RequestorInbox = () => {
    const authContext = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        M.Tabs.init(document.querySelectorAll('.tabs'), {});
        setIsLoading(true);

        getItemsForUser(authContext.contextUser._id).then(data => {
            setItems(data.payload.items);
            setTimeout(() => {
                setIsLoading(false);
                initCollapsibleElements();
            }, 1000);
        });
    }, [authContext.contextUser]);

    return (
        <div style={{ marginTop: '3rem' }}>
            <h5 className="center-align">Requestor Inbox</h5>
            <div className="row" style={{ marginTop: '40px' }}>
                <div className="col s12">
                    <ul className="tabs">
                        <li className="tab col s3">
                            <a className="active" href="#open">
                                Open
                            </a>
                        </li>
                        <li className="tab col s3">
                            <a href="#approved">Approved</a>
                        </li>
                        <li className="tab col s3">
                            <a href="#declined">Declined</a>
                        </li>
                        <li className="tab col s3">
                            <a href="#wishlist">Wishlist</a>
                        </li>
                    </ul>
                </div>
                <div id="open" className="col s12">
                    <List type="open" items={items} filter="active" isLoading={isLoading} />
                </div>
                <div id="approved" className="col s12">
                    <List type="approved" items={items} filter="approved" isLoading={isLoading} />
                </div>
                <div id="declined" className="col s12">
                    <List type="declined" items={items} filter="denied" isLoading={isLoading} />
                </div>
                <div id="wishlist" className="col s12">
                    <List type="wishlist" items={items} filter="wishlist" isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
};

export default RequestorInbox;
