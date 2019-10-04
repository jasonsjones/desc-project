import React from 'react';
import Select from './Select';
import ItemOptionsUtility from './ItemOptionsUtility';

class ItemRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: nest item values in currentItem
            category: '',
            itemType: '',
            gender: '',
            count: 1,
            notes: ''
        };

        this.itemOptionsUtility = new ItemOptionsUtility();
        this.handleInput = this.handleInput.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
    }

    handleInput(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleAddItem(event) {
        this.props.onItemAdded(this.state);
    }

    getCategories() {
        return this.itemOptionsUtility.getCategories();
    }

    getItemsInCategory() {
        return this.itemOptionsUtility.getItemsInCategory(this.state.category);
    }

    getGenders() {
        // todo: move to utility
        return ['male', 'female'];
    }

    genderSelection() {
        let itemIsGendered = this.itemOptionsUtility.isItemGendered(
            this.state.category,
            this.state.itemType
        );
        if (itemIsGendered) {
            return (
                <Select
                    title={'Item Gender'}
                    name={'gender'}
                    options={this.getGenders()}
                    value={this.state.gender}
                    placeholder={'Select Gender'}
                    handleChange={this.handleInput}
                />
            );
        }
    }

    categorySelection() {
        return (
            <Select
                title={'Category'}
                name={'category'}
                options={this.getCategories()}
                value={this.state.category}
                placeholder={'Select Category'}
                handleChange={this.handleInput}
            />
        );
    }

    itemTypeSelection() {
        return (
            <Select
                title={'Type of Item'}
                name={'itemType'}
                options={this.getItemsInCategory()}
                value={this.state.itemType}
                placeholder={'Select Category'}
                handleChange={this.handleInput}
            />
        );
    }

    itemCountSelection() {
        return (
            <input
                type="number"
                name="count"
                placeholder="Number of item requested"
                value={this.state.count}
                onChange={this.handleInput}
            />
        );
    }

    notesInput() {
        return (
            <input
                type="text"
                placeholder="Notes"
                name="notes"
                value={this.state.notes}
                onChange={this.handleInput}
            />
        );
    }

    render() {
        return (
            <form className="container card-panel">
                <div className="card-content">
                    {this.categorySelection()}
                    {this.itemTypeSelection()}

                    {/* optional */}
                    {this.genderSelection()}

                    <p>Count requested</p>
                    {this.itemCountSelection()}

                    {this.notesInput()}
                </div>
                <div className="card-action">
                    <a className="btn" href="#!" onClick={this.handleAddItem}>
                        Add item
                    </a>
                </div>
            </form>
        );
    }
}

export default ItemRequest;
