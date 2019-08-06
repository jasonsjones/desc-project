import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import M from 'materialize-css';

const SignupForm = ({ history }) => {
    const authCtx = useContext(AuthContext);
    const [form, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        program: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (form.confirmPassword.length > 0 && form.password !== form.confirmPassword) {
            setError('Passwords do NOT match');
        }
        if (form.confirmPassword.length > 0 && form.password === form.confirmPassword) {
            setError(null);
        }
    }, [form]);

    useEffect(() => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, []);

    const handleChange = e => {
        setValues({
            ...form,
            [e.target.id]: e.target.value
        });
    };

    const isFormValid = () => {
        return (
            form.firstName.length > 0 &&
            form.lastName.length > 0 &&
            form.email.length > 0 &&
            form.password.length > 0 &&
            form.program.length > 0 &&
            form.password === form.confirmPassword
        );
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (isFormValid()) {
            const payload = {
                name: {
                    first: form.firstName,
                    last: form.lastName
                },
                email: form.email,
                password: form.password,
                program: form.program
            };
            fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data.success) {
                        const { user, token } = data.payload;
                        authCtx.login(user, token);
                        history.push('/');
                    }
                })
                .catch(err => console.error(err));
        }
    };

    const handleCancel = () => {
        history.push('/');
    };

    return (
        <div
            className="card-panel"
            style={{ padding: '20px 30px', maxWidth: '670px', margin: '0 auto' }}
        >
            <h4 className="center-align teal-text text-darken-3">Register for Account</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <i className="small material-icons prefix">account_circle</i>
                        <input
                            type="text"
                            id="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                        />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                            type="text"
                            id="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="small material-icons prefix">email</i>
                        <input
                            className="validate"
                            type="email"
                            id="email"
                            value={form.memail}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Your Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="small material-icons prefix">domain</i>
                        <select defaultValue="default" id="program" onChange={handleChange}>
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
                        <label htmlFor="program">Program</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="small material-icons prefix">lock</i>
                        <input
                            type="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="small material-icons prefix">lock</i>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        {error && <span className="helper-text red-text">{error}</span>}
                    </div>
                </div>
                <div className="row">
                    <div className="col offset-s1 offset-l8">
                        <div className="row">
                            <button
                                className="btn"
                                type="button"
                                onClick={handleCancel}
                                style={{
                                    backgroundColor: 'white',
                                    color: 'teal',
                                    marginRight: '20px'
                                }}
                            >
                                Cancel
                            </button>
                            <button className="btn" type="submit">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
