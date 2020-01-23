import React from 'react';
import M from 'materialize-css';
import ItemRequest from './ItemRequest';
import RequestedItems from './RequestedItems';
import TextField from '../Common/TextField';
import AuthContext from '../../context/AuthContext';

class RequestCreationPage extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            requestCreator: {},

            clientId: '',
            location: '',
            itemsInRequest: [],

            requestStatus: 'NEW'
        };

        this.handleItemAdded = this.handleItemAdded.bind(this);
        this.submitRequest = this.submitRequest.bind(this);
    }

    componentDidMount() {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }

    handleChange = evt => {
        const { id, value } = evt.target;
        this.setState({
            [id]: value
        });
    };

    handleItemAdded(item) {
        // TODO: validate item before adding
        this.setState({
            itemsInRequest: this.state.itemsInRequest.concat([item])
        });
    }

    submitRequest() {
        const submittedBy = this.context.contextUser._id;
        let oneItem = this.state.itemsInRequest[0];

        let body = {
            clientId: this.state.clientId,
            submittedBy,
            items: [
                {
                    clientId: this.state.clientId,
                    submittedBy,
                    status: 'active',
                    location: 'Rainier House',
                    note: oneItem.notes,
                    itemCategory: oneItem.category,
                    name: oneItem.itemType,
                    numberOfItems: oneItem.count
                }
            ]
        };
        fetch('http://localhost:3000/api/clientrequests', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(body)
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
                    // M.toast({ html: 'Your request has been created' });
                    // navigate to home
                } else {
                    // M.toast({ html: 'Error' });
                }
                console.log(data);
            })
            .catch(function(err) {
                // M.toast({ html: 'Error' });
                console.log(err);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="card-panel">
                    <h5 className="center-align">New Client Request</h5>

                    <div className="row">
                        <div className="col s6">
                            <TextField
                                label="Client Id"
                                type="text"
                                name="clientId"
                                value={this.state.clientId}
                                handleChange={this.handleChange}
                            />
                        </div>
                        <div className="col s6">
                            <TextField
                                label="Client Location"
                                type="text"
                                name="location"
                                value={this.state.location}
                                handleChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <ItemRequest onItemAdded={this.handleItemAdded} />

                    <RequestedItems items={this.state.itemsInRequest} />

                    <div className="card-action">
                        <a className="btn" href="#!" onClick={this.submitRequest}>
                            Submit Request
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default RequestCreationPage;
