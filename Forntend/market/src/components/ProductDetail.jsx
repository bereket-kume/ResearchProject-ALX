import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isSeller, setIsSeller] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access');
        setIsAuthenticated(!!token);
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        if (!productId || productId === 'undefined') {
            setError('Invalid product ID');
            setLoading(false);
            return;
        }

        try {
            console.log('Fetching product with ID:', productId);
            const response = await axios.get(`${API_BASE_URL}/api/items/${productId}/`);
            console.log('Product response:', response.data);
            setProduct(response.data);
            
            // Check if the current user is the seller
            const token = localStorage.getItem('access');
            if (token) {
                try {
                    const userResponse = await axios.get(`${API_BASE_URL}/api/user/`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    console.log('User response:', userResponse.data);
                    setIsSeller(userResponse.data.id === response.data.created_by);
                } catch (userError) {
                    console.error('Error fetching user:', userError);
                    // Don't set error state for user fetch failure
                }
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', error.response.data);
                if (error.response.status === 404) {
                    setError('Product not found');
                } else if (error.response.status === 401) {
                    setError('Please log in to view product details');
                } else {
                    setError(`Error: ${error.response.data.error || 'Failed to load product details'}`);
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
                setError('No response from server. Please check your connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An unexpected error occurred');
            }
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const token = localStorage.getItem('access');
            await axios.delete(`${API_BASE_URL}/api/items/${productId}/delete/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            navigate('/');
        } catch (error) {
            console.error('Error deleting product:', error);
            setError('Failed to delete product');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500">Product not found</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Product Image */}
                <div className="w-full h-96 overflow-hidden">
                    <img
                        src={product.image ? `${API_BASE_URL}${product.image}` : 'https://via.placeholder.com/400x300?text=No+Image'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                    />
                </div>
                
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-600">Category: {product.category_name || 'Uncategorized'}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600">Price: ${product.price}</span>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                        <p className="text-gray-600">{product.description || 'No description available'}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Seller</h2>
                        <p className="text-gray-600">{product.created_by_username || 'Unknown'}</p>
                    </div>
                    {isAuthenticated && isSeller && (
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigate(`/product/${productId}/edit`)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Edit Product
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Delete Product
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
