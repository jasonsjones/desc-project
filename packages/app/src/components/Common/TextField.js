import React from 'react';

const TextField = ({ type, name, label, validate, value, error, icon, disabled, handleChange }) => {
    return (
        <div className="input-field">
            {icon && <i className="small material-icons prefix">{icon}</i>}
            <input
                className={validate ? 'validate' : ''}
                type={type}
                id={name}
                value={value}
                onChange={handleChange}
                disabled={disabled}
            />
            <label htmlFor={name}>{label}</label>
            {error && <span className="helper-text red-text">{error}</span>}
        </div>
    );
};

TextField.defaultProps = {
    type: 'text',
    name: 'unknown',
    label: 'Text Label',
    validat: false,
    value: '',
    icon: '',
    handleChange: () => {}
};

export default TextField;
