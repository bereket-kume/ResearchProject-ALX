import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Home from "./components/Home";
import { theme } from "./theme";
import axios from 'axios';
import API_BASE_URL from './config';
import Notifications from './components/Notifications';

const App = () => {
    const isAuthenticated = localStorage.getItem('access');

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh');
            if (refreshToken) {
                await axios.post(`${API_BASE_URL}/api/logout/`, {
                    refresh: refreshToken
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('username');
            // Remove authorization header
            delete axios.defaults.headers.common['Authorization'];
            // Reload the page to reset the application state
            window.location.href = '/';
        }
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <nav className="bg-white shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <Link to="/" className="flex items-center">
                                    <span className={`${theme.typography.h3} text-blue-600`}>Marketplace</span>
                                </Link>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    <Link
                                        to="/"
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/products"
                                        className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                    >
                                        Products
                                    </Link>
                                    {isAuthenticated && (
                                        <Link
                                            to="/dashboard"
                                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                        >
                                            Dashboard
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                {isAuthenticated ? (
                                    <div className="flex items-center space-x-4">
                                        <Notifications />
                                        <span className="text-gray-700">
                                            Welcome, {localStorage.getItem('username')}
                                        </span>
                                        <button
                                            onClick={handleLogout}
                                            className={`${theme.transitions.default} inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700`}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex space-x-4">
                                        <Link
                                            to="/login"
                                            className={`${theme.transitions.default} inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700`}
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            to="/register"
                                            className={`${theme.transitions.default} inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200`}
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route
                        path="/dashboard"
                        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/register"
                        element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
                    />
                </Routes>
        </div>
        </Router>
    );
};

export default App;
