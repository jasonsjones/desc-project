import Navbar from './Navbar';

if (typeof window !== 'undefined') {
    require('materialize-css');
    require('materialize-css/dist/css/materialize.css');
}

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <div className="container" style={{ marginTop: '40px' }}>
                {children}
            </div>
        </React.Fragment>
    );
};

export default Layout;
