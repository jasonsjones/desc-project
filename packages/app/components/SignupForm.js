import Router from 'next/router';
const SignupForm = () => {
    const handleChange = () => {};
    const handleSubmit = e => {
        e.preventDefault();
        console.log('submitting the form...');
    };

    const handleCancel = () => {
        // clear form
        Router.push('/');
    };

    return (
        <div
            className="card-panel"
            style={{ padding: '50px', maxWidth: '760px', margin: '0 auto' }}
        >
            <h5 className="center-align">Signup for Account</h5>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <i className="small material-icons prefix">account_circle</i>
                        <input
                            type="text"
                            id="firstName"
                            // value={this.state.firstName}
                            onChange={handleChange}
                        />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input
                            type="text"
                            id="lastName"
                            // value={this.state.lastName}
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
                            // value={this.state.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Your Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="small material-icons prefix">lock</i>
                        <input
                            type="password"
                            id="password"
                            // value={this.state.password}
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
                            // value={this.state.confirmPassword}
                            onChange={handleChange}
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                    </div>
                </div>
                <div className="row" style={{ marginBottom: '20px' }}>
                    <div className="col offset-s1 offset-l8">
                        <div className="row">
                            <button
                                className="btn"
                                type="button"
                                onClick={handleCancel}
                                style={{ marginRight: '20px' }}
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
