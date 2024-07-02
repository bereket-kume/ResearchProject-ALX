import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import './Navbar.css';
import Profile from './Profile';

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access')) {
            setIsAuth(true);
        }
    }, []); // Runs only once when the component mounts

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    };

    return (
        <header className="header_section">
            <nav className="fixed top-0 left-0 w-full text-white p-4 z-50">
                <div className="flex flex-row items-center justify-between">
                    <div className="navbar-collapse">
                        <ul className="navbar-nav flex flex-row space-x-4">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop">Shop</Link>
                            </li>
                            {isAuth && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                        <div className="user_option flex items-center space-x-4">
                            {isAuth ? (
                                <button onClick={logout} className="nav-link flex items-center">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <button onClick={openModal} className="nav-link flex items-center">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                    <span>Login</span>
                                </button>
                            )}
                            <Link to="/cart" className="nav-link">
                                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                            </Link>
                            <form className="form-inline">
                                <button className="btn nav_search-btn" type="submit">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className='w-16 h-16 border border-gray-500 rounded-full bg-black'>
                    <Profile />
                    </div>
                </div>
            </nav>
            <ModalLogin isOpen={isModalOpen} onClose={closeModal} />
        </header>
    );
};

export default Navbar;
