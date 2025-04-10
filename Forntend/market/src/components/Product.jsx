import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";
import { theme } from "../theme";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/items/`);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <h1 className={`${theme.typography.h1} text-center text-gray-800 mb-12`}>Our Products</h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
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
                                    <h2 className={`${theme.typography.h3} text-gray-800 mb-2`}>{product.name}</h2>
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

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No products available</h3>
                        <p className="mt-1 text-gray-500">Check back later for new products.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
