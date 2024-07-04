import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

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
                const response = await axios.get('http://54.144.145.14/api/items/', {
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
                const response = await axios.get('http://54.144.145.14/api/categories/', {
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
            const response = await axios.post('http://54.144.145.14/api/items/create/', formData, {
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
            await axios.delete(`http://54.144.145.14/api/items/${itemId}/delete/`, {
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
            const response = await axios.put(`http://54.144.145.14/api/items/${currentItem.id}/update/`, formData, {
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
        <div className="container mx-auto p-6 mt-10">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="flex justify-end mb-4">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                    onClick={() => {
                        setIsModalOpen(true);
                        setIsEditMode(false);
                        setCurrentItem(null);
                        setNewItem({ name: "", descripation: "", price: "", image: null, Category: "" });
                    }}
                >
                    Add Item
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.length > 0 ? (
                    items.map((item) => (
                        localStorage.getItem('username') === item.created_by_username && (
                            <div key={item.id} className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
                                <img
                                    src={`http://54.144.145.14/${item.image}`}
                                    className="w-full h-48 object-cover"
                                    alt={item.name} />
                                <div className="p-4">
                                    <h1 className="text-xl font-bold mb-2">{item.name}</h1>
                                    <p className="text-gray-700">{item.descripation}</p>
                                    <div className="flex justify-end mt-4">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-200"
                                            onClick={() => handleEditItem(item)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                                            onClick={() => handleDeleteItem(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <p className="text-lg text-gray-600">No items found.</p>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={isEditMode ? handleUpdateItem : handleAddItem}>
                    <div className="mb-4">
                        <label htmlFor="Category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            id="Category"
                            name="Category"
                            value={newItem.Category}
                            onChange={handleInputChange}
                            className="form-select mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded-md"
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
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newItem.name}
                            onChange={handleInputChange}
                            className="form-input mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="descripation"
                            value={newItem.descripation}
                            onChange={handleInputChange}
                            className="form-textarea mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded-md"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={newItem.price}
                            onChange={handleInputChange}
                            className="form-input mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleInputChange}
                            className="form-input mt-1 block w-full bg-white text-gray-700 border border-gray-300 rounded-md"
                            required={!isEditMode}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
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
