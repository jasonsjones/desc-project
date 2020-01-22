import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import TextField from '../Common/TextField';
import Select from '../RequestCreation/Select';
import { getCategories, getItemsInCategory, isItemGendered, getItemGenderSizes } from './itemsUtil';

const initSelect = () => {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
};

const NewRequestForm = () => {
    const [form, setValues] = useState({
        clientId: '',
        location: '',
        submittedBy: '',
        category: '',
        itemType: '',
        gender: '',
        size: '',
        items: []
    });

    const [items, setItems] = useState([]);

    useEffect(() => {
        initSelect();
    }, []);

    useEffect(() => {
        setItems(getItemsInCategory(form.category));
        setValues(f => {
            return {
                ...f,
                itemType: ''
            };
        });
    }, [form.category]);

    useEffect(() => {
        setValues(f => {
            return {
                ...f,
                gender: '',
                size: ''
            };
        });
    }, [form.itemType]);

    useEffect(() => {
        console.log(form);
        Promise.resolve().then(() => {
            initSelect();
        });
    }, [form]);

    const handleChange = e => {
        setValues({
            ...form,
            [e.target.id]: e.target.value
        });
    };

    const getSizes = () => {
        return getItemGenderSizes(form.category, form.itemType, form.gender) || [];
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
                <div className="col s6">
                    <TextField
                        label="Client Location"
                        type="text"
                        name="location"
                        value={form.location}
                        handleChange={handleChange}
                    />
                </div>
                <Select
                    title="Category"
                    name="category"
                    options={getCategories()}
                    value={form.category}
                    placeholder="Select Category"
                    handleChange={handleChange}
                />
                <Select
                    title="Type of Item"
                    name="itemType"
                    options={items}
                    value={form.itemType}
                    placeholder="Select Item"
                    handleChange={handleChange}
                />
                {isItemGendered(form.category, form.itemType) && (
                    <>
                        <Select
                            title="Item Gender"
                            name="gender"
                            options={['Male', 'Female']}
                            value={form.gender}
                            placeholder="Select Gender"
                            handleChange={handleChange}
                        />
                        <Select
                            title="Item Size"
                            name="size"
                            options={getSizes()}
                            value={form.size}
                            placeholder="Select Size"
                            handleChange={handleChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default NewRequestForm;

/* <div className="input-field">
                    <select
                        id="itemType"
                        value={form.itemType}
                        placeholder="Select Item"
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select Item
                        </option>
                        {items.map((item,i) => {
                            console.log(item);
                            return <option key={i} value={item}>{item}</option>
                        })}
                    </select>
                    <label htmlFor="itemType">Type of Item</label>
                </div> */

/* <select defaultValue="default" id="program" onChange={handleChange}>
                    <option value="default" disabled>
                        Select your program
                    </option>
                    <option value="housing">Housing First</option>
                    <option value="integrated">Integrated Services</option>
                    <option value="survival">Survival Services</option>
                    <option value="health">Health Services</option>
                    <option value="employment">Employment Services</option>
                    <option value="research_innovation">Research &amp; Innovation</option>
                </select>
                <label htmlFor="program">Program</label> */
