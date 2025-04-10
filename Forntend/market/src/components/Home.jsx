import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import { theme } from "../theme";

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/items/`);
                setFeaturedProducts(response.data.slice(0, 4)); // Get first 4 products as featured
                setLoading(false);
            } catch (error) {
                console.error('Error fetching featured products:', error);
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Marketplace"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative container mx-auto px-4 py-32">
                    <div className="max-w-3xl">
                        <h1 className={`${theme.typography.h1} mb-6`}>
                            Discover Amazing Products
                        </h1>
                        <p className="text-xl mb-8 text-blue-100">
                            Browse through our wide selection of products and find what you need.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/products"
                                className={`${theme.transitions.default} bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg shadow-md`}
                            >
                                Browse Products
                            </Link>
                            {!localStorage.getItem('access') && (
                                <Link
                                    to="/login"
                                    className={`${theme.transitions.default} bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg`}
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className={`${theme.typography.h2} text-center text-gray-800 mb-12`}>
                        Why Choose Our Marketplace
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                            <p className="text-gray-600">Shop with confidence knowing your transactions are secure and protected.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Filtering</h3>
                            <p className="text-gray-600">Find exactly what you're looking for with our advanced filtering options.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
                            <p className="text-gray-600">Simple and secure payment process for both buyers and sellers.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className={`${theme.typography.h2} text-gray-800`}>Featured Products</h2>
                        <Link
                            to="/products"
                            className={`${theme.transitions.default} text-blue-600 hover:text-blue-800 font-semibold`}
                        >
                            View All Products →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featuredProducts.map((product) => (
                                <Link to={`/product/${product.id}`} key={product.id}>
                                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                                        <div className="relative h-48">
                                            <img
                                                src={`${API_BASE_URL}/${product.image}`}
                                                className="w-full h-full object-cover"
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className={`${theme.typography.h3} text-gray-800 mb-2`}>{product.name}</h3>
                                            <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{product.descripation}</p>
                                            <div className="flex justify-between items-center mt-auto">
                                                <span className="text-lg font-semibold text-gray-900">${product.price}</span>
                                                <span className="text-sm text-gray-500">Category: {product.Category}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className={`${theme.typography.h2} mb-6`}>Ready to Start Selling?</h2>
                    <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                        Join our marketplace today and start connecting with buyers. It's free to list your items!
                    </p>
                    {localStorage.getItem('access') ? (
                        <Link
                            to="/dashboard"
                            className={`${theme.transitions.default} bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg shadow-md inline-block`}
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/register"
                            className={`${theme.transitions.default} bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg shadow-md inline-block`}
                        >
                            Sign Up Now
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home; 