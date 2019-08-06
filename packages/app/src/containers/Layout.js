import React from 'react';
import Nav from '../components/Nav/Nav';

const Layout = props => (
    <React.Fragment>
        <Nav />
        <div className="container">{props.children}</div>
    </React.Fragment>
);

export default Layout;
