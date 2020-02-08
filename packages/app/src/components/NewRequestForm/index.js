import React, { useState, useEffect, useReducer } from 'react';
import M from 'materialize-css';
import TextField from '../Common/TextField';
import Select from '../RequestCreation/Select';
import * as ItemUtil from './itemsUtil';

const initSelect = () => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
};

const initialState = {
    selectedCategory: '',
    availableItems: [],
    selectedItem: '',
    gender: [],
    selectedGender: '',
    availableSizes: [],
    selectedSize: ''
};

const itemReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case 'CATEGORY_SELECTED':
            return {
                ...state,
                selectedCategory: action.payload,
                availableItems: ItemUtil.getItemsInCategory(action.payload),
                availableSizes: [],
                gender: [],
                selectedItem: '',
                selectedSize: '',
                selectedGender: ''
            };
        case 'ITEM_SELECTED':
            if (action.payload === 'Bra') {
                return {
                    ...state,
                    selectedItem: action.payload,
                    selectedSize: '',
                    selectedGender: 'Female',
                    availableSizes: ItemUtil.getBraSizes()
                };
            }
            const isItemGendered = ItemUtil.isItemGendered(state.selectedCategory, action.payload);
            console.log('Is item gendered? ', action.payload, isItemGendered);
            const sizes =
                !isItemGendered && state.selectedCategory === 'Clothing'
                    ? ItemUtil.getItemNonGenderSizes(state.selectedCategory, action.payload)
                    : [];
            return {
                ...state,
                selectedItem: action.payload,
                selectedGender: '',
                selectedSize: '',
                gender: isItemGendered ? ['Male', 'Female'] : [],
                availableSizes: sizes
            };
        case 'GENDER_SELECTED':
            return {
                ...state,
                selectedGender: action.payload,
                selectedSize: '',
                availableSizes: ItemUtil.getItemGenderSizes(
                    state.selectedCategory,
                    state.selectedItem,
                    action.payload
                )
            };
        case 'SIZE_SELECTED':
            return {
                ...state,
                selectedSize: action.payload
            };
        default:
            return state;
    }
};

const ItemForm = () => {
    const [state, dispatch] = useReducer(itemReducer, initialState);

    useEffect(() => {
        initSelect();
    }, []);

    useEffect(() => {
        Promise.resolve().then(() => {
            initSelect();
        });
    }, [state]);

    const handleSelection = field => {
        return e => {
            switch (field) {
                case 'category':
                    dispatch({ type: 'CATEGORY_SELECTED', payload: e.target.value });
                    break;
                case 'item':
                    dispatch({ type: 'ITEM_SELECTED', payload: e.target.value });
                    break;
                case 'gender':
                    dispatch({ type: 'GENDER_SELECTED', payload: e.target.value });
                    break;
                case 'size':
                    console.log('size: ', e.target.value);
                    dispatch({ type: 'SIZE_SELECTED', payload: e.target.value });
                    break;
                default:
                    break;
            }
        };
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        console.log('state: ', {
            category: state.selectedCategory,
            item: state.selectedItem,
            gender: state.selectedGender,
            size: state.selectedSize
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h6 className="teal-text text-darken-3">Select Item Details:</h6>
            <Select
                title="Category"
                name="category"
                options={ItemUtil.getCategories()}
                value={state.selectedCategory}
                placeholder="Select Category"
                handleChange={handleSelection('category')}
            />
            <Select
                title="Type of Item"
                name="itemType"
                options={state.availableItems}
                value={state.selectedItem}
                placeholder="Select Item"
                handleChange={handleSelection('item')}
                disabled={state.availableItems.length === 0}
            />

            {state.gender.length > 0 && (
                <Select
                    title="Item Gender"
                    name="gender"
                    options={state.gender}
                    value={state.selectedGender}
                    placeholder="Select Gender"
                    handleChange={handleSelection('gender')}
                />
            )}

            {state.availableSizes.length > 0 && (
                <Select
                    title="Item Size"
                    name="size"
                    options={state.availableSizes}
                    value={state.selectedSize}
                    placeholder="Select Size"
                    handleChange={handleSelection('size')}
                />
            )}

            <div className="row">
                <div className="col right">
                    <button className="waves-effect waves-light btn" type="submit">
                        Add Item
                    </button>
                </div>
            </div>
        </form>
    );
};

const NewRequestForm = () => {
    const [form, setValues] = useState({
        clientId: '',
        location: '',
        submittedBy: '',
        items: []
    });

    useEffect(() => {
        initSelect();
    }, []);

    const handleChange = e => {
        setValues({
            ...form,
            [e.target.id]: e.target.value
        });
    };

    return (
        <div
            className="card-panel"
            style={{ padding: '20px 30px', maxWidth: '670px', margin: '40px auto 0' }}
        >
            <h5 className="center-align teal-text text-darken-3">New Request</h5>
            <div className="row">
                <div className="col s6">
                    <TextField
                        label="Client ID"
                        type="text"
                        name="clientId"
                        value={form.clientId}
                        handleChange={handleChange}
                    />
                </div>
                <div className="input-field col s6">
                    <i className="small material-icons prefix">domain</i>
                    <select defaultValue="default" id="location" onChange={handleChange}>
                        <option value="default" disabled>
                            Select your location
                        </option>
                        <option value="eastlake">1811 Eastlake</option>
                        <option value="aurora">Aurora House</option>
                        <option value="canaday">Canaday House</option>
                        <option value="clement">Clement Place</option>
                        <option value="cottage-grove">Cottage Grove Commons</option>
                        <option value="estelle">The Estelle</option>
                        <option value="evans">Evans House</option>
                        <option value="interbay">Interbay Place</option>
                        <option value="kerner-scott">Kerner-Scott House</option>
                        <option value="keyes">Keys to Home</option>
                        <option value="lyon">Lyon Building</option>
                        <option value="morrison">The Morrison</option>
                        <option value="rainier">Rainier House</option>
                        <option value="union">The Union Hotel</option>
                    </select>
                    <label htmlFor="location">Location</label>
                </div>
            </div>

            <div className="col s12">
                <ItemForm />
            </div>
        </div>
    );
};

export default NewRequestForm;
