import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access')) {
            setIsAuth(true);
        }
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    };

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <header className="header_section">
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen ? "true" : "false"}
                                onClick={toggleMobileMenu}
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                                <svg
                                    className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Link to="/">
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" to="/">Home</Link>
                                    <Link className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" to="/shop">Shop</Link>
                                    {isAuth && (
                                        <Link className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" to="/dashboard">Dashboard</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {isAuth ? (
                                <button
                                    onClick={logout}
                                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={openModal}
                                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <Link className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" to="/">Home</Link>
                        <Link className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" to="/shop">Shop</Link>
                        {isAuth && (
                            <Link className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" to="/dashboard">Dashboard</Link>
                        )}
                        <Link className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white" to="/contact">Contact Us</Link>
                        {isAuth ? (
                            <button
                                onClick={logout}
                                className="w-full rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={openModal}
                                className="w-full rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            <ModalLogin isOpen={isModalOpen} onClose={closeModal} />
        </header>
    );
};

export default Navbar;
