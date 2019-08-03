import Navbar from './Navbar';

if (typeof window !== 'undefined') {
    require('materialize-css/dist/css/materialize.css');
}

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <div>{children}</div>
        </React.Fragment>
    );
};

export default Layout;
