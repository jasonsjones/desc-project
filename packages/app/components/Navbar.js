import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="nav-wrapper teal">
            <div className="container">
                <Link href="/">
                    <a className="brand-logo">DESC In Kind Portal</a>
                </Link>
                <ul className="right hide-on-med-and-down">
                    <li>
                        <Link href="/signup">
                            <a>Sign up</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/signin">
                            <a>Sign in</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/create">
                            <a>Create Request</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/inbox">
                            <a>View Requests</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
