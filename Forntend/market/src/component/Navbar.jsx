import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <header className="header_section">
            <nav className="navbar custom_nav-container">
                <a className="navbar-brand" href="index.html">
                    <span>Gebey</span>
                </a>
                <div className="navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="index.html">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="shop.html">Shop</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="why.html">Why Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="contact.html">Contact Us</a>
                        </li>
                    </ul>
                    <div className="user_option">
                        <a href="#">
                            <i className="fa fa-user" aria-hidden="true"></i>
                            <span>Login</span>
                        </a>
                        <a href="#">
                            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                        </a>
                        <form className="form-inline">
                            <button className="btn nav_search-btn" type="submit">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
