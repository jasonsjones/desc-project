import React from 'react';

class RequestedItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getRequestedItems() {
        if (this.props.items.length > 0) {
            let hi = this.props.items.map(item => (
                // TODO: make separate component for each row
                <p>
                    {item.count} {item.itemType}(s){' '}
                </p>
            ));

            return hi;
        } else {
            return <p>Your cart is empty</p>;
        }
    }

    render() {
        return (
            <div className="container card-panel">
                <h6>Items to request:</h6>

                {this.getRequestedItems()}
            </div>
        );
    }
}

export default RequestedItems;
