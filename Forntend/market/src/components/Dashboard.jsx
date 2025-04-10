import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import API_BASE_URL from "../config";
import { theme } from "../theme";

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [newItem, setNewItem] = useState({
        name: "",
        descripation: "",
        price: "",
        image: null,
        Category: ""
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/items/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                });
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/categories/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                });
                setCategories(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchItems();
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setNewItem({ ...newItem, image: files[0] });
        } else {
            setNewItem({ ...newItem, [name]: value });
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('descripation', newItem.descripation);
        formData.append('price', newItem.price);
        formData.append('image', newItem.image);
        formData.append('Category', newItem.Category);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/items/create/`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setItems([...items, response.data]);
            setIsModalOpen(false);
            setNewItem({ name: "", descripation: "", price: "", image: null, Category: "" });
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/items/${itemId}/delete/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                }
            });
            setItems(items.filter(item => item.id !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEditItem = (item) => {
        setIsEditMode(true);
        setCurrentItem(item);
        setNewItem({
            name: item.name,
            descripation: item.descripation,
            price: item.price,
            image: null,
            Category: item.Category
        });
        setIsModalOpen(true);
    };

    const handleUpdateItem = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newItem.name);
        formData.append('descripation', newItem.descripation);
        formData.append('price', newItem.price);
        if (newItem.image) {
            formData.append('image', newItem.image);
        }
        formData.append('Category', newItem.Category);
        
        try {
            const response = await axios.put(`${API_BASE_URL}/api/items/${currentItem.id}/update/`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            setItems(items.map(item => item.id === currentItem.id ? response.data : item));
            setIsModalOpen(false);
            setIsEditMode(false);
            setCurrentItem(null);
            setNewItem({ name: "", descripation: "", price: "", image: null, Category: "" });
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className={`${theme.typography.h1} text-gray-800`}>Dashboard</h1>
                    <button
                        onClick={() => {
                            setIsModalOpen(true);
                            setIsEditMode(false);
                            setCurrentItem(null);
                            setNewItem({ name: "", descripation: "", price: "", image: null, Category: "" });
                        }}
                        className={`${theme.transitions.default} inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New Item
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.length > 0 ? (
                        items.map((item) => (
                            localStorage.getItem('username') === item.created_by_username && (
                                <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="relative h-48">
                                        <img
                                            src={`${API_BASE_URL}/${item.image}`}
                                            className="w-full h-full object-cover"
                                            alt={item.name}
                                        />
                                        <div className="absolute top-2 right-2 flex space-x-2">
                                            <button
                                                onClick={() => handleEditItem(item)}
                                                className={`${theme.transitions.default} bg-${theme.colors.primary.main} hover:bg-${theme.colors.primary.dark} text-white p-2 rounded-full shadow-md`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteItem(item.id)}
                                                className={`${theme.transitions.default} bg-${theme.colors.error.main} hover:bg-${theme.colors.error.dark} text-white p-2 rounded-full shadow-md`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h2 className={`${theme.typography.h3} text-gray-800 mb-2`}>{item.name}</h2>
                                        <p className="text-gray-600 mb-4 line-clamp-2">{item.descripation}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-900">${item.price}</span>
                                            <span className="text-sm text-gray-500">Category: {item.Category}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
                            <p className="mt-1 text-gray-500">Get started by creating a new item.</p>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={isEditMode ? handleUpdateItem : handleAddItem} className="space-y-6">
                    <div>
                        <label htmlFor="Category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="Category"
                            name="Category"
                            value={newItem.Category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newItem.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="descripation"
                            value={newItem.descripation}
                            onChange={handleInputChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newItem.price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleInputChange}
                            className="mt-1 block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            required={!isEditMode}
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {isEditMode ? "Update Item" : "Add Item"}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Dashboard;
